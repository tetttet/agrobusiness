"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Products } from "@/types/products.types";
import WishlistButton from "@/components/wishlist/wishlist-button";

interface ProductDetailedProps {
  product: Products;
}

const ProductDetailed = ({ product }: ProductDetailedProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setZoomed(false);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setZoomed(false);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? product.image.length - 1 : prev - 1,
    );
    setZoomed(false);
  }, [product.image.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === product.image.length - 1 ? 0 : prev + 1,
    );
    setZoomed(false);
  }, [product.image.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox, prevImage, nextImage]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ── Gallery ── */}
        <div className="flex flex-col gap-3">
          {/* Main image */}
          <div
            className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl cursor-zoom-in"
            onClick={() => openLightbox(activeImage)}
          >
            <Image
              src={`/images/products/${product.image[activeImage]}`}
              alt={product.name}
              fill
              className="object-contain scale-[1] group-hover:scale-[1.05] transition-all duration-1000 ease-in-out"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Zoom hint */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/90 px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              Увеличить
            </div>
          </div>

          {/* Thumbnails */}
          {product.image.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.image.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border transition-all duration-200 ${
                    i === activeImage
                      ? "border-[#4b2a23] shadow-md"
                      : "border-neutral-200 opacity-60 hover:opacity-100 hover:border-neutral-400"
                  }`}
                >
                  <Image
                    src={`/images/products/${img}`}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="flex flex-col">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-400">
            {product.category}
          </p>

          <h1 className="text-2xl font-semibold leading-snug sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-end gap-4">
            <span className="text-3xl font-bold">
              {product.price.toLocaleString("ru-RU")} {product.currency}
            </span>
            {product.oldPrice && (
              <span className="mb-1 text-lg text-neutral-400 line-through">
                {product.oldPrice.toLocaleString("ru-RU")} {product.currency}
              </span>
            )}
          </div>

          {discountPercent && (
            <div className="mt-2">
              <span className="inline-block rounded-full primary-bg px-3 py-1 text-xs font-medium text-white">
                Скидка {discountPercent}%
              </span>
            </div>
          )}

          <div className="my-7 h-px w-full bg-neutral-100" />

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/77479099012"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-4xl primary-bg px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
            >
              <button className="text-center w-full">
                Заказать
              </button>
            </a>
            <button className="flex-1 rounded-4xl border border-black/15 bg-black/5 px-8 py-4 text-sm font-semibold text-black transition hover:bg-[#4b2a23] hover:text-white active:scale-[0.98]">
              Связаться с нами
            </button>
            <WishlistButton
              productId={product.id}
              size="lg"
              showLabel
              className="w-full justify-center rounded-4xl sm:w-auto"
            />
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Есть в наличии
            </div>
            <div className="text-sm text-neutral-500">
              Доставка по всему Казахстану
            </div>
          </div>

          <div className="my-7 h-px w-full bg-neutral-100" />

          {product.description && (
            <div
              className="prose prose-sm prose-neutral max-w-none text-neutral-700
              prose-headings:font-semibold prose-headings:text-black
              prose-strong:text-black prose-strong:font-medium
              prose-li:marker:text-neutral-400
              prose-p:leading-relaxed"
            >
              <ReactMarkdown>{product.description}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Counter */}
          {product.image.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white backdrop-blur-sm">
              {lightboxIndex + 1} / {product.image.length}
            </div>
          )}

          {/* Prev */}
          {product.image.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Image container */}
          <div
            className="relative flex items-center justify-center w-full h-full px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-300 ${
                zoomed ? "cursor-crosshair" : "cursor-zoom-in"
              }`}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                width: "auto",
                height: "auto",
              }}
              onClick={() => setZoomed((z) => !z)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                if (zoomed) setZoomed(false);
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "min(80vw, 900px)",
                  height: "min(80vh, 700px)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    transition: zoomed ? "none" : "transform 0.3s ease",
                    transform: zoomed
                      ? `scale(2.5) translate(${50 - mousePos.x}%, ${50 - mousePos.y}%)`
                      : "scale(1)",
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                  }}
                >
                  <Image
                    src={`/images/products/${product.image[lightboxIndex]}`}
                    alt={product.name}
                    fill
                    className="object-contain select-none"
                    sizes="90vw"
                    priority
                    draggable={false}
                  />
                </div>
              </div>

              {/* Zoom hint inside lightbox */}
              {!zoomed && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-sm pointer-events-none">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  Кликните для увеличения
                </div>
              )}
              {zoomed && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-sm pointer-events-none">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  Двигайте мышью · Кликните чтобы убрать
                </div>
              )}
            </div>
          </div>

          {/* Next */}
          {product.image.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Dot indicators */}
          {product.image.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {product.image.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(i);
                    setZoomed(false);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === lightboxIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetailed;
