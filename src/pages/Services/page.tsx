import ServicesHero from "@/component/Services/Hero";
import ServicesFaq from "@/component/Services/Services-Faqs";
import ServicesPartners from "@/component/Services/Services-Partners";
import ServicesTabs from "@/component/Services/ServicesTabs";

export default function ServicesPage() {
    return (
        <>
            <ServicesHero />
            <ServicesTabs />
            <ServicesPartners />
            <ServicesFaq />
        </>
    );
}