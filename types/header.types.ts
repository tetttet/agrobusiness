import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type ActionItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type HeaderProps = {
  logoText?: string;
  logoHref?: string;
  leftNav?: NavItem[];
  centerNav?: NavItem[];
  rightNav?: ActionItem[];
  className?: string;
};
