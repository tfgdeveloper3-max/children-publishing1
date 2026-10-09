import { useCallback, useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, type Variants } from "motion/react";

export type Rating = 1 | 2 | 3 | 4 | 5;

export type Review = {
    id: string;
    author: string;
    rating: Rating;
    title: string;
    body: string;
    date: string;
    service?: string;
    verified?: boolean;
};

export type NewReview = Omit<Review, "id" | "date" | "verified">;

export type ReviewPageProps = {
    reviews?: Review[];
    onSubmitReview?: (review: NewReview) => Promise<void> | void;
};

const BRAND = "Bexley Publishing";

const GREEN = "#00a870";
const ORANGE = "var(--color-brand-orange)";

const DEFAULT_REVIEWS: Review[] = [
    {
        id: "david-torres",
        author: "David Torres",
        rating: 5,
        title: "Turned my unfinished manuscript into a real book",
        body: "Bexley Publishing worked on my unfinished manuscript and turned it into a well-crafted book ready for publication. They exceeded my expectations at every stage. Highly recommended.",
        date: "2026-08-14",
        service: "Ghostwriting",
        verified: true,
    },
    {
        id: "priya-nair",
        author: "Priya Nair",
        rating: 5,
        title: "Professional from cover design to publishing",
        body: "I got professional support from cover design all the way to publishing. The team handled every technical detail with precision, kept my voice intact, and made sure my message reached my readers.",
        date: "2026-07-29",
        service: "Publishing",
        verified: true,
    },
    {
        id: "samantha-thornhill",
        author: "Samantha Thornhill",
        rating: 5,
        title: "Finally found a team that understood my idea",
        body: "After wasting time with inexperienced people, I found Bexley and they truly understood my book idea. Their writing, editing, and design were outstanding, and the audiobook came out beautifully.",
        date: "2026-07-10",
        service: "Audiobook",
        verified: true,
    },
    {
        id: "jonathan-pierce",
        author: "Jonathan Pierce",
        rating: 5,
        title: "Sharp, careful editing",
        body: "My editor caught plot holes I had missed for years and tightened the pacing without changing my style. Turnaround took a little longer than quoted, but the quality was worth the wait.",
        date: "2026-06-22",
        service: "Editing",
        verified: true,
    },
    {
        id: "aisha-mbeki",
        author: "Aisha Mbeki",
        rating: 5,
        title: "A cover that stands out on the shelf",
        body: "The design team gave me three strong concepts and patiently refined my favourite until it was perfect. Readers keep telling me the cover is what made them pick up the book.",
        date: "2026-06-03",
        service: "Cover Design",
        verified: true,
    },
    {
        id: "robert-klein",
        author: "Robert Klein",
        rating: 5,
        title: "Launch campaign brought real readers",
        body: "The marketing plan was clear and well organised. My launch week brought in more reviews and sales than my previous two books combined. I would have liked more frequent reporting.",
        date: "2026-05-18",
        service: "Marketing",
        verified: true,
    },
    {
        id: "lauren-mitchell",
        author: "Lauren Mitchell",
        rating: 5,
        title: "They wrote my story better than I could",
        body: "I had the memories but not the words. My ghostwriter interviewed me over several weeks and captured my voice so well that my family could not believe I did not write it myself.",
        date: "2026-04-27",
        service: "Ghostwriting",
        verified: true,
    },
    {
        id: "carlos-mendes",
        author: "Carlos Mendes",
        rating: 5,
        title: "Good result, slow communication at times",
        body: "The final formatting and publishing were done well and my book is live on every major store. Communication was slow during the middle of the project, but my project manager sorted it out.",
        date: "2026-04-09",
        service: "Publishing",
        verified: true,
    },
    {
        id: "hannah-obrien",
        author: "Hannah O'Brien",
        rating: 5,
        title: "Made publishing simple for a first-time author",
        body: "As a first-time author I had no idea where to start. Bexley explained every step, handled ISBNs and distribution, and made the whole process feel easy and exciting.",
        date: "2026-03-15",
        service: "Publishing",
        verified: true,
    },
];

