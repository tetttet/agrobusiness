import { Products } from "@/types/products.types";

const DEFAULT_CURRENCY = "EUR";

const createDescription = (items: { label: string; value: string }[]) => {
  return `### Характеристики

${items.map((item) => `- **${item.label}:** ${item.value}`).join("\n")}`;
};

const createEtcProduct = ({
  id,
  name,
  price,
  oldPrice,
  description,
  image,
  category,
  currency,
}: {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  image: string[];
  category: string;
  currency?: string;
}): Products => ({
  id,
  name,
  price,
  oldPrice,
  currency: currency || DEFAULT_CURRENCY,
  image,
  category,
  description,
});

export const etcProducts: Products[] = [
  createEtcProduct({
    id: 401,
    name: "Ямобур Lisicki",
    price: 2100,
    oldPrice: 2300,
    image: ["etc/219664562_w1280_h640_219664562.webp"],
    category: "Ямобуры",
    description: createDescription([
      { label: "Тип", value: "навесной ямобур" },
      {
        label: "Назначение",
        value: "бурение отверстий для столбов, саженцев и ограждений",
      },
      { label: "Привод", value: "от вала отбора мощности (ВОМ)" },
      { label: "Совместимость", value: "для сельскохозяйственных тракторов" },
      { label: "Конструкция", value: "усиленная рама" },
    ]),
  }),

  createEtcProduct({
    id: 402,
    name: "Почвофреза Lisicki 2,1 м",
    price: 2000,
    oldPrice: 2200,
    image: ["etc/glebogryzarka-CMYK.png"],
    category: "Почвофрезы",
    description: createDescription([
      { label: "Ширина захвата", value: "2,1 м" },
      { label: "Глубина обработки", value: "до 15 см" },
      { label: "Необходимая мощность трактора", value: "от 80 л.с." },
      { label: "Тип привода", value: "от вала отбора мощности (ВОМ) трактора" },
    ]),
  }),

  createEtcProduct({
    id: 403,
    name: "Косилка садовая Lisicki 2,0 м",
    price: 2000,
    oldPrice: 2200,
    image: ["etc/6268176038_w640_h640_6268176038.webp"],
    category: "Садовые косилки",
    description: createDescription([
      { label: "Ширина захвата", value: "2,0 м" },
      { label: "Максимальная толщина измельчаемых веток", value: "до 4 см" },
      { label: "Количество ножей", value: "4 вращающихся и 2 фиксированных" },
      { label: "Рекомендуемая мощность трактора", value: "от 60 л.с." },
      { label: "Высота среза", value: "регулируется от 3 до 5 см" },
      { label: "Вес агрегата", value: "490 кг" },
    ]),
  }),

  createEtcProduct({
    id: 404,
    name: "Мульчер Lisicki 2,0 м",
    price: 3500,
    oldPrice: 3700,
    image: ["etc/6415256696_w640_h640_6415256696.webp"],
    category: "Мульчеры",
    description: createDescription([
      { label: "Ширина захвата", value: "2,0 м" },
      { label: "Максимальная толщина измельчаемых веток", value: "до 4 см" },
      { label: "Количество ножей", value: "4 вращающихся и 2 фиксированных" },
      { label: "Рекомендуемая мощность трактора", value: "от 60 л.с." },
      { label: "Высота среза", value: "регулируется от 3 до 5 см" },
      { label: "Вес агрегата", value: "490 кг" },
    ]),
  }),

  createEtcProduct({
    id: 405,
    name: "Рассадопосадочная машина D-Pol",
    price: 900,
    oldPrice: 1100,
    image: [
      "etc/rassadoposadochnaja-mashina-d-pol-chetirjohrjadnaja-11-800x600.jpg",
    ],
    category: "Посадочные машины",
    description: createDescription([
      { label: "Тип", value: "рассадопосадочная машина" },
      {
        label: "Назначение",
        value: "высадка рассады овощных и других культур",
      },
      { label: "Конструкция", value: "навесная" },
      {
        label: "Применение",
        value: "для фермерских и сельскохозяйственных хозяйств",
      },
      {
        label: "Совместимость",
        value: "работает с трактором через навесную систему",
      },
    ]),
  }),

  createEtcProduct({
    id: 406,
    name: "Картофелекопатель D-Pol, 1 ряд",
    price: 1500,
    oldPrice: 1700,
    image: ["etc/11.png"],
    category: "Картофелекопатели",
    description: createDescription([
      { label: "Количество рядов", value: "1" },
      { label: "Глубина копки", value: "до 25 см" },
      { label: "Ширина захвата", value: "600–650 мм" },
      { label: "Производительность", value: "до 0,2 га/ч" },
      { label: "Рабочая скорость", value: "2–5 км/ч" },
      { label: "Агрегатируется с тракторами", value: "от 18 л.с." },
    ]),
  }),

  createEtcProduct({
    id: 407,
    name: "Картофелесажалка D-Pol 180 л",
    price: 1000,
    oldPrice: 1200,
    image: ["etc/wer1.png"],
    category: "Картофелесажалки",
    description: createDescription([
      { label: "Объём бункера", value: "180 л" },
      { label: "Ширина междурядья", value: "55–75 см" },
      { label: "Глубина посадки клубней", value: "5–12 см" },
      { label: "Производительность", value: "до 0,4 га/ч" },
      { label: "Рабочая скорость", value: "2–5 км/ч" },
    ]),
  }),

  createEtcProduct({
    id: 408,
    name: "Картофелесажалка D-Pol 300 л",
    price: 1200,
    oldPrice: 1400,
    image: ["etc/wer1.png"],
    category: "Картофелесажалки",
    description: createDescription([
      { label: "Объём бункера", value: "300 л" },
      { label: "Ширина междурядья", value: "55–75 см" },
      { label: "Глубина посадки клубней", value: "5–12 см" },
      { label: "Производительность", value: "до 0,4 га/ч" },
      { label: "Рабочая скорость", value: "2–5 км/ч" },
    ]),
  }),

  createEtcProduct({
    id: 409,
    name: "Ботвоудалитель навесной D-Pol",
    price: 230,
    oldPrice: 250,
    image: ["etc/remove-bg.ai_1721812357203.png"],
    category: "Ботвоудалители",
    description: createDescription([
      { label: "Ширина захвата", value: "1,2–1,5 м" },
      { label: "Производительность", value: "до 0,5 га/ч" },
      { label: "Рабочая скорость", value: "3–6 км/ч" },
      { label: "Привод", value: "от ВОМ трактора" },
      { label: "Глубина работы", value: "до 5 см" },
      { label: "Агрегатируется с тракторами", value: "от 35 л.с." },
    ]),
  }),

  createEtcProduct({
    id: 410,
    name: "Плуг тракторный Lisicki 019",
    price: 3400,
    oldPrice: 3600,
    image: ["etc/bezyimyannyij-2.png", "etc/peg2x.png"],
    category: "Плуги",
    description: createDescription([
      { label: "Количество корпусов", value: "3" },
      { label: "Ширина захвата одного корпуса", value: "35 см" },
      { label: "Общая ширина захвата", value: "105 см" },
      { label: "Глубина вспашки", value: "до 27 см" },
      { label: "Рабочая скорость", value: "7–9 км/ч" },
      { label: "Производительность", value: "0,73–0,94 га/ч" },
    ]),
  }),

  createEtcProduct({
    id: 411,
    name: "Плуг тракторный Lisicki 020",
    price: 7000,
    oldPrice: 7500,
    image: ["etc/peg2x.png", "etc/bezyimyannyij-2.png"],
    category: "Плуги",
    description: createDescription([
      { label: "Количество корпусов", value: "2" },
      { label: "Общая ширина захвата", value: "40–45 см" },
      { label: "Ширина захвата одного корпуса", value: "20 см" },
      { label: "Глубина вспашки", value: "25–30 см" },
      { label: "Угол наклона лемеха", value: "30°" },
    ]),
  }),

  createEtcProduct({
    id: 412,
    name: "Плуг тракторный Lisicki 020 Pro",
    price: 8500,
    oldPrice: 9000,
    image: ["etc/peg2x.png", "etc/bezyimyannyij-2.png"],
    category: "Плуги",
    description: createDescription([
      { label: "Количество корпусов", value: "2" },
      { label: "Ширина захвата одного корпуса", value: "200 мм" },
      { label: "Общая ширина захвата", value: "400 мм" },
      { label: "Глубина вспашки", value: "до 200 мм" },
      { label: "Высота стойки", value: "540 мм" },
      { label: "Масса", value: "61 кг" },
      { label: "Габариты (Д×Ш×В)", value: "1120 × 520 × 920 мм" },
    ]),
  }),

  createEtcProduct({
    id: 413,
    name: "РУМ D-Pol 800 л",
    price: 1400,
    oldPrice: 1500,
    image: [
      "etc/fertilizer-application-equipment-mounted-fertilizer-spreader-D-Pol-rum-800---1764633052537402032_big--25120201505250468200.jpg",
      "etc/fertilizer-application-equipment-mounted-fertilizer-spreader-D-Pol-rum-1200---1764759735904941134_common--25120313021585708200.jpg",
    ],
    category: "Разбрасыватели удобрений",
    description: createDescription([
      { label: "Объём бункера", value: "800 л" },
      { label: "Рабочая ширина захвата", value: "до 24 м" },
      { label: "Количество лопаток на каждом диске", value: "4" },
      { label: "Количество разбрасывающих дисков", value: "2" },
      { label: "Диаметр дисков", value: "445 мм" },
      { label: "Масса", value: "238 кг" },
      { label: "Габаритные размеры (Д×Ш×В)", value: "1130 × 1500 × 1270 мм" },
      { label: "Рабочая скорость", value: "до 13 км/ч" },
    ]),
  }),

  createEtcProduct({
    id: 414,
    name: "РУМ D-Pol 800 л усиленный",
    price: 1800,
    oldPrice: 1900,
    image: [
      "etc/fertilizer-application-equipment-mounted-fertilizer-spreader-D-Pol-rum-800---1764633052537402032_big--25120201505250468200.jpg",
      "etc/fertilizer-application-equipment-mounted-fertilizer-spreader-D-Pol-rum-1200---1764759735904941134_common--25120313021585708200.jpg",
    ],
    category: "Разбрасыватели удобрений",
    description: createDescription([
      { label: "Объём бункера", value: "800 л" },
      { label: "Рабочая ширина захвата", value: "до 24 м" },
      { label: "Количество лопаток на каждом диске", value: "4" },
      { label: "Количество разбрасывающих дисков", value: "2" },
      { label: "Диаметр дисков", value: "445 мм" },
      { label: "Масса", value: "238 кг" },
      { label: "Габаритные размеры (Д×Ш×В)", value: "1130 × 1500 × 1270 мм" },
      { label: "Рабочая скорость", value: "до 13 км/ч" },
    ]),
  }),

  createEtcProduct({
    id: 415,
    name: "РУМ D-Pol 1000 л",
    price: 1600,
    oldPrice: 1700,
    image: [
      "etc/fertilizer-application-equipment-mounted-fertilizer-spreader-D-Pol-rum-800---1764633052537402032_big--25120201505250468200.jpg",
      "etc/fertilizer-application-equipment-mounted-fertilizer-spreader-D-Pol-rum-1200---1764759735904941134_common--25120313021585708200.jpg",
    ],
    category: "Разбрасыватели удобрений",
    description: createDescription([
      { label: "Объём бункера", value: "1000 л" },
      { label: "Рабочая ширина захвата", value: "12–24 м" },
      { label: "Количество лопаток на каждом диске", value: "4" },
      { label: "Количество разбрасывающих дисков", value: "2" },
      { label: "Диаметр дисков", value: "445 мм" },
      { label: "Масса", value: "250 кг" },
      { label: "Габаритные размеры (Д×Ш×В)", value: "1130 × 1500 × 1270 мм" },
      { label: "Рабочая скорость", value: "до 13 км/ч" },
    ]),
  }),

  createEtcProduct({
    id: 416,
    name: "РУМ D-Pol 2200 л Profi",
    price: 2500,
    oldPrice: 2600,
    image: [
      "etc/fertilizer-application-equipment-mounted-fertilizer-spreader-D-Pol-rum-800---1764633052537402032_big--25120201505250468200.jpg",
      "etc/fertilizer-application-equipment-mounted-fertilizer-spreader-D-Pol-rum-1200---1764759735904941134_common--25120313021585708200.jpg",
    ],
    category: "Разбрасыватели удобрений",
    description: createDescription([
      { label: "Объём бункера", value: "2200 л" },
      { label: "Диаметр дисков", value: "445 мм" },
      { label: "Тип дозатора", value: "щелевой" },
      { label: "Количество лопаток на каждом диске", value: "2" },
      { label: "Ширина обработки", value: "16–34 м" },
      { label: "Привод", value: "от ВОМ" },
    ]),
  }),

  createEtcProduct({
    id: 417,
    name: "РУМ Lisicki 1000 кг",
    price: 1700,
    oldPrice: 1800,
    image: ["etc/terca.png"],
    category: "Разбрасыватели удобрений",
    description: createDescription([
      { label: "Количество дисков", value: "2" },
      { label: "Диаметр дисков", value: "650 мм" },
      { label: "Ёмкость бункера", value: "1000 кг" },
      { label: "Тип машины", value: "навесной" },
      { label: "Рабочая ширина внесения", value: "15–24 м" },
      {
        label: "Привод рабочих органов",
        value: "механический от вала отбора мощности (ВОМ) трактора",
      },
      { label: "Необходимая мощность трактора", value: "от 80 л.с." },
    ]),
  }),

  createEtcProduct({
    id: 418,
    name: "РУМ Lisicki 3000 кг",
    price: 10000,
    oldPrice: 11000,
    image: ["etc/terca.png"],
    category: "Разбрасыватели удобрений",
    description: createDescription([
      { label: "Количество дисков", value: "2" },
      { label: "Диаметр дисков", value: "650 мм" },
      { label: "Ёмкость бункера", value: "3000 кг" },
      { label: "Тип машины", value: "навесной" },
      { label: "Рабочая ширина внесения", value: "15–24 м" },
      {
        label: "Привод рабочих органов",
        value: "механический от вала отбора мощности (ВОМ) трактора",
      },
      { label: "Необходимая мощность трактора", value: "от 80 л.с." },
    ]),
  }),

  createEtcProduct({
    id: 419,
    name: "Окучник D-Pol, 3 ряда",
    price: 480,
    oldPrice: 500,
    image: ["etc/074_original.jpg"],
    category: "Окучники",
    description: createDescription([
      { label: "Количество рядов", value: "3" },
      { label: "Ширина междурядий", value: "60–75 см (регулируемая)" },
      { label: "Глубина обработки", value: "до 15 см" },
      { label: "Рабочая скорость", value: "3–7 км/ч" },
      { label: "Производительность", value: "до 0,6 га/ч" },
    ]),
  }),

  createEtcProduct({
    id: 420,
    name: "Борона дисковая М-Агро БДФ-2,4",
    price: 1850000,
    oldPrice: 2000000,
    image: ["etc/727_original.jpg"],
    category: "Дисковые бороны",
    description: createDescription([
      { label: "Модель", value: "БДФ-2,4" },
      { label: "Тип", value: "дисковая борона" },
      { label: "Производитель", value: "М-Агро" },
    ]),
    currency: "KZT",
  }),

  createEtcProduct({
    id: 421,
    name: "Борона дисковая М-Агро модернизированная БДМ-2,5",
    price: 1750000,
    oldPrice: 1900000,
    image: ["etc/727_original.jpg"],
    category: "Дисковые бороны",
    description: createDescription([
      { label: "Ширина захвата", value: "2,5 м" },
      { label: "Рабочая скорость", value: "8–12 км/ч" },
      { label: "Глубина обработки", value: "до 18 см" },
      { label: "Производительность", value: "до 2,0 га/ч" },
      { label: "Количество дисков", value: "20 шт." },
      { label: "Диаметр дисков", value: "560 мм" },
      { label: "Агрегатируется с тракторами", value: "от 80 л.с." },
    ]),
    currency: "KZT",
  }),

  createEtcProduct({
    id: 422,
    name: "Борона дисковая М-Агро БДФ-3,1",
    price: 2200000,
    oldPrice: 2400000,
    image: ["etc/727_original.jpg"],
    category: "Дисковые бороны",
    currency: "KZT",
    description: createDescription([
      { label: "Рабочая ширина захвата", value: "3,1 м" },
      { label: "Диаметр дисков", value: "650 мм" },
      { label: "Количество дисков", value: "18" },
      { label: "Глубина обработки", value: "8–18 см" },
      { label: "Рабочая скорость", value: "8–12 км/ч" },
      { label: "Необходимая мощность трактора", value: "110 л.с." },
    ]),
  }),

  createEtcProduct({
    id: 423,
    name: "Борона дисковая М-Агро БДФП-3,1",
    price: 2900000,
    oldPrice: 3100000,
    image: ["etc/727_original.jpg"],
    category: "Дисковые бороны",
    currency: "KZT",
    description: createDescription([
      { label: "Рабочая ширина захвата", value: "3,1 м" },
      { label: "Диаметр дисков", value: "650 мм" },
      { label: "Глубина обработки", value: "8–18 см" },
      { label: "Количество дисков", value: "18" },
      { label: "Рабочая скорость", value: "8–12 км/ч" },
      { label: "Необходимая мощность трактора", value: "110 л.с." },
    ]),
  }),

  createEtcProduct({
    id: 424,
    name: "Борона дисковая навесная М-Агро Диск (Евродиск) 2,4",
    price: 1850000,
    oldPrice: 1900000,
    image: ["etc/727_original.jpg"],
    category: "Дисковые бороны",
    currency: "KZT",
    description: createDescription([
      { label: "Рабочая ширина захвата", value: "2,4 м" },
      { label: "Диаметр дисков", value: "650 мм" },
      { label: "Глубина обработки", value: "8–18 см" },
      { label: "Рабочая скорость", value: "8–12 км/ч" },
      { label: "Количество дисков", value: "16" },
      { label: "Необходимая мощность трактора", value: "80 л.с." },
    ]),
  }),

  createEtcProduct({
    id: 425,
    name: "Борона дисковая навесная М-Агро БДНМ-2,4",
    price: 1850000,
    oldPrice: 1900000,
    image: ["etc/727_original.jpg"],
    category: "Дисковые бороны",
    currency: "KZT",
    description: createDescription([
      { label: "Рабочая ширина захвата", value: "2,5 м" },
      { label: "Диаметр дисков", value: "640–660 мм" },
      { label: "Глубина обработки", value: "8–20 см" },
      { label: "Рабочая скорость", value: "8–10 км/ч" },
      { label: "Количество дисков", value: "14" },
      {
        label: "Необходимый класс трактора",
        value: "класс 1,4 (например, МТЗ-80/82, ЮМЗ-80/82)",
      },
    ]),
  }),

  createEtcProduct({
    id: 426,
    name: "ГВН D-Pol 4-колесный",
    price: 410,
    oldPrice: 450,
    image: ["etc/7740383877632433.webp"],
    category: "Грабли-ворошилки",
    description: createDescription([
      { label: "Рабочая ширина ворошения", value: "2,3 м" },
      { label: "Рабочая ширина сгребания", value: "1,5 м" },
      { label: "Производительность при сгребании", value: "0,9–1,1 га/ч" },
      { label: "Производительность при ворошении", value: "1,4–2,5 га/ч" },
      { label: "Рекомендуемая скорость ворошения", value: "6–12 км/ч" },
      { label: "Рекомендуемая скорость сгребания", value: "6–8,5 км/ч" },
    ]),
  }),

  createEtcProduct({
    id: 427,
    name: "ГВН D-Pol 5-колесный",
    price: 460,
    oldPrice: 510,
    image: ["etc/7740383877632433.webp"],
    category: "Грабли-ворошилки",
    description: createDescription([
      { label: "Рабочая ширина ворошения", value: "3,2 м" },
      { label: "Рабочая ширина сгребания", value: "2,9 м" },
      { label: "Производительность при сгребании", value: "1,7–2,2 га/ч" },
      { label: "Производительность при ворошении", value: "1,9–3,5 га/ч" },
      { label: "Рекомендуемая скорость ворошения", value: "6,0–12,0 км/ч" },
      { label: "Рекомендуемая скорость сгребания", value: "6,0–8,5 км/ч" },
    ]),
  }),

  createEtcProduct({
    id: 428,
    name: "ГВН OGR М-Агро 4-колесный 2,6 м",
    price: 300000,
    oldPrice: 330000,
    image: ["etc/7740383877632433.webp"],
    category: "Грабли-ворошилки",
    currency: "KZT",
    description: createDescription([
      { label: "Тип", value: "грабли-ворошилки навесные (ГВН)" },
      { label: "Производитель", value: "М-Агро" },
      { label: "Модель", value: "OGR" },
      { label: "Количество колёс", value: "4" },
      { label: "Ширина захвата", value: "2,6 м" },
      {
        label: "Тип агрегатирования",
        value: "навесной, к тракторам средней тяговой категории",
      },
    ]),
  }),

  createEtcProduct({
    id: 429,
    name: "ГВН OGR М-Агро 5-колесный 3,3 м",
    price: 400000,
    oldPrice: 450000,
    image: ["etc/current1475132881128.jpg"],
    category: "Грабли-ворошилки",
    currency: "KZT",
    description: createDescription([
      { label: "Количество рабочих колёс", value: "5" },
      { label: "Ширина захвата", value: "3,3 м" },
      { label: "Рабочая скорость", value: "10–15 км/ч" },
      { label: "Производительность", value: "до 3 га/ч" },
      { label: "Диаметр рабочих колёс", value: "1400 мм" },
      { label: "Агрегатируется с тракторами", value: "от 20 л.с." },
    ]),
  }),

  createEtcProduct({
    id: 430,
    name: "ГВН OGR М-Агро 8-колесный 6,3 м",
    price: 750000,
    oldPrice: 800000,
    image: ["etc/unnamed.jpg"],
    category: "Грабли-ворошилки",
    currency: "KZT",
    description: createDescription([
      { label: "Количество рабочих колёс", value: "8" },
      { label: "Ширина захвата", value: "6,3 м" },
      { label: "Рабочая скорость", value: "10–15 км/ч" },
      { label: "Производительность", value: "до 3 га/ч" },
      { label: "Диаметр рабочих колёс", value: "1400 мм" },
      { label: "Агрегатируется с тракторами", value: "от 20 л.с." },
    ]),
  }),

  createEtcProduct({
    id: 431,
    name: "Погрузчик навесной фронтальный М-Агро УПН-0,8",
    price: 950000,
    oldPrice: 1000000,
    image: ["etc/BZ_Robust_061_PhysCam13_w-350x346.jpg"],
    category: "Фронтальные погрузчики",
    currency: "KZT",
    description: createDescription([
      { label: "Грузоподъёмность", value: "800 кг" },
      { label: "Объём ковша", value: "0,4–0,6 м³" },
      { label: "Высота подъёма", value: "до 3,5 м" },
      {
        label: "Ширина ковша",
        value: "1,6–2,0 м (в зависимости от комплектации)",
      },
      { label: "Рабочее давление в гидросистеме", value: "16–20 МПа" },
      { label: "Совместимость", value: "тракторы от 40 л.с." },
    ]),
  }),

  createEtcProduct({
    id: 432,
    name: "Ковш 0,8 м³ М-Агро УПН-0,8",
    price: 300000,
    oldPrice: 350000,
    image: ["etc/147_original.jpg"],
    category: "Навесное оборудование для погрузчиков",
    currency: "KZT",
    description: createDescription([
      { label: "Объём", value: "0,8 м³" },
      { label: "Ширина", value: "1,8–2,0 м (в зависимости от модели)" },
      { label: "Материал", value: "высокопрочная сталь" },
      { label: "Тип крепления", value: "совместим с М-Агро УПН-0,8" },
      { label: "Рабочая нагрузка", value: "до 800 кг" },
    ]),
  }),

  createEtcProduct({
    id: 433,
    name: "Вилы для сена М-Агро УПН-0,8",
    price: 350000,
    oldPrice: 400000,
    image: ["etc/qertyw1.png"],
    category: "Навесное оборудование для погрузчиков",
    currency: "KZT",
    description: createDescription([
      { label: "Рабочая ширина", value: "1,2–1,8 м (в зависимости от модели)" },
      { label: "Количество зубьев", value: "5–8 шт." },
      { label: "Материал зубьев", value: "закалённая сталь" },
      { label: "Грузоподъёмность", value: "до 800 кг" },
      { label: "Совместимость", value: "фронтальный погрузчик М-Агро УПН-0,8" },
    ]),
  }),
];
