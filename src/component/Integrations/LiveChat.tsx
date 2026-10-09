import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ENV } from "@/data/Site";

type Handler = (data?: unknown) => void;

type LiveChatApi = {
    _q: unknown[];
    _h: ((...a: unknown[]) => unknown) | null;
    _v: string;
    on: (event: string, handler: Handler) => void;
    once: (event: string, handler: Handler) => void;
    off: (event: string, handler: Handler) => void;
    get: (name: string) => unknown;
    call: (...args: unknown[]) => void;
    init: () => void;
};

type AgentEvent = { type?: string; author?: { type?: string } };

declare global {
    interface Window {
        __lc?: { license?: number; integration_name?: string; product_name?: string; asyncInit?: boolean };
        LiveChatWidget?: LiveChatApi;
    }
}

const AGENT_EVENT_TYPES = ["message", "rich_message", "file"];
const MAX_RETRIES = 10;
const FLASH_TITLE = "💬 New message!";

function installLiveChat(license: number) {
    window.__lc = window.__lc || {};
    window.__lc.license = license;
    window.__lc.integration_name = "manual_channels";
    window.__lc.product_name = "livechat";

    if (window.LiveChatWidget) return;

    const slice = [].slice;
    const widget: LiveChatApi = {
        _q: [],
        _h: null,
        _v: "2.0",
        on(...a: unknown[]) {
            push(["on", slice.call(a)]);
        },
        once(...a: unknown[]) {
            push(["once", slice.call(a)]);
        },
        off(...a: unknown[]) {
            push(["off", slice.call(a)]);
        },
        get(...a: unknown[]) {
            if (!widget._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
            return push(["get", slice.call(a)]);
        },
        call(...a: unknown[]) {
            push(["call", slice.call(a)]);
        },
        init() {
            const s = document.createElement("script");
            s.async = true;
            s.type = "text/javascript";
            s.src = "https://cdn.livechatinc.com/tracking.js";
            document.head.appendChild(s);
        },
    };

    function push(args: unknown[]) {
        return widget._h ? widget._h.apply(null, args) : widget._q.push(args);
    }

    if (!window.__lc.asyncInit) widget.init();
    window.LiveChatWidget = widget;
}

function useAutoOpenOnAgentMessage(enabled: boolean) {
    useEffect(() => {
        if (!enabled) return;
        const lc = window.LiveChatWidget;
        if (!lc) return;

        let pendingOpen = false;
        let titleTimer: number | null = null;
        let originalTitle = document.title;
        const retryTimers = new Set<number>();

        const getVisibility = () => {
            try {
                const state = lc.get("state") as { visibility?: string } | undefined;
                return state?.visibility ?? null;
            } catch {
                return null;
            }
        };

        const stopTitleFlash = () => {
            if (titleTimer === null) return;
            window.clearInterval(titleTimer);
            titleTimer = null;
            document.title = originalTitle;
        };

        const startTitleFlash = () => {
            if (titleTimer !== null) return;
            originalTitle = document.title;
            let on = false;
            titleTimer = window.setInterval(() => {
                document.title = on ? originalTitle : FLASH_TITLE;
                on = !on;
            }, 1000);
        };

        const forceOpen = (attempt = 0) => {
            try {
                lc.call("maximize");
            } catch {
                return;
            }
            const t = window.setTimeout(() => {
                retryTimers.delete(t);
                if (getVisibility() === "maximized") {
                    pendingOpen = false;
                    stopTitleFlash();
                    return;
                }
                if (attempt < MAX_RETRIES) forceOpen(attempt + 1);
            }, 300);
            retryTimers.add(t);
        };

        const onNewEvent: Handler = (data) => {
            const event = data as AgentEvent | undefined;
            if (!event?.author || event.author.type !== "agent") return;
            if (!event.type || !AGENT_EVENT_TYPES.includes(event.type)) return;

            pendingOpen = true;
            forceOpen(0);
            if (document.hidden) startTitleFlash();
        };

        const onVisibilityChanged: Handler = (data) => {
            const d = data as { visibility?: string } | undefined;
            if (d?.visibility === "maximized") {
                pendingOpen = false;
                stopTitleFlash();
            }
        };

        const onTabVisibility = () => {
            if (document.hidden) return;
            if (pendingOpen) forceOpen(0);
            else stopTitleFlash();
        };

        lc.on("new_event", onNewEvent);
        lc.on("visibility_changed", onVisibilityChanged);
        document.addEventListener("visibilitychange", onTabVisibility);

        return () => {
            lc.off("new_event", onNewEvent);
            lc.off("visibility_changed", onVisibilityChanged);
            document.removeEventListener("visibilitychange", onTabVisibility);
            retryTimers.forEach((t) => window.clearTimeout(t));
            retryTimers.clear();
            stopTitleFlash();
        };
    }, [enabled]);
}

export default function LiveChat() {
    const { pathname } = useLocation();
    const license = Number(ENV.liveChatLicense);
    const enabled = Number.isFinite(license) && license > 0;

    useEffect(() => {
        if (enabled) installLiveChat(license);
    }, [enabled, license]);

    useAutoOpenOnAgentMessage(enabled);

    useEffect(() => {
        if (!enabled) return;
        window.LiveChatWidget?.call("set_session_variables", { page: window.location.href });
    }, [pathname, enabled]);

    return null;
}