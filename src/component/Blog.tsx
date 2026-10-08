import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight, CalendarDays, User } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

type BlogPost = {
    image: string;
    imageAlt: string;
    badge: string;
    badgeColor: string;
    date: string;
    title: string;
    author: string;
    authorRole: string;
    avatar?: string;
    href: string;
};

const POSTS: BlogPost[] = [
    {
        image: "/images/Blog-1.png",
        imageAlt: "Starry night, two children reading outdoors",
        badge: "Illustration",
        badgeColor: "#F2542D",
        date: "30 Sep, 2026",
        title: "How Illustrations Make a Children's Story Magical",
        author: "Toonhaus Team",
        authorRole: "Blog Writer",
        href: "#",
    },
    {
        image: "/images/Blog-2.png",
        imageAlt: "Girl with books in a pink bedroom",
        badge: "Writing Tips",
        badgeColor: "#F5A300",
        date: "30 Sep, 2026",
        title: "7 Tips for Writing a Picture Book Kids Ask for Again",
        author: "Toonhaus Team",
        authorRole: "Blog Writer",
        href: "#",
    },
    {
        image: "/images/Blog-3.png",
        imageAlt: "Mother reading to child at bedtime",
        badge: "Reading",
        badgeColor: "#7C5CFC",
        date: "30 Sep, 2026",
        title: "Why Bedtime Stories Matter for Every Child",
        author: "Toonhaus Team",
        authorRole: "Blog Writer",
        href: "#",
    },
];

function BlogCard({ post, className = "" }: { post: BlogPost; className?: string }) {
    return (
        <motion.article
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={`group flex flex-col overflow-hidden rounded-b-[18px] bg-white shadow-[0_10px_30px_-18px_rgba(37,40,62,0.35)] transition-shadow duration-500 hover:shadow-[0_22px_40px_-20px_rgba(37,40,62,0.45)] ${className}`}
        >
            <a href={post.href} className="block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
                <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
            </a>

            <div className="flex flex-1 flex-col px-4 pb-5 pt-5 font-[Roboto,system-ui,sans-serif] sm:px-5 sm:pb-6 lg:px-4 xl:px-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="rounded-full px-5 py-1 text-[12px] font-medium text-white" style={{ backgroundColor: post.badgeColor }}>
                        {post.badge}
                    </span>
                    <span className="flex items-center gap-1.5 text-[12.5px] text-brand-ink/70">
                        <CalendarDays className="h-3.5 w-3.5 text-[#F2542D]" strokeWidth={2} />
                        <time>{post.date}</time>
                    </span>
                </div>

                <h3 className="mt-4 text-[17px] font-bold leading-snug text-brand-ink lg:text-[clamp(16px,1.35vw,19px)]">
                    <a
                        href={post.href}
                        className="transition-colors duration-300 hover:text-brand-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-plum"
                    >
                        {post.title}
                    </a>
                </h3>

                <div className="mt-auto flex items-center justify-between pt-6">
                    <div className="flex items-center gap-2.5">
                        {post.avatar ? (
                            <img src={post.avatar} alt={post.author} className="h-7 w-7 rounded-full object-cover" />
                        ) : (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d9d9de]">
                                <User className="h-4 w-4 text-white" strokeWidth={2.5} />
                            </span>
                        )}
                        <div className="leading-tight">
                            <p className="text-[13px] font-medium text-brand-ink">{post.author}</p>
                            <p className="text-[11px] text-brand-ink/60">{post.authorRole}</p>
                        </div>
                    </div>

                    <a
                        href={post.href}
                        aria-label={`Read More: ${post.title}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F2542D] text-[#F2542D] transition-colors duration-300 hover:bg-[#F2542D] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2542D] lg:h-7 lg:w-7"
                    >
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.4} />
                    </a>
                </div>
            </div>
        </motion.article>
    );
}

export default function Blog() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    const lastIsAlone = POSTS.length % 2 === 1;

    return (
        <section className="relative overflow-hidden bg-[#f7f4ec] bg-cover bg-center py-12 sm:py-14 lg:py-16">
            <motion.div
                ref={ref}
                variants={stagger}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="relative z-10 mx-auto max-w-[1140px] px-4 sm:px-5"
            >
                <motion.p variants={fadeUp} className="text-center text-[13px] font-semibold text-brand-plum sm:text-[14px]">
                    From Our Blog
                </motion.p>
                <motion.h2
                    variants={fadeUp}
                    className="mt-0.5 text-center text-[clamp(26px,6vw,40px)] font-extrabold leading-[1.1] text-brand-ink lg:text-[clamp(34px,3.6vw,54px)]"
                >
                    Stories, tips and studio news
                </motion.h2>
                <motion.p
                    variants={fadeUp}
                    className="mx-auto mt-2 max-w-[520px] text-center text-[14px] font-medium leading-[1.6] text-brand-ink/60 sm:text-[15px]"
                >
                    Ideas for authors who want to write, illustrate and publish better children's books.
                </motion.p>

                <motion.div
                    variants={stagger}
                    className="mx-auto mt-7 grid max-w-[440px] grid-cols-1 gap-5 md:max-w-none md:grid-cols-2 md:gap-6 lg:mt-8 lg:grid-cols-3 lg:gap-5"
                >
                    {POSTS.map((post, i) => (
                        <BlogCard
                            key={i}
                            post={post}
                            className={
                                lastIsAlone && i === POSTS.length - 1
                                    ? "md:col-span-2 md:mx-auto md:w-[calc(50%_-_12px)] lg:col-span-1 lg:mx-0 lg:w-auto"
                                    : ""
                            }
                        />
                    ))}
                </motion.div>

                <motion.div variants={fadeUp} className="mt-8 text-center sm:mt-9">
                    <motion.a
                        href="#blog"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full bg-brand-plum px-7 py-3 text-[14px] font-bold uppercase tracking-wide text-white shadow-[0_10px_24px_-8px_rgba(37,40,62,0.4)] transition-colors duration-300 hover:bg-brand-plum/85 sm:px-8 sm:py-3.5 sm:text-[15px]"
                    >
                        View All Articles
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}