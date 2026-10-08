import CoverAbout from "@/component/InnerServices/Book-Cover-Design/Cover-About";
import CoverFaq from "@/component/InnerServices/Book-Cover-Design/Cover-Faqs";
import CoverPartners from "@/component/InnerServices/Book-Cover-Design/Cover-Partners";
import CoverProcess from "@/component/InnerServices/Book-Cover-Design/Cover-Process";
import CoverTrust from "@/component/InnerServices/Book-Cover-Design/Cover-Trust";
import Hero from "@/component/InnerServices/Book-Cover-Design/Hero";


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