"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import MagneticIconBtn from "./magnetic-icon-btn";
import { products } from "@/constants/products.constants";
import { searchProducts } from "@/utils/search.utils";

type HeaderSearchOverlayProps = {
  isSearchOpen: boolean;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchOverlayRef: React.RefObject<HTMLDivElement | null>;
  searchCardRef: React.RefObject<HTMLDivElement | null>;
  handleSearchSubmit: (e: React.FormEvent) => void;
};

type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  currency: string;
  image: string[];
  category: string;
  description: string;
};

const HeaderSearchOverlay = ({
  isSearchOpen,
  searchValue,
  setSearchValue,
  setIsSearchOpen,
  searchOverlayRef,
  searchCardRef,
  handleSearchSubmit,
}: HeaderSearchOverlayProps) => {
  const router = useRouter();

  const normalizedQuery = searchValue.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return [];

    return searchProducts(products as Product[], searchValue)
      .slice(0, 8);
  }, [normalizedQuery, searchValue]);

  const handleOpenProduct = (productId: number) => {
    router.push(`/products/${productId}`);
    setIsSearchOpen(false);
    setSearchValue("");
  };

  const handleOpenSearchPage = () => {
    const query = searchValue.trim();

    if (!query) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  return (
    <div
      ref={searchOverlayRef}
      className={`fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-24 transition-all duration-300 sm:pt-28 ${
        isSearchOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      onClick={() => setIsSearchOpen(false)}
      aria-hidden={!isSearchOpen}
    >
      <div
        ref={searchCardRef}
        className={`w-full max-w-[760px] rounded-[28px] bg-white p-4 shadow-2xl transition-all duration-300 sm:p-5 ${
          isSearchOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-4 scale-[0.98] opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-[#4b2a23]">
            Поиск
          </h3>

          <MagneticIconBtn
            label="Закрыть поиск"
            icon={X}
            onClick={() => setIsSearchOpen(false)}
          />
        </div>

        <form onSubmit={handleSearchSubmit} className="relative">
          <Search
            size={20}
            strokeWidth={1.9}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#4b2a23]"
          />

          <input
            autoFocus
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Введите запрос..."
            className="h-14 w-full rounded-full border border-[#e8ddd7] bg-[#faf7f5] pl-12 pr-32 text-[15px] text-[#4b2a23] outline-none transition focus:border-[#cdb7aa] focus:bg-white"
          />

          <button
            type="submit"
            className="absolute right-2 top-1/2 h-10 -translate-y-1/2 rounded-full bg-[#4b2a23] px-5 text-[14px] font-medium text-white transition hover:opacity-90"
          >
            Найти
          </button>
        </form>

        <div className="mt-4">
          {!normalizedQuery && (
            <div className="rounded-2xl border border-[#f0e7e2] bg-[#faf7f5] px-4 py-6 text-center text-[14px] text-[#7a5a50]">
              Начните вводить название товара, категорию или описание
            </div>
          )}

          {normalizedQuery && filteredProducts.length > 0 && (
            <div className="max-h-[420px] overflow-y-auto rounded-2xl border border-[#f0e7e2] bg-[#fcfaf9] p-2">
              <div className="mb-2 px-2 text-[13px] text-[#7a5a50]">
                Найдено: {filteredProducts.length}
              </div>

              <div className="space-y-2">
                {filteredProducts.map(({ product, excerpt }) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleOpenProduct(product.id)}
                    className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left transition hover:bg-[#f8f2ee]"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f3ece8]">
                      <Image
                        src={
                          `/images/products/${product.image?.[0]}` ||
                          "/placeholder.png"
                        }
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-[15px] font-semibold text-[#4b2a23]">
                        {product.name}
                      </h4>
                      <p className="mt-1 truncate text-[13px] text-[#8a6a60]">
                        {product.category}
                      </p>
                      <p className="mt-1 line-clamp-1 text-[13px] text-[#6c5148]">
                        {excerpt}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-[15px] font-semibold text-[#4b2a23]">
                        {product.price} {product.currency}
                      </p>
                      {product.oldPrice && (
                        <p className="text-[12px] text-[#a58a80] line-through">
                          {product.oldPrice} {product.currency}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleOpenSearchPage}
                className="mt-3 w-full rounded-2xl border border-[#ead8cf] bg-white px-4 py-3 text-[14px] font-medium text-[#4b2a23] transition hover:bg-[#faf3ef]"
              >
                Открыть все результаты
              </button>
            </div>
          )}

          {normalizedQuery && filteredProducts.length === 0 && (
            <div className="rounded-2xl border border-[#f0e7e2] bg-[#faf7f5] px-4 py-6 text-center text-[14px] text-[#7a5a50]">
              Ничего не найдено по запросу{" "}
              <span className="font-semibold text-[#4b2a23]">
                “{searchValue}”
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSearchOverlay;

export type Products = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  currency: string;
  image: string[];
  category: string;
  description: string;
};
