import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, LayoutGroup, motion, type Variants } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SERVICE_CATEGORIES, serviceHref, slugify, type Service, type ServiceCategory } from "@/data/services";
import { SERVICE_CARDS, SERVICE_TABS, SERVICES_PAGE } from "@/data/servicesPage";
import { FeatureCard, SectionTag, balancedGrid } from "@/component/InnerServices/Shared/ui";

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
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
    exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const cardIn: Variants = {
    hidden: { opacity: 0, y: 30, rotate: 0 },
    show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: EASE } },
    exit: { opacity: 0, y: -14, transition: { duration: 0.2, ease: EASE } },
};

function ServiceCard({
    category,
    service,
    index,
    active,
    onActivate,
    className = "",
}: {
    category: ServiceCategory;
    service: Service;
    index: number;
    active: boolean;
    onActivate: () => void;
    className?: string;
}) {
    const copy = SERVICE_CARDS[slugify(service.title)];

    return (
        <motion.li variants={cardIn} className={className}>
            <Link
                to={serviceHref(category, service)}
                onMouseEnter={onActivate}
                onFocus={onActivate}
                className="block h-full rounded-[20px] outline-none focus-visible:ring-4 focus-visible:ring-brand-plum/30"
            >
                <FeatureCard
                    index={index}
                    icon={service.icon}
                    active={active}
                    title={copy?.title ?? service.title}
                    text={copy?.text}
                    footer={
                        <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-brand-plum">
                            Explore Service
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
                        </span>
                    }
                />
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
            className={`pointer-events-none absolute top-[6%] hidden w-[clamp(52px,6vw,92px)] flex-col 2xl:flex ${isLeft ? "left-0" : "right-0"}`}
        >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col">
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
    const layout = balancedGrid(category.services.length);

    useEffect(() => {
        const cat = params.get("category");
        if (!cat) return;
        const ci = CATEGORIES.findIndex((c) => c.slug === cat);
        if (ci < 0) return;
        const svc = params.get("service");
        const si = svc ? Math.max(0, CATEGORIES[ci].services.findIndex((x) => slugify(x.title) === svc)) : 0;

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
        <section
            id="our-services"
            ref={sectionRef}
            className="relative scroll-mt-4 overflow-hidden bg-[#faf7f1] py-16 sm:py-20 lg:py-24"
        >
            <HandStrip side="left" />
            <HandStrip side="right" />

            <div className="relative mx-auto max-w-[1100px] px-4 sm:px-5">
                <motion.div variants={head} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="mx-auto max-w-[680px] text-center">
                    <motion.div variants={fadeUp}>
                        <SectionTag>{SERVICES_PAGE.eyebrow}</SectionTag>
                    </motion.div>
                    <motion.h2
                        variants={fadeUp}
                        className="mt-4 text-[clamp(26px,6vw,36px)] font-extrabold leading-[1.15] text-brand-ink lg:text-[clamp(34px,3vw,44px)]"
                    >
                        {SERVICES_PAGE.heading}
                    </motion.h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
                    className="mt-8 sm:mt-10"
                >
                    <LayoutGroup id="service-tabs">
                        <div
                            ref={listRef}
                            role="tablist"
                            aria-label="Service categories"
                            onKeyDown={onTabKey}
                            className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-3 pt-1 [scrollbar-width:none] sm:mx-0 sm:px-1 lg:flex-wrap lg:justify-center lg:overflow-visible [&::-webkit-scrollbar]:hidden"
                        >
                            {CATEGORIES.map((c, i) => {
                                const isActive = tab === i;
                                return (
                                    <button
                                        key={c.slug}
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
                                        className={`relative shrink-0 snap-center whitespace-nowrap rounded-full border px-5 py-2.5 text-[12.5px] font-bold outline-none transition-all duration-300 focus-visible:ring-4 focus-visible:ring-brand-plum/30 sm:text-[13.5px] ${isActive
                                                ? "border-transparent text-white shadow-[0_12px_22px_-12px_rgba(209,129,9,0.9)]"
                                                : "border-brand-ink/15 bg-white text-brand-ink hover:border-brand-plum/40 hover:text-brand-plum"
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="service-tab-pill"
                                                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                                                className="absolute inset-0 rounded-full bg-brand-orange"
                                            />
                                        )}
                                        <span className="relative">{SERVICE_TABS[c.slug] ?? c.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </LayoutGroup>
                </motion.div>

                <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${tab}`} className="mt-10 sm:mt-12">
                    <AnimatePresence mode="wait">
                        <motion.ul
                            key={tab}
                            variants={grid}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className={`gap-y-6 ${layout.list}`}
                        >
                            {category.services.map((svc, i) => (
                                <ServiceCard key={svc.title} category={category} service={svc} index={i} active={active === i} onActivate={() => setActive(i)} className={layout.item(i)} />
                            ))}
                        </motion.ul>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}