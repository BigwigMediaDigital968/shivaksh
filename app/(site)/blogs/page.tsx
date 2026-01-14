import Image from "next/image";
import Link from "next/link";
import PageHero from "../../components/PageHero";

import heroImg from "../../assets/hero/hero2.jpg";
import b1 from "../../assets/hero/aboutpage.jpg";
import b2 from "../../assets/hero/hero4.jpg";
import b3 from "../../assets/hero/hero5.jpg";

const posts = [
  {
    title: "How smart planning transforms modern living",
    category: "Real Estate",
    date: "March 18, 2024",
    image: b1,
  },
  {
    title: "Luxury apartments vs villas: What to choose?",
    category: "Insights",
    date: "March 10, 2024",
    image: b2,
  },
  {
    title: "Why location matters more than price",
    category: "Investment",
    date: "March 05, 2024",
    image: b3,
  },
];

export default function BlogsPage() {
  return (
    <div>
      <PageHero
        title="Blogs"
        subtitle="Latest insights and updates around buying, investing, and verifying properties."
        image={heroImg}
      />

      <section className="bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link
                key={p.title}
                href="/contact"
                className="group border border-[var(--border-color)] bg-[var(--secondary-bg)] overflow-hidden"
              >
                <div className="relative h-[220px]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-6">
                  <p className="text-xs tracking-[0.25em] uppercase text-[var(--primary-color)]">
                    {p.category} • {p.date}
                  </p>
                  <h3 className="mt-3 font-heading text-xl text-[var(--text-primary)] group-hover:text-[var(--primary-color)] transition">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

