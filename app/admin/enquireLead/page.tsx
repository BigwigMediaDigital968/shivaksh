"use client";

import { useEffect, useState, useMemo } from "react";
import { Mail, Phone } from "lucide-react";

interface EnquireLead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 8;

export default function AdminEnquireLeadsPage() {
  const [leads, setLeads] = useState<EnquireLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Fetch leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquireForm/view`);
        if (!res.ok) throw new Error("Failed to fetch enquiry leads");
        const data: EnquireLead[] = await res.json();
        setLeads(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);
  
  console.log(leads);

  // Combine sort, filter, and paginate
  const paginatedLeads = useMemo(() => {
    // 1️⃣ Sort newest first
    // let sorted = [...leads].sort(
    //   (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    // );
    // console.log("Sorted Leads:", sorted);
    let sorted=[...leads];
    // 2️⃣ Filter by search
    if (search) {
      const s = search.toLowerCase();
      sorted= leads.filter(
        (l) =>
          l.name.toLowerCase().includes(s) ||
          l.email.toLowerCase().includes(s) ||
          l.phone.includes(s)
      );
    }

    // 3️⃣ Pagination
    const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return sorted.slice(start, end);
  }, [leads, search, page]);

  // Total filtered leads count
  const totalFilteredLeads = useMemo(() => {
    return leads
      
      .filter((l) => {
        if (!search) return true;
        const s = search.toLowerCase();
        return (
          l.name.toLowerCase().includes(s) ||
          l.email.toLowerCase().includes(s) ||
          l.phone.includes(s)
        );
      }).length;
  }, [leads, search]);

  console.log(totalFilteredLeads);

  const totalPages = Math.max(1, Math.ceil(totalFilteredLeads / ITEMS_PER_PAGE));

  // Reset page when search changes
  useEffect(() => setPage(1), [search]);

  if (loading) return <div className="p-6 text-lg font-medium">Loading enquiry leads...</div>;
  if (error) return <div className="p-6 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Enquiry Leads</h1>
            <p className="text-blue-100 mt-1">Manage and track all enquiries</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-4 flex items-center gap-4">
            <div>
              <p className="text-sm text-blue-100">Total Leads</p>
              <p className="text-2xl font-bold">{totalFilteredLeads}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow p-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, phone..."
          className="w-full pl-4 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="p-6 text-left">Lead</th>
              <th className="p-6 text-left">Contact</th>
              <th className="p-6 text-left">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedLeads.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-500">
                  No enquiry leads found
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-blue-50">
                  <td className="p-6 font-bold text-lg">{lead.name}</td>
                  <td className="p-6 space-y-1">
                    <p className="flex items-center gap-2"><Mail size={14} /> {lead.email}</p>
                    <p className="flex items-center gap-2"><Phone size={14} /> {lead.phone}</p>
                  </td>
                  <td className="p-6 text-gray-600 max-w-md">{lead.message || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden space-y-5">
        {paginatedLeads.map((lead) => (
          <div key={lead._id} className="bg-white rounded-3xl p-6 shadow">
            <h3 className="text-xl font-bold">{lead.name}</h3>
            <div className="mt-3 space-y-2">
              <p className="flex gap-2"><Mail size={14} /> {lead.email}</p>
              <p className="flex gap-2"><Phone size={14} /> {lead.phone}</p>
            </div>
            <p className="mt-3 text-sm text-gray-600">{lead.message || "-"}</p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            &lt;
          </button>
          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
