"use client";

import { ReactNode, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ================= SIDEBAR ================= */}
      <AdminSidebar />

      {/* ================= CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col">
        {/* MOBILE TOP BAR SPACER */}
        <div className="md:hidden h-16" />

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
