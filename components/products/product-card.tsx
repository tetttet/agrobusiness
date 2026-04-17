"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Products } from "@/types/products.types";
import ReactMarkdown from "react-markdown";
import WishlistButton from "@/components/wishlist/wishlist-button";

interface CardProps {
  rel: Products;
  onOpenLightbox: (images: string[], index: number, name: string) => void;
}

export const ProductCard = ({ rel, onOpenLightbox }: CardProps) => {
  const [hovered, setHovered] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const images: string[] = rel.image;

  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white transition hover:shadow-xs">
      {/* Image area */}
      <div
        className="relative aspect-4/3 w-full cursor-zoom-in overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setActiveThumb(0);
        }}
        onClick={() => onOpenLightbox(images, activeThumb, rel.name)}
      >
        <div className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-end px-3">
          <WishlistButton
            productId={rel.id}
            size="sm"
            stopPropagation
            className="pointer-events-auto"
          />
        </div>

        <Image
          src={`/images/products/${images[activeThumb]}`}
          alt={rel.name}
          fill
          className="object-cover transition duration-500 scale-[0.9] group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Hover strip — segmented zones to switch thumb */}
        {hovered && images.length > 1 && (
          <div className="absolute inset-0 flex">
            {images.map((_, i) => (
              <div
                key={i}
                className="h-full flex-1"
                onMouseEnter={() => setActiveThumb(i)}
              />
            ))}
          </div>
        )}

        {/* Dot indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === activeThumb ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <Link
        href={`/products/${rel.id}`}
        className="block p-4 border-t border-neutral-100"
      >
        <p className="mb-1 text-xs uppercase tracking-widest text-neutral-400">
          {rel.category}
        </p>
        <h3 className="text-sm font-semibold leading-snug text-black line-clamp-2">
          {rel.name}
        </h3>
        {rel.description && (
          <div
            className="prose prose-sm prose-neutral max-w-none text-neutral-700
              prose-headings:font-semibold prose-headings:text-black
              prose-strong:text-black prose-strong:font-medium
              prose-li:marker:text-neutral-400
              prose-p:leading-relaxed text-xs py-2"
          >
            <ReactMarkdown>{rel.description}</ReactMarkdown>
          </div>
        )}
        <div className="mt-3 flex items-end gap-2">
          <span className="text-base font-bold">
            {rel.price.toLocaleString("ru-RU")} {rel.currency}
          </span>
          {rel.oldPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {rel.oldPrice.toLocaleString("ru-RU")} {rel.currency}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};
