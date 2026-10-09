import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { findService, findServiceByItem, serviceHref } from "@/data/services";
import { CATEGORY_CONTENT, SERVICE_CONTENT } from "@/data/serviceContent";
import ServiceHero from "@/component/InnerServices/Shared/ServiceHero";
import ServiceAbout from "@/component/InnerServices/Shared/ServiceAbout";
import ServiceIncludes from "@/component/InnerServices/Shared/ServiceIncludes";
import ServiceProcess from "@/component/InnerServices/Shared/ServiceProcess";
import ServicePartners from "@/component/InnerServices/Shared/ServicePartners";
import RelatedServices from "@/component/InnerServices/Shared/RelatedServices";
import ServiceFaq from "@/component/InnerServices/Shared/ServiceFaq";

export default function ServiceDetail() {
    const { serviceSlug = "" } = useParams();
    const found = findService(serviceSlug);

    useEffect(() => {
        if (found) document.title = `${found.service.title} | Toon Haus Publishing`;
    }, [found]);

    if (!found) {
        const parent = findServiceByItem(serviceSlug);
        return <Navigate to={parent ? serviceHref(parent.category, parent.service) : "/services"} replace />;
    }

    const { category, service } = found;
    const cat = CATEGORY_CONTENT[category.slug];
    const content = SERVICE_CONTENT[serviceSlug];

    return (
        <>
            <ServiceHero eyebrow={category.label} title={service.title} description={content.summary} bg={cat.heroBg} />
            <ServiceAbout
                eyebrow={service.title}
                heading={cat.aboutHeading}
                paragraphs={[content.summary, cat.about]}
                points={content.points}
                image={cat.aboutImage}
                imageAlt={`${service.title} by Toon Haus Publishing`}
            />
            <ServicePartners />
            <ServiceIncludes title={service.title} items={service.includes} />
            <ServiceProcess
                heading={cat.processHeading}
                description="Every project follows a simple, friendly process so you always know what happens next."
                steps={cat.process}
            />
            <RelatedServices category={category} current={service} />
            <ServiceFaq items={cat.faqs} description={`Answers to the questions authors ask most about ${service.title.toLowerCase()}.`} />
        </>
    );
}