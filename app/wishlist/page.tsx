import type { Metadata } from "next";
import WishlistPageContent from "@/components/wishlist/wishlist-page-content";

export const metadata: Metadata = {
  title: "Избранное | Agro Business",
  description: "Сохранённые товары Agro Business, доступные на этом устройстве.",
};

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#fcfaf7] text-[#1f1814]">
      <WishlistPageContent />
    </main>
  );
}
