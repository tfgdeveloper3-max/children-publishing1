import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useReducedMotion, type Variants } from "motion/react";
import { Eye } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const TOTAL = 15;
const IMG_EXT = "png";
const STEP_MS = 2600;
const MOVE_SEC = 1.5;
const EASE_FLOW = [0.45, 0, 0.2, 1] as const;

const MotionLink = motion.create(Link);

const COVERS = Array.from({ length: TOTAL }, (_, i) => ({
    src: `/images/Cover-${i + 1}.${IMG_EXT}`,
    alt: `Book cover ${i + 1}`,
}));

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

function slotToCell(slot: number, cols: number) {
    const row = Math.floor(slot / cols);
    const c = slot % cols;
    const col = row % 2 === 0 ? c : cols - 1 - c;
    return { row, col };
}

function useWidth<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);
    return [ref, width] as const;
}

export default function AboutPortfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { amount: 0.25 });
    const headRef = useRef<HTMLDivElement>(null);
    const headInView = useInView(headRef, { once: true, amount: 0.5 });
    const reduceMotion = useReducedMotion();

    const [boxRef, width] = useWidth<HTMLDivElement>();
    const [step, setStep] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (!inView || paused || reduceMotion) return;
        const id = window.setInterval(() => setStep((s) => s + 1), STEP_MS);
        return () => window.clearInterval(id);
    }, [inView, paused, reduceMotion]);

    const cols = width < 560 ? 3 : 5;
    const rows = Math.ceil(TOTAL / cols);
    const gapX = cols === 5 ? Math.max(12, width * 0.034) : 10;
    const gapY = cols === 5 ? gapX * 0.55 : 10;
    const cardW = width > 0 ? (width - gapX * (cols - 1)) / cols : 0;
    const cardH = cardW * 0.975;
    const boxH = rows * cardH + (rows - 1) * gapY;

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#f6f1e4] bg-[url('/images/Portfolio-Bg.png')] bg-cover bg-center py-14 sm:py-16 lg:py-20"
        >
            <div className="relative z-10 mx-auto max-w-[1140px] px-4 sm:px-5">
                <motion.div ref={headRef} variants={stagger} initial="hidden" animate={headInView ? "show" : "hidden"} className="text-center">
                    <motion.p variants={fadeUp} className="text-[13px] font-semibold text-brand-plum sm:text-[14px]">
                        Our Portfolio
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="mx-auto mt-1 max-w-[620px] text-[clamp(26px,6vw,40px)] font-extrabold leading-[1.1] text-brand-ink lg:text-[clamp(34px,3.6vw,54px)] lg:leading-[1.08]"
                    >
                        Books we're proud to have made.
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mt-3 max-w-[600px] text-[13px] leading-[1.75] text-brand-ink/75 sm:mt-4 sm:text-[15px]"
                    >
                        From playful picture books to bedtime favourites, here are some of the stories we've helped bring into the world.
                    </motion.p>
                </motion.div>

                <motion.div variants={fadeUp} initial="hidden" animate={headInView ? "show" : "hidden"} className="mt-7 sm:mt-8 lg:mt-10">
                    <div
                        ref={boxRef}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onFocusCapture={() => setPaused(true)}
                        onBlurCapture={() => setPaused(false)}
                        className="relative mx-auto w-full max-w-[1100px]"
                        style={{ height: boxH }}
                    >
                        {width > 0 && (
                            <AnimatePresence initial={false}>
                                {COVERS.map((cover, i) => {
                                    const raw = i + step;
                                    const slot = raw % TOTAL;
                                    const lap = Math.floor(raw / TOTAL);
                                    const { row, col } = slotToCell(slot, cols);
                                    const x = col * (cardW + gapX);
                                    const y = row * (cardH + gapY);

                                    return (
                                        <motion.div
                                            key={`${i}-${lap}`}
                                            initial={{ opacity: 0, scale: 0.92, x, y }}
                                            animate={{ opacity: 1, scale: 1, x, y }}
                                            exit={{ opacity: 0, scale: 0.92, transition: { duration: MOVE_SEC * 0.7, ease: EASE_FLOW } }}
                                            transition={{
                                                x: { duration: MOVE_SEC, ease: EASE_FLOW },
                                                y: { duration: MOVE_SEC, ease: EASE_FLOW },
                                                opacity: { duration: MOVE_SEC, ease: EASE_FLOW },
                                                scale: { duration: MOVE_SEC, ease: EASE_FLOW },
                                            }}
                                            className="absolute left-0 top-0"
                                            style={{ width: cardW, height: cardH, willChange: "transform, opacity", backfaceVisibility: "hidden" }}
                                        >
                                            <Link
                                                to="/portfolio"
                                                aria-label={`View Book: ${cover.alt}`}
                                                className="group relative block h-full w-full overflow-hidden rounded-[3px] shadow-[0_10px_14px_-8px_rgba(37,40,62,0.55)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/50 sm:shadow-[0_14px_18px_-8px_rgba(37,40,62,0.55)]"
                                            >
                                                <img
                                                    src={cover.src}
                                                    alt={cover.alt}
                                                    loading="lazy"
                                                    draggable={false}
                                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
                                                />
                                                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-ink/0 transition-colors duration-500 group-hover:bg-brand-ink/55 group-focus-visible:bg-brand-ink/55">
                                                    <span className="inline-flex translate-y-3 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-brand-ink opacity-0 shadow-[0_8px_18px_-8px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:px-4 sm:py-2 sm:text-[12px]">
                                                        <Eye className="h-3.5 w-3.5 text-brand-orange" strokeWidth={2.4} />
                                                        View Book
                                                    </span>
                                                </span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        )}
                    </div>
                </motion.div>

                <motion.div variants={fadeUp} initial="hidden" animate={headInView ? "show" : "hidden"} className="mt-8 flex justify-center sm:mt-10">
                    <MotionLink
                        to="/portfolio"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center justify-center rounded-full bg-brand-orange px-7 py-3 text-[14px] font-bold uppercase tracking-wide text-white shadow-[0_10px_24px_-8px_rgba(209,129,9,0.5)] outline-[1.5px] outline-dashed -outline-offset-[6px] outline-white/75 transition-colors duration-300 hover:bg-brand-orange-dark sm:px-8 sm:py-3.5 sm:text-[15px]"
                    >
                        See All Projects
                    </MotionLink>
                </motion.div>
            </div>
        </section>
    );
}