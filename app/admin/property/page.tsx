"use client";

import { useEffect, useState } from "react";
import AddProperty from "../../components/AddProperty";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Property {
  _id: string;
  title: string;
  slug: string;
  location: string;
  createdAt: string;
}

export default function AdminPropertiesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [images, setImages] = useState<FileList | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /* SEARCH & PAGINATION */
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /* FETCH */
  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/property/`);
      const data = await res.json();
      setProperties(data);
    } catch {
      setError("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  /* IMAGE UPDATE (PATCH) */
  const updateImages = async () => {
    if (!images || !selectedProperty) return;

    const formData = new FormData();
    Array.from(images).forEach((img) => formData.append("images", img));

    try {
      const res = await fetch(
        `${API_URL}/property/${selectedProperty.slug}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!res.ok) throw new Error();

      setSuccessMessage("Images updated successfully 🖼️");
      setSelectedProperty(null);
      setImages(null);
      fetchProperties();

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch {
      alert("Image update failed");
    }
  };

  /* DELETE */
  const deleteProperty = async (slug: string) => {
    if (!confirm("Delete this property?")) return;

    await fetch(`${API_URL}/property/${slug}`, { method: "DELETE" });
    setProperties((p) => p.filter((i) => i.slug !== slug));
    setSelectedProperty(null);
    setSuccessMessage("Property deleted successfully ✅");

    setTimeout(() => setSuccessMessage(null), 3000);
  };

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

  if (loading) return <p className="p-10 text-xl">Loading...</p>;
  if (error) return <p className="p-10 text-red-600 text-xl">{error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 to-slate-100">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Properties</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 text-lg rounded-full text-white
                     bg-gradient-to-r from-green-600 to-emerald-500 shadow"
        >
          {showAddForm ? "Close" : "+ Add Property"}
        </button>
      </div>

      {/* SEARCH */}
      {!showAddForm && (
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search title or location..."
          className="mb-6 w-full md:w-1/3 px-5 py-3 text-lg rounded-full border shadow"
        />
      )}

      {/* ADD FORM */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <AddProperty />
        </div>
      )}

      {/* TABLE */}
      {!showAddForm && (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-lg">
            <thead className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-center">Created</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => (
                <tr key={p._id} className="border-t hover:bg-slate-50">
                  <td className="p-4 font-semibold">{p.title}</td>
                  <td className="p-4">{p.location}</td>
                  <td className="p-4 text-center">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelectedProperty(p)}
                      className="text-green-700 font-bold hover:underline"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION (DESKTOP + MOBILE) */}
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
      {/* TOAST */}
      {successMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2
                        bg-green-600 text-white px-6 py-3
                        text-lg rounded-xl shadow">
          {successMessage}
        </div>
      )}

      {/* MODAL – IMAGE ONLY */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">Update Images</h2>
            <p className="mb-4 text-gray-600">{selectedProperty.title}</p>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              className="mb-4 text-lg"
            />

            <div className="flex gap-3">
              <button
                onClick={updateImages}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-lg"
              >
                Update Images
              </button>

              <button
                onClick={() => deleteProperty(selectedProperty.slug)}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg text-lg"
              >
                Delete
              </button>
            </div>

            <button
              onClick={() => setSelectedProperty(null)}
              className="mt-4 w-full border py-2 rounded-lg text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
