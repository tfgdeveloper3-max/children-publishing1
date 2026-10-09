export const SITE = {
    name: "Toon Haus Publishing",
    phoneDisplay: "(949) 828-2170",
    phoneLink: "tel:+19498282170",
    email: "support@toonhauspublishing.com",
    address: {
        lines: ["2913 El Camino Real", "Tustin, CA 92782", "United States"],
        mapLink: "https://maps.google.com/?q=2913+El+Camino+Real,+Tustin,+CA+92782",
    },
    socials: {
        facebook: "",
        instagram: "",
        linkedin: "",
        youtube: "",
        twitter: "",
    },
};

export const ENV = {
    leadEndpoint: import.meta.env.VITE_LEAD_ENDPOINT as string | undefined,
    liveChatLicense: import.meta.env.VITE_LIVECHAT_LICENSE as string | undefined,
};