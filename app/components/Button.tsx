"use client";

import Link from "next/link";
import React from "react";

interface ButtonFillProps {
  text: React.ReactNode;
  type?: "button" | "submit" | "reset";
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
}

const ButtonFill: React.FC<ButtonFillProps> = ({
  text,
  type = "button",
  href,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center min-w-[140px] h-[46px] px-7 rounded-full text-[14px] font-semibold uppercase tracking-wide transition-all duration-300 ease-out whitespace-nowrap";

  const primaryClasses =
    "text-[var(--text-light)] bg-gradient-to-br from-[var(--primary-bg)] to-[var(--secondary-color)] hover:-translate-y-[2px] hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:ring-1 hover:ring-[var(--primary-color)] active:scale-95";

  const outlineClasses =
    "border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--primary-bg)] hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(201,162,77,0.35)] active:scale-95";

  const finalClass = `${baseClasses} ${
    variant === "outline" ? outlineClasses : primaryClasses
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={finalClass}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={finalClass}>
      {text}
    </button>
  );
};

export default ButtonFill;
