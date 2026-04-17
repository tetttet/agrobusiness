"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { gsap } from "gsap";
import {
  Wheat,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Instagram,
  ChevronRight,
} from "lucide-react";
import {
  DEFAULT_CENTER_NAV,
  DEFAULT_LEFT_NAV,
} from "@/constants/header.constants";

interface FooterLinkGroup {
  heading: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  logoText?: string;
  logoHref?: string;
  description?: string;
  groups?: FooterLinkGroup[];
  contacts?: {
    address?: string;
    phone?: string;
    email?: string;
  };
  socials?: { icon: React.ElementType; label: string; href: string }[];
  copyright?: string;
  className?: string;
}

const buildSearchHref = (params: Record<string, string>) =>
  `/search?${new URLSearchParams(params).toString()}`;

const DEFAULT_GROUPS: FooterLinkGroup[] = [
  {
    heading: "Навигация",
    links: [{ label: "Главная", href: "/" }, ...DEFAULT_LEFT_NAV],
  },
  {
    heading: "Разделы",
    links: [...DEFAULT_CENTER_NAV, { label: "Поиск", href: "/search" }],
  },
  {
    heading: "Каталог",
    links: [
      { label: "Косилки", href: buildSearchHref({ category: "Косилки" }) },
      {
        label: "Опрыскиватели",
        href: buildSearchHref({ category: "Опрыскиватели" }),
      },
      {
        label: "Дисковые бороны",
        href: buildSearchHref({ category: "Дисковые бороны" }),
      },
      { label: "Карданы", href: buildSearchHref({ category: "Карданы" }) },
      { label: "Со скидкой", href: buildSearchHref({ sale: "1" }) },
    ],
  },
];

const DEFAULT_CONTACTS = {
  address:
    "Казакстан Республикасы, 01000 Акмола облысы, Астана Каласы, Пушкина кешесі, 58.",
  phone: "+7 747 909 9012",
  email: "rnadir2006@gmail.com",
};

//https://www.tiktok.com/@agrobusinessast?_t=ZM-8xPsmuZo5cU&_r=1
//whatsapp: https://wa.me/77479099012

const DEFAULT_SOCIALS = [
  { icon: Mail, label: "Email", href: "mailto:rnadir2006@gmail.com" },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/agro_business_astana/",
  },
  { icon: Phone, label: "WhatsApp", href: "https://wa.me/77479099012" },
];

const BOTTOM_LINKS = [
  { label: "Главная", href: "/" },
  { label: "Каталог", href: "/products" },
  { label: "О нас", href: "/about" },
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Поиск", href: "/search" },
];

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const GrainOverlay = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="grain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.72"
        numOctaves="4"
        stitchTiles="stitch"
      />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain)" />
  </svg>
);

interface NewsletterInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  btnRef: React.RefObject<HTMLButtonElement | null>;
}

