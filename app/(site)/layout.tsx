import type { ReactNode } from "react";
import MiniNavbar from "../components/MiniNavbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";   
import SocialMediaIcon from "../components/SocialMediaIcon";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <MiniNavbar />
      <Navbar />
      <main>{children}</main>
      <Footer />
       <SocialMediaIcon />
      {/* <ScrollToTopButton /> */}
    </div>
  );
}

