"use client";

import { useEffect, useRef, useState } from "react";

const points = [
  {
    title: "Verified & Genuine Listings",
    desc: "Every property is thoroughly verified for ownership, approvals, and market authenticity before being presented to you.",
  },
  {
    title: "Deep Local Market Expertise",
    desc: "Years of on-ground experience across prime and emerging locations help us guide you with clarity and confidence.",
  },
  {
    title: "Transparent & Ethical Dealings",
    desc: "No hidden charges, no misleading promises — just honest advice aligned with your best interests.",
  },
  {
    title: "End-to-End Assistance",
    desc: "From shortlisting and site visits to negotiations, documentation, and possession — we manage it all.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-[#0f2d1f]/90" />

      <div className="relative w-11/12 md:w-5/6 mx-auto">

        {/* HEADER BOX */}
        <div className="max-w-2xl mb-20 backdrop-blur-xl bg-black/40 p-12 rounded-3xl border border-white/15 shadow-2xl">
          <p className="text-sm tracking-[0.3em] uppercase text-yellow-400 font-semibold">
            Why Choose Us
          </p>

          <h2 className="mt-6 text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight">
            Real Estate Decisions <br /> Built on Trust
          </h2>

          {/* STATS */}
          <div
            className={`mt-10 grid grid-cols-2 gap-6 max-w-md transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="border border-white/20 p-6 rounded-2xl bg-black/50">
              <p className="font-heading text-4xl text-yellow-400">10+</p>
              <p className="mt-1 text-sm text-white/70">
                Years of Experience
              </p>
            </div>

            <div className="border border-white/20 p-6 rounded-2xl bg-black/50">
              <p className="font-heading text-4xl text-yellow-400">500+</p>
              <p className="mt-1 text-sm text-white/70">
                Verified Listings
              </p>
            </div>
          </div>
        </div>

        {/* POINTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((item, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 0.15}s` }}
              className={`backdrop-blur-xl bg-black/40 p-8 rounded-3xl border border-white/15 shadow-xl transition-all duration-500
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
                hover:-translate-y-1 hover:border-[var(--primary-color)]
              `}
            >
              <p className="font-heading text-4xl text-white/20 mb-4">
                {String(i + 1).padStart(2, "0")}
              </p>

              <h3 className="font-heading text-xl font-bold text-white mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-white/80 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
