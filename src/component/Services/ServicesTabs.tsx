import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, LayoutGroup, motion, type Variants } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { SERVICE_CATEGORIES, serviceHref, slugify, type Service } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;
const HANDS = "/images/Hands-Side.png";

const CATEGORIES = SERVICE_CATEGORIES;

const head: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
    exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const cardIn: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.94 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 130, damping: 17 } },
    exit: { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.2, ease: EASE } },
};

function Swirl() {
    return (
        <svg aria-hidden="true" viewBox="0 0 120 80" className="pointer-events-none absolute -right-2 -top-2 h-[80px] w-[120px] text-white/25" fill="none">
            <path d="M8 4 C 50 10, 80 34, 118 70" stroke="currentColor" strokeWidth="1.4" />
            <path d="M30 0 C 64 8, 92 30, 120 52" stroke="currentColor" strokeWidth="1" />
            <path d="M58 0 C 82 8, 104 22, 120 36" stroke="currentColor" strokeWidth="0.8" />
        </svg>
    );
}

function ServiceCard({
    title,
    Icon,
    to,
    active,
    layoutKey,
    onActivate,
}: {
    title: string;
    Icon: LucideIcon;
    to: string;
    active: boolean;
    layoutKey: string;
    onActivate: () => void;
}) {
    return (
        <motion.li
            variants={cardIn}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="w-[calc(50%-6px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
        >
            <Link
                to={to}
                onMouseEnter={onActivate}
                onFocus={onActivate}
                className="group relative isolate flex h-full min-h-[124px] flex-col justify-between overflow-hidden rounded-[10px] bg-white p-4 shadow-[0_10px_24px_-20px_rgba(37,40,62,0.6)] outline-none focus-visible:ring-4 focus-visible:ring-brand-plum/30 sm:min-h-[140px] sm:p-5 lg:min-h-[150px]"
            >
                {active && (
                    <motion.span
                        layoutId={`service-active-${layoutKey}`}
                        transition={{ type: "spring", stiffness: 150, damping: 22 }}
                        className="absolute inset-0 -z-10 bg-brand-plum"
                    >
                        <Swirl />
                    </motion.span>
                )}

                <span className="pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/3 -skew-x-12 bg-white/20 blur-md transition-transform duration-[1200ms] ease-out group-hover:translate-x-[480%]" />

                <motion.span
                    animate={active ? { rotate: [0, -10, 10, 0], scale: [1, 1.12, 1] } : { rotate: 0, scale: 1 }}
                    transition={active ? { duration: 0.9, ease: "easeInOut" } : { duration: 0.3 }}
                    className={`inline-flex transition-colors duration-500 ${active ? "text-white" : "text-brand-ink"}`}
                >
                    <Icon className="h-9 w-9 sm:h-10 sm:w-10" strokeWidth={1.4} />
                </motion.span>

                <h3
                    className={`mt-4 text-[14px] font-bold leading-[1.25] transition-colors duration-500 sm:text-[15px] lg:text-[16px] ${active ? "text-white" : "text-brand-ink"}`}
                >
                    {title}
                </h3>
            </Link>
        </motion.li>
    );
}

function HandStrip({ side }: { side: "left" | "right" }) {
    const isLeft = side === "left";
    return (
        <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: EASE }}
            className={`pointer-events-none absolute top-[6%] hidden w-[clamp(52px,6vw,92px)] flex-col xl:flex ${isLeft ? "left-0" : "right-0"}`}
        >
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col"
            >
                {[0, 1].map((i) => (
                    <img key={i} src={HANDS} alt="" draggable={false} className={`w-full select-none ${isLeft ? "-scale-x-100" : ""}`} />
                ))}
            </motion.div>
        </motion.div>
    );
}

