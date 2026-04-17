import type { Metadata } from "next";
import WishlistPageContent from "@/components/wishlist/wishlist-page-content";
import { createPageTitle } from "@/constants/site-metadata";

export const metadata: Metadata = {
  title: createPageTitle("Избранное"),
  description: "Сохранённые товары Agro Business, доступные на этом устройстве.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#fcfaf7] text-[#1f1814]">
      <WishlistPageContent />
    </main>
  );
}
