"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import footerBg from "../assets/footer-bg.jpg";
import home from "../assets/contact-img.png";

export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src={footerBg}
          alt="Footer background"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[var(--primary-bg)]/70" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {/* ================= GET IN TOUCH ================= */}
        <div className="w-11/12 md:w-5/6 mx-auto py-10 border-b border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT — CONTACT DETAILS */}
            <div className="space-y-6">
              <h3 className="font-heading text-3xl mb-8">Get in touch</h3>
              {/* PHONE */}
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span className="font-body">+91 12345 67890</span>
              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span className="font-body">info@shivaksh.com</span>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-3 max-w-md">
                <MapPin size={18} className="mt-1" />
                <p className="font-body text-sm text-gray-300 leading-relaxed">
                  Lorem, ipsum dolor sit amet consectetur adipisicing. <br />
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
            </div>

            {/* RIGHT — CONTACT CTA BOX */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-6 items-center">
              {/* IMAGE */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={home} // replace with your contact image
                  alt="Contact Shivaksh"
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Let’s Talk Real Estate
                </h4>

                <p className="text-sm text-gray-300 mb-4">
                  Get expert guidance on buying, selling, or investing in
                  premium properties.
                </p>

                <Link
                  href="/contact"
                  className="inline-block px-5 py-2.5 bg-[var(--primary-color)] text-[var(--primary-bg)] text-sm font-semibold rounded-full hover:opacity-90 transition"
                >
                  Contact Us
                </Link>
              </div>
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio
                iusto tempore, asperiores ea temporibus modi perferendis, nemo
                saepe neque sapiente nulla nesciunt, ipsum alias vel nobis
                assumenda! Aperiam molestias, cupiditate, voluptas minima
                repudiandae ea quam, unde neque amet quo et!
              </p>
              {/* SOCIAL */}
              <div className="flex items-center gap-4 pt-5">
                <Link
                  href="#"
                  className="hover:text-pink-500 transition rounded-full border p-2 hover:bg-white"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </Link>

                <Link
                  href="#"
                  className="hover:text-blue-600 transition rounded-full border p-2 hover:bg-white"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </Link>

                <Link
                  href="#"
                  className="hover:text-blue-400 transition rounded-full border p-2 hover:bg-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </Link>
                <Link
                  href="#"
                  className="hover:text-red-500 transition rounded-full border p-2 hover:bg-white"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </Link>
              </div>
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
          <p>© {new Date().getFullYear()} Shivaksh. All rights reserved.</p>
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
