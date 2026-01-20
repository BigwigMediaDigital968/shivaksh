"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import heroImg from "../../assets/hero/hero2.jpg";

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
    <>
      {/* HERO */}
      <PageHero
        title="Blogs"
        subtitle="Insights, guides & updates from our real estate experts"
        image={heroImg}
      />

      {/* BLOG LIST */}
      <section className="bg-gray-50 py-16">
        <div className="w-11/12 md:w-5/6 mx-auto">
          {/* LOADING */}
          {loading && (
            <p className="text-center text-gray-500">Loading blogs...</p>
          )}

          {/* EMPTY */}
          {!loading && blogs.length === 0 && (
            <p className="text-center text-gray-500">No blogs available.</p>
          )}

          {/* GRID */}
          {!loading && blogs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  className="group rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-200 transform transition hover:scale-105 hover:shadow-2xl"
                >
                  {/* IMAGE */}
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 50vw,
                             33vw"
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      {blog.category || "General"} •{" "}
                      {new Date(blog.datePublished).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
                      {blog.title}
                    </h3>

                    <p className="mt-2 text-gray-600 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <p className="mt-4 text-sm text-gray-500">
                      By {blog.author}
                    </p>

                    <p className="mt-4 text-blue-600 font-medium uppercase tracking-wide">
                      Read More →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
