import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/component/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About/page";
import Portfolio from "@/pages/PortfolioPage/page";
import Blogs from "@/pages/Blogs/page";
import BookCoverDesign from "@/pages/InnerServices/Book-Cover-Design/page";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="blog" element={<Blogs />} />
        <Route path="services/book-cover-design" element={<BookCoverDesign />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}