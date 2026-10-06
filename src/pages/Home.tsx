import Hero from "@/component/Hero";
import Services from "@/component/Services";
import About from "@/component/AboutUs";
import Trust from "@/component/Trust";
import Testimonials from "@/component/Testimonials";
import Illustrations from "@/component/illustration";
import Blog from "@/component/Blog";
import PortfolioSection from "@/component/Portfolio";

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <About />
            <Trust />
            <PortfolioSection />
            <Testimonials />
            <Illustrations />
            <Blog />
        </>
    );
}