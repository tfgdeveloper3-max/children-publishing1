import { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";

type Logo = { name: string; src: string };

const LOGOS: Logo[] = [
    { name: "Apple Books", src: "/images/logos/ibooks.png" },
    { name: "Amazon", src: "/images/logos/amazon.png" },
    { name: "IngramSpark", src: "/images/logos/ingramspark.png" },
    { name: "Penguin Random House", src: "/images/logos/penguin-random-house.png" },
    { name: "Kobo", src: "/images/logos/kobo.png" },
];

const SPEED = 40;

const scallopDown = {
    WebkitMaskImage: "radial-gradient(circle at 6px 0, #000 5px, transparent 5.5px)",
    maskImage: "radial-gradient(circle at 6px 0, #000 5px, transparent 5.5px)",
    WebkitMaskSize: "12px 100%",
    maskSize: "12px 100%",
} as const;

export default function ServicePartners() {
    const reduceMotion = useReducedMotion();
    const trackRef = useRef<HTMLUListElement>(null);
    const x = useMotionValue(0);
    const [paused, setPaused] = useState(false);

    useAnimationFrame((_, delta) => {
        if (paused || reduceMotion || !trackRef.current) return;
        const half = trackRef.current.scrollWidth / 2;
        let next = x.get() - (SPEED * delta) / 1000;
        if (next <= -half) next += half;
        x.set(next);
    });

    const set = [...LOGOS, ...LOGOS];

    return (
        <section aria-label="Publishing partners" className="relative z-10 bg-brand-plum">
            <div className="mx-auto max-w-[1140px] py-5 sm:py-6">
                {reduceMotion ? (
                    <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5 px-4">
                        {LOGOS.map((logo) => (
                            <li key={logo.name}>
                                <img src={logo.src} alt={logo.name} className="h-7 w-auto sm:h-9" />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div
                        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <motion.ul ref={trackRef} style={{ x }} className="flex w-max items-center gap-14 pr-14 sm:gap-20 sm:pr-20 lg:gap-24 lg:pr-24">
                            {[...set, ...set].map((logo, i) => (
                                <li key={i} aria-hidden={i >= LOGOS.length || undefined} className="shrink-0 transition-transform duration-300 hover:scale-110">
                                    <img src={logo.src} alt={i >= LOGOS.length ? "" : logo.name} loading="lazy" className="h-7 w-auto select-none sm:h-9 lg:h-10" />
                                </li>
                            ))}
                        </motion.ul>
                    </div>
                )}
            </div>
            <div aria-hidden="true" className="absolute inset-x-0 top-full h-[6px] bg-brand-plum" style={scallopDown} />
        </section>
    );
}