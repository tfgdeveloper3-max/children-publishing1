import { createContext, useContext } from "react";

export type LeadModalOptions = {
    title?: string;
    subtitle?: string;
    service?: string;
};

export type LeadModalContextValue = {
    openLeadModal: (options?: LeadModalOptions) => void;
    closeLeadModal: () => void;
};

export const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
    const ctx = useContext(LeadModalContext);
    if (!ctx) throw new Error("useLeadModal must be used inside <LeadModalProvider>");
    return ctx;
}