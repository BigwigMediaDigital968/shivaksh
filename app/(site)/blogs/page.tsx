"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  datePublished: string;
  category?: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/viewblog`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setBlogs(data || []);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section
      className="min-h-screen bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* DARK LUXURY OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 backdrop-blur-sm" />

      {/* CONTENT */}
      <div className="relative z-10 pt-36 pb-28">
        {/* HEADER */}
        <div className="text-center mb-20 px-4">
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-wide">
            Our Blogs
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-lg">
            Insights, guides & updates from our real estate experts
          </p>
        </div>

        <div className="w-11/12 md:w-5/6 xl:w-4/5 mx-auto">
          {/* LOADING */}
          {loading && (
            <p className="text-center text-gray-300 text-lg">
              Loading blogs...
            </p>
          )}

          {/* EMPTY */}
          {!loading && blogs.length === 0 && (
            <p className="text-center text-gray-300 text-lg">
              No blogs available.
            </p>
          )}

          {/* BLOG GRID */}
          {!loading && blogs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  className="group relative rounded-3xl overflow-hidden
                  bg-white/10 backdrop-blur-xl border border-white/15
                  shadow-[0_10px_40px_rgba(0,0,0,0.4)]
                  transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(202,162,77,0.25)]"
                >
                  {/* IMAGE */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wider text-gray-300">
                      {blog.category || "General"} •{" "}
                      {new Date(blog.datePublished).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-[#caa24d] transition">
                      {blog.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        By {blog.author}
                      </span>
                      <span className="text-sm font-medium text-[#caa24d]">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
