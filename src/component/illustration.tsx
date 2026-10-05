import { useCallback, useEffect, useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    animate,
    useInView,
    useMotionValue,
    useReducedMotion,
    useTransform,
    type MotionValue,
    type Variants,
} from "motion/react";
import { MoveLeft, MoveRight } from "lucide-react";

const FLIP_SEC = 1.35;
const FLIP_EASE = [0.645, 0.045, 0.355, 1] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

type Spread = { title: string; src: string };
const SPREADS: Spread[] = [
    { title: "Dirty Shoes", src: "/images/Illustration-1.jpg" },
    { title: "Midnight Snack", src: "/images/Illustration-2.jpg" },
    { title: "Mouse Trap", src: "/images/Illustration-3.jpg" },
    { title: "Wobbly Woes", src: "/images/Illustration-4.jpg" },
];

type Side = "left" | "right";
type Flip = { to: number; dir: 1 | -1 } | null;

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

function Page({ spread, side }: { spread: Spread; side: Side }) {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#f4f1ea]">
            <img
                src={spread.src}
                alt={side === "left" ? `${spread.title} illustration` : ""}
                draggable={false}
                decoding="async"
                className="absolute top-0 h-full w-[200%] max-w-none select-none object-cover"
                style={{ left: side === "left" ? 0 : "-100%" }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-[14%]"
                style={{
                    [side === "left" ? "right" : "left"]: 0,
                    background: `linear-gradient(to ${side === "left" ? "left" : "right"}, rgba(0,0,0,0.32), rgba(0,0,0,0.08) 45%, transparent)`,
                }}
            />
        </div>
    );
}

function Leaf({ rot, dir, front, back }: { rot: MotionValue<number>; dir: 1 | -1; front: Spread; back: Spread }) {
    const progress = useTransform(rot, (r) => Math.abs(r) / 180);
    const frontShade = useTransform(progress, [0, 0.5], [0, 0.5]);
    const backShade = useTransform(progress, [0.5, 1], [0.5, 0]);
    const lift = useTransform(progress, [0, 0.5, 1], [0, 40, 0]);

    const forward = dir === 1;
    const frontSide: Side = forward ? "right" : "left";
    const backSide: Side = forward ? "left" : "right";

    return (
        <motion.div
            className="absolute top-0 z-20 h-full w-1/2"
            style={{
                left: forward ? "50%" : 0,
                rotateY: rot,
                z: lift,
                transformOrigin: forward ? "left center" : "right center",
                transformStyle: "preserve-3d",
                willChange: "transform",
            }}
        >
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                <Page spread={front} side={frontSide} />
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ opacity: frontShade, background: `linear-gradient(to ${forward ? "right" : "left"}, rgba(0,0,0,0.55), rgba(0,0,0,0.15))` }}
                />
            </div>

            <div className="absolute inset-0" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                <Page spread={back} side={backSide} />
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ opacity: backShade, background: `linear-gradient(to ${forward ? "left" : "right"}, rgba(0,0,0,0.55), rgba(0,0,0,0.15))` }}
                />
            </div>
        </motion.div>
    );
}

