import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useLeadModal } from "./LeadModalContext";
import type { LeadModalOptions } from "./LeadModalContext";

type Props = LeadModalOptions & {
    children?: ReactNode;
    className?: string;
    onOpen?: () => void;
};

export default function LeadButton({ children = "Start Your Project", className = "", onOpen, ...options }: Props) {
    const { openLeadModal } = useLeadModal();

    return (
        <motion.button
            type="button"
            onClick={() => {
                onOpen?.();
                openLeadModal(options);
            }}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-orange px-6 py-3 text-[12px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_-8px_rgba(209,129,9,0.75)] outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40 ${className}`}
        >
            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed border-white/90" />
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-[1100ms] ease-out group-hover:translate-x-[420%]" />
            <span className="relative">{children}</span>
        </motion.button>
    );
}