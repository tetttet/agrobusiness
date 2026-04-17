"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Products } from "@/types/products.types";
import WishlistButton from "@/components/wishlist/wishlist-button";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";
type ViewMode = "grid" | "list";

interface ProductsListProps {
  products: Products[];
}

const ITEMS_PER_PAGE = 20;

const SearchIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const GridIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const ListIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FilterIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const getDeclension = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) return "товар";
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return "товара";
  }
  return "товаров";
};

const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
};

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-100 pb-5 last:border-b-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-1 text-left"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
          {title}
        </span>

        <span
          className={`inline-flex text-neutral-400 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDownIcon />
        </span>
      </button>

      {open && <div className="pt-3">{children}</div>}
    </div>
  );
};

const ProductCard = ({
  product,
  view,
}: {
  product: Products;
  view: ViewMode;
}) => {
  const imageSrc = product.image?.[0]
    ? `/images/products/${product.image[0]}`
    : "/images/placeholder.png";

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : null;

  if (view === "list") {
    return (
      <article className="group relative flex gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-300 sm:gap-5 sm:p-5">
        <Link
          href={`/products/${product.id}`}
          aria-label={product.name}
          className="absolute inset-0 z-10 rounded-2xl"
        />

        <div className="pointer-events-none absolute inset-x-0 top-4 z-20 flex justify-end px-4 sm:top-5 sm:px-5">
          <WishlistButton
            productId={product.id}
            size="sm"
            stopPropagation
            className="pointer-events-auto"
          />
        </div>

        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-28 sm:w-36">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="160px"
          />
          {discount && (
            <span className="absolute left-2 top-2 rounded-full primary-bg px-2 py-1 text-[10px] font-semibold text-white">
              -{discount}%
            </span>
          )}
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col justify-between pr-12 sm:pr-14">
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
              {product.category}
            </p>

            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-neutral-900 sm:text-base">
              {product.name}
            </h3>
          </div>

          <div className="mt-0 flex flex-wrap items-center gap-2">
            <span className="text-base font-bold text-neutral-900 sm:text-lg">
              {product.price.toLocaleString("ru-RU")} {product.currency}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-sm text-neutral-400 line-through">
                {product.oldPrice.toLocaleString("ru-RU")} {product.currency}
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-200 hover:border-neutral-300">
      <Link
        href={`/products/${product.id}`}
        aria-label={product.name}
        className="absolute inset-0 z-10 rounded-2xl"
      />

      <div className="pointer-events-none absolute inset-x-0 top-1 z-20 flex justify-end px-3">
        <WishlistButton
          productId={product.id}
          size="sm"
          stopPropagation
          className="pointer-events-auto"
        />
      </div>

      <div className="relative aspect-[4/4.6] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 scale-[0.82] group-hover:scale-[0.94]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />

        {discount && (
          <span className="absolute left-3 top-3 rounded-full primary-bg px-2.5 py-1 text-[10px] font-semibold text-white">
            -{discount}%
          </span>
        )}
      </div>

      <div className="relative p-4">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
          {product.category}
        </p>

        <h3 className="line-clamp-2 min-h-11 text-sm font-semibold leading-5 text-neutral-900">
          {product.name}
        </h3>

        <div className="mt-3 flex flex-wrap items-end gap-2">
          <span className="text-base font-bold text-neutral-900">
            {product.price.toLocaleString("ru-RU")} {product.currency}
          </span>

          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-xs text-neutral-400 line-through">
              {product.oldPrice.toLocaleString("ru-RU")} {product.currency}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

/* ─────────────────────────────────────────────
   Pagination
───────────────────────────────────────────── */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Назад
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-sm text-neutral-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page as number)}
            className={`min-w-[40px] rounded-xl px-3 py-2 text-sm font-medium transition ${
              currentPage === page
                ? "primary-bg text-white"
                : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Вперёд
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const ProductsList = ({ products }: ProductsListProps) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const priceMax = useMemo(() => {
    if (!products.length) return 0;
    return Math.max(...products.map((p) => p.price));
  }, [products]);

  const priceMin = useMemo(() => {
    if (!products.length) return 0;
    return Math.min(...products.map((p) => p.price));
  }, [products]);

  const categories = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.category))).sort((a, b) =>
        a.localeCompare(b, "ru"),
      ),
    [products],
  );

  const currency = products[0]?.currency ?? "₸";
  const currentMax = maxPrice ?? priceMax;

  const sortLabels: Record<SortOption, string> = {
    default: "По умолчанию",
    "price-asc": "Сначала дешевле",
    "price-desc": "Сначала дороже",
    "name-asc": "По алфавиту",
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    result = result.filter((p) => p.price <= currentMax);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name, "ru"));
        break;
      default:
        break;
    }

    return result;
  }, [products, search, activeCategory, sortBy, currentMax]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [search, activeCategory, sortBy, maxPrice, viewMode]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const activeCount =
    (search.trim() ? 1 : 0) +
    (activeCategory ? 1 : 0) +
    (maxPrice !== null ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0);

  const clearAll = () => {
    setSearch("");
    setActiveCategory(null);
    setMaxPrice(null);
    setSortBy("default");
    setCurrentPage(1);
    setSortOpen(false);
  };

  const renderSidebar = () => (
    <div className="flex flex-col gap-5">
      <FilterSection title="Поиск">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <SearchIcon />
          </span>

          <input
            type="text"
            placeholder="Название товара..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-9 pr-9 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-700"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Категория">
        <div className="flex flex-col gap-1">
          {[null, ...categories].map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat ?? "__all__"}
                type="button"
                onClick={() =>
                  setActiveCategory((prev) => (prev === cat ? null : cat))
                }
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "primary-bg font-medium text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <span>{cat ?? "Все категории"}</span>

                {isActive && (
                  <span className="opacity-80">
                    <CheckIcon />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Цена">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>
              {priceMin.toLocaleString("ru-RU")} {currency}
            </span>
            <span className="font-semibold text-neutral-900">
              до {currentMax.toLocaleString("ru-RU")} {currency}
            </span>
          </div>

          <input
            type="range"
            min={priceMin}
            max={priceMax}
            step={Math.max(1, Math.floor((priceMax - priceMin) / 100) || 1)}
            value={currentMax}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#4B2A23]"
          />
        </div>
      </FilterSection>

      <FilterSection title="Сортировка">
        <div className="flex flex-col gap-1">
          {(Object.keys(sortLabels) as SortOption[]).map((key) => {
            const isActive = sortBy === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSortBy(key);
                  setSortOpen(false);
                }}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "primary-bg font-medium text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <span>{sortLabels[key]}</span>

                {isActive && (
                  <span className="opacity-80">
                    <CheckIcon />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50"
        >
          <CloseIcon />
          Сбросить ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="relative flex gap-8">
      <aside className="hidden w-64 shrink-0 lg:block xl:w-72">
        <div className="sticky top-6 rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-800">
              Фильтры
            </p>

            {activeCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-neutral-900 px-1.5 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>

          {renderSidebar()}
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[86vw] max-w-sm overflow-y-auto bg-white px-5 py-5 transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-800">
            Фильтры
          </p>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition hover:bg-neutral-100"
          >
            <CloseIcon />
          </button>
        </div>

        {renderSidebar()}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 lg:hidden"
            >
              <FilterIcon />
              Фильтры
              {activeCount > 0 && (
                <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-neutral-900 px-1 text-[9px] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </button>

            <p className="text-sm text-neutral-500">
              <span className="font-bold text-neutral-900">
                {filteredProducts.length}
              </span>{" "}
              {getDeclension(filteredProducts.length)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setSortOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-sm text-neutral-700 transition hover:border-neutral-300"
              >
                <span>{sortLabels[sortBy]}</span>
                <span
                  className={`inline-flex transition-transform duration-200 ${
                    sortOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ChevronDownIcon />
                </span>
              </button>

              {sortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setSortOpen(false)}
                  />

                  <div className="absolute right-0 top-full z-20 mt-1.5 min-w-[210px] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
                    {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSortBy(key);
                          setSortOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-neutral-50 ${
                          sortBy === key
                            ? "font-medium text-neutral-900"
                            : "text-neutral-600"
                        }`}
                      >
                        <span>{sortLabels[key]}</span>
                        {sortBy === key && <CheckIcon />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex overflow-hidden rounded-xl border border-neutral-200">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-9 w-9 items-center justify-center transition ${
                  viewMode === "grid"
                    ? "primary-bg text-white"
                    : "bg-white text-neutral-500 hover:bg-neutral-50"
                }`}
                aria-label="Показать сеткой"
              >
                <GridIcon />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex h-9 w-9 items-center justify-center border-l border-neutral-200 transition ${
                  viewMode === "list"
                    ? "primary-bg text-white"
                    : "bg-white text-neutral-500 hover:bg-neutral-50"
                }`}
                aria-label="Показать списком"
              >
                <ListIcon />
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 py-20 text-center">
            <span className="mb-3 text-4xl">🔍</span>
            <p className="font-semibold text-neutral-800">Ничего не найдено</p>
            <p className="mt-1 text-sm text-neutral-400">
              Попробуйте изменить фильтры
            </p>

            <button
              type="button"
              onClick={clearAll}
              className="mt-5 rounded-xl border border-neutral-900 bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              Сбросить всё
            </button>
          </div>
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-3"
              }
            >
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  view={viewMode}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
