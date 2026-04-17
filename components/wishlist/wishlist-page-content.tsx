"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Heart, Trash2 } from "lucide-react";
import { gsap } from "gsap";
import { products } from "@/constants/products.constants";
import { useWishlist } from "@/hooks/use-wishlist";
import { ProductCard } from "@/components/products/product-card";
import { Lightbox } from "@/components/ui/lightbox";

export default function WishlistPageContent() {
  const { ids, hydrated, clear } = useWishlist();
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    name: string;
  } | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const productsById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [],
  );

  const wishlistProducts = useMemo(
    () =>
      ids
        .map((id) => productsById.get(id))
        .filter((product): product is (typeof products)[number] =>
          Boolean(product),
        ),
    [ids, productsById],
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const targets = sectionRef.current.querySelectorAll("[data-wishlist-hero]");

    gsap.fromTo(
      targets,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.08,
      },
    );
  }, []);

  useEffect(() => {
    if (!gridRef.current || wishlistProducts.length === 0) return;

    const cards = gridRef.current.querySelectorAll("[data-wishlist-item]");

    gsap.fromTo(
      cards,
      { y: 28, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.07,
      },
    );
  }, [wishlistProducts.length]);

  const handleClear = () => {
    const cards = gridRef.current?.querySelectorAll("[data-wishlist-item]");

    if (!cards || cards.length === 0) {
      clear();
      return;
    }

    gsap.to(cards, {
      y: 18,
      opacity: 0,
      scale: 0.97,
      duration: 0.24,
      stagger: 0.04,
      ease: "power2.in",
      onComplete: clear,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="mx-auto flex w-full max-w-7xl flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <div
        data-wishlist-hero
        className="rounded-[2rem] border border-[#4b2a23]/10 bg-[linear-gradient(135deg,rgba(252,250,247,1)_0%,rgba(248,240,233,1)_100%)] p-6 shadow-[0_24px_80px_rgba(75,42,35,0.08)] sm:p-8 lg:p-10"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#4b2a23]/55">
              Ваш wishlist
            </p>
            <h1 className="mt-4 font-[var(--font-display)] text-[2.4rem] leading-[0.95] tracking-[-0.04em] text-[#1f1814] sm:text-[3.7rem] lg:text-[4.6rem]">
              Избранные товары
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-[#4b2a23]/10 bg-white/80 px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4b2a23]/45">
                Сохранено
              </p>
              <p className="mt-2 text-2xl font-semibold text-[#1f1814]">
                {hydrated ? wishlistProducts.length : "…"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClear}
              disabled={wishlistProducts.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-[1.4rem] border border-[#4b2a23]/10 bg-[#1f1814] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#4b2a23] disabled:cursor-not-allowed disabled:bg-[#1f1814]/50"
            >
              <Trash2 size={16} />
              Очистить всё
            </button>
          </div>
        </div>
      </div>

      {!hydrated ? (
        <div
          data-wishlist-hero
          className="mt-6 rounded-[1.8rem] border border-[#4b2a23]/10 bg-white p-8 text-center shadow-[0_16px_48px_rgba(75,42,35,0.06)]"
        >
          <p className="text-sm text-[#5f514a]">
            Загружаю сохранённые товары из браузера...
          </p>
        </div>
      ) : wishlistProducts.length === 0 ? (
        <div
          data-wishlist-hero
          className="mt-6 rounded-[1.8rem] border border-[#4b2a23]/10 bg-white p-8 text-center shadow-[0_16px_48px_rgba(75,42,35,0.06)] sm:p-12"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5ede8] text-[#4b2a23]">
            <Heart size={26} />
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-[#1f1814]">
            В избранном пока ничего нет
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#5f514a] sm:text-base">
            Откройте каталог и нажимайте на сердечко у понравившихся товаров.
            Они сразу появятся здесь и останутся сохранёнными на этом
            устройстве.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4b2a23] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5b362e]"
          >
            Перейти в каталог
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div ref={gridRef} className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {wishlistProducts.map((product) => (
            <div key={product.id} data-wishlist-item>
              <ProductCard
                rel={product}
                onOpenLightbox={(images, index, name) =>
                  setLightbox({ images, index, name })
                }
              />
            </div>
          ))}
        </div>
      )}

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          productName={lightbox.name}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
