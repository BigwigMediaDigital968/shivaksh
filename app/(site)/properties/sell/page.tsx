import PageHero from "../../../components/PageHero";
import heroImg from "../../../assets/hero/hero5.jpg";
import Link from "next/link";
import PopupForm from "../../../components/Popup";

export default function SellPropertyPage() {
  return (
    <div>
      <PageHero
        title="Sell Property"
        subtitle="Pricing strategy, marketing support and buyer screening—handled transparently."
        image={heroImg}
      />

      <section className="bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto py-16">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl text-[var(--text-primary)]">
              How we help you sell
            </h2>
            <ul className="mt-6 space-y-3 text-[var(--text-muted)] font-body">
              <li>— Market pricing & positioning</li>
              <li>— Buyer qualification & site visit coordination</li>
              <li>— Negotiation support & clean documentation workflow</li>
              <li>— End-to-end coordination until handover</li>
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex px-6 py-3 bg-[var(--primary-color)] text-[var(--primary-bg)] font-semibold"
            >
              List your property
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

