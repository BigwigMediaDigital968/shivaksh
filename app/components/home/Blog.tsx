"use client";

import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    title: "Is Gurgaon Still a Smart Real Estate Investment in 2026?",
    excerpt:
      "An in-depth look at market trends, infrastructure growth, and investment potential across Gurgaon’s prime locations.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop",
    link: "/blogs/gurgaon-real-estate-investment-2026",
    featured: true,
  },
  {
    title: "Builder Floors vs Apartments: What Should You Choose?",
    image:
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?q=80&w=800&auto=format&fit=crop",
    link: "/blogs/builder-floor-vs-apartment",
  },
  {
    title: "Key Things to Verify Before Buying a Property",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop",
    link: "/blogs/property-verification-checklist",
  },
  {
    title: "How Location Impacts Long-Term Property Value",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=800&auto=format&fit=crop",
    link: "/blogs/location-property-value",
  },
];

export default function BlogSection() {
  const featured = blogs.find((b) => b.featured);
  const others = blogs.filter((b) => !b.featured);

  return (
    <section
      className="relative py-28 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative w-11/12 md:w-5/6 mx-auto">
        {/* HEADER */}
        <div className="max-w-2xl mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-yellow-400">
            Insights
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-heading text-white">
            Market Trends & Property Insights
          </h2>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* FEATURED BLOG */}
          {featured && (
            <Link
              href={featured.link}
              className="lg:col-span-2 group"
            >
              <div className="relative h-[380px] rounded-2xl overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40" />
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-2xl md:text-3xl text-white mb-4 group-hover:text-yellow-400 transition">
                  {featured.title}
                </h3>

                <p className="text-white/80 max-w-xl">
                  {featured.excerpt}
                </p>

                <span className="inline-flex items-center gap-3 mt-6 text-sm text-yellow-400">
                  Read Full Article
                  <span className="block w-10 h-px bg-yellow-400" />
                </span>
              </div>
            </Link>
          )}

          {/* OTHER BLOGS */}
          <div className="space-y-6">
            {others.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="group flex gap-6 items-start"
              >
                {/* THUMB */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>

                {/* TEXT */}
                <div>
                  <h4 className="font-heading text-lg text-white group-hover:text-yellow-400 transition">
                    {item.title}
                  </h4>

                  <span className="inline-flex items-center gap-2 mt-2 text-sm text-yellow-400">
                    Read →
                  </span>
                </div>
              </Link>
            ))}

            {/* VIEW ALL */}
            <Link
              href="/blogs"
              className="inline-flex items-center gap-3 text-sm text-yellow-400 mt-6"
            >
              View All Insights
              <span className="block w-10 h-px bg-yellow-400" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
