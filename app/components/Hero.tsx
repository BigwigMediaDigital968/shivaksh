"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import hero1 from "../assets/hero/hero4.jpg";
import hero2 from "../assets/hero/hero5.jpg";
import hero3 from "../assets/hero/hero6.jpg";

const slides = [
  {
    image: hero1,
    tag: "Premium Real Estate",
    title: "Spaces That Reflect\nYour Way of Living",
    desc: "Curated homes, prime plots, and investment opportunities in high-growth locations.",
  },
  {
    image: hero2,
    tag: "Luxury Living",
    title: "Designed for Comfort\nBuilt for the Future",
    desc: "Thoughtfully planned residences offering lifestyle, security, and long-term value.",
  },
  {
    image: hero3,
    tag: "Trusted Developments",
    title: "Invest with Confidence\nLive with Pride",
    desc: "A portfolio of verified projects across the most promising destinations.",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const nextSlide = () => {
    if (animating) return;
    setAnimating(true);
    setIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setAnimating(false), 1200);
  };

  const prevSlide = () => {
    if (animating) return;
    setAnimating(true);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setAnimating(false), 1200);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/25" />

        {/* LIGHT SWEEP TRANSITION */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            animating ? "animate-sweep" : ""
          }`}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 h-full flex items-center">
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
              className="px-9 py-4 bg-[var(--primary-color)] text-[var(--primary-bg)] font-semibold tracking-wide hover:opacity-90 transition"
            >
              View Projects
            </Link>

            <Link
              href="/contact"
              className="px-9 py-4 border border-white/60 text-white font-semibold tracking-wide hover:bg-white hover:text-black transition"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 border border-white/40 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 border border-white/40 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition"
      >
        <ChevronRight size={22} />
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
  );
}
