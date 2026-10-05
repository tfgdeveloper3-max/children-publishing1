import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import {
    ArrowUpRight,
    Backpack,
    MoveLeft,
    MoveRight,
    PenTool,
    School,
    type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Service = {
    title: string;
    image: string;
    icon: LucideIcon;
    href: string;
};

const services: Service[] = [
    { title: "Children's Book Illustration", image: "/images/Cover3.png", icon: School, href: "#" },
    { title: "Amazon KDP & Publishing", image: "/images/Cover2.png", icon: Backpack, href: "#" },
    { title: "Brand Identity & Logo Design", image: "/images/Cover1.png", icon: PenTool, href: "#" },
];

const headingVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 1.1, ease: EASE, delay },
    }),
};

function ServiceCard({ service, delay, show }: { service: Service; delay: number; show: boolean }) {
    const Icon = service.icon;
    return (
        <motion.a
            href={service.href}
            variants={cardVariants}
            custom={delay}
            initial="hidden"
            animate={show ? "show" : "hidden"}
            whileHover="hover"
            className="group block rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-brand-plum/30"
        >
            <div className="stamp-edge relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <motion.img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    variants={{ hover: { scale: 1.07 } }}
                    transition={{ duration: 1.2, ease: EASE }}
                    style={{ willChange: "transform" }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            <motion.div
                variants={{ hover: { y: -6 } }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative z-10 mx-3 -mt-[22%] rounded-2xl bg-[#ebeaee] px-4 pb-5 pt-4 shadow-[0_14px_30px_-18px_rgba(37,40,62,0.45)] sm:mx-4 sm:px-5 sm:pb-6"
            >
                <div className="flex items-start justify-between">
                    <Icon className="mt-1 h-6 w-6 text-[#5b5e6e] sm:h-7 sm:w-7" strokeWidth={1.4} />
                    <motion.span
                        variants={{ hover: { rotate: 45, scale: 1.08 } }}
                        transition={{ type: "spring", stiffness: 200, damping: 16 }}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-plum text-white transition-colors duration-500 group-hover:bg-brand-orange"
                    >
                        <ArrowUpRight className="h-5 w-5" strokeWidth={2.4} />
                    </motion.span>
                </div>
                <h3 className="mt-3 text-[15px] font-bold leading-tight text-brand-ink transition-colors duration-500 group-hover:text-brand-plum sm:mt-4 sm:text-[16px]">
                    {service.title}
                </h3>
            </motion.div>
        </motion.a>
    );
}

/* Haath sirf bade desktop (xl+) par — laptop par carousel se takrate the */
function Hands({ side }: { side: "left" | "right" }) {
    const isLeft = side === "left";
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 z-10 hidden -translate-y-1/2 xl:block ${isLeft ? "left-0" : "right-0"}`}
        >
            <img
                src={isLeft ? "/images/Left.png" : "/images/Right.png"}
                alt=""
                className={`h-[220px] w-auto 2xl:h-[300px] ${isLeft ? "-scale-x-100" : ""}`}
            />
        </div>
    );
}

export default function Services() {
    const n = services.length;
    const loop = [...services, ...services, ...services];

    const [perView, setPerView] = useState(3);
    const [index, setIndex] = useState(n);
    const [instant, setInstant] = useState(false);
    const [paused, setPaused] = useState(false);
    const animating = useRef(false);
    const reduceMotion = useReducedMotion();

    const labelRef = useRef<HTMLParagraphElement>(null);
    const labelInView = useInView(labelRef, { once: true, amount: 0.8 });
    const carouselRef = useRef<HTMLDivElement>(null);
    const carouselInView = useInView(carouselRef, { once: true, amount: 0.3 });

    // Mobile: 1 card | Tablet: 2 cards | Laptop/Desktop: 3 cards
    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const go = useCallback((dir: 1 | -1) => {
        if (animating.current) return;
        animating.current = true;
        setInstant(false);
        setIndex((i) => i + dir);
    }, []);

    const handleComplete = () => {
        if (index >= 2 * n) {
            setInstant(true);
            setIndex(index - n);
        } else if (index < n) {
            setInstant(true);
            setIndex(index + n);
        }
        animating.current = false;
    };

    useEffect(() => {
        if (paused || reduceMotion) return;
        const id = window.setInterval(() => go(1), 5000);
        return () => window.clearInterval(id);
    }, [paused, reduceMotion, go]);

    const arrowBtn =
        "group/arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-brand-ink outline-none transition-colors duration-500 hover:bg-white hover:text-brand-plum hover:shadow-[0_10px_24px_-12px_rgba(37,40,62,0.5)] focus-visible:ring-2 focus-visible:ring-brand-plum sm:h-12 sm:w-12";

    return (
        <section className="relative overflow-hidden bg-[#f9f7f2] py-14 sm:py-20 lg:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
                <img src="/images/Services-BG.png" alt="" className="h-full w-full object-cover object-center" />
            </div>

            <Hands side="left" />
            <Hands side="right" />

            <div className="relative z-20 mx-auto max-w-[1140px] px-3 sm:px-5">
                <motion.div
                    variants={headingVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    className="px-2 text-center"
                >
                    <p
                        ref={labelRef}
                        className={`text-[13px] font-semibold text-brand-plum ${labelInView ? "animate__animated animate__fadeInDown animate__slow" : "opacity-0"}`}
                    >
                        What We Do
                    </p>
                    <motion.h2
                        variants={fadeUp}
                        className="mx-auto mt-1 max-w-[560px] text-[clamp(26px,6vw,44px)] font-bold leading-[1.1] text-brand-ink lg:text-[clamp(28px,3.2vw,44px)]"
                    >
                        Creative services designed around your ideas.
                    </motion.h2>
                </motion.div>

                <div
                    className="mx-auto mt-8 flex max-w-[1040px] items-center gap-1 sm:mt-12 sm:gap-4"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocusCapture={() => setPaused(true)}
                    onBlurCapture={() => setPaused(false)}
                >
                    <motion.button type="button" aria-label="Previous service" onClick={() => go(-1)} whileTap={{ scale: 0.9 }} className={arrowBtn}>
                        <MoveLeft className="h-6 w-6 transition-transform duration-500 group-hover/arrow:-translate-x-1 sm:h-7 sm:w-7" strokeWidth={2.4} />
                    </motion.button>

                    <div ref={carouselRef} className="min-w-0 flex-1 overflow-hidden py-4" aria-roledescription="carousel">
                        <motion.div
                            className="flex"
                            animate={{ x: `${(-index * 100) / perView}%` }}
                            transition={instant ? { duration: 0 } : { duration: 0.9, ease: EASE }}
                            onAnimationComplete={handleComplete}
                            style={{ willChange: "transform" }}
                        >
                            {loop.map((s, i) => (
                                <div key={`${s.title}-${i}`} className="shrink-0 px-1.5 sm:px-2.5" style={{ width: `${100 / perView}%` }}>
                                    <ServiceCard
                                        service={s}
                                        show={carouselInView}
                                        delay={0.25 + Math.max(0, Math.min(i - index, perView - 1)) * 0.12}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.button type="button" aria-label="Next service" onClick={() => go(1)} whileTap={{ scale: 0.9 }} className={arrowBtn}>
                        <MoveRight className="h-6 w-6 transition-transform duration-500 group-hover/arrow:translate-x-1 sm:h-7 sm:w-7" strokeWidth={2.4} />
                    </motion.button>
                </div>
            </div>
        </section>
    );
}