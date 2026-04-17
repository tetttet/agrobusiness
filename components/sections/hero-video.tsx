"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

/* ─── Slide data ─────────────────────────────────────────── */
const slides = [
  {
    src: "https://www.pexels.com/download/video/32608500/",
    tag: "01 / АГРО ТЕХНИКА",
    title: "Мощь\nземледелия",
    subtitle: "Профессиональная техника для вашего хозяйства",
    cta: "Смотреть каталог",
    href: "/products",
  },
  {
    src: "https://www.pexels.com/download/video/26664334/",
    tag: "02 / ПОСТАВКИ",
    title: "Надёжно\nи в срок",
    subtitle: "Прямые поставки от ведущих производителей",
    cta: "Узнать подробнее",
    href: "/",
  },
];

const SLIDE_MS = 5000;
const EASE_DUR = 0.9;
const ACCENT = "#4b2a23";

/* ─── Component ──────────────────────────────────────────── */
export default function HeroVideo() {
  const stripRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTl = useRef<gsap.core.Tween | null>(null);
  const router = useRouter();

  const [current, setCurrent] = useState(0);
  const [locked, setLocked] = useState(false);
  const count = slides.length;

  /* entrance */
  useEffect(() => {
    gsap.from(".hero-overlay", {
      opacity: 0,
      duration: 1.4,
      ease: "power2.out",
    });
    textIn(0, true);
  }, []);

  /* auto-advance */
  useEffect(() => {
    startProgress();
    timerRef.current = setTimeout(advance, SLIDE_MS);
    return () => {
      clearTimeout(timerRef.current!);
      progressTl.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  function startProgress() {
    progressTl.current?.kill();
    if (!progressRef.current) return;
    gsap.set(progressRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });
    progressTl.current = gsap.to(progressRef.current, {
      scaleX: 1,
      duration: SLIDE_MS / 1000,
      ease: "none",
    });
  }

  function advance() {
    goTo((current + 1) % count);
  }

  function goTo(next: number) {
    if (locked || next === current) return;
    setLocked(true);

    gsap.to(stripRef.current, {
      x: -next * window.innerWidth,
      duration: EASE_DUR,
      ease: "expo.inOut",
      onComplete: () => {
        setCurrent(next);
        setLocked(false);
      },
    });

    textOut(current);
    gsap.delayedCall(EASE_DUR * 0.55, () => textIn(next));
  }

  function textIn(idx: number, instant = false) {
    const el = textRefs.current[idx];
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".ac"),
      { y: 55, opacity: 0, skewY: 2 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: instant ? 0.8 : 0.78,
        stagger: 0.11,
        ease: "power3.out",
      },
    );
  }

  function textOut(idx: number) {
    const el = textRefs.current[idx];
    if (!el) return;
    gsap.to(el.querySelectorAll(".ac"), {
      y: -38,
      opacity: 0,
      duration: 0.38,
      stagger: 0.07,
      ease: "power2.in",
    });
  }

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-black">
      {/* ── Video strip ──────────────────────────────────── */}
      <div
        ref={stripRef}
        className="flex h-full will-change-transform"
        style={{ width: `${count * 100}vw` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="relative shrink-0 w-screen h-full">
            <video
              src={s.src}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* ── Gradient overlay ─────────────────────────────── */}
      <div
        className="hero-overlay absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.05) 100%)",
        }}
      />

      {/* ── Grain overlay ────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Вертикальная полоса ─────────────────────────── */}
      <div
        className="absolute top-[14%] bottom-[14%] w-[3px] rounded-full"
        style={{ left: "6vw", backgroundColor: ACCENT }}
      />

      {/* ── Текстовые блоки ─────────────────────────────── */}
      {slides.map((s, i) => (
        <div
          key={i}
          ref={(el) => {
            textRefs.current[i] = el;
          }}
          className="absolute inset-0 flex flex-col justify-center pointer-events-none"
          style={{
            paddingLeft: "clamp(1.2rem, calc(6vw + 0.85rem), 8rem)",
            paddingRight: "1.2rem",
            paddingTop: "clamp(3.5rem, 6vh, 6rem)",
          }}
        >
          {/* Тег */}
          <span
            className="ac mb-4 uppercase tracking-[0.28em] opacity-0 sm:mb-5 sm:tracking-[0.32em]"
            style={{
              fontSize: "clamp(9px, 2.4vw, 12px)",
              color: "#ffffff",
            }}
          >
            {s.tag}
          </span>

          {/* Заголовок */}
          <h1
            className="ac text-white font-bold uppercase leading-none opacity-0"
            style={{
              fontSize: "clamp(2.2rem, min(11vw, 7vh), 6rem)",
              whiteSpace: "pre-line",
              letterSpacing: "0.01em",
              lineHeight: 0.92,
              textShadow: "0 3px 36px rgba(0,0,0,0.55)",
            }}
          >
            {s.title}
          </h1>

          {/* Подзаголовок */}
          <p
            className="ac text-white/70 font-light opacity-0"
            style={{
              fontSize: "clamp(12px, min(3.8vw, 2.2vh), 17px)",
              letterSpacing: "0.03em",
              maxWidth: "30ch",
            }}
          >
            {s.subtitle}
          </p>

          {/* CTA */}
          <button
            className="ac pointer-events-auto mt-6 w-fit font-medium uppercase
                       px-5 py-2.5 sm:mt-8 sm:px-7 sm:py-3
                       border bg-white text-black
                       hover:text-white
                       transition-colors duration-300 opacity-0"
            style={{
              fontSize: "clamp(10px, 2.8vw, 13px)",
              letterSpacing: "0.18em",
              borderColor: "#ffffff",
            }}
            onClick={() => router.push(s.href)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = ACCENT;
              e.currentTarget.style.borderColor = ACCENT;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
            }}
          >
            {s.cta}
          </button>
        </div>
      ))}

      {/* ── Счётчик слайдов ─────────────────────────────── */}
      <div
        className="absolute bottom-9 right-4 flex items-center gap-1.5 text-white/50 sm:bottom-12 sm:right-[5vw] sm:gap-2"
        style={{
          fontSize: "clamp(10px, 2.6vw, 13px)",
          letterSpacing: "0.18em",
        }}
      >
        <span className="text-white font-medium">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span>/</span>
        <span>{String(count).padStart(2, "0")}</span>
      </div>

      {/* ── Dot навигация ───────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-[5px] sm:bottom-[2.8rem] sm:gap-[6px]">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              clearTimeout(timerRef.current!);
              goTo(i);
            }}
            className="h-[5px] rounded-sm transition-all duration-500 cursor-pointer"
            style={{
              width: i === current ? "clamp(1.5rem, 8vw, 2rem)" : "5px",
              background: i === current ? ACCENT : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      {/* ── Прогресс-бар ────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0"
          style={{ backgroundColor: ACCENT }}
        />
      </div>
    </section>
  );
}
