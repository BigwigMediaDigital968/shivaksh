"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import PopupForm from "./components/Popup";
import Footer from "./components/Footer";
import MiniNavbar from "./components/MiniNavbar";

export default function Home() {
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });

    const timer = setTimeout(() => {
      setOpenPopup(true);
    }, 1500);

    // Cleanup (important)
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <MiniNavbar />
      <Navbar />
      <HeroSlider />
      <Footer />
      <PopupForm open={openPopup} onClose={() => setOpenPopup(false)} />
    </div>
  );
}