const SERVICES = ["Ghostwriting", "Editing", "Publishing", "Cover Design", "Audiobook", "Marketing"];

const EASE = [0.22, 1, 0.36, 1] as const;
const GAP = 20;

const WORDS: Record<Rating, string> = { 1: "Bad", 2: "Poor", 3: "Average", 4: "Great", 5: "Excellent" };
const labelFor = (avg: number) =>
    avg >= 4.5 ? "Excellent" : avg >= 4 ? "Great" : avg >= 3 ? "Average" : avg >= 2 ? "Poor" : "Bad";

const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-plum";
const HERO_FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange";

const PILL =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-orange font-bold uppercase tracking-wide text-white shadow-[0_10px_22px_-10px_rgba(209,129,9,0.9)]";

const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const formatDate = (iso: string) => fmt.format(new Date(iso));

function relativeDate(iso: string, now: number) {
    const days = Math.round((now - new Date(iso).getTime()) / 86400000);
    if (days <= 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 30) return `${days} days ago`;
    return formatDate(iso);
}

function useCountUp(target: number, start: boolean) {
    const reduce = useReducedMotion();
    const [v, setV] = useState(0);
    useEffect(() => {
        if (!start) return;
        if (reduce) {
            setV(target);
            return;
        }
        const c = animate(0, target, { duration: 1.3, ease: EASE, onUpdate: setV });
        return () => c.stop();
    }, [target, start, reduce]);
    return v;
}

function useSlidesPerView() {
    const [n, setN] = useState(1);
    useEffect(() => {
        const update = () => setN(window.innerWidth >= 1280 ? 3 : window.innerWidth >= 1024 ? 2 : 1);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);
    return n;
}

const StarPath = () => <path d="M12 3.2l2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 16.6l-5.3 2.9 1.1-5.9L3.4 9.5l6-.8L12 3.2z" />;

function PillInner({ children }: { children: ReactNode }) {
    return (
        <>
            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
            <span className="relative">{children}</span>
        </>
    );
}

function StarTiles({ value, size = 20, animated = false, delay = 0 }: { value: number; size?: number; animated?: boolean; delay?: number }) {
    return (
        <span
            role="img"
            aria-label={`Rated ${value.toFixed(1).replace(/\.0$/, "")} out of 5 stars`}
            className="inline-flex"
            style={{ gap: Math.max(2, Math.round(size / 10)) }}
        >
            {[0, 1, 2, 3, 4].map((i) => {
                const fill = Math.max(0, Math.min(1, value - i));
                return (
                    <motion.span
                        key={i}
                        className="relative inline-block overflow-hidden rounded-[2px] bg-[#DCDCE3]"
                        style={{ width: size, height: size }}
                        initial={animated ? { scale: 0, rotate: -30 } : false}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 420, damping: 18, delay: animated ? delay + i * 0.09 : 0 }}
                    >
                        <span className="absolute inset-y-0 left-0" style={{ width: `${fill * 100}%`, backgroundColor: GREEN }} />
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="relative m-[14%] h-[72%] w-[72%] fill-white">
                            <StarPath />
                        </svg>
                    </motion.span>
                );
            })}
        </span>
    );
}

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left" ? <path d="M12 4l-6 6 6 6" /> : <path d="M8 4l6 6-6 6" />}
    </svg>
);

