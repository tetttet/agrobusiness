import Image from "next/image";

type AdCard = {
  src: string;
  alt: string;
  title: string;
  badge: string;
  layout: string;
  sizes: string;
};

const adsCards: AdCard[] = [
  {
    src: "/images/ads/1.jpeg",
    alt: "Рекламный макет разбрасывателя минеральных удобрений Lisicki",
    title: "Разбрасыватель удобрений",
    badge: "Флагман",
    layout: "aspect-[4/3] md:aspect-auto md:col-span-7 md:row-span-2",
    sizes: "(max-width: 868px) 150vw, (max-width: 1680px) 78vw, 74vw",
  },
  {
    src: "/images/ads/2.jpeg",
    alt: "Рекламный макет с линейкой роторных косилок и комплектующих",
    title: "Косилки и комплектующие",
    badge: "Линейка",
    layout: "aspect-[16/10] md:aspect-auto md:col-span-5",
    sizes: "(max-width: 868px) 150vw, (max-width: 1680px) 78vw, 74vw",
  },
  {
    src: "/images/ads/3.jpeg",
    alt: "Рекламный макет навесного опрыскивателя Lisicki",
    title: "Навесной опрыскиватель",
    badge: "Для поля",
    layout: "aspect-[16/10] md:aspect-auto md:col-span-5",
    sizes: "(max-width: 868px) 150vw, (max-width: 1680px) 78vw, 74vw",
  },
  {
    src: "/images/ads/4.jpeg",
    alt: "Рекламный макет роторной косилки Lisicki FMR Z-178",
    title: "Роторная косилка Z-178",
    badge: "Акция",
    layout: "aspect-[16/10] md:aspect-auto md:col-span-4",
    sizes: "(max-width: 868px) 150vw, (max-width: 1680px) 78vw, 74vw",
  },
  {
    src: "/images/ads/5.jpeg",
    alt: "Логотип Lisicki и подпись официального представителя в Казахстане",
    title: "Фирменная идентика",
    badge: "Бренд",
    layout: "aspect-square md:aspect-auto md:col-span-3",
    sizes: "(max-width: 868px) 150vw, (max-width: 1680px) 78vw, 74vw",
  },
  {
    src: "/images/ads/6.jpeg",
    alt: "Подборка граблей-ворошилок и дисковых борон М-Агро",
    title: "Подборка навесного оборудования",
    badge: "Подборка",
    layout: "aspect-[16/10] md:aspect-auto md:col-span-5",
    sizes: "(max-width: 868px) 150vw, (max-width: 1680px) 78vw, 74vw",
  },
  {
    src: "/images/ads/7.jpeg",
    alt: "Рекламный макет роторной косилки Lisicki с ножами и карданом в комплекте",
    title: "Косилка с комплектом",
    badge: "Готовое решение",
    layout: "aspect-[16/10] md:aspect-auto md:col-span-5",
    sizes: "(max-width: 868px) 150vw, (max-width: 1680px) 78vw, 74vw",
  },
  {
    src: "/images/ads/8.jpeg",
    alt: "Подборка почвофрез, ямобура, плугов, дисковой бороны и картофелесажалки",
    title: "Техника для разных задач",
    badge: "Ассортимент",
    layout: "aspect-square md:aspect-auto md:col-span-3",
    sizes: "(max-width: 868px) 150vw, (max-width: 1680px) 78vw, 74vw",
  },
  {
    src: "/images/ads/9.jpeg",
    alt: "Рекламный макет навесного ямобура Lisicki",
    title: "Навесной ямобур",
    badge: "Новинка",
    layout: "aspect-[16/10] md:aspect-auto md:col-span-4",
    sizes: "(max-width: 868px) 150vw, (max-width: 1680px) 78vw, 74vw",
  },
];

const AdsImages = () => {
  return (
    <section className="-mt-10 relative overflow-hidden py-16 text-[#1f1814] sm:py-20 lg:py-24">

      <div className="relative mx-auto max-w-360 px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid gap-4 md:auto-rows-[270px] md:grid-cols-12 lg:auto-rows-[340px]">
          {adsCards.map((card, index) => (
            <article
              key={card.src}
              className={`${card.layout} group relative md:h-full`}
            >
              <div className="absolute inset-3 rounded-[1.8rem] bg-[#c97c50]/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 md:opacity-0" />

              <div className="relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-[#4b2a23]/10 bg-white/92 p-2 shadow-[0_18px_48px_rgba(75,42,35,0.08)] transition duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_26px_70px_rgba(75,42,35,0.14)]">
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.35rem] border border-[#4b2a23]/10 bg-[#fffaf4]">
                  <Image
                    fill
                    src={card.src}
                    alt={card.alt}
                    sizes={card.sizes}
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex items-end justify-between gap-3 px-2 pb-1 pt-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4b2a23]/45">
                      {card.badge}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold leading-5 text-[#1f1814] sm:text-[15px]">
                      {card.title}
                    </h3>
                  </div>
                  <span className="text-sm text-[#4b2a23]/28">
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

export default AdsImages;
