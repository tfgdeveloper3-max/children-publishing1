import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "motion/react";
import { Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const JET_ROTATE = 38;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};
const pop: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const TABS = {
    mission:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley.",
    vision:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley.",
} as const;
type TabKey = keyof typeof TABS;

const TAB_LABELS: Record<TabKey, string> = {
    mission: "Our Mission",
    vision: "Our Vision",
};

const CHECKS = ["Learning Opportunity For Kids", "Your Child Will Take"];

export default function About() {
    const [tab, setTab] = useState<TabKey>("mission");

    const leftRef = useRef<HTMLDivElement>(null);
    const leftInView = useInView(leftRef, { once: true, amount: 0.25 });
    const rightRef = useRef<HTMLDivElement>(null);
    const rightInView = useInView(rightRef, { once: true, amount: 0.25 });

    return (
        <section className="relative overflow-hidden border-b-2 border-dashed border-brand-plum bg-white bg-[url('/images/About-BG.png')] bg-cover bg-center py-12 sm:py-16 lg:py-24">
            {/* Tree sirf bade desktop par — chhoti screen par button/text se takrata tha */}
            <img
                src="/images/Tree.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1 right-[4%] z-0 hidden w-[110px] xl:block 2xl:right-[8%] 2xl:w-[150px]"
            />

            <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-5">
                <div className="flex flex-col items-center gap-10 sm:gap-14 lg:flex-row lg:gap-12 xl:gap-24">
                    <div ref={leftRef} className="w-full lg:w-[47%]">
                        {/* @container: andar ka badge text collage ke size ke hisaab se scale hota hai (har screen par same proportion) */}
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate={leftInView ? "show" : "hidden"}
                            className="@container relative mx-auto aspect-square w-full max-w-[440px] sm:max-w-[560px]"
                        >
                            <motion.div
                                variants={pop}
                                className="absolute left-[2.7%] top-0 z-10 h-[45%] w-[40.7%] overflow-hidden rounded-[12px] border-[3px] border-white shadow-[0_12px_30px_-10px_rgba(37,40,62,0.35)] sm:rounded-[18px] sm:border-4"
                            >
                                <img
                                    src="/images/Back-Cover.jpg"
                                    alt="Girl running with her dog"
                                    className="h-full w-full object-cover"
                                />
                            </motion.div>

                            <motion.div
                                variants={pop}
                                className="absolute left-[32.5%] top-[26.4%] z-20 h-[73.6%] w-[63.4%] overflow-hidden rounded-[14px] shadow-[0_18px_40px_-12px_rgba(37,40,62,0.45)] sm:rounded-[20px]"
                            >
                                <img
                                    src="/images/Front-Cover.jpg"
                                    alt="Children sailing through a storm"
                                    className="h-full w-full object-cover object-[center_75%]"
                                />
                            </motion.div>

                            <motion.div
                                variants={pop}
                                className="absolute left-[47.8%] top-[8.8%] z-30 flex items-center gap-[0.6em] text-[clamp(11px,3.9cqw,22px)]"
                            >
                                <div className="flex aspect-square w-[3.6em] items-center justify-center rounded-full bg-brand-plum font-extrabold text-white">
                                    <span className="text-[1.25em] leading-none">10+</span>
                                </div>
                                <p className="text-[0.9em] font-bold leading-[1.1] text-brand-ink">
                                    Years Of
                                    <br />
                                    Experience
                                </p>
                            </motion.div>

                            <motion.img
                                variants={pop}
                                src="/images/Balloon.png"
                                alt=""
                                aria-hidden="true"
                                className="absolute left-[86%] top-[5%] z-30 w-[12%]"
                            />

                            <motion.img
                                variants={pop}
                                src="/images/Jet.png"
                                alt=""
                                aria-hidden="true"
                                className="absolute left-[-4%] top-[52%] z-30 w-[32%] sm:left-[-6%] sm:w-[34%]"
                                style={{ rotate: `${JET_ROTATE}deg` }}
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        ref={rightRef}
                        variants={stagger}
                        initial="hidden"
                        animate={rightInView ? "show" : "hidden"}
                        className="w-full max-w-[640px] lg:w-[53%] lg:max-w-none"
                    >
                        <motion.p variants={fadeUp} className="text-[14px] font-semibold text-brand-plum sm:text-[15px]">
                            About Us
                        </motion.p>

                        <motion.h2
                            variants={fadeUp}
                            className="mt-1 text-[clamp(26px,6.5vw,34px)] font-extrabold leading-[1.1] text-brand-ink sm:text-[clamp(32px,4vw,40px)] lg:text-[clamp(32px,3.4vw,50px)] lg:leading-[1.08]"
                        >
                            Making Childhood Stories
                            <br className="hidden sm:block" /> Spark With Imagination
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="mt-4 max-w-[600px] text-[14px] font-medium leading-[1.65] text-brand-ink/65 sm:text-[15px]"
                        >
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since 1966, when designers at Letraset and James Mosley.
                        </motion.p>

                        <motion.div variants={fadeUp} role="tablist" className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                            {(Object.keys(TAB_LABELS) as TabKey[]).map((key) => {
                                const active = tab === key;
                                return (
                                    <button
                                        key={key}
                                        type="button"
                                        role="tab"
                                        aria-selected={active}
                                        onClick={() => setTab(key)}
                                        className={`rounded-full border-[1.5px] border-dashed px-4 py-1.5 text-[14px] font-bold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:px-5 sm:text-[15px] ${active
                                            ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                                            : "border-transparent text-brand-ink hover:text-brand-orange"
                                            }`}
                                    >
                                        {TAB_LABELS[key]}
                                    </button>
                                );
                            })}
                        </motion.div>

                        <div className="mt-5 min-h-[100px] max-w-[600px] sm:mt-6 sm:min-h-[80px]">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={tab}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[14px] font-medium leading-[1.65] text-brand-ink/65 sm:text-[15px]"
                                >
                                    {TABS[tab]}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <motion.ul variants={fadeUp} className="mt-4 space-y-3">
                            {CHECKS.map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-orange">
                                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} />
                                    </span>
                                    <span className="text-[14px] font-bold text-brand-ink sm:text-[15px]">{item}</span>
                                </li>
                            ))}
                        </motion.ul>

                        <motion.div variants={fadeUp} className="mt-7 sm:mt-8">
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center justify-center rounded-full bg-brand-orange px-7 py-3 text-[14px] font-bold uppercase tracking-wide text-white shadow-[0_10px_24px_-8px_rgba(209,129,9,0.5)] outline-[1.5px] outline-dashed -outline-offset-[6px] outline-white/75 transition-colors duration-300 hover:bg-brand-orange-dark sm:px-8 sm:py-3.5 sm:text-[15px]"
                            >
                                Contact Us
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}