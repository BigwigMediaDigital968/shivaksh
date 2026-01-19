"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import heroImg from "../../assets/hero/hero2.jpg";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  datePublished: string;
  coverImage: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`);
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <PageHero
        title="Blogs"
        subtitle="Latest insights and updates around buying, investing, and verifying properties."
        image={heroImg}
      />

      <section className="bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto py-16">
          {loading ? (
            <p className="text-center text-gray-600">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center text-gray-600">No blogs available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blogs/${blog.slug}`}
                  className="group border border-[var(--border-color)] bg-[var(--secondary-bg)] overflow-hidden"
                >
                  <div className="relative h-[220px]">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs tracking-[0.25em] uppercase text-[var(--primary-color)]">
                      {blog.category || "General"} • {new Date(blog.datePublished).toLocaleDateString()}
                    </p>
                    <h3 className="mt-3 font-heading text-xl text-[var(--text-primary)] group-hover:text-[var(--primary-color)] transition">
                      {blog.title}
                    </h3>
                    <p className="mt-2 text-gray-700">{blog.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
