"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehta",
    location: "Gurgaon",
    text: "The entire buying experience was smooth and transparent. Every property shared with us was verified, and the guidance helped us make a confident decision.",
  },
  {
    name: "Neha Kapoor",
    location: "Delhi",
    text: "What stood out was the honesty and market knowledge. There was no pressure — only genuine advice aligned with our requirements.",
  },
  {
    name: "Amit Jain",
    location: "Noida",
    text: "From site visits to final paperwork, the process was handled professionally. We felt supported at every step.",
  },
  {
    name: "Pankaj Verma",
    location: "Gurgaon",
    text: "Their understanding of premium properties and investment value made a huge difference in our final choice.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const next = () =>
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <section className="bg-[var(--secondary-bg)] py-12">
      <div className="w-11/12 md:w-5/6 mx-auto max-w-4xl">
        {/* HEADER */}
        <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body text-center">
          Testimonials
        </p>

        <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-primary)] text-center mb-14">
          What Our Clients Say
        </h2>

        {/* TESTIMONIAL */}
        <div className="relative text-center">
          {/* GOLD ACCENT */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-12 h-1 bg-[var(--primary-color)]" />

          <blockquote
            key={active}
            className="font-heading text-2xl md:text-3xl text-[var(--text-primary)] leading-relaxed transition-opacity duration-500"
          >
            “{testimonials[active].text}”
          </blockquote>

          <p className="mt-6 text-sm font-body text-[var(--text-muted)]">
            — {testimonials[active].name}, {testimonials[active].location}
          </p>

          {/* ARROWS */}
          <div className="mt-10 flex items-center justify-center gap-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-12 h-12 flex items-center justify-center border border-[var(--border-color)] rounded-full hover:border-[var(--primary-color)] transition"
            >
              <ChevronLeft />
            </button>

            <span className="text-sm text-[var(--text-muted)] font-body">
              {active + 1} / {testimonials.length}
            </span>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-12 h-12 flex items-center justify-center border border-[var(--border-color)] rounded-full hover:border-[var(--primary-color)] transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
