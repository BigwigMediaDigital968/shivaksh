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
    <section
      className="relative py-28 md:py-36 min-h-[60vh] flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative w-11/12 md:w-5/6 mx-auto">
        <p className="text-sm tracking-[0.3em] uppercase text-yellow-400 text-center">
          Our Clients
        </p>
        <h2 className="mt-4 text-3xl md:text-4xl font-heading text-white text-center">
          Trusted by Growing Teams
        </h2>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {clients.map((c) => (
            <div
              key={c}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-4 py-6 text-center"
            >
              <span className="text-white/80 text-sm">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
