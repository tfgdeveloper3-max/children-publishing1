import { useRef, type CSSProperties } from "react";
import { motion, useInView, type Variants } from "motion/react";
import type { ServiceItem } from "@/data/services";

const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const cardIn: Variants = {
    hidden: { opacity: 0, y: 36, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 110, damping: 17 } },
};

export default function ServiceIncludes({ title, items }: { title: string; items: ServiceItem[] }) {
    const headRef = useRef<HTMLDivElement>(null);
    const inView = useInView(headRef, { once: true, amount: 0.5 });

    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-[1140px] px-4 sm:px-5">
                <div ref={headRef} className="mx-auto max-w-[720px] text-center">
                    <p
                        className={`text-[15px] font-bold text-brand-plum sm:text-[17px] ${inView ? "animate__animated animate__fadeInDown" : "opacity-0"}`}
                        style={{ "--animate-duration": "0.9s" } as CSSProperties}
                    >
                        What's Included
                    </p>
                    <h2
                        className={`mt-1 text-[clamp(26px,6vw,34px)] font-extrabold leading-[1.15] text-brand-ink lg:text-[clamp(32px,2.8vw,40px)] ${inView ? "animate__animated animate__fadeInUp" : "opacity-0"}`}
                        style={{ "--animate-duration": "1s", animationDelay: "0.15s" } as CSSProperties}
                    >
                        Everything in {title}
                    </h2>
                </div>

                <motion.ul
                    variants={grid}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="mx-auto mt-10 flex max-w-[1040px] flex-wrap justify-center gap-4 sm:mt-12 sm:gap-5"
                >
                    {items.map(({ title: itemTitle, icon: Icon, text }) => (
                        <motion.li
                            key={itemTitle}
                            variants={cardIn}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="group relative isolate w-full overflow-hidden rounded-[14px] border-[1.5px] border-brand-plum/25 bg-[#f4e9f6] p-6 transition-colors duration-500 hover:border-brand-plum hover:bg-brand-plum sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                        >
                            <span className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/3 -skew-x-12 bg-white/20 blur-md transition-transform duration-[1200ms] ease-out group-hover:translate-x-[480%]" />
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-plum shadow-[0_8px_18px_-10px_rgba(37,40,62,0.5)] transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-white/15 group-hover:text-amber-300">
                                <Icon className="h-7 w-7" strokeWidth={1.7} />
                            </span>
                            <h3 className="mt-4 text-[17px] font-extrabold text-brand-plum transition-colors duration-500 group-hover:text-white sm:text-[18px]">{itemTitle}</h3>
                            <p className="mt-2 text-[13px] leading-[1.7] text-brand-ink/75 transition-colors duration-500 group-hover:text-white/90 sm:text-[14px]">{text}</p>
                            <span className="mt-4 block h-[3px] w-0 rounded-full bg-brand-orange transition-all duration-500 group-hover:w-10" />
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}