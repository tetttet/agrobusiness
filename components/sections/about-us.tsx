"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  "Доступность передовых агротехнологий для всех хозяйств",
  "Внедрение инноваций для повышения урожайности и качества продукции",
  "Снижение затрат и оптимизация ресурсов",
  "Постоянное развитие и адаптация к потребностям аграрного сектора",
];

const tasks = [
  {
    title: "Мы",
    text: "Прилагаем все усилия, чтобы приобретенная у нас техника стала надёжным помощником в решении задач, стоящих перед аграриями.",
  },
  {
    title: "Постоянно",
    text: "Расширяем свою дилерскую сеть, и теперь продажа сельхозтехники стала возможна не только в Казахстане, но и на территории других стран.",
  },
  {
    title: "Для",
    text: "Удобства работы с казахстанскими потребителями на территории Республики Казахстан создан филиал в г. Астане, где по желанию клиента может быть предоставлена продукция, очищенная от таможенных пошлин.",
  },
];

const stats = [
  { number: "01", label: "Фокус на агросектор" },
  { number: "02", label: "Современные решения" },
  { number: "03", label: "Надёжное партнёрство" },
];

const focusCards = [
  {
    label: "Практичный выбор",
    title: "Подбираем технику по задаче",
    text: "Смотрим не только на витрину, а на условия работы хозяйства и реальные сценарии в поле.",
  },
  {
    label: "Долгий горизонт",
    title: "Думаем о партнёрстве, а не о разовой продаже",
    text: "Для нас важны сервис, понятная коммуникация и уверенность клиента уже после покупки.",
  },
];

const approachNotes = [
  { label: "Формат работы", value: "Под задачи хозяйства" },
  { label: "Тон общения", value: "Спокойный и предметный" },
];