export default function Illustrations() {
    const headRef = useRef<HTMLDivElement>(null);
    const inView = useInView(headRef, { once: true, amount: 0.4 });
    const reduceMotion = useReducedMotion();

    const [index, setIndex] = useState(0);
    const [flip, setFlip] = useState<Flip>(null);
    const rot = useMotionValue(0);

    const total = SPREADS.length;
    const wrap = (n: number) => (n + total) % total;

    useEffect(() => {
        SPREADS.forEach((s) => {
            const img = new Image();
            img.src = s.src;
            img.decode?.().catch(() => { });
        });
    }, []);

    const turn = useCallback(
        (dir: 1 | -1) => {
            if (flip) return;
            const to = wrap(index + dir);

            if (reduceMotion) {
                setIndex(to);
                return;
            }

            rot.set(0);
            setFlip({ to, dir });
            animate(rot, dir === 1 ? -180 : 180, {
                duration: FLIP_SEC,
                ease: FLIP_EASE,
                onComplete: () => {
                    setIndex(to);
                    setFlip(null);
                    rot.set(0);
                },
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [flip, index, reduceMotion]
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") turn(1);
            if (e.key === "ArrowLeft") turn(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [turn]);

    const current = SPREADS[index];
    const target = flip ? SPREADS[flip.to] : current;

    const staticLeft = flip?.dir === -1 ? target : current;
    const staticRight = flip?.dir === 1 ? target : current;

    const progress = useTransform(rot, (r) => Math.abs(r) / 180);
    const revealShadow = useTransform(progress, [0, 0.15, 0.85, 1], [0, 0.35, 0.1, 0]);

    // Mobile par arrows white gol buttons (touch ke liye clear), sm+ par transparent
    const arrowBtn =
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-ink shadow-[0_8px_20px_-10px_rgba(37,40,62,0.5)] transition-colors duration-300 hover:bg-brand-plum/10 hover:text-brand-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-plum disabled:opacity-40 sm:h-12 sm:w-12 sm:bg-transparent sm:shadow-none lg:h-14 lg:w-14";

    return (
        <section className="relative overflow-hidden bg-white bg-[url('/images/illustration-BG.png')] bg-cover bg-center py-14 sm:py-16 lg:py-20">
            <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-5">
                <motion.div ref={headRef} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className="text-center">
                    <motion.p variants={fadeUp} className="text-[13px] font-semibold text-brand-plum sm:text-[14px]">
                        Kids Illustrations
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="mt-1 text-[clamp(26px,6vw,40px)] font-extrabold leading-[1.1] text-brand-ink lg:text-[clamp(32px,3.4vw,52px)]"
                    >
                        Explore Our Illustration Work
                    </motion.h2>
                </motion.div>

                {/* Mobile: book poori width, arrows neeche ek row mein
                    Tablet+: arrows book ke dono taraf */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-6 sm:flex-nowrap sm:gap-4 md:gap-6 lg:mt-10 lg:gap-10"
                >
                    <button type="button" aria-label="Previous page" onClick={() => turn(-1)} disabled={!!flip} className={`${arrowBtn} order-2 sm:order-none`}>
                        <MoveLeft className="h-6 w-6 lg:h-8 lg:w-8" strokeWidth={2.6} />
                    </button>

                    <div className="relative order-1 w-full max-w-[1000px] px-[2%] sm:order-none sm:min-w-0 sm:flex-1 sm:px-0">
                        <div aria-hidden="true" className="absolute -left-[0.5%] bottom-[1.2%] top-[1.2%] w-[3%] rounded-l-[3px] bg-[#cfd0d6] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.15)] sm:-left-[1.6%]" />
                        <div aria-hidden="true" className="absolute left-[0.3%] bottom-[0.6%] top-[0.6%] w-[3%] rounded-l-[2px] bg-[#e8e8ec] sm:-left-[0.8%]" />
                        <div aria-hidden="true" className="absolute -right-[0.5%] bottom-[1.2%] top-[1.2%] w-[3%] rounded-r-[3px] bg-[#cfd0d6] shadow-[inset_2px_0_4px_rgba(0,0,0,0.15)] sm:-right-[1.6%]" />
                        <div aria-hidden="true" className="absolute right-[0.3%] bottom-[0.6%] top-[0.6%] w-[3%] rounded-r-[2px] bg-[#e8e8ec] sm:-right-[0.8%]" />

                        <div
                            className="relative aspect-[2/1] w-full shadow-[0_20px_30px_-20px_rgba(37,40,62,0.55)] sm:shadow-[0_30px_40px_-24px_rgba(37,40,62,0.55)]"
                            style={{ perspective: "2400px", transformStyle: "preserve-3d" }}
                        >
                            <div className="absolute inset-y-0 left-0 w-1/2">
                                <Page spread={staticLeft} side="left" />
                                {flip?.dir === -1 && (
                                    <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: revealShadow }} />
                                )}
                            </div>

                            <div className="absolute inset-y-0 right-0 w-1/2">
                                <Page spread={staticRight} side="right" />
                                {flip?.dir === 1 && (
                                    <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: revealShadow }} />
                                )}
                            </div>

                            {flip && <Leaf rot={rot} dir={flip.dir} front={current} back={target} />}

                            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-px -translate-x-1/2 bg-black/25" />
                        </div>
                    </div>

                    <button type="button" aria-label="Next page" onClick={() => turn(1)} disabled={!!flip} className={`${arrowBtn} order-3 sm:order-none`}>
                        <MoveRight className="h-6 w-6 lg:h-8 lg:w-8" strokeWidth={2.6} />
                    </button>
                </motion.div>

                <div className="mt-6 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-center" aria-live="polite">
                    <span className="text-[13px] font-semibold text-brand-ink sm:text-[14px]">Showing Illustration Of -</span>
                    <span className="relative inline-grid">
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                                key={target.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.6, ease: EASE }}
                                className="text-[clamp(20px,5vw,26px)] font-extrabold text-brand-plum lg:text-[clamp(24px,2.2vw,32px)]"
                            >
                                {target.title}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </div>
            </div>
        </section>
    );
}