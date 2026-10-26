import {
    Brush,
    ClipboardList,
    Clapperboard,
    FileCheck2,
    Lightbulb,
    LineChart,
    MessagesSquare,
    Mic,
    Palette,
    PenLine,
    PencilRuler,
    Rocket,
    Search,
    Send,
    Sparkles,
    Target,
    Wand2,
    type LucideIcon,
} from "lucide-react";

export type Step = { title: string; text: string; icon: LucideIcon };
export type QA = { q: string; a: string };

export type Copy = { title: string; text: string };

export type CategoryContent = {
    heroBg: string;
    aboutImage: string;
    aboutHeading: string;
    about: string;
    processEyebrow?: string;
    processHeading: string;
    processDescription?: string;
    processHighlight?: number;
    process: Step[];
    faqs: QA[];
    faqCopy?: {
        eyebrow?: string;
        heading?: string;
        description?: string;
        sideHeading?: string;
        sideText?: string;
        sideCta?: string;
    };
    relatedCopy?: {
        eyebrow?: string;
        heading?: string;
        viewAll?: string;
        cards?: Record<string, Partial<Copy>>;
    };
};

export type ServiceContent = {
    summary: string;
    points: [string, string];
    hero?: { eyebrow?: string; title?: string; description?: string; cta?: string };
    about?: { eyebrow?: string; heading?: string; paragraphs?: string[]; points?: string[]; cta?: string };
    includes?: { eyebrow?: string; heading?: string; items?: Copy[] };
    why?: { eyebrow?: string; heading?: string; items: Copy[] };
    process?: { eyebrow?: string; heading: string; description?: string; steps: Copy[] };
    related?: { eyebrow?: string; heading?: string; viewAll?: string; cards?: Record<string, Partial<Copy>> };
    faq?: {
        eyebrow?: string;
        heading?: string;
        description?: string;
        sideHeading?: string;
        sideText?: string;
        sideCta?: string;
        items: QA[];
    };
};

const HERO_BG = "/images/Book-Cover-Design-BG.png";
const ABOUT_IMG = "/images/Cover-Designing.png";

