"use client";

import { useState } from "react";

interface EnquiryFormProps {
  propertyTitle?: string;
  propertySlug?: string;
}

export default function LeadForm({
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
      className="rounded-3xl shadow-lg p-8 h-fit sticky top-[110px] text-white"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="rounded-2xl p-6">
        <h3 className="text-3xl font-bold mb-4 text-center">
          Enquire About This Property
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl text-black bg-white"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-xl text-black bg-white"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-3 rounded-xl text-black bg-white"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-xl text-black bg-white"
          />

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            {sending ? "Sending..." : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
