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
  {
    title: "Rent Property",
    desc: "Find trusted tenants, rental agreements, and property management services.",
    href: "/properties/rent",
  },
  {
    title: "Lease Property",
    desc: "Find trusted tenants, rental agreements, and property management services.",
    href: "/properties/lease",
  }
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((c) => (
        <Link
          key={c.title}
          href={c.href}
          className="border border-gray-300 bg-gray-50 p-8 hover:border-green-600 transition block"
        >
          <h2 className="text-3xl font-bold">{c.title}</h2>
          <p className="mt-4 text-gray-600">{c.desc}</p>
          <span className="mt-6 inline-flex items-center gap-3 text-sm text-green-600">
            Explore →
          </span>
        </Link>
      ))}
    </div>
  </div>
</section>

    </div>
  );
}

