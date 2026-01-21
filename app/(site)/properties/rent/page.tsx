"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WebLoader from "../../../components/WebLoader";

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
  createdAt: string;
  purpose: "Buy" | "Rent" | "Sell";
}

export default function RentPropertiesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* SEARCH & PAGINATION */
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  /* IMAGE CAROUSEL STATE */
  const [currentImages, setCurrentImages] = useState<{ [key: string]: number }>({});
  const slideIntervals = useRef<{ [key: string]: NodeJS.Timeout }>({});

  /* FETCH RENT PROPERTIES */
  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/property`);
      if (!res.ok) throw new Error("Failed to fetch rent properties");
      const data = await res.json();
      setProperties(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    return () => {
      Object.values(slideIntervals.current).forEach(clearInterval);
    };
  }, []);
  console.log(properties);

  /* FILTER */
 const filtered = properties
  .filter((p) => p.purpose === "Rent")
  .filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  /* PAGINATION */
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  /* IMAGE CONTROLS */
  const nextImage = (id: string, length: number) => {
    setCurrentImages((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) + 1) % length,
    }));
  };

  const prevImage = (id: string, length: number) => {
    setCurrentImages((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) - 1 < 0 ? length - 1 : (prev[id] ?? 0) - 1,
    }));
  };

  /* AUTO SLIDE */
  const startAutoSlide = (id: string, length: number) => {
    if (slideIntervals.current[id]) return;
    slideIntervals.current[id] = setInterval(() => {
      setCurrentImages((prev) => ({
        ...prev,
        [id]: ((prev[id] ?? 0) + 1) % length,
      }));
    }, 2500);
  };

  const stopAutoSlide = (id: string) => {
    if (slideIntervals.current[id]) {
      clearInterval(slideIntervals.current[id]);
      delete slideIntervals.current[id];
    }
  };

  /* LOADING */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <WebLoader />
      </div>
    );

  if (error) return <p className="p-10 text-red-600 text-xl">{error}</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1800&q=80')",
      }}
    >
      {/* HERO */}
      <div className="relative h-64 pt-7 w-full flex items-center justify-center">
        <h1 className="relative text-white text-3xl sm:text-5xl font-bold z-10 text-center px-4">
          Find Your Perfect Rental Home 
        </h1>
      </div>

      {/* CONTENT */}
      <div className="max-w-[90%] px-6 sm:px-8 lg:px-12 py-12 bg-transparent rounded-3xl -mt-15 mx-6 sm:mx-auto shadow-lg border-2 border-white/30">
        {/* SEARCH */}
        <div className="flex text-white justify-center mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or location..."
            className="w-full md:w-1/3 px-5 py-3 rounded-full border shadow text-lg focus:outline-none placeholder:text-white border-white/70 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginated.map((p) => {
            const currentIndex = currentImages[p._id] ?? 0;

            return (
              <div
                key={p._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* IMAGE */}
                <div
                  className="relative h-64 sm:h-80"
                  onMouseEnter={() => startAutoSlide(p._id, p.images.length)}
                  onMouseLeave={() => stopAutoSlide(p._id)}
                >
                  {p.images?.length > 0 ? (
                    <>
                      <img
                        src={p.images[currentIndex]}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />

                      {p.images.length > 1 && (
                        <>
                          <button
                            onClick={() => prevImage(p._id, p.images.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
                          >
                            <ChevronLeft />
                          </button>
                          <button
                            onClick={() => nextImage(p._id, p.images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
                          >
                            <ChevronRight />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">{p.title}</h2>
                  <p className="text-gray-600 mb-2">📍 {p.location}</p>
                  <p className="text-gray-900 font-medium mb-3">
                    {p.price ? `₹${p.price.toLocaleString()} / month` : "Rent on request"}
                  </p>
                  <div className="flex gap-6 text-gray-700 text-sm sm:text-base font-medium">
                    {p.bedrooms !== undefined && <span>🛏 {p.bedrooms}</span>}
                    {p.bathrooms !== undefined && <span>🛁 {p.bathrooms}</span>}
                    {p.areaSqft !== undefined && <span>📐 {p.areaSqft} sqft</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              <ChevronLeft />
            </button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
