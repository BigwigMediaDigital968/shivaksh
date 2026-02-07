"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Phone,
  CheckCircle,
  Calendar,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  purpose: string;
  propertyType: string;
  verified: boolean;
  createdAt: string;
}



const ITEMS_PER_PAGE = 8;

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lead/all`)
      .then((res) => res.json())
      .then((data) => setLeads(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- FILTER + SEARCH ---------------- */
  const filteredLeads = useMemo(() => {
    let data = [...leads];

    if (search) {
      const s = search.toLowerCase();
      data = data.filter(
        (l) =>
          l.name.toLowerCase().includes(s) ||
          l.email.toLowerCase().includes(s) ||
          l.phone.includes(s)
      );
    }

    if (purposeFilter !== "all") {
      data = data.filter(
        (l) => l.purpose.toLowerCase() === purposeFilter
      );
    }

    data.sort((a, b) =>
      sortOrder === "newest"
        ? +new Date(b.createdAt) - +new Date(a.createdAt)
        : +new Date(a.createdAt) - +new Date(b.createdAt)
    );

    return data;
  }, [leads, search, purposeFilter, sortOrder]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredLeads.length / ITEMS_PER_PAGE)
  );

  const paginatedLeads = filteredLeads.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [search, purposeFilter, sortOrder]);

  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Verified Leads</h1>
            <p className="text-blue-100 mt-1">
              Manage and track all verified inquiries
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-4 flex items-center gap-4">
            <Users />
            <div>
              <p className="text-sm text-blue-100">Total Leads</p>
              <p className="text-2xl font-bold">
                {filteredLeads.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="bg-white rounded-2xl shadow p-5 grid gap-4 md:grid-cols-4">
        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone..."
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* PURPOSE */}
        <div className="relative">
          <Filter className="absolute left-3 top-3 text-gray-400" size={16} />
          <select
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm"
          >
            <option value="all">All Purposes</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        {/* SORT */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block bg-white rounded-3xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="p-6 text-left">Lead</th>
              <th className="p-6 text-left">Contact</th>
              <th className="p-6 text-left">Purpose</th>
              <th className="p-6 text-left">Property Type</th>
              <th className="p-6 text-left">Message</th>
              <th className="p-6 text-center">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {paginatedLeads.map((lead) => (
              <tr key={lead._id} className="hover:bg-blue-50">
                <td className="p-6">
                  <p className="font-bold text-lg">{lead.name}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full mt-1">
                    <CheckCircle size={12} /> Verified
                  </span>
                </td>

                <td className="p-6 space-y-1">
                  <p className="flex items-center gap-2">
                    <Mail size={14} /> {lead.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={14} /> {lead.phone}
                  </p>
                </td>

                <td className="p-6">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                    {lead.purpose}
                  </span>
                </td>
                <td className="p-6">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                    {lead.propertyType}
                  </span>
                </td>
                
                <td className="p-6 text-gray-600 max-w-md">
                  {lead.message}
                </td>

                <td className="p-6 text-center">
                  <span className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <Calendar size={14} />
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="lg:hidden space-y-5">
        {paginatedLeads.map((lead) => (
          <div
            key={lead._id}
            className="bg-white rounded-3xl p-6 shadow"
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-bold">{lead.name}</h3>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                Verified
              </span>
            </div>

            <div className="mt-3 space-y-2">
              <p className="flex gap-2">
                <Mail size={14} /> {lead.email}
              </p>
              <p className="flex gap-2">
                <Phone size={14} /> {lead.phone}
              </p>
            </div>
            <p className="mt-3">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                {lead.propertyType}
              </span>
            </p>
            <p className="mt-3 text-sm text-gray-600">
              {lead.message}
            </p>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                {lead.purpose}
              </span>
              {new Date(lead.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
