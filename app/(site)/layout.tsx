import type { ReactNode } from "react";
import MiniNavbar from "../components/MiniNavbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <MiniNavbar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

