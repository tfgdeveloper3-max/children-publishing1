import { useRef, type CSSProperties } from "react";
import { motion, useInView, type Variants } from "motion/react";
import type { ServiceItem } from "@/data/services";
import { FeatureCard, SectionTag, balancedGrid } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ServiceIncludes({ eyebrow = "What's Included", heading, items }: { eyebrow?: string; heading: string; items: ServiceItem[] }) {
    const headRef = useRef<HTMLDivElement>(null);
    const inView = useInView(headRef, { once: true, amount: 0.5 });
    const layout = balancedGrid(items.length);

    return (
        <section className="relative overflow-hidden bg-[#faf7f1] py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-[1180px] px-4 sm:px-5">
                <div ref={headRef} className="mx-auto max-w-[760px] text-center">
                    <div className={inView ? "animate__animated animate__fadeInDown" : "opacity-0"} style={{ "--animate-duration": "0.9s" } as CSSProperties}>
                        <SectionTag>{eyebrow}</SectionTag>
                    </div>
                    <h2
                        className={`mt-4 text-[clamp(26px,6vw,34px)] font-extrabold leading-[1.15] text-brand-ink lg:text-[clamp(32px,2.8vw,40px)] ${inView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}
                        style={{ "--animate-duration": "1s", animationDelay: "0.15s" } as CSSProperties}
                    >
                        {heading}
                    </h2>
                </div>

                <motion.ul
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className={`mt-12 gap-y-6 sm:mt-14 ${layout.list}`}
                >
                    {items.map(({ title, icon, text }, i) => (
                        <motion.li key={title} variants={cardIn} className={layout.item(i)}>
                            <FeatureCard index={i} icon={icon} title={title} text={text} />
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}