import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { Check, Loader2, Mail, MapPin, Phone, Send, type LucideIcon } from "lucide-react";
import { SITE } from "@/data/Site";
import { submitLead } from "@/lib/lead";

type BrandIcon = (props: { className?: string }) => ReactNode;

const FacebookIcon: BrandIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9H17l.5-4h-4V8.8c0-.5.3-.8.5-.8z" />
    </svg>
);

const TwitterIcon: BrandIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.7a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1.5 1.6 2 2.8 3.8 2.9A8.3 8.3 0 0 1 2 18.5a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2z" />
    </svg>
);

const LinkedinIcon: BrandIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M4.5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h3v12H3zM9 9h2.9v1.7c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.4 4.5 5.6V21h-3v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9z" />
    </svg>
);

const EASE = [0.22, 1, 0.36, 1] as const;

type Info = { title: string; lines: string[]; href: string; icon: LucideIcon; external?: boolean };

const INFO: Info[] = [
    { title: "Phone", lines: [SITE.phoneDisplay], href: SITE.phoneLink, icon: Phone },
    { title: "Email", lines: [SITE.email], href: `mailto:${SITE.email}`, icon: Mail },
    {
        title: "Location",
        lines: SITE.address.lines,
        href: SITE.address.mapLink,
        icon: MapPin,
        external: true,
    },
];

const SOCIALS: { label: string; href: string; icon: BrandIcon }[] = [
    { label: "Facebook", href: SITE.socials.facebook, icon: FacebookIcon },
    { label: "Twitter", href: SITE.socials.twitter, icon: TwitterIcon },
    { label: "LinkedIn", href: SITE.socials.linkedin, icon: LinkedinIcon },
].filter((s) => s.href);

const col: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const pop: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.92 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 16 } },
};

const SHADOW = "0 3px 0 #25283e";
const SHADOW_HOVER = "0 7px 0 #25283e";

const inputBase =
    "w-full border border-brand-ink/15 bg-white px-5 text-[13px] text-brand-ink shadow-[0_2px_0_#25283e] outline-none transition-[box-shadow,border-color,transform] duration-300 placeholder:font-light placeholder:text-brand-ink/50 hover:-translate-y-[1px] hover:shadow-[0_3px_0_#25283e] focus:-translate-y-[2px] focus:border-brand-orange/60 focus:shadow-[0_4px_0_var(--color-brand-orange)]";

