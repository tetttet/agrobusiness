import type { Products } from "@/types/products.types";

export type SearchSortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "name-asc";

export type SearchMatchSource =
  | "catalog"
  | "name"
  | "category"
  | "description";

export type SearchProductMatch = {
  product: Products;
  score: number;
  matchSource: SearchMatchSource;
  excerpt: string;
};

const EXCERPT_LENGTH = 148;

const stripMarkdownSyntax = (value: string) =>
  value
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[`*_>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const getExcerpt = (description: string, query: string) => {
  const cleanDescription = stripMarkdownSyntax(description);

  if (!cleanDescription) {
    return "Характеристики и детали доступны на странице товара.";
  }

  const rawQuery = query.trim().toLowerCase();
  const matchIndex = rawQuery
    ? cleanDescription.toLowerCase().indexOf(rawQuery)
    : -1;

  if (matchIndex === -1) {
    return cleanDescription.length > EXCERPT_LENGTH
      ? `${cleanDescription.slice(0, EXCERPT_LENGTH).trimEnd()}...`
      : cleanDescription;
  }

  const start = Math.max(0, matchIndex - 40);
  const end = Math.min(
    cleanDescription.length,
    matchIndex + rawQuery.length + 80,
  );
  const preview = cleanDescription.slice(start, end).trim();

  return `${start > 0 ? "... " : ""}${preview}${end < cleanDescription.length ? " ..." : ""}`;
};

const getMatchSource = ({
  nameHits,
  categoryHits,
  descriptionHits,
}: {
  nameHits: number;
  categoryHits: number;
  descriptionHits: number;
}): SearchMatchSource => {
  if (nameHits >= categoryHits && nameHits >= descriptionHits && nameHits > 0) {
    return "name";
  }

  if (categoryHits >= descriptionHits && categoryHits > 0) {
    return "category";
  }

  if (descriptionHits > 0) {
    return "description";
  }

  return "catalog";
};

export const searchProducts = (
  products: Products[],
  query: string,
): SearchProductMatch[] => {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return products.map((product) => ({
      product,
      score: 0,
      matchSource: "catalog",
      excerpt: getExcerpt(product.description, ""),
    }));
  }

  const tokens = normalizedQuery.split(" ").filter(Boolean);
  const shortSingleTokenQuery = tokens.length === 1 && tokens[0].length === 1;

  return products
    .map((product) => {
      const normalizedName = normalizeSearchText(product.name);
      const normalizedCategory = normalizeSearchText(product.category);
      const normalizedDescription = normalizeSearchText(
        stripMarkdownSyntax(product.description),
      );

      const searchableText = shortSingleTokenQuery
        ? `${normalizedName} ${normalizedCategory}`
        : `${normalizedName} ${normalizedCategory} ${normalizedDescription}`;

      if (!tokens.every((token) => searchableText.includes(token))) {
        return null;
      }

      const nameHits = tokens.filter((token) =>
        normalizedName.includes(token),
      ).length;
      const categoryHits = tokens.filter((token) =>
        normalizedCategory.includes(token),
      ).length;
      const descriptionHits = shortSingleTokenQuery
        ? 0
        : tokens.filter((token) => normalizedDescription.includes(token))
            .length;

      let score = 0;

      if (normalizedName === normalizedQuery) score += 200;
      if (normalizedName.startsWith(normalizedQuery)) score += 120;
      if (normalizedName.includes(normalizedQuery)) score += 90;

      if (normalizedCategory === normalizedQuery) score += 80;
      if (normalizedCategory.startsWith(normalizedQuery)) score += 50;
      if (normalizedCategory.includes(normalizedQuery)) score += 35;

      if (!shortSingleTokenQuery && normalizedDescription.includes(normalizedQuery)) {
        score += 24;
      }

      score += nameHits * 24;
      score += categoryHits * 14;
      score += descriptionHits * 8;

      return {
        product,
        score,
        matchSource: getMatchSource({
          nameHits,
          categoryHits,
          descriptionHits,
        }),
        excerpt: getExcerpt(product.description, query),
      };
    })
    .filter((item): item is SearchProductMatch => item !== null)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.product.price - b.product.price ||
        a.product.name.localeCompare(b.product.name, "ru"),
    );
};
