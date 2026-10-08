import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
    motion,
    AnimatePresence,
    animate,
    useMotionValue,
    useReducedMotion,
    type AnimationPlaybackControls,
    type Variants,
} from "motion/react";
import { ChevronLeft, ChevronRight, Sparkle, Star } from "lucide-react";
import "animate.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_SEC = 7;
const SWIPE_PX = 60;

type Banner = { kind: "banner"; src: string; alt: string; focus: string };
type Original = { kind: "original"; src: string; alt: string; bg: string };
type Slide = Original | Banner;

const SLIDES: Slide[] = [
    { kind: "original", src: "/images/Hero-bg-right.png", alt: "A mother reading a picture book to her son at bedtime", bg: "/images/Hero-Banner-1-BG.jpg" },
    { kind: "banner", src: "/images/Hero-Banner-2.jpg", alt: "A happy woolly mammoth catching snowflakes in an icy land", focus: "82% center" },
    { kind: "banner", src: "/images/Hero-Banner-3.jpg", alt: "A red-haired girl running along a farm path past a red barn", focus: "70% center" },
    { kind: "banner", src: "/images/Hero-Banner-4.jpg", alt: "Two children finding a flower on a sunny forest trail", focus: "72% center" },
];

const sparkles = [
    { left: "36%", top: "12%", size: 10, delay: 0 },
    { left: "49%", top: "24%", size: 8, delay: 1.4 },
    { left: "57%", top: "9%", size: 7, delay: 2.6 },
    { left: "74%", top: "6%", size: 9, delay: 0.8 },
    { left: "90%", top: "16%", size: 7, delay: 2 },
];

const PRELOAD = [...SLIDES.map((s) => s.src), "/images/Hero-Banner-1-BG.jpg", "/images/Banner-Overlay.png"];

function OriginalSlide({ slide }: { slide: Original }) {
    return (
        <div className="absolute inset-0 isolate bg-brand-night">
            <img
                src={slide.bg}
                alt="Smiling children doing arts and crafts together"
                draggable={false}
                decoding="async"
                className="absolute inset-0 h-full w-full select-none object-cover"
                style={{ objectPosition: "70% center" }}
            />

            <div className="mask-fade-left absolute -top-[8%] right-0 aspect-square h-[110%] overflow-hidden">
                <motion.img
                    src={slide.src}
                    alt={slide.alt}
                    draggable={false}
                    initial={{ scale: 1.04 }}
                    animate={{ scale: [1.04, 1.0, 1.03] }}
                    transition={{ duration: 28, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                    style={{ willChange: "transform", transformOrigin: "70% 50%" }}
                    className="h-full w-full select-none object-cover"
                />
            </div>

            <img
                src="/images/Banner-Overlay.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-fill opacity-90 lg:opacity-80"
            />

            {sparkles.map((s, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    className="pointer-events-none absolute hidden text-amber-100 sm:block"
                    style={{ left: s.left, top: s.top }}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 90] }}
                    transition={{ duration: 4.5, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Sparkle style={{ width: s.size, height: s.size }} fill="currentColor" strokeWidth={0} />
                </motion.span>
            ))}
        </div>
    );
}

function BannerSlide({ slide }: { slide: Banner }) {
    return (
        <div className="absolute inset-0 bg-brand-night">
            <img
                src={slide.src}
                alt={slide.alt}
                draggable={false}
                decoding="async"
                className="h-full w-full select-none object-cover"
                style={{ objectPosition: slide.focus }}
            />
            <img
                src="/images/Banner-Overlay.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-fill opacity-90 lg:opacity-80"
            />
        </div>
    );
}

const contentVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};

const slideVariants: Variants = {
    enter: (dir: number) => ({ opacity: 0, x: `${dir * 2.5}%`, scale: 1.1 }),
    center: {
        opacity: 1,
        x: "0%",
        scale: 1,
        transition: {
            opacity: { duration: 1.6, ease: EASE },
            x: { duration: 1.9, ease: EASE },
            scale: { duration: AUTOPLAY_SEC + 2, ease: "easeOut" },
        },
    },
    exit: (dir: number) => ({
        opacity: 0,
        x: `${dir * -2}%`,
        scale: 1.05,
        transition: { duration: 1.6, ease: EASE },
    }),
};

