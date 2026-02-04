"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Maximize,
} from "lucide-react";
import WebLoader from "./WebLoader";

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
  purpose: "Buy" | "Rent" | "Lease" | "Sell";
  highlights?: string[];
  featuresAmenities?: string[];
  nearby?: string[];
  extraHighlights?: string[];
  googleMapUrl?: string;
  videoLink?: string;
}
const getYoutubeEmbedUrl = (url?: string) => {
  if (!url) return "";

  // Already embed
  if (url.includes("youtube.com/embed")) return url;

  // watch?v=
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // youtu.be
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  return "";
};
// const getGoogleMapEmbedUrl = (url?: string) => {
//   if (!url) return "";

//   // Already embed
//   if (url.includes("google.com/maps/embed")) return url;

//   // Extract place name from short or long URLs
//   return `https://www.google.com/maps?q=${encodeURIComponent(
//     url
//   )}&output=embed`;
// };



export default function PropertyDetailPage() {
  const { slug } = useParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* IMAGE SLIDER */
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<NodeJS.Timeout | null>(null);

  /* IMAGE URL FIX */
  const getImageUrl = (img: string) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `${API_URL?.replace("/api", "")}/${img}`;
  };

  useEffect(() => {
    if (!slug) return;

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
  }, [slug, API_URL]);

  /* AUTO SLIDE */
  useEffect(() => {
    if (!property?.images?.length) return;

    sliderRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % property.images.length);
    }, 3000);

    return () => {
      if (sliderRef.current) clearInterval(sliderRef.current);
    };
  }, [property]);

  /* ENQUIRY FORM */
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

      if (!res.ok) throw new Error("Failed");

      alert("Enquiry sent successfully");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      alert("Something went wrong");
    } finally {
      setSending(false);
    }
  };

  /* STATES */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <WebLoader />
      </div>
    );

  if (error) return <p className="p-10 text-red-600">{error}</p>;
  if (!property) return null;

  /* UI */
  return (
    <div className="bg-gray-50 pt-[90px] pb-16">
      {/* IMAGE SECTION */}
      <div className="max-w-[92%] mx-auto rounded-3xl overflow-hidden shadow-xl">
        <div className="relative h-[420px] lg:h-[520px] flex">
          <div className="relative flex-1">
            <img
              src={getImageUrl(property.images[currentIndex])}
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
              <ChevronLeft size={26} />
            </button>

            <button
              onClick={() =>
                setCurrentIndex(
                  (prev) => (prev + 1) % property.images.length
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full"
            >
              <ChevronRight size={26} />
            </button>
          </div>

          {/* THUMBNAILS */}
          <div className="hidden lg:flex flex-col gap-3 p-3 w-[140px] bg-black/20">
            {property.images.slice(0, 4).map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`overflow-hidden rounded-xl border-2 ${currentIndex === i
                  ? "border-white"
                  : "border-transparent"
                  }`}
              >
                <img
                  src={getImageUrl(img)}
                  className="w-full h-[110px] object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="max-w-[92%] mx-auto mt-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-10">
          <h1 className="text-4xl font-bold mb-3">{property.title}</h1>

          <p className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin size={18} /> {property.location}
          </p>

          <p className="text-3xl font-semibold text-green-700 mb-8">
            {property.price
              ? `₹ ${property.price.toLocaleString()}`
              : "Price on request"}
          </p>

          <div className="grid grid-cols-3 gap-6 text-center mb-10">
            {property.bedrooms && (
              <div className="bg-gray-50 rounded-2xl p-4">
                <Bed className="mx-auto mb-2" /> {property.bedrooms} Beds
              </div>
            )}
            {property.bathrooms && (
              <div className="bg-gray-50 rounded-2xl p-4">
                <Bath className="mx-auto mb-2" /> {property.bathrooms} Baths
              </div>
            )}
            {property.areaSqft && (
              <div className="bg-gray-50 rounded-2xl p-4">
                <Maximize className="mx-auto mb-2" /> {property.areaSqft} Sqft
              </div>
            )}
          </div>

          {/* HIGHLIGHTS */}
          {property.highlights?.length && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Key Highlights</h2>
              <ul className="grid sm:grid-cols-2 list-disc list-inside gap-2">
                {property.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </section>
          )}

          {/* EXTRA HIGHLIGHTS */}
          {property.extraHighlights?.length && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">
                Extra Highlights
              </h2>
              <ul className="grid sm:grid-cols-2 list-disc list-inside gap-2">
                {property.extraHighlights.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </section>
          )}

          {/* AMENITIES */}
          {property.featuresAmenities?.length && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">
                Features & Amenities
              </h2>
              <ul className="grid sm:grid-cols-2 list-disc list-inside gap-2">
                {property.featuresAmenities.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </section>
          )}

          {/* NEARBY */}
          {property.nearby?.length && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Nearby</h2>
              <ul className="grid sm:grid-cols-2 list-disc list-inside gap-2">
                {property.nearby.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </section>
          )}
          
          {/* MAP
          {property.googleMapUrl && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Location Map</h2>
              <iframe
                src={getGoogleMapEmbedUrl(property.googleMapUrl)}
                className="w-full h-[320px] rounded-2xl border"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </section>
          )} */}



          {/* VIDEO */}
          {property.videoLink && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Property Video</h2>
              <iframe
                src={getYoutubeEmbedUrl(property.videoLink)}
                className="w-full h-[380px] rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </section>
          )}

        </div>

        {/* ENQUIRY */}
        <div className="sticky top-[110px] bg-white rounded-3xl shadow-xl p-8 h-fit">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Enquire Now
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border rounded-xl px-4 py-3"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-xl px-4 py-3"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border rounded-xl px-4 py-3"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Message"
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
            >
              {sending ? "Sending..." : "Send Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
