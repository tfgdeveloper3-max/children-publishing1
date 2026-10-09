import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { Bus, Presentation, Sparkles, Blocks, type LucideIcon } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const cardIn: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

type Feature = { title: string; text: string; icon: LucideIcon };

const FEATURES: Feature[] = [
    { title: "A Decade of Stories", text: "10+ years in children's books", icon: Bus },
    { title: "All Under One Roof", text: "Illustration, covers, publishing and branding", icon: Presentation },
    { title: "Idea to Bookshelf", text: "One team from first sketch to final file", icon: Sparkles },
    { title: "Authors Worldwide", text: "Friendly remote teamwork, any time zone", icon: Blocks },
];

function TrustCard({ title, text, icon: Icon }: Feature) {
    return (
        <motion.div variants={cardIn} whileHover={{ y: -4 }} className="relative">
            <div
                aria-hidden="true"
                className="stamp-edge absolute inset-0 bg-white drop-shadow-[0_14px_24px_rgba(30,10,40,0.25)] [transform:perspective(700px)_rotateY(4deg)] md:[transform:perspective(700px)_rotateY(7deg)]"
            />

            <div className="relative flex items-center justify-between gap-3 px-5 py-6 sm:gap-4 sm:px-8 sm:py-7 lg:px-9 lg:py-8">
                <div className="min-w-0">
                    <h3 className="text-[17px] font-bold leading-tight text-brand-ink sm:text-[19px] lg:text-[clamp(18px,1.6vw,22px)]">
                        {title}
                    </h3>
                    <p className="mt-1 text-[13px] font-semibold text-brand-ink/60 sm:text-[14px]">{text}</p>
                </div>

                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-orange outline-[1.5px] outline-dashed -outline-offset-[5px] outline-white/60 sm:h-[58px] sm:w-[58px] lg:h-[64px] lg:w-[64px]">
                    <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7" strokeWidth={2} />
                </span>
            </div>
        </motion.div>
    );
}

export default function Trust() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section className="relative overflow-hidden bg-brand-plum bg-[url('/images/Trust-Bg.jpg')] bg-cover bg-center py-14 sm:py-16 lg:py-20">
            <div aria-hidden="true" className="absolute inset-0 bg-brand-plum/90" />

            {/* Clouds sirf xl+ par (wahan cards ke saath jagah hoti hai) */}
            <motion.img
                src="/images/PaperCloud.png"
                alt=""
                aria-hidden="true"
                initial={{ rotate: -3 }}
                animate={{ rotate: 3 }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                className="pointer-events-none absolute left-[2%] top-0 z-10 hidden w-[100px] origin-top xl:block 2xl:left-[4%] 2xl:w-[150px]"
            />

            {/* Paper plane sirf bade desktop par */}
            <img
                src="/images/PaperPlane.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[10%] right-[2%] z-10 hidden w-[190px] 2xl:block min-[1800px]:right-[4%] min-[1800px]:w-[260px]"
            />

            <motion.div
                ref={ref}
                variants={stagger}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="relative z-20 mx-auto max-w-[1040px] px-4 sm:px-5"
            >
                <motion.p variants={fadeUp} className="text-center text-[16px] font-semibold text-white sm:text-[17px]">
                    Why Authors Choose Toonhaus
                </motion.p>

                <motion.h2
                    variants={fadeUp}
                    className="mx-auto mt-1 max-w-[760px] text-center text-[clamp(26px,6vw,40px)] font-extrabold leading-[1.12] text-white lg:text-[clamp(34px,3.6vw,54px)] lg:leading-[1.1]"
                >
                    Every step of your book Handled with care
                </motion.h2>

                {/* Mobile: 1 column | Tablet+: 2 columns */}
                <motion.div variants={stagger} className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-6 lg:mt-10 lg:gap-x-7">
                    {FEATURES.map((f) => (
                        <TrustCard key={f.title} {...f} />
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}