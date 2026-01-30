"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hero1 from "../assets/hero/hero4.jpg";
import hero2 from "../assets/hero/hero5.jpg";
import hero3 from "../assets/hero/hero6.jpg";
import hero7 from "../assets/hero/hero7.jpg";
import hero8 from "../assets/hero/hero8.jpg";
import hero9 from "../assets/hero/hero9.jpg";

import PopupForm from "./Popup";

const slides = [
  {
    image: hero7,
    tag: "Premium Real Estate",
    title: "Spaces That Reflect\nYour Way of Living",
    desc: "Curated homes, prime plots, and investment opportunities in high-growth locations.",
  },
  {
    image: hero8,
    tag: "Luxury Living",
    title: "Designed for Comfort\nBuilt for the Future",
    desc: "Thoughtfully planned residences offering lifestyle, security, and long-term value.",
  },
  {
    image: hero9,
    tag: "Trusted Developments",
    title: "Invest with Confidence\nLive with Pride",
    desc: "A portfolio of verified projects across the most promising destinations.",
  },
  {
    image: hero1,
    tag: "Modern & Confident",
    title: "Clarity in Every Property Decision",
    desc: "From first consultation to final handover, we deliver honest guidance and structured support at every step.",
  },
  {
    image: hero2,
    tag: "Expert Guidance",
    title: "Your Journey to the Perfect Home\nStarts Here",
    desc: "Personalized advice, market insights, and end-to-end support for buyers and investors.",
  },
  {
    image: hero3,
    tag: "Verified Listings",
    title: "Properties You Can Trust\nInvestments That Last",
    desc: "A handpicked selection of genuine properties backed by thorough verification and market expertise.",
  }
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const nextSlide = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setAnimating(false), 1200);
  }, [animating]);

  const prevSlide = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setAnimating(false), 1200);
  }, [animating]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <>
      <section className="relative h-[70vh] lg:h-screen w-full overflow-hidden">
        {/* IMAGE STACK */}
        <div className="absolute inset-0">
          <Image
            src={slides[index].image}
            alt="Shivaksh Real Estate"
            fill
            priority
            className="object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/25 backdrop-blur-[1px]" />

          {/* LIGHT SWEEP TRANSITION */}
          <div
            className={`absolute inset-0 pointer-events-none ${
              animating ? "animate-sweep" : ""
            }`}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-20 h-full flex items-center mt-10">
          <div className="w-11/12 md:w-5/6 mx-auto text-white">
            <span
              key={`tag-${index}`}
              className="inline-block mb-6 px-4 py-1 text-xs tracking-[0.35em] uppercase border border-white/40 animate-tag"
            >
              {slides[index].tag}
            </span>

            <h1
              key={`title-${index}`}
              className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight max-w-4xl animate-title delay-200"
            >
              {slides[index].title.split("\n").map((line, i) => (
                <span
                  key={i}
                  className={
                    i === 1 ? "text-[var(--primary-color)] block" : "block"
                  }
                >
                  {line}
                </span>
              ))}
            </h1>

            <p
              key={`desc-${index}`}
              className="mt-6 max-w-xl text-white/80 text-lg animate-desc delay-400"
            >
              {slides[index].desc}
            </p>

            <div
              key={`cta-${index}`}
              className="mt-10 flex gap-6 animate-cta delay-600"
            >
              <Link
                href="/projects"
                className="px-3 md:px-9 py-2  md:py-4 bg-[var(--primary-color)] text-[var(--primary-bg)] font-semibold tracking-wide hover:opacity-90 transition"
              >
                View Projects
              </Link>

              <button
                onClick={() => setOpenForm(true)}
                className="cursor-pointer px-3 md:px-9 py-2  md:py-4 border border-white/60 text-white font-semibold tracking-wide hover:bg-white hover:text-black transition"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        {/* ARROWS */}
        <button
          onClick={prevSlide}
          className="hidden md:block absolute md:left-2 lg:left-6 top-1/2 -translate-y-1/2 z-30   text-[var(--primary-color)]/70 hover:text-[var(--primary-color)] transition"
        >
          <ChevronLeft size={72} />
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:block absolute md:right-2 lg:right-6 top-1/2 -translate-y-1/2 z-30   text-[var(--primary-color)]/70 hover:text-[var(--primary-color)] transition"
        >
          <ChevronRight size={72} />
        </button>

        {/* ANIMATIONS */}
        <style jsx>{`
          /* TEXT ANIMATIONS */
          .animate-tag {
            animation: fadeIn 1s ease both;
          }

          .animate-title {
            animation: riseIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
          }

          .animate-desc {
            animation: riseIn 1.2s ease both;
          }

          .animate-cta {
            animation: riseIn 1.2s ease both;
          }

          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-400 {
            animation-delay: 0.4s;
          }
          .delay-600 {
            animation-delay: 0.6s;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes riseIn {
            from {
              opacity: 0;
              transform: translateY(32px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* LIGHT SWEEP */
          .animate-sweep::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              120deg,
              transparent 30%,
              rgba(255, 255, 255, 0.18),
              transparent 70%
            );
            animation: sweep 1.2s ease-in-out;
          }

          @keyframes sweep {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(100%);
            }
          }
        `}</style>
      </section>

      <section className="bg-white border-b border-[var(--border-color)]">
        <div className="w-11/12 md:w-5/6 mx-auto py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-heading text-5xl text-green-900">
                10+
              </p>
              <p className="text-xl pt-2  font-body  text-[var(--text-muted)]">
                Years of Market Experience
              </p>
            </div>

            <div>
              <p className="font-heading text-5xl  text-green-900">
                100%
              </p>
              <p className="text-xl  pt-2 font-body text-[var(--text-muted)]">
                Verified Properties
              </p>
            </div>

            <div>
              <p className="font-heading text-5xl  text-green-900">
                25+
              </p>
              <p className="text-xl  pt-2 font-body text-[var(--text-muted)]">
                Prime Locations Covered
              </p>
            </div>

            <div>
              <p className="font-heading text-5xl  text-green-900">
                24/7
              </p>
              <p className="text-xl pt-2 font-body text-[var(--text-muted)]">
                Buying & Investment Support
              </p>
            </div>
          </div>
        </div>
      </section>

