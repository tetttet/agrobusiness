import React from "react";
import { notFound } from "next/navigation";
import { products } from "@/constants/products.constants";
import ProductDetailed from "@/components/products/detailed-product";
import ProductSimilar from "@/components/products/similar-products";
import Breadcrumb from "@/components/ui/breadcrumb";
import { kosylkaProducts } from "@/constants/products/kosylka.constants";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const isKosylka = id.startsWith("11");
  const productSource = isKosylka ? kosylkaProducts : products;
  
  const product = productSource.find((p) => p.id === Number(id));
  
  if (!product) return notFound();

  const related = isKosylka
    ? kosylkaProducts.filter((p) => p.id !== product.id).slice(0, 4)
    : products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

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
