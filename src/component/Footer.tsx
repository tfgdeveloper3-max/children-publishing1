import { useRef, type ComponentType, type SVGProps } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, type Variants } from "motion/react";
import { ChevronsRight, Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/data/Site";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const FacebookIcon: IconComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M14 8h2.5V4.5H14c-2.2 0-4 1.8-4 4V11H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V8.5c0-.3.2-.5.5-.5z" />
    </svg>
);

const LinkedinIcon: IconComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M6.5 8.5h-3V20h3V8.5zM5 3.5a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zM20.5 13.3c0-3-1.6-4.9-4.2-4.9-1.4 0-2.4.7-2.8 1.4V8.5h-3V20h3v-6c0-1.4.7-2.4 1.9-2.4s1.8.9 1.8 2.4v6h3.3v-6.7z" />
    </svg>
);

const YoutubeIcon: IconComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path
            fillRule="evenodd"
            d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3L10 15z"
        />
    </svg>
);

const InstagramIcon: IconComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
);

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const SOCIALS = [
    { label: "Facebook", href: SITE.socials.facebook, icon: FacebookIcon },
    { label: "Instagram", href: SITE.socials.instagram, icon: InstagramIcon },
    { label: "LinkedIn", href: SITE.socials.linkedin, icon: LinkedinIcon },
    { label: "YouTube", href: SITE.socials.youtube, icon: YoutubeIcon },
].filter((s) => s.href);

const EXPLORE_LEFT = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "About Us", to: "/about" },
    { label: "Portfolio", to: "/portfolio" },
];

const EXPLORE_RIGHT = [
    { label: "Blogs", to: "/blog" },
    { label: "Reviews", to: "/reviews" },
    { label: "Contact Us", to: "/contact" },
];

const LEGAL = [
    { label: "Terms & Conditions", to: "/terms-and-conditions" },
    { label: "Privacy Policy", to: "/privacy-policy" },
];

const WORK = [
    { src: "/images/Footer-2.jpg", alt: "Children at a hair salon" },
    { src: "/images/Footer-1.jpg", alt: "Family playing with a puppy in the kitchen" },
    { src: "/images/Footer-4.jpg", alt: "Girl in a salon chair" },
    { src: "/images/Footer-3.jpg", alt: "Children by a Christmas tree" },
    { src: "/images/Footer-6.jpg", alt: "Children building a snowman" },
    { src: "/images/Footer-5.jpg", alt: "Children waiting for a school bus" },
];

function ColumnTitle({ children }: { children: string }) {
    return (
        <div>
            <h3 className="text-[18px] font-bold text-white sm:text-[19px]">{children}</h3>
            <div className="mt-3 flex h-[2px] w-[150px]">
                <span className="w-[40px] bg-brand-orange" />
                <span className="flex-1 bg-white/25" />
            </div>
        </div>
    );
}

function LinkList({ links }: { links: { label: string; to: string }[] }) {
    return (
        <ul className="space-y-3 sm:space-y-3.5">
            {links.map((link) => (
                <li key={link.label}>
                    <Link
                        to={link.to}
                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/85 transition-colors duration-300 hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:text-[14px]"
                    >
                        <ChevronsRight className="h-4 w-4 shrink-0" strokeWidth={2.4} />
                        <span className="transition-transform duration-300 group-hover:translate-x-1">{link.label}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

function ContactRow({ href, icon: Icon, label, value, external }: { href: string; icon: typeof Phone; label: string; value: string; external?: boolean }) {
    return (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group flex w-fit items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
        >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange outline-[1.5px] outline-dashed -outline-offset-[4px] outline-white/60 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
                <Icon className="h-5 w-5 text-white" strokeWidth={2} />
            </span>
            <span className="leading-tight">
                <span className="block text-[12px] font-semibold text-white/80 sm:text-[13px]">{label}</span>
                <span className="mt-0.5 block break-words text-[16px] font-bold text-white transition-colors duration-300 group-hover:text-brand-orange sm:text-[17px]">
                    {value}
                </span>
            </span>
        </a>
    );
}

export default function Footer() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <footer className="relative">
            <div className="relative overflow-hidden bg-brand-ink">
                <div aria-hidden="true" className="scallop-edge absolute inset-x-0 top-0 z-20 h-[7px]" />

                <img
                    src="/images/Footer-Bg.png"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[90%] -translate-x-1/2 opacity-[0.05] sm:w-[min(720px,70%)]"
                />

                <motion.div
                    ref={ref}
                    variants={stagger}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 pb-12 pt-14 sm:pb-16 sm:pt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.05fr_1.15fr_1fr] lg:gap-10 lg:pt-20"
                >
                    <motion.div variants={fadeUp}>
                        <Link to="/" aria-label={`${SITE.name} home`} className="inline-block">
                            <img src="/images/logo1.png" alt={SITE.name} loading="lazy" className="h-[70px] w-auto sm:h-[80px] lg:h-[88px]" />
                        </Link>

                        <p className="mt-4 max-w-[320px] text-[13px] font-semibold leading-[1.6] text-white/85 sm:text-[14px]">
                            We illustrate, design and publish children's books that families love to read together.
                        </p>

                        <div className="mt-6 flex flex-col gap-4">
                            <ContactRow href={SITE.phoneLink} icon={Phone} label="Call Support" value={SITE.phoneDisplay} />
                            <ContactRow href={`mailto:${SITE.email}`} icon={Mail} label="Email Support" value={SITE.email} />
                            <ContactRow href={SITE.address.mapLink} icon={MapPin} label="Visit Us" value={SITE.address.lines.join(", ")} external />
                        </div>

                        {SOCIALS.length > 0 && (
                            <div className="mt-6 flex items-center gap-3">
                                <span className="text-[13px] font-bold text-white">Follow Us :</span>
                                <div className="flex gap-2">
                                    {SOCIALS.map(({ label, href, icon: Icon }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            aria-label={label}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white transition-colors duration-300 hover:bg-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:h-8 sm:w-8"
                                        >
                                            <Icon className="h-3.5 w-3.5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <motion.nav variants={fadeUp} aria-label="Footer">
                        <ColumnTitle>Explore</ColumnTitle>
                        <div className="mt-6 grid grid-cols-2 gap-x-4 sm:mt-7 sm:gap-x-6">
                            <LinkList links={EXPLORE_LEFT} />
                            <LinkList links={EXPLORE_RIGHT} />
                        </div>

                        <div className="mt-7 border-t border-white/15 pt-5 sm:mt-8 sm:pt-6">
                            <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-white/50 sm:text-[13px]">Legal</p>
                            <LinkList links={LEGAL} />
                        </div>
                    </motion.nav>

                    <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-1">
                        <ColumnTitle>Our Work</ColumnTitle>

                        <div className="mt-6 grid max-w-[320px] grid-cols-3 gap-2.5 sm:mt-7 md:max-w-[560px] md:grid-cols-6 lg:max-w-[300px] lg:grid-cols-3">
                            {WORK.map((item) => (
                                <div key={item.src} className="group aspect-square overflow-hidden rounded-[12px] border-[3px] border-[#f3e3c8]">
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <div className="bg-brand-plum">
                <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-5 py-4 text-center sm:flex-row sm:py-5 sm:text-left">
                    <p className="text-[12px] font-semibold text-white sm:text-[13px]">
                        Copyright © {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}