const Splat = () => (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] text-brand-plum sm:h-[18px] sm:w-[18px]" fill="currentColor" aria-hidden="true">
        <path d="M12 1.8l1.6 4.4 3.6-2.6-.9 4.4 4.6-.2-3.4 3 4.1 2.1-4.5.9 2 4.1-4.2-1.8-.4 4.6-2.5-3.8-2.5 3.8-.4-4.6-4.2 1.8 2-4.1-4.5-.9 4.1-2.1-3.4-3 4.6.2-.9-4.4 3.6 2.6z" />
        <circle cx="20.5" cy="3.5" r="1.2" />
        <circle cx="3" cy="20.5" r="0.9" />
    </svg>
);

const BubbleTail = () => (
    <svg
        viewBox="0 0 70 55"
        className="absolute -bottom-[38px] left-[54%] h-[45px] w-[57px] sm:-bottom-[47px] sm:h-[55px] sm:w-[70px]"
        aria-hidden="true"
    >
        <path d="M4 0 H66 V11 C46 25 30 39 16 50 C12 53 7 52 8 47 C10 35 6 21 2 11 Z" fill="var(--color-brand-paper)" />
        <path
            d="M2 10.5 C6 21 10 35 8 47 C7 52 12 53 16 50 C30 39 46 25 68 10.5"
            fill="none"
            stroke="#fff"
            strokeWidth="5"
            strokeLinecap="round"
        />
        <path
            d="M9 2 C12 16 15 31 14 42 C14 45 16 45 18 43 C30 33 43 20 59 2"
            fill="none"
            stroke="var(--color-brand-dots)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0 5"
        />
    </svg>
);

