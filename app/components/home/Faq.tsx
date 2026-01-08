"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do you verify properties before listing?",
    answer:
      "Every property is thoroughly checked for ownership, approvals, legal documentation, and market authenticity before being shared with clients.",
  },
  {
    question: "Do you assist with negotiations and paperwork?",
    answer:
      "Yes. We support our clients through negotiations, agreement drafting, documentation, and registration to ensure a smooth transaction.",
  },
  {
    question: "Are there any hidden charges involved?",
    answer:
      "No. We follow a completely transparent approach with clear communication and no hidden costs at any stage of the process.",
  },
  {
    question: "Do you deal in both residential and commercial properties?",
    answer:
      "Yes. Our portfolio includes residential, commercial, rental, and investment-focused opportunities.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[var(--secondary-bg)] py-20">
      <div className="w-11/12 md:w-5/6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — CONTEXT PANEL */}
          <div className="max-w-md">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
              FAQs
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-primary)]">
              Clear Answers Before You Decide
            </h2>

            <p className="mt-6 text-[var(--text-muted)] font-body leading-relaxed">
              Buying or investing in property involves important decisions.
              These answers address the most common concerns we hear from buyers
              and investors before they move forward.
            </p>

            {/* TRUST NOTE */}
            <div className="mt-10 border-l-4 border-[var(--primary-color)] pl-6">
              <p className="font-heading text-lg text-[var(--text-primary)]">
                Transparency Comes First
              </p>
              <p className="text-sm text-[var(--text-muted)] font-body mt-2">
                We believe informed clients make confident decisions.
              </p>
            </div>
          </div>

          {/* RIGHT — FAQ ACCORDION */}
          <div className="space-y-4">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="border border-[var(--border-color)] bg-white"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-heading text-lg text-[var(--text-primary)]">
                      {item.question}
                    </span>

                    <span
                      className={`text-2xl font-light text-[var(--primary-color)] transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 text-sm font-body text-[var(--text-muted)] leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
