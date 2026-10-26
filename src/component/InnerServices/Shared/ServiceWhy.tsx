import { motion, type Variants } from "motion/react";
import { Award, Globe2, Palette, Rocket, type LucideIcon } from "lucide-react";
import type { Copy } from "@/data/serviceContent";
import { FeatureCard, SectionTag, balancedGrid } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;
const ICONS: LucideIcon[] = [Award, Palette, Rocket, Globe2];

const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const cardIn: Variants = {
    hidden: { opacity: 0, y: 36, rotate: 3 },
    show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function ServiceWhy({ eyebrow = "Why Authors Choose Toon Haus", heading, items }: { eyebrow?: string; heading: string; items: Copy[] }) {
    const layout = balancedGrid(items.length);
    return (
        <section className="relative overflow-hidden bg-brand-plum py-16 sm:py-20 lg:py-24">
            <span aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border-[28px] border-white/5" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full border-[32px] border-brand-orange/15" />

            <div className="relative mx-auto max-w-[1140px] px-4 sm:px-5">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.85, ease: EASE }}
                    className="mx-auto max-w-[760px] text-center"
                >
                    <SectionTag tone="dark">{eyebrow}</SectionTag>
                    <h2 className="mt-4 text-[clamp(26px,6vw,34px)] font-extrabold leading-[1.15] text-white lg:text-[clamp(32px,2.8vw,40px)]">{heading}</h2>
                </motion.div>

                <motion.ul
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className={`mt-12 gap-y-6 ${layout.list}`}
                >
                    {items.map((item, i) => {
                        const Icon = ICONS[i % ICONS.length];
                        return (
                            <motion.li key={item.title} variants={cardIn} className={layout.item(i)}>
                                <FeatureCard index={i} icon={Icon} title={item.title} text={item.text} />
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </section>
    );
}