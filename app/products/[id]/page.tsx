import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/constants/products.constants";
import ProductDetailed from "@/components/products/detailed-product";
import ProductSimilar from "@/components/products/similar-products";
import Breadcrumb from "@/components/ui/breadcrumb";
import { kosylkaProducts } from "@/constants/products/kosylka.constants";
import type { Products } from "@/types/products.types";
import { createPageTitle } from "@/constants/site-metadata";

interface PageProps {
  params: Promise<{ id: string }>;
}

const getProductData = (id: string) => {
  const isKosylka = id.startsWith("11");
  const productSource = isKosylka ? kosylkaProducts : products;
  const product = productSource.find((item) => item.id === Number(id));

  return {
    product,
    productSource,
  };
};

const formatProductPrice = (product: Products) =>
  `${new Intl.NumberFormat("ru-RU").format(product.price)} ${product.currency}`;

const buildProductDescription = (product: Products) =>
  `${product.name} в категории «${product.category}». Цена от ${formatProductPrice(product)}. Agro Business Astana поставляет сельхозтехнику и навесное оборудование для хозяйств Казахстана.`;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { product } = getProductData(id);

  if (!product) {
    return {
      title: createPageTitle("Товар не найден"),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = createPageTitle(product.name);
  const description = buildProductDescription(product);

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title,
      description,
      url: `/products/${product.id}`,
    },
    twitter: {
      title,
      description,
    },
  };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const { product, productSource } = getProductData(id);

  if (!product) return notFound();

  const related = productSource
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Главная", href: "/" },
            { label: "Каталог", href: "/products" },
            { label: product.name },
          ]}
        />
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <ProductDetailed product={product} />
      </section>

      <ProductSimilar related={related} />
    </main>
  );
};

export default Page;
