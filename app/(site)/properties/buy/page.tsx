import PageHero from "../../../components/PageHero";
import heroImg from "../../../assets/hero/hero4.jpg";
import Link from "next/link";
import PopupForm from "../../../components/Popup";

export default function BuyPropertyPage() {
  return (
    <div>
      <PageHero
        title="Buy Property"
        subtitle="Shortlist verified options, schedule site visits, and negotiate with clarity."
        image={heroImg}
      />

      <section className="bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto py-16">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl text-[var(--text-primary)]">
              How we help you buy
            </h2>
            <ul className="mt-6 space-y-3 text-[var(--text-muted)] font-body">
              <li>— Requirement mapping & shortlist</li>
              <li>— Verified documentation & approvals checks</li>
              <li>— Site visits, comparisons & negotiation support</li>
              <li>— Coordination through booking → possession</li>
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex px-6 py-3 bg-[var(--primary-color)] text-[var(--primary-bg)] font-semibold"
            >
              Get a callback
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

