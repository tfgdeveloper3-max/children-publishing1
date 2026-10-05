import "animate.css";
import { MotionConfig } from "motion/react";
import TopBar from "./component/Topbar";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Services from "./component/Services";
import About from "./component/AboutUs";
import Trust from "./component/Trust";
import Portfolio from "./component/Portfolio";
import Testimonials from "./component/Testimonials";
import Illustrations from "./component/illustration";
import Blog from "./component/Blogs";
import Footer from "./component/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Trust />
        <Portfolio />
        <Testimonials />
        <Illustrations />
        <Blog />
      </main>
      <Footer />
    </MotionConfig>
  );
}