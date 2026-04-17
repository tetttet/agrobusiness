"use client";

import Link from "next/link";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DEFAULT_LEFT_NAV,
  DEFAULT_CENTER_NAV,
  DEFAULT_RIGHT_NAV,
} from "@/constants/header.constants";
import type { HeaderProps } from "@/types/header.types";
import { cn } from "@/utils/header.utils";
import WishlistNavLink from "@/components/wishlist/wishlist-nav-link";
import HeaderLink from "./header-link";
import MagneticIconBtn from "./magnetic-icon-btn";
import HeaderSearchOverlay from "./header-search-overlay";

gsap.registerPlugin(ScrollTrigger);

const Header = ({
  logoText = "AGRO Business",
  logoHref = "/",
  leftNav = DEFAULT_LEFT_NAV,
  centerNav = DEFAULT_CENTER_NAV,
  rightNav = DEFAULT_RIGHT_NAV,
  className = "",
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const leftNavRef = useRef<HTMLElement>(null);
  const centerNavRef = useRef<HTMLElement>(null);
  const rightGroupRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuInnerRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const searchCardRef = useRef<HTMLDivElement>(null);

  const lastScrollY = useRef(0);
  const headerHidden = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headerRef.current,
        { yPercent: -110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9 },
      );

      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8, x: -20 },
        { opacity: 1, scale: 1, x: 0, duration: 0.6, ease: "back.out(1.8)" },
        "-=0.4",
      );

      if (leftNavRef.current) {
        tl.fromTo(
          leftNavRef.current.querySelectorAll("a"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          "-=0.35",
        );
      }

      if (centerNavRef.current) {
        tl.fromTo(
          centerNavRef.current.querySelectorAll("a"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 },
          "-=0.4",
        );
      }

      if (rightGroupRef.current) {
        tl.fromTo(
          rightGroupRef.current.querySelectorAll("a, button"),
          { opacity: 0, scale: 0.7, x: 10 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.07,
            ease: "back.out(2)",
          },
          "-=0.35",
        );
      }

      tl.fromTo(
        progressRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6",
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);

      const max = document.body.scrollHeight - window.innerHeight;
      if (progressRef.current && max > 0) {
        const pct = Math.min(y / max, 1);
        gsap.to(progressRef.current, {
          scaleX: pct,
          transformOrigin: "left center",
          duration: 0.2,
          ease: "none",
          overwrite: true,
        });
      }

      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      if (delta > 6 && y > 120 && !isMobileMenuOpen && !isSearchOpen) {
        if (!headerHidden.current) {
          gsap.to(headerRef.current, {
            yPercent: -110,
            duration: 0.4,
            ease: "power2.in",
          });
          headerHidden.current = true;
        }
      } else if (delta < -3 || y < 40) {
        if (headerHidden.current) {
          gsap.to(headerRef.current, {
            yPercent: 0,
            duration: 0.45,
            ease: "power2.out",
          });
          headerHidden.current = false;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobileMenuOpen, isSearchOpen]);

  useEffect(() => {
    if (!menuInnerRef.current || !menuLinksRef.current) return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";

      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.fromTo(
        menuInnerRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.5, ease: "expo.out" },
      );

      const links = menuLinksRef.current.querySelectorAll("a, button");
      gsap.fromTo(
        links,
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    } else {
      gsap.to(menuInnerRef.current, {
        x: "-100%",
        duration: 0.4,
        ease: "expo.in",
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });

      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!searchCardRef.current) return;

    if (isSearchOpen) {
      document.body.style.overflow = "hidden";

      gsap.to(searchOverlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.25,
      });

      gsap.fromTo(
        searchCardRef.current,
        { y: -40, scale: 0.93, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" },
      );
    } else {
      gsap.to(searchCardRef.current, {
        y: -20,
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });

      gsap.to(searchOverlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleLogoEnter = () =>
    gsap.to(logoRef.current, {
      letterSpacing: "-0.05em",
      duration: 0.35,
      ease: "power2.out",
    });

  const handleLogoLeave = () =>
    gsap.to(logoRef.current, {
      letterSpacing: "-0.06em",
      duration: 0.4,
      ease: "power2.out",
    });

  const headerIsWhite = useMemo(
    () => !isScrolled || isHovered || isMobileMenuOpen || isSearchOpen,
    [isScrolled, isHovered, isMobileMenuOpen, isSearchOpen],
  );

  const firstRightItem = rightNav[0];
  const otherRightItems = rightNav.slice(1);
  const allMobileLinks = [...leftNav, ...centerNav];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setIsSearchOpen(false);
    setSearchValue("");
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed left-0 top-0 z-50 w-full transition-colors duration-300",
          headerIsWhite
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(75,42,35,0.06)]"
            : "bg-transparent",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-linear-to-r from-[#c97c50] via-[#a8553b] to-[#4b2a23]"
          style={{ transform: "scaleX(0)" }}
        />

        <div className="mx-auto flex h-[76px] w-full items-center justify-between px-4 sm:px-5 lg:px-6">
          <div className="flex min-w-0 items-center gap-6 lg:gap-10">
            <div className="lg:hidden">
              <MagneticIconBtn
                label="Открыть меню"
                icon={Menu}
                onClick={() => setIsMobileMenuOpen(true)}
              />
            </div>

            <Link
              ref={logoRef}
              href={logoHref}
              onMouseEnter={handleLogoEnter}
              onMouseLeave={handleLogoLeave}
              className="hidden lg:block shrink-0 text-[24px] font-semibold leading-none tracking-[-0.06em] text-[#4b2a23] sm:text-[28px] lg:text-[30px]"
            >
              {logoText}
            </Link>

            <nav
              ref={leftNavRef as React.RefObject<HTMLElement>}
              className="hidden items-center gap-8 lg:flex"
            >
              {leftNav.map((item) => (
                <HeaderLink key={item.label} href={item.href}>
                  {item.label}
                </HeaderLink>
              ))}
            </nav>
          </div>

          <nav
            ref={centerNavRef as React.RefObject<HTMLElement>}
            className="hidden items-center gap-10 xl:flex"
          >
            {centerNav.map((item) => (
              <HeaderLink key={item.label} href={item.href}>
                {item.label}
              </HeaderLink>
            ))}
          </nav>

          <div
            ref={rightGroupRef}
            className="flex items-center gap-0 sm:gap-3 lg:gap-4"
          >
            {firstRightItem && (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-[#4b2a23] transition-colors hover:bg-[#f5f1ee] lg:flex"
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, {
                    scale: 1.04,
                    duration: 0.25,
                    ease: "power2.out",
                  })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.3,
                    ease: "elastic.out(1,0.5)",
                  })
                }
              >
                <span className="text-[15px] font-medium tracking-[-0.02em]">
                  {firstRightItem.label}
                </span>
                <firstRightItem.icon
                  size={18}
                  strokeWidth={1.9}
                  className="shrink-0"
                />
              </button>
            )}

            <div className="lg:hidden">
              <MagneticIconBtn
                label="Поиск"
                icon={Search}
                onClick={() => setIsSearchOpen(true)}
              />
            </div>

            <div className="flex items-center">
              {otherRightItems.map((item) => (
                item.href === "/wishlist" ? (
                  <WishlistNavLink key={item.label} />
                ) : (
                  <MagneticIconBtn
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                  />
                )
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="h-[76px]" />

      <HeaderSearchOverlay
        isSearchOpen={isSearchOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setIsSearchOpen={setIsSearchOpen}
        searchOverlayRef={searchOverlayRef}
        searchCardRef={searchCardRef}
        handleSearchSubmit={handleSearchSubmit}
      />

      <div
        ref={mobileMenuRef}
        className="pointer-events-none fixed inset-0 z-55 bg-black/30 opacity-0 md:hidden"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          ref={menuInnerRef}
          className="h-full w-[86%] max-w-[380px] -translate-x-full bg-white p-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-8 flex items-center justify-between">
            <Link
              href={logoHref}
              className="text-[24px] font-semibold leading-none tracking-[-0.06em] text-[#4b2a23]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {logoText}
            </Link>

            <MagneticIconBtn
              label="Закрыть меню"
              icon={X}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>

          <div className="mb-8">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex h-12 w-full items-center gap-3 rounded-full bg-[#f5f1ee] px-4 text-left text-[#4b2a23] transition hover:bg-[#ede4df]"
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, { x: 4, duration: 0.2 })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  x: 0,
                  duration: 0.3,
                  ease: "elastic.out(1,0.5)",
                })
              }
            >
              <Search size={18} strokeWidth={1.9} />
              <span className="text-[15px]">Поиск товаров</span>
            </button>
          </div>

          <div ref={menuLinksRef} className="flex flex-col gap-4">
            {allMobileLinks.map((item) => (
              <HeaderLink
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[20px]"
              >
                {item.label}
              </HeaderLink>
            ))}
          </div>

          <div className="mt-10 border-t border-[#eee3dd] pt-6">
            <div className="grid grid-cols-2 gap-3">
              {otherRightItems.map((item) => {
                if (item.href === "/wishlist") {
                  return (
                    <WishlistNavLink
                      key={item.label}
                      variant="tile"
                      onNavigate={() => setIsMobileMenuOpen(false)}
                    />
                  );
                }

                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-2xl bg-[#faf7f5] px-4 py-3 text-[#4b2a23] transition hover:bg-[#f5f1ee]"
                    onMouseEnter={(e) =>
                      gsap.to(e.currentTarget, {
                        scale: 1.04,
                        duration: 0.2,
                        ease: "power2.out",
                      })
                    }
                    onMouseLeave={(e) =>
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        duration: 0.3,
                        ease: "elastic.out(1,0.5)",
                      })
                    }
                  >
                    <Icon size={18} strokeWidth={1.9} />
                    <span className="text-[15px] font-medium">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
