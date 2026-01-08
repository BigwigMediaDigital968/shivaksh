"use client";

import Image from "next/image";
import Link from "next/link";

import blog1 from "../../assets/hero/aboutpage.jpg";
import blog2 from "../../assets/hero/aboutpage.jpg";
import blog3 from "../../assets/hero/aboutpage.jpg";
import blog4 from "../../assets/hero/aboutpage.jpg";

const blogs = [
  {
    title: "Is Gurgaon Still a Smart Real Estate Investment in 2026?",
    excerpt:
      "An in-depth look at market trends, infrastructure growth, and investment potential across Gurgaon’s prime locations.",
    image: blog1,
    link: "/blogs/gurgaon-real-estate-investment-2026",
    featured: true,
  },
  {
    title: "Builder Floors vs Apartments: What Should You Choose?",
    image: blog2,
    link: "/blogs/builder-floor-vs-apartment",
  },
  {
    title: "Key Things to Verify Before Buying a Property",
    image: blog3,
    link: "/blogs/property-verification-checklist",
  },
  {
    title: "How Location Impacts Long-Term Property Value",
    image: blog4,
    link: "/blogs/location-property-value",
  },
];

export default function BlogSection() {
  const featured = blogs.find((b) => b.featured);
  const others = blogs.filter((b) => !b.featured);

  return (
    <section className="bg-[var(--secondary-bg)] py-12">
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* HEADER */}
        <div className="max-w-2xl mb-14">
          <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
            Insights
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-primary)]">
            Market Trends & Property Insights
          </h2>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* FEATURED BLOG */}
          {featured && (
            <Link href={featured.link} className="lg:col-span-2 group">
              <div className="relative h-[360px] overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/30" />
              </div>

              <div className="mt-6">
                <h3 className="font-heading text-2xl md:text-3xl text-[var(--text-primary)] mb-4 group-hover:text-[var(--primary-color)] transition">
                  {featured.title}
                </h3>

                <p className="text-[var(--text-muted)] font-body max-w-xl">
                  {featured.excerpt}
                </p>

                <span className="inline-flex items-center gap-3 mt-6 text-sm font-body text-[var(--primary-color)]">
                  Read Full Article
                  <span className="block w-10 h-px bg-[var(--primary-color)]" />
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
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* TEXT */}
                <div>
                  <h4 className="font-heading text-lg text-[var(--text-primary)] group-hover:text-[var(--primary-color)] transition">
                    {item.title}
                  </h4>

                  <span className="inline-flex items-center gap-2 mt-2 text-sm font-body text-[var(--primary-color)]">
                    Read →
                  </span>
                </div>
              </Link>
            ))}

            {/* VIEW ALL */}
            <Link
              href="/blogs"
              className="inline-flex items-center gap-3 text-sm font-body text-[var(--primary-color)] mt-6"
            >
              View All Insights
              <span className="block w-10 h-px bg-[var(--primary-color)]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
