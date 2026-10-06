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

function LogoItem({ logo, hidden }: { logo: Logo; hidden?: boolean }) {
    return (
        <motion.li
            aria-hidden={hidden || undefined}
            whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="flex shrink-0 items-center"
        >
            <img
                src={logo.src}
                alt={hidden ? "" : logo.name}
                draggable={false}
                loading="lazy"
                className="h-7 w-auto select-none opacity-90 transition-opacity duration-300 hover:opacity-100 sm:h-9 lg:h-10"
            />
        </motion.li>
    );
}

export default function PortfolioPartners() {
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
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-[1140px] py-5 sm:py-6"
            >
                {reduceMotion ? (
                    <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5 px-4">
                        {LOGOS.map((logo) => (
                            <LogoItem key={logo.name} logo={logo} />
                        ))}
                    </ul>
                ) : (
                    <div
                        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <motion.ul ref={trackRef} style={{ x }} className="flex w-max items-center gap-14 pr-14 sm:gap-20 sm:pr-20 lg:gap-24 lg:pr-24">
                            {set.map((logo, i) => (
                                <LogoItem key={`a-${i}`} logo={logo} hidden={i >= LOGOS.length} />
                            ))}
                            {set.map((logo, i) => (
                                <LogoItem key={`b-${i}`} logo={logo} hidden />
                            ))}
                        </motion.ul>
                    </div>
                )}
            </motion.div>

            <div aria-hidden="true" className="absolute inset-x-0 top-full h-[6px] bg-brand-plum" style={scallopDown} />
        </section>
    );
}