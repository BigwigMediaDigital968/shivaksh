import Link from "next/link";
import PageHero from "../../components/PageHero";
import heroImg from "../../assets/hero/hero1.jpg";

const cards = [
  {
    title: "Buy Property",
    desc: "Verified listings, shortlist support, site visits and negotiation guidance.",
    href: "/properties/buy",
  },
  {
    title: "Sell Property",
    desc: "Pricing strategy, marketing support, and buyer screening—done transparently.",
    href: "/properties/sell",
  },
];

export default function PropertiesPage() {
  return (
    <div>
      <PageHero
        title="Properties"
        subtitle="Explore buying and selling services with a verification-first approach."
        image={heroImg}
      />

      <section className="bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="border border-[var(--border-color)] bg-[var(--secondary-bg)] p-8 hover:border-[var(--primary-color)] transition"
              >
                <h2 className="font-heading text-3xl text-[var(--text-primary)]">
                  {c.title}
                </h2>
                <p className="mt-4 text-[var(--text-muted)] font-body">
                  {c.desc}
                </p>
                <span className="mt-6 inline-flex items-center gap-3 text-sm font-body text-[var(--primary-color)]">
                  Explore →
                  <span className="block w-10 h-px bg-[var(--primary-color)]" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

