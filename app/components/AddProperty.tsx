"use client";

import { useState } from "react";

export default function AddProperty() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    purpose: "Buy",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    areaSqft: "",
    highlights: "",
    featuresAmenities: "",
    nearby: "",
    googleMapUrl: "",
    videoLink: "",
    extraHighlights: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [jsonPreview, setJsonPreview] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handlePreview = () => {
    setJsonPreview({
      ...formData,
      highlights: formData.highlights.split(",").map((i) => i.trim()),
      featuresAmenities: formData.featuresAmenities.split(",").map((i) => i.trim()),
      nearby: formData.nearby.split(",").map((i) => i.trim()),
      extraHighlights: formData.extraHighlights.split(",").map((i) => i.trim()),
      images: images.map((f) => f.name),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      images.forEach((img) => data.append("images", img));

      const res = await fetch(`${API_URL}/property/add`, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to add property");

      setMessage("Property added successfully!");
      setFormData({
        title: "",
        description: "",
        purpose: "Buy",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        areaSqft: "",
        highlights: "",
        featuresAmenities: "",
        nearby: "",
        googleMapUrl: "",
        videoLink: "",
        extraHighlights: "",
      });
      setImages([]);
      setJsonPreview(null);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-blue-600 p-6">
      <div className="w-full max-w-5xl bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-6 md:p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Property
        </h1>

        {message && (
          <p className="mb-4 text-center font-medium text-green-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="space-y-3">
            <Input label="Title" name="title" value={formData.title} onChange={handleChange} required />
            <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
            <Select label="Purpose" name="purpose" value={formData.purpose} onChange={handleChange} />
            <Input label="Location" name="location" value={formData.location} onChange={handleChange} required />
            <Input label="Google Map URL" name="googleMapUrl" value={formData.googleMapUrl} onChange={handleChange} />
            <Input label="Video Link" name="videoLink" value={formData.videoLink} onChange={handleChange} />
          </div>

          {/* Right column */}
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <Input label="Price" type="number" name="price" value={formData.price} onChange={handleChange} />
              <Input label="Beds" type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
              <Input label="Baths" type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
            </div>
            <Input label="Area (Sqft)" type="number" name="areaSqft" value={formData.areaSqft} onChange={handleChange} />
            <Input label="Highlights" name="highlights" value={formData.highlights} onChange={handleChange} />
            <Input label="Features & Amenities" name="featuresAmenities" value={formData.featuresAmenities} onChange={handleChange} />
            <Input label="Nearby" name="nearby" value={formData.nearby} onChange={handleChange} />
            <Input label="Extra Highlights" name="extraHighlights" value={formData.extraHighlights} onChange={handleChange} />
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full text-sm" />
          </div>

          {/* Actions */}
          <div className="md:col-span-2 flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={handlePreview}
              className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-medium"
            >
              Preview JSON
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-pink-500 text-white font-semibold shadow hover:opacity-90"
            >
              {loading ? "Submitting…" : "Add Property"}
            </button>
          </div>
        </form>

        {jsonPreview && (
          <div className="mt-6 bg-gray-50 border rounded-xl p-4 text-sm">
            <pre className="overflow-x-auto">{JSON.stringify(jsonPreview, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable UI components */
function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300
                   focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    </div>
  );
}


function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        {...props}
        rows={3}
        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300
                   focus:ring-2 focus:ring-pink-400 focus:outline-none"
      />
    </div>
  );
}


function Select({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <select
        {...props}
        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300
                   focus:ring-2 focus:ring-purple-400 focus:outline-none"
      >
        <option value="Buy">Buy</option>
        <option value="Rent">Rent</option>
        <option value="Lease">Lease</option>
      </select>
    </div>
  );
}

