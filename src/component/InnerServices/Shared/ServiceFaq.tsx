import { useId, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { AnimatePresence, motion, useInView, type Variants } from "motion/react";
import { MessageSquare } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

import type { QA } from "@/data/serviceContent";

const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};

const itemIn: Variants = {
    hidden: { opacity: 0, x: -30, filter: "blur(6px)" },
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

const words: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.014, delayChildren: 0.12 } },
};

const word: Variants = {
    hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: EASE } },
};

function PlusMinus({ open }: { open: boolean }) {
    return (
        <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0, backgroundColor: open ? "var(--color-brand-plum)" : "rgba(0,0,0,0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        >
            <motion.span
                animate={{ backgroundColor: open ? "#fff" : "var(--color-brand-ink)" }}
                transition={{ duration: 0.4 }}
                className="absolute h-[1.5px] w-[15px] rounded-full"
            />
            <motion.span
                animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1, backgroundColor: open ? "#fff" : "var(--color-brand-ink)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute h-[15px] w-[1.5px] rounded-full"
            />
        </motion.span>
    );
}

function AccordionItem({ item, open, onToggle }: { item: QA; open: boolean; onToggle: () => void }) {
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    return (
        <motion.div variants={itemIn}>
            <motion.div
                ref={ref}
                onMouseMove={onMove}
                animate={{
                    borderColor: open ? "var(--color-brand-plum)" : "rgba(37,40,62,0.18)",
                    boxShadow: open ? "0 18px 36px -22px rgba(37,40,62,0.45)" : "0 0 0 0 rgba(37,40,62,0)",
                }}
                transition={{ duration: 0.5, ease: EASE }}
                className="group relative overflow-hidden rounded-[10px] border bg-white"
            >
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(122,31,134,0.08), transparent 70%)" }}
                />

                <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{ scaleY: open ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute inset-y-0 left-0 w-[4px] origin-top bg-gradient-to-b from-brand-orange to-brand-plum"
                />

                <h3>
                    <button
                        type="button"
                        id={`${id}-btn`}
                        aria-expanded={open}
                        aria-controls={`${id}-panel`}
                        onClick={onToggle}
                        className="relative flex w-full items-center justify-between gap-4 px-4 py-4 text-left outline-none focus-visible:bg-brand-plum/5 sm:px-5 sm:py-[18px]"
                    >
                        <motion.span
                            animate={{ x: open ? 6 : 0, color: open ? "var(--color-brand-plum)" : "var(--color-brand-ink)" }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="text-[14px] font-extrabold leading-snug sm:text-[15px]"
                        >
                            {item.q}
                        </motion.span>
                        <PlusMinus open={open} />
                    </button>
                </h3>

                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            id={`${id}-panel`}
                            role="region"
                            aria-labelledby={`${id}-btn`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ height: { duration: 0.55, ease: EASE }, opacity: { duration: 0.35 } }}
                            className="relative overflow-hidden"
                        >
                            <motion.p
                                variants={words}
                                initial="hidden"
                                animate="show"
                                className="max-w-[420px] px-4 pb-5 text-[13px] leading-[1.75] text-brand-ink/75 sm:px-5 sm:pl-[26px]"
                            >
                                {item.a.split(" ").map((w, i) => (
                                    <motion.span key={i} variants={word} className="inline-block">
                                        {w}&nbsp;
                                    </motion.span>
                                ))}
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

function TypingBubble() {
    return (
        <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto h-14 w-14"
        >
            <MessageSquare className="h-14 w-14 text-brand-plum" fill="currentColor" strokeWidth={0} />
            <span className="absolute left-1/2 top-[40%] flex -translate-x-1/2 -translate-y-1/2 gap-[5px]">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="h-[6px] w-[6px] rounded-full bg-white"
                        animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
                    />
                ))}
            </span>
        </motion.div>
    );
}

export default function ServiceFaq({ items, description }: { items: QA[]; description?: string }) {
    const headRef = useRef<HTMLDivElement>(null);
    const inView = useInView(headRef, { once: true, amount: 0.5 });
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
            <div className="mx-auto max-w-[1140px] px-4 sm:px-5">
                <div ref={headRef} className="mx-auto max-w-[760px] text-center">
                    <h2
                        className={`text-[clamp(26px,6vw,34px)] font-extrabold leading-[1.15] text-brand-ink lg:text-[clamp(32px,2.8vw,40px)] ${inView ? "animate__animated animate__fadeInDown" : "opacity-0"}`}
                        style={{ "--animate-duration": "1s" } as CSSProperties}
                    >
                        Frequently Asked Questions
                    </h2>
                    {description && (
                        <p
                            className={`mt-3 text-[13px] leading-[1.7] text-brand-ink/75 sm:text-[14px] ${inView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}
                            style={{ "--animate-duration": "1s", animationDelay: "0.2s" } as CSSProperties}
                        >
                            {description}
                        </p>
                    )}
                </div>

                <div className="mx-auto mt-8 grid max-w-[980px] items-start gap-5 sm:mt-10 lg:grid-cols-[1.55fr_1fr] lg:gap-7">
                    <motion.div
                        variants={list}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex flex-col gap-3"
                    >
                        {items.map((item, i) => (
                            <AccordionItem
                                key={i}
                                item={item}
                                open={open === i}
                                onToggle={() => setOpen(open === i ? null : i)}
                            />
                        ))}
                    </motion.div>

                    <motion.aside
                        initial={{ opacity: 0, x: 40, scale: 0.96 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
                        className="rounded-[12px] border border-brand-ink/15 bg-white px-6 py-10 text-center shadow-[0_18px_40px_-30px_rgba(37,40,62,0.5)] sm:px-8 lg:sticky lg:top-28"
                    >
                        <TypingBubble />

                        <h3 className="mt-6 text-[16px] font-extrabold text-brand-ink sm:text-[17px]">Do you have more questions?</h3>

                        <p className="mx-auto mt-3 max-w-[300px] text-[12.5px] leading-[1.85] text-brand-ink/75 sm:text-[13px]">
                            Can't find the answer you're looking for? Our team is happy to talk through your book and answer any
                            question you have.
                        </p>

                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 220, damping: 20 }}
                            className="group relative mt-6 inline-flex w-full max-w-[220px] items-center justify-center overflow-hidden rounded-full bg-brand-orange px-8 py-3 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_10px_22px_-10px_rgba(209,129,9,0.9)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40"
                        >
                            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
                            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
                            <span className="relative">Contact Us</span>
                        </motion.a>
                    </motion.aside>
                </div>
            </div>
        </section>
    );
}