export default function ServicesTabs() {
    const [params] = useSearchParams();
    const [tab, setTab] = useState(0);
    const [active, setActive] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const tabRef = useRef(0);
    const pendingService = useRef<number | null>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const listRef = useRef<HTMLDivElement>(null);

    const category = CATEGORIES[tab];

    useEffect(() => {
        const cat = params.get("category");
        if (!cat) return;
        const ci = CATEGORIES.findIndex((c) => c.slug === cat);
        if (ci < 0) return;
        const svc = params.get("service");
        const si = svc ? Math.max(0, CATEGORIES[ci].services.findIndex((x: Service) => slugify(x.title) === svc)) : 0;

        if (ci === tabRef.current) setActive(si);
        else {
            pendingService.current = si;
            setTab(ci);
        }

        const t = window.setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
        return () => window.clearTimeout(t);
    }, [params]);

    useEffect(() => {
        tabRef.current = tab;
        setActive(pendingService.current ?? 0);
        pendingService.current = null;
        const list = listRef.current;
        const btn = tabRefs.current[tab];
        if (list && btn && list.scrollWidth > list.clientWidth) {
            list.scrollTo({ left: btn.offsetLeft - (list.clientWidth - btn.clientWidth) / 2, behavior: "smooth" });
        }
    }, [tab]);

    const onTabKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") setTab((t) => (t + 1) % CATEGORIES.length);
        if (e.key === "ArrowLeft") setTab((t) => (t - 1 + CATEGORIES.length) % CATEGORIES.length);
    };

    return (
        <section ref={sectionRef} className="relative scroll-mt-4 overflow-hidden bg-[#fbf9f4] py-14 sm:py-16 lg:py-20">
            <HandStrip side="left" />
            <HandStrip side="right" />

            <div className="relative mx-auto max-w-[1040px] px-4 sm:px-5">
                <motion.div
                    variants={head}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                    className="mx-auto max-w-[640px] text-center"
                >
                    <motion.p variants={fadeUp} className="text-[15px] font-bold text-brand-plum sm:text-[17px]">
                        Services
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        className="mt-1 text-[clamp(26px,6vw,36px)] font-extrabold leading-[1.15] text-brand-ink lg:text-[clamp(34px,3vw,44px)]"
                    >
                        Excellence in Every Step of Your Publishing Journey
                    </motion.h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
                    className="mt-6 sm:mt-8"
                >
                    <LayoutGroup id="service-tabs">
                        <div
                            ref={listRef}
                            role="tablist"
                            aria-label="Service categories"
                            onKeyDown={onTabKey}
                            className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-wrap lg:justify-center lg:overflow-visible [&::-webkit-scrollbar]:hidden"
                        >
                            {CATEGORIES.map((c, i) => {
                                const isActive = tab === i;
                                return (
                                    <button
                                        key={c.label}
                                        ref={(el) => {
                                            tabRefs.current[i] = el;
                                        }}
                                        type="button"
                                        role="tab"
                                        id={`svc-tab-${i}`}
                                        aria-selected={isActive}
                                        aria-controls="svc-panel"
                                        tabIndex={isActive ? 0 : -1}
                                        onClick={() => setTab(i)}
                                        className={`relative shrink-0 snap-center whitespace-nowrap rounded-full border px-4 py-2.5 text-[12px] font-semibold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-plum sm:text-[13px] ${isActive ? "border-transparent text-white" : "border-brand-ink/20 bg-white text-brand-ink hover:border-brand-plum hover:text-brand-plum"}`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="service-tab-pill"
                                                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                                                className="absolute -inset-px rounded-full bg-brand-orange shadow-[0_8px_18px_-8px_rgba(209,129,9,0.85)]"
                                            />
                                        )}
                                        <span className="relative">{c.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </LayoutGroup>
                </motion.div>

                <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${tab}`} className="mt-8 sm:mt-10">
                    <AnimatePresence mode="wait">
                        <motion.ul
                            key={tab}
                            variants={grid}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="flex flex-wrap justify-center gap-3 sm:gap-4"
                        >
                            {category.services.map(({ title, icon }, i) => (
                                <ServiceCard
                                    key={title}
                                    title={title}
                                    Icon={icon}
                                    to={serviceHref(category, category.services[i])}
                                    active={active === i}
                                    layoutKey={String(tab)}
                                    onActivate={() => setActive(i)}
                                />
                            ))}
                        </motion.ul>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}