import type { Products } from "@/types/products.types";
import { kardanProducts } from "./products/kardan.constants";
import { kosylkaProducts } from "./products/kosylka.constants";
import { opryskilProducts } from "./products/oryskil.constants";
import { etcProducts } from "./products/etc.contants";
import { discovProducts } from "./products/discovo.constants";

export const products: Products[] = [
  ...kosylkaProducts,
  ...opryskilProducts,
  ...discovProducts,
  ...etcProducts,
  ...kardanProducts,
];
