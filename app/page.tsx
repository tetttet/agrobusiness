import HeroVideo from "@/components/sections/hero-video";
import TopProducts from "@/components/products/top-products";
import AboutUs from "@/components/sections/about-us";
import AdsImages from "@/components/sections/ads-images";
import SocialLinks from "@/components/sections/social-links";

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
