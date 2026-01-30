"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Are all properties verified before listing?",
    answer:
      "Yes. Every property goes through a strict verification process covering ownership documents, approvals, and market authenticity to ensure complete transparency.",
  },
  {
    question: "Do you assist beyond property shortlisting?",
    answer:
      "Absolutely. We provide end-to-end assistance — from shortlisting and site visits to negotiation, legal coordination, and final possession.",
  },
  {
    question: "Which locations do you specialize in?",
    answer:
      "We specialize in high-growth micro-markets across Delhi NCR, including Gurgaon, Noida, and emerging investment corridors.",
  },
  {
    question: "Is there support for first-time investors?",
    answer:
      "Yes. Our advisory approach is designed to guide first-time buyers with clarity, risk assessment, and long-term investment planning.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="relative py-32 md:py-40 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative w-11/12 md:w-4/6 mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-yellow-400 uppercase mb-3">
            FAQs
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Clear answers to help you make confident property decisions.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 md:px-8 py-6 text-left"
              >
                <h3 className="text-white text-base md:text-lg font-medium">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`text-white transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6 md:px-8 transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "max-h-40 pb-6 opacity-100"
                    : "max-h-0 overflow-hidden opacity-0"
                }`}
              >
                <p className="text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
