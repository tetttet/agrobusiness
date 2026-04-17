"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { gsap } from "gsap";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/utils/header.utils";

type WishlistNavLinkProps = {
  variant?: "icon" | "tile";
  className?: string;
  onNavigate?: () => void;
};

export default function WishlistNavLink({
  variant = "icon",
  className,
  onNavigate,
}: WishlistNavLinkProps) {
  const { count } = useWishlist();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const prevCountRef = useRef(count);

  const handleEnter = () => {
    gsap.to(linkRef.current, {
      scale: 1.12,
      duration: 0.28,
      ease: "back.out(2)",
    });

    gsap.to(iconRef.current, {
      rotate: -10,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(linkRef.current, {
      scale: 1,
      duration: 0.35,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.to(iconRef.current, {
      rotate: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    if (prevCountRef.current === count) return;

    prevCountRef.current = count;

    gsap.fromTo(
      linkRef.current,
      { scale: 0.96 },
      {
        scale: 1,
        duration: 0.45,
        ease: "elastic.out(1, 0.45)",
      },
    );

    gsap.fromTo(
      iconRef.current,
      { rotate: -10, scale: 0.92 },
      {
        rotate: 0,
        scale: 1,
        duration: 0.45,
        ease: "back.out(2.8)",
      },
    );

    if (count > 0) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.4, y: -4, opacity: 0.2 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(3)",
        },
      );
    }
  }, [count]);

  if (variant === "tile") {
    return (
      <Link
        href="/wishlist"
        ref={linkRef}
        onClick={onNavigate}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={cn(
          "flex items-center gap-3 rounded-2xl px-4 py-3 text-[#4b2a23] transition",
          count > 0
            ? "bg-[#4b2a23] text-white shadow-[0_16px_30px_rgba(75,42,35,0.2)]"
            : "bg-[#faf7f5] hover:bg-[#f5f1ee]",
          className,
        )}
      >
        <span className="relative inline-flex">
          <Heart
            ref={iconRef}
            size={18}
            strokeWidth={1.9}
            className={cn(count > 0 && "fill-current")}
          />
          {count > 0 && (
            <span
              ref={badgeRef}
              className={cn(
                "absolute -right-2 -top-2 inline-flex min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold leading-5",
                count > 0 ? "bg-white text-[#4b2a23]" : "bg-[#4b2a23] text-white",
              )}
            >
              {count}
            </span>
          )}
        </span>
        <span className="text-[15px] font-medium">Избранное</span>
      </Link>
    );
  }

  return (
    <Link
      href="/wishlist"
      ref={linkRef}
      onClick={onNavigate}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label={`Избранное${count > 0 ? `, ${count} товаров` : ""}`}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full text-[#4b2a23] transition-colors hover:bg-[#f5f1ee]",
        count > 0 && "bg-[#f5f1ee]",
        className,
      )}
    >
      <Heart
        ref={iconRef}
        size={19}
        strokeWidth={1.9}
        className={cn("shrink-0", count > 0 && "fill-current")}
      />

      {count > 0 && (
        <span
          ref={badgeRef}
          className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[#4b2a23] px-1 text-[10px] font-bold leading-5 text-white shadow-[0_8px_16px_rgba(75,42,35,0.2)]"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
