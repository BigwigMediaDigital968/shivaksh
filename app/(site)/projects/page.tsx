import Image from "next/image";
import Link from "next/link";
import PageHero from "../../components/PageHero";

import heroImg from "../../assets/hero/hero3.jpg";
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
    <div>
      <PageHero
        title="Projects"
        subtitle="Verified developments with strong fundamentals—location, build quality, and long-term value."
        image={heroImg}
      />

      <section className="bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto py-16">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
                Featured
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-primary)]">
                Projects that feel like home
              </h2>
            </div>
            <Link
              href="/contact"
              className="hidden md:inline-flex px-6 py-3 border border-[var(--border-color)] hover:border-[var(--primary-color)] transition"
            >
              Enquire →
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <Link
                key={it.title}
                href="/contact"
                className="group border border-[var(--border-color)] bg-[var(--secondary-bg)] overflow-hidden"
              >
                <div className="relative h-[240px]">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-[var(--text-primary)] group-hover:text-[var(--primary-color)] transition">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-sm font-body text-[var(--text-muted)]">
                    {it.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

