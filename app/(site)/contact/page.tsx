 "use client";

import PageHero from "../../components/PageHero";
import heroImg from "../../assets/contact-img.png";

export default function ContactPage() {
  return (
    <div>
      <PageHero
        title="Contact"
        subtitle="Tell us what you’re looking for. We’ll share verified options and help you move confidently."
        image={heroImg}
      />

      <section className="bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="border border-[var(--border-color)] bg-[var(--secondary-bg)] p-8">
              <h2 className="font-heading text-3xl text-[var(--text-primary)]">
                Get in touch
              </h2>
              <p className="mt-4 text-[var(--text-muted)] font-body">
                Phone: +91 98115 56625
              </p>
              <p className="mt-2 text-[var(--text-muted)] font-body">
                Email: sales@shivaksh.com
              </p>
              <p className="mt-2 text-[var(--text-muted)] font-body leading-relaxed">
                Address: Gurugram, Haryana (placeholder)
              </p>
            </div>

            <form className="border border-[var(--border-color)] p-8">
              <h3 className="font-heading text-2xl text-[var(--text-primary)]">
                Send a message
              </h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="border border-[var(--border-color)] px-4 py-3 outline-none focus:border-[var(--primary-color)]"
                  placeholder="Name"
                />
                <input
                  className="border border-[var(--border-color)] px-4 py-3 outline-none focus:border-[var(--primary-color)]"
                  placeholder="Phone"
                />
              </div>
              <input
                className="mt-4 w-full border border-[var(--border-color)] px-4 py-3 outline-none focus:border-[var(--primary-color)]"
                placeholder="Email"
              />
              <textarea
                className="mt-4 w-full border border-[var(--border-color)] px-4 py-3 outline-none focus:border-[var(--primary-color)]"
                placeholder="Message"
                rows={6}
              />
              <button
                type="button"
                onClick={() => alert("Submitted (frontend only).")}
                className="mt-6 w-full px-6 py-3 bg-[var(--primary-color)] text-[var(--primary-bg)] font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

