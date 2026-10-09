import { ENV } from "@/data/Site";

export type Lead = {
    name: string;
    email: string;
    phone_number: string;
    message: string;
};

export async function submitLead(lead: Lead) {
    if (!ENV.leadEndpoint) throw new Error("Lead endpoint is not configured");

    const res = await fetch(ENV.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
            name: lead.name.trim(),
            email: lead.email.trim(),
            phone_number: lead.phone_number.trim(),
            message: lead.message.trim(),
        }),
    });

    let data: { message?: string } | null = null;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) throw new Error(data?.message || `Request failed: ${res.status}`);
    return data;
}