export default function ReviewPage({ reviews: initial = DEFAULT_REVIEWS, onSubmitReview }: ReviewPageProps) {
    const [reviews, setReviews] = useState(initial);
    const [modal, setModal] = useState(false);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 2600);
        return () => clearTimeout(t);
    }, [toast]);

    const submit = async (input: NewReview) => {
        await onSubmitReview?.(input);
        setReviews((p) => [{ ...input, id: `new-${Date.now()}`, date: new Date().toISOString().slice(0, 10) }, ...p]);
        setModal(false);
        setToast("Review posted. Thank you!");
    };

    return (
        <>
            <Hero reviews={reviews} onWrite={() => setModal(true)} />
            <ReviewsCarousel reviews={reviews} onWrite={() => setModal(true)} />

            <ReviewModal open={modal} onClose={() => setModal(false)} onSubmit={submit} />

            <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[120] flex justify-center px-4" aria-live="polite">
                <AnimatePresence>
                    {toast && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white shadow-xl"
                        >
                            {toast}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

function Hero({ reviews, onWrite }: { reviews: Review[]; onWrite: () => void }) {
    const stats = useMemo(() => {
        const counts: Record<Rating, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        for (const r of reviews) counts[r.rating]++;
        const total = reviews.length;
        const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
        const verified = total ? Math.round((reviews.filter((r) => r.verified).length / total) * 100) : 0;
        const services = new Set(reviews.map((r) => r.service).filter(Boolean)).size;
        return { total, avg, counts, verified, services };
    }, [reviews]);
    const score = useCountUp(stats.avg, true);
    const latest = useMemo(() => [...reviews].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2), [reviews]);

    const stagger: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
    };
    const item: Variants = {
        hidden: { opacity: 0, y: 26 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
    };

    return (
        <section className="relative overflow-hidden bg-brand-night px-5 pb-24 pt-16 text-white sm:px-8 sm:pt-20 lg:pb-32 lg:pt-24">
            <div
                className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-brand-plum/60"
                style={{ filter: "blur(140px)" }}
            />
            <div
                className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-orange/25"
                style={{ filter: "blur(120px)" }}
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                    maskImage: "radial-gradient(ellipse at 30% 40%, black 20%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, black 20%, transparent 70%)",
                }}
            />

            <div className="relative mx-auto grid max-w-[1140px] items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
                <motion.div variants={stagger} initial="hidden" animate="visible">
                    <motion.a
                        variants={item}
                        href="#reviews"
                        className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm text-white/80 backdrop-blur hover:border-white/30"
                    >
                        <span className="grid h-7 w-7 place-items-center rounded-full" style={{ backgroundColor: GREEN }}>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-white">
                                <StarPath />
                            </svg>
                        </span>
                        Rated {stats.avg.toFixed(1)} out of 5 by our authors
                    </motion.a>

                    <motion.h1 variants={item} className="mt-7 text-[clamp(34px,7vw,64px)] font-extrabold leading-[1.05] tracking-tight">
                        Reviews from authors who <span className="text-brand-orange">published with us</span>
                    </motion.h1>

                    <motion.p variants={item} className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70 sm:text-lg">
                        Every review here comes from a writer we worked with, across ghostwriting, editing, cover design, publishing and
                        marketing. Read what they say, then share your own.
                    </motion.p>

                    <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <motion.a
                            href="#reviews"
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            className={`${PILL} h-14 px-8 text-[13px] ${HERO_FOCUS}`}
                        >
                            <PillInner>Read the reviews</PillInner>
                        </motion.a>
                        <motion.button
                            type="button"
                            onClick={onWrite}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            className={`inline-flex h-14 items-center justify-center rounded-full border-2 border-white/30 px-8 text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white hover:text-brand-ink ${HERO_FOCUS}`}
                        >
                            Write a review
                        </motion.button>
                    </motion.div>

                    <motion.dl variants={item} className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
                        {[
                            { k: "Reviews", v: String(stats.total) },
                            { k: "Verified authors", v: `${stats.verified}%` },
                            { k: "Services reviewed", v: String(stats.services) },
                        ].map((s) => (
                            <div key={s.k}>
                                <dt className="text-sm text-white/55">{s.k}</dt>
                                <dd className="mt-1 text-3xl font-extrabold tabular-nums">{s.v}</dd>
                            </div>
                        ))}
                    </motion.dl>
                </motion.div>

                <div className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end">
                    {latest[1] && (
                        <motion.div
                            initial={{ opacity: 0, x: 60, rotate: 8 }}
                            animate={{ opacity: 1, x: 0, rotate: 6 }}
                            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
                            className="absolute -right-4 -top-10 hidden w-[78%] sm:block"
                        >
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                                <MiniReview review={latest[1]} faded />
                            </motion.div>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
                        className="relative rounded-3xl border-4 border-white bg-brand-paper p-7 text-brand-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:p-8"
                    >
                        <span className="pointer-events-none absolute inset-[4px] rounded-[20px] border-2 border-dotted border-brand-dots" />
                        <div className="relative flex items-start justify-between gap-4">
                            <div>
                                <p className="text-[15px] text-brand-ink/60">{BRAND}</p>
                                <p className="mt-1 text-3xl font-extrabold">{labelFor(stats.avg)}</p>
                            </div>
                            <p className="text-5xl font-extrabold tabular-nums leading-none text-brand-plum">{score.toFixed(1)}</p>
                        </div>
                        <div className="relative mt-4">
                            <StarTiles value={stats.avg} size={40} animated delay={0.9} />
                        </div>
                        <p className="relative mt-3 text-sm text-brand-ink/60">
                            Based on <span className="font-bold text-brand-ink">{stats.total} reviews</span>
                        </p>

                        <ul className="relative mt-6 space-y-2.5">
                            {([5, 4, 3, 2, 1] as Rating[]).map((n, i) => {
                                const pct = stats.total ? Math.round((stats.counts[n] / stats.total) * 100) : 0;
                                return (
                                    <li key={n} className="grid grid-cols-[3.5rem_1fr_2.5rem] items-center gap-3 text-sm">
                                        <span className="text-brand-ink/60">{n}-star</span>
                                        <span className="h-2 overflow-hidden rounded-full bg-brand-ink/10">
                                            <motion.span
                                                className="block h-full rounded-full"
                                                style={{ backgroundColor: ORANGE }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pct}%` }}
                                                transition={{ duration: 1, ease: EASE, delay: 1.1 + i * 0.08 }}
                                            />
                                        </span>
                                        <span className="text-right tabular-nums text-brand-ink/60">{pct}%</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>

                    {latest[0] && (
                        <motion.div
                            initial={{ opacity: 0, x: -60, rotate: -8 }}
                            animate={{ opacity: 1, x: 0, rotate: -4 }}
                            transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
                            className="relative -mt-8 ml-auto w-[88%] sm:-ml-10 sm:mr-auto"
                        >
                            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                                <MiniReview review={latest[0]} />
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>

            <motion.a
                href="#reviews"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/45 hover:text-white lg:flex"
            >
                Scroll to reviews
                <motion.span
                    className="block h-9 w-px"
                    style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)", originY: 0 }}
                    animate={{ scaleY: [1, 0.5, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.a>
        </section>
    );
}

function MiniReview({ review: r, faded = false }: { review: Review; faded?: boolean }) {
    return (
        <div
            aria-hidden="true"
            className={`rounded-2xl bg-white p-5 text-brand-ink shadow-[0_24px_50px_-20px_rgba(0,0,0,0.6)] ${faded ? "opacity-60" : ""}`}
        >
            <div className="flex items-center justify-between gap-3">
                <StarTiles value={r.rating} size={16} />
                <span className="text-xs text-brand-ink/55">{formatDate(r.date)}</span>
            </div>
            <p className="mt-2.5 text-[15px] font-bold leading-snug">{r.title}</p>
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-brand-ink/75">{r.body}</p>
            <p className="mt-3 text-xs font-bold text-brand-plum">{r.author}</p>
        </div>
    );
}

function ReviewsCarousel({ reviews, onWrite }: { reviews: Review[]; onWrite: () => void }) {
    const reduce = useReducedMotion();
    const perView = useSlidesPerView();
    const [now] = useState(() => Date.now());
    const [service, setService] = useState("All");
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [width, setWidth] = useState(0);
    const [inView, setInView] = useState(false);
    const viewport = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const labelId = useId();

    const stats = useMemo(() => {
        const total = reviews.length;
        return { total, avg: total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0 };
    }, [reviews]);
    const score = useCountUp(stats.avg, inView);

    const services = useMemo(
        () => ["All", ...Array.from(new Set(reviews.map((r) => r.service).filter(Boolean) as string[]))],
        [reviews]
    );

    const list = useMemo(
        () => reviews.filter((r) => service === "All" || r.service === service).sort((a, b) => b.date.localeCompare(a.date)),
        [reviews, service]
    );

    const cardW = width ? (width - GAP * (perView - 1)) / perView : 0;
    const step = cardW + GAP;
    const maxIndex = Math.max(0, list.length - perView);

    useEffect(() => {
        const el = viewport.current;
        if (!el) return;
        const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => setIndex(0), [service]);
    useEffect(() => setIndex((i) => Math.min(i, maxIndex)), [maxIndex]);

    const snap = useCallback(
        (i: number) => {
            animate(x, -i * step, reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 34 });
        },
        [x, step, reduce]
    );

    useEffect(() => snap(index), [index, snap]);

    const go = useCallback((i: number) => setIndex(Math.max(0, Math.min(maxIndex, i))), [maxIndex]);
    const next = useCallback(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);
    const prev = useCallback(() => setIndex((i) => (i <= 0 ? maxIndex : i - 1)), [maxIndex]);

    useEffect(() => {
        if (paused || reduce || maxIndex === 0) return;
        const t = setInterval(next, 5000);
        return () => clearInterval(t);
    }, [paused, reduce, maxIndex, next]);

    return (
        <section id="reviews" aria-labelledby={labelId} className="relative scroll-mt-4 overflow-hidden bg-[#fbf9f4] py-20 text-brand-ink sm:py-24">
            <motion.div className="mx-auto max-w-[1140px] px-5 sm:px-8" onViewportEnter={() => setInView(true)} viewport={{ once: true, amount: 0.3 }}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <p className="text-[13px] font-semibold text-brand-plum sm:text-[14px]">What Authors Say</p>
                    <h2 id={labelId} className="mt-1 text-[clamp(28px,6vw,44px)] font-extrabold leading-[1.1]">
                        Real stories from <span className="text-brand-plum">real authors</span>
                    </h2>
                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-brand-ink/70">
                        From first-time writers to seasoned professionals, authors trust {BRAND} to write, edit, design, publish, and market their
                        books.
                    </p>
                </motion.div>

                <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]" role="tablist" aria-label="Filter by service">
                        {services.map((s) => {
                            const active = service === s;
                            return (
                                <button
                                    key={s}
                                    type="button"
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setService(s)}
                                    className={`relative shrink-0 rounded-full border px-4 py-2.5 text-[13px] font-bold transition-colors ${active ? "border-transparent text-white" : "border-brand-ink/20 bg-white text-brand-ink hover:border-brand-plum hover:text-brand-plum"} ${FOCUS}`}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="review-tab"
                                            className="absolute -inset-px rounded-full bg-brand-orange shadow-[0_8px_18px_-8px_rgba(209,129,9,0.85)]"
                                            transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                        />
                                    )}
                                    <span className="relative">{s}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        <CarouselButton label="Previous reviews" onClick={prev} disabled={maxIndex === 0}>
                            <Arrow dir="left" />
                        </CarouselButton>
                        <CarouselButton label="Next reviews" onClick={next} disabled={maxIndex === 0}>
                            <Arrow dir="right" />
                        </CarouselButton>
                    </div>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)]">
                    <SummaryCard avg={stats.avg} score={score} total={stats.total} />
                    <div
                        ref={viewport}
                        className="min-w-0 overflow-hidden py-1"
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Author reviews"
                        tabIndex={0}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onFocus={() => setPaused(true)}
                        onBlur={() => setPaused(false)}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowRight") next();
                            if (e.key === "ArrowLeft") prev();
                        }}
                    >
                        {list.length === 0 ? (
                            <p className="py-16 text-center text-brand-ink/60">No reviews for this service yet.</p>
                        ) : (
                            <motion.ul
                                className="flex cursor-grab active:cursor-grabbing"
                                style={{ x, gap: GAP }}
                                drag={maxIndex > 0 ? "x" : false}
                                dragConstraints={{ left: -maxIndex * step, right: 0 }}
                                dragElastic={0.12}
                                onDragStart={() => setPaused(true)}
                                onDragEnd={(_, info) => {
                                    const swipe = info.offset.x + info.velocity.x * 0.2;
                                    const moved = Math.round(Math.abs(swipe) / step) || (Math.abs(swipe) > step / 5 ? 1 : 0);
                                    if (swipe < 0 && moved) go(index + moved);
                                    else if (swipe > 0 && moved) go(index - moved);
                                    else snap(index);
                                    setPaused(false);
                                }}
                            >
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {list.map((r, i) => (
                                        <motion.li
                                            key={r.id}
                                            layout
                                            role="group"
                                            aria-roledescription="slide"
                                            aria-label={`${i + 1} of ${list.length}`}
                                            className="shrink-0"
                                            style={{ width: cardW || `calc((100% - ${GAP * (perView - 1)}px) / ${perView})` }}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            exit={{ opacity: 0, scale: 0.94 }}
                                            transition={{ duration: 0.55, ease: EASE, delay: (i % perView) * 0.1 }}
                                        >
                                            <ReviewCard review={r} now={now} active={i >= index && i < index + perView} />
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </motion.ul>
                        )}
                    </div>
                </div>

                {maxIndex > 0 && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => go(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={i === index}
                                className={`relative h-2.5 overflow-hidden rounded-full bg-brand-ink/15 transition-all duration-300 ${i === index ? "w-10" : "w-2.5 hover:bg-brand-ink/30"} ${FOCUS}`}
                            >
                                {i === index && (
                                    <motion.span
                                        key={`${index}-${paused}`}
                                        className="absolute inset-y-0 left-0 rounded-full bg-brand-orange"
                                        initial={{ width: paused || reduce ? "100%" : "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: paused || reduce ? 0 : 5, ease: "linear" }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="relative mt-16 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-brand-plum px-8 py-10 text-center text-white sm:flex-row sm:text-left"
                >
                    <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-orange/30 blur-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="relative">
                        <p className="text-2xl font-extrabold tracking-tight">Worked with us?</p>
                        <p className="mt-1 text-white/75">Share your experience and help other authors choose with confidence.</p>
                    </div>
                    <motion.button
                        type="button"
                        onClick={onWrite}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        className={`${PILL} h-14 shrink-0 px-8 text-[13px] ${FOCUS}`}
                    >
                        <PillInner>Write a Review</PillInner>
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
}

function CarouselButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
    return (
        <motion.button
            type="button"
            aria-label={label}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            className={`grid h-12 w-12 place-items-center rounded-full border-2 border-brand-ink text-brand-ink transition-colors hover:border-brand-plum hover:bg-brand-plum hover:text-white disabled:pointer-events-none disabled:opacity-30 ${FOCUS}`}
        >
            {children}
        </motion.button>
    );
}

function SummaryCard({ avg, score, total }: { avg: number; score: number; total: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="my-1 flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-8 text-center text-brand-ink shadow-[0_14px_30px_-22px_rgba(37,40,62,0.5)]"
        >
            <p className="text-[22px] font-bold">{labelFor(avg)}</p>
            <div className="mt-2.5">
                <StarTiles value={avg} size={36} animated delay={0.2} />
            </div>
            <p className="mt-3 text-[14px]">
                Rated <span className="font-bold tabular-nums">{score.toFixed(1)}</span> / 5, based on{" "}
                <a href="#reviews" className="font-bold underline underline-offset-2">
                    {total} {total === 1 ? "review" : "reviews"}
                </a>
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-[15px] font-bold tracking-tight">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" style={{ fill: GREEN }}>
                    <StarPath />
                </svg>
                {BRAND}
            </p>
        </motion.div>
    );
}

function ReviewCard({ review: r, active, now }: { review: Review; active: boolean; now: number }) {
    const [open, setOpen] = useState(false);
    const id = useId();

    return (
        <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="my-1 flex h-full select-none flex-col rounded-2xl bg-white p-5 text-brand-ink shadow-[0_14px_30px_-22px_rgba(37,40,62,0.5)] transition-shadow hover:shadow-[0_22px_40px_-20px_rgba(37,40,62,0.45)]"
            aria-hidden={!active || undefined}
        >
            <div className="flex items-center justify-between gap-3">
                <StarTiles value={r.rating} size={20} />
                <time dateTime={r.date} title={formatDate(r.date)} className="shrink-0 text-[13px] text-brand-ink/55">
                    {relativeDate(r.date, now)}
                </time>
            </div>

            <h3 className="mt-3.5 text-[17px] font-bold leading-snug">{r.title}</h3>
            <p id={id} className={`mt-2 text-[14px] leading-[1.6] text-brand-ink/80 ${open ? "" : "line-clamp-3"}`}>
                {r.body}
            </p>
            <button
                type="button"
                aria-expanded={open}
                aria-controls={id}
                tabIndex={active ? 0 : -1}
                onClick={() => setOpen((o) => !o)}
                className={`mt-1 self-start text-[13px] font-semibold text-brand-plum underline-offset-2 hover:underline ${FOCUS}`}
            >
                {open ? "Show less" : "Read more"}
            </button>

            <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                <p className="flex min-w-0 items-center gap-1.5 text-[13px] font-bold">
                    <span className="truncate">{r.author}</span>
                    {r.verified && (
                        <span className="inline-flex shrink-0 items-center gap-1 text-[12px] font-normal text-brand-ink/55">
                            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" style={{ fill: GREEN }}>
                                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm3.4 5.2a.8.8 0 00-1.1 0L7 8.5 5.7 7.2a.8.8 0 10-1.1 1.1l1.9 1.9a.8.8 0 001.1 0l3.8-3.9a.8.8 0 000-1.1z" />
                            </svg>
                            Verified
                        </span>
                    )}
                </p>
                {r.service && <span className="shrink-0 rounded-full bg-brand-orange/10 px-2.5 py-1 text-[11px] font-semibold text-brand-orange">{r.service}</span>}
            </div>
        </motion.article>
    );
}

type Errors = Partial<Record<"rating" | "author" | "title" | "body", string>>;

function ReviewModal({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (r: NewReview) => Promise<void> }) {
    const [rating, setRating] = useState<Rating | 0>(0);
    const [hover, setHover] = useState<Rating | 0>(0);
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [service, setService] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const [busy, setBusy] = useState(false);
    const [failed, setFailed] = useState(false);
    const closeRef = useRef(onClose);
    const first = useRef<HTMLButtonElement>(null);
    const titleId = useId();

    useEffect(() => {
        closeRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (!open) return;
        const back = document.activeElement as HTMLElement | null;
        setRating(0);
        setHover(0);
        setAuthor("");
        setTitle("");
        setText("");
        setService("");
        setErrors({});
        setFailed(false);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const t = setTimeout(() => first.current?.focus(), 60);
        const key = (e: KeyboardEvent) => e.key === "Escape" && closeRef.current();
        window.addEventListener("keydown", key);
        return () => {
            clearTimeout(t);
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", key);
            back?.focus();
        };
    }, [open]);

    const current = (hover || rating) as Rating | 0;

    const handle = async (e: FormEvent) => {
        e.preventDefault();
        const err: Errors = {};
        if (!rating) err.rating = "Choose a star rating.";
        if (author.trim().length < 2) err.author = "Enter your name.";
        if (title.trim().length < 4) err.title = "Add a short title, at least 4 characters.";
        if (text.trim().length < 30) err.body = "Write at least 30 characters.";
        setErrors(err);
        if (Object.keys(err).length) return;
        setBusy(true);
        setFailed(false);
        try {
            await onSubmit({
                rating: rating as Rating,
                author: author.trim(),
                title: title.trim(),
                body: text.trim(),
                service: service || undefined,
            });
        } catch {
            setFailed(true);
        } finally {
            setBusy(false);
        }
    };

    const input = (bad?: string) =>
        `mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-[15px] font-normal ${bad ? "border-[#c4314b]" : "border-brand-ink/15"} ${FOCUS}`;

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="absolute inset-0 bg-brand-night/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 330, damping: 32 }}
                        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white text-brand-ink shadow-2xl sm:rounded-3xl"
                    >
                        <div className="h-1.5 bg-gradient-to-r from-brand-orange to-brand-plum" />
                        <div className="p-6 sm:p-8">
                            <div className="flex items-start justify-between gap-4">
                                <h2 id={titleId} className="text-2xl font-extrabold tracking-tight">
                                    Review {BRAND}
                                </h2>
                                <button type="button" onClick={onClose} aria-label="Close" className={`rounded-full p-2 text-brand-ink/60 hover:text-brand-plum ${FOCUS}`}>
                                    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                                        <path d="M5 5l10 10M15 5L5 15" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handle} noValidate className="mt-6 space-y-5">
                                <fieldset>
                                    <legend className="text-sm font-bold">Rate your experience</legend>
                                    <div className="mt-2 flex items-center gap-4">
                                        <div role="radiogroup" aria-label="Star rating" className="flex gap-1" onMouseLeave={() => setHover(0)}>
                                            {([1, 2, 3, 4, 5] as Rating[]).map((n) => (
                                                <motion.button
                                                    key={n}
                                                    ref={n === 1 ? first : undefined}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={rating === n}
                                                    aria-label={`${n} ${n === 1 ? "star" : "stars"}, ${WORDS[n]}`}
                                                    onMouseEnter={() => setHover(n)}
                                                    onFocus={() => setHover(n)}
                                                    onBlur={() => setHover(0)}
                                                    onClick={() => {
                                                        setRating(n);
                                                        setErrors((e) => ({ ...e, rating: undefined }));
                                                    }}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.88 }}
                                                    animate={{ backgroundColor: current >= n ? GREEN : "#dcdce3" }}
                                                    transition={{ duration: 0.15 }}
                                                    className={`grid h-11 w-11 place-items-center rounded-[3px] ${FOCUS}`}
                                                >
                                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-white">
                                                        <StarPath />
                                                    </svg>
                                                </motion.button>
                                            ))}
                                        </div>
                                        <span className="text-[15px] font-extrabold" aria-hidden="true">
                                            {current ? WORDS[current] : ""}
                                        </span>
                                    </div>
                                    {errors.rating && <Err>{errors.rating}</Err>}
                                </fieldset>

                                <label className="block text-sm font-bold">
                                    Your name
                                    <input value={author} onChange={(e) => setAuthor(e.target.value)} autoComplete="name" aria-invalid={!!errors.author} className={input(errors.author)} />
                                    {errors.author && <Err>{errors.author}</Err>}
                                </label>

                                <label className="block text-sm font-bold">
                                    Service <span className="font-normal text-brand-ink/55">(optional)</span>
                                    <select value={service} onChange={(e) => setService(e.target.value)} className={input()}>
                                        <option value="">Choose a service</option>
                                        {SERVICES.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="block text-sm font-bold">
                                    Title
                                    <input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        maxLength={100}
                                        placeholder="Sum up your experience"
                                        aria-invalid={!!errors.title}
                                        className={input(errors.title)}
                                    />
                                    {errors.title && <Err>{errors.title}</Err>}
                                </label>

                                <label className="block text-sm font-bold">
                                    Your review
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        rows={5}
                                        maxLength={1500}
                                        placeholder="Tell other authors about working with us"
                                        aria-invalid={!!errors.body}
                                        className={`${input(errors.body)} resize-y leading-relaxed`}
                                    />
                                    {errors.body && <Err>{errors.body}</Err>}
                                </label>

                                {failed && (
                                    <p role="alert" className="rounded-xl bg-[#fde8ec] px-4 py-3 text-sm text-[#8e1f33]">
                                        Your review wasn&apos;t posted. Check your connection and try again.
                                    </p>
                                )}

                                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                    <button type="button" onClick={onClose} className={`rounded-full px-5 py-3 text-sm font-bold text-brand-ink/60 hover:text-brand-ink ${FOCUS}`}>
                                        Cancel
                                    </button>
                                    <motion.button
                                        type="submit"
                                        disabled={busy}
                                        whileTap={{ scale: 0.97 }}
                                        className={`${PILL} px-7 py-3 text-[13px] disabled:opacity-60 ${FOCUS}`}
                                    >
                                        <PillInner>{busy ? "Posting…" : "Post Review"}</PillInner>
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function Err({ children }: { children: ReactNode }) {
    return <p className="mt-1.5 text-sm font-medium text-[#c4314b]">{children}</p>;
}