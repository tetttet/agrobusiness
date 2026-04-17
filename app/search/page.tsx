import type { Metadata } from "next";
import SearchPageContent from "@/components/search/search-page-content";
import { products } from "@/constants/products.constants";
import type { SearchSortOption } from "@/utils/search.utils";
import { createPageTitle } from "@/constants/site-metadata";

type SearchParams = Promise<{
  q?: string | string[] | undefined;
  query?: string | string[] | undefined;
  category?: string | string[] | undefined;
  sort?: string | string[] | undefined;
  sale?: string | string[] | undefined;
}>;

type SearchPageProps = {
  searchParams: SearchParams;
};

const readParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const readSortParam = (value: string | string[] | undefined): SearchSortOption => {
  const param = readParam(value);

  if (
    param === "price-asc" ||
    param === "price-desc" ||
    param === "name-asc"
  ) {
    return param;
  }

  return "relevance";
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = readParam(params.q) ?? readParam(params.query) ?? "";
  const normalizedQuery = query.trim();

  return {
    title: normalizedQuery
      ? createPageTitle(`Поиск: ${normalizedQuery}`)
      : createPageTitle("Поиск по каталогу"),
    description: normalizedQuery
      ? `Результаты поиска по запросу "${normalizedQuery}" в каталоге Agro Business.`
      : "Умный поиск по каталогу техники Agro Business.",
    robots: {
      index: false,
      follow: true,
    },
  };
}

const Page = async ({ searchParams }: SearchPageProps) => {
  const params = await searchParams;
  const query = readParam(params.q) ?? readParam(params.query) ?? "";
  const category = readParam(params.category) ?? null;
  const sort = readSortParam(params.sort);
  const discountOnly = readParam(params.sale) === "1";

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#2d1a14]">
      <SearchPageContent
        products={products}
        initialQuery={query}
        initialCategory={category}
        initialSort={sort}
        initialDiscountOnly={discountOnly}
      />
    </main>
  );
};

export default Page;
