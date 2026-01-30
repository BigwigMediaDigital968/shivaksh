"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import proj1 from "../../assets/h8_pic5.jpg";
import proj2 from "../../assets/hero/hero2.jpg";
import proj3 from "../../assets/hero/hero3.jpg";
import proj4 from "../../assets/hero/hero1.jpg";
import ButtonFill from "../Button";

const projects = [
  { name: "Riverside Residences", place: "Gurugram, India", image: proj1 },
  { name: "Skyline Central", place: "Delhi NCR, India", image: proj2 },
  { name: "Gardenia Enclave", place: "Noida, India", image: proj3 },
  { name: "Centre Park Towers", place: "Gurugram, India", image: proj4 },
];

export default function FeaturedProjects() {
  return (
<section
  className="relative bg-center bg-cover py-24"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop')",
  }}
>
  {/* Gradient overlay for readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

  <div className="relative w-11/12 md:w-5/6 mx-auto">
    {/* CONTENT HEADER */}
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-14">
      {/* Glass content box */}
      <div className="max-w-2xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <p className="uppercase tracking-[0.3em] text-yellow-400 font-bold text-sm">
          Featured Projects
        </p>

        <h2 className="mt-3 text-3xl md:text-5xl font-bold font-heading text-white leading-tight">
          Where comfort meets craft
        </h2>

        <p className="mt-5 text-white/90 font-body text-lg leading-relaxed">
          A curated shortlist of verified developments—picked for location,
          build quality, and long-term value. Experience modern minimalism with
          premium design.
        </p>
      </div>

      <Link href="/projects" className="shrink-0">
        <ButtonFill text="View all projects" />
      </Link>
    </div>

    {/* PROJECT GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {projects.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: idx * 0.2 }}
        >
          <Link
            href="/projects"
            className="group relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-lg bg-white/10 hover:scale-105 transition-transform duration-500 shadow-xl"
          >
            <div className="relative h-[240px]">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Card overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs tracking-[0.25em] uppercase text-white/70">
                  {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-heading text-xl">{p.name}</h3>
                <p className="mt-1 text-sm text-white/80">{p.place}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
</section>

  );
}
