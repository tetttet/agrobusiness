import React from "react";
import ProductsList from "@/components/products/list-products";
import { products } from "@/constants/products.constants";
import CatalogHeader from "@/components/products/catalog-header";

const Page = () => {
  return (
    <main className="min-h-screen bg-white">
      <CatalogHeader totalCount={products.length} />
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <ProductsList products={products} />
      </div>
    </main>
  );
};

export default Page;
