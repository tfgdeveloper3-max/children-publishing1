import AboutFaq from "@/component/Aboutus/About-Faqs";
import AboutPartners from "@/component/Aboutus/About-Partners";
import AboutHero from "@/component/Aboutus/AboutHero";
import AboutPortfolio from "@/component/Aboutus/AboutPortfolio";
import Aboutus from "@/component/Aboutus/Aboutus";
import AboutTestimonials from "@/component/Aboutus/Testimonials";

export default function About() {
    return (
        <>
          <AboutHero />
          <Aboutus />
          <AboutPartners />
          <AboutPortfolio />
          <AboutTestimonials />
          <AboutFaq />
        </>
    );
}