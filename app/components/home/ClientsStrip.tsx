"use client";

const clients = [
  "Client One",
  "Client Two",
  "Client Three",
  "Client Four",
  "Client Five",
  "Client Six",
];

export default function ClientsStrip() {
  return (
    <section className="bg-[var(--secondary-bg)] border-y border-[var(--border-color)]">
      <div className="w-11/12 md:w-5/6 mx-auto py-12">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
            Our Clients
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-heading text-[var(--text-primary)]">
            Trusted by growing teams
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {clients.map((c) => (
            <div
              key={c}
              className="border border-[var(--border-color)] bg-white/70 backdrop-blur-sm px-4 py-6 text-center"
            >
              <span className="text-sm font-body text-[var(--text-muted)]">
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

