import PageHero from "../../components/PageHero";
import heroImg from "../../assets/hero/aboutpage.jpg";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="About"
        subtitle="Trusted advisory for premium residential and commercial real estate—built on verification, transparency, and long-term value."
        image={heroImg}
      />

      <section className="bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
                Who we are
              </p>
              <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-primary)]">
                Real estate decisions made simple
              </h2>
              <p className="mt-6 text-[var(--text-muted)] font-body leading-relaxed">
                We help buyers and investors navigate Gurgaon and Delhi NCR with
                verified options and honest guidance. Our work is advisory-first
                (not pushy brokerage), so you can decide with clarity.
              </p>
              <p className="mt-4 text-[var(--text-muted)] font-body leading-relaxed">
                This theme is inspired by{" "}
                <Link
                  href="https://crown-point-estates.vercel.app/"
                  className="text-[var(--primary-color)] hover:opacity-80"
                >
                  Crown Point Estates
                </Link>
                , with a slightly more minimal, modern feel.
              </p>
            </div>

            <div className="border border-[var(--border-color)] bg-[var(--secondary-bg)] p-8">
              <h3 className="font-heading text-2xl text-[var(--text-primary)]">
                Mission & Vision
              </h3>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
                    Our mission
                  </p>
                  <p className="mt-2 text-[var(--text-muted)] font-body leading-relaxed">
                    To deliver exceptional real estate guidance through
                    verification, ethics, and strong market understanding—so
                    clients can invest confidently.
                  </p>
                </div>
                <div>
                  <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
                    Our vision
                  </p>
                  <p className="mt-2 text-[var(--text-muted)] font-body leading-relaxed">
                    To be a trusted consultancy known for clarity,
                    professionalism, and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

