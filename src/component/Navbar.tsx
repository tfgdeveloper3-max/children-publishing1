import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { SERVICE_CATEGORIES, serviceHref } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;

type SubItem = { label: string; to: string };
type NavItem = { label: string; to: string; children?: SubItem[]; mega?: boolean };

const NAV: NavItem[] = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services", mega: true },
    { label: "About Us", to: "/about" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Blog", to: "/blog" },
    { label: "Contact Us", to: "/contact" },
];

const isItemActive = (item: NavItem, pathname: string) => {
    if (item.to === "/") return pathname === "/";
    if (pathname.startsWith(item.to)) return true;
    return !!item.children?.some((c) => pathname.startsWith(c.to));
};

const listVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: -14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const MotionLink = motion.create(Link);

export function PillButton({
    children,
    to = "/contact",
    className = "",
}: {
    children: ReactNode;
    to?: string;
    className?: string;
}) {
    return (
        <MotionLink
            to={to}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-orange px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_-8px_rgba(209,129,9,0.75)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40 ${className}`}
        >
            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
            <span className="relative">{children}</span>
        </MotionLink>
    );
}

export default function Navbar() {
    const { pathname } = useLocation();
    const [hovered, setHovered] = useState<string | null>(null);
    const [dropdown, setDropdown] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [mobileSub, setMobileSub] = useState<string | null>(null);
    const [megaCat, setMegaCat] = useState(0);
    const [mobileCat, setMobileCat] = useState<number | null>(null);

    const activeLabel = NAV.find((item) => isItemActive(item, pathname))?.label ?? null;
    const underlineTarget = hovered ?? activeLabel;

    useEffect(() => {
        setOpen(false);
        setDropdown(null);
        setMobileSub(null);
        setMobileCat(null);
    }, [pathname]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setDropdown(null);
                setOpen(false);
            }
        };
        window.addEventListener("resize", onResize);
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("keydown", onKey);
        };
    }, []);

    const linkClass = (active: boolean) =>
        `relative flex items-center gap-1 py-2 text-[13px] font-bold uppercase tracking-wide outline-none transition-colors duration-500 xl:text-[14px] ${active ? "text-brand-plum" : "text-brand-ink hover:text-brand-plum"}`;

    const underline = (label: string) =>
        underlineTarget === label && (
            <motion.span
                layoutId="nav-underline"
                transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
                className="absolute -bottom-0.5 left-0 right-0 mx-auto h-[3px] w-6 rounded-full bg-brand-orange"
            />
        );

    return (
        <header className="relative z-30 bg-white">
            <nav className="relative mx-auto flex h-[72px] max-w-[1140px] items-center justify-between px-4 sm:h-[80px] sm:px-5 lg:h-[88px]">
                <MotionLink
                    to="/"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: EASE }}
                    className="text-[26px] font-extrabold leading-none text-brand-ink sm:text-[30px] xl:text-[34px]"
                >
                    Logo Here
                </MotionLink>

                <motion.ul
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    onMouseLeave={() => setHovered(null)}
                    className="hidden h-full items-center gap-6 lg:flex xl:gap-10"
                >
                    {NAV.map((item) => {
                        const active = activeLabel === item.label;

                        if (item.mega) {
                            const isOpen = dropdown === item.label;
                            const cat = SERVICE_CATEGORIES[megaCat];
                            return (
                                <motion.li
                                    key={item.label}
                                    variants={itemVariants}
                                    onMouseEnter={() => {
                                        setHovered(item.label);
                                        setDropdown(item.label);
                                    }}
                                    onMouseLeave={() => setDropdown(null)}
                                    className="flex h-full items-center"
                                >
                                    <div className="flex items-center gap-1">
                                        <NavLink
                                            to={item.to}
                                            onFocus={() => setHovered(item.label)}
                                            onBlur={() => setHovered(null)}
                                            className={linkClass(active)}
                                        >
                                            {item.label}
                                            {underline(item.label)}
                                        </NavLink>
                                        <button
                                            type="button"
                                            aria-label={`${isOpen ? "Close" : "Open"} ${item.label} menu`}
                                            aria-haspopup="true"
                                            aria-expanded={isOpen}
                                            onClick={() => setDropdown(isOpen ? null : item.label)}
                                            className={`inline-flex rounded-full p-0.5 outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-brand-plum ${active ? "text-brand-plum" : "text-brand-ink hover:text-brand-plum"}`}
                                        >
                                            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.35, ease: EASE }} className="inline-flex">
                                                <ChevronDown className="h-4 w-4" strokeWidth={2.6} />
                                            </motion.span>
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <div className="absolute left-1/2 top-full z-40 w-[min(900px,calc(100vw-40px))] -translate-x-1/2 pt-1">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                                    transition={{ duration: 0.35, ease: EASE }}
                                                    className="grid grid-cols-[260px_1fr] overflow-hidden rounded-3xl border border-brand-paper bg-white shadow-[0_30px_60px_-28px_rgba(37,40,62,0.45)]"
                                                >
                                                    <div role="tablist" aria-orientation="vertical" aria-label="Service categories" className="flex flex-col gap-1 bg-[#fbf9f4] p-3">
                                                        {SERVICE_CATEGORIES.map((c, i) => {
                                                            const on = megaCat === i;
                                                            return (
                                                                <button
                                                                    key={c.slug}
                                                                    type="button"
                                                                    role="tab"
                                                                    aria-selected={on}
                                                                    onMouseEnter={() => setMegaCat(i)}
                                                                    onFocus={() => setMegaCat(i)}
                                                                    onClick={() => setMegaCat(i)}
                                                                    className={`relative flex items-center justify-between gap-2 rounded-2xl px-4 py-3 text-left text-[13px] font-bold leading-snug outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-plum ${on ? "text-white" : "text-brand-ink hover:text-brand-plum"}`}
                                                                >
                                                                    {on && (
                                                                        <motion.span
                                                                            layoutId="mega-cat-bg"
                                                                            transition={{ type: "spring", stiffness: 300, damping: 28 }}
                                                                            className="absolute inset-0 rounded-2xl bg-brand-plum"
                                                                        />
                                                                    )}
                                                                    <span className="relative">{c.label}</span>
                                                                    <ChevronRight className={`relative h-4 w-4 shrink-0 transition-transform duration-300 ${on ? "translate-x-0.5" : "opacity-40"}`} />
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    <div className="flex min-h-[340px] flex-col p-5">
                                                        <div className="flex items-center justify-between gap-4 border-b border-brand-paper pb-3">
                                                            <p className="text-[15px] font-extrabold text-brand-ink">{cat.label}</p>
                                                            <Link
                                                                to={`/services?category=${cat.slug}`}
                                                                className="group/all inline-flex shrink-0 items-center gap-1 text-[12px] font-bold uppercase tracking-wide text-brand-orange hover:text-brand-plum"
                                                            >
                                                                View all
                                                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/all:translate-x-1" />
                                                            </Link>
                                                        </div>

                                                        <AnimatePresence mode="wait">
                                                            <motion.ul
                                                                key={cat.slug}
                                                                initial="hidden"
                                                                animate="show"
                                                                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                                                                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.018 } } }}
                                                                className="mt-3 grid max-h-[380px] grid-cols-2 gap-x-2 gap-y-0.5 overflow-y-auto pr-1 xl:grid-cols-3"
                                                            >
                                                                {cat.services.map((svc) => {
                                                                    const Icon = svc.icon;
                                                                    return (
                                                                        <motion.li
                                                                            key={svc.title}
                                                                            variants={{
                                                                                hidden: { opacity: 0, x: 10 },
                                                                                show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
                                                                            }}
                                                                        >
                                                                            <Link
                                                                                to={serviceHref(cat, svc)}
                                                                                className="group/svc flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] font-semibold leading-snug text-brand-ink outline-none transition-colors duration-300 hover:bg-brand-paper hover:text-brand-plum focus-visible:bg-brand-paper"
                                                                            >
                                                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-plum/10 text-brand-plum transition-all duration-300 group-hover/svc:scale-110 group-hover/svc:bg-brand-plum group-hover/svc:text-white">
                                                                                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                                                                                </span>
                                                                                {svc.title}
                                                                            </Link>
                                                                        </motion.li>
                                                                    );
                                                                })}
                                                            </motion.ul>
                                                        </AnimatePresence>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            );
                        }

                        if (item.children) {
                            const isOpen = dropdown === item.label;
                            return (
                                <motion.li
                                    key={item.label}
                                    variants={itemVariants}
                                    className="relative"
                                    onMouseEnter={() => {
                                        setHovered(item.label);
                                        setDropdown(item.label);
                                    }}
                                    onMouseLeave={() => setDropdown(null)}
                                >
                                    <div className="flex items-center gap-1">
                                        <NavLink
                                            to={item.to}
                                            onFocus={() => setHovered(item.label)}
                                            onBlur={() => setHovered(null)}
                                            className={linkClass(active)}
                                        >
                                            {item.label}
                                            {underline(item.label)}
                                        </NavLink>
                                        <button
                                            type="button"
                                            aria-label={`${isOpen ? "Close" : "Open"} ${item.label} menu`}
                                            aria-haspopup="true"
                                            aria-expanded={isOpen}
                                            onClick={() => setDropdown(isOpen ? null : item.label)}
                                            className={`inline-flex rounded-full p-0.5 outline-none transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-brand-plum ${active ? "text-brand-plum" : "text-brand-ink hover:text-brand-plum"}`}
                                        >
                                            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.35, ease: EASE }} className="inline-flex">
                                                <ChevronDown className="h-4 w-4" strokeWidth={2.6} />
                                            </motion.span>
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <div className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-3">
                                                <motion.ul
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.35, ease: EASE }}
                                                    className="min-w-[230px] rounded-2xl border border-brand-paper bg-white p-2 shadow-[0_20px_40px_-18px_rgba(37,40,62,0.4)]"
                                                >
                                                    {item.children.map((sub) => (
                                                        <li key={sub.to}>
                                                            <NavLink
                                                                to={sub.to}
                                                                onBlur={(e) => {
                                                                    if (!e.currentTarget.closest("li")?.parentElement?.contains(e.relatedTarget as Node)) {
                                                                        setDropdown(null);
                                                                    }
                                                                }}
                                                                className={({ isActive }) =>
                                                                    `block rounded-xl px-4 py-2.5 text-[13px] font-bold uppercase tracking-wide outline-none transition-colors duration-300 focus-visible:bg-brand-paper ${isActive ? "bg-brand-paper text-brand-plum" : "text-brand-ink hover:bg-brand-paper hover:text-brand-plum"}`
                                                                }
                                                            >
                                                                {sub.label}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </motion.ul>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            );
                        }

                        return (
                            <motion.li key={item.label} variants={itemVariants}>
                                <NavLink
                                    to={item.to}
                                    end={item.to === "/"}
                                    onMouseEnter={() => setHovered(item.label)}
                                    onFocus={() => setHovered(item.label)}
                                    onBlur={() => setHovered(null)}
                                    className={linkClass(active)}
                                >
                                    {item.label}
                                    {underline(item.label)}
                                </NavLink>
                            </motion.li>
                        );
                    })}
                </motion.ul>

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                    className="hidden lg:block"
                >
                    <PillButton className="lg:px-5 xl:px-7">Start Your Project</PillButton>
                </motion.div>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="relative flex h-11 w-11 items-center justify-center rounded-full bg-brand-paper text-brand-ink outline-none focus-visible:ring-2 focus-visible:ring-brand-plum lg:hidden"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={open ? "x" : "menu"}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                        >
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-120px)] overflow-y-auto border-t border-brand-paper bg-white px-4 pb-6 pt-2 shadow-[0_20px_40px_-20px_rgba(37,40,62,0.35)] sm:px-5 lg:hidden"
                    >
                        <ul className="flex flex-col">
                            {NAV.map((item, i) => {
                                const active = activeLabel === item.label;
                                const subOpen = mobileSub === item.label;

                                return (
                                    <motion.li
                                        key={item.label}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 * i, duration: 0.5, ease: EASE }}
                                        className="border-b border-brand-paper"
                                    >
                                        {item.mega ? (
                                            <>
                                                <div className="flex items-center justify-between">
                                                    <NavLink
                                                        to={item.to}
                                                        className={`flex-1 py-3 text-[15px] font-bold uppercase tracking-wide ${active ? "text-brand-plum" : "text-brand-ink"}`}
                                                    >
                                                        {item.label}
                                                    </NavLink>
                                                    <button
                                                        type="button"
                                                        aria-label={`${subOpen ? "Close" : "Open"} ${item.label} menu`}
                                                        aria-expanded={subOpen}
                                                        onClick={() => setMobileSub(subOpen ? null : item.label)}
                                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${active ? "text-brand-plum" : "text-brand-ink"}`}
                                                    >
                                                        <motion.span animate={{ rotate: subOpen ? 180 : 0 }} transition={{ duration: 0.35, ease: EASE }} className="inline-flex">
                                                            <ChevronDown className="h-5 w-5" />
                                                        </motion.span>
                                                    </button>
                                                </div>
                                                <AnimatePresence initial={false}>
                                                    {subOpen && (
                                                        <motion.ul
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.4, ease: EASE }}
                                                            className="overflow-hidden pb-2"
                                                        >
                                                            {SERVICE_CATEGORIES.map((c, ci) => {
                                                                const catOpen = mobileCat === ci;
                                                                return (
                                                                    <li key={c.slug} className="ml-2 border-l-2 border-brand-paper pl-3">
                                                                        <button
                                                                            type="button"
                                                                            aria-expanded={catOpen}
                                                                            onClick={() => setMobileCat(catOpen ? null : ci)}
                                                                            className={`flex w-full items-center justify-between gap-2 py-2.5 text-left text-[13px] font-bold ${catOpen ? "text-brand-plum" : "text-brand-ink"}`}
                                                                        >
                                                                            {c.label}
                                                                            <motion.span animate={{ rotate: catOpen ? 90 : 0 }} transition={{ duration: 0.3, ease: EASE }} className="inline-flex shrink-0">
                                                                                <ChevronRight className="h-4 w-4" />
                                                                            </motion.span>
                                                                        </button>
                                                                        <AnimatePresence initial={false}>
                                                                            {catOpen && (
                                                                                <motion.ul
                                                                                    initial={{ height: 0, opacity: 0 }}
                                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                                    exit={{ height: 0, opacity: 0 }}
                                                                                    transition={{ duration: 0.35, ease: EASE }}
                                                                                    className="overflow-hidden"
                                                                                >
                                                                                    {c.services.map((svc) => {
                                                                                        const Icon = svc.icon;
                                                                                        return (
                                                                                            <li key={svc.title}>
                                                                                                <Link
                                                                                                    to={serviceHref(c, svc)}
                                                                                                    className="flex items-center gap-2.5 py-2 pl-1 text-[13px] font-medium text-brand-ink/80 active:text-brand-plum"
                                                                                                >
                                                                                                    <Icon className="h-4 w-4 shrink-0 text-brand-plum" strokeWidth={1.8} />
                                                                                                    {svc.title}
                                                                                                </Link>
                                                                                            </li>
                                                                                        );
                                                                                    })}
                                                                                </motion.ul>
                                                                            )}
                                                                        </AnimatePresence>
                                                                    </li>
                                                                );
                                                            })}
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        ) : item.children ? (
                                            <>
                                                <div className="flex items-center justify-between">
                                                    <NavLink
                                                        to={item.to}
                                                        className={`flex-1 py-3 text-[15px] font-bold uppercase tracking-wide ${active ? "text-brand-plum" : "text-brand-ink"}`}
                                                    >
                                                        {item.label}
                                                    </NavLink>
                                                    <button
                                                        type="button"
                                                        aria-label={`${subOpen ? "Close" : "Open"} ${item.label} menu`}
                                                        aria-expanded={subOpen}
                                                        onClick={() => setMobileSub(subOpen ? null : item.label)}
                                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${active ? "text-brand-plum" : "text-brand-ink"}`}
                                                    >
                                                        <motion.span animate={{ rotate: subOpen ? 180 : 0 }} transition={{ duration: 0.35, ease: EASE }} className="inline-flex">
                                                            <ChevronDown className="h-5 w-5" />
                                                        </motion.span>
                                                    </button>
                                                </div>
                                                <AnimatePresence initial={false}>
                                                    {subOpen && (
                                                        <motion.ul
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.4, ease: EASE }}
                                                            className="overflow-hidden"
                                                        >
                                                            {item.children.map((sub) => (
                                                                <li key={sub.to}>
                                                                    <NavLink
                                                                        to={sub.to}
                                                                        className={({ isActive }) =>
                                                                            `block py-2.5 pl-4 text-[14px] font-semibold uppercase tracking-wide ${isActive ? "text-brand-plum" : "text-brand-ink/80"}`
                                                                        }
                                                                    >
                                                                        {sub.label}
                                                                    </NavLink>
                                                                </li>
                                                            ))}
                                                        </motion.ul>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        ) : (
                                            <NavLink
                                                to={item.to}
                                                end={item.to === "/"}
                                                className={`block py-3 text-[15px] font-bold uppercase tracking-wide ${active ? "text-brand-plum" : "text-brand-ink"}`}
                                            >
                                                {item.label}
                                            </NavLink>
                                        )}
                                    </motion.li>
                                );
                            })}
                        </ul>
                        <PillButton className="mt-5 w-full sm:w-auto">Start Your Project</PillButton>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="scallop-edge pointer-events-none absolute inset-x-0 top-full h-[7px]" />
        </header>
    );
}