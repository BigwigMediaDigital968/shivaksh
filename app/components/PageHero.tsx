"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export default function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image: StaticImageData;
}) {
  return (
    <section className="relative h-[42vh] min-h-[340px] w-full overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 h-full flex items-end">
        <div className="w-11/12 md:w-5/6 mx-auto pb-10 text-white">
          <div className="text-sm text-white/80 font-body">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{" "}
            <span className="mx-2">/</span>
            <span>{title}</span>
          </div>
          <h1 className="mt-3 text-4xl md:text-6xl font-heading">{title}</h1>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-white/80 font-body">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

