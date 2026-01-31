"use client";

import { useState } from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { FaLinkedin, FaYoutube, FaShareAlt } from "react-icons/fa";

export default function FloatingBottomLeftSocial() {
  const [open, setOpen] = useState(false);
  const [locked, setLocked] = useState(false); // NEW

  return (
    <>
      {/* Gooey SVG Filter */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7
              "
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Floating Menu */}
      <div className="hidden md:block fixed bottom-6 left-12 z-[9999]">
        <div
          className="relative flex items-center justify-center"
          style={{ filter: "url(#goo)" }}
          onMouseEnter={() => !locked && setOpen(true)}
        //   onMouseLeave={() => !locked && setOpen(false)}
        >
          {/* Main Button */}
          <button
            className="gooey-btn main-btn"
            onClick={() => {
              setOpen((prev) => !prev);
              setLocked((prev) => !prev);
            }}
          >
            <FaShareAlt />
          </button>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`gooey-btn child-btn fb ${open ? "open" : ""}`}
            onClick={() => setLocked(false)}
          >
            <BsFacebook />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`gooey-btn child-btn ig ${open ? "open" : ""}`}
            onClick={() => setLocked(false)}
          >
            <BsInstagram />
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`gooey-btn child-btn yt ${open ? "open" : ""}`}
            onClick={() => setLocked(false)}
          >
            <FaYoutube />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`gooey-btn child-btn ln ${open ? "open" : ""}`}
            onClick={() => setLocked(false)}
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </>
  );
}
