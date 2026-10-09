import { useRef, useState, type CSSProperties } from "react";
import { motion, useInView, type Variants } from "motion/react";
import type { Step } from "@/data/serviceContent";

const EASE = [0.22, 1, 0.36, 1] as const;

const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

const card: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: 18, scale: 0.94 },
    show: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", stiffness: 90, damping: 16, mass: 0.9 } },
};

function ProcessCard({ step, index, active, onActivate }: { step: Step; index: number; active: boolean; onActivate: () => void }) {
    const Icon = step.icon;

    return (
        <motion.article
            variants={card}
            tabIndex={0}
            onMouseEnter={onActivate}
            onFocus={onActivate}
            onClick={onActivate}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{ transformPerspective: 900 }}
            className="group relative isolate cursor-pointer overflow-hidden rounded-[12px] border-[1.5px] border-brand-plum bg-[#f4e9f6] px-5 pb-6 pt-7 text-center outline-none focus-visible:ring-4 focus-visible:ring-brand-plum/30 sm:px-6"
        >
            {active && (
                <motion.span
                    layoutId="service-process-active"
                    transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    className="absolute inset-0 -z-10 bg-brand-plum"
                />
            )}

            <span className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/3 -skew-x-12 bg-white/25 blur-md transition-transform duration-[1200ms] ease-out group-hover:translate-x-[480%]" />

            <motion.span
                aria-hidden="true"
                animate={{ opacity: active ? 0.14 : 0.07 }}
                className={`pointer-events-none absolute -right-1 -top-3 select-none text-[64px] font-extrabold leading-none ${active ? "text-white" : "text-brand-plum"}`}
            >
                0{index + 1}
            </motion.span>

            <div className="flex justify-center">
                <span
                    key={active ? "on" : "off"}
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-500 ${active ? "animate__animated animate__tada bg-white/15 text-amber-300" : "bg-white text-brand-plum"}`}
                    style={{ "--animate-duration": "1s" } as CSSProperties}
                >
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                    {active && (
                        <motion.span
                            className="absolute inset-0 rounded-full border-2 border-white/50"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 1.6, opacity: 0 }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        />
                    )}
                </span>
            </div>

            <h3 className={`mt-4 text-[17px] font-extrabold transition-colors duration-500 sm:text-[18px] ${active ? "text-white" : "text-brand-plum"}`}>{step.title}</h3>
            <p className={`mt-2 text-[12.5px] leading-[1.6] transition-colors duration-500 sm:text-[13px] ${active ? "text-white/90" : "text-brand-plum/90"}`}>{step.text}</p>

            <motion.span
                aria-hidden="true"
                animate={{ width: active ? 40 : 0, opacity: active ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mx-auto mt-4 block h-[3px] rounded-full bg-brand-orange"
            />
        </motion.article>
    );
}

export default function ServiceProcess({ heading, description, steps }: { heading: string; description: string; steps: Step[] }) {
    const headRef = useRef<HTMLDivElement>(null);
    const inView = useInView(headRef, { once: true, amount: 0.5 });
    const [active, setActive] = useState(1);

    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-[1140px] px-4 sm:px-5">
                <div ref={headRef} className="mx-auto max-w-[760px] text-center">
                    <h2
                        className={`text-[clamp(26px,6vw,34px)] font-extrabold leading-[1.15] text-brand-ink lg:text-[clamp(32px,2.8vw,40px)] ${inView ? "animate__animated animate__fadeInDown" : "opacity-0"}`}
                        style={{ "--animate-duration": "1s" } as CSSProperties}
                    >
                        {heading}
                    </h2>
                    <p
                        className={`mt-3 text-[13px] leading-[1.7] text-brand-ink/75 sm:text-[14px] ${inView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}
                        style={{ "--animate-duration": "1s", animationDelay: "0.2s" } as CSSProperties}
                    >
                        {description}
                    </p>
                </div>

                <motion.div
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="mx-auto mt-8 grid max-w-[960px] gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
                >
                    {steps.map((step, i) => (
                        <ProcessCard key={step.title} step={step} index={i} active={active === i} onActivate={() => setActive(i)} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}