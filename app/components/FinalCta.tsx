"use client";

import Link from "next/link";
import footerBg from "../assets/Veedoo-pattern-light.png";
import Image from "next/image";
import { useState } from "react";
import PopupForm from "./Popup";

export default function FinalCTA() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <section className="relative bg-[var(--primary-bg)] py-12 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={footerBg}
          alt="Footer background"
          fill
          className="object-cover "
        />
        <div className="absolute inset-0 bg-[var(--primary-bg)]/70" />
      </div>

      <div className="relative w-11/12 md:w-5/6 mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
            Let’s Connect
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-heading text-white">
            Let’s Talk About Your <br className="hidden md:block" />
            Property Goals
          </h2>

          <p className="mt-6 text-[var(--text-muted)] font-body">
            Whether you’re buying, selling, or investing — get clear guidance
            backed by market insight and verified opportunities.
          </p>

          {/* CTA ACTIONS */}
          <div className="mt-10 flex flex-wrap gap-6 items-center justify-center">
            <button
              onClick={() => setOpenForm(true)}
              className="
                px-8 py-4 cursor-pointer
                bg-[var(--primary-color)]
                text-[var(--primary-bg)]
                font-semibold
                tracking-wide
                hover:opacity-90
                transition
              "
            >
              Schedule a Consultation
            </button>

            <Link
              href="/properties"
              className="
                px-8 py-4
                border border-white/40
                text-white
                font-semibold
                tracking-wide
                hover:bg-white hover:text-[var(--primary-bg)]
                transition
              "
            >
              Explore Properties
            </Link>
          </div>
        </div>
      </div>
      <PopupForm open={openForm} onClose={() => setOpenForm(false)} purpose="" />
    </section>
  );
}
