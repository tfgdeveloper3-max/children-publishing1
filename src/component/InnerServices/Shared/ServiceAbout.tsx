import { motion, type Variants } from "motion/react";
import { Check } from "lucide-react";
import { PillButton } from "@/component/Navbar";

const EASE = [0.22, 1, 0.36, 1] as const;
const HANDS = "/images/Hands-Side.png";

const head: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const textCol: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const scallop = {
    WebkitMaskImage: "radial-gradient(circle at 6px 0, transparent 5px, #000 5.5px)",
    maskImage: "radial-gradient(circle at 6px 0, transparent 5px, #000 5.5px)",
    WebkitMaskSize: "12px 100%",
    maskSize: "12px 100%",
} as const;

function HandStrip({ side }: { side: "left" | "right" }) {
    const isLeft = side === "left";
    return (
        <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: EASE }}
            className={`pointer-events-none absolute inset-y-[10%] hidden w-[clamp(52px,6vw,92px)] flex-col justify-center md:flex ${isLeft ? "left-0" : "right-0"}`}
        >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col">
                {[0, 1].map((i) => (
                    <img key={i} src={HANDS} alt="" draggable={false} className={`w-full select-none ${isLeft ? "-scale-x-100" : ""}`} />
                ))}
            </motion.div>
        </motion.div>
    );
}

type Props = {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    points: string[];
    image: string;
    imageAlt: string;
};

export default function ServiceAbout({ eyebrow, heading, paragraphs, points, image, imageAlt }: Props) {
    return (
        <section className="relative overflow-hidden border-t-2 border-brand-plum bg-[#fbf9f4] pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
            <HandStrip side="left" />
            <HandStrip side="right" />

            <div className="relative mx-auto max-w-[1140px] px-4 sm:px-5 md:px-[clamp(72px,8vw,110px)] xl:px-5">
                <motion.div variants={head} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className="mx-auto max-w-[620px] text-center">
                    <motion.p variants={fadeUp} className="text-[13px] font-semibold text-brand-plum sm:text-[14px]">
                        {eyebrow}
                    </motion.p>
                    <motion.h2 variants={fadeUp} className="mt-1 text-[clamp(26px,6vw,36px)] font-extrabold leading-[1.15] text-brand-ink lg:text-[clamp(34px,3vw,44px)]">
                        {heading}
                    </motion.h2>
                </motion.div>

                <div className="mt-8 grid items-center gap-8 sm:mt-10 lg:mt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10 xl:gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50, rotate: -2 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.2, ease: EASE }}
                        className="group overflow-hidden rounded-[22px] shadow-[0_24px_40px_-24px_rgba(37,40,62,0.55)] sm:rounded-[28px]"
                    >
                        <img
                            src={image}
                            alt={imageAlt}
                            draggable={false}
                            decoding="async"
                            className="aspect-[1140/655] w-full select-none object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                        />
                    </motion.div>

                    <motion.div variants={textCol} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                        {paragraphs.map((p, i) => (
                            <motion.p key={i} variants={fadeUp} className={`text-[13px] leading-[1.9] text-brand-ink/80 sm:text-[14px] ${i ? "mt-4" : ""}`}>
                                {p}
                            </motion.p>
                        ))}

                        <motion.ul variants={fadeUp} className="mt-5 space-y-3">
                            {points.map((point) => (
                                <li key={point} className="flex items-center gap-3 text-[13px] font-bold text-brand-ink sm:text-[14px]">
                                    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-orange text-white">
                                        <Check className="h-3.5 w-3.5" strokeWidth={3.2} />
                                    </span>
                                    {point}
                                </li>
                            ))}
                        </motion.ul>

                        <motion.div variants={fadeUp} className="mt-7">
                            <PillButton to="/contact" className="px-7">
                                Contact Us
                            </PillButton>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[8px] bg-brand-plum" style={scallop} />
        </section>
    );
}