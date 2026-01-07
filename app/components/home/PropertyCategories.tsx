"use client";

import Image from "next/image";
import Link from "next/link";

import img1 from "../../assets/hero/aboutpage.jpg";
import img2 from "../../assets/hero/aboutpage.jpg";
import img3 from "../../assets/hero/aboutpage.jpg";
import img4 from "../../assets/hero/aboutpage.jpg";
import img5 from "../../assets/hero/aboutpage.jpg";
import img6 from "../../assets/hero/aboutpage.jpg";
import { useState } from "react";

const categories = [
  {
    title: "Luxury Villas & Independent Homes",
    desc: "Bespoke villas and private residences for premium living.",
    image: img1,
    link: "/properties/luxury",
  },
  {
    title: "Apartments & Builder Floors",
    desc: "Modern homes in prime and emerging locations.",
    image: img2,
    link: "/properties/apartments",
  },
  {
    title: "Commercial Spaces",
    desc: "Retail, office, and business-centric developments.",
    image: img3,
    link: "/properties/commercial",
  },
  {
    title: "Plots & Land",
    desc: "Residential and investment-ready land parcels.",
    image: img4,
    link: "/properties/plots",
  },
  {
    title: "Rentals & Leasing",
    desc: "Residential and commercial rental options.",
    image: img5,
    link: "/properties/rentals",
  },
  {
    title: "Investment Properties",
    desc: "High-growth assets with long-term ROI potential.",
    image: img6,
    link: "/properties/investment",
  },
];

const properties = [
  {
    title: "Luxury Builder Floor",
    location: "DLF Phase 2, Gurgaon",
    price: "₹3.2 Cr Onwards",
    image: img1,
    link: "/properties/luxury-builder-floor",
  },
  {
    title: "Premium 3 BHK Apartment",
    location: "Golf Course Road",
    price: "₹2.1 Cr Onwards",
    image: img2,
    link: "/properties/3bhk-golf-course",
  },
  {
    title: "Independent Villa",
    location: "Sushant Lok",
    price: "₹6.5 Cr Onwards",
    image: img3,
    link: "/properties/independent-villa",
  },
  {
    title: "Commercial Office Space",
    location: "Cyber City",
    price: "₹1.8 Cr Onwards",
    image: img4,
    link: "/properties/commercial-office",
  },
];

export default function PropertyCategoriesHover() {
  const [active, setActive] = useState(0);
  return (
    <>
      <section className="bg-[var(--secondary-bg)] py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* HEADER */}
          <div className="max-w-2xl mb-14">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
              Property Categories
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-primary)]">
              Explore Spaces That Define Your Lifestyle
            </h2>
          </div>

          {/* HOVER GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-color)]">
            {categories.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="group relative h-[260px] bg-[var(--secondary-bg)] overflow-hidden"
              >
                {/* IMAGE (hidden by default) */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* CONTENT */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div>
                    <h3
                      className="
                      font-heading text-2xl
                      text-[var(--text-primary)]
                      group-hover:text-white
                      transition-colors duration-500
                    "
                    >
                      {item.title}
                    </h3>

                    <div
                      className="
                      mt-4 h-px w-12
                      bg-[var(--primary-color)]
                      transition-all duration-500
                      group-hover:w-20
                    "
                    />

                    <p
                      className="
                      mt-4 text-sm text-white/80
                      opacity-0 translate-y-4
                      group-hover:opacity-100 group-hover:translate-y-0
                      transition-all duration-500
                      max-w-xs
                    "
                    >
                      {item.desc}
                    </p>
                  </div>

                  <span
                    className="
                    text-sm font-body tracking-wide
                    text-[var(--primary-color)]
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-500
                  "
                  >
                    View Properties →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--secondary-bg)] py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* HEADER */}
          <div className="mb-12 max-w-xl">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
              Featured Property
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-heading text-[var(--text-primary)]">
              A Curated Selection, Not a Catalogue
            </h2>
          </div>

          {/* SPOTLIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* IMAGE */}
            <div className="lg:col-span-2 relative h-[420px]">
              <Image
                key={active}
                src={properties[active].image}
                alt={properties[active].title}
                fill
                className="object-cover transition-opacity duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/30" />

              {/* INFO */}
              <div className="absolute bottom-8 left-8 text-white max-w-md">
                <h3 className="font-heading text-2xl mb-2">
                  {properties[active].title}
                </h3>
                <p className="text-sm text-white/80">
                  {properties[active].location}
                </p>

                <p className="mt-3 text-lg font-semibold text-[var(--primary-color)]">
                  {properties[active].price}
                </p>

                <Link
                  href={properties[active].link}
                  className="inline-flex items-center gap-3 mt-5 text-sm font-body text-[var(--primary-color)]"
                >
                  View Property
                  <span className="block w-8 h-px bg-[var(--primary-color)]" />
                </Link>
              </div>
            </div>

            {/* LIST */}
            <div className="space-y-4">
              {properties.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-6 py-4 border transition-all duration-300
                  ${
                    active === i
                      ? "border-[var(--primary-color)] bg-white"
                      : "border-[var(--border-color)] hover:bg-white"
                  }
                `}
                >
                  <h4 className="font-heading text-lg text-[var(--text-primary)]">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[var(--text-muted)]">
                    {item.location}
                  </p>
                </button>
              ))}

              <Link
                href="/properties"
                className="inline-flex items-center gap-2 mt-4 text-sm font-body text-[var(--primary-color)]"
              >
                Browse All Properties
                <span className="block w-6 h-px bg-[var(--primary-color)]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
