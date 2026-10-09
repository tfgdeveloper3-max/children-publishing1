import {
    Baby,
    BadgeCheck,
    Barcode,
    Book,
    BookMarked,
    BookOpen,
    Box,
    Brush,
    Building2,
    Camera,
    Clapperboard,
    ClipboardCheck,
    Columns2,
    Copyright,
    Crown,
    Download,
    Droplets,
    Feather,
    FileText,
    Film,
    Frame,
    Globe,
    GraduationCap,
    Headphones,
    Image,
    Layers,
    LayoutTemplate,
    Library,
    Mail,
    Mic,
    Monitor,
    MonitorPlay,
    MousePointerClick,
    Music,
    Newspaper,
    NotebookPen,
    Package,
    Paintbrush,
    Palette,
    PenTool,
    Pencil,
    PersonStanding,
    Podcast,
    Printer,
    Puzzle,
    RefreshCw,
    Rocket,
    Scale,
    School,
    ScrollText,
    Search,
    Share2,
    Shirt,
    ShoppingBag,
    ShoppingCart,
    Smartphone,
    Smile,
    Sparkles,
    SpellCheck,
    Star,
    Sticker,
    Store,
    Tablet,
    Ticket,
    Truck,
    Type,
    Users,
    Video,
    Volume2,
    type LucideIcon,
} from "lucide-react";

export type ServiceItem = { title: string; icon: LucideIcon; text: string };
export type Service = { title: string; icon: LucideIcon; includes: ServiceItem[]; to?: string };
export type ServiceCategory = { label: string; slug: string; services: Service[] };

export const slugify = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const serviceHref = (_category: ServiceCategory, service: Service) => service.to ?? `/services/${slugify(service.title)}`;

export const findService = (slug: string) => {
    for (const category of SERVICE_CATEGORIES) {
        const service = category.services.find((s) => slugify(s.title) === slug);
        if (service) return { category, service };
    }
    return null;
};