<section
  className="relative py-20 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
  }}
>
  {/* Overlay for text visibility */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-[#0f2d1f]/85" />

  <div className="relative w-11/12 md:w-5/6 mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

      {/* LEFT — CONTENT */}
      <div className="max-w-xl backdrop-blur-md bg-black/30 p-10 rounded-3xl border border-white/10 shadow-2xl">
        <p className="text-sm tracking-[0.3em] uppercase text-yellow-400 font-semibold">
          Who We Are
        </p>

        <h2 className="mt-5 text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight">
          A Real Estate Advisory Built on Trust
        </h2>

        <div className="mt-8 space-y-6">
          <p className="text-white/85 text-lg font-body leading-relaxed text-justify">
            We are a boutique real estate advisory focused on premium residential,
            commercial, and investment properties. Our approach is simple — honest
            guidance, verified listings, and long-term value for our clients.
          </p>

          <p className="text-white/80 text-lg font-body leading-relaxed text-justify">
            With deep market knowledge and hands-on experience, we help buyers,
            investors, and families make confident property decisions without
            pressure or confusion.
          </p>
        </div>
      </div>

      {/* RIGHT — PHILOSOPHY CARD */}
      <div
        className="
          relative rounded-3xl p-12
          bg-[#1F3D2B]/95
          shadow-[0_40px_120px_rgba(0,0,0,0.6)]
          border border-white/10
          backdrop-blur-xl
          transition-all duration-300
          hover:-translate-y-1
        "
      >
        {/* Accent line */}
        <span className="absolute left-0 top-10 h-20 w-1 bg-[#E0B15C] rounded-full"></span>

        <h3 className="text-2xl font-extrabold text-white mb-10">
          Our Philosophy
        </h3>

        <ul className="space-y-7">
          {[
            "Transparency over transactions",
            "Verified properties only",
            "Client-first advisory approach",
            "Long-term value, not short-term sales",
          ].map((item, index) => (
            <li key={index} className="flex gap-4 text-white/90 text-lg font-semibold">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#E0B15C]"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
</section>


      <PopupForm open={openForm} onClose={() => setOpenForm(false)}  />
    </>
  );
}
