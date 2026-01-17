"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehta",
    location: "Gurgaon",
    text: "The entire buying experience was smooth and transparent. Every property shared with us was verified.",
  },
  {
    name: "Neha Kapoor",
    location: "Delhi",
    text: "Honest guidance and deep market knowledge made the process stress-free and clear.",
  },
  {
    name: "Amit Jain",
    location: "Noida",
    text: "Professional handling from site visits to paperwork. We felt confident throughout.",
  },
  {
    name: "Pankaj Verma",
    location: "Gurgaon",
    text: "Their understanding of premium real estate and long-term value is exceptional.",
  },
  {
    name: "Ritika Sharma",
    location: "Faridabad",
    text: "No pressure, only clarity. This is how property advisory should be.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 2) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 2 : prev - 2
    );
  };

  const visible = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
  ];

  return (
    <section className="bg-[var(--secondary-bg)] py-20 border-2 border-amber-500">
      <div className="w-[80%] mx-auto">

        <p className="text-2xl tracking-[0.35em] uppercase text-center font-semibold text-[var(--primary-color)]">
          Testimonials
        </p>

        <h2 className="mt-4 text-4xl md:text-5xl font-heading font-extrabold text-center text-[var(--text-primary)] mb-16">
          What Our Clients Say
        </h2>

        {/* WRAPPER FOR ARROWS + BOX */}
        <div className="relative flex items-center gap-6">

          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
            className="
              hidden md:flex
              w-12 h-12
              items-center justify-center
              rounded-full
              border border-[var(--med-border)]
              bg-white
              text-[var(--text-primary)]
              hover:bg-[var(--primary-color)]
              hover:text-white
              transition
            "
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={22} />
          </button>

          {/* TESTIMONIAL BOX */}
          {/* <div className="flex-1 bg-[var(--med-light)] border border-[var(--med-border)] rounded-3xl p-10 md:p-14 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ease-in-out">
              {visible.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-[var(--med-border)] rounded-2xl p-8 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-lg font-semibold text-[var(--text-primary)] leading-relaxed mb-6">
                    “{item.text}”
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center font-bold">
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[var(--text-primary)]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <div className="flex-1 bg-[var(--med-light)] border border-[var(--med-border)] rounded-3xl p-8 md:p-14 overflow-hidden">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ease-in-out">

    {/* First testimonial – always visible */}
    <div className="bg-white border border-[var(--med-border)] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition">
      <p className="text-base md:text-lg font-semibold text-[var(--text-primary)] leading-relaxed mb-6">
        “{visible[0].text}”
      </p>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center font-bold">
          {visible[0].name.charAt(0)}
        </div>

        <div>
          <h4 className="text-sm md:text-base font-bold text-[var(--text-primary)]">
            {visible[0].name}
          </h4>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {visible[0].location}
          </p>
        </div>
      </div>
    </div>

    {/* Second testimonial – hidden on mobile */}
    <div className="hidden md:block bg-white border border-[var(--med-border)] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition">
      <p className="text-base md:text-lg font-semibold text-[var(--text-primary)] leading-relaxed mb-6">
        “{visible[1].text}”
      </p>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center font-bold">
          {visible[1].name.charAt(0)}
        </div>

        <div>
          <h4 className="text-sm md:text-base font-bold text-[var(--text-primary)]">
            {visible[1].name}
          </h4>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {visible[1].location}
          </p>
        </div>
      </div>
    </div>

  </div>
</div>


          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
            className="
              hidden md:flex
              w-12 h-12
              items-center justify-center
              rounded-full
              border border-[var(--med-border)]
              bg-white
              text-[var(--text-primary)]
              hover:bg-[var(--primary-color)]
              hover:text-white
              transition
            "
            aria-label="Next testimonials"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
