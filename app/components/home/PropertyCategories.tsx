"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Property {
  _id: string;
  title: string;
  slug: string;
  location: string;
  price?: number;
  images: string[];
  createdAt: string;
  purpose: "Buy" | "Rent" | "Sell";
}

const categories = [
  {
    title: "Apartments",
    desc: "Modern homes in prime locations, perfect for families and investors.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    link: "/properties/buy",
  },
  {
    title: "Builder Floors",
    desc: "Spacious and premium builder floors designed for luxury living.",
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80",
    link: "/properties/buy",
  },
  {
    title: "Villas",
    desc: "Independent villas with exclusive amenities and privacy.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    link: "/properties/buy",
  },
];

export default function PropertyCategoriesHover() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [properties, setProperties] = useState<Property[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch(`${API_URL}/property`);
      const data = await res.json();
      const buy = data
        .filter((p: Property) => p.purpose === "Buy")
        .sort(
          (a: Property, b: Property) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        .slice(0, 3);
      setProperties(buy);
    };
    fetchProperties();
  }, [API_URL]);

  if (!properties.length)
    return <p className="text-white text-center py-20">Loading properties...</p>;

  return (
<section
  className="relative py-20 bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop')",
  }}
>
  {/* Global overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-[#0f2d1f]/85" />

  <div className="relative w-11/12 md:w-5/6 mx-auto">

    {/* HEADER */}
    <div className="max-w-2xl mb-16 backdrop-blur-xl bg-black/40 p-10 rounded-3xl border border-white/15 shadow-2xl">
      <p className="text-sm tracking-[0.3em] uppercase text-yellow-400 font-semibold">
        Property Categories
      </p>
      <h2 className="mt-4 text-4xl md:text-5xl text-white font-heading font-extrabold leading-tight">
        Explore Spaces That Define Your Lifestyle
      </h2>
    </div>

    {/* CATEGORIES */}
    <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory mb-20">
      {categories.map((item, i) => (
        <Link
          key={i}
          href={item.link}
          className="
            group relative min-w-[85%] sm:min-w-[70%] md:min-w-[55%] lg:min-w-0
            h-[300px] rounded-2xl overflow-hidden
            border border-white/15
            backdrop-blur-xl bg-black/30
            snap-start
            transition-all duration-500
            hover:-translate-y-1 hover:shadow-2xl
          "
        >
          {/* IMAGE */}
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="
              object-cover
              brightness-[0.45]
              transition-all duration-700
              group-hover:brightness-100
              group-hover:scale-110
            "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* TEXT */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8">
            <div>
              <h3 className="text-2xl font-heading font-bold text-white">
                {item.title}
              </h3>
              <div className="mt-3 h-px w-12 bg-[var(--primary-color)]" />
              <p className="mt-4 text-sm text-white/85 max-w-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
            <span className="text-sm text-[var(--primary-color)] font-semibold">
              View Properties →
            </span>
          </div>
        </Link>
      ))}
    </div>

    {/* FEATURED PROPERTIES */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

      {/* IMAGE LEFT */}
      <div className="lg:col-span-2 relative h-[440px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
        <Image
          src={properties[active].images[0]}
          alt={properties[active].title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 backdrop-blur-lg bg-black/40 p-6 rounded-2xl border border-white/10">
          <h3 className="text-2xl text-white font-heading font-bold">
            {properties[active].title}
          </h3>
          <p className="text-sm text-white/80">
            {properties[active].location}
          </p>
          <p className="mt-2 text-lg text-[var(--primary-color)] font-semibold">
            {properties[active].price
              ? `₹${properties[active].price.toLocaleString()}`
              : "Price on request"}
          </p>
        </div>
      </div>

      {/* LIST RIGHT */}
      <div className="space-y-5 backdrop-blur-xl bg-black/40 p-8 rounded-3xl border border-white/15 shadow-2xl">
        {properties.map((p, i) => (
          <button
            key={p._id}
            onClick={() => setActive(i)}
            className={`
              w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300
              ${
                active === i
                  ? "border-[var(--primary-color)] bg-white text-black"
                  : "border-white/20 bg-black/30 text-white hover:bg-black/50"
              }
            `}
          >
            <h4 className="text-lg font-bold">{p.title}</h4>
            <p className="text-sm text-[var(--primary-color)]">
              {p.location}
            </p>
          </button>
        ))}

        {/* BROWSE ALL */}
        <Link
          href="/properties/buy"
          className="inline-flex items-center gap-3 mt-4 text-sm text-[var(--primary-color)] font-semibold"
        >
          Browse All Properties
          <span className="block w-8 h-px bg-[var(--primary-color)]" />
        </Link>
      </div>
    </div>

  </div>
</section>

  );
}
