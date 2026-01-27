"use client";

import React, { useState } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import popup from "../assets/hero/aboutpage.jpg";
import ButtonFill from "./Button";

interface PopupFormProps {
  open: boolean;
  onClose: () => void;
  purpose?: "Buy" | "Sell" | "Rent";
  propertyType?: "Apartment" | "Builder Floor" | "Villa";
}

const PopupForm: React.FC<PopupFormProps> = ({ open, onClose, purpose, propertyType }) => {
  const [step, setStep] = useState<"form" | "otp" | "success">("form");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState(purpose || "");
  const [selectPropertyType, setSelectPropertyType] = useState(propertyType || "");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- SEND OTP ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !selectedPurpose) {
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
            purpose: selectedPurpose,
            message,
          }),
        }
      );

      const text = await res.text();
      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Server error. Please try again.");
      }

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
          body: JSON.stringify({ email, otp }),
        }
      );

      const text = await res.text();
      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Server error. Please try again.");
      }

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setStep("success");

      setTimeout(() => {
        resetForm();
        onClose();
      }, 2500);
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep("form");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setOtp("");
    setSelectPropertyType(propertyType || "");
    setSelectedPurpose(purpose || "");
    setError("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-lg">
      <div className="relative w-[92%] max-w-4xl bg-transparent backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Close */}
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 bg-white/80 rounded-full w-9 h-9 flex items-center justify-center text-xl hover:bg-white transition"
        >
          ✕
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:flex relative">
          <Image src={popup} alt="Shivaksh" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 p-8 flex items-end">
            <div className="text-white">
              <h3 className="text-2xl font-bold">Trusted Property Experts</h3>
              <p className="text-sm mt-2 opacity-90">
                Verified leads • Secure process • Quick response
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="p-8 md:p-10 bg-[#425D75]/60">
          <h2 className="text-3xl font-bold text-center mb-2 text-white">
            Enquire Now
          </h2>
          <p className="text-center text-sm text-gray-300 mb-6">
            Get a callback from our property expert
          </p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-500"
              />

              <PhoneInput
                country="in"
                value={phone}
                onChange={setPhone}
                containerClass="w-full"
                inputClass="!w-full !h-[50px] !rounded-xl !border !border-gray-300"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-500"
              />
              <select
                value={selectPropertyType}
                onChange={(e) => setSelectPropertyType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black"
              >
                <option value="">Select Property Type</option>
                <option>Apartment</option>
                <option>Builder Floor</option>
                <option>Villa</option>
              </select>

              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black"
              >
                <option value="">Select Purpose</option>
                <option>Buy</option>
                <option>Sell</option>
                <option>Rent</option>
              </select>

              <textarea
                placeholder="Any specific requirement (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 h-24 bg-white text-black placeholder-gray-500"
              />

              <ButtonFill
                type="submit"
                text={loading ? "Sending OTP..." : "Get Call Back"}
                disabled={loading}
                className="w-full h-12 rounded-xl text-lg"
              />
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5 text-center">
              <p className="text-sm text-gray-300">
                Enter the 6-digit OTP sent to
              </p>
              <p className="font-semibold text-gray-300">{email}</p>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full text-center px-4 py-4 text-xl tracking-widest rounded-xl border border-gray-300 bg-white text-black"
                placeholder="••••••"
              />

              <ButtonFill
                type="submit"
                text={loading ? "Verifying..." : "Verify OTP"}
                disabled={loading}
                className="w-full h-12 rounded-xl text-lg"
              />
            </form>
          )}

          {step === "success" && (
            <div className="text-center py-14">
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-300">
                Thank you!
              </h3>
              <p className="text-sm text-gray-300 mt-2">
                Your request has been submitted successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
