"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Framer Motion

import p1 from "../../assets/h8_pic5.jpg";
import p2 from "../../assets/hero/hero2.jpg";
import p3 from "../../assets/hero/hero4.jpg";
import p4 from "../../assets/hero/hero5.jpg";
import p5 from "../../assets/hero/hero6.jpg";

const items = [
  { title: "Riverside Residences", location: "Gurugram", image: p1 },
  { title: "Skyline Central", location: "Delhi NCR", image: p2 },
  { title: "Centre Park Towers", location: "Gurugram", image: p3 },
  { title: "Gardenia Enclave", location: "Noida", image: p4 },
  { title: "Golden River", location: "Faridabad", image: p5 },
];

export default function ProjectsPage() {
  return (
    <>
      {/* LUXURY BACKGROUND SECTION */}
      <section
        className="relative bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90" />

        {/* CONTENT */}
        <div className="relative z-10 pt-50 pb-28">
          <div className="w-11/12 md:w-5/6 xl:w-4/5 mx-auto">
            {/* HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              <div className="max-w-2xl">
                <p className="text-lg tracking-[0.35em] uppercase text-[#caa24d] font-medium">
                  Featured
                </p>
                <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-white">
                  Projects that feel like home
                </h2>
                <p className="mt-4 text-gray-300">
                  Handpicked developments offering lifestyle, appreciation, and
                  peace of mind.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex w-max px-7 py-3 rounded-full
                bg-[#caa24d] text-black font-semibold
                hover:opacity-90 transition"
              >
                Enquire →
              </Link>
            </motion.div>

            {/* PROJECT GRID */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {items.map((it, i) => (
                <motion.div
                  key={it.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                >
                  <Link
                    href="/contact"
                    className="group relative rounded-3xl overflow-hidden
                  bg-white/10 backdrop-blur-xl border border-white/15
                  shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                  transition-all duration-500 hover:-translate-y-3
                  hover:shadow-[0_20px_60px_rgba(202,162,77,0.3)]"
                  >
                    {/* IMAGE */}
                    <div className="relative h-[260px] overflow-hidden rounded-t-3xl">
                      <Image
                        src={it.image}
                        alt={it.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Glow Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white group-hover:text-[#caa24d] transition">
                        {it.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-300">
                        {it.location}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest text-gray-400">
                          Residential
                        </span>
                        <span className="text-sm font-medium text-[#caa24d]">
                          Enquire →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