function InfoCard({ info }: { info: Info }) {
    const Icon = info.icon;
    return (
        <motion.a
            variants={pop}
            href={info.href}
            target={info.external ? "_blank" : undefined}
            rel={info.external ? "noreferrer" : undefined}
            initial={{ boxShadow: SHADOW }}
            whileHover={{ y: -4, boxShadow: SHADOW_HOVER }}
            whileTap={{ y: 0, boxShadow: SHADOW }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative block overflow-hidden rounded-[18px] border border-brand-ink/10 bg-white px-5 py-5 outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/30"
        >
            <span className="pointer-events-none absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange opacity-0 transition-all duration-500 group-hover:right-3 group-hover:top-3 group-hover:opacity-100">
                <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="text-[15px] font-bold text-brand-ink">{info.title}</h3>
            <p className="mt-2 text-[12.5px] leading-[1.45] text-brand-ink/85 transition-colors duration-300 group-hover:text-brand-plum">
                {info.lines.map((l) => (
                    <span key={l} className="block">
                        {l}
                    </span>
                ))}
            </p>
            <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-brand-orange transition-all duration-500 group-hover:w-full" />
        </motion.a>
    );
}

function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
    return (
        <motion.div variants={fadeUp}>
            <label htmlFor={id} className="mb-2 block text-[13px] font-medium text-brand-ink">
                {label}
            </label>
            {children}
        </motion.div>
    );
}

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [status, setStatus] = useState<Status>("idle");

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (status === "sending") return;
        setStatus("sending");
        try {
            await submitLead({ name: form.name, email: form.email, phone_number: form.phone, message: form.message });
            setStatus("sent");
            setForm({ name: "", email: "", phone: "", message: "" });
            setTimeout(() => setStatus("idle"), 3200);
        } catch {
            setStatus("error");
        }
    };

    return (
        <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
            <div className="mx-auto grid max-w-[1000px] items-start gap-12 px-4 sm:px-5 lg:grid-cols-2 lg:gap-16">
                <motion.div variants={col} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="lg:pt-6">
                    <motion.h2
                        variants={fadeUp}
                        className="text-[clamp(28px,6vw,34px)] font-extrabold leading-[1.1] text-brand-ink lg:text-[clamp(32px,2.8vw,40px)]"
                    >
                        Your Story Deserves to Soar.
                    </motion.h2>
                    <motion.p variants={fadeUp} className="mt-4 max-w-[300px] text-[11.5px] font-semibold leading-[1.7] text-brand-ink/70">
                        Our clients are our best advocates. Here's what they have to say about their experience with Seawings
                        publishers.
                    </motion.p>

                    <motion.div variants={col} className="mt-7 grid max-w-[340px] grid-cols-1 gap-4 min-[400px]:grid-cols-2">
                        {INFO.map((info) => (
                            <InfoCard key={info.title} info={info} />
                        ))}
                    </motion.div>

                    {SOCIALS.length > 0 && (
                        <>
                            <motion.h3 variants={fadeUp} className="mt-8 text-[18px] font-bold text-brand-ink">
                                Follow Us
                            </motion.h3>
                            <motion.ul variants={col} className="mt-4 flex gap-3">
                                {SOCIALS.map(({ label, href, icon: Icon }) => (
                                    <motion.li key={label} variants={pop}>
                                        <motion.a
                                            href={href}
                                            aria-label={label}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -4, rotate: 8, scale: 1.08 }}
                                            whileTap={{ scale: 0.92 }}
                                            transition={{ type: "spring", stiffness: 320, damping: 16 }}
                                            className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-brand-orange text-white shadow-[0_6px_14px_-6px_rgba(209,129,9,0.9)] outline-none transition-colors duration-300 hover:bg-brand-plum focus-visible:ring-4 focus-visible:ring-brand-orange/40"
                                        >
                                            <Icon className="h-3.5 w-3.5" />
                                        </motion.a>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50, rotate: 1.5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 1.1, ease: EASE }}
                    className="rounded-[22px] border border-brand-ink/15 bg-white px-5 pb-6 pt-6 shadow-[0_3px_0_#25283e] transition-shadow duration-500 hover:shadow-[0_6px_0_#25283e] sm:px-6"
                >
                    <motion.form
                        variants={col}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        onSubmit={onSubmit}
                        className="space-y-4"
                    >
                        <motion.h2
                            variants={fadeUp}
                            className="mb-5 text-[clamp(26px,5vw,30px)] font-extrabold leading-[1.1] text-brand-ink lg:text-[32px]"
                        >
                            Send us a message
                        </motion.h2>

                        <Field label="Full Name" id="cf-name">
                            <input
                                id="cf-name"
                                name="name"
                                required
                                autoComplete="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={onChange}
                                className={`${inputBase} h-[34px] rounded-full`}
                            />
                        </Field>

                        <Field label="Email" id="cf-email">
                            <input
                                id="cf-email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={onChange}
                                className={`${inputBase} h-[34px] rounded-full`}
                            />
                        </Field>

                        <Field label="Phone Number" id="cf-phone">
                            <input
                                id="cf-phone"
                                name="phone"
                                type="tel"
                                required
                                autoComplete="tel"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={onChange}
                                className={`${inputBase} h-[34px] rounded-full`}
                            />
                        </Field>

                        <Field label="Message" id="cf-message">
                            <textarea
                                id="cf-message"
                                name="message"
                                required
                                rows={5}
                                placeholder="Message"
                                value={form.message}
                                onChange={onChange}
                                className={`${inputBase} min-h-[94px] resize-none rounded-[16px] py-3`}
                            />
                        </Field>

                        <motion.div variants={fadeUp} className="pt-1">
                            <motion.button
                                type="submit"
                                disabled={status === "sending"}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                className={`group relative flex h-[34px] w-full items-center justify-center overflow-hidden rounded-[8px] text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_10px_22px_-12px_rgba(209,129,9,0.9)] outline-none transition-colors duration-500 focus-visible:ring-4 focus-visible:ring-brand-orange/40 disabled:cursor-wait ${status === "sent" ? "bg-emerald-600" : "bg-brand-orange hover:bg-[#b96f06]"}`}
                            >
                                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={status}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.3, ease: EASE }}
                                        className="relative inline-flex items-center gap-2"
                                    >
                                        {(status === "idle" || status === "error") && (
                                            <>
                                                Send Message
                                                <Send className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                                            </>
                                        )}
                                        {status === "sending" && (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Sending
                                            </>
                                        )}
                                        {status === "sent" && (
                                            <>
                                                <Check className="h-4 w-4" strokeWidth={3} />
                                                Message Sent
                                            </>
                                        )}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.button>
                            <p aria-live="polite" className="sr-only">
                                {status === "sent" ? "Your message has been sent." : ""}
                            </p>
                            <AnimatePresence>
                                {status === "error" && (
                                    <motion.p
                                        role="alert"
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-3 rounded-xl bg-[#fde8ec] px-4 py-3 text-[12.5px] text-[#8e1f33]"
                                    >
                                        Your message couldn't be sent. Please try again, or email us at{" "}
                                        <a href={`mailto:${SITE.email}`} className="font-bold underline">
                                            {SITE.email}
                                        </a>
                                        .
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </section>
    );
}