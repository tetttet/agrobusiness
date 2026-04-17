"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Breadcrumb from "@/components/ui/breadcrumb";

interface CatalogHeaderProps {
  totalCount: number;
}

const CatalogHeader = ({ totalCount }: CatalogHeaderProps) => {
  const breadcrumbWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      breadcrumbWrapperRef.current,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45 },
    );

    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll(".word");
      tl.fromTo(
        words,
        { y: 40, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.55, stagger: 0.08 },
        "-=0.2",
      );
    }

    tl.fromTo(
      subtitleRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 },
      "-=0.25",
    );

    if (statsRef.current) {
      const chips = statsRef.current.querySelectorAll(".stat-chip");
      tl.fromTo(
        chips,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.38,
          stagger: 0.07,
          ease: "back.out(1.8)",
        },
        "-=0.2",
      );
    }

    tl.fromTo(
      dividerRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3",
    );
  }, []);

  const titleWords = ["Каталог", "товаров"];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div ref={breadcrumbWrapperRef} className="mb-8">
        <Breadcrumb
          items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}
        />
      </div>

      {/* Title + meta row */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            ref={titleRef}
            className="flex flex-wrap gap-x-3 text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            style={{ perspective: "600px" }}
          >
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="word inline-block"
                style={{ transformOrigin: "center bottom" }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            ref={subtitleRef}
            className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500"
          >
            Широкий выбор качественных товаров с доставкой по всему Казахстану
          </p>
        </div>

        <div
          ref={statsRef}
          className="flex flex-wrap items-center gap-2 sm:flex-nowrap"
        >
          <div className="stat-chip flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm">
            <span className="text-xs font-semibold text-neutral-700">
              {totalCount} товаров
            </span>
          </div>

          <div className="stat-chip flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm">
            <span className="text-xs font-semibold text-neutral-700">
              Доставка по KZ
            </span>
          </div>

          <div className="stat-chip flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm">
            <span className="text-xs font-semibold text-neutral-700">
              В наличии
            </span>
          </div>
        </div>
      </div>

      <div
        ref={dividerRef}
        className="mt-8 h-px w-full bg-neutral-100"
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
};

export default CatalogHeader;
