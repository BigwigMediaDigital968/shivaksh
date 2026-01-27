"use client";

import Image from "next/image";
import Link from "next/link";

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
    <section className="bg-white border-b border-[var(--border-color)]">
      <div className="w-11/12 md:w-5/6 mx-auto py-16 ">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8  mt-[-25]">
          <div className="max-w-2xl  mt-[-2]">
            <p className="text-xl tracking-[0.2em] uppercase
                text-[var(--primary-color)]
                font-body font-semibold">
              Featured Projects
            </p>
            <h2 className="mt-2 pt-3 text-3xl md:text-5xl font-bold font-heading text-[var(--text-primary)]">
              Where comfort meets craft
            </h2>
            <p className="mt-5 pt-4 text-[var(--text-muted)] font-bold text-lg  font-body leading-relaxed text-justify">
              A curated shortlist of verified developments—picked for location,
              build quality, and long-term value. (Slightly more modern + minimal
              than the reference theme.)
            </p>
          </div>

          <Link href="/projects" className="shrink-0 text-2xl">
            <ButtonFill text="View all projects" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, idx) => (
            <Link
              key={idx}
              href="/projects"
              className="group border border-[var(--border-color)] bg-[var(--secondary-bg)] overflow-hidden"
            >
              <div className="relative h-[240px]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs tracking-[0.25em] uppercase text-white/80">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-heading text-xl">{p.name}</h3>
                  <p className="mt-1 text-sm text-white/80">{p.place}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

