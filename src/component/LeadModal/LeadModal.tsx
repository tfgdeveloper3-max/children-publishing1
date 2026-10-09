import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Check, Loader2, Send, X } from "lucide-react";
import { SITE } from "@/data/Site";
import { submitLead } from "@/lib/lead";
import type { LeadModalOptions } from "./LeadModalContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const inputBase =
    "w-full border border-brand-ink/15 bg-white px-5 text-[13px] text-brand-ink shadow-[0_2px_0_#25283e] outline-none transition-[box-shadow,border-color,transform] duration-300 placeholder:font-light placeholder:text-brand-ink/50 hover:-translate-y-[1px] hover:shadow-[0_3px_0_#25283e] focus:-translate-y-[2px] focus:border-brand-orange/60 focus:shadow-[0_4px_0_var(--color-brand-orange)]";

const fields: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const fieldIn: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

type Status = "idle" | "sending" | "sent" | "error";

const EMPTY = { name: "", email: "", phone: "", message: "" };

export default function LeadModal({ open, options, onClose }: { open: boolean; options: LeadModalOptions; onClose: () => void }) {
    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState<Status>("idle");
    const dialogRef = useRef<HTMLDivElement>(null);
    const firstRef = useRef<HTMLInputElement>(null);
    const closeRef = useRef(onClose);
    const titleId = useId();
    const descId = useId();

    useEffect(() => {
        closeRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (!open) return;
        const back = document.activeElement as HTMLElement | null;
        setForm({ ...EMPTY, message: options.service ? `Hi, I'm interested in ${options.service}. ` : "" });
        setStatus("idle");

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const t = window.setTimeout(() => firstRef.current?.focus(), 80);
        const onKey = (e: globalThis.KeyboardEvent) => {
            if (e.key === "Escape") closeRef.current();
        };
        window.addEventListener("keydown", onKey);

        return () => {
            window.clearTimeout(t);
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
            back?.focus();
        };
    }, [open, options.service]);

    useEffect(() => {
        if (status !== "sent") return;
        const t = window.setTimeout(() => closeRef.current(), 2600);
        return () => window.clearTimeout(t);
    }, [status]);

    const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key !== "Tab" || !dialogRef.current) return;
        const items = dialogRef.current.querySelectorAll<HTMLElement>("button, input, textarea, a[href]");
        const list = Array.from(items).filter((el) => !el.hasAttribute("disabled"));
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (status === "sending") return;
        setStatus("sending");
        try {
            const message = options.service && !form.message.includes(options.service) ? `[${options.service}] ${form.message}` : form.message;
            await submitLead({ name: form.name, email: form.email, phone_number: form.phone, message });
            setStatus("sent");
            setForm(EMPTY);
        } catch {
            setStatus("error");
        }
    };

    const title = options.title ?? "Start Your Project";
    const subtitle = options.subtitle ?? "Tell us a little about your book and our team will get back to you shortly.";

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="absolute inset-0 bg-brand-night/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        aria-describedby={descId}
                        onKeyDown={trapFocus}
                        initial={{ opacity: 0, y: 60, scale: 0.96, rotate: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, y: 40, scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                        className="relative max-h-[94dvh] w-full max-w-[480px] overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-t-[24px] border border-brand-ink/15 bg-white px-5 pb-6 pt-6 shadow-[0_4px_0_#25283e,0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:rounded-[24px] sm:px-7 sm:pb-7 sm:pt-7"
                    >
                        <span aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-brand-orange/15 blur-2xl" />
                        <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-brand-plum/10 blur-2xl" />

                        <motion.button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            whileHover={{ rotate: 90, scale: 1.08 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-paper text-brand-ink outline-none transition-colors hover:bg-brand-plum hover:text-white focus-visible:ring-2 focus-visible:ring-brand-plum"
                        >
                            <X className="h-4 w-4" strokeWidth={2.4} />
                        </motion.button>

                        <AnimatePresence mode="wait" initial={false}>
                            {status === "sent" ? (
                                <motion.div
                                    key="done"
                                    initial={{ opacity: 0, scale: 0.94 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease: EASE }}
                                    className="relative flex flex-col items-center py-10 text-center"
                                    aria-live="polite"
                                >
                                    <motion.span
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 }}
                                        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_14px_30px_-12px_rgba(5,150,105,0.8)]"
                                    >
                                        <Check className="h-10 w-10" strokeWidth={3} />
                                        <motion.span
                                            className="absolute inset-0 rounded-full border-2 border-emerald-500"
                                            initial={{ scale: 1, opacity: 0.8 }}
                                            animate={{ scale: 1.7, opacity: 0 }}
                                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                                        />
                                    </motion.span>
                                    <h2 id={titleId} className="mt-6 text-[26px] font-extrabold text-brand-ink">
                                        Message Sent!
                                    </h2>
                                    <p id={descId} className="mt-2 max-w-[300px] text-[13px] leading-[1.7] text-brand-ink/70">
                                        Thank you for reaching out. Our team will contact you very soon.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={onSubmit}
                                    variants={fields}
                                    initial="hidden"
                                    animate="show"
                                    exit={{ opacity: 0 }}
                                    className="relative space-y-3.5"
                                >
                                    <motion.div variants={fieldIn} className="pr-10">
                                        <p className="text-[15px] font-bold text-brand-plum sm:text-[17px]">{options.service ?? "Let's Talk"}</p>
                                        <h2 id={titleId} className="mt-1 text-[clamp(24px,6vw,30px)] font-extrabold leading-[1.1] text-brand-ink">
                                            {title}
                                        </h2>
                                        <p id={descId} className="mt-2 text-[12.5px] leading-[1.7] text-brand-ink/70">
                                            {subtitle}
                                        </p>
                                    </motion.div>

                                    <motion.div variants={fieldIn}>
                                        <label htmlFor="lm-name" className="mb-2 block text-[13px] font-medium text-brand-ink">
                                            Full Name
                                        </label>
                                        <input
                                            ref={firstRef}
                                            id="lm-name"
                                            name="name"
                                            required
                                            autoComplete="name"
                                            placeholder="Full Name"
                                            value={form.name}
                                            onChange={onChange}
                                            className={`${inputBase} h-[38px] rounded-full`}
                                        />
                                    </motion.div>

                                    <motion.div variants={fieldIn}>
                                        <label htmlFor="lm-email" className="mb-2 block text-[13px] font-medium text-brand-ink">
                                            Email
                                        </label>
                                        <input
                                            id="lm-email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            placeholder="Email"
                                            value={form.email}
                                            onChange={onChange}
                                            className={`${inputBase} h-[38px] rounded-full`}
                                        />
                                    </motion.div>

                                    <motion.div variants={fieldIn}>
                                        <label htmlFor="lm-phone" className="mb-2 block text-[13px] font-medium text-brand-ink">
                                            Phone Number
                                        </label>
                                        <input
                                            id="lm-phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            autoComplete="tel"
                                            placeholder="Phone Number"
                                            value={form.phone}
                                            onChange={onChange}
                                            className={`${inputBase} h-[38px] rounded-full`}
                                        />
                                    </motion.div>

                                    <motion.div variants={fieldIn}>
                                        <label htmlFor="lm-message" className="mb-2 block text-[13px] font-medium text-brand-ink">
                                            Message
                                        </label>
                                        <textarea
                                            id="lm-message"
                                            name="message"
                                            required
                                            rows={3}
                                            placeholder="Message"
                                            value={form.message}
                                            onChange={onChange}
                                            className={`${inputBase} min-h-[84px] resize-none rounded-[16px] py-3`}
                                        />
                                    </motion.div>

                                    <AnimatePresence>
                                        {status === "error" && (
                                            <motion.p
                                                role="alert"
                                                initial={{ opacity: 0, y: -6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="rounded-xl bg-[#fde8ec] px-4 py-3 text-[12.5px] text-[#8e1f33]"
                                            >
                                                Your message couldn't be sent. Please try again, or email us at{" "}
                                                <a href={`mailto:${SITE.email}`} className="font-bold underline">
                                                    {SITE.email}
                                                </a>
                                                .
                                            </motion.p>
                                        )}
                                    </AnimatePresence>

                                    <motion.div variants={fieldIn} className="pt-1">
                                        <motion.button
                                            type="submit"
                                            disabled={status === "sending"}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                            className="group relative flex h-[42px] w-full items-center justify-center overflow-hidden rounded-full bg-brand-orange text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_10px_22px_-12px_rgba(209,129,9,0.9)] outline-none transition-colors duration-500 hover:bg-[#b96f06] focus-visible:ring-4 focus-visible:ring-brand-orange/40 disabled:cursor-wait"
                                        >
                                            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
                                            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
                                            <span className="relative inline-flex items-center gap-2">
                                                {status === "sending" ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Sending
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </span>
                                        </motion.button>
                                    </motion.div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}