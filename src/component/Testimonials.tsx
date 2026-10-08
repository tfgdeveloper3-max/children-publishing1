import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, type Variants } from "motion/react";
import { Quote, Star } from "lucide-react";

const EASE_SOFT = [0.45, 0, 0.2, 1] as const;
const SLIDE_MS = 6000;
const SLIDE_SEC = 1.2;

type Testimonial = { name: string; role: string; avatar: string; rating: number; text: string };

const TESTIMONIALS: Testimonial[] = [
    {
        name: "— Emily Carter",
        role: "Children's Book Author",
        avatar: "/images/Client-1.jpg",
        rating: 5,
        text: "The illustrations were even better than I had imagined. Every character looked just as I'd pictured, and the team kept me updated at every step.",
    },
    {
        name: "Daniel Morgan",
        role: "Self-Published Author",
        avatar: "/images/Client-2.jpg",
        rating: 5,
        text: "I knew nothing about formatting or KDP. Toonhaus handled it all, and my book was live on Amazon sooner than I expected.",
    },
    {
        name: "Sophia Bennett",
        role: "Founder, Sample Press",
        avatar: "/images/Client-3.jpg",
        rating: 5,
        text: "Friendly, reliable and creative. The cover design stood out right away, and our readers keep telling us how much they love it.",
    },
];

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_SOFT } },
};
const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const slide: Variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 70 : -70, opacity: 0 }),
    center: {
        x: 0,
        opacity: 1,
        transition: {
            x: { duration: SLIDE_SEC, ease: EASE_SOFT },
            opacity: { duration: SLIDE_SEC * 0.8, ease: "easeOut", delay: 0.15 },
        },
    },
    exit: (dir: number) => ({
        x: dir > 0 ? -70 : 70,
        opacity: 0,
        transition: {
            x: { duration: SLIDE_SEC, ease: EASE_SOFT },
            opacity: { duration: SLIDE_SEC * 0.6, ease: "easeIn" },
        },
    }),
};

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { amount: 0.3 });
    const headRef = useRef<HTMLDivElement>(null);
    const headInView = useInView(headRef, { once: true, amount: 0.5 });
    const reduceMotion = useReducedMotion();

    const [[index, dir], setSlide] = useState<[number, number]>([0, 1]);
    const [paused, setPaused] = useState(false);

    const goTo = (next: number) => {
        if (next === index) return;
        setSlide([next, next > index ? 1 : -1]);
    };

    useEffect(() => {
        if (!inView || paused || reduceMotion) return;
        const id = window.setTimeout(() => setSlide(([i]) => [(i + 1) % TESTIMONIALS.length, 1]), SLIDE_MS);
        return () => window.clearTimeout(id);
    }, [index, inView, paused, reduceMotion]);

    const t = TESTIMONIALS[index];

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-brand-plum">
            <div aria-hidden="true" className="scallop-edge absolute inset-x-0 top-0 z-30 h-[7px]" />
            <div aria-hidden="true" className="scallop-edge absolute inset-x-0 bottom-0 z-30 h-[7px] rotate-180" />

            {/* Mobile/Tablet: photo upar, purple panel neeche | Laptop+: side by side */}
            <div className="flex flex-col lg:min-h-[600px] lg:flex-row xl:min-h-[640px]">
                <div className="relative h-[240px] w-full sm:h-[340px] md:h-[400px] lg:h-auto lg:w-[45%]">
                    <img
                        src="/images/Testimonial-1.png"
                        alt="Open children's picture books on an orange table"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>

                {/* pb: mobile/tablet par neeche kid ke liye jagah */}
                <div className="relative w-full px-5 pb-[215px] pt-12 sm:px-10 sm:pb-[245px] lg:w-[55%] lg:px-[6%] lg:pb-20 lg:pt-20 xl:pb-24">
                    {/* Doodles sirf bade desktop par, warna heading se takrate hain */}
                    <img
                        src="/images/06.svg.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[5%] top-[3%] hidden w-[110px] xl:block 2xl:w-[140px]"
                    />
                    <img
                        src="/images/note-book.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-[12%] right-[34%] hidden w-[100px] xl:block 2xl:w-[110px]"
                    />

                    <motion.img
                        src="/images/Kid.png"
                        alt=""
                        aria-hidden="true"
                        initial={{ opacity: 0, y: 40 }}
                        animate={headInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.1, ease: EASE_SOFT, delay: 0.3 }}
                        className="pointer-events-none absolute bottom-0 right-[2%] z-10 h-[200px] w-auto sm:right-[4%] sm:h-[230px] lg:right-[1%] lg:h-[44%] xl:h-[50%]"
                    />

                    {/* Laptop+ par content ki width kam, taake text kid ke upar na aaye */}
                    <motion.div
                        ref={headRef}
                        variants={stagger}
                        initial="hidden"
                        animate={headInView ? "show" : "hidden"}
                        className="relative z-20 max-w-[620px] lg:max-w-[64%] xl:max-w-[68%] 2xl:max-w-[620px]"
                    >
                        <motion.p variants={fadeUp} className="text-[13px] font-semibold text-white sm:text-[14px]">
                            Testimonials
                        </motion.p>
                        <motion.h2
                            variants={fadeUp}
                            className="mt-1 text-[clamp(24px,6vw,36px)] font-extrabold leading-[1.15] text-white lg:text-[clamp(28px,2.9vw,46px)]"
                        >
                            Loved by authors, trusted by publishers.
                        </motion.h2>

                        <motion.div
                            variants={fadeUp}
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                            className="mt-7 grid overflow-hidden sm:mt-8"
                            aria-live="polite"
                        >
                            <AnimatePresence initial={false} custom={dir}>
                                {/* Avatar + text: mobile column, tablet row, laptop column (kam jagah), desktop row */}
                                <motion.div
                                    key={index}
                                    custom={dir}
                                    variants={slide}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="col-start-1 row-start-1 flex flex-col gap-5 sm:flex-row sm:gap-8 lg:flex-col lg:gap-5 xl:flex-row xl:gap-8"
                                    style={{ willChange: "transform, opacity" }}
                                >
                                    <div className="relative ml-1 h-[96px] w-[96px] shrink-0 sm:h-[110px] sm:w-[110px] xl:h-[130px] xl:w-[130px]">
                                        <img src={t.avatar} alt={t.name} className="h-full w-full rounded-full border-4 border-white object-cover" />
                                        <span className="absolute -bottom-1 -right-3 flex h-[46px] w-[46px] items-center justify-center rounded-full border-[3px] border-white bg-brand-orange sm:h-[52px] sm:w-[52px] xl:h-[60px] xl:w-[60px]">
                                            <Quote className="h-5 w-5 rotate-180 fill-white text-white sm:h-6 sm:w-6" strokeWidth={1.5} />
                                        </span>
                                    </div>

                                    <div className="max-w-[400px]">
                                        <h3 className="text-[18px] font-bold text-white sm:text-[19px]">{t.name}</h3>
                                        <p className="mt-0.5 text-[13px] font-semibold text-brand-orange sm:text-[14px]">{t.role}</p>
                                        <div className="mt-2 flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                                            {Array.from({ length: 5 }, (_, s) => (
                                                <Star
                                                    key={s}
                                                    className={`h-4 w-4 ${s < t.rating ? "fill-brand-orange text-brand-orange" : "text-white/30"}`}
                                                    strokeWidth={1.5}
                                                />
                                            ))}
                                        </div>
                                        <p className="mt-3 text-[14px] font-medium leading-[1.7] text-white/90 sm:text-[15px]">{t.text}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2.5 sm:mt-10">
                            {TESTIMONIALS.map((item, i) => (
                                <button
                                    key={item.name}
                                    type="button"
                                    aria-label={`Show testimonial ${i + 1}`}
                                    aria-current={i === index}
                                    onClick={() => goTo(i)}
                                    className="relative h-3 w-3 rounded-full bg-white/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    {i === index && (
                                        <motion.span
                                            layoutId="testimonial-dot"
                                            transition={{ duration: 0.6, ease: EASE_SOFT }}
                                            className="absolute inset-0 rounded-full bg-brand-orange"
                                        />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}