export const CATEGORY_CONTENT: Record<string, CategoryContent> = {
    "children-s-book-creation-publishing": {
        heroBg: HERO_BG,
        aboutImage: ABOUT_IMG,
        aboutHeading: "From first idea to finished book.",
        about: "Our editors, writers and publishing specialists guide children's authors through every stage, from shaping the story to getting a polished book onto store shelves. You stay in control of your story while we handle the craft and the technical details.",
        processEyebrow: "Our Simple 4-Step Process",
        processHeading: "How We Turn Your Big Dream into a Finished Masterpiece!",
        processDescription: "Toon Haus Publishing makes the creation process smooth, transparent, and completely stress-free so you always feel confident about what's coming next.",
        processHighlight: 2,
        process: [
            { title: "Vision & Strategy Session", text: "We dive deep into your ideas, target audience, and publishing goals to lay down the perfect artistic and narrative foundation.", icon: MessagesSquare },
            { title: "Custom Creative Blueprint", text: "You receive a crystal-clear roadmap complete with project timelines, milestones, and transparent upfront pricing before we write or draw a single line.", icon: ClipboardList },
            { title: "Craft, Collaborate & Polish", text: "Watch your story come alive through progress reveals! We refine drafts and artwork based directly on your feedback until every page shines.", icon: PenLine },
            { title: "Grand Launch & Distribution", text: "We deliver press-ready files and publish your book across major global platforms, placing your creation directly into young readers' hands.", icon: Rocket },
        ],
        faqs: [
            { q: "Who retains intellectual property rights and earnings for my book?", a: "You maintain 100% copyright ownership and keep every penny of your royalties! Toon Haus Publishing acts strictly as your creative partner, delivering every master file directly to you upon completion." },
            { q: "What is the typical timeline from idea to a finished book?", a: "Most projects take between 4 to 8 weeks, depending on story length and illustration complexity. We provide a custom schedule right from the start so you always know what to expect!" },
            { q: "What if I have never written or published a book before?", a: "You are in the perfect place! Over half of our authors are first-time storytellers. Our friendly team guides you through every decision, ensuring a fun and stress-free experience." },
            { q: "How are your publishing and design packages priced?", a: "We offer flat-rate, transparent pricing tailored to your specific scope. There are zero hidden fees or surprises, and we provide a detailed quote before any work begins." },
            { q: "Will I be able to request revisions during the creation process?", a: "Absolutely! We share drafts and artwork at every milestone, giving you full opportunity to review and provide feedback so the final product matches your exact vision." },
        ],
        faqCopy: {
            eyebrow: "Got Questions? We've Got Answers!",
            heading: "Everything You Need to Know Before Starting Your Story!",
            description: "Clear, straight-to-the-point answers about crafting, designing, and launching your children's book with Toon Haus Publishing.",
            sideHeading: "Have a Question Not Listed Here?",
            sideText: "Our creative consultants are standing by to discuss your manuscript, offer advice, and help bring your vision to life.",
            sideCta: "Talk to Our Team",
        },
        relatedCopy: {
            eyebrow: "More Creative Solutions",
            heading: "Elevate Your Story with These Popular Add-Ons!",
            viewAll: "Explore All Services",
            cards: {
                "children-s-book-writing-story-development": { title: "Creative Writing & Narrative Crafting", text: "Turning raw ideas into captivating, heart-pounding adventures kids will adore." },
                "children-s-book-editing-manuscript-review": { title: "Professional Editing & Story Polishing", text: "Refining tone, pace, and grammar to make every page shine." },
                "children-s-book-formatting-ebook-conversion": { title: "Print Layout & Digital eBook Formatting", text: "Designing pixel-perfect page layouts ready for print and e-readers." },
                "children-s-book-publishing-isbn-services": { title: "Official ISBN Setup & Publishing Registration", text: "Toon Haus Publishing handles copyrighting, ISBN assignment, and legal registration." },
                "children-s-book-distribution-global-publishing": { title: "Global Bookstore & Library Distribution", text: "Reach readers worldwide on Amazon, IngramSpark, and international retailers." },
            },
        },
    },
    "illustration-book-design": {
        heroBg: HERO_BG,
        aboutImage: ABOUT_IMG,
        aboutHeading: "Pictures that make young readers stay.",
        about: "In a children's book the pictures tell half the story. Our illustrators and designers create characters, scenes and layouts that feel warm, consistent and right for your readers' age, then prepare everything for print and digital.",
        processHeading: "Our Illustration Process",
        process: [
            { title: "Creative Brief", text: "We gather your story, references, age group and style preferences.", icon: Lightbulb },
            { title: "Sketches", text: "You review rough sketches and layouts before any colour is added.", icon: PencilRuler },
            { title: "Colour & Detail", text: "Approved sketches are brought to life with colour, texture and detail.", icon: Palette },
            { title: "Final Files", text: "You receive print-ready and eBook-ready files in every format you need.", icon: FileCheck2 },
        ],
        faqs: [
            { q: "Can I choose the illustration style?", a: "Yes. We share style samples first, and you pick the look that fits your story best." },
            { q: "How many revisions do I get?", a: "Revisions are included at the sketch stage and the colour stage, so changes are easy and inexpensive." },
            { q: "Will my characters look the same on every page?", a: "Yes. We build a character sheet first and follow it on every page to keep characters consistent." },
            { q: "Do I own the illustrations?", a: "Once the project is paid, the full rights to the artwork are transferred to you." },
            { q: "Can you work from my own sketches?", a: "Of course. We are happy to start from your sketches, photos or even a simple description." },
        ],
    },
    "animation-interactive-content": {
        heroBg: HERO_BG,
        aboutImage: ABOUT_IMG,
        aboutHeading: "Let your story move, talk and play.",
        about: "Children love stories that move. We turn your book into trailers, animations, audiobooks and interactive eBooks, so the same story can reach readers on screens, speakers and social feeds as well as on paper.",
        processHeading: "How We Animate Your Story",
        process: [
            { title: "Script & Storyboard", text: "We plan every scene so you can see the story before animation starts.", icon: Clapperboard },
            { title: "Style & Voice", text: "We match the look of your book and cast voices that suit your characters.", icon: Mic },
            { title: "Animation", text: "Scenes are animated, timed to sound and shared with you for feedback.", icon: Wand2 },
            { title: "Delivery", text: "You get files sized for YouTube, social media, your website and stores.", icon: Send },
        ],
        faqs: [
            { q: "Can you animate my existing illustrations?", a: "Yes. We can bring your current artwork to life, or create new art made for animation." },
            { q: "How long is a typical book trailer?", a: "Most trailers are 30 to 90 seconds, which is ideal for social media and store pages." },
            { q: "Do you provide voice actors?", a: "Yes. We have voice artists for narration and character voices in a range of accents and ages." },
            { q: "Which formats will I receive?", a: "You receive files ready for YouTube, Instagram, TikTok, Facebook and your website." },
            { q: "Can one book become several products?", a: "Yes. A single book can become an eBook, an audiobook, a trailer, a YouTube story and short character clips." },
        ],
    },
    "children-s-book-marketing-promotion": {
        heroBg: HERO_BG,
        aboutImage: ABOUT_IMG,
        aboutHeading: "Help the right families find your book.",
        about: "A great book still needs to be found. Our marketing team builds campaigns that reach parents, teachers, librarians and young readers where they already are, online and in their communities.",
        processHeading: "Our Marketing Process",
        process: [
            { title: "Audit & Research", text: "We study your book, your readers and the competition in your category.", icon: Search },
            { title: "Strategy", text: "You get a clear plan with channels, timelines and goals.", icon: Target },
            { title: "Campaign", text: "We run the campaign and adjust it as results come in.", icon: Sparkles },
            { title: "Report & Grow", text: "Regular reports show what is working and where to grow next.", icon: LineChart },
        ],
        faqs: [
            { q: "Can you guarantee sales?", a: "No honest agency can guarantee sales, but we focus on proven tactics and share clear results so you can see progress." },
            { q: "When should marketing start?", a: "Ideally six to eight weeks before launch, but we can also help books that are already published." },
            { q: "Which platforms do you work with?", a: "Amazon, Instagram, Facebook, TikTok, YouTube, email, and outreach to schools, libraries and bookstores." },
            { q: "Do I need a big budget?", a: "No. We build plans for different budgets and focus spending where it will make the biggest difference." },
            { q: "Will I get reports?", a: "Yes. You receive regular, easy-to-read reports on reach, reviews and sales signals." },
        ],
    },
    "author-character-branding": {
        heroBg: HERO_BG,
        aboutImage: ABOUT_IMG,
        aboutHeading: "Turn your characters into a brand.",
        about: "The best-loved children's characters live beyond the page. We help authors build a recognisable brand for themselves and their characters, with logos, activities, merchandise and content that keep families coming back.",
        processHeading: "Our Branding Process",
        process: [
            { title: "Discovery", text: "We explore your story, your audience and what makes your characters special.", icon: Lightbulb },
            { title: "Concepts", text: "We present brand concepts, logos and product ideas for you to choose from.", icon: Brush },
            { title: "Refine", text: "Your favourite direction is polished until it feels exactly right.", icon: PencilRuler },
            { title: "Brand Kit", text: "You receive a complete kit with files, colours and usage guidelines.", icon: FileCheck2 },
        ],
        faqs: [
            { q: "Why should a children's author build a brand?", a: "A strong brand makes your books easier to recognise, helps readers find your next title and opens doors to merchandise and licensing." },
            { q: "Can you design merchandise for my character?", a: "Yes. We design products such as plush toys, T-shirts, stickers and prints, ready for manufacturers." },
            { q: "Do I own the brand assets?", a: "Yes. All logos, artwork and files are yours once the project is complete." },
            { q: "Can you make printable activities for my website?", a: "Yes. Colouring pages, worksheets and activity sheets are a great way to grow your email list." },
            { q: "Can you help me prepare for licensing?", a: "We create the style guides and character sheets that licensing partners expect to see." },
        ],
    },
};

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
    "children-s-book-writing-story-development": {
        summary: "From a spark of an idea to a finished manuscript, we shape and write children's stories with lovable characters, a clear message and words that sound wonderful read aloud.",
        points: ["Story & Character Building", "Ghostwriting In Your Voice"],
        about: {
            eyebrow: "Story Crafting & Narrative Design",
            heading: "Crafting Masterpieces That Captivate Young Minds!",
            paragraphs: [
                "Every unforgettable children's story starts with a simple dream. At Toon Haus Publishing, we take your initial concept and mold it into a vibrant, structured narrative filled with delightful characters and memorable lessons that sound fantastic when read aloud.",
                "Our expert wordsmiths and publishing strategists team up with you at every step, ensuring your unique voice shines through while we perfect the rhythm, structure, and literary polish needed to stand out in stores worldwide.",
            ],
            points: [
                "Dynamic Character Creation & Engaging Plot Arcs",
                "Authentic Ghostwriting Tailored Entirely to Your Vision",
            ],
            cta: "Start Your Story Today",
        },
        includes: {
            eyebrow: "Package Breakdown",
            heading: "The Complete Toolkit for Your Bestselling Story!",
            items: [
                {
                    title: "Concept-to-Plot Architecture",
                    text: "We transform your sparks of inspiration into tightly structured narratives complete with relatable heroes, captivating plot twists, and meaningful morals young readers cherish.",
                },
                {
                    title: "Pro Children's Ghostwriting",
                    text: "Our seasoned children's authors craft rhythmic, age-appropriate prose that mirrors your unique tone while keeping kids completely engaged page after page.",
                },
            ],
        },
    },
    "children-s-book-editing-manuscript-review": {
        summary: "Expert editing at every level, from big-picture story structure to the final comma, so your manuscript is clear, polished and right for its young readers.",
        points: ["Structural & Line Editing", "Proofreading & Assessment"],
        hero: {
            eyebrow: "Professional Editing & Manuscript Review",
            title: "Polish Your Story into a Flawless Bestseller!",
            description: "From perfecting overall plot flow to fine-tuning rhythm and word choices, Toon Haus Publishing ensures your manuscript reads flawlessly, connects deeply, and holds young minds spellbound.",
            cta: "Get Your Free Estimate",
        },
        about: {
            eyebrow: "Professional Story Polishing & Manuscript Review",
            heading: "Elevate Your Manuscript from Good to Unforgettable!",
            paragraphs: [
                "Comprehensive editorial support tailored specifically for children's literature. At Toon Haus Publishing, we analyze story flow, pacing, tone, and sentence structure to guarantee your manuscript resonates effortlessly with young readers.",
                "Our experienced literary editors collaborate closely with you through every phase, refining the fine details while safeguarding your unique author voice so your book is print-ready for global markets.",
            ],
            points: [
                "Deep Structural Analysis & Rhythmic Line Editing",
                "Comprehensive Proofreading & Developmental Feedback",
            ],
            cta: "Schedule a Review Today",
        },
        includes: {
            eyebrow: "Editorial Package Inclusions",
            heading: "Complete Editorial Precision for Your Masterpiece!",
            items: [
                {
                    title: "Story Arc & Structural Development",
                    text: "High-level creative editing that sharpens plot points, enhances character depth, and optimizes storytelling pace from opening line to final page.",
                },
                {
                    title: "Rhythmic Line & Tone Polishing",
                    text: "Detailed phrase-by-phrase enhancements to ensure read-aloud fluency, ideal vocabulary level, and vibrant story cadence.",
                },
                {
                    title: "Flawless Copyediting & Proofreading",
                    text: "Meticulous review for grammar perfection, spelling precision, punctuation, and publishing-grade consistency throughout.",
                },
                {
                    title: "Comprehensive Manuscript Evaluation",
                    text: "An in-depth professional critique offering constructive insights, highlighted strengths, and clear actionable steps for story improvement.",
                },
            ],
        },
    },
    "children-s-book-formatting-ebook-conversion": {
        summary: "Clean, professional layouts for print and beautiful eBooks that look right on Kindle, Apple Books, Kobo and every tablet.",
        points: ["Print Interior Formatting", "Fixed & Reflowable eBooks"],
        hero: {
            eyebrow: "Print & Digital Book Formatting",
            title: "Flawless Print & Pixel-Perfect Digital Book Formatting!",
            description: "Toon Haus Publishing crafts crisp, high-resolution interior layouts for physical publishing and converts your masterpiece into dynamic eBooks optimized for Kindle, iPad, Kobo, and all major digital devices.",
            cta: "Request Your Free Quote",
        },
        includes: {
            eyebrow: "Layout & Conversion Package",
            heading: "Seamless Layouts Built for Perfection on Any Screen!",
            items: [
                {
                    title: "Print-Ready Interior Typesetting",
                    text: "Precision layout design for physical books—balancing typography, margins, and artwork placement so every page spread looks elegant and easy to read.",
                },
                {
                    title: "Universal eBook Formatting & Optimization",
                    text: "Expert conversion into reflowable and fixed-layout digital formats, ensuring vivid colors and flawless page alignment across Kindle, Apple Books, Kobo, and tablets.",
                },
            ],
        },
    },
    "children-s-book-publishing-isbn-services": {
        summary: "We publish your book in paperback and hardcover, handle ISBNs and copyright, and launch it on Amazon KDP so it is ready for readers everywhere.",
        points: ["Paperback, Hardcover & KDP", "ISBN & Copyright Handled"],
        hero: {
            eyebrow: "ISBN Registration & Book Publishing",
            title: "Official ISBN Registration & Global Print Publishing!",
            description: "Toon Haus Publishing handles every technical detail—from assigning official ISBN barcodes and securing full copyright protection to launching your paperback and hardcover editions across Amazon KDP and worldwide retail networks.",
            cta: "Get Started Today",
        },
        about: {
            eyebrow: "Print Publishing & Global ISBN Management",
            heading: "Your Complete Launchpad to Official Book Publishing!",
            paragraphs: [
                "Take the guesswork out of publishing! At Toon Haus Publishing, we manage every technical detail required to bring your book to life—formatting for beautiful paperback and hardcover prints while seamlessly publishing directly on Amazon KDP and global platforms.",
                "Our expert publishing strategists take care of full legal documentation, official ISBN assignments, and metadata setup, letting you stay focused on celebrating your author journey while we handle the heavy lifting.",
            ],
            points: [
                "Multi-Format Distribution Across Paperback, Hardcover & Amazon KDP",
                "Official ISBN Assignment, Barcodes & Full Copyright Filings",
            ],
            cta: "Publish Your Book Now",
        },
        includes: {
            eyebrow: "Publishing Package Breakdown",
            heading: "Complete End-to-End Publishing & Distribution Suite!",
            items: [
                {
                    title: "High-Quality Softcover Production",
                    text: "Professional paperback printing featuring custom trim dimensions, premium paper stock choices, and sleek matte or gloss cover finishes built for store shelves.",
                },
                {
                    title: "Premium Case-Laminated Hardcover Edition",
                    text: "Durable, gift-worthy hardcover printing engineered specifically for collectors, school systems, public libraries, and young readers.",
                },
                {
                    title: "Official ISBN & Barcode Registration",
                    text: "Distinct ISBN number acquisition for each edition format, giving major booksellers and library networks seamless cataloging and ordering ability.",
                },
                {
                    title: "Intellectual Property & Copyright Setup",
                    text: "Complete legal guidance and filing support to lock in official ownership of your manuscript text and original story artwork right from day one.",
                },
                {
                    title: "Optimized Amazon KDP Launch",
                    text: "Full setup on Amazon Kindle Direct Publishing—including search-optimized book descriptions, accurate category targeting, and error-free file approvals.",
                },
            ],
        },
    },
    "children-s-book-distribution-global-publishing": {
        summary: "Reach bookstores, libraries and online shops worldwide through IngramSpark, Barnes & Noble, Apple Books, Kobo and more, all from a single setup.",
        points: ["Bookstore & Library Access", "40+ Countries Reached"],
        hero: {
            eyebrow: "Global Book Distribution & Publishing",
            title: "Expand Your Reach to Global Bookshelves & Digital Retailers!",
            description: "Toon Haus Publishing connects your book directly with major international retailers, independent store networks, school libraries, and digital platforms like IngramSpark, Barnes & Noble, Apple Books, and Kobo—all through one seamless publishing setup.",
            cta: "Claim Your Free Estimate",
        },
        about: {
            eyebrow: "Worldwide Distribution & Global Retail",
            heading: "Seamless Access to International Retailers & Libraries!",
            paragraphs: [
                "Unlock limitless global reach for your children's book! Toon Haus Publishing establishes direct distribution pathways to leading retail chains, local independent bookshops, educational institutions, and top digital storefronts across the globe.",
                "Our experienced distribution strategists manage every technical detail of catalog placement, logistics, and order fulfillment—giving you complete peace of mind while your book reaches young readers around the world.",
            ],
            points: [
                "Direct Access to Major Retail Networks & Public Libraries",
                "Global Reach Across 40+ International Markets",
            ],
            cta: "Expand Your Reach Today",
        },
        includes: {
            eyebrow: "Distribution Package Breakdown",
            heading: "Complete Global Reach Across Every Major Bookstore & Platform!",
            items: [
                {
                    title: "IngramSpark Worldwide Catalog Integration",
                    text: "Connect seamlessly with global retail networks, educational institutions, and public library systems through IngramSpark's extensive worldwide distribution catalog.",
                },
                {
                    title: "Barnes & Noble Press Publishing",
                    text: "Establish a dedicated presence on Barnes & Noble Press, making it effortless for readers to discover, purchase online, or order directly in-store.",
                },
                {
                    title: "Apple Books & Kobo Digital Expansion",
                    text: "Deliver stunning digital editions to Apple Books and Kobo storefronts, capturing mobile and e-reader audiences across dozens of countries.",
                },
                {
                    title: "Comprehensive International Retail Network",
                    text: "Unlock cross-border sales channels, putting your masterpiece on physical and digital shelves in over 40 countries through a single streamlined setup.",
                },
            ],
        },
    },
    "children-s-book-illustration-services": {
        summary: "Full-colour illustrations in the style that suits your story, from soft watercolour and playful cartoons to rich 3D scenes and immersive double-page spreads.",
        points: ["2D, 3D & Watercolour Styles", "Full Pages & Spreads"],
        hero: {
            eyebrow: "Visual Storytelling & Creative Artwork",
            title: "Breathe Magical Life Into Your Manuscript with Custom Artwork!",
            description: "Toon Haus Publishing pairs your unique story with vibrant, full-color artwork tailored precisely to your vision—ranging from delicate watercolors and whimsical character sketches to high-definition 3D renders and panoramic double-page spreads.",
            cta: "Claim Your Free Art Estimate",
        },
        about: {
            eyebrow: "Custom Illustration Services",
            heading: "Visual Storytelling That Keeps Young Minds Completely Spellbound!",
            paragraphs: [
                "Toon Haus Publishing delivers custom, full-color artwork across a variety of artistic mediums designed to match your story's exact mood—from delicate watercolors and whimsical cartoons to immersive 3D digital environments and sweeping double-page spreads.",
                "In memorable children's books, the visuals carry half the magic. Our expert illustrators and design team build expressive characters, rich landscapes, and age-tailored layouts that feel warm and consistent from cover to cover, while optimizing all files for both print and digital release.",
            ],
            points: [
                "Versatile 2D, 3D, Vector & Watercolor Artwork Styles",
                "Single-Page Illustrations & Immersive Two-Page Spreads",
            ],
            cta: "Start Your Illustration Project",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Complete Illustration Solutions Tailored to Your Story’s Vision!",
            items: [
                {
                    title: "2D Digital Artwork",
                    text: "Vibrant, highly expressive 2D artwork designed to reflect your narrative's exact tone and connect deeply with your target age group.",
                },
                {
                    title: "3D Animated Renderings",
                    text: "Rich, multi-dimensional artwork featuring realistic depth and dynamic lighting that gives your book a cutting-edge, cinematic look.",
                },
                {
                    title: "Whimsical Watercolor Art",
                    text: "Soft, dreamlike watercolor designs that lend a classic, gentle atmosphere perfect for bedtime tales and heartfelt picture books.",
                },
                {
                    title: "Playful Cartoon Designs",
                    text: "Lively, character-driven cartoons brimming with charm, humor, and high energy that keep young readers eager for the next page.",
                },
                {
                    title: "Learning & Classroom Art",
                    text: "Crisp, inviting visual graphics that make complex concepts easy to understand, making them ideal for school curricula and learning books.",
                },
                {
                    title: "Single Full-Page Spreads",
                    text: "Richly detailed, full-bleed artwork that gives key storyline moments plenty of visual breathing room to truly shine.",
                },
                {
                    title: "Panoramic Two-Page Spreads",
                    text: "Expansive, highly immersive two-page illustrations crafted specifically for the most grand and pivotal scenes in your book.",
                },
            ],
        },
        process: {
            heading: "Our Seamless Step-by-Step Illustration Workflow!",
            description: "Every project follows a transparent, stress-free creative roadmap so you always know exactly what to expect at every phase.",
            steps: [
                {
                    title: "Story Discovery & Style Direction",
                    text: "We collect your manuscript, visual references, target age category, and artistic preferences to map out the perfect visual direction.",
                },
                {
                    title: "Storyboarding & Line Art",
                    text: "You review preliminary concept sketches and page layouts to refine composition and character design before any color is applied.",
                },
                {
                    title: "Vibrant Color & Final Detailing",
                    text: "Once line art is approved, our illustrators infuse rich colors, textures, depth, and lighting to bring every scene vibrantly to life.",
                },
                {
                    title: "High-Resolution Master File Delivery",
                    text: "You receive fully formatted, print-ready, and eBook-optimized high-resolution files in every required file extension for seamless publication.",
                },
            ],
        },
        related: {
            eyebrow: "More in Illustration & Book Design",
            heading: "Explore Complementary Visual & Design Services!",
            viewAll: "View All Services",
            cards: {
                "book-cover-interior-design": {
                    title: "Eye-Catching Cover & Page Formatting",
                    text: "Combine striking front-cover artwork with beautifully typography-matched interior page layouts tailored for young readers.",
                },
                "print-ready-ebook-design-files": {
                    title: "Publication-Ready Digital & Print Assets",
                    text: "Receive perfectly formatted PDF files for print on demand along with reflowable or fixed-layout EPUB files for Amazon KDP and Kindle.",
                },
                "character-design-development": {
                    title: "Custom Character Concept & Development",
                    text: "Craft iconic, expressive personalities and turnaround sheets that make your story's main heroes instantly memorable.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Clear answers to the most common questions authors ask about our children's book illustration process.",
            sideHeading: "Have More Questions About Illustration?",
            sideText: "Need specific guidance for your book project? Our illustration specialists are here to guide you through style choices, page layouts, and pricing.",
            sideCta: "Talk to Our Art Team Now",
            items: [
                {
                    q: "Can I select the exact illustration style for my children's book?",
                    a: "Absolutely! We present a curated portfolio of artistic styles—from 2D digital vector art and whimsical watercolors to vibrant cartoon renders and 3D scenes. You choose the exact aesthetic that matches your story's tone before drawing begins.",
                },
                {
                    q: "How many revisions or art adjustments are included?",
                    a: "We provide iterative revision rounds at every stage of the artwork process. You will review and approve initial concept sketches and line layouts before any color is applied, ensuring complete creative alignment every step of the way.",
                },
                {
                    q: "Will my main characters look completely consistent across every page?",
                    a: "Yes! We design detailed character turnaround sheets and reference guides upfront. This guarantees that every character's facial features, expressions, proportions, and outfits remain 100% uniform throughout your entire book.",
                },
                {
                    q: "Do I own the full copyright to all created illustrations?",
                    a: "Yes, 100%! Upon final project completion and delivery, full commercial rights and artwork ownership belong entirely to you. You retain complete freedom to print, publish, adapt, and sell your book worldwide without royalty fees.",
                },
                {
                    q: "Can your illustrators bring my own rough sketches or character ideas to life?",
                    a: "Definitely! Whether you have pencil doodles, stick figure wireframes, mood boards, or simple written character descriptions, our professional illustrators will refine your concepts into high-resolution, publication-ready artwork.",
                },
            ],
        },
    },
    "character-design-development": {
        summary: "Lovable characters with distinct personalities, kept perfectly consistent on every page, with careful revisions until they feel exactly right.",
        points: ["Character Reference Sheets", "Consistent On Every Page"],
        hero: {
            eyebrow: "Visual Storytelling & Illustration Services",
            title: "Create Unforgettable Characters That Children Will Cherish Forever!",
            description: "Toon Haus Publishing crafts distinct, emotionally expressive characters tailored precisely to your story's personality—ensuring complete visual consistency across every single page with dedicated refinement rounds until your vision comes to life.",
            cta: "Claim Your Free Character Estimate",
        },
        about: {
            eyebrow: "Character Design & Development",
            heading: "Visual Character Creation That Keeps Young Readers Hooked!",
            paragraphs: [
                "At Toon Haus Publishing, we turn your story ideas into vibrant, endearing characters bursting with unique personality Through careful concept development and dedicated feedback rounds, we refine every facial expression, costume, and color palette until your characters feel 100% authentic to your story.",
                "Characters carry the heart of every great children's book. Our illustrators craft detailed character turnaround sheets and reference guides to guarantee complete visual continuity across every scene, preparing all artwork flawlessly for print and digital publishing.",
            ],
            points: [
                "Turnaround & Expression Reference Sheets",
                "100% Character Consistency Across Every Page",
            ],
            cta: "Build Your Characters Today",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Comprehensive Character Design Solutions for Children’s Authors!",
            items: [
                {
                    title: "Original Character Concepts",
                    text: "Develop charming, relatable characters endowed with unique personalities, lively facial expressions, and dynamic poses that stick with young readers long after reading.",
                },
                {
                    title: "Page-to-Page Visual Uniformity",
                    text: "Maintain perfect facial and proportions consistency across every scene, sequel, and promotional release using detailed turnaround reference guides.",
                },
                {
                    title: "Dedicated Revision Rounds",
                    text: "Fine-tune details, clothing, and expressions through careful design updates that enhance your character while maintaining cohesive artistic style.",
                },
            ],
        },
        process: {
            heading: "Our Seamless Step-by-Step Character Creation Workflow!",
            description: "Every project follows a structured, collaborative workflow so you always have full creative clarity on what comes next.",
            steps: [
                {
                    title: "Story & Character Discovery",
                    text: "We gather your manuscript, character personalities, reference inspiration, age group focus, and preferred artistic styles.",
                },
                {
                    title: "Concept Drafting & Line Art",
                    text: "You review initial pencil sketches, expressions, and character turnarounds to confirm proportions before coloring.",
                },
                {
                    title: "Vibrant Color & Texturing",
                    text: "Approved character sketches are transformed with rich color palettes, fine textures, lighting, and distinct visual personality.",
                },
                {
                    title: "High-Res File Package Delivery",
                    text: "Receive fully formatted, print-ready, and digital vector files in every file format required for your book publication.",
                },
            ],
        },
        related: {
            eyebrow: "More in Illustration & Book Design",
            heading: "Discover More Creative Design Services for Your Book!",
            viewAll: "View All Services",
            cards: {
                "children-s-book-illustration-services": {
                    title: "Full-Color Storybook Artwork",
                    text: "Bring every scene to life with bespoke, full-page artwork and double-page spreads in styles ranging from soft watercolors to vibrant 3D.",
                },
                "book-cover-interior-design": {
                    title: "Custom Cover & Layout Formatting",
                    text: "Pair your visual characters with stunning front-cover typography and child-friendly interior page layouts.",
                },
                "print-ready-ebook-design-files": {
                    title: "Digital & Print Publication Master Files",
                    text: "Get fully validated PDF and EPUB files tailored specifically for Amazon KDP, IngramSpark, and digital e-readers.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Everything you need to know about creating, modeling, and perfecting your book’s characters.",
            sideHeading: "Need Custom Character Advice?",
            sideText: "Have questions about character turnarounds or artwork styles? Our creative team is here to help you bring your story’s stars to life.",
            sideCta: "Talk to Our Art Team Today",
            items: [
                {
                    q: "How do I select the right artistic style for my characters?",
                    a: "We share custom style samples—ranging from 2D vector and cartoon sketches to 3D and watercolor renders —so you can pick the exact visual look that best reflects your story’s target audience and personality.",
                },
                {
                    q: "How many design revisions are included for character concepts?",
                    a: "We include dedicated feedback rounds at the initial line-art and pose stage. You can request adjustments to facial expressions, outfits, hair, or proportions before we move to full coloring.",
                },
                {
                    q: "How do you ensure characters stay identical on every single page?",
                    a: "We build detailed character turnaround sheets and style guides that record exact colors, proportions, and facial profiles. Our illustrators use these sheets across every page to guarantee complete visual continuity throughout your book and future sequels.",
                },
                {
                    q: "Do I retain full rights to the character designs?",
                    a: "Yes, 100%! Upon completion, full copyright ownership of all character artwork, turnaround sheets, and assets belongs entirely to you. You are free to use them across books, merchandise, or adaptations with no ongoing royalties.",
                },
                {
                    q: "Can you turn my rough doodles or photo ideas into professionally designed characters?",
                    a: "Definitely! Whether you have pencil sketches, photo inspiration, or written character descriptions, our illustrators will translate your ideas into fully rendered, publication-ready characters.",
                },
            ],
        },
    },
    "book-cover-interior-design": {
        summary: "A cover that stands out on the shelf, interior layouts that balance pictures and text, and child-friendly typography that makes every page easy to enjoy.",
        points: ["Full Wrap Cover Design", "Layout & Typography"],
        hero: {
            eyebrow: "Illustration & Book Design",
            title: "Give Your Manuscript the Captivating Front Cover It Deserves!",
            description: "Your cover is your book's primary marketing tool. At Toon Haus Publishing, we craft eye-catching, professionally formatted covers engineered to jump off physical bookstore shelves and shine brilliantly as digital e-reader thumbnails.",
            cta: "Claim Your Cover Design Quote",
        },
        about: {
            eyebrow: "Book Cover Design Services",
            heading: "Visual Cover Art That Demands Attention on Every Shelf & Store!",
            paragraphs: [
                "Parents, kids, and avid readers absolutely judge a book by its cover. At Toon Haus Publishing, our cover artists blend striking focal imagery with bold typography to convey your story's exact genre, energy, and mood in a single glance. Every design is custom-built from scratch around your specific characters, color themes, and title.",
                "We construct complete full-wrap print covers—front, spine, and back layout—calculated precisely with exact trim sizes, bleed dimensions, and barcode placement for Amazon KDP, IngramSpark, and global print-on-demand networks. Every order also includes an optimized digital front cover tailored for e-reader marketplaces.",
            ],
            points: [
                "Full Wrap-Around Print File (Front, Spine & Back Cover)",
                "High-Resolution eBook Cover Included Free with Every Order",
            ],
            cta: "Start Your Cover Design",
        },
        why: {
            eyebrow: "Why Authors Choose Toon Haus",
            heading: "Your Book Journey, Nurtured with Excellence & Passion at Every Step!",
            items: [
                {
                    title: "Over 10 Years of Creative Excellence",
                    text: "A decade-plus dedicated exclusively to crafting, illustrating, and publishing standout children's literature.",
                },
                {
                    title: "A Complete Creative Studio Experience",
                    text: "From illustration and cover design to global distribution and author branding, everything happens under one roof.",
                },
                {
                    title: "From First Sketch to Published Masterpiece",
                    text: "A single, dedicated creative team guiding your project smoothly from rough initial concepts to final distribution.",
                },
                {
                    title: "Worldwide Partnership & Remote Support",
                    text: "Seamless, flexible remote collaboration designed to support authors seamlessly across every time zone.",
                },
            ],
        },
        process: {
            heading: "Our Seamless 4-Step Cover Design Process!",
            description: "Four straightforward creative phases taking you from initial concept to publication-ready master files, keeping you informed and involved every step of the way.",
            steps: [
                {
                    title: "Cover Strategy & Briefing",
                    text: "Share your manuscript details, target readers, genre expectations, and visual inspirations so our design team captures your exact aesthetic direction.",
                },
                {
                    title: "Concept Drafting & Layouts",
                    text: "We craft unique cover design variations featuring custom color palettes, imagery, and typography layouts for you to select your ideal match.",
                },
                {
                    title: "Polish & Typography Adjustment",
                    text: "We incorporate your direct feedback to fine-tune title placement, back-cover blurb formatting, spine thickness, and visual contrast until perfection.",
                },
                {
                    title: "Publication-Ready File Delivery",
                    text: "Receive fully verified, high-resolution print PDFs and eBook cover files pre-formatted specifically for Amazon KDP, IngramSpark, or your platform of choice.",
                },
            ],
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Clear answers to the questions authors ask most about our book cover design process.",
            sideHeading: "Have Additional Questions About Cover Design?",
            sideText: "We're here to help guide you through every detail! Send our team a message and a Toon Haus Publishing specialist will get back to you within one business day.",
            sideCta: "Reach Out to Our Team",
            items: [
                {
                    q: "What is the typical turnaround time for a custom book cover?",
                    a: "Our standard design process takes between 7 to 14 business days from your initial briefing to final master file delivery. Timelines vary slightly depending on project complexity and how swiftly feedback rounds are completed.",
                },
                {
                    q: "How many cover concepts will I get to choose from?",
                    a: "We present initial unique cover layout concepts tailored to your story’s theme and target audience. You pick your favorite direction, which we then refine and polish to perfection based on your direct feedback.",
                },
                {
                    q: "Do you provide full wrap-around print covers including the spine and back cover?",
                    a: "Yes! We design complete full-wrap jacket layouts featuring front cover art, spine calculation, back cover blurb typography, author bio placement, and barcode integration formatted specifically for Amazon KDP and IngramSpark.",
                },
                {
                    q: "Which final file formats will I receive upon completion?",
                    a: "You receive print-ready, high-resolution CMYK PDF files pre-formatted with exact bleed dimensions for physical printing, as well as digital RGB JPG/PNG files optimized for eBook listing thumbnails.",
                },
                {
                    q: "Can the cover art be designed to match my book's interior illustrations?",
                    a: "Absolutely! Our design team works seamlessly with your book’s existing interior artwork and character reference sheets to ensure 100% visual consistency between your cover and inside pages.",
                },
            ],
        },
    },
    "print-ready-ebook-design-files": {
        summary: "Final files prepared exactly to printer and store specifications, with correct bleed, colour and resolution for print and sharp, light files for screens.",
        points: ["Printer-Approved Files", "Screen-Optimised eBooks"],
        hero: {
            eyebrow: "Illustration & Book Design Services",
            title: "Flawless Print & Digital eBook Files Tailored for Instant Upload!",
            description: "Toon Haus Publishing crafts fully validated, high-resolution master assets engineered to satisfy precise publisher guidelines—featuring exact bleed margins, CMYK color profiles, and razor-sharp digital optimization for seamless physical printing and crystal-clear e-reading.",
            cta: "Claim Your File Formatting Quote",
        },
        about: {
            eyebrow: "Print-ready & eBook Design Files",
            heading: "Flawless Print & Digital Formatting Built for Industry Acceptance!",
            paragraphs: [
                "Navigating technical publishing requirements shouldn't hold back your story. At Toon Haus Publishing, we meticulously format your interior pages and artwork to adhere strictly to top commercial printer guidelines. From precise bleed setups and trim alignment to true CMYK color profiles, we ensure your printed book looks stunning straight off the press.",
                "We also optimize your files for all digital platforms, creating crisp, fast-loading fixed-layout or reflowable eBooks tailored for Kindle, Apple Books, and global e-readers. Every asset undergoes rigorous quality checks to guarantee seamless approval across major print-on-demand networks.",
            ],
            points: [
                "100% Publisher & Printer-Approved Master Files",
                "Screen-Optimized eBooks for Kindle & Digital Readers",
            ],
            cta: "Format Your Book Files Today",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Complete Master File Preparation for Print & Digital Success!",
            items: [
                {
                    title: "Press-Ready Print Deliverables",
                    text: "Precision-engineered interior and cover files calibrated to exact print-house specs—featuring proper bleed areas, 300+ DPI resolution, and verified CMYK color profiles for flawless physical production.",
                },
                {
                    title: "Digital & e-Reader Assets",
                    text: "High-definition, lightweight eBook files customized for mobile, tablet, and e-reader devices—delivering crisp text, vibrant RGB artwork, and quick loading times on all major digital platforms.",
                },
            ],
        },
        process: {
            heading: "Our Flawless 4-Step File Formatting Workflow!",
            description: "Our technical formatting process ensures every print margin, digital asset, and color space is meticulously validated before release.",
            steps: [
                {
                    title: "Publishing Specifications Assessment",
                    text: "We analyze your manuscript and artwork against target printer guidelines (such as KDP, IngramSpark, or offset presses) to define trim sizes, bleed requirements, and target resolution.",
                },
                {
                    title: "Precision Pre-Press Formatting",
                    text: "We build and adjust page layouts, set strict print margins, fix gutter allowances, and verify page counts to prevent any print registration errors.",
                },
                {
                    title: "Color Calibration & eBook Conversion",
                    text: "We convert print files to CMYK color profiles for rich physical press output while rendering light, high-definition RGB files for digital e-readers.",
                },
                {
                    title: "Master Asset Delivery",
                    text: "You receive fully validated, upload-ready interior PDFs and fixed/reflowable eBook packages built for instant publishing approval.",
                },
            ],
        },
        related: {
            eyebrow: "More in Illustration & Book Design",
            heading: "Discover All the Ways We Can Help Your Story Shine!",
            viewAll: "View All Services",
            cards: {
                "children-s-book-illustration-services": {
                    title: "Bespoke Storybook Illustrations",
                    text: "Immersive full-page and double-page artwork designed to captivate young minds and bring every chapter to vibrant life.",
                },
                "character-design-development": {
                    title: "Iconic Character Creation",
                    text: "Memorable characters featuring distinct personalities and comprehensive turnaround sheets for perfect page-to-page visual consistency.",
                },
                "book-cover-interior-design": {
                    title: "Stunning Covers & Layouts",
                    text: "Eye-catching front, spine, and back wraps paired with clean, professional interior page formatting that readers love.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Technical answers to the questions authors ask most about our print-ready and digital eBook file preparation.",
            sideHeading: "Have Technical File Questions?",
            sideText: "Confused about bleed settings or upload dimensions? Our publishing support specialists are here to ensure your files pass inspection effortlessly.",
            sideCta: "Talk to Our File Experts",
            items: [
                {
                    q: "What exact format are the final print-ready files delivered in?",
                    a: "We deliver high-resolution PDF files configured with precise trim dimensions, 300+ DPI resolution, proper bleed margins, and verified CMYK color profiles tailored specifically for commercial printers like Amazon KDP and IngramSpark.",
                },
                {
                    q: "How are eBook files optimized for digital e-readers?",
                    a: "We create lightweight, high-definition digital files (including reflowable or fixed-layout formats) engineered to display crisp text and vibrant RGB artwork seamlessly across Kindle, Apple Books, and mobile tablets.",
                },
                {
                    q: "What happens if my uploaded files are rejected by a publishing platform?",
                    a: "Our formatting undergoes rigorous pre-press checks to prevent errors. If any technical margin or spine discrepancy ever occurs during your platform upload, our team promptly adjusts and re-validates the files until full approval is secured.",
                },
                {
                    q: "Do hardbacks, paperbacks, and eBooks require completely different master files?",
                    a: "Yes, each edition requires distinct spine calculations, cover wraps, and interior margins. We build and supply customized, perfectly configured master packages for every separate format you intend to publish.",
                },
                {
                    q: "Will my interior layout and chapter headings match my book cover style?",
                    a: "Absolutely! We coordinate fonts, typography sizing, and decorative elements to ensure total visual consistency between your exterior cover jacket and your interior page layouts.",
                },
            ],
        },
    },
    "2d-3d-animation-services": {
        summary: "Bring your book to life with 2D and 3D animation, from character motion and animated illustrations to full storybook and educational animations.",
        points: ["2D & 3D Animation", "Storybook & Educational"],
        hero: {
            eyebrow: "Animation & Interactive Content",
            title: "Transform Your Story Into Immersive 2D & 3D Motion Pictures!",
            description: "Elevate your book with dynamic motion graphics and stunning visual effects—ranging from animated character expressions and interactive illustrations to fully realized storybook and educational video content.",
            cta: "Claim Your Animation Quote",
        },
        process: {
            heading: "Our Streamlined 4-Step Animation Workflow!",
            description: "Every motion project follows an open, collaborative process designed to keep you inspired, informed, and involved at every single stage.",
            steps: [
                {
                    title: "Script & Storyboard Blueprint",
                    text: "We map out every sequence and camera angle meticulously, giving you a complete visual preview of the narrative layout before any motion production begins.",
                },
                {
                    title: "Visual Style & Voice Talent Match",
                    text: "We harmonize visual designs with your book's established artwork while selecting professional voice actors who capture your characters' true personalities.",
                },
                {
                    title: "Animation & Audio Sync",
                    text: "Our animators bring scenes to life, syncing motion perfectly with professional sound design and voice tracks, then presenting polished drafts for your feedback.",
                },
                {
                    title: "Multi-Platform Asset Delivery",
                    text: "You receive fully rendered video files optimized and proportioned for seamless publishing across YouTube, social media feeds, your author website, and digital stores.",
                },
            ],
        },
        related: {
            eyebrow: "More in Animation & Interactive Content",
            heading: "Explore More Dynamic Motion & Interactive Services for Your Book!",
            viewAll: "View All Services",
            cards: {
                "book-trailers-video-content": {
                    title: "Cinematic Book Trailers & Video Content",
                    text: "High-impact video teasers and promotional content engineered to capture attention on social media feeds and drive book sales.",
                },
                "audiobooks-narration-voiceovers": {
                    title: "Professional Audiobooks & Voice Narration",
                    text: "Immersive audio production featuring professional voice talent that brings characters, tone, and story narrative vividly to listeners.",
                },
                "interactive-animated-ebooks": {
                    title: "Interactive & Motion-Enhanced eBooks",
                    text: "Engaging digital reading formats built with interactive tap features, vibrant animations, and dynamic elements to delight young readers.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert answers to the inquiries authors raise most frequently regarding our 2D and 3D animation services.",
            sideHeading: "Have More Questions About Animation?",
            sideText: "Can't find the exact answer you need? Our friendly team is always happy to discuss your book concept and address any questions you have.",
            sideCta: "Connect with Our Team",
            items: [
                {
                    q: "Can your team animate illustrations from my existing book or portfolio?",
                    a: "Yes, absolutely! We can seamlessly breathe dynamic motion into your existing artwork assets, or alternatively craft entirely brand-new illustrations optimized specifically for motion graphics.",
                },
                {
                    q: "What is the typical duration for a standard published book trailer?",
                    a: "Most standard promotional book trailers run between 30 to 90 seconds—the ideal length to capture attention rapidly across social media platforms, websites, and digital storefronts.",
                },
                {
                    q: "Do you provide professional voice actors and audio narration for animated projects?",
                    a: "Yes! We partner with professional voice talent to deliver character voiceovers, narration, and sound design that match your story's tone perfectly.",
                },
                {
                    q: "What video file formats and resolutions will I receive upon completion?",
                    a: "You receive fully rendered master video files optimized in high-definition resolutions tailored for YouTube, Instagram, TikTok, author websites, and digital presentations.",
                },
                {
                    q: "Can a single book story be adapted into multiple different animated or digital products?",
                    a: "Definitely. We can expand a single narrative into promotional trailers, standalone storybook videos, educational clips, and interactive digital elements to maximize your book's reach.",
                },
            ],
        },
    },
    "book-trailers-video-content": {
        summary: "Animated trailers, YouTube story videos and short social clips that show off your book and help families discover it online.",
        points: ["30–90 Second Trailers", "YouTube & Social Ready"],
        hero: {
            eyebrow: "Animation & Interactive Content",
            title: "Engage Families Online with Stunning Animated Book Promos!",
            description: "Showcase your book's unique magic through eye-catching animated trailers, captivating YouTube story features, and bite-sized social clips engineered to help families and readers discover your story online.",
            cta: "Claim Your Video Quote",
        },
        about: {
            eyebrow: "Book Trailers & Video Content",
            heading: "Transform Your Story Into a Dynamic Visual Experience!",
            paragraphs: [
                "Bring your written universe into vibrant motion through eye-catching animated trailers, captivating video features, and concise social media teasers designed to help families discover your book online.",
                "Young readers adore stories that come alive. We convert your core narrative into cinematic book trailers, immersive animations, professional audiobooks, and interactive digital editions—ensuring your story reaches audiences on screens, smart speakers, and social feeds alongside traditional print.",
            ],
            points: [
                "High-Impact 30 to 90-Second Promotional Book Trailers",
                "Optimized Formats Ready for YouTube & Social Media Feeds",
            ],
            cta: "Start Your Video Project",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Everything Included in Our Book Trailers & Video Content Suite!",
            items: [
                {
                    title: "Cinematic Book Trailers",
                    text: "Engaging, professionally produced video teasers engineered to showcase your story's core narrative and inspire families to pick up a copy.",
                },
                {
                    title: "YouTube Story & Read-Aloud Features",
                    text: "Immersive audio-visual narrative videos optimized for YouTube channels to expand your readership and build a loyal subscriber audience.",
                },
                {
                    title: "Bite-Sized Social Media Clips",
                    text: "Dynamic, platform-tailored micro-animations custom-sized for Instagram Reels, TikTok, Facebook, and YouTube Shorts.",
                },
            ],
        },
        process: {
            heading: "From Concept Blueprint to Final Trailer Release!",
            description: "Every video project follows a transparent, collaborative roadmap designed to keep you informed and excited at every single milestone.",
            steps: [
                {
                    title: "Scene Scripting & Storyboarding",
                    text: "We map out every cinematic frame and sequence so you can preview the visual narrative flow before full production begins.",
                },
                {
                    title: "Visual Styling & Voice Talent Casting",
                    text: "We align the video aesthetics with your book's established artwork and select professional voice actors tailored to your characters.",
                },
                {
                    title: "Animation & Audio Synchronization",
                    text: "Scenes are animated and precisely timed with sound effects and voiceovers, then shared with you for collaborative feedback.",
                },
                {
                    title: "Multi-Platform Video Delivery",
                    text: "You receive finalized master video files custom-sized and optimized for YouTube, social media feeds, author websites, and digital stores.",
                },
            ],
        },
        related: {
            eyebrow: "More in Animation & Interactive Content",
            heading: "Discover Additional Ways to Bring Your Stories to Life!",
            viewAll: "View All Services",
            cards: {
                "2d-3d-animation-services": {
                    title: "2D & 3D Motion Production",
                    text: "Transform your static book art into vibrant, feature-quality motion graphics and 3D worlds that captivate young audiences.",
                },
                "audiobooks-narration-voiceovers": {
                    title: "Professional Audiobooks & Voice Narration",
                    text: "Immerse listeners in your storytelling with professional voice actors, rich narration, and crisp sound engineering.",
                },
                "interactive-animated-ebooks": {
                    title: "Interactive & Animated Digital Books",
                    text: "Engage tech-savvy readers with clickable elements, animated pages, and interactive digital features built for modern devices.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert answers to the inquiries authors raise most frequently regarding our book trailers and video content services.",
            sideHeading: "Have More Questions About Video Content?",
            sideText: "Can't find the exact answer you're looking for? Our supportive team is always happy to discuss your book concept and address any questions you have.",
            sideCta: "Connect with Our Video Team",
            items: [
                {
                    q: "Can your team animate illustrations from my existing book or portfolio?",
                    a: "Yes, absolutely! We can seamlessly breathe dynamic motion into your existing artwork assets, or alternatively craft entirely brand-new visual illustrations optimized specifically for motion trailers.",
                },
                {
                    q: "What is the ideal length for a professional promotional book trailer?",
                    a: "Most standard promotional book trailers run between 30 to 90 seconds—the optimal duration to capture reader attention rapidly across social media channels, websites, and digital storefronts.",
                },
                {
                    q: "Do you provide professional voice actors and sound effects for video projects?",
                    a: "Yes! We collaborate with professional voice talent to deliver compelling narration, character voiceovers, and polished sound design that elevate your book trailer's emotional impact.",
                },
                {
                    q: "What specific video resolutions and formats will I receive upon completion?",
                    a: "You receive fully rendered master video files optimized in high-definition resolutions custom-sized for YouTube, Instagram, TikTok, author websites, and digital marketing presentations.",
                },
                {
                    q: "Can a single book narrative be adapted into multiple different video products?",
                    a: "Definitely. We can expand a single story into cinematic trailers, YouTube read-aloud videos, short social media clips, and animated promotional teasers to maximize your book's digital reach.",
                },
            ],
        },
    },
    "audiobooks-narration-voiceovers": {
        summary: "Warm narration, character voices and complete audiobooks with music and sound effects, ready for Audible and every major store.",
        points: ["Professional Narrators", "Store-Ready Audiobooks"],
        hero: {
            eyebrow: "Animation & Interactive Content",
            title: "Captivate Listeners Everywhere with Warm Narration & Soundscapes!",
            description: "Transform your book into an auditory masterpiece featuring expressive character voice acting, professional narration, and cinematic sound engineering—fully validated and ready for release on Audible and every major global store.",
            cta: "Claim Your Audio Quote",
        },
        about: {
            eyebrow: "Audiobooks, Narration & Voiceovers",
            heading: "Engage Audiences Everywhere with Studio-Quality Audiobooks!",
            paragraphs: [
                "We deliver rich, captivating listening experiences through soothing narrative pacing, expressive character voice acting, and complete audiobook production enhanced by professional sound effects and custom music—fully prepared for release on Audible and global storefronts.",
                "Families and young readers cherish stories they can experience on the go. At Toon Haus Publishing, we transform your written work into professional audiobooks, dynamic animations, and interactive editions, expanding your narrative reach across smart speakers, digital screens, and traditional print pages.",
            ],
            points: [
                "Expertly Cast Professional Voice Talent & Narrators",
                "Fully Formatted, Store-Ready Master Audiobooks",
            ],
            cta: "Start Your Audiobook Project",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Comprehensive Audio Packages Tailored to Bring Your Story to Life!",
            items: [
                {
                    title: "Distinctive Character Voice Acting",
                    text: "Expert voice talent hand-selected to imbue every hero and villain with an unforgettable, lovable personality.",
                },
                {
                    title: "Captivating Story Narration",
                    text: "Soothing, expressive narration recorded by seasoned professionals who excel at keeping young audiences spellbound from start to finish.",
                },
                {
                    title: "Complete Store-Ready Audiobooks",
                    text: "Fully produced master audiobooks featuring rich narration, custom sound effects, and atmospheric music—fully formatted and ready for release on Audible and global storefronts.",
                },
            ],
        },
        process: {
            heading: "How We Bring Your Audiobook to Life!",
            description: "Every project follows an open, friendly process designed to ensure you always know what happens next.",
            steps: [
                {
                    title: "Script & Pacing Blueprint",
                    text: "We map out every chapter and narrative structure meticulously so you can review the flow before recording begins.",
                },
                {
                    title: "Voice Casting & Tone Match",
                    text: "We select professional voice actors whose vocal styles harmonize perfectly with your characters and match your book's unique tone.",
                },
                {
                    title: "Recording & Sound Editing",
                    text: "Chapters are professionally recorded, enhanced with pristine sound design, and shared with you for collaborative feedback.",
                },
                {
                    title: "Store-Ready Delivery",
                    text: "You receive fully mastered audio files formatted and optimized for seamless publishing on Audible and major global storefronts.",
                },
            ],
        },
        related: {
            eyebrow: "More in Animation & Interactive Content",
            heading: "Explore More Exciting Animation & Interactive Options!",
            viewAll: "View All Services",
            cards: {
                "2d-3d-animation-services": {
                    title: "2D & 3D Motion Production",
                    text: "Transform your illustrations and book concepts into vibrant, feature-quality motion graphics and 3D worlds that captivate readers.",
                },
                "book-trailers-video-content": {
                    title: "Cinematic Book Trailers & Video Content",
                    text: "High-impact video teasers and promotional content engineered to capture attention on social media feeds and drive book sales.",
                },
                "interactive-animated-ebooks": {
                    title: "Interactive & Animated Digital Books",
                    text: "Engage tech-savvy readers with clickable features, animated pages, and interactive digital elements built for modern devices.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert answers to the inquiries authors raise most frequently regarding our audiobooks, narration, and voiceover services.",
            sideHeading: "Have More Questions About Audiobooks?",
            sideText: "Can't find the exact answer you're looking for? Our friendly team is always happy to talk through your book and answer any question you have.",
            sideCta: "Connect with Our Team",
            items: [
                {
                    q: "Can you adapt my existing book manuscript into a fully produced audiobook?",
                    a: "Yes, absolutely! We take your completed manuscript and seamlessly transform it into a professionally recorded, studio-mastered audiobook complete with voice talent and immersive sound design.",
                },
                {
                    q: "How long does the typical audiobook recording and production process take?",
                    a: "Production timelines vary based on your book's word count and manuscript length, typically ranging from 2 to 6 weeks from script review to final master delivery.",
                },
                {
                    q: "Do you provide professional voice actors and expert character casting?",
                    a: "Yes! We hand-select professional voice talent and seasoned narrators whose vocal range, tone, and pacing perfectly match your characters and story.",
                },
                {
                    q: "Which audio formats and deliverables will I receive upon completion?",
                    a: "You receive fully mastered, chapter-by-chapter audio files formatted precisely to meet the strict technical standards required for Audible, iTunes, and global retail platforms.",
                },
                {
                    q: "Can a single book narrative be expanded into multiple different audio and digital products?",
                    a: "Definitely. We can adapt your story into complete audiobooks, promotional voiceover teaser clips, animated video trailers, and interactive digital editions.",
                },
            ],
        },
    },
    "interactive-animated-ebooks": {
        summary: "eBooks with moving pictures, read-along audio and tap-to-play moments that keep young readers engaged with your story.",
        points: ["Read-Along Audio", "Tap & Play Interactions"],
        hero: {
            eyebrow: "Animation & Interactive Content",
            title: "Engage Young Readers with Tap-to-Play Digital Adventures!",
            description: "Immerse young readers in your narrative with dynamic digital eBooks featuring animated illustrations, synchronized read-along audio, and interactive tap-to-play moments designed to keep children captivated from cover to cover.",
            cta: "Claim Your Digital Quote",
        },
        about: {
            eyebrow: "Interactive & Animated eBooks",
            heading: "Turn Simple Pages Into Unforgettable Interactive Experiences!",
            paragraphs: [
                "We design dynamic digital editions featuring vibrant moving illustrations, synchronized narration audio, and delightful tap-to-explore moments engineered to keep children deeply invested in your narrative from beginning to end.",
                "Young readers adore stories that leap off the digital screen. At Toon Haus Publishing, we transform your written manuscript into rich animated eBooks, captivating video trailers, professional audiobooks, and multi-format releases—ensuring your story reaches audiences across tablets, smart screens, and physical print pages alike.",
            ],
            points: [
                "Synchronized Read-Along Audio Experiences",
                "Engaging Tap-and-Play Interactive Elements",
            ],
            cta: "Start Your Digital Book Project",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Dynamic Digital Packaging Designed to Captivate Young Audiences!",
            items: [
                {
                    title: "Magical Animated eBooks",
                    text: "Digital books enhanced with vibrant motion graphics and synchronized read-along audio designed to turn everyday reading time into a genuinely magical experience.",
                },
                {
                    title: "Interactive Children's eBooks",
                    text: "Immersive tap, swipe, and play digital editions packed with interactive touch elements built to keep children deeply absorbed and engaged with your story.",
                },
            ],
        },
        process: {
            heading: "From Concept Blueprint to Final Interactive Delivery!",
            description: "Every interactive project follows a clear, supportive process ensuring you stay fully informed and excited at every milestone.",
            steps: [
                {
                    title: "Scene Scripting & Storyboarding",
                    text: "We outline every single scene meticulously so you can preview your narrative layout before digital production commences.",
                },
                {
                    title: "Aesthetic Styling & Voice Casting",
                    text: "We harmonize the visual style with your original artwork and select professional voice talent tailored specifically to your characters.",
                },
                {
                    title: "Motion Animation & Sound Sync",
                    text: "Illustrations are brought to life with smooth motion and precise audio timing, then presented to you for collaborative feedback.",
                },
                {
                    title: "Multi-Platform Digital Delivery",
                    text: "You receive fully optimized digital files custom-sized for tablets, websites, social platforms, and digital storefronts.",
                },
            ],
        },
        related: {
            eyebrow: "More in Animation & Interactive Content",
            heading: "Discover Additional Ways to Bring Your Story to Life!",
            viewAll: "View All Services",
            cards: {
                "2d-3d-animation-services": {
                    title: "2D & 3D Motion Production",
                    text: "Transform your illustrations and concepts into vibrant, feature-quality motion graphics and 3D worlds that captivate young audiences.",
                },
                "book-trailers-video-content": {
                    title: "Cinematic Book Trailers & Video Content",
                    text: "Engage readers across social media channels and digital stores with high-impact promotional video teasers and character animations.",
                },
                "audiobooks-narration-voiceovers": {
                    title: "Professional Audiobooks & Voice Narration",
                    text: "Immerse listeners in your storytelling with professional voice actors, rich narration, and crisp sound engineering built for global release.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert answers to the inquiries authors raise most frequently regarding our interactive and animated eBook services.",
            sideHeading: "Have More Questions About Interactive eBooks?",
            sideText: "Can't find the exact answer you're looking for? Our supportive team is always happy to talk through your book concept and answer any questions you have.",
            sideCta: "Connect with Our Digital Team",
            items: [
                {
                    q: "Can your team animate illustrations from my existing book or portfolio?",
                    a: "Yes, absolutely! We can seamlessly bring your current artwork assets to life with smooth motion, or alternatively create fresh illustrations designed specifically for digital animation.",
                },
                {
                    q: "What interactive touch features can be embedded into my digital eBook?",
                    a: "We integrate tap-to-play elements, animated page transitions, swipe gestures, and synchronized read-along audio to create a deeply engaging interactive experience for young readers.",
                },
                {
                    q: "Do you provide professional voice narration and sound effects for digital books?",
                    a: "Yes! We incorporate professional voice talent, immersive soundscapes, and delightful sound effects that bring every scene and character vividly to life on screen.",
                },
                {
                    q: "Which digital formats and device compatibilities will I receive upon completion?",
                    a: "You receive fully optimized digital eBook files compatible with modern tablets, iPads, e-readers, iOS/Android devices, and major digital publishing platforms.",
                },
                {
                    q: "Can my eBook be adapted into other multimedia formats like audiobooks or video trailers?",
                    a: "Definitely. We specialize in multi-format publishing, allowing your single story to expand into interactive eBooks, standalone audiobooks, and cinematic video trailers.",
                },
            ],
        },
    },
    "amazon-book-marketing-optimization": {
        summary: "Grow your Amazon sales with ads, the right keywords and categories, and listing improvements that put your book in front of parents.",
        points: ["Amazon Ads Management", "Keywords & Categories"],
        hero: {
            eyebrow: "Children's Book Marketing & Promotion",
            title: "Put Your Children's Book Directly in Front of Parents!",
            description: "Scale your author earnings with targeted advertising campaigns, precision keyword research, strategic category placement, and listing enhancements designed to capture parents' attention and drive consistent book sales.",
            cta: "Claim Your Marketing Quote",
        },
        about: {
            eyebrow: "Amazon Book Marketing & Optimization",
            heading: "Connect Your Masterpiece with the Perfect Families & Readers!",
            paragraphs: [
                "Scale your online bookstore revenue utilizing precision advertising campaigns, optimized keywords, targeted category positioning, and listing enhancements engineered to place your title directly in front of parents.",
                "Even the most enchanting story requires visibility to thrive. Our dedicated marketing specialists craft strategic campaigns that connect with parents, educators, librarians, and young book enthusiasts across digital platforms and local communities.",
            ],
            points: [
                "Expert Amazon Advertising Campaign Management",
                "Strategic Keyword Research & Category Placement",
            ],
            cta: "Start Your Marketing Campaign",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Everything Needed to Boost Your Book Sales on Amazon!",
            items: [
                {
                    title: "Strategic Amazon Advertising & Promotions",
                    text: "Drive robust book sales through targeted advertising campaigns, listing enhancements, and promotional strategies designed to place your title directly in front of eager buyers.",
                },
                {
                    title: "Precision Keyword & Category Optimization",
                    text: "Select high-performing keywords and strategic categories engineered to help parents easily discover your book during Amazon search queries.",
                },
            ],
        },
        process: {
            heading: "Our Transparent 4-Step Promotional Roadmap!",
            description: "Every promotional campaign follows an open, supportive framework designed to ensure you always remain informed and excited about your book's journey.",
            steps: [
                {
                    title: "Audit & Market Research",
                    text: "We perform an in-depth evaluation of your unique manuscript, your target audience demographics, and leading competitors within your specific genre category.",
                },
                {
                    title: "Strategic Planning & Goal Setting",
                    text: "You receive a clear, actionable marketing blueprint complete with designated promotional channels, execution timelines, and measurable success goals.",
                },
                {
                    title: "Active Campaign Management",
                    text: "We launch and manage your advertising campaigns, continuously monitoring performance data and optimizing elements in real time as results come in.",
                },
                {
                    title: "Performance Reporting & Scaled Growth",
                    text: "Regular, easy-to-read analytics reports reveal precisely what is succeeding and map out strategic pathways for your next wave of book sales.",
                },
            ],
        },
        related: {
            eyebrow: "More in Children's Book Marketing & Promotion",
            heading: "Explore More Comprehensive Promotional Strategies Built for Authors!",
            viewAll: "View All Marketing Services",
            cards: {
                "book-launch-promotional-campaigns": {
                    title: "Strategic Book Launch & Promotional Campaigns",
                    text: "High-impact release strategies and structured promotional blitzes engineered to build early momentum and skyrocket initial market visibility.",
                },
                "social-media-influencer-marketing": {
                    title: "Social Media & Influencer Partnerships",
                    text: "Collaborate with prominent parenting bloggers, family influencers, and active social channels to generate authentic digital buzz and organic readership.",
                },
                "author-website-email-marketing": {
                    title: "Professional Author Websites & Email Funnels",
                    text: "Establish a stunning online author hub and cultivate loyal reader mailing lists that keep parents and young fans engaged for every future release.",
                },
                "book-fairs-libraries-bookstore-promotion": {
                    title: "Book Fairs, Libraries & Bookstore Outreach",
                    text: "Expand your physical presence by securing retail bookstore placements, pitching community libraries, and showcasing your book at literary events.",
                },
                "school-educational-book-marketing": {
                    title: "School & Educational Book Marketing",
                    text: "Introduce your captivating stories directly to educators, reading specialists, and school districts searching for enriching classroom literature.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert responses to the most common inquiries authors have regarding our Amazon marketing and optimization services.",
            sideHeading: "Have Additional Questions About Amazon Marketing?",
            sideText: "Can't locate the specific answer you need? Our dedicated team is always eager to discuss your book and answer any questions you may have.",
            sideCta: "Connect with Our Marketing Team",
            items: [
                {
                    q: "Do you guarantee a specific number of book sales?",
                    a: "While no reputable promotional agency can promise guaranteed sales figures, our team implements proven, data-driven strategies and transparent tracking so you can monitor your ongoing growth and progress every step of the way.",
                },
                {
                    q: "At what stage in the publishing journey should book marketing begin?",
                    a: "It is ideal to start laying promotional groundwork several weeks before your official release date to build early anticipation, though effective marketing can also be launched successfully for backlist titles at any time.",
                },
                {
                    q: "Which online platforms and advertising channels do you focus on?",
                    a: "We specialize primarily in Amazon Advertising (PPC), Author Central optimization, and targeted digital channels designed to maximize your visibility among parents and readers.",
                },
                {
                    q: "Do I need a massive advertising budget to get started with marketing?",
                    a: "Not at all! We tailor our promotional campaigns to fit comfortably within your unique financial scope, ensuring efficient spend and a strong return on investment.",
                },
                {
                    q: "Will I receive regular performance updates and analytical reports?",
                    a: "Yes, absolutely. You receive clear, comprehensive analytics reports that highlight key performance indicators, successful tactics, and strategic pathways for future growth.",
                },
            ],
        },
    },
    "book-launch-promotional-campaigns": {
        summary: "A planned launch with early reviews, press releases and podcast interviews that builds excitement and gives your book its strongest start.",
        points: ["Launch & Review Campaigns", "Press & Podcast Outreach"],
        hero: {
            eyebrow: "Children's Book Marketing & Promotion",
            title: "Give Your Story the Ultimate Debut with Expert Launch Strategies!",
            description: "Execute a meticulously crafted release strategy featuring early critical reviews, compelling press releases, and targeted media features designed to generate massive excitement and secure the strongest possible start for your book.",
            cta: "Claim Your Launch Quote",
        },
        about: {
            eyebrow: "Book Launch & Promotional Campaigns",
            heading: "Give Your Book the Ultimate Launchpad to Success!",
            paragraphs: [
                "We architect strategic release campaigns packed with early critical reviews, compelling press releases, and engaging podcast features designed to generate massive anticipation and secure the strongest possible market debut.",
                "An extraordinary book deserves an extraordinary audience. Our dedicated marketing professionals construct targeted campaigns that connect directly with parents, educators, librarians, and eager young readers across digital spaces and local community networks.",
            ],
            points: [
                "Comprehensive Launch & Review Campaigns",
                "Targeted Press & Podcast Media Outreach",
            ],
            cta: "Launch Your Book Today",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Strategic Launch Packages Built for Maximum Author Success!",
            items: [
                {
                    title: "Dynamic Book Launch Strategies",
                    text: "Carefully orchestrated debut schedules designed to generate high anticipation, harvest early reader feedback, and launch your title with explosive momentum.",
                },
                {
                    title: "Authentic Reader Review Campaigns",
                    text: "Systematic outreach efforts to gather genuine testimonials and organic reviews that establish instant consumer trust and drive continuous conversions.",
                },
                {
                    title: "Professional Media Press Releases",
                    text: "Expertly drafted announcements distributed directly to prominent journalists, parenting bloggers, and regional news networks to maximize public exposure.",
                },
                {
                    title: "Engaging Podcast & Media Interviews",
                    text: "Featured interview opportunities on leading parenting and literary podcasts, allowing eager listeners to discover the heartfelt inspiration behind your story.",
                },
            ],
        },
        process: {
            heading: "Our Transparent 4-Step Promotional Roadmap!",
            description: "Every promotional project follows a simple, friendly process so you always know what happens next.",
            steps: [
                {
                    title: "Audit & Market Research",
                    text: "We thoroughly study your book, identify your target readers, and analyze the active competition within your specific genre category.",
                },
                {
                    title: "Strategic Planning & Execution Plan",
                    text: "You receive a clear, tailored plan complete with designated promotional channels, strict timelines, and measurable goals.",
                },
                {
                    title: "Active Campaign Management",
                    text: "We launch and manage your marketing campaign, actively monitoring results and fine-tuning elements as performance data comes in.",
                },
                {
                    title: "Performance Reporting & Scaled Growth",
                    text: "Regular, transparent reports highlight what is working effectively and outline clear directions for your next stage of growth.",
                },
            ],
        },
        related: {
            eyebrow: "More in Children's Book Marketing & Promotion",
            heading: "Explore More Comprehensive Promotional Strategies Built for Authors!",
            viewAll: "View All Marketing Services",
            cards: {
                "amazon-book-marketing-optimization": {
                    title: "Amazon Book Marketing & Optimization",
                    text: "Scale your online bookstore revenue with precision advertising, targeted keywords, and listing enhancements designed to attract parents.",
                },
                "social-media-influencer-marketing": {
                    title: "Social Media & Influencer Partnerships",
                    text: "Collaborate with prominent parenting bloggers and active family creators to generate authentic digital buzz and reader engagement.",
                },
                "author-website-email-marketing": {
                    title: "Professional Author Websites & Email Funnels",
                    text: "Establish a stunning online author hub and cultivate loyal reader mailing lists that keep parents and young fans excited for every release.",
                },
                "book-fairs-libraries-bookstore-promotion": {
                    title: "Book Fairs, Libraries & Bookstore Outreach",
                    text: "Expand your physical presence by securing retail shelf space, pitching community libraries, and showcasing your work at literary events.",
                },
                "school-educational-book-marketing": {
                    title: "School & Educational Book Marketing",
                    text: "Introduce your captivating stories directly to educators, reading specialists, and school districts searching for enriching classroom literature.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert answers to the inquiries authors raise most frequently regarding our book launch and promotional campaigns.",
            sideHeading: "Do You Have More Questions?",
            sideText: "Can't find the answer you're looking for? Our supportive team is always happy to talk through your book and answer any questions you have.",
            sideCta: "Contact Us",
            items: [
                {
                    q: "Can your agency guarantee specific sales numbers?",
                    a: "While no honest promotional agency can promise guaranteed sales figures, we focus entirely on proven tactics and transparent tracking so you can clearly see your ongoing progress.",
                },
                {
                    q: "At what point in the publishing timeline should promotional marketing begin?",
                    a: "Starting your marketing several weeks before your official release date is ideal for building early anticipation, though effective promotional campaigns can be initiated at any time.",
                },
                {
                    q: "Which digital platforms and media channels do you work with?",
                    a: "We collaborate with a wide array of online platforms, social media networks, parenting blogs, press syndicates, and podcast channels to maximize your book's reach.",
                },
                {
                    q: "Do I need a massive financial budget to launch a promotional campaign?",
                    a: "Not at all! We tailor our promotional strategies to fit comfortably within your unique budget, ensuring efficient spending and strong value.",
                },
                {
                    q: "Will I receive regular performance updates and analytical reports?",
                    a: "Yes, absolutely. You receive clear, comprehensive reports that highlight what is working successfully and outline strategic directions for future growth.",
                },
            ],
        },
    },
    "social-media-influencer-marketing": {
        summary: "Reach parents, teachers and young fans on Instagram, Facebook, TikTok and YouTube, with influencer, blogger and parenting-community outreach.",
        points: ["Paid & Organic Social", "Influencer & Blogger Outreach"],
        hero: {
            eyebrow: "Children's Book Marketing & Promotion",
            title: "Harness the Power of Social Media & Influencer Partnerships!",
            description: "Build deep connections with parents, dedicated educators, and enthusiastic young readers across major digital platforms like Instagram, Facebook, TikTok, and YouTube through expert influencer collaborations, parenting bloggers, and active online community engagement.",
            cta: "Claim Your Influencer Quote",
        },
        about: {
            eyebrow: "Social Media & Influencer Marketing",
            heading: "Connect Your Heartfelt Story with the Ideal Families!",
            paragraphs: [
                "Engage parents, educators, and young readers across Instagram, Facebook, TikTok, and YouTube through expert influencer collaborations, dedicated parenting bloggers, and vibrant community outreach.",
                "An exceptional book deserves an exceptional audience. Our specialized marketing professionals craft campaigns that connect directly with parents, teachers, librarians, and enthusiastic young readers wherever they gather online and within their local communities.",
            ],
            points: [
                "Comprehensive Paid & Organic Social Strategies",
                "Targeted Influencer & Parenting Blogger Outreach",
            ],
            cta: "Connect with Our Social Team",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Strategic Social and Influencer Packages Built for Maximum Engagement!",
            items: [
                {
                    title: "Comprehensive Social Media Management",
                    text: "Deliver consistent, captivating social content designed to build a thriving community of parents, teachers, and young readers.",
                },
                {
                    title: "Targeted Instagram & Facebook Campaigns",
                    text: "Run precise advertising and organic campaigns on Instagram and Facebook that directly reach parents and gift buyers passionate about children's literature.",
                },
                {
                    title: "Engaging TikTok & BookTok Promotion",
                    text: "Capture the attention of new readers on TikTok through entertaining short-form videos and vibrant BookTok-friendly campaigns.",
                },
                {
                    title: "Strategic YouTube Promotion",
                    text: "Expand your book's visibility and audience on YouTube utilizing optimized video content, targeted ads, and ongoing channel support.",
                },
                {
                    title: "Expert Influencer Partnerships",
                    text: "Forge direct connections with prominent parenting, education, and BookTok influencers eager to share your book with their dedicated followers.",
                },
                {
                    title: "Vibrant Parenting Community Outreach",
                    text: "Introduce your story to trusted parenting groups, online forums, and digital communities where families actively look for book recommendations.",
                },
                {
                    title: "Trusted Blogger & Reviewer Outreach",
                    text: "Secure dedicated features and spotlights across authoritative parenting and children's book blogs that families know and trust.",
                },
            ],
        },
        process: {
            heading: "Our Transparent 4-Step Social Media & Influencer Roadmap!",
            description: "Every social and influencer project follows an open, supportive framework so you always remain informed and excited about your next steps.",
            steps: [
                {
                    title: "In-Depth Audit & Audience Research",
                    text: "We thoroughly evaluate your children's book, analyze your ideal target readers, and examine active competitor positioning across social networks.",
                },
                {
                    title: "Strategic Planning & Channel Roadmapping",
                    text: "You receive a customized promotion blueprint detailing specific platform channels, execution schedules, and measurable engagement goals.",
                },
                {
                    title: "Active Campaign Management & Outreach",
                    text: "We execute influencer collaborations and social campaigns, continuously monitoring performance and refining strategies in real time.",
                },
                {
                    title: "Performance Analytics & Scaled Expansion",
                    text: "Transparent, easy-to-read progress reports highlight what is succeeding and map out strategic directions for your next stage of community growth.",
                },
            ],
        },
        related: {
            eyebrow: "More in Children's Book Marketing & Promotion",
            heading: "Browse Our Full Suite of Targeted Author Marketing Solutions!",
            viewAll: "View All Marketing Services",
            cards: {
                "amazon-book-marketing-optimization": {
                    title: "Amazon Book Marketing & Optimization",
                    text: "Scale your online readership and store revenue with data-driven advertising, optimized keywords, and category placements tailored for parents.",
                },
                "book-launch-promotional-campaigns": {
                    title: "Book Launch & Promotional Campaigns",
                    text: "Execute structured release schedules and high-impact promotional blitzes that build early anticipation and maximize market visibility.",
                },
                "author-website-email-marketing": {
                    title: "Author Website & Email Marketing",
                    text: "Establish a stunning online author platform and build loyal mailing lists that keep families and young fans engaged for every future release.",
                },
                "book-fairs-libraries-bookstore-promotion": {
                    title: "Book Fairs, Libraries & Bookstore Outreach",
                    text: "Expand your physical presence by securing retail shelf space, connecting with public libraries, and showcasing your work at regional literary events.",
                },
                "school-educational-book-marketing": {
                    title: "School & Educational Book Marketing",
                    text: "Introduce your captivating books directly to educators, reading specialists, and school districts seeking enriching classroom literature.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert responses to the questions authors ask most about social media & influencer marketing.",
            sideHeading: "Do You Have More Questions?",
            sideText: "Can't find the answer you're looking for? Our team is happy to talk through your book and answer any question you have.",
            sideCta: "Contact Us",
            items: [
                {
                    q: "Can you guarantee specific sales numbers through social and influencer campaigns?",
                    a: "While no reputable promotional agency can promise guaranteed sales figures, our team implements proven tactics and clear results tracking so you can monitor your ongoing progress.",
                },
                {
                    q: "When is the ideal time to begin social media and influencer marketing?",
                    a: "Starting your promotional efforts several weeks before your book's release helps build vital early momentum, though campaigns can also be launched effectively for backlist titles at any time.",
                },
                {
                    q: "Which platforms and creator networks do you work with?",
                    a: "We collaborate with top creators and communities across major channels like Instagram, TikTok, Facebook, YouTube, and specialized parenting or children's book blogs.",
                },
                {
                    q: "Do I need a large marketing budget to run social media campaigns?",
                    a: "Not at all! We customize our social strategies to align with your financial scope, ensuring efficient spending and strong promotional value.",
                },
                {
                    q: "Will I receive performance updates and analytics reports?",
                    a: "Yes, absolutely. You receive regular reports detailing campaign performance, audience engagement, and strategic directions for future growth.",
                },
            ],
        },
    },
    "author-website-email-marketing": {
        summary: "A professional author or book website and an email list that keeps families coming back for your next story.",
        points: ["Author & Book Websites", "Email List Growth"],
        hero: {
            eyebrow: "Children's Book Marketing & Promotion",
            title: "Build a Stunning Author Hub and High-Converting Email Funnels!",
            description: "Create a polished, professional author platform paired with an active reader mailing list designed to keep parents and young fans engaged and returning for every upcoming release.",
            cta: "Claim Your Website Quote",
        },
        about: {
            eyebrow: "Author Website & Email Marketing",
            heading: "Build Your Digital Author Home and Grow a Thriving Reader Base!",
            paragraphs: [
                "We design polished author and book websites paired with targeted email lists that continuously inspire families to return for your next enchanting story.",
                "An extraordinary book deserves to be discovered. Our dedicated promotional team architects campaigns designed to connect with parents, educators, librarians, and eager young readers wherever they gather online and within local communities.",
            ],
            points: [
                "Custom Author & Book Websites",
                "Strategic Reader Email List Growth",
            ],
            cta: "Connect with Our Web Team",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Comprehensive Features Included in Our Author Web & Email Suite!",
            items: [
                {
                    title: "Professional Author Hub & Portfolio",
                    text: "Establish a polished personal website that shares your unique creative journey, showcases your complete book collection, and streamlines direct purchases for eager readers.",
                },
                {
                    title: "Immersive Children's Book Portals",
                    text: "Launch a vibrant, interactive website tailored specifically for your children's title, complete with engaging activities, dedicated character profiles, and seamless retail links.",
                },
                {
                    title: "Strategic Reader Email List Building",
                    text: "Cultivate and expand a loyal mailing list filled with supportive families and passionate educators who are excited to hear about your next enchanting release.",
                },
            ],
        },
        process: {
            heading: "From In-Depth Platform Audit to Scaled Reader Growth!",
            description: "Every website and email marketing project follows a simple, friendly process so you always know what happens next.",
            steps: [
                {
                    title: "Audit & Platform Research",
                    text: "We evaluate your current author presence, analyze your ideal target readers, and examine competitive website strategies in your specific genre category.",
                },
                {
                    title: "Strategic Web & Funnel Planning",
                    text: "You receive a clear, custom blueprint detailing website architecture, email funnel channels, strict timelines, and measurable goals.",
                },
                {
                    title: "Website Build & Campaign Execution",
                    text: "We construct your professional author hub, launch automated email workflows, and actively refine performance as subscriber data comes in.",
                },
                {
                    title: "Performance Reporting & Scaled Growth",
                    text: "Regular, transparent reports highlight what is working effectively and outline clear directions for your ongoing reader engagement and expansion.",
                },
            ],
        },
        related: {
            eyebrow: "More in Children's Book Marketing & Promotion",
            heading: "Browse Our Full Suite of Targeted Author Marketing Solutions!",
            viewAll: "View All Marketing Services",
            cards: {
                "amazon-book-marketing-optimization": {
                    title: "Amazon Book Marketing & Optimization",
                    text: "Maximize your book's visibility on the world's largest marketplace with targeted advertising, keyword optimization, and strategic category placements designed for parents.",
                },
                "book-launch-promotional-campaigns": {
                    title: "Book Launch & Promotional Campaigns",
                    text: "Execute structured release schedules and high-impact promotional blitzes that build early anticipation and maximize market visibility.",
                },
                "social-media-influencer-marketing": {
                    title: "Social Media & Influencer Marketing",
                    text: "Engage families and young readers across major platforms through targeted influencer collaborations, parenting bloggers, and vibrant community outreach.",
                },
                "book-fairs-libraries-bookstore-promotion": {
                    title: "Book Fairs, Libraries & Bookstore Outreach",
                    text: "Expand your physical presence by securing retail shelf space, connecting with public libraries, and showcasing your work at regional literary events.",
                },
                "school-educational-book-marketing": {
                    title: "School & Educational Book Marketing",
                    text: "Introduce your captivating books directly to educators, reading specialists, and school districts seeking enriching classroom literature.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert answers to the inquiries authors raise most frequently regarding our author website and email marketing services.",
            sideHeading: "Do You Have More Questions?",
            sideText: "Can't find the answer you're looking for? Our supportive team is always happy to talk through your author platform and answer any questions you have.",
            sideCta: "Contact Us",
            items: [
                {
                    q: "Can your agency guarantee direct book sales through author website and email campaigns?",
                    a: "While no honest promotional agency can promise guaranteed sales figures, we focus entirely on proven web architecture, targeted email funnels, and transparent analytics so you can easily track your continuous progress.",
                },
                {
                    q: "At what point in the publishing journey should I build my author website and email list?",
                    a: "Setting up your digital author hub and starting your subscriber list well ahead of your book launch is ideal for building early anticipation, though we can establish them at any stage of your author career.",
                },
                {
                    q: "Which web platforms, hosting tools, and email software do you utilize?",
                    a: "We work with industry-leading content management systems, custom domain setups, and reliable email marketing platforms tailored to connect seamlessly with families and readers.",
                },
                {
                    q: "Do I need a massive financial budget to build a professional author website and run email campaigns?",
                    a: "Not at all! We customize our web development and email marketing solutions to fit comfortably within your unique budget, ensuring maximum value and professional impact.",
                },
                {
                    q: "Will I receive regular performance updates and web traffic reports?",
                    a: "Yes, absolutely. You receive clear, comprehensive analytics reports detailing website traffic, subscriber growth, and actionable insights for your ongoing success.",
                },
            ],
        },
    },
    "book-fairs-libraries-bookstore-promotion": {
        summary: "Get your book seen at children's book fairs and onto library and bookstore shelves where families discover new favourites.",
        points: ["Book Fair Presence", "Library & Store Pitching"],
        hero: {
            eyebrow: "Children's Book Marketing & Promotion",
            title: "Showcase Your Story at Major Book Fairs and Retail Shelves!",
            description: "Get your captivating book featured prominently at children's literary fairs and placed directly onto library and bookstore shelves where eager families gather to discover their next beloved reads.",
            cta: "Claim Your Promotion Quote",
        },
        about: {
            eyebrow: "Book Fairs, Libraries & Bookstore Promotion",
            heading: "Bring Your Masterpiece to Life in Libraries and Bookshops!",
            paragraphs: [
                "Position your story prominently at children's literary events and onto physical library and retail bookstore shelves where families actively explore fresh adventures.",
                "An extraordinary story deserves a dedicated readership. Our specialist marketing professionals design targeted campaigns that connect directly with parents, educators, librarians, and enthusiastic kids wherever they gather.",
            ],
            points: [
                "Premier Book Fair Presence & Showcasing",
                "Expert Library & Bookstore Pitching Strategies",
            ],
            cta: "Connect with Our Promotion Team",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Everything Required to Showcase Your Title in Libraries and Bookshops!",
            items: [
                {
                    title: "Children's Book Fairs & Literary Events",
                    text: "Secure prominent visibility for your story at major children's book fairs and regional events where eager families and buyers explore fresh releases.",
                },
                {
                    title: "Strategic Library Outreach & Acquisition",
                    text: "Empower public and school libraries to discover, stock, and actively recommend your enchanting book to eager young readers.",
                },
                {
                    title: "Bookstore Pitching & Retail Placement",
                    text: "Directly pitch your title to independent bookshops and major retail chains to secure prime shelf space, window displays, and author signing events.",
                },
            ],
        },
        process: {
            heading: "Our Transparent 4-Step Book Fair & Retail Roadmap!",
            description: "Every bookstore and library promotion project follows a simple, friendly process so you always know what happens next.",
            steps: [
                {
                    title: "Inventory Audit & Retail Research",
                    text: "We thoroughly analyze your book format, examine target reading groups, and evaluate competing titles within bookstore and library sectors.",
                },
                {
                    title: "Strategic Pitching & Event Roadmapping",
                    text: "You receive a customized promotional blueprint detailing target libraries, book fair schedules, outreach timelines, and placement goals.",
                },
                {
                    title: "Active Retail Pitching & Event Execution",
                    text: "We actively pitch your book to librarians, bookshop owners, and fair coordinators while refining strategies as placement opportunities are secured.",
                },
                {
                    title: "Placement Reporting & Scaled Expansion",
                    text: "Comprehensive progress reports highlight successful bookstore shelves and library acquisitions, charting clear directions for your ongoing physical growth",
                },
            ],
        },
        related: {
            eyebrow: "More in Children's Book Marketing & Promotion",
            heading: "Explore Additional Ways to Expand Your Book's Market Reach!",
            viewAll: "View All Marketing Services",
            cards: {
                "amazon-book-marketing-optimization": {
                    title: "Amazon Book Marketing & Optimization",
                    text: "Maximize your book's visibility on the world's leading marketplace through data-driven advertising, optimized keywords, and category placements tailored for parents.",
                },
                "book-launch-promotional-campaigns": {
                    title: "Book Launch & Promotional Campaigns",
                    text: "Execute structured release schedules and high-impact promotional blitzes designed to build early anticipation and maximize market presence.",
                },
                "social-media-influencer-marketing": {
                    title: "Social Media & Influencer Marketing",
                    text: "Connect with families across major social platforms through targeted influencer partnerships, parenting bloggers, and vibrant community outreach.",
                },
                "author-website-email-marketing": {
                    title: "Author Website & Email Marketing",
                    text: "Establish a polished digital author platform and cultivate loyal mailing lists that keep parents and young fans engaged for your future releases.",
                },
                "school-educational-book-marketing": {
                    title: "School & Educational Book Marketing",
                    text: "Introduce your enriching stories directly to educators, reading specialists, and school districts looking for quality classroom literature.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Answers to the questions authors ask most about book fairs, libraries & bookstore promotion.",
            sideHeading: "Do You Have More Questions?",
            sideText: "Can't find the answer you're looking for? Our team is happy to talk through your book and answer any question you have.",
            sideCta: "Contact Us",
            items: [
                {
                    q: "Can your agency guarantee direct book sales through physical retail and library campaigns?",
                    a: "No honest agency can guarantee exact sales numbers, but we focus on proven retail pitching strategies and provide transparent progress metrics so you can track your growth clearly.",
                },
                {
                    q: "At what point in my publishing timeline should bookstore and library outreach begin?",
                    a: "Starting promotional outreach 3 to 6 months prior to your launch date gives buyers, librarians, and event coordinators enough runway to schedule and stock your book.",
                },
                {
                    q: "Which distribution channels and bookstore networks do you target?",
                    a: "We pitch to leading national and independent bookshops, public and private library systems, school media centers, and major regional children's book expos.",
                },
                {
                    q: "Do I need a massive promotion budget to get featured at book fairs and in libraries?",
                    a: "Not at all! We tailor our outreach programs to align with your financial goals, maximizing physical exposure without overextending your budget.",
                },
                {
                    q: "How will I stay updated on outreach results and confirmed placements?",
                    a: "We deliver regular progress updates and reporting breakdowns detailing every stock request, library acquisition, and event appearance secured.",
                },
            ],
        },
    },
    "school-educational-book-marketing": {
        summary: "Bring your book into classrooms and educational programmes, with school outreach and bulk-sales campaigns for larger orders.",
        points: ["School & District Outreach", "Bulk-Sales Programmes"],
        hero: {
            eyebrow: "Children's Book Marketing & Promotion",
            title: "Inspire Young Minds by Bringing Your Story Straight to Classrooms!",
            description: "Introduce your captivating book directly into academic classrooms and learning curricula through targeted school outreach strategies and specialized bulk-order sales initiatives.",
            cta: "Claim Your Educational Quote",
        },
        about: {
            eyebrow: "School & Educational Book Marketing",
            heading: "Drive Large-Scale Educational Impact and Bulk Order Success!",
            paragraphs: [
                "Introduce your book directly into academic learning environments through targeted school outreach strategies and specialized bulk-order promotional initiatives.",
                "An extraordinary story deserves to be discovered. Our dedicated promotional team designs campaigns that reach educators, reading specialists, school librarians, and young students across digital channels and local communities.",
            ],
            points: [
                "Targeted School & District Outreach",
                "Tailored Bulk-Sales Programs",
            ],
            cta: "Connect with Our Educational Team",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Strategic Academic Outreach and Bulk Order Programs for Authors!",
            items: [
                {
                    title: "Direct School Outreach & Author Visits",
                    text: "Introduce your story directly to classrooms through interactive author visit bookings, curated reading programs, and comprehensive teacher resource kits.",
                },
                {
                    title: "Educational Institution & District Placement",
                    text: "Connect your book with entire school districts, learning centers, and academic curricula seeking high-quality reading material.",
                },
                {
                    title: "Bulk-Sales & Quantity Order Campaigns",
                    text: "Drive large-scale bulk purchases by positioning your book to schools, educational non-profits, and youth organizations.",
                },
            ],
        },
        process: {
            heading: "Our Transparent 4-Step Educational Marketing Roadmap!",
            description: "Every school and educational marketing project follows a simple, friendly process so you always know what happens next.",
            steps: [
                {
                    title: "Curriculum Audit & Educational Research",
                    text: "We thoroughly evaluate your book's educational themes, target grade levels, and alignment with current school reading programs and curriculum standards.",
                },
                {
                    title: "Strategic Outreach & Campaign Blueprint",
                    text: "You receive a clear, actionable plan mapping out school district targets, educator outreach schedules, bulk sales strategies, and campaign timelines.",
                },
                {
                    title: "Active Educational Outreach & Bulk Campaigns",
                    text: "We execute targeted outreach to teachers, reading specialists, and school administrators, actively optimizing our push as responses and orders come in.",
                },
                {
                    title: "Adoption Reporting & Scaled Educational Expansion",
                    text: "Detailed progress reports showcase classroom adoptions and bulk orders, while detailing strategic steps for continuous growth in the educational market.",
                },
            ],
        },
        related: {
            eyebrow: "More in Children's Book Marketing & Promotion",
            heading: "Browse Our Full Suite of Targeted Author Promotion Solutions!",
            viewAll: "View All Marketing Services",
            cards: {
                "amazon-book-marketing-optimization": {
                    title: "Amazon Book Marketing & Optimization",
                    text: "Maximize your book's searchability on the world's largest marketplace with targeted advertising, keyword optimization, and strategic category placements designed for parents and teachers.",
                },
                "book-launch-promotional-campaigns": {
                    title: "Book Launch & Promotional Campaigns",
                    text: "Execute structured release timelines and high-impact promotional blitzes designed to generate early anticipation and maximize market momentum.",
                },
                "social-media-influencer-marketing": {
                    title: "Social Media & Influencer Marketing",
                    text: "Engage families across major social platforms through targeted influencer partnerships, parent bloggers, and vibrant community outreach.",
                },
                "author-website-email-marketing": {
                    title: "Author Website & Email Marketing",
                    text: "Build a professional digital author platform and cultivate loyal mailing lists that keep educators, parents, and young fans connected to your work.",
                },
                "book-fairs-libraries-bookstore-promotion": {
                    title: "Book Fairs, Libraries & Bookstore Outreach",
                    text: "Expand your physical presence by securing retail shelf space, connecting with public libraries, and showcasing your titles at regional literary expos.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert answers to the inquiries authors raise most frequently regarding our school and educational book marketing services.",
            sideHeading: "Do You Have More Questions?",
            sideText: "Can't find the answer you're looking for? Our supportive team is always happy to talk through your book and answer any questions you have.",
            sideCta: "Contact Us",
            items: [
                {
                    q: "Can your agency guarantee direct book sales and classroom adoptions?",
                    a: "While no reputable agency can guarantee exact bulk sales numbers, we utilize proven educational outreach strategies, direct teacher pitching, and transparent performance tracking so you can clearly monitor your progress.",
                },
                {
                    q: "At what point in my publishing timeline should educational and school outreach begin?",
                    a: "Initiating educational outreach several months before the academic term or launch date gives teachers, school librarians, and district coordinators sufficient time to integrate your book into upcoming lesson plans and reading lists.",
                },
                {
                    q: "Which educational channels, school systems, and learning networks do you connect with?",
                    a: "We target public and private elementary schools, school district buyers, academic libraries, homeschooling networks, and educational resource portals looking for quality children's literature.",
                },
                {
                    q: "Do I need a massive budget to launch a school or educational marketing campaign?",
                    a: "Not at all! We tailor our educational outreach and bulk-order promotion packages to match your specific budget while ensuring maximum impact among educators.",
                },
                {
                    q: "Will I receive regular updates on school inquiries and bulk order interest?",
                    a: "Yes, absolutely. You will receive detailed, easy-to-read reports highlighting educator leads, school district responses, and classroom adoptions.",
                },
            ],
        },
    },
    "author-character-branding": {
        summary: "Build a memorable brand for yourself and your characters, with logos, social content and a website that fans recognise instantly.",
        points: ["Author & Character Brands", "Logo, Social & Website"],
        hero: {
            eyebrow: "Author & Character Branding",
            title: "Turn Your Stories into an Instant Recognized Publishing Brand!",
            description: "Craft a distinctive, captivating visual identity for your author persona and beloved story characters—featuring custom logos, cohesive social graphics, and custom website designs that readers recognize instantly.",
            cta: "Claim Your Branding Quote",
        },
        about: {
            eyebrow: "Author & Character Branding",
            heading: "Bring Your Characters Off the Page and into Readers' Hearts!",
            paragraphs: [
                "Establish a highly memorable digital and visual identity for yourself and your story universe, complete with signature logos, engaging social media assets, and an author website that readers identify instantly.",
                "The most cherished children's literary figures flourish far beyond the book cover. Our branding design experts help authors cultivate an instantly recognizable identity for themselves and their characters—crafting logos, downloadable activity packs, merchandise concepts, and digital content that keep young fans and parents coming back for every new release.",
            ],
            points: [
                "Tailored Author & Character Branding Packages",
                "Custom Logo Design, Social Kits & Website Architecture",
            ],
            cta: "Build Your Brand Today",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Strategic Creative Branding Built to Elevate Your Books and Fan Base!",
            items: [
                {
                    title: "Professional Author Branding",
                    text: "Develop an unforgettable author image with a distinct aesthetic, captivating bio story, and clear voice that readers recognize instantly.",
                },
                {
                    title: "Character World & Brand Identity",
                    text: "Transform your lead character into an iconic brand featuring unified visual guidelines, vibrant personality traits, and cohesive world-building.",
                },
                {
                    title: "Signature Character Logo Design",
                    text: "Craft a charming, highly memorable logo centered around your character—perfect for book covers, branded merchandise, and social channels.",
                },
                {
                    title: "Branded Social Media Content",
                    text: "Engage fans regularly with short-form videos, custom posts, and story highlights that let your storybook characters interact directly with readers.",
                },
                {
                    title: "Interactive Character Website",
                    text: "Build an immersive online digital hub for your characters complete with fun activity sheets, video showcases, and upcoming news for young readers.",
                },
            ],
        },
        process: {
            heading: "Our Seamless 4-Step Author & Character Branding Journey!",
            description: "Every branding project follows a clear, friendly process so you always know what happens next.",
            steps: [
                {
                    title: "Story & Audience Discovery",
                    text: "We dive deep into your manuscript, explore your target reading demographic, and uncover the unique traits that make your characters extraordinary.",
                },
                {
                    title: "Initial Visual Concepts & Identity Drafting",
                    text: "We present creative brand directions, character logos, and product design concepts for you to review and choose your favorite path.",
                },
                {
                    title: "Creative Refinement & Perfection",
                    text: "Your chosen branding direction is meticulously polished and tweaked until every logo line, color shade, and character detail feels perfectly right.",
                },
                {
                    title: "Final Master Brand Kit & Guidelines",
                    text: "You receive a complete digital asset package featuring high-resolution logo files, custom color palettes, typography specifications, and clear style usage guidelines.",
                },
            ],
        },
        related: {
            eyebrow: "More in Author & Character Branding",
            heading: "Explore More Ways to Monetize and Elevate Your Character Brand!",
            viewAll: "View All Branding Services",
            cards: {
                "character-merchandise-design": {
                    title: "Character Merchandise & Product Design",
                    text: "Bring your storybook figures to life through custom apparel, plush toys, stationaries, and branded physical merchandise young fans love.",
                },
                "educational-materials-printable-activities": {
                    title: "Educational Materials & Printable Activities",
                    text: "Engage parents and teachers with custom activity packs, coloring sheets, and lesson guides featuring your beloved story characters.",
                },
                "character-licensing-commercial-development": {
                    title: "Character Licensing & Commercial Development",
                    text: "Unlock new revenue streams by preparing your character assets for media adaptations, commercial licensing, and brand partnerships.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert responses to the inquiries authors raise most frequently regarding our author and character branding services.",
            sideHeading: "Do You Have More Questions?",
            sideText: "Can't find the answer you're looking for? Our supportive team is always happy to talk through your book and answer any questions you have.",
            sideCta: "Contact Us",
            items: [
                {
                    q: "Why is building a distinct brand essential for a children's book author?",
                    a: "A recognizable author and character brand sets your books apart on store shelves, builds instant trust with parents and educators, and creates seamless opportunities for merchandise and media expansion.",
                },
                {
                    q: "Can your team design custom merchandise concepts for my characters?",
                    a: "Yes, absolutely! We craft branded merchandise designs—including plush toy mockups, custom apparel, bookmarks, and stationery—ready for production and distribution.",
                },
                {
                    q: "Will I retain full ownership of my brand assets, character logos, and style guides?",
                    a: "Yes, 100%. Upon final delivery, you hold complete copyright and ownership over all custom logos, graphic files, color codes, and brand identity kits.",
                },
                {
                    q: "Can you create downloadable activity sheets and interactive content for my author site?",
                    a: "Definitely! We design print-ready coloring sheets, maze puzzles, lesson plans, and interactive activity guides featuring your characters to keep young readers engaged.",
                },
                {
                    q: "How do you assist authors in preparing character assets for commercial licensing?",
                    a: "We organize high-resolution character turnarounds, comprehensive style guides, and pitch decks to present your character IP professionally to prospective licensing partners.",
                },
            ],
        },
    },
    "character-merchandise-design": {
        summary: "Plush toys, clothing, stickers and posters designed around your characters, with files ready for manufacturers.",
        points: ["Product Range Design", "Stickers & Posters"],
        hero: {
            eyebrow: "Author & Character Branding",
            title: "Create Factory-Ready Plushies, Apparel, and Collectibles That Sell!",
            description: "Turn your illustrated book characters into physical products—from soft plushies and custom apparel to stickers and collectible posters—complete with production-ready file formats crafted for manufacturing partners.",
            cta: "Claim Your Merchandise Quote",
        },
        about: {
            eyebrow: "Character Merchandise & Design",
            heading: "Expand Your Character Brand Beyond the Book Page!",
            paragraphs: [
                "Bring your storybook figures to life through custom apparel, soft plush toys, vibrant stickers, and decorative posters—crafted with factory-ready digital files formatted for direct manufacturing.",
                "The most iconic children's story characters thrive in the physical world far beyond the final chapter. We assist authors in designing cohesive, recognizable product lines for themselves and their illustrated characters—developing custom logos, interactive activity packs, plush toys, and branded merchandise that keep young readers and families continuously engaged.",
            ],
            points: [
                "Custom Product Range & Merchandise Design",
                "Print-Ready Sticker Packs & Illustrated Posters",
            ],
            cta: "Start Your Merch Design Today",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Factory-Ready Physical Assets Built to Expand Your Publishing Brand!",
            items: [
                {
                    title: "Custom Character Merchandise",
                    text: "Transform beloved story characters into physical collectibles like plush toys, apparel, mugs, and keepsakes that fans can treasure at home.",
                },
                {
                    title: "Professional Product & Packaging Design",
                    text: "Receive production-ready artwork layouts for toys, apparel, and gifts designed to stand out on retail store shelves and online shops.",
                },
                {
                    title: "Branded Sticker Collections",
                    text: "Delight young readers with adorable, high-quality character sticker sheets perfect for school rewards, promotional giveaways, and event favors.",
                },
                {
                    title: "Vibrant Illustrated Wall Posters",
                    text: "Eye-catching, full-color art posters featuring your character universe, ideal for decorating classrooms, children's bedrooms, and book signings",
                },
            ],
        },
        process: {
            heading: "Our 4-Step Character Merchandise Design Roadmap!",
            description: "Every merchandise design project follows a smooth, friendly process so you always know what happens next",
            steps: [
                {
                    title: "Character & Product Discovery",
                    text: "We analyze your character illustrations, target reading demographic, and story universe to identify the most lucrative and exciting merchandise opportunities.",
                },
                {
                    title: "Merchandise Concepts & Product Mockups",
                    text: "We present creative product ideas, plushie sketches, apparel layouts, and sticker concepts for you to review and select your favorites.",
                },
                {
                    title: "Detailed Refinement & Polishing",
                    text: "Your chosen merchandise designs are meticulously refined and adjusted until every line, color shade, and dimension looks and feels production-ready.",
                },
                {
                    title: "Manufacturer-Ready Product Kit",
                    text: "You receive a comprehensive package featuring high-resolution production files, die-cut layouts, and exact color codes ready for your manufacturing partners",
                },
            ],
        },
        related: {
            eyebrow: "More in Author & Character Branding",
            heading: "Discover Additional Creative Branding Solutions for Your Books!",
            viewAll: "View All Branding Services",
            cards: {
                "author-character-branding": {
                    title: "Author & Character Branding",
                    text: "Develop an unforgettable author presence and unified character world that captures readers' hearts from the very first glance.",
                },
                "educational-materials-printable-activities": {
                    title: "Educational Materials & Printable Activities",
                    text: "Delight teachers and young fans with custom activity sheets, coloring books, and classroom learning guides tailored specifically to your stories.",
                },
                "character-licensing-commercial-development": {
                    title: "Character Licensing & Commercial Development",
                    text: "Prepare your intellectual property for exciting media partnerships, global merchandising agreements, and large-scale commercial expansion.",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert responses to the inquiries authors raise most frequently regarding our character merchandise and design solutions.",
            sideHeading: "Do You Have More Questions?",
            sideText: "Can't find the specific answer you are looking for? Our friendly team is always delighted to discuss your story and answer any questions you might have.",
            sideCta: "Contact Us",
            items: [
                {
                    q: "Why is developing a branded identity crucial for creators of children's books?",
                    a: "Establishing a cohesive brand makes your titles instantly recognizable on shelves, helps loyal readers discover your upcoming releases, and opens doors to exciting licensing and merchandise ventures.",
                },
                {
                    q: "Do you handle custom merchandise creation for unique story characters?",
                    a: "Yes, absolutely! We craft production-ready artwork layouts for custom items such as soft plush toys, apparel, sticker sheets, and wall prints tailored specifically for your manufacturing partners.",
                },
                {
                    q: "Will I retain full ownership and rights over all my custom brand assets?",
                    a: "Yes, 100%. Upon project completion, you hold complete copyright and full ownership of all custom logos, graphic files, style guides, and merchandise designs.",
                },
                {
                    q: "Can your creative team design downloadable activities for my author website?",
                    a: "Definitely! We design print-ready coloring pages, puzzle sheets, and interactive activity guides featuring your characters to keep young fans engaged long after they finish reading.",
                },
                {
                    q: "How do you support authors getting ready for commercial character licensing?",
                    a: "We assemble high-resolution character turnarounds, comprehensive style guides, and professional pitch assets to present your intellectual property seamlessly to commercial partners.",
                },
            ],
        },
    },
    "educational-materials-printable-activities": {
        summary: "Colouring pages, activity books, worksheets and teacher resources that turn your story into learning and play.",
        points: ["Activity & Colouring Books", "Classroom Resources"],
        hero: {
            eyebrow: "Author & Character Branding",
            title: "Blend Storytelling with Learning Through Captivating Classroom Printables!",
            description: "Transform your narrative into immersive educational experiences—featuring custom coloring pages, interactive activity books, classroom worksheets, and valuable teacher resources designed to make learning fun.",
            cta: "Claim Your Educational Design Quote",
        },
        about: {
            eyebrow: "Educational Materials & Printable Activities",
            heading: "Turn Your Characters into Classroom Adventures That Kids Love!",
            paragraphs: [
                "Create captivating coloring sheets, interactive activity books, classroom worksheets, and educator resources that seamlessly blend storytelling with engaging educational play",
                "The most cherished children's literary figures thrive far beyond the initial book chapter. Here at Toon Haus Publishing, we help authors build an unforgettable brand presence by designing custom activity tools and educational printables that keep families and teachers continuously connected to your world.",
            ],
            points: [
                "Custom Activity & Coloring Books",
                "Professional Classroom Resources & Lesson Guides",
            ],
            cta: "Start Your Educational Design",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Complete Deliverables Included in Our Educational Materials Package!",
            items: [
                {
                    title: "Custom Coloring Pages",
                    text: "Delightful, character-driven coloring sheets designed for children to print, color, and bring to life at home or in the classroom.",
                },
                {
                    title: "Interactive Activity Books",
                    text: "Immersive activity books packed with engaging puzzles, challenging mazes, and fun games starring your unique characters.",
                },
                {
                    title: "Curriculum-Ready Worksheets",
                    text: "Thoughtfully crafted educational worksheets that translate your story's themes into practical classroom lessons for teachers.",
                },
                {
                    title: "Printable Family Activities & Crafts",
                    text: "Downloadable hands-on crafts, interactive games, and creative activities that keep families actively connected to your story world.",
                },
                {
                    title: "Comprehensive Educational Materials",
                    text: "Professional teacher guides, structured lesson plans, and supplementary reading resources built directly around your published book",
                },
            ],
        },
        related: {
            eyebrow: "More in Author & Character Branding",
            heading: "Explore Related Services Built to Grow Your Character Universe!",
            viewAll: "View All Branding Services",
            cards: {
                "author-character-branding": {
                    title: "Author & Character Branding",
                    text: "Craft an enduring, recognizable author presence and unified character world that captures readers' hearts from the very first glance.",
                },
                "character-merchandise-design": {
                    title: "Character Merchandise & Design",
                    text: "Transform your charming story figures into tangible physical products, plush toys, and custom apparel that young fans love.",
                },
                "character-licensing-commercial-development": {
                    title: "Character Licensing & Commercial Development",
                    text: "Prepare your unique intellectual property for exciting media partnerships, global merchandising agreements, and large-scale commercial expansion",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Comprehensive expert responses to the inquiries authors raise most frequently regarding our educational materials and printable activity design services.",
            sideHeading: "Do You Have More Questions?",
            sideText: "Can't find the specific answer you are looking for? Our friendly team is always delighted to discuss your story and answer any questions you might have.",
            sideCta: "Contact Us",
            items: [
                {
                    q: "Why are educational printables and interactive activity sheets valuable for a children's book author?",
                    a: "They effectively bridge the gap between storytelling and active learning. They provide teachers, parents, and young readers with engaging, hands-on ways to connect with your characters far beyond the book page.",
                },
                {
                    q: "Can you create custom activity books or classroom worksheets based on my story's plot?",
                    a: "Yes, absolutely! We design bespoke coloring pages, challenging mazes, word searches, and curriculum-aligned worksheets tailored precisely to your book's unique themes and characters.",
                },
                {
                    q: "Will I retain full ownership and copyright over the educational printables created for my book?",
                    a: "Yes, 100%. Once the project is complete, you hold complete ownership and full copyright over all downloadable PDF files, activity books, and graphic assets.",
                },
                {
                    q: "Can these printable activities be easily integrated into my author website or email newsletter?",
                    a: "Definitely! We provide web-optimized PDF formats that you can seamlessly offer as free subscriber lead magnets, digital downloads, or classroom resources directly on your site.",
                },
                {
                    q: "How do you design these materials to support young readers and educators?",
                    a: "Our creative team crafts interactive activity materials keeping developmental milestones in mind. This makes them ideal for structured classroom integration, homeschooling environments, and fun family activities.",
                },
            ],
        },
    },
    "character-licensing-commercial-development": {
        summary: "Prepare your characters for licensing deals and commercial growth, with style guides, pitch materials and merchandise planning.",
        points: ["Licensing Style Guides", "Merchandise Planning"],
        hero: {
            eyebrow: "Author & Character Branding",
            title: "Turn Your Story IP into Profitable Brand Deals and Commercial Ventures!",
            description: "Position your unique story characters for high-value licensing agreements and long-term commercial growth—equipping you with professional style guides, compelling pitch materials, and strategic merchandise planning",
            cta: "Claim Your Licensing Quote",
        },
        about: {
            eyebrow: "Character Licensing & Commercial Development",
            heading: "Turn Your Book Characters into Profitable Global Brands!",
            paragraphs: [
                "Position your unique story characters for lucrative licensing opportunities and extensive commercial expansion—providing you with expert style guides, compelling pitch assets, and strategic product planning",
                "The most memorable children's story figures create impact long after the final chapter is read. At Toon Haus Publishing, we empower authors to establish an enduring commercial brand identity for themselves and their characters, offering professional logos, interactive content, custom merchandise planning, and strategies that keep families continuously engaged",
            ],
            points: [
                "Professional Licensing Style Guides",
                "Strategic Merchandise Planning & Pitch Kits",
            ],
            cta: "Start Your Licensing Journey",
        },
        includes: {
            eyebrow: "What's Included",
            heading: "Everything You Need to Secure Lucrative Licensing Deals and Product Lines!",
            items: [
                {
                    title: "Professional Licensing Preparation",
                    text: "Equip your characters for high-value commercial agreements utilizing detailed style guides, comprehensive artwork libraries, and persuasive pitch materials.",
                },
                {
                    title: "Strategic Merchandise Planning & Development",
                    text: "Strategize which physical items to produce, connect with ideal manufacturing partners, and construct a cohesive product line that evolves alongside your characters",
                },
            ],
        },
        process: {
            heading: "From Story Discovery to Lucrative Global Licensing Kits!",
            description: "Every licensing development project follows a smooth, collaborative process so you always know what happens next.",
            steps: [
                {
                    title: "IP & Character Discovery",
                    text: "We examine your story universe, assess your unique character assets, and identify optimal commercial avenues for high-value licensing.",
                },
                {
                    title: "Licensing Concepts & Pitch Layouts",
                    text: "We design professional style guide concepts, comprehensive artwork libraries, and compelling pitch materials tailored for prospective brand partners.",
                },
                {
                    title: "Strategic Refinement & Style Guide Polish",
                    text: "Your preferred licensing direction is thoroughly refined and polished until every brand asset and usage guideline is investor-ready.",
                },
                {
                    title: "Complete Licensing & Asset Kit",
                    text: "You receive a comprehensive commercial toolkit complete with high-resolution style files, brand guidelines, and professional pitch decks",
                },
            ],
        },
        related: {
            eyebrow: "More in Author & Character Branding",
            heading: "Browse Our Comprehensive Suite of Author and Character Services!",
            viewAll: "View All Branding Services",
            cards: {
                "author-character-branding": {
                    title: "Author & Character Branding",
                    text: "Establish a memorable author identity and cohesive character universe that captivates your reading audience right from the start.",
                },
                "character-merchandise-design": {
                    title: "Character Merchandise & Design",
                    text: "Turn your beloved story figures into tangible products, custom apparel, and exciting collectibles that fans can take home.",
                },
                "educational-materials-printable-activities": {
                    title: "Educational Materials & Printable Activities",
                    text: "Engage teachers, parents, and young readers with custom activity books, classroom worksheets, and interactive learning resources",
                },
            },
        },
        faq: {
            heading: "Frequently Asked Questions",
            description: "Expert answers to the inquiries authors raise most frequently regarding our character licensing and commercial development solutions.",
            sideHeading: "Do You Have More Questions?",
            sideText: "Can't find the specific answer you are looking for? Our friendly team is always delighted to discuss your story and answer any questions you might have.",
            sideCta: "Contact Us",
            items: [
                {
                    q: "Why is developing a branded identity crucial for creators of children's books?",
                    a: "Establishing a cohesive brand makes your titles instantly recognizable on shelves, helps loyal readers discover your upcoming releases, and opens doors to exciting licensing and merchandise ventures.",
                },
                {
                    q: "What deliverables are included in your character licensing preparation?",
                    a: "We compile comprehensive style guides, high-resolution artwork libraries, and persuasive pitch materials designed to showcase your story intellectual property to major commercial partners.",
                },
                {
                    q: "Do I retain full ownership and rights over my character brand assets and IP?",
                    a: "Yes, 100%. You retain complete ownership and copyright of your intellectual property, while we provide the professional asset kits needed to secure lucrative agreements.",
                },
                {
                    q: "Can you assist with strategic merchandise planning alongside commercial development?",
                    a: "Definitely! We help you identify ideal physical products, connect with trusted manufacturing partners, and construct a scalable product strategy that grows alongside your characters.",
                },
                {
                    q: "How do I know if my character universe is ready to enter the licensing market?",
                    a: "If your characters possess distinct visual appeal and an engaged reader following, our team can evaluate your IP and build the professional pitch decks required to approach global licensing agencies.",
                },
            ],
        },
    },
};