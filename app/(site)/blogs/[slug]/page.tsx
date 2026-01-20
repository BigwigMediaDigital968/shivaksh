"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import InlineEnquiryForm from "../../../components/EnquiryForm";

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
  const slug = params?.slug as string;
  const router = useRouter();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [animate, setAnimate] = useState(false);

  /* ---------------- FETCH BLOG ---------------- */
  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`
        );

        if (res.status === 404) {
          setNotFound(true);
          return;
        }

        const data: Blog = await res.json();

        // TOC
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = data.content;

        const h2s = Array.from(tempDiv.querySelectorAll("h2"));
        const toc = h2s.map((h, i) => {
          const id = `heading-${i}`;
          h.setAttribute("id", id);
          return { id, text: h.textContent || "" };
        });

        data.content = tempDiv.innerHTML;
        setBlog(data);
        setHeadings(toc);

        // trigger animation once content is ready
        setTimeout(() => setAnimate(true), 100);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 120,
      behavior: "smooth",
    });
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl h-[400px] bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  /* ---------------- 404 ---------------- */
  if (notFound || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <button
          onClick={() => router.push("/blogs")}
          className="px-6 py-3 bg-green-800 text-white rounded-lg"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  /* ---------------- PAGE ---------------- */
  return (
    <div className="bg-white">
      <article className="max-w-360 mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">

            {/* TITLE */}
            <h1
              className={`text-4xl pt-15 md:text-5xl font-extrabold mb-3
                transition-all duration-700 ease-out
                ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
              `}
            >
              {blog.title}
            </h1>

            {/* META */}
            <p className="text-gray-500 mb-6">
              By {blog.author} •{" "}
              {new Date(blog.datePublished).toLocaleDateString()}
            </p>

            {/* COVER IMAGE */}
            {blog.coverImage && (
              <div
                className={`relative h-[420px] rounded-2xl overflow-hidden mb-10 border-4 border-b-emerald-900
                  transition-all duration-700 delay-150 ease-out
                  ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                `}
              >
                <Image
                  src={blog.coverImage}
                  alt={blog.coverImageAlt || blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* TOC */}
            {headings.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6 mb-8 border-4 border-green-900">
                <h3 className="font-semibold mb-3">Contents</h3>
                {headings.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => scrollToHeading(h.id)}
                    className="block text-left text-green-800 hover:underline mb-1"
                  >
                    {h.text}
                  </button>
                ))}
              </div>
            )}

            {/* BLOG BODY */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* RIGHT SIDEBAR FORM */}
          <aside className="lg:col-span-1">
            <div className="sticky pt-25 top-28">
              <InlineEnquiryForm
                purpose="Buy"
                slug={slug}
                source="blog"
              />
            </div>
          </aside>

        </div>
      </article>
    </div>
  );
}
