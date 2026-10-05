import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Menu, X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const links = ["Home", "About", "Pages", "Shop", "Blog", "Contact"] as const;
type LinkName = (typeof links)[number];

const listVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: -14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function PillButton({
    children,
    href = "#",
    className = "",
}: {
    children: React.ReactNode;
    href?: string;
    className?: string;
}) {
    return (
        <motion.a
            href={href}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-orange px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_-8px_rgba(209,129,9,0.75)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40 ${className}`}
        >
            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
            <span className="relative">{children}</span>
        </motion.a>
    );
}

export default function Navbar() {
    const [active, setActive] = useState<LinkName>("Home");
    const [hovered, setHovered] = useState<LinkName | null>(null);
    const [open, setOpen] = useState(false);

    const underlineTarget = hovered ?? active;

    // Screen lg (desktop) size par aaye to mobile menu khud band ho jaye
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) setOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <header className="relative z-30 bg-white">
            {/* Height: mobile 72 → tablet 80 → desktop 88 */}
            <nav className="mx-auto flex h-[72px] max-w-[1140px] items-center justify-between px-4 sm:h-[80px] sm:px-5 lg:h-[88px]">
                <motion.a
                    href="#"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: EASE }}
                    className="text-[26px] font-extrabold leading-none text-brand-ink sm:text-[30px] xl:text-[34px]"
                >
                    Logo Here
                </motion.a>

                {/* Laptop (lg) par links ke beech kam gap, bade desktop (xl) par zyada */}
                <motion.ul
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    onMouseLeave={() => setHovered(null)}
                    className="hidden items-center gap-6 lg:flex xl:gap-10"
                >
                    {links.map((link) => {
                        const isActive = active === link;
                        return (
                            <motion.li key={link} variants={itemVariants}>
                                <a
                                    href="#"
                                    onMouseEnter={() => setHovered(link)}
                                    onFocus={() => setHovered(link)}
                                    onBlur={() => setHovered(null)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActive(link);
                                    }}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`relative block py-2 text-[13px] font-bold uppercase tracking-wide outline-none transition-colors duration-500 xl:text-[14px] ${isActive ? "text-brand-plum" : "text-brand-ink hover:text-brand-plum"}`}
                                >
                                    {link}
                                    {underlineTarget === link && (
                                        <motion.span
                                            layoutId="nav-underline"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
                                            className="absolute -bottom-0.5 left-0 right-0 mx-auto h-[3px] w-6 rounded-full bg-brand-orange"
                                        />
                                    )}
                                </a>
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

            {/* Mobile / tablet menu — lambi list ho to scroll ho jaye */}
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
                            {links.map((link, i) => (
                                <motion.li
                                    key={link}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i, duration: 0.5, ease: EASE }}
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setActive(link);
                                            setOpen(false);
                                        }}
                                        className={`block border-b border-brand-paper py-3 text-[15px] font-bold uppercase tracking-wide ${active === link ? "text-brand-plum" : "text-brand-ink"}`}
                                    >
                                        {link}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                        <PillButton className="mt-5 w-full sm:w-auto">Start Your Project</PillButton>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="scallop-edge pointer-events-none absolute inset-x-0 top-full h-[7px]" />
        </header>
    );
}