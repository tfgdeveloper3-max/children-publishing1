import { useRef, type ComponentType, type SVGProps } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { ChevronsRight, Phone } from "lucide-react";

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

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const PHONE_DISPLAY = "+1 234 567890";
const PHONE_LINK = "tel:+1234567890";
const CURRENT_YEAR = new Date().getFullYear();

const SOCIALS: { label: string; href: string; icon: IconComponent }[] = [
    { label: "Facebook", href: "#", icon: FacebookIcon },
    { label: "LinkedIn", href: "#", icon: LinkedinIcon },
    { label: "YouTube", href: "#", icon: YoutubeIcon },
];

const EXPLORE_LEFT = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#about" },
    { label: "Contact Us", href: "#contact" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact US", href: "#contact" },
];

const EXPLORE_RIGHT = [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
];

const WORK = [
    { src: "/images/Footer-2.jpg", alt: "Girl with curly hair at the salon" },
    { src: "/images/Footer-1.jpg", alt: "Family meeting a puppy in the kitchen" },
    { src: "/images/Footer-4.jpg", alt: "Happy girl in the salon chair" },
    { src: "/images/Footer-3.jpg", alt: "Twins opening Christmas presents" },
    { src: "/images/Footer-6.jpg", alt: "Kids building a snowman" },
    { src: "/images/Footer-5.jpg", alt: "Twins waiting for the school bus" },
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

function LinkList({ links }: { links: { label: string; href: string }[] }) {
    return (
        <ul className="space-y-3 sm:space-y-3.5">
            {links.map((link) => (
                <li key={link.label}>
                    <a
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/85 transition-colors duration-300 hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:text-[14px]"
                    >
                        <ChevronsRight className="h-4 w-4 shrink-0" strokeWidth={2.4} />
                        <span className="transition-transform duration-300 group-hover:translate-x-1">{link.label}</span>
                    </a>
                </li>
            ))}
        </ul>
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

                {/* Mobile: 1 column | Tablet: 2 columns (Our Work neeche poori width) | Laptop+: 3 columns */}
                <motion.div
                    ref={ref}
                    variants={stagger}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                    className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 pb-12 pt-14 sm:pb-16 sm:pt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.05fr_1.15fr_1fr] lg:gap-10 lg:pt-20"
                >
                    <motion.div variants={fadeUp}>
                        <a href="#" className="inline-block">
                            <h2 className="text-[32px] font-extrabold leading-none text-white sm:text-[36px] lg:text-[clamp(34px,2.6vw,42px)]">
                                Logo Here
                            </h2>
                        </a>

                        <p className="mt-4 max-w-[320px] text-[13px] font-semibold leading-[1.6] text-white/85 sm:text-[14px]">
                            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
                        </p>

                        <a
                            href={PHONE_LINK}
                            className="group mt-6 flex w-fit items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange outline-[1.5px] outline-dashed -outline-offset-[4px] outline-white/60 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
                                <Phone className="h-5 w-5 fill-white text-white" strokeWidth={1.5} />
                            </span>
                            <span className="leading-tight">
                                <span className="block text-[12px] font-semibold text-white/80 sm:text-[13px]">Call Support</span>
                                <span className="mt-0.5 block text-[17px] font-bold text-white sm:text-[18px]">{PHONE_DISPLAY}</span>
                            </span>
                        </a>

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
                    </motion.div>

                    <motion.nav variants={fadeUp} aria-label="Footer">
                        <ColumnTitle>Explore</ColumnTitle>
                        <div className="mt-6 grid grid-cols-2 gap-x-4 sm:mt-7 sm:gap-x-6">
                            <LinkList links={EXPLORE_LEFT} />
                            <LinkList links={EXPLORE_RIGHT} />
                        </div>
                    </motion.nav>

                    <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-1">
                        <ColumnTitle>Our Work</ColumnTitle>

                        {/* Mobile: 3 columns (max 320px) | Tablet: 6 ek row mein | Laptop+: 3 × 2 */}
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
                        Copyright © {CURRENT_YEAR} All Rights Reserved By
                    </p>
                </div>
            </div>
        </footer>
    );
}