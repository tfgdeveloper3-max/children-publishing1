import { useRef, useState, type CSSProperties } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Step } from "@/data/serviceContent";
import { SectionTag } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const stepIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ServiceProcess({
    eyebrow = "How It Works",
    heading,
    description,
    steps,
    highlight = 1,
}: {
    eyebrow?: string;
    heading: string;
    description: string;
    steps: Step[];
    highlight?: number;
}) {
    const headRef = useRef<HTMLDivElement>(null);
    const inView = useInView(headRef, { once: true, amount: 0.5 });
    const [active, setActive] = useState(highlight);

    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-5">
                <div ref={headRef} className="mx-auto max-w-[760px] text-center">
                    <div className={inView ? "animate__animated animate__fadeInDown" : "opacity-0"} style={{ "--animate-duration": "0.9s" } as CSSProperties}>
                        <SectionTag>{eyebrow}</SectionTag>
                    </div>
                    <h2
                        className={`mt-4 text-[clamp(26px,6vw,34px)] font-extrabold leading-[1.15] text-brand-ink lg:text-[clamp(32px,2.8vw,40px)] ${inView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}
                        style={{ "--animate-duration": "1s", animationDelay: "0.15s" } as CSSProperties}
                    >
                        {heading}
                    </h2>
                    <p
                        className={`mx-auto mt-4 max-w-[620px] text-[14px] leading-[1.75] text-brand-ink/65 sm:text-[15px] ${inView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}
                        style={{ "--animate-duration": "1s", animationDelay: "0.3s" } as CSSProperties}
                    >
                        {description}
                    </p>
                </div>

                <motion.ol
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        const on = active === i;
                        const last = i === steps.length - 1;
                        return (
                            <motion.li key={step.title} variants={stepIn} className="relative">
                                <article
                                    tabIndex={0}
                                    onMouseEnter={() => setActive(i)}
                                    onFocus={() => setActive(i)}
                                    className={`relative flex h-full flex-col rounded-2xl border p-7 outline-none transition-all duration-300 focus-visible:ring-4 focus-visible:ring-brand-plum/25 ${on
                                            ? "-translate-y-1 border-brand-plum bg-brand-plum text-white shadow-[0_24px_44px_-24px_rgba(122,31,134,0.65)]"
                                            : "border-[#ebe4d6] bg-[#faf7f1] text-brand-ink"
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className={`block text-[12px] font-bold uppercase tracking-[0.18em] ${on ? "text-white/70" : "text-brand-ink/45"}`}>Step</span>
                                            <span className={`block text-[40px] font-extrabold leading-none tabular-nums ${on ? "text-[#f6b14b]" : "text-brand-orange"}`}>
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </div>
                                        <span
                                            className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${on ? "bg-white/15 text-white" : "bg-white text-brand-plum"
                                                }`}
                                        >
                                            <Icon className="h-6 w-6" strokeWidth={1.7} />
                                        </span>
                                    </div>
                                    <h3 className="mt-6 text-[17px] font-extrabold leading-snug">{step.title}</h3>
                                    <p className={`mt-2.5 text-[13.5px] leading-[1.75] ${on ? "text-white/85" : "text-brand-ink/65"}`}>{step.text}</p>
                                </article>

                                {!last && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute -right-[19px] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#ebe4d6] bg-white text-brand-orange lg:flex"
                                    >
                                        <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                                    </span>
                                )}
                            </motion.li>
                        );
                    })}
                </motion.ol>
            </div>
        </section>
    );
}