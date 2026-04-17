"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { gsap } from "gsap";
import type { LucideIcon } from "lucide-react";

type MagneticIconBtnProps = {
  href?: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
};

export default function MagneticIconBtn({
  href,
  label,
  icon: Icon,
  onClick,
  className = "",
}: MagneticIconBtnProps) {
  const btnRef = useRef<HTMLElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  const handleEnter = () => {
    gsap.to(btnRef.current, {
      scale: 1.15,
      duration: 0.3,
      ease: "back.out(2)",
    });

    gsap.to(iconRef.current, {
      rotate: -8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(btnRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.to(iconRef.current, {
      rotate: 0,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    gsap
      .timeline()
      .to(btnRef.current, { scale: 0.88, duration: 0.1, ease: "power2.in" })
      .to(btnRef.current, { scale: 1.1, duration: 0.2, ease: "back.out(3)" })
      .to(btnRef.current, {
        scale: 1,
        duration: 0.25,
        ease: "elastic.out(1, 0.4)",
      });

    onClick?.();
  };

  const sharedProps = {
    "aria-label": label,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onClick: handleClick,
    className: `flex h-10 w-10 items-center justify-center rounded-full text-[#4b2a23] transition-colors hover:bg-[#f5f1ee] cursor-pointer ${className}`,
  };

  const inner = (
    <Icon
      ref={iconRef as React.RefObject<SVGSVGElement>}
      size={19}
      strokeWidth={1.9}
      className="shrink-0"
    />
  );

  if (href && !onClick) {
    return (
      <Link
        href={href}
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        {...sharedProps}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      {...sharedProps}
    >
      {inner}
    </button>
  );
}
