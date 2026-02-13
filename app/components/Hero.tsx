"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PopupForm from "./Popup";

const slides = [
  {
    tag: "Premium Real Estate",
    title: "Spaces That Reflect\nYour Way of Living",
    desc: "Curated homes, prime plots, and investment opportunities in high-growth locations.",
  },
  {
    tag: "Luxury Living",
    title: "Designed for Comfort\nBuilt for the Future",
    desc: "Thoughtfully planned residences offering lifestyle, security, and long-term value.",
  },
  {
    tag: "Trusted Developments",
    title: "Invest with Confidence\nLive with Pride",
    desc: "A portfolio of verified projects across the most promising destinations.",
  },
  {
    tag: "Modern & Confident",
    title: "Clarity in Every Property Decision",
    desc: "From first consultation to final handover, we deliver honest guidance and structured support at every step.",
  },
  {
    tag: "Expert Guidance",
    title: "Your Journey to the Perfect Home\nStarts Here",
    desc: "Personalized advice, market insights, and end-to-end support for buyers and investors.",
  },
  {
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

        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/Herovideo.mp4" type="video/mp4" />
          </video>

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
                className="px-3 md:px-9 py-2 md:py-4 bg-[var(--primary-color)] text-[var(--primary-bg)] font-semibold tracking-wide hover:opacity-90 transition"
              >
                View Projects
              </Link>

              <button
                onClick={() => setOpenForm(true)}
                className="cursor-pointer px-3 md:px-9 py-2 md:py-4 border border-white/60 text-white font-semibold tracking-wide hover:bg-white hover:text-black transition"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        {/* ARROWS */}
        <button
          onClick={prevSlide}
          className="hidden md:block absolute md:left-2 lg:left-6 top-1/2 -translate-y-1/2 z-30 text-[var(--primary-color)]/70 hover:text-[var(--primary-color)] transition"
        >
          <ChevronLeft size={72} />
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:block absolute md:right-2 lg:right-6 top-1/2 -translate-y-1/2 z-30 text-[var(--primary-color)]/70 hover:text-[var(--primary-color)] transition"
        >
          <ChevronRight size={72} />
        </button>

        {/* ANIMATIONS */}
        <style jsx>{`
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
            from { opacity: 0; }
            to { opacity: 1; }
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
            from { transform: translateX(-100%); }
            to { transform: translateX(100%); }
          }
        `}</style>
      </section>

      <PopupForm open={openForm} onClose={() => setOpenForm(false)} />
    </>
  );
}
