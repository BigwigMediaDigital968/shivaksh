"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehta",
    location: "Gurgaon",
    text: "The entire buying experience was smooth and transparent. Every property shared with us was verified.",
    date: "17/08/2025",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    location: "Delhi",
    text: "Honest guidance and deep market knowledge made the process stress-free and clear.",
    date: "01/01/2026",
    rating: 5,
  },
  {
    name: "Amit Jain",
    location: "Noida",
    text: "Professional handling from site visits to paperwork. We felt confident throughout.",
    date: "05/01/2026",
    rating: 4,
  },
  {
    name: "Pankaj Verma",
    location: "Gurgaon",
    text: "Their understanding of premium real estate and long-term value is exceptional.",
    date: "08/10/2025",
    rating: 5,
  },
  {
    name: "Ritika Sharma",
    location: "Faridabad",
    text: "No pressure, only clarity. This is how property advisory should be.",
    date:"02/02/2025",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 2) % testimonials.length);
    }, 2000); // ✅ 2 seconds

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 2 : prev - 2
    );
  };

  const visible = testimonials
    .slice(index, index + 2)
    .concat(
      index + 2 > testimonials.length
        ? testimonials.slice(0, (index + 2) % testimonials.length)
        : []
    );

  return (
    <section
      className="relative py-40 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-[#0f2d1f]/85" />

      <div className="relative w-11/12 md:w-5/6 mx-auto">
        <p className="text-sm tracking-[0.35em] uppercase text-center text-yellow-400 font-semibold">
          Testimonials
        </p>

        <h2 className="mt-6 text-4xl md:text-5xl font-heading font-extrabold text-center text-white mb-16">
          What Our Clients Say
        </h2>

        <div className="relative flex items-center gap-6">
          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            className="hidden md:flex w-12 h-12 items-center justify-center rounded-full bg-black/40 border border-white/20 text-white hover:bg-[var(--primary-color)] transition"
          >
            <ChevronLeft size={22} />
          </button>

          {/* TESTIMONIAL BOX */}
          <div className="flex-1 backdrop-blur-xl bg-black/40 border border-white/15 rounded-3xl p-8 md:p-14 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {visible.map((item, i) => (
                <div
                  key={i}
                  className="bg-black/60 border border-white/15 rounded-2xl p-6 md:p-8 shadow-xl"
                >
                  {/* ⭐ Rating */}
                  <div className="flex items-center gap-1 mb-3 text-yellow-400 text-sm">
                    {"★".repeat(item.rating ?? 5)}
                    <span className="text-white/40 ml-2">
                      ({item.rating ?? 5}.0)
                    </span>
                  </div>

                  <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
                    {item.text}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center font-bold">
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white">
                        {item.name}
                      </h4>

                      <p className="text-xs text-white/70 mt-1">
                        {item.location}
                        {item.date && (
                          <span className="ml-2 text-white/40">
                            • {item.date}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button
            onClick={() =>
              setIndex((prev) => (prev + 2) % testimonials.length)
            }
            className="hidden md:flex w-12 h-12 items-center justify-center rounded-full bg-black/40 border border-white/20 text-white hover:bg-[var(--primary-color)] transition"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
