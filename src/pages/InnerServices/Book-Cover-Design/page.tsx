import CoverAbout from "@/InnerServices/Book-Cover-Design/Cover-About";
import CoverFaq from "@/InnerServices/Book-Cover-Design/Cover-Faqs";
import CoverPartners from "@/InnerServices/Book-Cover-Design/Cover-Partners";
import CoverProcess from "@/InnerServices/Book-Cover-Design/Cover-Process";
import CoverTrust from "@/InnerServices/Book-Cover-Design/Cover-Trust";
import Hero from "@/InnerServices/Book-Cover-Design/Hero";

export default function BookCoverDesign() {
    return (
        <>
            <Hero />
            <CoverAbout />
            <CoverTrust />
            <CoverProcess />
            <CoverPartners />
            <CoverFaq />
        </>
    );
}