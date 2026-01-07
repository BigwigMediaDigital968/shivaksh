"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import hero1 from "../assets/hero/hero1.jpg";
import hero2 from "../assets/hero/hero2.jpg";
import hero3 from "../assets/hero/hero3.jpg";
import Link from "next/link";

const slides = [
  {
    img: hero1,
    tag: "Lorem Ipsum Dolor",
    title: "Lorem ipsum dolor\nsit amet consectetur",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    img: hero2,
    tag: "Luxury Living",
    title: "Sed do eiusmod\ntempor incididunt",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: hero3,
    tag: "Premium Projects",
    title: "Duis aute irure\ndolor in reprehenderit",
    desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: Facebook,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    icon: Twitter,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: Instagram,
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  // ⏳ Increased stop time
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      6500
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[75vh] lg:h-screen overflow-hidden">
      {/* INLINE ANIMATION STYLES */}
      <style jsx>{`
        @keyframes luxurySlide {
          0% {
            opacity: 0;
            transform: translateX(-140px) skewX(-6deg);
            filter: blur(8px);
          }
          55% {
            opacity: 1;
            transform: translateX(24px) skewX(1.5deg);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) skewX(0);
            filter: blur(0);
          }
        }

        /* 🐢 Slower, smoother animation */
        .lux-slide {
          animation: luxurySlide 1.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Increased stagger for readability */
        .delay-1 {
          animation-delay: 0.35s;
        }
        .delay-2 {
          animation-delay: 0.65s;
        }
        .delay-3 {
          animation-delay: 0.95s;
        }
      `}</style>

      {/* BACKGROUND SLIDES */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ${
            index === i ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.img}
            alt="Luxury Real Estate"
            fill
            priority={i === 0}
            className={`object-cover transition-transform duration-[8000ms] ${
              index === i ? "scale-100" : "scale-110"
            }`}
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>
      ))}

      {/* LEFT SOCIAL ICONS */}
      <div className="absolute left-6 bottom-10 z-30 hidden md:flex flex-col gap-4 text-white">
        {socialLinks.map((item, i) => {
          const Icon = item.icon;

          return (
            <Link
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="w-10 h-10 cursor-pointer flex items-center justify-center border border-white/30 rounded-full hover:bg-white hover:text-black transition"
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="relative z-20 h-full flex items-center">
        <div className="w-11/12 md:w-5/6 mx-auto text-white">
          <p
            key={`tag-${index}`}
            className="uppercase tracking-widest text-sm mb-4 lux-slide"
          >
            {slides[index].tag}
          </p>

          <h1
            key={`title-${index}`}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 whitespace-pre-line lux-slide delay-1"
          >
            {slides[index].title}
          </h1>

          <p
            key={`desc-${index}`}
            className="max-w-xl text-gray-200 mb-10 lux-slide delay-2"
          >
            {slides[index].desc}
          </p>

          <Link href="/contact">
            <button
              key={`btn-${index}`}
              className="px-8 py-4 bg-white text-black font-semibold tracking-wide hover:bg-gray-200 transition lux-slide delay-3"
            >
              GET IN TOUCH →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
