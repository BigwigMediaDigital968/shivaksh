"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
}

export default function PropertiesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* SEARCH & PAGINATION */
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  /* FETCH PROPERTIES */
  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/property/`);
      if (!res.ok) throw new Error("Failed to fetch properties");
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
  }, []);

  /* FILTER */
  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  /* PAGINATION */
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  /* IMAGE CAROUSEL STATE */
  const [currentImages, setCurrentImages] = useState<{ [key: string]: number }>({});

  const nextImage = (id: string, length: number) => {
    setCurrentImages((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1 >= length ? 0 : (prev[id] ?? 0) + 1,
    }));
  };

  const prevImage = (id: string, length: number) => {
    setCurrentImages((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) - 1 < 0 ? length - 1 : (prev[id] ?? 0) - 1,
    }));
  };

  if (loading) return <p className="p-10 text-xl">Loading properties...</p>;
  if (error) return <p className="p-10 text-red-600 text-xl">{error}</p>;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO/BANNER */}
      <div
        className="relative h-64 sm:h-96 w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative text-white text-3xl sm:text-5xl font-bold z-10">
          Explore Our Properties
        </h1>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">

        {/* SEARCH */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by title or location..."
            className="w-full md:w-1/3 px-5 py-3 rounded-full border shadow text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* PROPERTY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginated.map((p) => {
            const currentIndex = currentImages[p._id] ?? 0;
            return (
              <div
                key={p._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* IMAGE CAROUSEL */}
                <div className="relative h-64 sm:h-80">
                  {p.images && p.images.length > 0 ? (
                    <>
                                        <img
                      src={p.images[currentIndex]}
                      alt={p.title}
                      className="h-full w-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-105"
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

                {/* PROPERTY DETAILS */}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">{p.title}</h2>
                  <p className="text-gray-600 mb-2 flex items-center gap-1">
                    <span>📍</span> {p.location}
                  </p>
                  <p className="text-gray-900 font-medium mb-3">
                    {p.price ? `₹${p.price.toLocaleString()}` : "Price on request"}
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
