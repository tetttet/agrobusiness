"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  productName: string;
  onClose: () => void;
}

export const Lightbox = ({
  images,
  initialIndex,
  productName,
  onClose,
}: LightboxProps) => {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Main image */}
      <div
        className="relative flex h-full w-full max-w-4xl flex-col items-center justify-center gap-4 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="relative w-full flex-1 overflow-hidden rounded-2xl">
          <Image
            src={`/images/products/${images[current]}`}
            alt={`${productName} — фото ${current + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 896px"
          />

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/25"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/25"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex shrink-0 gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative h-14 w-14 overflow-hidden rounded-lg border-2 transition ${
                  i === current
                    ? "border-white opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={`/images/products/${img}`}
                  alt={`thumb ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Counter */}
        <p className="shrink-0 text-xs text-white/50">
          {current + 1} / {images.length}
        </p>
      </div>
    </div>
  );
};
