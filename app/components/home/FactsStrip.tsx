"use client";

const facts = [
  { value: "120+", label: "Verified listings handled" },
  { value: "15+ Years", label: "On-ground market experience" },
  { value: "30+", label: "High-growth micro-markets covered" },
  { value: "End-to-end", label: "Advisory from shortlist to possession" },
];

export default function FactsStrip() {
  return (
    <section className="bg-white border-y border-[var(--border-color)]">
      <div className="w-11/12 md:w-5/6 mx-auto py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {facts.map((f, i) => (
            <div key={i}>
              <p className="font-heading text-4xl text-green-900">
                {f.value}
              </p>
              <p className="mt-2 text-lg font-body font-bold text-[var(--text-muted)]">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

