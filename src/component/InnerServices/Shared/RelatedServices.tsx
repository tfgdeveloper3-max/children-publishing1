import { Link } from "react-router-dom";
import { motion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { serviceHref, slugify, type Service, type ServiceCategory } from "@/data/services";
import { FeatureCard, SectionTag, balancedGrid } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const cardIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export type RelatedCopy = {
    eyebrow?: string;
    heading?: string;
    viewAll?: string;
    cards?: Record<string, { title?: string; text?: string }>;
};

export default function RelatedServices({ category, current, copy = {} }: { category: ServiceCategory; current: Service; copy?: RelatedCopy }) {
    const others = category.services.filter((s) => s.title !== current.title).slice(0, 8);
    if (!others.length) return null;
    const layout = balancedGrid(others.length);

    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-[1140px] px-4 sm:px-5">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.85, ease: EASE }}
                    className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:items-end md:text-left"
                >
                    <div className="max-w-[640px]">
                        <SectionTag>{copy.eyebrow ?? `More in ${category.label}`}</SectionTag>
                        <h2 className="mt-4 text-[clamp(24px,5.5vw,34px)] font-extrabold leading-[1.15] text-brand-ink">{copy.heading ?? "Related Services"}</h2>
                    </div>
                    <Link
                        to={`/services?category=${category.slug}`}
                        className="group inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-dashed border-brand-orange/60 bg-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide text-brand-orange transition-all duration-300 hover:border-solid hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                    >
                        {copy.viewAll ?? "View All Services"}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                <motion.ul
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className={`mt-10 gap-y-6 ${layout.list}`}
                >
                    {others.map((svc, i) => {
                        const Icon = svc.icon;
                        const card = copy.cards?.[slugify(svc.title)];
                        return (
                            <motion.li key={svc.title} variants={cardIn} className={layout.item(i)}>
                                <Link
                                    to={serviceHref(category, svc)}
                                    className="block h-full rounded-[20px] outline-none focus-visible:ring-4 focus-visible:ring-brand-plum/30"
                                >
                                    <FeatureCard
                                        index={i}
                                        icon={Icon}
                                        title={card?.title ?? svc.title}
                                        text={card?.text}
                                        footer={
                                            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-brand-plum">
                                                Learn more
                                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
                                            </span>
                                        }
                                    />
                                </Link>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </section>
    );
}