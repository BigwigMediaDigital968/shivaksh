"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import footerBg from "../assets/footer-bg.jpg";

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={footerBg}
          alt="Footer background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--primary-bg)]/50" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {/* ================= GET IN TOUCH ================= */}
        <div className="w-11/12 md:w-5/6 mx-auto py-16 border-b border-white/20">
          <h3 className="font-heading text-3xl mb-8">Get in touch</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* PHONE / EMAIL */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span className="font-body">
                  +91 98115 56625 / 98107 86375 / 99990 19763
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span className="font-body">sales@crownpointestates.com</span>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-1" />
              <p className="font-body text-sm text-gray-300 leading-relaxed">
                Crownpoint Estates <br />
                65, Lower Ground Floor, Akashneem Marg, <br />
                DLF City Phase-2, Gurugram, <br />
                Haryana – 122002
              </p>
            </div>

            {/* SOCIAL */}
            <div className="flex items-center gap-4">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    className="w-10 h-10 flex items-center justify-center border border-white/30 rounded-full hover:bg-white hover:text-black transition"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= LINKS ================= */}
        <div className="w-11/12 md:w-5/6 mx-auto py-16 border-b border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-10">
            {/* ABOUT */}
            <div className="lg:col-span-2 lg:max-w-md">
              <h4 className="font-heading text-lg mb-4">About Us</h4>
              <p className="font-body text-sm text-gray-300 leading-relaxed text-justify">
                Crownpoint Estates is a trusted real estate consultancy based in
                Gurugram, offering expert guidance in residential and commercial
                properties across Delhi NCR. With over 15 years of experience,
                we are known for transparency, integrity, and client-focused
                service.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div className="lg:col-span-1">
              <h4 className="font-heading text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 font-body text-sm text-gray-300">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-white">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* SERVICES */}
            <div className="lg:col-span-1">
              <h4 className="font-heading text-lg mb-4">Our Services</h4>
              <ul className="space-y-2 font-body text-sm text-gray-300">
                <li>Residential Projects</li>
                <li>Commercial Spaces</li>
                <li>Luxury Apartments</li>
                <li>Property Consulting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="w-11/12 md:w-5/6 mx-auto py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Crownpoints Estates. All rights
            reserved.
          </p>
          <p>
            Designed & Developed by{" "}
            <span className="text-white">
              <Link href="https://www.bigwigmediadigital.com">
                BigWig Media Digital
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
