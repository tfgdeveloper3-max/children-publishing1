import { Link } from "react-router-dom";
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { serviceHref, type Service, type ServiceCategory } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;

const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const cardIn: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.94 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 130, damping: 17 } },
};

export default function RelatedServices({ category, current }: { category: ServiceCategory; current: Service }) {
    const others = category.services.filter((s) => s.title !== current.title).slice(0, 8);
    if (!others.length) return null;

    return (
        <section className="bg-[#fbf9f4] pb-16 pt-20 sm:pb-20 sm:pt-24">
            <div className="mx-auto max-w-[1040px] px-4 sm:px-5">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.85, ease: EASE }}
                    className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
                >
                    <div>
                        <p className="text-[13px] font-semibold text-brand-plum sm:text-[14px]">More in {category.label}</p>
                        <h2 className="mt-1 text-[clamp(24px,5.5vw,32px)] font-extrabold leading-[1.15] text-brand-ink">Related Services</h2>
                    </div>
                    <Link
                        to={`/services?category=${category.slug}`}
                        className="group inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-brand-orange hover:text-brand-plum"
                    >
                        View all
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                <motion.ul
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
                >
                    {others.map((svc) => {
                        const Icon = svc.icon;
                        return (
                            <motion.li key={svc.title} variants={cardIn} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                                <Link
                                    to={serviceHref(category, svc)}
                                    className="group relative isolate flex h-full min-h-[124px] flex-col justify-between overflow-hidden rounded-[10px] bg-white p-4 shadow-[0_10px_24px_-20px_rgba(37,40,62,0.6)] outline-none transition-colors duration-500 hover:bg-brand-plum focus-visible:ring-4 focus-visible:ring-brand-plum/30 sm:min-h-[140px] sm:p-5"
                                >
                                    <span className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/3 -skew-x-12 bg-white/20 blur-md transition-transform duration-[1200ms] ease-out group-hover:translate-x-[480%]" />
                                    <Icon className="h-9 w-9 text-brand-ink transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:text-white sm:h-10 sm:w-10" strokeWidth={1.4} />
                                    <span className="mt-4 text-[14px] font-bold leading-[1.25] text-brand-ink transition-colors duration-500 group-hover:text-white sm:text-[15px]">
                                        {svc.title}
                                    </span>
                                </Link>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </div>
        </section>
    );
}