
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream, mkdirSync } from "fs";
import path from "path";

const HOSTNAME = "https://toonhauspublishing.com";

const staticRoutes = [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/about", changefreq: "monthly", priority: 0.8 },
    { url: "/portfolio", changefreq: "monthly", priority: 0.8 },
    { url: "/contact", changefreq: "monthly", priority: 0.8 },
    { url: "/services", changefreq: "monthly", priority: 0.9 },
    { url: "/reviews", changefreq: "weekly", priority: 0.8 },
];

const serviceSlugs = [
    "children-s-book-creation-publishing",
    "illustration-book-design",
    "animation-interactive-content",
    "children-s-book-marketing-promotion",
    "author-character-branding",
    "book-cover-interior-design",
    "print-ready-ebook-design-files",
    "character-design-development",
    "children-s-book-illustration-services",
    "book-trailers-video-content",
    "audiobooks-narration-voiceovers",
    "interactive-animated-ebooks",
    "2d-3d-animation-services",
    "book-launch-promotional-campaigns",
    "social-media-influencer-marketing",
    "author-website-email-marketing",
    "book-fairs-libraries-bookstore-promotion",
    "school-educational-book-marketing",
    "amazon-book-marketing-optimization",
    "character-merchandise-design",
    "educational-materials-printable-activities",
    "character-licensing-commercial-development",
    "children-s-book-writing-story-development",
    "children-s-book-editing-manuscript-review",
    "children-s-book-formatting-ebook-conversion",
    "children-s-book-publishing-isbn-services",
    "children-s-book-distribution-global-publishing",
];

const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `/services/${slug}`,
    changefreq: "monthly" as const,
    priority: 0.7,
}));

const routes = [...staticRoutes, ...serviceRoutes];

async function generateSitemap() {
    const publicDir = path.resolve("./public");
    mkdirSync(publicDir, { recursive: true });

    const sitemapPath = path.join(publicDir, "sitemap.xml");
    const writeStream = createWriteStream(sitemapPath);

    const sitemapStream = new SitemapStream({
        hostname: HOSTNAME,
    });

    sitemapStream.pipe(writeStream);

    const lastmod = new Date().toISOString();

    routes.forEach((route) => {
        sitemapStream.write({
            ...route,
            lastmod,
        });
    });

    sitemapStream.end();

    await Promise.all([
        streamToPromise(sitemapStream),
        new Promise<void>((resolve, reject) => {
            writeStream.on("finish", resolve);
            writeStream.on("error", reject);
        }),
    ]);

    console.log(`Sitemap generated successfully: ${sitemapPath}`);
    console.log(`Total URLs: ${routes.length}`);
}

generateSitemap().catch((error) => {
    console.error("Error generating sitemap:", error);
    process.exitCode = 1;
});
