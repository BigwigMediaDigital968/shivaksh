"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Building2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div
      className="overflow-hidden bg-fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative w-11/12 md:w-5/6 mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-5xl md:text-6xl font-bold max-w-4xl leading-tight"
          >
            Trusted Real Estate Advisory for
            <span className="text-emerald-400"> Premium Properties</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-lg text-gray-200 max-w-2xl"
          >
            We guide buyers, investors, and businesses with honesty, precision,
            and long-term vision — no noise, no pressure.
          </motion.p>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative w-11/12 md:w-5/6 mx-auto grid lg:grid-cols-2 gap-16 items-center text-justify">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Who We Are
            </h2>
            <p className="text-gray-200 leading-relaxed text-lg">
              We are a boutique real estate advisory focused on premium
              residential, commercial, and investment properties. Our approach
              is simple verified listings, transparent guidance, and decisions
              rooted in value.
            </p>
            <p className="text-gray-300 mt-4 leading-relaxed">
              With deep market expertise and hands-on execution, we help clients
              move confidently without confusion or sales pressure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { title: "Verified Listings", value: "100%" },
              { title: "Client Retention", value: "92%" },
              { title: "Years Experience", value: "10+" },
              { title: "Projects Closed", value: "350+" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20"
              >
                <h3 className="text-3xl font-bold text-white">
                  {item.value}
                </h3>
                <p className="text-gray-300 mt-2">{item.title}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-[#0b1a14]/85" />

        <div className="relative w-11/12 md:w-5/6 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center text-4xl font-bold text-white mb-14"
          >
            Our Core Values
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: ShieldCheck,
                title: "Integrity First",
                desc: "Every deal backed by transparency and ethical practice.",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Market insight, negotiation strength, and execution.",
              },
              {
                icon: Building2,
                title: "Client-Centric",
                desc: "Your goals define our strategy — always.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
              >
                <item.icon className="w-10 h-10 text-emerald-400 mx-auto mb-5" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERTISE ================= */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-white/90" />

        <div className="relative w-11/12 md:w-5/6 mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center text-4xl font-bold text-gray-900 mb-12"
          >
            Our Expertise
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Luxury Residential",
              "Commercial Leasing",
              "Investment Advisory",
              "Land Acquisition",
              "Market Research",
              "Portfolio Structuring",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center font-medium text-gray-800"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
