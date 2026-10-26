import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function SectionTag({ children, tone = "light" }: { children: string; tone?: "light" | "dark" }) {
    return (
        <span
            className={`inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.16em] sm:text-[14px] ${tone === "dark" ? "text-white" : "text-brand-plum"
                }`}
        >
            <span className="h-[2px] w-7 rounded-full bg-brand-orange" />
            {children}
            <span className="h-[2px] w-7 rounded-full bg-brand-orange" />
        </span>
    );
}

type FeatureCardProps = {
    index: number;
    icon: LucideIcon;
    title: string;
    text?: string;
    label?: string;
    active?: boolean;
    footer?: ReactNode;
};

export function FeatureCard({ index, icon: Icon, title, text, label, active = false, footer }: FeatureCardProps) {
    return (
        <div
            className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-plum/35 hover:shadow-[0_20px_40px_-24px_rgba(37,40,62,0.35)] ${active ? "border-brand-plum/40 shadow-[0_20px_40px_-24px_rgba(37,40,62,0.35)]" : "border-[#ebe4d6]"
                }`}
        >
            <div className="flex items-start justify-between gap-4">
                <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-brand-plum group-hover:text-white ${active ? "bg-brand-plum text-white" : "bg-brand-plum/[0.07] text-brand-plum"
                        }`}
                >
                    <Icon className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <span className="pt-1 text-[13px] font-bold tabular-nums text-brand-ink/25">
                    {label ? `${label} ` : ""}
                    {String(index + 1).padStart(2, "0")}
                </span>
            </div>

            <h3 className="mt-6 text-[18px] font-extrabold leading-snug text-brand-ink">{title}</h3>
            {text && <p className="mt-2.5 text-[14px] leading-[1.75] text-brand-ink/65">{text}</p>}
            {footer && <div className="mt-auto pt-6">{footer}</div>}

            <span
                aria-hidden="true"
                className={`absolute bottom-0 left-0 h-[3px] bg-brand-orange transition-all duration-500 group-hover:w-full ${active ? "w-full" : "w-0"}`}
            />
        </div>
    );
}

const LG_W: Record<number, string> = {
    1: "lg:w-full",
    2: "lg:w-[calc(50%-12px)]",
    3: "lg:w-[calc(33.333%-16px)]",
    4: "lg:w-[calc(25%-18px)]",
};
const SM_W: Record<number, string> = {
    1: "sm:w-full",
    2: "sm:w-[calc(50%-12px)]",
    3: "sm:w-[calc(33.333%-16px)]",
};

export function balancedGrid(count: number) {
    const lg = count <= 4 ? Math.max(count, 1) : count % 3 === 1 ? 4 : 3;
    const sm = count === 1 ? 1 : count % 2 === 0 ? 2 : count % 3 !== 1 ? 3 : 2;
    const maxW = count === 1 ? "max-w-[420px]" : count === 2 ? "max-w-[820px]" : lg === 4 ? "max-w-[1200px]" : "max-w-[1100px]";

    return {
        list: `mx-auto flex w-full flex-wrap justify-center gap-x-6 ${maxW}`,
        item: (_index?: number) => `w-full ${SM_W[sm]} ${LG_W[lg]}`,
    };
}