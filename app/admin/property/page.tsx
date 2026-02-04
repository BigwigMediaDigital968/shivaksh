"use client";

import { useEffect, useState } from "react";
import AddProperty from "../../components/AddProperty";
import { ChevronLeft, ChevronRight, X, Pencil, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* TYPES */
interface Property {
  _id: string;
  title: string;
  slug: string;
  description: string;
  purpose: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
  extraHighlights: string[];
  googleMapUrl: string;
  videoLink: string;
  images: string[];
  createdAt: string;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const [editData, setEditData] = useState<any>({});
  const [newImages, setNewImages] = useState<File[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  /* SEARCH + PAGINATION */
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /* FETCH */
  const fetchProperties = async () => {
    try {
      const res = await fetch(`${API_URL}/property`);
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

  /* OPEN EDIT */
  const openEdit = (property: Property) => {
    setSelectedProperty(property);
    setEditData({
      ...property,
      highlights: property.highlights.join(", "),
      featuresAmenities: property.featuresAmenities.join(", "),
      nearby: property.nearby.join(", "),
      extraHighlights: property.extraHighlights.join(", "),
    });
    setNewImages([]);
    setRemovedImages([]);
  };

  /* INPUT */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  /* IMAGE */
  const addImages = (files: FileList | null) => {
    if (!files) return;
    setNewImages((prev) => [...prev, ...Array.from(files)]);
  };

  const removeExistingImage = (img: string) => {
    setRemovedImages((prev) => [...prev, img]);
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* UPDATE */
  const updateProperty = async () => {
    if (!selectedProperty) return;

    const formData = new FormData();

    Object.entries(editData).forEach(([key, value]) => {
      if (
        ["highlights", "featuresAmenities", "nearby", "extraHighlights"].includes(
          key
        )
      ) {
        formData.append(
          key,
          String(value)
            .split(",")
            .map((v) => v.trim())
            .join(",")
        );
      } else {
        formData.append(key, String(value));
      }
    });

    removedImages.forEach((img) =>
      formData.append("removeImages", img)
    );
    newImages.forEach((img) => formData.append("images", img));

    try {
      await fetch(`${API_URL}/property/${selectedProperty.slug}`, {
        method: "PATCH",
        body: formData,
      });

      toast.success("Property updated successfully ✅");
      setSelectedProperty(null);
      fetchProperties();
    } catch {
      toast.error("Update failed ❌");
    }
  };

  /* DELETE */
  const deleteProperty = async (slug: string) => {
    if (!confirm("Delete this property?")) return;

    try {
      await fetch(`${API_URL}/property/${slug}`, { method: "DELETE" });
      toast.success("Property deleted ❌");
      fetchProperties();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* FILTER */
  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p className="p-10">Loading...</p>;
  if (error) return <p className="p-10 text-red-600">{error}</p>;

  const getImageUrl = (img: string) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;

    // handles cases where API_URL = http://localhost:5000/api
    return `${API_URL}.replace("/api", "")}/${img}`;
  };

  return (
    <div className="min-h-screen p-8 bg-slate-100">
      <ToastContainer position="top-center" />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Properties</h1>
        <button
          onClick={() => setShowAddPopup(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-full"
        >
          + Add Property
        </button>
      </div>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search property..."
        className="mb-6 px-5 py-3 w-full md:w-1/3 rounded-full border"
      />

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-4 font-semibold">{p.title}</td>
                <td className="p-4">{p.location}</td>
                <td className="p-4 text-center flex justify-center gap-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="px-3 py-2 bg-blue-600 text-white rounded flex items-center gap-1"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => deleteProperty(p.slug)}
                    className="px-3 py-2 bg-red-600 text-white rounded flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD PROPERTY POPUP */}
      {showAddPopup && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center p-6"
          onClick={() => setShowAddPopup(false)}
        >
          <div
            className="bg-white w-full max-w-5xl rounded-3xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddPopup(false)}
              className="absolute top-4 right-4 text-white"
            >
              <X />
            </button>
            <AddProperty />
          </div>
        </div>
      )}

      {/* EDIT POPUP */}
      {/* EDIT PROPERTY POPUP */}
      {selectedProperty && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center p-6"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="bg-white w-full max-w-4xl rounded-3xl p-6 max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 "
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-6">Edit Property</h2>

            {/* BASIC DETAILS */}
            <h3 className="text-lg font-semibold mb-3">Basic Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Title</h3>
                <textarea
                  name="title"
                  value={editData.title || ""}
                  onChange={handleChange}
                  className="w-full border p-0.5 rounded-l"
                />
              </div>


              <div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Location</h3>
                <textarea
                  name="location"
                  value={editData.location || ""}
                  onChange={handleChange}
                  className="w-full border p-0.5 rounded-l"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Purpose</h3>
                <select
                  name="purpose"
                  value={editData.purpose || "Buy"}
                  onChange={handleChange}
                  className="w-[70%] border p-2"
                >
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                  <option value="Lease">Lease</option>
                </select>
              </div>

              <div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Price</h3>
                <textarea
                  name="price"
                  value={editData.price || ""}
                  onChange={handleChange}
                  className="w-full border p-0.5 rounded-l"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Bedrooms</h3>
                <textarea
                  name="bedrooms"
                  value={editData.bedrooms || ""}
                  onChange={handleChange}
                  className="w-full border p-0.5 rounded-l"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Bathrooms</h3>
                <textarea
                  name="bathrooms"
                  value={editData.bathrooms || ""}
                  onChange={handleChange}
                  className="w-full border p-0.5 rounded-l"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Area (sqft)</h3>
                <textarea
                  name="areaSqft"
                  value={editData.areaSqft || ""}
                  onChange={handleChange}
                  className="w-full border p-0.5 rounded-l"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <h3 className="text-lg font-semibold mt-6 mb-3">Description</h3>
            <textarea
              name="description"
              value={editData.description || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            {/* AMENITIES & FEATURES */}

            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Highlights</h3>
                <textarea
                  name="highlights"
                  value={editData.highlights || ""}
                  onChange={handleChange}
                  className="w-100 border p-0.5 rounded-lg"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Features & Amenities</h3>
                <input
                  name="featuresAmenities"
                  value={editData.featuresAmenities || ""}
                  onChange={handleChange}
                  placeholder="Comma separated"
                  className="w-100 border p-0.5 rounded-lg"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Nearby</h3>
                <input
                  name="nearby"
                  value={editData.nearby || ""}
                  onChange={handleChange}
                  placeholder="Comma separated"
                  className="w-100 border p-0.5 rounded-lg"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mt-6 mb-3">Extra Highlights</h3>
                <input
                  name="extraHighlights"
                  value={editData.extraHighlights || ""}
                  onChange={handleChange}
                  placeholder="Comma separated"
                  className="w-100 border p-0.5 rounded-lg"
                />
              </div>

              
            <div>
              <h3 className="text-lg font-semibold mt-6 mb-3">Google Map URL</h3>
              <input
                name="googleMapUrl"
                value={editData.googleMapUrl || ""}
                onChange={handleChange}
                className="w-100 border p-0.5 rounded-lg"
              />
            </div>


            <div>
              <label className="text-lg font-semibold mt-6 mb-3">Video Link </label>
              <input
                name="videoLink"
                value={editData.videoLink || ""}
                onChange={handleChange}
                className="w-100 border p-0.5 rounded-lg"
              />
            </div>
            </div>

            {/* MAP & VIDEO */}




            {/* EXISTING IMAGES */}
            <h3 className="text-lg font-semibold mt-6 mb-3">Existing Images</h3>
            <div className="grid grid-cols-4 gap-3">
              {selectedProperty.images
                .filter((img) => !removedImages.includes(img))
                .map((img) => (
                  <div key={img} className="relative">
                    <img
                      src={getImageUrl(img)}
                      className="h-28 w-full object-cover rounded"
                    />
                    <button
                      onClick={() => removeExistingImage(img)}
                      className="absolute top-1 right-1 bg-black/70 text-white px-2 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
            </div>

            {/* ADD NEW IMAGES */}
            <h3 className="text-lg font-semibold mt-6 mb-3">Add New Images</h3>
            <input
              type="file"
              multiple
              onChange={(e) => addImages(e.target.files)}
            />

            <div className="grid grid-cols-4 gap-3 mt-3">
              {newImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    className="h-28 w-full object-cover rounded"
                  />
                  <button
                    onClick={() => removeNewImage(i)}
                    className="absolute top-1 right-1 bg-black/70 text-white px-2 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={updateProperty}
                className="px-6 py-3 bg-green-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
