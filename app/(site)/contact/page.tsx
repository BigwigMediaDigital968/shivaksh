"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [step, setStep] = useState<"form" | "otp" | "success">("form");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------- SEND OTP ---------- */
  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !purpose) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lead/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, email, purpose, message }),
        }
      );

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.message);

      setStep("otp");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- VERIFY OTP ---------- */
  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return setError("Enter OTP");

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lead/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.message);

      setStep("success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1669658981858-b2ae0d7581a3?q=80&w=854&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* OVERLAY */}
      <div className="min-h-screen bg-black/65 flex items-center">
        <section className="w-full py-24">
          <div className="w-11/12 md:w-5/6 mx-auto grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Let’s Find the Right Property for You
              </h1>

              <p className="mt-6 text-white/80 max-w-lg text-lg">
                Verified listings. Trusted advisory. Seamless buying and
                investment experience with complete transparency.
              </p>

              <div className="mt-10 space-y-4 text-white/90 text-lg">
                <p>📞 +91 98115 56625</p>
                <p>📧 sales@shivaksh.com</p>
                <p>📍 Gurugram, Haryana</p>
              </div>
            </motion.div>

            {/* ENQUIRY CARD */}
                     <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className=" pb-7 justify-center gap-5 border-4 rounded-2xl border-white items-center text-center "
          >
              <h3 className="text-4xl font-semibold text-center mb-2 text-white">
                Enquire Now
              </h3>
              <p className="text-center text-lg text-white mb-6">
                Get a call back from our property expert
              </p>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* FORM */}
              {step === "form" && (
                <form onSubmit={sendOtp} className="space-y-4">
                  <input
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border  bg-white"
                  />

                  <input
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border bg-white"
                  />

                  <input
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border bg-white"
                  />

                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border bg-white"
                  >
                    <option value="">Select Purpose</option>
                    <option>Buy</option>
                    <option>Sell</option>
                    <option>Lease</option>
                    <option>Investment</option>
                  </select>

                  <textarea
                    placeholder="Any specific requirement (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border resize-none bg-white"
                  />

                  <button
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-[#D4AF37] text-black font-semibold hover:opacity-90 transition"
                  >
                    {loading ? "Sending OTP..." : "Get Call Back"}
                  </button>
                </form>
              )}

              {/* OTP */}
              {step === "otp" && (
                <form onSubmit={verifyOtp} className="space-y-5 text-center">
                  <p className="text-sm text-gray-600">
                    Enter the 6-digit OTP sent to
                  </p>
                  <p className="font-semibold">{email}</p>

                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-full text-center px-4 py-4 text-xl tracking-widest rounded-xl border"
                    placeholder="••••••"
                  />

                  <button
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-black text-white font-semibold"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </form>
              )}

              {/* SUCCESS */}
              {step === "success" && (
                <div className="text-center py-12">
                  <div className="text-green-500 text-6xl mb-4">✓</div>
                  <h4 className="text-xl font-semibold">
                    Request Submitted!
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Our team will contact you shortly.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
