"use client";

import { useEffect, useState } from "react";
import { FileText, Users } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Link from "next/link";

interface Lead {
    _id: string;
    name: string;
    createdAt: string;
}

interface Blog {
    _id: string;
    datePublished: string;
}

interface ChartData {
    date: string;
    leads: number;
    blogs: number;
    views: number; // 🔥 new field for blog traffic
}

export default function AdminDashboardPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState<ChartData[]>([]);

    // Fetch Leads, Blogs, and Blog Traffic
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [leadsRes, blogsRes, trafficRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lead/all`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/viewblog`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/analytics/views`), // 🔥 new
                ]);

                const leadsData: Lead[] = await leadsRes.json();
                const blogsData: Blog[] = await blogsRes.json();
                const trafficData: { date: string; views: number }[] = await trafficRes.json(); // 🔥 new

                setLeads(leadsData || []);
                setBlogs(blogsData || []);

                // Group by date
                const dateMap: Record<string, { leads: number; blogs: number; views: number }> = {};

                leadsData.forEach((l) => {
                    const date = new Date(l.createdAt).toLocaleDateString();
                    if (!dateMap[date]) dateMap[date] = { leads: 0, blogs: 0, views: 0 };
                    dateMap[date].leads += 1;
                });

                blogsData.forEach((b) => {
                    const date = new Date(b.datePublished).toLocaleDateString();
                    if (!dateMap[date]) dateMap[date] = { leads: 0, blogs: 0, views: 0 };
                    dateMap[date].blogs += 1;
                });

                trafficData.forEach((t) => {
                    const date = new Date(t.date).toLocaleDateString();
                    if (!dateMap[date]) dateMap[date] = { leads: 0, blogs: 0, views: 0 };
                    dateMap[date].views = t.views;
                });

                const chartArray: ChartData[] = Object.keys(dateMap)
                    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                    .map((date) => ({
                        date,
                        leads: dateMap[date].leads,
                        blogs: dateMap[date].blogs,
                        views: dateMap[date].views,
                    }));

                setChartData(chartArray);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const totalLeads = leads.length;
    const totalBlogs = blogs.length;

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-8">
            {/* PAGE HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1">
                    Overview of leads, blogs activity and blog traffic
                </p>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* TOTAL BLOGS */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
                    <FileText className="absolute right-4 bottom-4 text-white/20" size={96} />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-white/20 backdrop-blur">
                            <FileText size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-blue-100">Total Blogs</p>
                            <h3 className="text-3xl font-bold">{loading ? "..." : totalBlogs}</h3>
                        </div>
                    </div>
                </div>

                {/* TOTAL LEADS */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 p-6 text-white shadow-lg">
                    <Users className="absolute right-4 bottom-4 text-white/20" size={96} />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-4 rounded-2xl bg-white/20 backdrop-blur">
                            <Users size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-purple-100">Total Leads</p>
                            <h3 className="text-3xl font-bold">{loading ? "..." : totalLeads}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* ANALYTICS CHART */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Activity Over Time</h2>
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="leads" name="Leads" stroke="#7c3aed" strokeWidth={2} />
                            <Line type="monotone" dataKey="blogs" name="Blogs" stroke="#3b82f6" strokeWidth={2} />
                            <Line type="monotone" dataKey="views" name="Blog Views" stroke="#10b981" strokeWidth={2} /> {/* 🔥 Added */}
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-500 text-center py-20">
                        No activity data available
                    </p>
                )}
            </div>

            {/* QUICK LINKS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                    href="/admin/blogs"
                    className="flex items-center gap-4 p-4 rounded-xl border hover:bg-gray-50 transition"
                >
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                        <FileText />
                    </div>
                    <div>
                        <p className="font-medium text-gray-800">Manage Blogs</p>
                        <p className="text-sm text-gray-500">View, edit or delete blog posts</p>
                    </div>
                </Link>

                <Link
                    href="/admin/leads"
                    className="flex items-center gap-4 p-4 rounded-xl border hover:bg-gray-50 transition"
                >
                    <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                        <Users />
                    </div>
                    <div>
                        <p className="font-medium text-gray-800">Manage Leads</p>
                        <p className="text-sm text-gray-500">View all leads</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
