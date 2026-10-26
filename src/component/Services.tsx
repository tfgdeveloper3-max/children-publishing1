import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, type Variants } from "motion/react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { findService, serviceHref } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;

type Card = {
    title: string;
    description: string;
    image: string;
    icon: LucideIcon;
    href: string;
};

type Pick = { slug: string; title: string; description: string };

const PICKS: Pick[] = [
    {
        slug: "book-launch-promotional-campaigns",
        title: "Book Launch & Promotional Campaigns",
        description:
            "Generate buzz with targeted press releases, reader reviews, author interviews, and podcast features that give your book the launch it deserves.",
    },
    {
        slug: "character-merchandise-design",
        title: "Character Merchandise & Apparel Design",
        description:
            "Bring your story off the page! We create custom plushies, apparel, stickers, and collectibles starring your lovable characters.",
    },
    {
        slug: "children-s-book-distribution-global-publishing",
        title: "Worldwide Children's Book Distribution",
        description:
            "Get featured on Amazon KDP, IngramSpark, and major retail platforms to reach schools, libraries, and young readers in over 40 countries with Toon Haus Publishing.",
    },
];

const IMAGES = ["/images/Cover3.png", "/images/Cover2.png", "/images/Cover1.png"];

const services: Card[] = PICKS.flatMap((pick, i) => {
    const found = findService(pick.slug);
    if (!found) return [];
    return [
        {
            title: pick.title,
            description: pick.description,
            image: IMAGES[i % IMAGES.length],
            icon: found.service.icon,
            href: serviceHref(found.category, found.service),
        },
    ];
});

const headingVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 1.1, ease: EASE, delay },
    }),
};

function ServiceCard({ service, delay, show }: { service: Card; delay: number; show: boolean }) {
    const Icon = service.icon;
    const navigate = useNavigate();

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(service.href);
    };

    return (
        <motion.a
            href={service.href}
            onClick={onClick}
            variants={cardVariants}
            custom={delay}
            initial="hidden"
            animate={show ? "show" : "hidden"}
            whileHover="hover"
            className="group block rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-brand-plum/30"
        >
            <div className="stamp-edge relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <motion.img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    variants={{ hover: { scale: 1.07 } }}
                    transition={{ duration: 1.2, ease: EASE }}
                    style={{ willChange: "transform" }}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

            <motion.div
                variants={{ hover: { y: -6 } }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative z-10 mx-3 -mt-[22%] rounded-2xl bg-[#ebeaee] px-4 pb-5 pt-4 shadow-[0_14px_30px_-18px_rgba(37,40,62,0.45)] sm:mx-4 sm:px-5 sm:pb-6"
            >
                <div className="flex items-start justify-between">
                    <Icon className="mt-1 h-6 w-6 text-[#5b5e6e] sm:h-7 sm:w-7" strokeWidth={1.4} />
                    <motion.span
                        variants={{ hover: { rotate: 45, scale: 1.08 } }}
                        transition={{ type: "spring", stiffness: 200, damping: 16 }}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-plum text-white transition-colors duration-500 group-hover:bg-brand-orange"
                    >
                        <ArrowUpRight className="h-5 w-5" strokeWidth={2.4} />
                    </motion.span>
                </div>
                <h3 className="mt-3 text-[15px] font-bold leading-tight text-brand-ink transition-colors duration-500 group-hover:text-brand-plum sm:mt-4 sm:text-[16px]">
                    {service.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5b5e6e] sm:mt-2 sm:text-[14px]">{service.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-plum transition-colors duration-500 group-hover:text-brand-orange sm:mt-4 sm:text-[14px]">
                    Learn More
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
                </span>
            </motion.div>
        </motion.a>
    );
}

function Hands({ side }: { side: "left" | "right" }) {
    const isLeft = side === "left";
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 z-10 hidden -translate-y-1/2 xl:block ${isLeft ? "left-0" : "right-0"}`}
        >
            <img
                src={isLeft ? "/images/Left.png" : "/images/Right.png"}
                alt=""
                className={`h-[220px] w-auto 2xl:h-[300px] ${isLeft ? "-scale-x-100" : ""}`}
            />
        </div>
    );
}

export default function Services() {

    const labelRef = useRef<HTMLParagraphElement>(null);
    const labelInView = useInView(labelRef, { once: true, amount: 0.8 });
    const gridRef = useRef<HTMLDivElement>(null);
    const gridInView = useInView(gridRef, { once: true, amount: 0.3 });


    return (
        <section className="relative overflow-hidden bg-[#f9f7f2] py-14 sm:py-20 lg:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
                <img src="/images/Services-BG.png" alt="" className="h-full w-full object-cover object-center" />
            </div>

            <Hands side="left" />
            <Hands side="right" />

            <div className="relative z-20 mx-auto max-w-[1140px] px-3 sm:px-5">
                <motion.div
                    variants={headingVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    className="px-2 text-center"
                >
                    <p
                        ref={labelRef}
                        className={`text-[16px] font-semibold text-brand-plum ${labelInView ? "animate__animated animate__fadeInDown animate__slow" : "opacity-0"}`}
                    >
                        What We Do
                    </p>
                    <motion.h2
                        variants={fadeUp}
                        className="mx-auto mt-1 max-w-[680px] text-[clamp(26px,6vw,44px)] font-bold leading-[1.12] text-brand-ink lg:text-[clamp(28px,3.2vw,44px)]"
                    >
                        Your All-in-One Children's Publishing Studio
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="mx-auto mt-3 max-w-[680px] text-[15px] leading-relaxed text-brand-ink/80 sm:text-[16px]"
                    >
                        From creative spark to global distribution, our passionate team handles every detail—so you end up with a polished book you'll be proud to share with the world.
                    </motion.p>
                </motion.div>

                <div
                    ref={gridRef}
                    className="mx-auto mt-8 grid max-w-[1040px] grid-cols-1 gap-6 px-1 sm:mt-12 sm:grid-cols-2 sm:gap-7 sm:px-2 lg:grid-cols-3"
                >
                    {services.map((s, i) => (
                        <ServiceCard
                            key={s.title}
                            service={s}
                            show={gridInView}
                            delay={0.25 + i * 0.12}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}