const AboutUs = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hoverCleanups: Array<() => void> = [];

      gsap.set(
        [
          ".hero-kicker",
          ".hero-title-line",
          ".hero-text",
          ".hero-button",
          ".hero-image-wrap",
          ".section-head",
          ".story-card",
          ".value-item",
          ".task-card",
          ".stat-card",
          ".line-grow",
        ],
        {
          opacity: 0,
        },
      );

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .fromTo(".hero-overlay", { opacity: 0 }, { opacity: 1, duration: 1.1 })
        .fromTo(
          ".hero-kicker",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.6",
        )
        .fromTo(
          ".hero-title-line",
          { y: 70, opacity: 0, skewY: 3 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.4",
        )
        .fromTo(
          ".hero-text",
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          "-=0.5",
        )
        .fromTo(
          ".hero-button",
          { y: 20, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55 },
          "-=0.35",
        )
        .fromTo(
          ".hero-image-wrap",
          { scale: 1.08, opacity: 0, x: 40 },
          { scale: 1, opacity: 1, x: 0, duration: 1.1, ease: "expo.out" },
          "-=1.0",
        )
        .fromTo(
          ".line-grow",
          { scaleY: 0, transformOrigin: "top center", opacity: 1 },
          { scaleY: 1, duration: 1.0, ease: "power2.out" },
          "-=1.1",
        );

      gsap.utils.toArray<HTMLElement>(".section-head").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".story-card").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".stat-card").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".value-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".task-card").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 55, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
            },
          },
        );
      });

      gsap.to(".parallax-image", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-block",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".hover-lift").forEach((card) => {
        const enter = () => {
          gsap.to(card, {
            y: -8,
            duration: 0.35,
            ease: "power2.out",
          });

          const glow = card.querySelector(".card-glow");
          if (glow) {
            gsap.to(glow, {
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
            });
          }
        };

        const leave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          });

          const glow = card.querySelector(".card-glow");
          if (glow) {
            gsap.to(glow, {
              opacity: 0,
              duration: 0.35,
              ease: "power2.out",
            });
          }
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);

        hoverCleanups.push(() => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        });
      });

      return () => {
        hoverCleanups.forEach((cleanup) => cleanup());
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="font-body relative overflow-hidden bg-white text-[#1f1814]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-overlay absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(75,42,35,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(75,42,35,0.06),transparent_26%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[#4b2a23]/10" />
      </div>

      <section className="relative mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
          <div className="relative">
            <div
              className="line-grow absolute left-0 top-2 h-[174px] w-px rounded-full bg-[#4b2a23]"
              style={{ transformOrigin: "top center" }}
            />
            <div className="pl-8 sm:pl-10">
              <p className="hero-kicker mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-[#4b2a23]/60 sm:text-xs">
                01 / О компании
              </p>

              <h2 className="mb-8 text-[#1f1814]">
                <span className="mb-2 block overflow-hidden">
                  <span className="hero-title-line font-display block text-[3rem] leading-[0.92] sm:text-[3.6rem] lg:text-[5.2rem]">
                    История,
                  </span>
                </span>
                <span className="mb-2 block overflow-hidden">
                  <span className="hero-title-line font-display block text-[3rem] leading-[0.92] sm:text-[3.6rem] lg:text-[5.2rem]">
                    подход
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-title-line font-display block text-[3rem] leading-[0.92] sm:text-[3.6rem] lg:text-[5.2rem]">
                    и доверие
                  </span>
                </span>
              </h2>

              <p className="hero-text max-w-[620px] text-[15px] leading-8 text-[#5f514a] sm:text-base">
                Мы создаём современное пространство для аграрного бизнеса:
                соединяем надёжную технику, практический опыт и технологичный
                подход, чтобы работа на земле становилась проще, точнее и
                эффективнее.
              </p>

              <div className="hero-button mt-8 grid gap-3 sm:grid-cols-2">
                {focusCards.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.25rem] border border-[#4b2a23]/10 bg-[#fcfaf7] p-4 shadow-[0_18px_40px_rgba(75,42,35,0.05)]"
                  >
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#4b2a23]/45">
                      {item.label}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-[#1f1814]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#6a5b53]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-image-wrap parallax-block relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-[#4b2a23]/6 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#4b2a23]/12 bg-[#fcfaf7] shadow-[0_28px_90px_rgba(75,42,35,0.12)]">
              <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#4b2a23]/25 to-transparent" />
              <div className="grid min-h-[540px] grid-cols-1 lg:grid-cols-[0.88fr_1.12fr]">
                <div className="relative flex flex-col justify-between border-b border-[#4b2a23]/10 bg-[linear-gradient(180deg,#ffffff,rgba(248,245,241,0.95))] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(75,42,35,0.07),transparent_48%)]" />
                  <div className="relative z-10">
                    <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#4b2a23]/45">
                      Наш подход
                    </p>
                    <h3 className="font-display max-w-[11ch] text-4xl leading-[0.92] text-[#1f1814] sm:text-5xl">
                      Надёжность.
                      <br />
                      Простота.
                      <br />
                      Технологии.
                    </h3>
                    <p className="mt-5 max-w-[28ch] text-sm leading-7 text-[#62544d] sm:text-base">
                      Мы собираем современное агро-пространство без перегруза:
                      понятная техника, честная консультация и решения,
                      которые работают в сезоне, а не только на презентации.
                    </p>
                  </div>

                  <div className="relative z-10 grid gap-3 sm:grid-cols-2">
                    {approachNotes.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-[1.25rem] border border-[#4b2a23]/10 bg-white/80 p-4"
                      >
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#4b2a23]/40">
                          {item.label}
                        </p>
                        <p className="mt-2 text-sm font-medium text-[#1f1814]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[360px] overflow-hidden bg-[#efe7de]">
                  <div className="absolute left-5 top-5 z-10 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#4b2a23]/65 shadow-sm">
                    Agro Business
                  </div>
                  <Image
                    src="/images/site/bernd-dittrich-z53DMbNTkkQ-unsplash.jpg"
                    alt="О нас"
                    fill
                    sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(100vw - 3rem), 56vw"
                    priority
                    className="parallax-image object-cover object-center transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(75,42,35,0.18))]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1440px] px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.number}
              className="stat-card hover-lift group relative overflow-hidden rounded-[1.5rem] border border-[#4b2a23]/10 bg-[#fcfaf7] p-6 shadow-[0_20px_50px_rgba(75,42,35,0.06)]"
            >
              <div className="card-glow pointer-events-none absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_top_left,rgba(75,42,35,0.10),transparent_46%)]" />
              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[#4b2a23]/45">
                    {item.number}
                  </span>
                  <span className="h-px w-14 bg-[#4b2a23]/12 transition-all duration-300 group-hover:w-20 group-hover:bg-[#4b2a23]/35" />
                </div>
                <p className="max-w-[18ch] text-lg font-medium text-[#1f1814]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="section-head mb-10 flex items-end justify-between gap-6 border-b border-[#4b2a23]/10 pb-6">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-[#4b2a23]/45">
              02 / Наша история
            </p>
            <h2 className="font-display text-4xl leading-none text-[#1f1814] sm:text-5xl lg:text-6xl">
              КТО МЫ
            </h2>
          </div>

          <p className="hidden max-w-[520px] text-sm leading-7 text-[#6b5d56] lg:block">
            Показываем компанию спокойно и уверенно: с акцентом на опыт,
            понятный подход и реальную пользу для клиента.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="story-card hover-lift relative overflow-hidden rounded-[1.75rem] border border-[#4b2a23]/10 bg-[#fcfaf7] p-7 shadow-[0_22px_60px_rgba(75,42,35,0.07)] sm:p-8">
            <div className="card-glow pointer-events-none absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_top_left,rgba(75,42,35,0.10),transparent_48%)]" />
            <div className="relative z-10">
              <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#4b2a23]/45">
                Наша история
              </p>
              <h3 className="font-display mb-6 max-w-[15ch] text-4xl leading-[0.96] text-[#1f1814] sm:text-5xl">
                Мы развиваем аграрный рынок через практичные решения
              </h3>
              <p className="mb-4 text-sm leading-7 text-[#5f514a] sm:text-base">
                Мы — команда специалистов, увлечённых агротехнологиями и
                инновациями. Наша цель — сделать сельскохозяйственный труд
                проще, продуктивнее и более рентабельным с помощью современных
                технологий.
              </p>
              <p className="text-sm leading-7 text-[#6e615a] sm:text-base">
                Для нас техника — это не просто продукт, а инструмент роста:
                надёжный, понятный и выгодный в ежедневной работе хозяйства.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-[#4b2a23]/10 bg-white/80 p-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#4b2a23]/40">
                    Опыт
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5f514a]">
                    Соединяем знания рынка, техники и повседневных процессов на
                    земле.
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-[#4b2a23]/10 bg-white/80 p-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#4b2a23]/40">
                    Результат
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5f514a]">
                    Помогаем выбирать решения, которые действительно упрощают
                    сезон.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="story-card hover-lift relative overflow-hidden rounded-[1.75rem] border border-[#4b2a23]/10 bg-white p-7 shadow-[0_22px_60px_rgba(75,42,35,0.05)] sm:p-8">
            <div className="card-glow pointer-events-none absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_top_right,rgba(75,42,35,0.08),transparent_42%)]" />
            <div className="relative z-10">
              <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#4b2a23]/45">
                Наши ценности
              </p>
              <div className="space-y-4">
                {values.map((item, index) => (
                  <div
                    key={item}
                    className="value-item flex items-start gap-4 border-b border-[#4b2a23]/8 pb-4 last:border-none last:pb-0"
                  >
                    <span className="mt-1 text-[11px] uppercase tracking-[0.28em] text-[#4b2a23]/55">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-7 text-[#5f514a] sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.25rem] border border-[#4b2a23]/10 bg-[#fcfaf7] p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#4b2a23]/40">
                  Основа работы
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5f514a]">
                  Выстраиваем отношения так, чтобы клиенту было понятно, удобно
                  и спокойно на каждом этапе выбора техники.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="section-head mb-10 border-b border-[#4b2a23]/10 pb-6">
          <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-[#4b2a23]/45">
            03 / Миссия
          </p>
          <h2 className="font-display max-w-[980px] text-4xl leading-[0.96] text-[#1f1814] sm:text-5xl lg:text-6xl">
            СВОЕЙ ЗАДАЧЕЙ МЫ ВИДИМ
          </h2>
          <p className="mt-5 max-w-[900px] text-sm leading-7 text-[#62544d] sm:text-base">
            Обеспечение аграрного сектора промышленности техникой признанных
            заводов-изготовителей для проведения различных сельскохозяйственных
            работ.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tasks.map((item, index) => (
            <div
              key={item.title}
              className="task-card hover-lift group relative overflow-hidden rounded-[1.75rem] border border-[#4b2a23]/10 bg-white p-7 shadow-[0_18px_48px_rgba(75,42,35,0.06)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4b2a23]/25 to-transparent" />
              <div className="card-glow pointer-events-none absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_top_left,rgba(75,42,35,0.10),transparent_48%)]" />
              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[#4b2a23]/45">
                    0{index + 1}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#4b2a23]/15 transition-colors duration-300 group-hover:bg-[#4b2a23]/40" />
                </div>

                <h3 className="font-display mb-5 text-4xl leading-none text-[#1f1814] sm:text-[2.8rem]">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-[#5f514a] sm:text-base">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_center,rgba(75,42,35,0.05),transparent_70%)]" />
    </div>
  );
};

export default AboutUs;
