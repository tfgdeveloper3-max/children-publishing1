import { Fragment, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { findService, findServiceByItem, serviceHref } from "@/data/services";
import { CATEGORY_CONTENT, SERVICE_CONTENT } from "@/data/serviceContent";
import ServiceHero from "@/component/InnerServices/Shared/ServiceHero";
import ServiceAbout from "@/component/InnerServices/Shared/ServiceAbout";
import ServiceIncludes from "@/component/InnerServices/Shared/ServiceIncludes";
import ServiceWhy from "@/component/InnerServices/Shared/ServiceWhy";
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
    const { hero, about, includes, why, process, related, faq } = content;

    const includeItems = service.includes.map((item, i) => ({
        ...item,
        title: includes?.items?.[i]?.title ?? item.title,
        text: includes?.items?.[i]?.text ?? item.text,
    }));

    const steps = process
        ? process.steps.map((step, i) => ({ ...step, icon: cat.process[i % cat.process.length].icon }))
        : cat.process;

    return (
        <Fragment key={serviceSlug}>
            <ServiceHero
                eyebrow={hero?.eyebrow ?? category.label}
                title={hero?.title ?? service.title}
                crumb={service.title}
                description={hero?.description ?? content.summary}
                ctaLabel={hero?.cta}
                service={service.title}
                bg={cat.heroBg}
            />
            <ServiceAbout
                eyebrow={about?.eyebrow ?? service.title}
                heading={about?.heading ?? cat.aboutHeading}
                paragraphs={about?.paragraphs ?? [content.summary, cat.about]}
                points={about?.points ?? content.points}
                ctaLabel={about?.cta}
                service={service.title}
                image={cat.aboutImage}
                imageAlt={`${service.title} by Toon Haus Publishing`}
            />
            <ServicePartners />
            <ServiceIncludes eyebrow={includes?.eyebrow} heading={includes?.heading ?? `Everything in ${service.title}`} items={includeItems} />
            {why && <ServiceWhy eyebrow={why.eyebrow} heading={why.heading ?? "Why Authors Choose Toon Haus"} items={why.items} />}
            <ServiceProcess
                eyebrow={process?.eyebrow ?? cat.processEyebrow}
                heading={process?.heading ?? cat.processHeading}
                description={process?.description ?? cat.processDescription ?? "Every project follows a simple, friendly process so you always know what happens next."}
                steps={steps}
                highlight={cat.processHighlight}
            />
            <RelatedServices category={category} current={service} copy={related ?? cat.relatedCopy} />
            <ServiceFaq
                items={faq?.items ?? cat.faqs}
                service={service.title}
                copy={
                    faq
                        ? { eyebrow: faq.eyebrow, heading: faq.heading, description: faq.description, sideHeading: faq.sideHeading, sideText: faq.sideText, sideCta: faq.sideCta }
                        : { description: `Answers to the questions authors ask most about ${service.title.toLowerCase()}.`, ...cat.faqCopy }
                }
            />
        </Fragment>
    );
}