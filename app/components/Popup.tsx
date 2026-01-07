"use client";
import React, { useState } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import popup from "../assets/h8_pic5.jpg";
import ButtonFill from "./Button";

interface PopupFormProps {
  open: boolean;
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ open, onClose }) => {
  const [phone, setPhone] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-11/12 max-w-3xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.15)] border border-white/30 animate-popupSlide overflow-hidden flex flex-col md:flex-row">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition text-xl z-10"
        >
          ✕
        </button>

        {/* LEFT IMAGE */}
        <div className="hidden md:block relative w-full md:w-1/2 h-48 md:h-auto">
          <Image
            src={popup}
            alt="Doctor Appointment"
            fill
            className="object-fill"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/40" />
        </div>

        {/* RIGHT FORM */}
        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-[var(--primary-color)]">
            Enquire Now
          </h2>

          <form className="space-y-3">
            {/* Name */}
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-black focus:border-[var(--primary-color)]"
              placeholder="Full Name"
              required
            />

            {/* Phone */}
            <PhoneInput
              country="in"
              value={phone}
              onChange={setPhone}
              enableSearch
              countryCodeEditable={false}
              placeholder="Phone Number"
              containerClass="!w-full"
              inputClass="!w-full !h-[44px] !pl-12 !pr-4 !rounded-lg text-black !border !border-gray-300 focus:!border-[var(--primary-color)]"
              buttonClass="!border !border-gray-300 !rounded-l-lg text-black"
              dropdownClass="!text-gray-800"
            />

            {/* Email */}
            <input
              type="email"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-black  focus:border-[var(--primary-color)]"
              placeholder="Email Address"
            />

            {/* Property Type */}
            <select
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-black focus:border-[var(--primary-color)]"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Property Type
              </option>
              <option>Apartment / Flat</option>
              <option>Independent House</option>
              <option>Villa</option>
              <option>Plot / Land</option>
              <option>Commercial Property</option>
            </select>

            {/* Budget */}
            <select
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-black focus:border-[var(--primary-color)]"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Budget Range
              </option>
              <option>Under ₹50 Lakh</option>
              <option>₹50 Lakh – ₹1 Cr</option>
              <option>₹1 Cr – ₹2 Cr</option>
              <option>₹2 Cr+</option>
            </select>

            {/* Message */}
            <textarea
              className="w-full px-4 py-2.5 rounded-lg h-24 border border-gray-300 text-black resize-none focus:border-[var(--primary-color)]"
              placeholder="Any specific requirement (BHK, facing, possession timeline, etc.)"
            />

            <ButtonFill
              type="submit"
              text="Get Call Back"
              className="w-full mt-2"
            />
          </form>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn .35s ease-out;
        }

        @keyframes popupSlide {
          0% { opacity:0; transform: translateY(20px) scale(.95); }
          100% { opacity:1; transform: translateY(0) scale(1); }
        }
        .animate-popupSlide {
          animation: popupSlide .45s cubic-bezier(0.16,0.8,0.32,1);
        }
      `}</style>
    </div>
  );
};

export default PopupForm;
