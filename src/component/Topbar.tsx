import { motion } from "motion/react";
import { Phone } from "lucide-react";
import type { ReactNode } from "react";

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
        <path d="M14 8h2.5V4.5H14c-2.2 0-4 1.8-4 4V11H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V8.5c0-.3.2-.5.5-.5z" />
    </svg>
);

const LinkedinIcon = () => (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
        <path d="M6.5 8.5h-3V20h3V8.5zM5 3.5a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zM20.5 13.3c0-3-1.6-4.9-4.2-4.9-1.4 0-2.4.7-2.8 1.4V8.5h-3V20h3v-6c0-1.4.7-2.4 1.9-2.4s1.8.9 1.8 2.4v6h3.3v-6.7z" />
    </svg>
);

const YoutubeIcon = () => (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
        <path
            fillRule="evenodd"
            d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3L10 15z"
        />
    </svg>
);

type Social = { label: string; href: string; icon: ReactNode };

const socials: Social[] = [
    { label: "Facebook", href: "#", icon: <FacebookIcon /> },
    { label: "LinkedIn", href: "#", icon: <LinkedinIcon /> },
    { label: "YouTube", href: "#", icon: <YoutubeIcon /> },
];

export default function TopBar() {
    return (
        <div className="bg-brand-purple text-white">
            {/* Mobile: chhota text + thodi kam spacing | sm+: original size */}
            <div className="mx-auto flex h-9 max-w-[1140px] items-center justify-between gap-3 px-4 text-[11px] font-semibold tracking-wide sm:px-5 sm:text-[12px]">
                {/* Phone */}
                <a
                    href="tel:+1234567890"
                    className="animate__animated animate__fadeInDown animate__slow group flex min-w-0 items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                    <Phone
                        className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-out group-hover:-rotate-12"
                        strokeWidth={2.5}
                    />
                    <span className="truncate">
                        {/* Bahut chhoti screen par "Phone :" label hide */}
                        <span className="hidden min-[400px]:inline">Phone : </span>
                        <span className="transition-colors duration-500 group-hover:text-brand-orange">
                            +1 234 567890
                        </span>
                    </span>
                </a>

                {/* Follow us */}
                <div className="animate__animated animate__fadeInDown animate__slow flex shrink-0 items-center gap-2">
                    <span className="hidden sm:inline">Follow Us :</span>
                    <ul className="flex items-center gap-1.5">
                        {socials.map((s, i) => (
                            <motion.li
                                key={s.label}
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <motion.a
                                    href={s.href}
                                    aria-label={s.label}
                                    whileHover={{ y: -2, rotate: 8, scale: 1.1 }}
                                    whileTap={{ scale: 0.92 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-white outline-none transition-colors duration-500 hover:bg-brand-orange focus-visible:ring-2 focus-visible:ring-white/70"
                                >
                                    {s.icon}
                                </motion.a>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}