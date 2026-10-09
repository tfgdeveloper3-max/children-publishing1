import "animate.css";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MotionConfig } from "motion/react";
import TopBar from "@/component/Topbar";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import LiveChat from "@/component/Integrations/LiveChat";
import LeadModalProvider from "@/component/LeadModal/LeadModalProvider";

function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
            return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname, hash]);

    return null;
}

export default function Layout() {
    return (
        <MotionConfig reducedMotion="user">
            <LeadModalProvider>
                <ScrollToTop />
                <TopBar />
                <Navbar />
                <main>
                    <Outlet />
                </main>
                <Footer />
                <LiveChat />
            </LeadModalProvider>
        </MotionConfig>
    );
}