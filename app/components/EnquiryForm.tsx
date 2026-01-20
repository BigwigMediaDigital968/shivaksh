"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ButtonFill from "./Button";
const inputBase =
  "w-full h-[52px] px-4 rounded-xl bg-white text-black " +
  "border border-gray-300 outline-none focus:border-[#1F3D2B]";

interface InlineEnquiryFormProps {
  purpose?: "Buy" | "Sell";
  slug?: string;
  source?: string;
}

const InlineEnquiryForm: React.FC<InlineEnquiryFormProps> = ({
  purpose = "Buy",
  slug,
  source = "blog",
}) => {
  const [step, setStep] = useState<"form" | "otp" | "success">("form");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- SEND OTP ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone) {
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
          body: JSON.stringify({
            name,
            email,
            phone: phone.replace(/\D/g, ""),
            purpose,
            message,
            slug,
            source,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lead/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            otp,
            slug,
            source,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setStep("success");
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="relative rounded-3xl p-8 shadow-2xl
    bg-gradient-to-br from-[#1F3D2B] via-[#2F5D46] to-[#3E7C5C]
    text-white border border-white/20">

    {/* Glow */}
    <div className="absolute -inset-1 bg-white/10 rounded-3xl blur-2xl -z-10" />

    <h3 className="text-3xl font-extrabold mb-2 text-center">
      Enquire Now
    </h3>

    <p className="text-sm text-gray-200 text-center mb-6">
      Get expert guidance on this property
    </p>

    {error && (
      <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
        {error}
      </div>
    )}
    


    {/* FORM */}
    {step === "form" && (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputBase}
        />

        <PhoneInput
          country="in"
          value={phone}
          onChange={setPhone}
          containerClass="w-full"
          inputClass="!w-full !h-[52px] !rounded-xl !text-black"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputBase}
        />

        <textarea
          placeholder="Any specific requirement"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputBase}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 rounded-xl text-lg font-semibold
            bg-white text-[#1F3D2B] hover:bg-gray-100 transition"
        >
          {loading ? "Sending OTP..." : "Get Call Back"}
        </button>
      </form>
    )}

    {/* OTP */}
    {step === "otp" && (
      <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
        <p className="text-sm text-gray-200">
          Enter OTP sent to
        </p>
        <p className="font-semibold">{email}</p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full text-center px-4 py-4 rounded-xl text-black text-xl tracking-widest"
          placeholder="••••••"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 rounded-xl text-lg font-semibold
            bg-white text-[#1F3D2B]"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    )}

    {/* SUCCESS */}
    {step === "success" && (
      <div className="text-center py-12">
        <div className="text-green-400 text-6xl mb-3">✓</div>
        <h4 className="text-xl font-semibold">Thank you!</h4>
        <p className="text-sm text-gray-200 mt-1">
          Our expert will contact you shortly.
        </p>
      </div>
    )}
  </div>
);

};

export default InlineEnquiryForm;
