"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Blog {
  title: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  datePublished: string;
}

interface Heading {
  id: string;
  text: string;
}

export default function BlogSlugPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const router = useRouter();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    const fetchBlog = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`,
          { signal: controller.signal }
        );

        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        if (!res.ok) throw new Error("Fetch failed");

        const data: Blog = await res.json();

        // TOC logic
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.content;

        const h2s = Array.from(tempDiv.querySelectorAll("h2"));
        const toc = h2s.map((h, i) => {
          const id = `heading-${i}`;
          h.setAttribute("id", id);
          return { id, text: h.textContent || `Section ${i + 1}` };
        });

        data.content = tempDiv.innerHTML;

        setBlog(data);
        setHeadings(toc);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
          setNotFound(true);
        }
      } finally {
        setHasFetched(true);
        setLoading(false);
      }
    };

    fetchBlog();
    return () => controller.abort();
  }, [slug]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y =
      el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  /* ---------------- RENDER STATES ---------------- */

  // 1️⃣ Wait for slug hydration
  if (!slug || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 animate-pulse">
        <div className="h-[400px] w-full max-w-5xl bg-gray-200 rounded-xl" />
      </div>
    );
  }

  // 2️⃣ Only show 404 AFTER fetch finished
  if (hasFetched && (notFound || !blog)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-100 to-purple-200">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-gray-600 mb-6">Blog not found or removed.</p>
        <button
          onClick={() => router.push("/blogs")}
          className="px-6 py-3 bg-purple-700 text-white rounded-lg"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  /* ---------------- BLOG CONTENT ---------------- */

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-0 w-full h-20 bg-purple-700 z-20" />
      <div className="absolute top-20 left-0 w-full h-4 bg-gradient-to-b from-purple-700 to-transparent z-10" />

      <article className="pt-32 max-w-5xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold mb-6 text-center"
        >
          {blog!.title}
        </motion.h1>

        {blog!.coverImage && (
          <div className="relative h-[450px] rounded-xl overflow-hidden mb-6">
            <Image
              src={blog!.coverImage}
              alt={blog!.coverImageAlt || blog!.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {headings.length > 0 && (
          <div className="bg-purple-100 rounded-xl p-6 mb-8">
            <h3 className="font-semibold mb-3">Contents</h3>
            {headings.map(h => (
              <button
                key={h.id}
                onClick={() => scrollToHeading(h.id)}
                className="block text-left text-purple-700 hover:underline"
              >
                {h.text}
              </button>
            ))}
          </div>
        )}

        <p className="text-gray-500 mb-6 text-center">
          By {blog!.author} •{" "}
          {new Date(blog!.datePublished).toLocaleDateString()}
        </p>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog!.content }}
        />
      </article>
    </div>
  );
}
