import { useCallback, useMemo, useState, type ReactNode } from "react";
import { LeadModalContext, type LeadModalOptions } from "./LeadModalContext";
import LeadModal from "./LeadModal";

export default function LeadModalProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<LeadModalOptions>({});

    const openLeadModal = useCallback((opts: LeadModalOptions = {}) => {
        setOptions(opts);
        setOpen(true);
    }, []);

    const closeLeadModal = useCallback(() => setOpen(false), []);

    const value = useMemo(() => ({ openLeadModal, closeLeadModal }), [openLeadModal, closeLeadModal]);

    return (
        <LeadModalContext.Provider value={value}>
            {children}
            <LeadModal open={open} options={options} onClose={closeLeadModal} />
        </LeadModalContext.Provider>
    );
}