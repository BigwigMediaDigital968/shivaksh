"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSlider from "../components/Hero";
import PopupForm from "../components/Popup";
import PropertyCategories from "../components/home/PropertyCategories";
import FeaturedProjects from "../components/home/FeaturedProjects";
import WhyChooseUs from "../components/home/WhyChooseUs";
import FactsStrip from "../components/home/FactsStrip";
import Testimonials from "../components/home/Testimonial";
import ClientsStrip from "../components/home/ClientsStrip";
import QuickEnquiry from "../components/home/QuickEnquiry";
import BlogSection from "../components/home/Blog";
import FAQSection from "../components/home/Faq";
import FinalCTA from "../components/FinalCta";

export default function Home() {
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });

    const timer = setTimeout(() => setOpenPopup(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <HeroSlider />
      <FeaturedProjects />
      <PropertyCategories />
      <WhyChooseUs />
      <FactsStrip />
      <Testimonials />
      <ClientsStrip />
      {/* <QuickEnquiry /> */}
      <BlogSection />
      <FAQSection />
      <FinalCTA />
      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
    </div>
  );
}

