import { Play } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Видеообзор 01",
    description:
      "Материал из нашей YouTube-подборки с демонстрацией техники и ключевых деталей.",
    src: "https://www.youtube.com/embed/zrf48U_ZELM?si=10gxgidWa2WuaomV",
  },
  {
    id: 2,
    title: "Видеообзор 02",
    description:
      "Спокойный формат обзора, в котором легко уловить главное по модели и подаче.",
    src: "https://www.youtube.com/embed/uDg2L1anGNQ?si=uVF4tzIqeB5KE91-",
  },
  {
    id: 3,
    title: "Видеообзор 03",
    description:
      "Видео для тех, кто предпочитает сначала увидеть технику вживую, а потом принимать решение.",
    src: "https://www.youtube.com/embed/2CXaO5FbV0o?si=gzzVy3Y7hlCUXuDw",
  },
];

const mediaCards = [
  {
    label: "Обзоры",
    text: "Показываем технику в понятном, спокойном формате без визуального перегруза.",
  },
  {
    label: "Новинки",
    text: "Собираем материалы о свежих поступлениях и важных обновлениях ассортимента.",
  },
  {
    label: "Польза",
    text: "Делаем контент, который помогает быстрее понять продукт перед выбором.",
  },
];

const SocialLinks = () => {
  return (
    <section className="font-body relative overflow-hidden bg-[#fcfaf7] py-16 text-[#1f1814] sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-[#4b2a23]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(75,42,35,0.05),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(75,42,35,0.04),transparent_30%)]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-[#4b2a23]/10 pb-8 sm:mb-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-[#4b2a23]/55">
                04 / Медиа
              </p>
              <h2 className="font-display text-[2.8rem] leading-[0.94] text-[#1f1814] sm:text-[3.4rem] lg:text-[4.4rem]">
                Смотрите обзоры техники
                <br className="hidden sm:block" />
                на YouTube
              </h2>
              <p className="mt-4 max-w-[760px] text-sm leading-7 text-[#5f514a] sm:text-base">
                На нашем медиаблоке собраны материалы, которые помогают быстро
                понять продукт: как он выглядит, чем отличается и где может
                быть полезен в работе.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#4b2a23]/10 bg-white/90 p-5 shadow-[0_18px_48px_rgba(75,42,35,0.06)]">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#4b2a23]/45">
                Формат
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Видеообзоры", "Новые поступления", "Полезные разборы"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#4b2a23]/10 bg-[#fcfaf7] px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[#4b2a23]/55"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {mediaCards.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.35rem] border border-[#4b2a23]/10 bg-white/85 p-5 shadow-[0_16px_40px_rgba(75,42,35,0.05)]"
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#4b2a23]/45">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#5f514a] sm:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {videos.map((video, index) => (
            <article
              key={video.id}
              className="group relative overflow-hidden rounded-[1.75rem] border border-[#4b2a23]/10 bg-white p-4 shadow-[0_20px_60px_rgba(75,42,35,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(75,42,35,0.11)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(75,42,35,0.08),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-[#4b2a23]/10 bg-[#fcfaf7] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#4b2a23]/55">
                    Видео {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#4b2a23]/45">
                    <Play className="h-3.5 w-3.5" />
                    Обзор
                  </span>
                </div>

                <div className="overflow-hidden rounded-[1.35rem] border border-[#4b2a23]/10 bg-[#f4efe8]">
                  <iframe
                    className="h-56 w-full"
                    src={video.src}
                    title={video.title}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1f1814]">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#62544d]">
                      {video.description}
                    </p>
                  </div>
                  <span className="mt-1 text-sm text-[#4b2a23]/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
