"use client";

import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { ArrowRight, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Breadcrumb from "@/components/ui/breadcrumb";
import type { Products } from "@/types/products.types";
import WishlistButton from "@/components/wishlist/wishlist-button";
import {
  normalizeSearchText,
  searchProducts,
  type SearchMatchSource,
  type SearchProductMatch,
  type SearchSortOption,
} from "@/utils/search.utils";

type SearchPageContentProps = {
  products: Products[];
  initialQuery: string;
  initialCategory: string | null;
  initialSort: SearchSortOption;
  initialDiscountOnly: boolean;
};

const SORT_LABELS: Record<SearchSortOption, string> = {
  relevance: "По релевантности",
  "price-asc": "Сначала дешевле",
  "price-desc": "Сначала дороже",
  "name-asc": "По названию",
};

const MATCH_LABELS: Record<SearchMatchSource, string> = {
  catalog: "Позиция из каталога",
  name: "Совпадение по названию",
  category: "Совпадение по категории",
  description: "Совпадение по характеристикам",
};

const QUICK_QUERIES = [
  "D-Pol",
  "Lisicki",
  "Опрыскиватель",
  "Косилка",
  "Борона",
  "Кардан",
];

const INITIAL_VISIBLE_COUNT = 12;
const ACCENT_COLOR = "#4b2a23";

const formatPrice = (value: number, currency: string) =>
  `${value.toLocaleString("ru-RU")} ${currency}`;

const getDeclension = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) return "товар";
  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return "товара";
  }

  return "товаров";
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text: string, query: string) => {
  const tokens = normalizeSearchText(query)
    .split(" ")
    .filter((token) => token.length > 1);

  if (!tokens.length) {
    return text;
  }

  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    tokens.some((token) => part.toLowerCase() === token.toLowerCase()) ? (
      <mark
        key={`${part}-${index}`}
        className="rounded px-1 text-inherit bg-neutral-200"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
};

const ProductCard = ({
  item,
  query,
}: {
  item: SearchProductMatch;
  query: string;
}) => {
  const { product, excerpt, matchSource } = item;
  const imageSrc = product.image[0]
    ? `/images/products/${product.image[0]}`
    : "/images/placeholder.png";

  const oldPrice =
    typeof product.oldPrice === "number" && product.oldPrice > product.price
      ? product.oldPrice
      : null;

  const hasDiscount = oldPrice !== null;
  const discountValue = hasDiscount ? oldPrice - product.price : 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        aria-label={product.name}
        className="absolute inset-0 z-10 rounded-2xl"
      />

      <WishlistButton
        productId={product.id}
        size="sm"
        stopPropagation
        className="absolute right-4 top-4 z-20"
      />

      <div className="relative overflow-hidden border-b border-neutral-200 bg-neutral-50">
        <div className="relative aspect-4/3 w-full">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-contain p-5 transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-700">
            {product.category}
          </span>

          {hasDiscount && (
            <span
              className="inline-flex rounded-lg px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              -{discountValue.toLocaleString("ru-RU")} {product.currency}
            </span>
          )}
        </div>

        <h2 className="mt-4 text-xl font-semibold leading-tight tracking-[-0.02em] text-neutral-950">
          {highlightText(product.name, query)}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
          {excerpt}
        </p>

        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
          {MATCH_LABELS[matchSource]}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <p className="text-xl font-bold text-neutral-950">
              {formatPrice(product.price, product.currency)}
            </p>

            {hasDiscount && (
              <p className="mt-1 text-sm text-neutral-400 line-through">
                {formatPrice(oldPrice, product.currency)}
              </p>
            )}
          </div>

          <span
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: ACCENT_COLOR }}
          >
            Подробнее
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </article>
  );
};

