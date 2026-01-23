"use client";

import { useEffect, useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Maximize,
} from "lucide-react";
import WebLoader from "../../../../components/WebLoader";
import { useParams } from "next/navigation";

interface Property {
  _id: string;
  title: string;
  slug: string;
  location: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  areaSqft?: number;
  images: string[];
  purpose: "Buy" | "Rent" | "Sell";
  highlights?: string[];
  featuresAmenities?: string[];
  nearby?: string[];
}

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  /* ================= PROPERTY FETCH ================= */
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_URL}/property/${slug}`);
        if (!res.ok) throw new Error("Property not found");
        const data = await res.json();
        setProperty(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [slug]);

  /* ================= IMAGE SLIDER ================= */
  useEffect(() => {
    if (property?.images?.length) {
      slideInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % property.images.length);
      }, 3000);

      return () => {
        if (slideInterval.current) clearInterval(slideInterval.current);
      };
    }
  }, [property]);

  /* ================= ENQUIRY FORM ================= */
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
          propertyTitle: property?.title,
          propertySlug: property?.slug,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      alert("Enquiry sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setSending(false);
    }
  };

  /* ================= STATES ================= */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <WebLoader />
      </div>
    );

  if (error) return <p className="p-10 text-red-600 text-xl">{error}</p>;
  if (!property) return null;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 pt-[90px] pb-16">
      {/* IMAGE SECTION */}
      <div className="mt-10 relative max-w-[92%] mx-auto rounded-3xl overflow-hidden shadow-xl border-2 border-black">
        <div className="relative h-[420px] lg:h-[520px] flex">
          <div className="relative flex-1">
            <img
              src={property.images[currentIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />

            <button
              onClick={() =>
                setCurrentIndex(
                  (prev) =>
                    (prev - 1 + property.images.length) %
                    property.images.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={() =>
                setCurrentIndex(
                  (prev) => (prev + 1) % property.images.length
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {property.images.length > 1 && (
            <div className="hidden lg:flex flex-col gap-3 p-3 w-[140px] bg-black/20">
              {property.images.slice(0, 3).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-xl overflow-hidden border-2 ${
                    currentIndex === index
                      ? "border-white"
                      : "border-transparent"
                  }`}
                >
                  <img src={img} className="w-full h-[110px] object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DETAILS */}
      <div className="max-w-[92%] mx-auto mt-12 grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-10">
          <h1 className="text-4xl font-bold mb-3">{property.title}</h1>

          <p className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin size={18} /> {property.location}
          </p>

          <p className="text-3xl font-semibold text-green-700 mb-8">
            {property.price
              ? `₹${property.price.toLocaleString()}`
              : "Price on request"}
          </p>

          <div className="grid grid-cols-3 gap-6 text-center mb-10">
            {property.bedrooms !== undefined && (
              <div className="p-4 bg-gray-50 rounded-2xl">
                <Bed className="mx-auto mb-2" />
                {property.bedrooms} Beds
              </div>
            )}
            {property.bathrooms !== undefined && (
              <div className="p-4 bg-gray-50 rounded-2xl">
                <Bath className="mx-auto mb-2" />
                {property.bathrooms} Baths
              </div>
            )}
            {property.areaSqft !== undefined && (
              <div className="p-4 bg-gray-50 rounded-2xl">
                <Maximize className="mx-auto mb-2" />
                {property.areaSqft} Sqft
              </div>
            )}
          </div>

          {(property.highlights ?? []).length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Key Highlights</h2>
              <ul className="grid sm:grid-cols-2 list-disc list-inside gap-2">
                {property.highlights?.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </section>
          )}
          {(property.featuresAmenities ?? []).length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Features & Amenities</h2>
              <ul className="grid sm:grid-cols-2 list-disc list-inside gap-2">
                {property.featuresAmenities?.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </section>            
          )}
          {(property.nearby ?? []).length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Nearby Places</h2>
              <ul className="grid sm:grid-cols-2 list-disc list-inside gap-2">
                {property.nearby?.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* RIGHT — ENQUIRY */}
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
      </div>
    </div>
  );
}
