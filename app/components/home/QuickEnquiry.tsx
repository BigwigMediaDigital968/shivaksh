"use client";

import { useState } from "react";

interface EnquiryFormProps {
  propertyTitle?: string;
  propertySlug?: string;
}

export default function EnquiryForm({
  propertyTitle,
  propertySlug,
}: EnquiryFormProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch(`${API_URL}/enquireForm/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          propertyTitle,
          propertySlug,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      alert("Enquiry sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className=" shadow-xl  top-[110px] overflow-hidden"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="bg-black/60  p-8 md:p-10 rounded-3xl">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">
          Enquire About This Property
        </h3>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4"
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-5 py-3 rounded-xl text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-5 py-3 rounded-xl text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-5 py-3 rounded-xl text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Your Message"
            className="w-full px-5 py-3 rounded-xl text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-200 transition disabled:opacity-70"
          >
            {sending ? "Sending..." : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
