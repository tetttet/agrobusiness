"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/utils/header.utils";

type HeaderLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function HeaderLink({
  href,
  children,
  onClick,
  className = "",
}: HeaderLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    gsap.to(lineRef.current, {
      scaleX: 1,
      transformOrigin: "left center",
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.to(linkRef.current, {
      y: -1.5,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(lineRef.current, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.3,
      ease: "power3.in",
    });

    gsap.to(linkRef.current, {
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn(
        "relative inline-flex flex-col text-[15px] font-medium tracking-[-0.02em] text-[#4b2a23]",
        className,
      )}
    >
      {children}
      <span
        ref={lineRef}
        className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-right scale-x-0 bg-[#4b2a23]"
        style={{ transform: "scaleX(0)" }}
      />
    </Link>
  );
}