const NewsletterInput = ({ inputRef, btnRef }: NewsletterInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputRef.current?.value.trim();
    if (!val) return;

    gsap.to(btnRef.current, {
      scale: 0.94,
      duration: 0.12,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-5 flex h-12 w-full max-w-[360px] overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 focus-within:border-[#4b2a23]/90 focus-within:bg-white/10"
    >
      <input
        ref={inputRef}
        type="email"
        placeholder="Ваш e-mail"
        className="flex-1 bg-transparent pl-5 pr-3 text-[14px] text-white placeholder:text-white/40 outline-none"
      />
      <button
        ref={btnRef}
        type="submit"
        className="group my-1.5 mr-1.5 flex items-center gap-1.5 rounded-full bg-[#4b2a23] px-4 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#5b342b]"
        onMouseEnter={(e) =>
          gsap.to(e.currentTarget, {
            scale: 1.05,
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
        Подписаться
        <ChevronRight
          size={14}
          strokeWidth={2.5}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>
    </form>
  );
};

const Footer = ({
  logoText = "AGRO Business",
  logoHref = "/",
  description = "Подбираем сельхозтехнику и навесное оборудование под реальные задачи хозяйства: от каталога и поиска до уверенного выбора нужной модели.",
  groups = DEFAULT_GROUPS,
  contacts = DEFAULT_CONTACTS,
  socials = DEFAULT_SOCIALS,
  copyright,
  className = "",
}: FooterProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={cn(
        "relative w-full overflow-hidden bg-black text-white",
        className,
      )}
    >
      <GrainOverlay />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#4b2a23]/25 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-[#4b2a23]/10 blur-[100px]"
      />

      <div className="mx-6">
        <div className="h-px w-full bg-linear-to-r from-transparent via-[#4b2a23] to-transparent" />
      </div>

      <div className="mx-auto lg:max-w-10/12 px-4 pb-0 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_auto_auto_auto_1fr] lg:gap-10 xl:gap-16">
          <div className="flex flex-col">
            <Link
              href={logoHref}
              className="mb-4 inline-block text-[28px] font-semibold leading-none tracking-[-0.05em] text-white transition-all duration-300 hover:opacity-80 sm:text-[32px]"
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  letterSpacing: "-0.03em",
                  duration: 0.3,
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  letterSpacing: "-0.05em",
                  duration: 0.35,
                })
              }
            >
              {logoText}
            </Link>

            <div className="mb-1 flex items-center gap-2 opacity-80">
              <Wheat size={14} strokeWidth={1.8} className="text-white" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-white">
                Техника для поля
              </span>
            </div>

            <p
              className="mt-3 max-w-[320px] text-[14px] leading-relaxed text-white/60"
            >
              {description}
            </p>

            <div className="mt-8">
              <p className="mb-1 text-[13px] font-medium text-white/80">
                Получайте новости и специальные предложения
              </p>
              <NewsletterInput inputRef={inputRef} btnRef={btnRef} />
            </div>

            <div className="mt-8 flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#282828] bg-white/3 text-white/60 transition-all duration-300 hover:border-[#4b2a23] hover:bg-[#4b2a23]/15 hover:text-white"
                  onMouseEnter={(e) =>
                    gsap.to(e.currentTarget, {
                      scale: 1.12,
                      duration: 0.22,
                      ease: "power2.out",
                    })
                  }
                  onMouseLeave={(e) =>
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      duration: 0.35,
                      ease: "elastic.out(1,0.5)",
                    })
                  }
                >
                  <Icon size={16} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.heading} className="flex flex-col">
              <p className="col-heading mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                {group.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {group.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="-ml-[13px] col-link group flex items-center gap-1 text-[14px] text-white/60 transition-all duration-300 hover:text-white"
                      onMouseEnter={(e) =>
                        gsap.to(e.currentTarget, {
                          x: 4,
                          duration: 0.2,
                          ease: "power2.out",
                        })
                      }
                      onMouseLeave={(e) =>
                        gsap.to(e.currentTarget, {
                          x: 0,
                          duration: 0.3,
                          ease: "elastic.out(1,0.5)",
                        })
                      }
                    >
                      <ChevronRight
                        size={12}
                        strokeWidth={2.5}
                        className="-ml-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Контакты
            </p>

            <div className="flex flex-col gap-4">
              {contacts.address && (
                <a
                  href={`https://maps.google.com?q=${encodeURIComponent(
                    contacts.address,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[14px] text-white/60 transition-colors hover:text-white"
                >
                  <MapPin
                    size={15}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0 text-[#4b2a23]"
                  />
                  <span className="leading-snug">{contacts.address}</span>
                </a>
              )}

              {contacts.phone && (
                <a
                  href={`tel:${contacts.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-[14px] text-white/60 transition-colors hover:text-white"
                >
                  <Phone
                    size={15}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#4b2a23]"
                  />
                  {contacts.phone}
                </a>
              )}

              {contacts.email && (
                <a
                  href={`mailto:${contacts.email}`}
                  className="flex items-center gap-3 text-[14px] text-white/60 transition-colors hover:text-white"
                >
                  <Mail
                    size={15}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#4b2a23]"
                  />
                  {contacts.email}
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group mt-10 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/3 px-5 py-2.5 text-[13px] font-medium text-white/70 transition-all duration-300 hover:border-[#4b2a23] hover:bg-[#4b2a23]/15 hover:text-white"
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
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className="-rotate-45 transition-transform group-hover:rotate-0"
              />
              Наверх
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-[13px] text-white/35 sm:flex-row">
          <p>
            © {year} {logoText}. Все права защищены.
            {copyright && ` ${copyright}`}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            {BOTTOM_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors duration-300 hover:text-white/70"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
