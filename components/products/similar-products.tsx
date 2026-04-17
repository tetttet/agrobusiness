"use client";
import React, { useState } from "react";
import { Products } from "@/types/products.types";
import { Lightbox } from "../ui/lightbox";
import { ProductCard } from "./product-card";
import TopText from "../ui/top-text";

interface ProductSimilarProps {
  related: Products[];
}

const ProductSimilar = ({ related }: ProductSimilarProps) => {
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    name: string;
  } | null>(null);

  if (related.length === 0) return null;

  return (
    <>
      <section className="border-t border-neutral-100 bg-neutral-50 py-14">
        <div className="mx-auto w-full px-4 sm:max-w-10/12 sm:px-6 lg:px-8">
          <TopText subtitle="Также из категории" title="Похожие товары" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-4">
            {related.map((rel) => (
              <ProductCard
                key={rel.id}
                rel={rel}
                onOpenLightbox={(images, index, name) =>
                  setLightbox({ images, index, name })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          productName={lightbox.name}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
};

export default ProductSimilar;