export const findServiceByItem = (slug: string) => {
    for (const category of SERVICE_CATEGORIES) {
        const service = category.services.find((s) => s.includes.some((i) => slugify(i.title) === slug));
        if (service) return { category, service };
    }
    return null;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
    {
        label: "Children's Book Creation & Publishing",
        slug: "children-s-book-creation-publishing",
        services: [
            {
                title: "Children's Book Writing & Story Development",
                icon: Feather,
                includes: [
                    { title: "Story development", icon: ScrollText, text: "Shape your idea into a story children will want to hear again and again, with a clear plot, lovable characters and the right message." },
                    { title: "Children's book ghostwriting", icon: Feather, text: "Have your idea written by experienced children's writers who capture your voice and keep the language fun, simple and memorable." },
                ],
            },
            {
                title: "Children's Book Editing & Manuscript Review",
                icon: SpellCheck,
                includes: [
                    { title: "Developmental editing", icon: NotebookPen, text: "Big-picture editing that strengthens your plot, pacing and characters so the whole story works from the first page to the last." },
                    { title: "Line editing", icon: Pencil, text: "Sentence-by-sentence editing that makes your writing flow, sound great when read aloud and suit the age of your readers." },
                    { title: "Copyediting & proofreading", icon: SpellCheck, text: "A careful final check for spelling, grammar, punctuation and consistency so your book is clean and professional." },
                    { title: "Manuscript assessment", icon: ClipboardCheck, text: "An honest, expert review of your manuscript with clear notes on what works, what needs attention and how to fix it." },
                ],
            },
            {
                title: "Children's Book Formatting & eBook Conversion",
                icon: LayoutTemplate,
                includes: [
                    { title: "Book formatting", icon: LayoutTemplate, text: "Professional interior formatting for print and digital, with clean layouts that make text and pictures easy to enjoy." },
                    { title: "eBook conversion", icon: Tablet, text: "Convert your book into beautiful eBooks that look right on Kindle, Apple Books, Kobo and tablets." },
                ],
            },
            {
                title: "Children's Book Publishing & ISBN Services",
                icon: BookOpen,
                includes: [
                    { title: "Paperback publishing", icon: BookOpen, text: "Get your book printed as a high-quality paperback and listed for sale, with the right trim size, paper and cover finish." },
                    { title: "Hardcover publishing", icon: Book, text: "Publish a sturdy, gift-ready hardcover edition that parents, schools and libraries love to buy." },
                    { title: "ISBN assignment", icon: Barcode, text: "We handle ISBNs for every format of your book so it can be sold, tracked and ordered by stores and libraries." },
                    { title: "Copyright registration assistance", icon: Copyright, text: "Protect your story and illustrations with guided copyright registration, prepared correctly the first time." },
                    { title: "Amazon KDP publishing", icon: ShoppingCart, text: "Launch your book on Amazon KDP with an optimised listing, correct categories and files that pass review first time." },
                ],
            },
            {
                title: "Children's Book Distribution & Global Publishing",
                icon: Globe,
                includes: [
                    { title: "IngramSpark distribution", icon: Truck, text: "Reach bookstores and libraries worldwide through IngramSpark, with your book listed in their global catalogue." },
                    { title: "Barnes & Noble distribution", icon: Store, text: "Publish your book on Barnes & Noble Press so readers can find it online and order it in store." },
                    { title: "Apple Books / Kobo distribution", icon: Smartphone, text: "Bring your eBook to Apple Books and Kobo readers around the world with listings set up for you." },
                    { title: "Global distribution", icon: Globe, text: "Make your book available in stores, libraries and online shops in dozens of countries from a single setup." },
                ],
            },
        ],
    },
    {
        label: "Illustration & Book Design",
        slug: "illustration-book-design",
        services: [
            {
                title: "Children's Book Illustration Services",
                icon: Brush,
                includes: [
                    { title: "2D illustrations", icon: Brush, text: "Bright, expressive 2D illustrations drawn to match the mood of your story and the age of your readers." },
                    { title: "3D illustrations", icon: Box, text: "Rich 3D illustrations with depth and lighting that give your book a modern, animated-film look." },
                    { title: "Watercolor-style illustrations", icon: Droplets, text: "Soft, dreamy watercolour-style art that brings a gentle, timeless feel to bedtime stories and picture books." },
                    { title: "Cartoon illustrations", icon: Sparkles, text: "Fun, bold cartoon illustrations full of energy and humour that make kids laugh and turn the page." },
                    { title: "Educational illustrations", icon: GraduationCap, text: "Clear, friendly illustrations that explain ideas, support learning and work beautifully in classrooms." },
                    { title: "Full-page illustrations", icon: Image, text: "Detailed full-page illustrations that give each moment of your story room to shine." },
                    { title: "Double-page spreads", icon: Columns2, text: "Big, immersive double-page spreads for the most exciting moments in your book." },
                ],
            },
            {
                title: "Character Design & Development",
                icon: Smile,
                includes: [
                    { title: "Character design", icon: Smile, text: "Create lovable characters with distinct personalities, expressions and poses that children will remember long after the last page." },
                    { title: "Character consistency", icon: Users, text: "Keep your characters looking the same across every page, book and product with clear reference sheets." },
                    { title: "Illustration revisions", icon: RefreshCw, text: "Update or improve existing artwork with careful revisions that keep the original style intact." },
                ],
            },
            {
                title: "Book Cover & Interior Design",
                icon: Palette,
                to: "/services/book-cover-design",
                includes: [
                    { title: "Cover design", icon: Palette, text: "A front, back and spine cover that stands out on the shelf and tells readers what your story is about." },
                    { title: "Interior layout", icon: Layers, text: "Thoughtful page layouts that balance pictures and text so every spread is easy for little readers to follow." },
                    { title: "Typography", icon: Type, text: "Child-friendly fonts and lettering that are easy to read and add personality to your book." },
                ],
            },
            {
                title: "Print-Ready & eBook Design Files",
                icon: Printer,
                includes: [
                    { title: "Print-ready files", icon: Printer, text: "Files prepared to printer specifications with correct bleed, colour profiles and resolution." },
                    { title: "eBook-ready files", icon: Download, text: "Artwork and layouts optimised for screens, so your eBook looks sharp on phones, tablets and e-readers." },
                ],
            },
        ],
    },
    {
        label: "Animation & Interactive Content",
        slug: "animation-interactive-content",
        services: [
            {
                title: "2D & 3D Animation Services",
                icon: Film,
                includes: [
                    { title: "2D animation", icon: Film, text: "Charming 2D animation that brings your illustrations and characters to life." },
                    { title: "3D animation", icon: Box, text: "Immersive 3D animation with depth, lighting and movement that feels like a family film." },
                    { title: "Character animation", icon: PersonStanding, text: "Give your characters personality in motion, with walks, waves, dances and expressions." },
                    { title: "Animated illustrations", icon: Sparkles, text: "Subtle motion added to your illustrations for websites, social posts and digital books." },
                    { title: "Storybook animation", icon: BookOpen, text: "Turn your whole book into an animated story that children can watch again and again." },
                    { title: "Educational animations", icon: GraduationCap, text: "Clear, friendly animations that explain lessons and ideas for classrooms and learning apps." },
                    { title: "Motion graphics", icon: PenTool, text: "Animated titles, text and graphics for trailers, ads, social posts and presentations." },
                ],
            },
            {
                title: "Book Trailers & Video Content",
                icon: Clapperboard,
                includes: [
                    { title: "Animated book trailers", icon: Clapperboard, text: "Short animated trailers that show off your book and make families want to read it." },
                    { title: "YouTube story videos", icon: MonitorPlay, text: "Read-aloud and animated story videos made for YouTube that grow your audience and channel." },
                    { title: "Social-media animation clips", icon: Video, text: "Short, eye-catching animated clips sized for Instagram, TikTok, Facebook and YouTube Shorts." },
                ],
            },
            {
                title: "Audiobooks, Narration & Voiceovers",
                icon: Headphones,
                includes: [
                    { title: "Character voiceovers", icon: Mic, text: "Professional voice actors who give each of your characters a unique and lovable voice." },
                    { title: "Narration", icon: Volume2, text: "Warm, engaging narration recorded by experienced readers who know how to hold young listeners." },
                    { title: "Audiobooks", icon: Headphones, text: "Complete audiobooks with narration, sound effects and music, ready for Audible and other stores." },
                ],
            },
            {
                title: "Interactive & Animated eBooks",
                icon: MousePointerClick,
                includes: [
                    { title: "Animated eBooks", icon: Tablet, text: "eBooks with moving pictures and read-along audio that make reading feel magical." },
                    { title: "Interactive children's eBooks", icon: MousePointerClick, text: "Tap, swipe and play eBooks with interactive elements that keep children engaged with the story." },
                ],
            },
        ],
    },
    {
        label: "Children's Book Marketing & Promotion",
        slug: "children-s-book-marketing-promotion",
        services: [
            {
                title: "Amazon Book Marketing & Optimization",
                icon: ShoppingCart,
                includes: [
                    { title: "Amazon marketing", icon: ShoppingCart, text: "Grow your Amazon sales with ads, listing improvements and promotions that put your book in front of buyers." },
                    { title: "Amazon keyword/category optimization", icon: Search, text: "Choose the keywords and categories that help parents find your book in Amazon searches." },
                ],
            },
            {
                title: "Book Launch & Promotional Campaigns",
                icon: Rocket,
                includes: [
                    { title: "Book launch campaigns", icon: Rocket, text: "A planned launch that builds excitement, gathers early reviews and gives your book its strongest start." },
                    { title: "Book review campaigns", icon: BadgeCheck, text: "Collect genuine reader reviews that build trust and help your book sell." },
                    { title: "Press releases", icon: Newspaper, text: "Professional press releases that announce your book to media, bloggers and local news." },
                    { title: "Podcast appearances", icon: Podcast, text: "Book interviews on parenting and author podcasts so listeners can hear the story behind your book." },
                ],
            },
            {
                title: "Social Media & Influencer Marketing",
                icon: Share2,
                includes: [
                    { title: "Social media marketing", icon: Share2, text: "Consistent, engaging social content that grows a community of parents, teachers and young fans." },
                    { title: "Instagram/Facebook campaigns", icon: Camera, text: "Targeted Instagram and Facebook campaigns that reach parents and gift buyers who love children's books." },
                    { title: "TikTok promotion", icon: Music, text: "Reach new readers on TikTok with short, fun videos and BookTok-friendly campaigns." },
                    { title: "YouTube promotion", icon: MonitorPlay, text: "Grow your book's audience on YouTube with optimised videos, ads and channel support." },
                    { title: "Influencer outreach", icon: Star, text: "Connect with parenting, education and BookTok influencers who share your book with their followers." },
                    { title: "Parenting-community outreach", icon: Baby, text: "Introduce your book to parenting groups, forums and communities where families look for recommendations." },
                    { title: "Blogger outreach", icon: FileText, text: "Get your book featured on parenting and children's book blogs that families trust." },
                ],
            },
            {
                title: "Author Website & Email Marketing",
                icon: Monitor,
                includes: [
                    { title: "Author website", icon: Monitor, text: "A professional author website that tells your story, shows your books and helps readers buy them." },
                    { title: "Children's book website", icon: Globe, text: "A playful website for your book with activities, character pages and links to buy." },
                    { title: "Email marketing", icon: Mail, text: "Build and grow an email list of families and teachers who want to hear about your next book." },
                ],
            },
            {
                title: "Book Fairs, Libraries & Bookstore Promotion",
                icon: Library,
                includes: [
                    { title: "Children's book fairs", icon: Ticket, text: "Get your book seen at children's book fairs and events where families and buyers discover new titles." },
                    { title: "Library outreach", icon: Library, text: "Help libraries discover, order and recommend your book to young readers." },
                    { title: "Bookstore outreach", icon: Store, text: "Pitch your book to independent and chain bookstores for shelf space and events." },
                ],
            },
            {
                title: "School & Educational Book Marketing",
                icon: School,
                includes: [
                    { title: "School outreach", icon: School, text: "Bring your book into classrooms with school visits, reading programmes and teacher resources." },
                    { title: "Educational institution outreach", icon: Building2, text: "Place your book with schools, districts and educational programmes looking for quality reading material." },
                    { title: "Bulk-sales campaigns", icon: Package, text: "Sell your book in larger quantities to schools, businesses and organisations." },
                ],
            },
        ],
    },
    {
        label: "Author & Character Branding",
        slug: "author-character-branding",
        services: [
            {
                title: "Author & Character Branding",
                icon: Crown,
                includes: [
                    { title: "Author branding", icon: Crown, text: "Build a memorable author brand with a clear look, voice and story that readers recognise." },
                    { title: "Character branding", icon: Smile, text: "Turn your main character into a brand with a consistent look, personality and story world." },
                    { title: "Character logo", icon: PenTool, text: "A playful, memorable logo built around your character, ready for books, merch and social media." },
                    { title: "Character social-media content", icon: Share2, text: "Regular posts, short videos and stories that let your characters speak directly to fans." },
                    { title: "Character website", icon: Monitor, text: "An interactive home for your characters with games, videos and news for young fans." },
                ],
            },
            {
                title: "Character Merchandise & Design",
                icon: Shirt,
                includes: [
                    { title: "Character merchandise", icon: Shirt, text: "Plush toys, T-shirts, mugs and more designed around your characters for fans to take home." },
                    { title: "Merchandise design", icon: ShoppingBag, text: "Product designs for toys, clothing and gifts that carry your brand onto store shelves." },
                    { title: "Stickers", icon: Sticker, text: "Cute character stickers for rewards, merchandise and book events." },
                    { title: "Posters", icon: Frame, text: "Bright posters featuring your characters for classrooms, bedrooms and book events." },
                ],
            },
            {
                title: "Educational Materials & Printable Activities",
                icon: Puzzle,
                includes: [
                    { title: "Coloring pages", icon: Paintbrush, text: "Fun colouring pages featuring your characters that children love to print and fill in." },
                    { title: "Activity books", icon: Puzzle, text: "Complete activity books with puzzles, mazes and games starring your characters." },
                    { title: "Worksheets", icon: NotebookPen, text: "Educational worksheets that turn your story into lessons teachers can use in class." },
                    { title: "Printable activities", icon: Printer, text: "Downloadable crafts, games and activities that keep families engaged with your story." },
                    { title: "Educational materials", icon: BookMarked, text: "Teacher guides, lesson plans and reading resources built around your book." },
                ],
            },
            {
                title: "Character Licensing & Commercial Development",
                icon: Scale,
                includes: [
                    { title: "Licensing preparation", icon: Scale, text: "Prepare your characters for licensing deals with style guides, artwork libraries and pitch materials." },
                    { title: "Character merchandise planning and development", icon: Package, text: "Plan which products to make, find the right manufacturing partners and build a merchandise range that grows with your characters." },
                ],
            },
        ],
    },
];