import type { Metadata } from "next";
import HeroVideo from "@/components/sections/hero-video";
import TopProducts from "@/components/products/top-products";
import AboutUs from "@/components/sections/about-us";
import AdsImages from "@/components/sections/ads-images";
import SocialLinks from "@/components/sections/social-links";
import {
  HOME_DESCRIPTION,
  createPageTitle,
} from "@/constants/site-metadata";

export const metadata: Metadata = {
  title: createPageTitle("Сельхозтехника и агрооборудование"),
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: createPageTitle("Сельхозтехника и агрооборудование"),
    description: HOME_DESCRIPTION,
    url: "/",
  },
  twitter: {
    title: createPageTitle("Сельхозтехника и агрооборудование"),
    description: HOME_DESCRIPTION,
  },
};

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <TopProducts />
      <AdsImages />
      <AboutUs />
      <SocialLinks />
    </main>
  );
}
