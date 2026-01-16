"use client";

import Link from "next/link";
import React from "react";

interface ButtonFillProps {
  text: React.ReactNode;
  type?: "button" | "submit" | "reset";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const ButtonFill: React.FC<ButtonFillProps> = ({
  text,
  type = "button",
  href,
  onClick,
  className = "",
  disabled = false,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-3 md:px-7 py-2 md:py-3 bg-[var(--primary-color)] text-[var(--primary-bg)] font-semibold tracking-wide hover:opacity-90 transition";

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${disabledClasses} ${className}`}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabledClasses} ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonFill;
