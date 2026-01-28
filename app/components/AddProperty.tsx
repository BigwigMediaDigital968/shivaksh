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
    extraHighlights: "",
    googleMapUrl: "",
    videoLink: "",
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
        extraHighlights: "",
        googleMapUrl: "",
        videoLink: "",
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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      <div className="bg-white/70 bg-opacity-95 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Property
        </h1>

        {message && (
          <p className="mb-4 text-center font-medium text-green-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Top Row: Title & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black placeholder-gray-500"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Purpose & Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label="Purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              options={["Buy", "Rent", "Lease"]}
            />
            <InputField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <InputField
              label="Area (sqft)"
              name="areaSqft"
              type="number"
              value={formData.areaSqft}
              onChange={handleChange}
            />
          </div>

          {/* Beds & Baths */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InputField
              label="Bedrooms"
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={handleChange}
            />
            <InputField
              label="Bathrooms"
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleChange}
            />
            <InputField
              label="Google Map URL"
              name="googleMapUrl"
              value={formData.googleMapUrl}
              onChange={handleChange}
            />
            <InputField
              label="Video Link"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <TextareaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          {/* Array Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Highlights"
              name="highlights"
              value={formData.highlights}
              onChange={handleChange}
              placeholder="Comma separated"
            />
            <InputField
              label="Features & Amenities"
              name="featuresAmenities"
              value={formData.featuresAmenities}
              onChange={handleChange}
              placeholder="Comma separated"
            />
            <InputField
              label="Nearby"
              name="nearby"
              value={formData.nearby}
              onChange={handleChange}
              placeholder="Comma separated"
            />
            <InputField
              label="Extra Highlights"
              name="extraHighlights"
              value={formData.extraHighlights}
              onChange={handleChange}
              placeholder="Comma separated"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-2">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm"
            />
            <div className="grid grid-cols-4 gap-3 mt-3">
              {images.map((file, idx) => (
                <div
                  key={idx}
                  className="relative group border rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-24 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages(images.filter((_, i) => i !== idx))
                    }
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handlePreview}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium"
            >
              Preview JSON
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:opacity-90"
            >
              {loading ? "Submitting…" : "Add Property"}
            </button>
          </div>
        </form>

        {jsonPreview && (
          <div className="mt-6 bg-gray-50 border rounded-xl p-4 text-sm max-h-60 overflow-auto">
            <pre>{JSON.stringify(jsonPreview, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable Components */
function InputField({ label, ...props }: any) {
  return (
    <div>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <input
        {...props}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-black"
      />
    </div>
  );
}

function TextareaField({ label, ...props }: any) {
  return (
    <div>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <textarea
        {...props}
        rows={3}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:outline-none bg-white text-black"
      />
    </div>
  );
}

function SelectField({ label, options, ...props }: any) {
  return (
    <div>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <select
        {...props}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white text-black"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
