"use client";

import { useMemo, useRef, type MouseEvent } from "react";
import { Heart } from "lucide-react";
import { gsap } from "gsap";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/utils/header.utils";

type WishlistButtonProps = {
  productId: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  stopPropagation?: boolean;
};

const sizeClasses = {
  sm: {
    button: "h-10 w-10",
    icon: 17,
    label: "text-sm",
  },
  md: {
    button: "h-11 w-11",
    icon: 18,
    label: "text-sm",
  },
  lg: {
    button: "h-[52px] w-[52px]",
    icon: 20,
    label: "text-sm sm:text-[15px]",
  },
};

export default function WishlistButton({
  productId,
  className,
  size = "md",
  showLabel = false,
  stopPropagation = false,
}: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const isActive = has(productId);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const sparkRef = useRef<HTMLSpanElement>(null);

  const label = useMemo(
    () => (isActive ? "В избранном" : "В избранное"),
    [isActive],
  );

  const animateToggle = (nextActive: boolean) => {
    if (!buttonRef.current || !iconRef.current) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.96 },
        { scale: 1, duration: 0.16, ease: "power2.out" },
      );
      return;
    }

    const timeline = gsap.timeline({
      defaults: { overwrite: true },
    });

    timeline.fromTo(
      buttonRef.current,
      { scale: 1, y: 0 },
      {
        scale: 0.9,
        y: -4,
        duration: 0.12,
        ease: "power2.out",
      },
    );

    timeline.to(
      buttonRef.current,
      {
        scale: 1.04,
        y: -12,
        duration: 0.18,
        ease: "power2.out",
      },
      ">-0.01",
    );

    timeline.to(
      buttonRef.current,
      {
        scale: 1,
        y: 0,
        duration: 0.56,
        ease: "bounce.out",
      },
      ">-0.01",
    );

    if (nextActive) {
      timeline.fromTo(
        iconRef.current,
        {
          scale: 0.8,
          rotate: -18,
          y: 0,
        },
        {
          scale: 1.24,
          rotate: 0,
          y: -8,
          duration: 0.2,
          ease: "back.out(3)",
          yoyo: false,
          repeat: 0,
        },
        0,
      );

      timeline.to(
        iconRef.current,
        {
          scale: 1,
          y: 0,
          duration: 0.42,
          ease: "bounce.out",
        },
        0.16,
      );

      timeline.fromTo(
        glowRef.current,
        {
          opacity: 0,
          scale: 0.35,
        },
        {
          opacity: 0.42,
          scale: 1.3,
          duration: 0.22,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        },
        0.02,
      );

      timeline.fromTo(
        ringRef.current,
        {
          opacity: 0.55,
          scale: 0.4,
        },
        {
          opacity: 0,
          scale: 1.55,
          duration: 0.48,
          ease: "power2.out",
        },
        0.03,
      );

      timeline.fromTo(
        sparkRef.current,
        {
          opacity: 0,
          scale: 0.2,
          rotate: -18,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.2,
          ease: "back.out(3)",
        },
        0.05,
      );

      timeline.to(
        sparkRef.current,
        {
          opacity: 0,
          scale: 1.35,
          duration: 0.32,
          ease: "power2.out",
        },
        0.24,
      );
    } else {
      timeline.fromTo(
        iconRef.current,
        {
          rotate: 0,
          scale: 1,
          y: 0,
        },
        {
          rotate: 16,
          scale: 0.92,
          y: -5,
          duration: 0.16,
          ease: "power2.out",
        },
        0,
      );

      timeline.to(
        iconRef.current,
        {
          rotate: 0,
          scale: 1,
          y: 0,
          duration: 0.34,
          ease: "bounce.out",
        },
        0.12,
      );
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }

    const nextActive = !isActive;
    toggle(productId);
    animateToggle(nextActive);
  };

  const sizing = sizeClasses[size];

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={handleClick}
      aria-label={label}
      aria-pressed={isActive}
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4b2a23]/35",
        showLabel
          ? "gap-2.5 px-5 py-3.5"
          : cn(sizing.button, "backdrop-blur-md"),
        isActive
          ? "border-[#4b2a23] bg-[#4b2a23] text-white shadow-[0_14px_32px_rgba(75,42,35,0.26)]"
          : "border-none text-[#4b2a23] hover:border-[#4b2a23]/25 hover:bg-white",
        className,
      )}
    >
      <span
        ref={glowRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full opacity-0",
          isActive ? "bg-[#f2c8a4]/60" : "bg-[#4b2a23]/12",
        )}
      />

      <span
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border border-[#f0b08d] opacity-0"
      />

      <span
        ref={sparkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
      >
        <span className="absolute left-1/2 top-[18%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#ffd3b8]" />
        <span className="absolute left-[20%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#ffd3b8]" />
        <span className="absolute right-[20%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#ffd3b8]" />
        <span className="absolute bottom-[18%] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#ffd3b8]" />
      </span>

      <Heart
        ref={iconRef}
        size={sizing.icon}
        strokeWidth={1.9}
        className={cn(
          "relative z-10 transition-transform duration-300",
          isActive && "fill-current",
        )}
      />

      {showLabel && (
        <span className={cn("relative z-10 font-semibold", sizing.label)}>
          {label}
        </span>
      )}
    </button>
  );
}
