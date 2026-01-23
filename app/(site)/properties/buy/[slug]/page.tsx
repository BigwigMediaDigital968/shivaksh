"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  useEffect(() => {
    fetchProperty();
  }, [slug]);

  useEffect(() => {
    if (property?.images?.length) {
      slideInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % property.images.length);
      }, 1000); // 1 second per slide
      return () => {
        if (slideInterval.current) clearInterval(slideInterval.current);
      };
    }
  }, [property]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <WebLoader />
      </div>
    );

  if (error) return <p className="p-10 text-red-600 text-xl">{error}</p>;
  if (!property) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[90%] mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* IMAGE CAROUSEL */}
        <div className="relative lg:h-[500px] h-96 flex overflow-hidden">
          {property.images?.[currentIndex] ? (
            <img
              src={property.images[currentIndex]}
              alt={property.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <span className="text-gray-500 text-lg">No Image</span>
            </div>
          )}

          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % property.images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* DETAILS */}
        <div className="p-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{property.title}</h1>
          <p className="text-gray-600 text-lg mb-3">📍 {property.location}</p>
          <p className="text-green-700 font-semibold text-3xl mb-6">
            {property.price ? `₹${property.price.toLocaleString()}` : "Price on request"}
          </p>

          <div className="flex gap-6 text-gray-700 text-lg font-medium mb-6">
            {property.bedrooms !== undefined && <span>🛏 {property.bedrooms}</span>}
            {property.bathrooms !== undefined && <span>🛁 {property.bathrooms}</span>}
            {property.areaSqft !== undefined && <span>📐 {property.areaSqft} sqft</span>}
          </div>

          {property.highlights?.length && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Key Highlights:</h2>
              <ul className="list-disc list-inside text-gray-700">
                {property.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {property.featuresAmenities?.length && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Amenities:</h2>
              <ul className="list-disc list-inside text-gray-700">
                {property.featuresAmenities.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {property.nearby?.length && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Nearby:</h2>
              <ul className="list-disc list-inside text-gray-700">
                {property.nearby.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
