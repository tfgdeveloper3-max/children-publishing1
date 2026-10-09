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

export type CategoryContent = {
    heroBg: string;
    aboutImage: string;
    aboutHeading: string;
    about: string;
    processHeading: string;
    process: Step[];
    faqs: QA[];
};

export type ServiceContent = { summary: string; points: [string, string] };

const HERO_BG = "/images/Book-Cover-Design-BG.png";
const ABOUT_IMG = "/images/Cover-Designing.png";

export const CATEGORY_CONTENT: Record<string, CategoryContent> = {
    "children-s-book-creation-publishing": {
        heroBg: HERO_BG,
        aboutImage: ABOUT_IMG,
        aboutHeading: "From first idea to finished book.",
        about: "Our editors, writers and publishing specialists guide children's authors through every stage, from shaping the story to getting a polished book onto store shelves. You stay in control of your story while we handle the craft and the technical details.",
        processHeading: "How We Bring Your Book to Life",
        process: [
            { title: "Discovery Call", text: "We learn about your story, your readers and what you want the book to achieve.", icon: MessagesSquare },
            { title: "Clear Plan", text: "You get a simple plan with timelines, deliverables and a fixed price before we begin.", icon: ClipboardList },
            { title: "Create & Refine", text: "We do the work in stages and share drafts so you can give feedback at every step.", icon: PenLine },
            { title: "Publish & Launch", text: "We deliver final files and help you get the book live and into readers' hands.", icon: Rocket },
        ],
        faqs: [
            { q: "Do I keep the rights to my book?", a: "Yes. You keep full ownership and all royalties. We work for you, and every file we create is handed over to you." },
            { q: "How long does the process take?", a: "It depends on the service and the length of your book. Most projects take between two and eight weeks, and we give you a timeline before we start." },
            { q: "I'm a first-time author. Can you still help?", a: "Absolutely. Many of our authors are publishing for the first time, and we explain each step in plain language." },
            { q: "How much will it cost?", a: "Every book is different, so we quote after a short call. You get a fixed price with no hidden fees." },
            { q: "Can I ask for changes along the way?", a: "Yes. Feedback rounds are built into every project, so the result matches what you imagined." },
        ],
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
    },
    "children-s-book-editing-manuscript-review": {
        summary: "Expert editing at every level, from big-picture story structure to the final comma, so your manuscript is clear, polished and right for its young readers.",
        points: ["Structural & Line Editing", "Proofreading & Assessment"],
    },
    "children-s-book-formatting-ebook-conversion": {
        summary: "Clean, professional layouts for print and beautiful eBooks that look right on Kindle, Apple Books, Kobo and every tablet.",
        points: ["Print Interior Formatting", "Fixed & Reflowable eBooks"],
    },
    "children-s-book-publishing-isbn-services": {
        summary: "We publish your book in paperback and hardcover, handle ISBNs and copyright, and launch it on Amazon KDP so it is ready for readers everywhere.",
        points: ["Paperback, Hardcover & KDP", "ISBN & Copyright Handled"],
    },
    "children-s-book-distribution-global-publishing": {
        summary: "Reach bookstores, libraries and online shops worldwide through IngramSpark, Barnes & Noble, Apple Books, Kobo and more, all from a single setup.",
        points: ["Bookstore & Library Access", "40+ Countries Reached"],
    },
    "children-s-book-illustration-services": {
        summary: "Full-colour illustrations in the style that suits your story, from soft watercolour and playful cartoons to rich 3D scenes and immersive double-page spreads.",
        points: ["2D, 3D & Watercolour Styles", "Full Pages & Spreads"],
    },
    "character-design-development": {
        summary: "Lovable characters with distinct personalities, kept perfectly consistent on every page, with careful revisions until they feel exactly right.",
        points: ["Character Reference Sheets", "Consistent On Every Page"],
    },
    "book-cover-interior-design": {
        summary: "A cover that stands out on the shelf, interior layouts that balance pictures and text, and child-friendly typography that makes every page easy to enjoy.",
        points: ["Full Wrap Cover Design", "Layout & Typography"],
    },
    "print-ready-ebook-design-files": {
        summary: "Final files prepared exactly to printer and store specifications, with correct bleed, colour and resolution for print and sharp, light files for screens.",
        points: ["Printer-Approved Files", "Screen-Optimised eBooks"],
    },
    "2d-3d-animation-services": {
        summary: "Bring your book to life with 2D and 3D animation, from character motion and animated illustrations to full storybook and educational animations.",
        points: ["2D & 3D Animation", "Storybook & Educational"],
    },
    "book-trailers-video-content": {
        summary: "Animated trailers, YouTube story videos and short social clips that show off your book and help families discover it online.",
        points: ["30–90 Second Trailers", "YouTube & Social Ready"],
    },
    "audiobooks-narration-voiceovers": {
        summary: "Warm narration, character voices and complete audiobooks with music and sound effects, ready for Audible and every major store.",
        points: ["Professional Narrators", "Store-Ready Audiobooks"],
    },
    "interactive-animated-ebooks": {
        summary: "eBooks with moving pictures, read-along audio and tap-to-play moments that keep young readers engaged with your story.",
        points: ["Read-Along Audio", "Tap & Play Interactions"],
    },
    "amazon-book-marketing-optimization": {
        summary: "Grow your Amazon sales with ads, the right keywords and categories, and listing improvements that put your book in front of parents.",
        points: ["Amazon Ads Management", "Keywords & Categories"],
    },
    "book-launch-promotional-campaigns": {
        summary: "A planned launch with early reviews, press releases and podcast interviews that builds excitement and gives your book its strongest start.",
        points: ["Launch & Review Campaigns", "Press & Podcast Outreach"],
    },
    "social-media-influencer-marketing": {
        summary: "Reach parents, teachers and young fans on Instagram, Facebook, TikTok and YouTube, with influencer, blogger and parenting-community outreach.",
        points: ["Paid & Organic Social", "Influencer & Blogger Outreach"],
    },
    "author-website-email-marketing": {
        summary: "A professional author or book website and an email list that keeps families coming back for your next story.",
        points: ["Author & Book Websites", "Email List Growth"],
    },
    "book-fairs-libraries-bookstore-promotion": {
        summary: "Get your book seen at children's book fairs and onto library and bookstore shelves where families discover new favourites.",
        points: ["Book Fair Presence", "Library & Store Pitching"],
    },
    "school-educational-book-marketing": {
        summary: "Bring your book into classrooms and educational programmes, with school outreach and bulk-sales campaigns for larger orders.",
        points: ["School & District Outreach", "Bulk-Sales Programmes"],
    },
    "author-character-branding": {
        summary: "Build a memorable brand for yourself and your characters, with logos, social content and a website that fans recognise instantly.",
        points: ["Author & Character Brands", "Logo, Social & Website"],
    },
    "character-merchandise-design": {
        summary: "Plush toys, clothing, stickers and posters designed around your characters, with files ready for manufacturers.",
        points: ["Product Range Design", "Stickers & Posters"],
    },
    "educational-materials-printable-activities": {
        summary: "Colouring pages, activity books, worksheets and teacher resources that turn your story into learning and play.",
        points: ["Activity & Colouring Books", "Classroom Resources"],
    },
    "character-licensing-commercial-development": {
        summary: "Prepare your characters for licensing deals and commercial growth, with style guides, pitch materials and merchandise planning.",
        points: ["Licensing Style Guides", "Merchandise Planning"],
    },
};