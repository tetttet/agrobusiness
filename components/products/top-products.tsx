"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { kosylkaProducts } from "@/constants/products/kosylka.constants";
import WishlistButton from "@/components/wishlist/wishlist-button";
import TopText from "../ui/top-text";

const RandomProductImage = ({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (images.length > 1) {
        setCurrentIndex(Math.floor(Math.random() * images.length));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [images]);

  useEffect(() => {
    if (!mounted || images.length <= 1) return;

    let timeoutId: NodeJS.Timeout;

    const scheduleNextImage = () => {
      const randomInterval = Math.floor(Math.random() * 5000) + 2000; // 2s - 7s

      timeoutId = setTimeout(() => {
        setCurrentIndex((prev) => {
          let next;
          do {
            next = Math.floor(Math.random() * images.length);
          } while (next === prev);
          return next;
        });
        scheduleNextImage();
      }, randomInterval);
    };

    scheduleNextImage();

    return () => clearTimeout(timeoutId);
  }, [mounted, images]);

  return (
    <>
      {images.map((img, index) => {
        const isActive = mounted ? index === currentIndex : index === 0;
        return (
          <Image
            key={img}
            src={`/images/products/${img}`}
            alt={alt}
            fill
            className={`object-contain scale-[0.82] group-hover:scale-[0.98] transition-all duration-1000 ease-in-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 48vw, (max-width: 1280px) 32vw, 20vw"
          />
        );
      })}
    </>
  );
};

const TopProducts = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const leftBtnRef = useRef<HTMLButtonElement | null>(null);
  const rightBtnRef = useRef<HTMLButtonElement | null>(null);
  const leftBtnMobRef = useRef<HTMLButtonElement | null>(null);
  const rightBtnMobRef = useRef<HTMLButtonElement | null>(null);

  const prevLeft = useRef(false);
  const prevRight = useRef(true);

  const animateButton = useCallback(
    (el: HTMLButtonElement | null, show: boolean, fromLeft = false) => {
      if (!el) return;
      if (show) {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            scale: 0.7,
            x: fromLeft ? -12 : 12,
            pointerEvents: "none",
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            pointerEvents: "auto",
            duration: 0.35,
            ease: "back.out(1.7)",
          },
        );
      } else {
        gsap.to(el, {
          opacity: 0,
          scale: 0.7,
          x: fromLeft ? -10 : 10,
          pointerEvents: "none",
          duration: 0.22,
          ease: "power2.in",
        });
      }
    },
    [],
  );

  const checkScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;

    const newLeft = el.scrollLeft > 0;
    const newRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;

    if (newLeft !== prevLeft.current) {
      animateButton(leftBtnRef.current, newLeft, true);
      animateButton(leftBtnMobRef.current, newLeft, true);
      prevLeft.current = newLeft;
    }

    if (newRight !== prevRight.current) {
      animateButton(rightBtnRef.current, newRight, false);
      animateButton(rightBtnMobRef.current, newRight, false);
      prevRight.current = newRight;
    }
  }, [animateButton]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -900, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 900, behavior: "smooth" });
  };

  const btnClass =
    "flex h-12 w-12 items-center justify-center rounded-full border border-[#4b2a23]/30 text-xl transition hover:bg-[#4b2a23] hover:text-white";
  const btnMobClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-[#4b2a23]/30 text-lg transition hover:bg-[#4b2a23] hover:text-white";

  return (
    <section className="w-full bg-white py-10 text-black">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <TopText subtitle="Каталог техники" title="Популярные товары" />

          <div
            className="hidden items-center gap-3 md:flex"
            style={{ minWidth: "108px", justifyContent: "flex-end" }}
          >
            <button
              ref={leftBtnRef}
              onClick={scrollLeft}
              className={btnClass}
              aria-label="Прокрутить влево"
              style={{ opacity: 0, pointerEvents: "none" }}
            >
              <ArrowLeft />
            </button>
            <button
              ref={rightBtnRef}
              onClick={scrollRight}
              className={btnClass}
              aria-label="Прокрутить вправо"
              style={{ opacity: 1 }}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Слайдер */}
      <div
        ref={sliderRef}
        className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {kosylkaProducts.map((product) => (
          <article
            key={product.id}
            className="
              group relative h-115 shrink-0 snap-start overflow-hidden
              w-full
              sm:w-[60%]
              md:w-[48%]
              lg:w-[42%]
              xl:w-[22%]
            "
          >
            <Link
              href={`/products/${product.id}`}
              aria-label={product.name}
              className="absolute inset-0 z-10"
            />

            <div className="relative h-full w-full overflow-hidden rounded-2xl sm:rounded-none">
              <div className="pointer-events-none absolute inset-x-0 top-4 z-30 flex justify-end px-4 sm:top-5 sm:px-5">
                <WishlistButton
                  productId={product.id}
                  stopPropagation
                  className="pointer-events-auto"
                />
              </div>

              <RandomProductImage images={product.image} alt={product.name} />

              <div className="pointer-events-none absolute inset-0 bg-linear-to-t transition duration-300 group-hover:from-black/50 group-hover:via-black/20 group-hover:to-transparent" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5">
                <div className="translate-y-14 transition-all duration-500 group-hover:-translate-y-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/70">
                    {product.category}
                  </p>

                  <h3 className="max-w-[90%] text-lg font-semibold leading-tight text-white sm:text-xl">
                    {product.name}
                  </h3>

                  <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-44 group-hover:opacity-100">
                    <div className="mb-3 flex items-end gap-3">
                      <p className="text-xl font-bold text-white">
                        {product.price.toLocaleString("ru-RU")}{" "}
                        {product.currency}
                      </p>

                      {product.oldPrice && (
                        <p className="text-sm text-white/50 line-through">
                          {product.oldPrice.toLocaleString("ru-RU")}{" "}
                          {product.currency}
                        </p>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-3xl border border-[#4b2a23] px-6 py-2.5 text-sm font-medium tracking-[0.02em] text-white bg-[#4b2a23] transition-transform duration-300 hover:scale-[1.05] active:scale-[0.95]">
                      <span>Подробнее</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Мобильные кнопки — всегда в DOM */}
      <div
        className="mt-5 flex items-center justify-center gap-3 px-4 md:hidden"
        style={{ minHeight: "44px" }}
      >
        <button
          ref={leftBtnMobRef}
          onClick={scrollLeft}
          className={btnMobClass}
          aria-label="Прокрутить влево"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          ←
        </button>
        <button
          ref={rightBtnMobRef}
          onClick={scrollRight}
          className={btnMobClass}
          aria-label="Прокрутить вправо"
          style={{ opacity: 1 }}
        >
          →
        </button>
      </div>

      <div className="flex justify-center px-4">
        <Link
          href="/products"
          className="pt-6 lg:pt-0 group relative inline-flex items-center text-[13px] font-semibold tracking-wide text-[#4b2a23] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative pb-2">
            Смотреть все товары
            <span className="absolute left-0 bottom-0 h-px w-full bg-[#4b2a23]/35" />
            <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[#4b2a23] transition-all duration-300 ease-out group-hover:w-full" />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default TopProducts;
