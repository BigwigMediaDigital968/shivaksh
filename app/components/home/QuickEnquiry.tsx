"use client";

import { useMemo, useState } from "react";

const projects = ["Project 1", "Project 2", "Project 3"];

export default function QuickEnquiry() {
  const [project, setProject] = useState(projects[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const canSubmit = useMemo(
    () => name.trim().length > 1 && phone.trim().length >= 8,
    [name, phone]
  );

  return (
    <section className="bg-white">
      <div className="w-11/12 md:w-5/6 mx-auto py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--primary-color)] font-body">
              Quick Enquiry
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-heading text-[var(--text-primary)]">
              Want more information?
            </h2>
            <p className="mt-5 text-[var(--text-muted)] font-body leading-relaxed max-w-xl">
              Share your preference and we’ll call you back with verified
              options. This mirrors the reference site’s “Project View” box, but
              we keep it cleaner and more minimal.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!canSubmit) return;
              // frontend-only: wire to API later if needed
              alert("Thanks! We’ll call you back shortly.");
              setName("");
              setPhone("");
              setProject(projects[0]);
            }}
            className="border border-[var(--border-color)] bg-[var(--secondary-bg)] p-6 md:p-8"
          >
            <label className="block text-sm font-body text-[var(--text-muted)]">
              Select Project
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="mt-2 w-full border border-[var(--border-color)] bg-white px-4 py-3 outline-none focus:border-[var(--primary-color)]"
              >
                {projects.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block text-sm font-body text-[var(--text-muted)]">
                Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-2 w-full border border-[var(--border-color)] bg-white px-4 py-3 outline-none focus:border-[var(--primary-color)]"
                />
              </label>

              <label className="block text-sm font-body text-[var(--text-muted)]">
                Phone
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 ..."
                  className="mt-2 w-full border border-[var(--border-color)] bg-white px-4 py-3 outline-none focus:border-[var(--primary-color)]"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-6 w-full px-6 py-3 bg-[var(--primary-color)] text-[var(--primary-bg)] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get a call back
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

