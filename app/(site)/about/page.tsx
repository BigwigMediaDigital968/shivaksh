import PageHero from "../../components/PageHero";
import heroImg from "../../assets/hero/aboutpage.jpg";
import Link from "next/link";
import {
  Shield,
  Target,
  Heart,
  Award,
  CheckCircle,
  Home,
  RefreshCw,
  Building2,
  FileText,
} from "lucide-react";

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

      {/* Our Core Values Section */}
      <section className="bg-[var(--secondary-bg)] py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
              Our Core Values
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-primary)]">
              Principles That Guide Every Client Relationship
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
            {[
              {
                icon: Shield,
                title: "Integrity",
                description:
                  "Transparent dealings and honest guidance in every transaction.",
              },
              {
                icon: Target,
                title: "Commitment",
                description:
                  "Dedicated service backed by over 15 years of real estate expertise.",
              },
              {
                icon: Heart,
                title: "Customer First",
                description:
                  "Solutions carefully tailored around client needs and long-term goals.",
              },
              {
                icon: Award,
                title: "Excellence",
                description:
                  "High standards in service delivery, advisory, and market knowledge.",
              },
              {
                icon: CheckCircle,
                title: "Reliability",
                description:
                  "Long-term relationships built on trust, consistency, and results.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white border border-[var(--border-color)] p-6 hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--primary-color)] transition-colors duration-300">
                  <value.icon
                    className="text-[var(--primary-color)] group-hover:text-white transition-colors duration-300"
                    size={24}
                  />
                </div>
                <h3 className="font-heading text-xl text-[var(--text-primary)] mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="bg-white py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
              Our Services
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-primary)]">
              Expert Real Estate Solutions Tailored to Your Needs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              {
                icon: Home,
                title: "Fresh Booking",
                description:
                  "Direct bookings with top developers. Guidance on new launches and pre-launch opportunities. Project comparisons and investment advisory.",
                features: [
                  "Direct bookings with top developers",
                  "Guidance on new launches and pre-launch opportunities",
                  "Project comparisons and investment advisory",
                ],
              },
              {
                icon: RefreshCw,
                title: "Resale",
                description:
                  "Expert assistance in buying and selling pre-owned properties. Market valuation, negotiation support, and seamless transaction management.",
                features: [
                  "Expert assistance in buying and selling pre-owned properties",
                  "Market valuation and negotiation support",
                  "Seamless transaction management",
                ],
              },
              {
                icon: Building2,
                title: "Leasing",
                description:
                  "Comprehensive leasing solutions for residential and commercial spaces. Tenant screening, lease documentation, and property management.",
                features: [
                  "Comprehensive leasing solutions for residential and commercial spaces",
                  "Tenant screening and lease documentation",
                  "Property management services",
                ],
              },
              {
                icon: FileText,
                title: "Commercial Real Estate",
                description:
                  "Strategic advisory for commercial property investments. Office spaces, retail units, and mixed-use developments across prime locations.",
                features: [
                  "Strategic advisory for commercial property investments",
                  "Office spaces, retail units, and mixed-use developments",
                  "Prime location expertise",
                ],
              },
            ].map((service, index) => (
              <div
                key={index}
                className="relative border-l-4 border-[var(--primary-color)] bg-[var(--secondary-bg)] p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-lg bg-[var(--primary-color)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl text-[var(--text-primary)] mb-3">
                      {service.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 font-body text-sm text-[var(--text-muted)]"
                        >
                          <span className="text-[var(--primary-color)] mt-1">
                            •
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

