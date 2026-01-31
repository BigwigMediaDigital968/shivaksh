"use client";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(percent);
      setVisible(scrollTop > 120);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="
        fixed bottom-6 right-6 z-[9999]
        w-12 h-12 rounded-full
        bg-[#111827]
        shadow-md
        flex items-center justify-center
        hover:shadow-lg
        transition-shadow
      "
    >
      {/* Progress ring */}
      <svg
        className="absolute w-full h-full -rotate-90"
        viewBox="0 0 48 48"
      >
        {/* Track */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />

        {/* Progress */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.12s linear" }}
        />
      </svg>

      {/* Arrow */}
      <span className="relative z-10 text-white text-sm">
        ↑
      </span>
    </button>
  );
}