export default function Hero() {
    const reduceMotion = useReducedMotion();
    const total = SLIDES.length;

    const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
    const [hovered, setHovered] = useState(false);
    const [tabHidden, setTabHidden] = useState(false);

    const progress = useMotionValue(0);
    const controlsRef = useRef<AnimationPlaybackControls | null>(null);

    const paused = hovered || tabHidden || !!reduceMotion;

    const goTo = useCallback(
        (next: number, dir: number) => {
            controlsRef.current?.stop();
            progress.set(0);
            setSlide([(next + total) % total, dir]);
        },
        [progress, total]
    );

    const go = useCallback((dir: 1 | -1) => goTo(index + dir, dir), [goTo, index]);

    useEffect(() => {
        PRELOAD.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.decode?.().catch(() => { });
        });
    }, []);

    useEffect(() => {
        const onVisibility = () => setTabHidden(document.hidden);
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    useEffect(() => {
        if (paused) return;
        const remaining = Math.max(0.05, (1 - progress.get()) * AUTOPLAY_SEC);
        const controls = animate(progress, 1, {
            duration: remaining,
            ease: "linear",
            onComplete: () => go(1),
        });
        controlsRef.current = controls;
        return () => controls.stop();
    }, [index, paused, progress, go]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go]);

    const slide = SLIDES[index];

    const cardEntrance = {
        "--animate-duration": "1.4s",
        animationDelay: "0.3s",
    } as CSSProperties;

    const counterAnim = { "--animate-duration": "0.8s" } as CSSProperties;

    const navBtn =
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:w-11";

    return (
        <motion.section
            aria-roledescription="carousel"
            aria-label="Featured illustrations"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onPanEnd={(_, info) => {
                if (info.offset.x < -SWIPE_PX) go(1);
                else if (info.offset.x > SWIPE_PX) go(-1);
            }}
            style={{ touchAction: "pan-y" }}
            className="relative isolate overflow-hidden bg-brand-night"
        >
            <div className="absolute inset-0 -z-20 overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={reduceMotion ? undefined : slideVariants}
                        initial={reduceMotion ? { opacity: 0 } : "enter"}
                        animate={reduceMotion ? { opacity: 1, transition: { duration: 0.4 } } : "center"}
                        exit={reduceMotion ? { opacity: 0, transition: { duration: 0.4 } } : "exit"}
                        className="absolute inset-0"
                        style={{ willChange: "transform, opacity" }}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${total}`}
                    >
                        {slide.kind === "original" ? <OriginalSlide slide={slide} /> : <BannerSlide slide={slide} />}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="pointer-events-none absolute inset-0 -z-10 bg-brand-night/35 lg:hidden" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-brand-night/60 to-transparent" />

            <motion.div
                aria-hidden="true"
                className="absolute left-[4%] top-[5%] text-brand-orange sm:top-[10%] lg:top-[14%] xl:left-[8%] xl:top-[17%]"
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
            >
                <motion.div
                    animate={{ rotate: [0, 14, -8, 0], scale: [1, 1.12, 0.96, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Star className="h-6 w-6 drop-shadow-[0_0_6px_rgba(209,129,9,0.55)] sm:h-7 sm:w-7" strokeWidth={1.6} />
                </motion.div>
            </motion.div>

            <div className="relative mx-auto flex min-h-[540px] max-w-[1140px] items-center px-4 pb-28 pt-14 sm:min-h-[600px] sm:px-5 sm:pb-28 sm:pt-20 lg:min-h-[clamp(620px,42vw,820px)]">
                <div
                    className="animate__animated animate__fadeInLeft w-full max-w-[600px] lg:max-w-[560px] xl:max-w-[600px]"
                    style={cardEntrance}
                >
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        style={{ willChange: "transform" }}
                        className="drop-shadow-[0_24px_40px_rgba(16,10,40,0.45)]"
                    >
                        <div className="relative rounded-[26px] border-[4px] border-white bg-brand-paper sm:rounded-[34px] sm:border-[5px]">
                            <span className="pointer-events-none absolute inset-[4px] rounded-[20px] border-2 border-dotted border-brand-dots sm:inset-[5px] sm:rounded-[26px]" />

                            <motion.div
                                variants={contentVariants}
                                initial="hidden"
                                animate="show"
                                className="relative px-5 pb-9 pt-7 min-[400px]:px-6 sm:px-10 sm:pb-12 sm:pt-11"
                            >
                                <motion.p
                                    variants={itemVariants}
                                    className="flex items-start gap-2 text-[11px] font-semibold leading-snug text-brand-plum sm:items-center sm:text-[13px]"
                                >
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                                        className="inline-flex shrink-0"
                                    >
                                        <Splat />
                                    </motion.span>
                                    Picture Books • Cover Design • Self-Publishing • Author Branding
                                </motion.p>

                                <motion.h1
                                    variants={itemVariants}
                                    className="mt-3 text-[25px] font-bold leading-[1.12] text-brand-ink min-[400px]:text-[28px] sm:text-[36px] lg:text-[37px] xl:text-[39px]"
                                >
                                    Stories that {" "}
                                    <span className="text-brand-plum">leap off the page</span>
                                </motion.h1>

                                <motion.p variants={itemVariants} className="mt-2 max-w-[300px] text-[12px] font-medium text-brand-ink/90 sm:text-[13px]">
                                    We illustrate, design and publish children's books that little readers ask for again and again.
                                </motion.p>

                                <motion.div variants={itemVariants} className="mt-6 sm:mt-7">
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={{ type: "spring", stiffness: 220, damping: 20 }}
                                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-orange px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_10px_22px_-10px_rgba(209,129,9,0.9)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40 sm:px-8"
                                    >
                                        <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
                                        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
                                        <span className="relative">See Our Books</span>
                                    </motion.a>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 40, rotate: 4 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                transition={{ duration: 1.4, ease: EASE, delay: 1.5 }}
                                className="pointer-events-none absolute bottom-3 right-3 w-[30%] max-w-[200px] sm:bottom-4 sm:right-6 sm:w-[36%]"
                            >
                                <motion.img
                                    src="/images/Hero-Box.png"
                                    alt="Two children walking to school holding hands"
                                    animate={{ y: [0, -7, 0], rotate: [-1.5, 1.5, -1.5] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ willChange: "transform" }}
                                    className="w-full"
                                />
                            </motion.div>

                            <BubbleTail />
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-5 z-10 sm:bottom-7">
                <div
                    className="animate__animated animate__fadeInUp mx-auto flex max-w-[1140px] items-center justify-center gap-4 px-4 sm:justify-end sm:gap-5 sm:px-5"
                    style={{ "--animate-duration": "1.2s", animationDelay: "1.2s" } as CSSProperties}
                >
                    <div className="flex items-baseline gap-1 font-bold text-white tabular-nums">
                        <span key={index} className="animate__animated animate__fadeInDown inline-block text-[20px] sm:text-[24px]" style={counterAnim}>
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13px] text-white/60 sm:text-[14px]">/ {String(total).padStart(2, "0")}</span>
                    </div>

                    <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
                        {SLIDES.map((s, i) => (
                            <button
                                key={s.src}
                                type="button"
                                role="tab"
                                aria-selected={i === index}
                                aria-label={`Go to slide ${i + 1}`}
                                onClick={() => i !== index && goTo(i, i > index ? 1 : -1)}
                                className="group relative h-6 w-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-12"
                            >
                                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/30 transition-colors group-hover:bg-white/50">
                                    {i === index && (
                                        <motion.span
                                            className="absolute inset-0 origin-left rounded-full bg-brand-orange"
                                            style={{ scaleX: reduceMotion ? 1 : progress }}
                                        />
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className={navBtn}>
                            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
                        </button>
                        <button type="button" aria-label="Next slide" onClick={() => go(1)} className={navBtn}>
                            <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}