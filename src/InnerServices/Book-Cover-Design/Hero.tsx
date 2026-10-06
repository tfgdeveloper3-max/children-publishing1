import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

type InnerHeroProps = {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
    ctaHref?: string;
    bg?: string;
};

export default function InnerHero({
    eyebrow = "Illustration • Publishing • Branding • Digital Design",
    title = "Book Cover Designing",
    description = "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard.",
    ctaLabel = "Know More",
    ctaHref = "#",
    bg = "/images/Book-Cover-Design-BG.png",
}: InnerHeroProps) {
    const reduceMotion = useReducedMotion();

    return (
        <section className="relative isolate overflow-hidden bg-[#5b3a8c]">
            <motion.img
                src={bg}
                alt=""
                aria-hidden="true"
                draggable={false}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: reduceMotion ? 0.3 : 2.4, ease: EASE }}
                className="absolute inset-0 -z-20 h-full w-full select-none object-cover object-bottom"
                style={{ willChange: "transform" }}
            />

            <div className="pointer-events-none absolute inset-0 -z-10 bg-[#5d3896]/80" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(40,18,80,0.35),transparent_65%)]" />

            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 border-t-2 border-dashed border-white/80" />

            <div className="mx-auto flex min-h-[340px] max-w-[1140px] items-center justify-center px-4 py-14 sm:min-h-[380px] sm:px-5 lg:min-h-[clamp(400px,32vw,520px)]">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex max-w-[760px] flex-col items-center text-center"
                >
                    <motion.p
                        variants={item}
                        className="text-[11px] font-semibold tracking-wide text-white sm:text-[13px] lg:text-[14px]"
                    >
                        {eyebrow}
                    </motion.p>

                    <motion.h1
                        variants={item}
                        className="mt-2 text-[34px] font-bold leading-[1.1] text-white drop-shadow-[0_4px_18px_rgba(30,10,60,0.35)] min-[400px]:text-[38px] sm:mt-3 sm:text-[50px] lg:text-[60px]"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="mt-3 max-w-[640px] text-[12px] font-medium leading-[1.9] text-white/95 sm:mt-4 sm:text-[13px] lg:text-[14px]"
                    >
                        {description}
                    </motion.p>

                    <motion.div variants={item} className="mt-6 sm:mt-7">
                        <motion.a
                            href={ctaHref}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 220, damping: 20 }}
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-orange px-7 py-3 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_10px_22px_-10px_rgba(209,129,9,0.9)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40 sm:px-8"
                        >
                            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
                            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
                            <span className="relative">{ctaLabel}</span>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}