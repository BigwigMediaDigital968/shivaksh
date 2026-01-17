"use client";

import { useState } from "react";
import PageHero from "../../components/PageHero";
import heroImg from "../../assets/contact-img.png";

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
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Verified properties. Secure process. Expert guidance."
        image={heroImg}
      />

      <section className="relative bg-gradient-to-br from-[#425D75] to-[#1f2f3f] py-20">
        <div className="w-11/12 md:w-5/6 mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div className="text-white">
              <h2 className="text-4xl font-bold leading-tight">
                Let’s Find the Right Property for You
              </h2>
              <p className="mt-4 text-white/80">
                Share your requirement and our property expert will get in
                touch with you shortly.
              </p>

              <div className="mt-8 space-y-3 text-white/90">
                <p>📞 +91 98115 56625</p>
                <p>📧 sales@shivaksh.com</p>
                <p>📍 Gurugram, Haryana</p>
              </div>
            </div>

            {/* FORM CARD */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10">

              <h3 className="text-2xl font-semibold text-center mb-2">
                Enquire Now
              </h3>
              <p className="text-center text-sm text-gray-500 mb-6">
                Get a callback from our property expert
              </p>

              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* FORM STEP */}
              {step === "form" && (
                <form onSubmit={sendOtp} className="space-y-4">
                  <input
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-black/10"
                  />

                  <input
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border"
                  />

                  <input
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border"
                  />

                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border"
                  >
                    <option value="">Select Purpose</option>
                    <option>Buy</option>
                    <option>Sell</option>
                  </select>

                  <textarea
                    placeholder="Any specific requirement (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border resize-none"
                  />

                  <button
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-[#D4AF37] text-black font-semibold hover:opacity-90 transition"
                  >
                    {loading ? "Sending OTP..." : "Get Call Back"}
                  </button>
                </form>
              )}

              {/* OTP STEP */}
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
                  <p className="text-sm text-gray-500 mt-2">
                    Our team will contact you shortly.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