const SearchPageContent = ({
  products,
  initialQuery,
  initialCategory,
  initialSort,
  initialDiscountOnly,
}: SearchPageContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [queryValue, setQueryValue] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory,
  );
  const [sortBy, setSortBy] = useState<SearchSortOption>(initialSort);
  const [discountOnly, setDiscountOnly] = useState(initialDiscountOnly);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    setQueryValue(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSortBy(initialSort);
  }, [initialSort]);

  useEffect(() => {
    setDiscountOnly(initialDiscountOnly);
  }, [initialDiscountOnly]);

  const deferredQuery = useDeferredValue(queryValue);
  const normalizedQuery = normalizeSearchText(deferredQuery);
  const hasQuery = normalizedQuery.length > 0;

  const baseResults = useMemo(
    () => searchProducts(products, deferredQuery),
    [products, deferredQuery],
  );

  const filteredResults = useMemo(() => {
    let nextResults = [...baseResults];

    if (activeCategory) {
      nextResults = nextResults.filter(
        ({ product }) => product.category === activeCategory,
      );
    }

    if (discountOnly) {
      nextResults = nextResults.filter(
        ({ product }) =>
          typeof product.oldPrice === "number" &&
          product.oldPrice > product.price,
      );
    }

    switch (sortBy) {
      case "price-asc":
        nextResults.sort((a, b) => a.product.price - b.product.price);
        break;
      case "price-desc":
        nextResults.sort((a, b) => b.product.price - a.product.price);
        break;
      case "name-asc":
        nextResults.sort((a, b) =>
          a.product.name.localeCompare(b.product.name, "ru"),
        );
        break;
      default:
        break;
    }

    return nextResults;
  }, [activeCategory, baseResults, discountOnly, sortBy]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [normalizedQuery, activeCategory, discountOnly, sortBy]);

  const visibleResults = filteredResults.slice(0, visibleCount);
  const hasMore = visibleCount < filteredResults.length;

  const bestResult =
    hasQuery && sortBy === "relevance" && filteredResults.length > 0
      ? filteredResults[0]
      : null;

  const gridResults = bestResult
    ? visibleResults.filter((item) => item.product.id !== bestResult.product.id)
    : visibleResults;

  const discountedProductsCount = useMemo(
    () =>
      products.filter(
        (product) =>
          typeof product.oldPrice === "number" &&
          product.oldPrice > product.price,
      ).length,
    [products],
  );

  const buildHref = ({
    nextQuery,
    nextCategory,
    nextSort,
    nextDiscountOnly,
  }: {
    nextQuery: string;
    nextCategory: string | null;
    nextSort: SearchSortOption;
    nextDiscountOnly: boolean;
  }) => {
    const params = new URLSearchParams();
    const trimmedQuery = nextQuery.trim();

    if (trimmedQuery) {
      params.set("q", trimmedQuery);
    }

    if (nextCategory) {
      params.set("category", nextCategory);
    }

    if (nextSort !== "relevance") {
      params.set("sort", nextSort);
    }

    if (nextDiscountOnly) {
      params.set("sale", "1");
    }

    const search = params.toString();
    return search ? `${pathname}?${search}` : pathname;
  };

  const navigateWithState = (
    nextState: Partial<{
      query: string;
      category: string | null;
      sort: SearchSortOption;
      discountOnly: boolean;
    }>,
    method: "push" | "replace" = "replace",
  ) => {
    const href = buildHref({
      nextQuery: nextState.query ?? queryValue,
      nextCategory:
        nextState.category === undefined ? activeCategory : nextState.category,
      nextSort: nextState.sort ?? sortBy,
      nextDiscountOnly: nextState.discountOnly ?? discountOnly,
    });

    startTransition(() => {
      if (method === "push") {
        router.push(href, { scroll: false });
      } else {
        router.replace(href, { scroll: false });
      }
    });
  };

  const handleQuickQuery = (value: string) => {
    setQueryValue(value);
    setActiveCategory(null);
    setSortBy("relevance");
    setDiscountOnly(false);

    navigateWithState(
      {
        query: value,
        category: null,
        sort: "relevance",
        discountOnly: false,
      },
      "push",
    );
  };

  return (
    <>
      <section className="relative">
        <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Breadcrumb
              items={[{ label: "Главная", href: "/" }, { label: "Поиск" }]}
            />
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                  Поиск по каталогу Agro Business
                </p>

                <h1 className="mt-4 max-w-3xl font-[var(--font-display)] text-4xl font-semibold leading-tight tracking-[-0.03em] text-neutral-950 sm:text-5xl lg:text-6xl">
                  Найдите технику под свою задачу
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                  Поиск понимает названия, категории, бренды и ключевые
                  характеристики. Для коротких запросов показывает более точные
                  совпадения, для подробных — релевантную выдачу по каталогу.
                </p>

                <Form
                  action="/search"
                  className="mt-7 rounded-2xl border border-neutral-200 bg-neutral-50 p-3 shadow-sm sm:p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative min-w-0 flex-1">
                      <Search
                        size={20}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                      />

                      <input
                        type="text"
                        name="q"
                        value={queryValue}
                        onChange={(event) => setQueryValue(event.target.value)}
                        placeholder="Например: D-Pol, косилка, опрыскиватель 800..."
                        className="h-14 w-full rounded-xl border border-neutral-300 bg-white pl-12 pr-4 text-[15px] text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-500"
                      />
                    </div>

                    {activeCategory && (
                      <input
                        type="hidden"
                        name="category"
                        value={activeCategory}
                      />
                    )}

                    {sortBy !== "relevance" && (
                      <input type="hidden" name="sort" value={sortBy} />
                    )}

                    {discountOnly && (
                      <input type="hidden" name="sale" value="1" />
                    )}

                    <button
                      type="submit"
                      className="inline-flex h-14 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white transition hover:opacity-90"
                      style={{ backgroundColor: ACCENT_COLOR }}
                    >
                      Найти технику
                    </button>
                  </div>
                </Form>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {QUICK_QUERIES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleQuickQuery(item)}
                      className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-400"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                    В каталоге
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-neutral-950">
                    {products.length}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600">
                    товаров по разным сельхоззадачам
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                    Категорий
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-neutral-950">
                    {new Set(products.map((product) => product.category)).size}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600">
                    для быстрого перехода к нужному типу техники
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                    Со скидкой
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-neutral-950">
                    {discountedProductsCount}
                  </p>
                  <p className="mt-2 text-sm text-neutral-600">
                    позиций доступны по сниженной цене
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                {hasQuery ? "Результаты поиска" : "Исследование каталога"}
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-3xl">
                {hasQuery
                  ? `Запрос: “${queryValue.trim()}”`
                  : "Подберите технику через поиск и фильтры"}
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
                {hasQuery
                  ? `Найдено ${filteredResults.length} ${getDeclension(filteredResults.length)}. Если выдача слишком широкая, сузьте её по категории или включите только акционные предложения.`
                  : `Показываем ${filteredResults.length} ${getDeclension(filteredResults.length)} из каталога. Начните вводить запрос выше или переключайтесь по категориям прямо здесь.`}
              </p>
            </div>

            <div className="inline-flex w-fit rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700">
              {SORT_LABELS[sortBy]}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {activeCategory && (
              <span className="rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700">
                Категория: {activeCategory}
              </span>
            )}

            {discountOnly && (
              <span className="rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700">
                Только со скидкой
              </span>
            )}

            {isPending && (
              <span
                className="rounded-xl px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: ACCENT_COLOR }}
              >
                Обновляем выдачу...
              </span>
            )}
          </div>
        </div>

        {bestResult && (
          <Link
            href={`/products/${bestResult.product.id}`}
            className="group mt-6 grid gap-6 overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
          >
            <div className="order-2 lg:order-1">
              <span
                className="inline-flex rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                style={{ backgroundColor: ACCENT_COLOR }}
              >
                Лучшее совпадение
              </span>

              <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] text-neutral-950">
                {highlightText(bestResult.product.name, queryValue)}
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
                {bestResult.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700">
                  {bestResult.product.category}
                </span>

                <span className="rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700">
                  {MATCH_LABELS[bestResult.matchSource]}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <p className="text-3xl font-bold text-neutral-950">
                  {formatPrice(
                    bestResult.product.price,
                    bestResult.product.currency,
                  )}
                </p>

                {bestResult.product.oldPrice &&
                  bestResult.product.oldPrice > bestResult.product.price && (
                    <p className="pb-1 text-base text-neutral-400 line-through">
                      {formatPrice(
                        bestResult.product.oldPrice,
                        bestResult.product.currency,
                      )}
                    </p>
                  )}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-2xl border border-neutral-200">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={
                      bestResult.product.image[0]
                        ? `/images/products/${bestResult.product.image[0]}`
                        : "/images/placeholder.png"
                    }
                    alt={bestResult.product.name}
                    fill
                    className="object-contain p-6 transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 38vw"
                  />
                </div>
              </div>
            </div>
          </Link>
        )}

        {filteredResults.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center shadow-sm sm:p-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              Ничего не найдено
            </p>

            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-neutral-950">
              Попробуйте уточнить запрос
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
              Смените формулировку, уберите часть слов или откройте одну из
              популярных подборок ниже. Страница поиска уже готова под новые
              запросы, так что можно быстро попробовать несколько вариантов.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {QUICK_QUERIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleQuickQuery(item)}
                  className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-400"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: ACCENT_COLOR }}
              >
                Перейти в каталог
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {gridResults.map((item) => (
                <ProductCard
                  key={item.product.id}
                  item={item}
                  query={queryValue}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount(
                      (current) => current + INITIAL_VISIBLE_COUNT,
                    )
                  }
                  className="rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50"
                >
                  Показать ещё{" "}
                  {Math.min(
                    INITIAL_VISIBLE_COUNT,
                    filteredResults.length - visibleCount,
                  )}{" "}
                  {getDeclension(
                    Math.min(
                      INITIAL_VISIBLE_COUNT,
                      filteredResults.length - visibleCount,
                    ),
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default SearchPageContent;
