import { Heart, Search, ShoppingBag, User } from "lucide-react";
import type { ActionItem, NavItem } from "@/types/header.types";

export const DEFAULT_LEFT_NAV: NavItem[] = [
  { label: "Каталог", href: "/products" },
  { label: "Новинки", href: "/products" },
];

export const DEFAULT_CENTER_NAV: NavItem[] = [
  { label: "Коллекции", href: "/products" },
  { label: "О Нас", href: "/about" },
  { label: "Магазины", href: "/products" },
];

export const DEFAULT_RIGHT_NAV: ActionItem[] = [
  { label: "Поиск", href: "/search", icon: Search },
  { label: "Аккаунт", href: "/products", icon: User },
  { label: "Избранное", href: "/wishlist", icon: Heart },
  { label: "Корзина", href: "/products", icon: ShoppingBag },
];
