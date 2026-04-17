import { Products } from "@/types/products.types";

const DEFAULT_CURRENCY = "EUR";

const DISCOVO_IMAGE_1 = "boron/3241.png";
const DISCOVO_IMAGE_2 =
  "boron/234138012_w640_h640_borona-diskovaya-navesnaya.webp";

const DISCOVO_CATEGORY = "Дисковые бороны";

const createDescription = (items: { label: string; value: string }[]) => {
  return `### Характеристики

${items.map((item) => `- **${item.label}:** ${item.value}`).join("\n")}`;
};

const createDiscovoProduct = ({
  id,
  name,
  price,
  oldPrice,
  description,
}: {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
}): Products => ({
  id,
  name,
  price,
  oldPrice,
  currency: DEFAULT_CURRENCY,
  image: [DISCOVO_IMAGE_1, DISCOVO_IMAGE_2],
  category: DISCOVO_CATEGORY,
  description,
});

export const discovProducts: Products[] = [
  createDiscovoProduct({
    id: 501,
    name: "Дисковая борона Lisicki 1,8 м",
    price: 3300,
    oldPrice: 3500,
    description: createDescription([
      { label: "Рабочая ширина", value: "1,8 м" },
      { label: "Глубина обработки", value: "8–18 см" },
      { label: "Диаметр дисков", value: "550 мм" },
      { label: "Количество дисков", value: "16" },
      { label: "Междисковое расстояние", value: "29 см" },
      { label: "Необходимая мощность трактора", value: "90–120 л.с." },
      { label: "Производительность", value: "1,8–2,6 га/ч" },
    ]),
  }),

  createDiscovoProduct({
    id: 502,
    name: "Дисковая борона Lisicki 2,2 м",
    price: 4100,
    oldPrice: 4300,
    description: createDescription([
      { label: "Рабочая ширина", value: "2,2 м" },
      { label: "Глубина обработки", value: "8–18 см" },
      { label: "Диаметр дисков", value: "560 мм" },
      { label: "Количество дисков", value: "20" },
      { label: "Междисковое расстояние", value: "29 см" },
      { label: "Необходимая мощность трактора", value: "100–130 л.с." },
      { label: "Производительность", value: "2,2–3,0 га/ч" },
    ]),
  }),

  createDiscovoProduct({
    id: 503,
    name: "Дисковая борона Lisicki 2,4 м",
    price: 4200,
    oldPrice: 4400,
    description: createDescription([
      { label: "Рабочая ширина", value: "2,4 м" },
      { label: "Глубина обработки", value: "8–18 см" },
      { label: "Диаметр дисков", value: "560 мм" },
      { label: "Количество дисков", value: "22" },
      { label: "Междисковое расстояние", value: "29 см" },
      { label: "Необходимая мощность трактора", value: "110–140 л.с." },
      { label: "Производительность", value: "2,4–3,2 га/ч" },
    ]),
  }),

  createDiscovoProduct({
    id: 504,
    name: "Дисковая борона Lisicki 2,5 м",
    price: 5700,
    oldPrice: 5900,
    description: createDescription([
      { label: "Рабочая ширина", value: "2,5 м" },
      { label: "Глубина обработки", value: "8–18 см" },
      { label: "Диаметр дисков", value: "560 мм" },
      { label: "Количество дисков", value: "24" },
      { label: "Междисковое расстояние", value: "29 см" },
      { label: "Необходимая мощность трактора", value: "120–150 л.с." },
      { label: "Производительность", value: "2,5–3,4 га/ч" },
    ]),
  }),

  createDiscovoProduct({
    id: 505,
    name: "Дисковая борона Lisicki 2,7 м",
    price: 5300,
    oldPrice: 5500,
    description: createDescription([
      { label: "Рабочая ширина", value: "2,7 м" },
      { label: "Глубина обработки", value: "8–18 см" },
      { label: "Диаметр дисков", value: "560 мм" },
      { label: "Количество дисков", value: "26" },
      { label: "Междисковое расстояние", value: "29 см" },
      { label: "Необходимая мощность трактора", value: "130–160 л.с." },
      { label: "Производительность", value: "2,7–3,6 га/ч" },
    ]),
  }),

  createDiscovoProduct({
    id: 506,
    name: "Дисковая борона Lisicki 3,0 м",
    price: 5600,
    oldPrice: 5800,
    description: createDescription([
      { label: "Рабочая ширина", value: "3,0 м" },
      { label: "Глубина обработки", value: "8–18 см" },
      { label: "Диаметр дисков", value: "560 мм" },
      { label: "Количество дисков", value: "28" },
      { label: "Междисковое расстояние", value: "29 см" },
      { label: "Необходимая мощность трактора", value: "140–180 л.с." },
      { label: "Производительность", value: "3,0–3,8 га/ч" },
    ]),
  }),

  createDiscovoProduct({
    id: 507,
    name: "Дисковая борона Lisicki 3,5 м",
    price: 7000,
    oldPrice: 7200,
    description: createDescription([
      { label: "Рабочая ширина", value: "3,5 м" },
      { label: "Глубина обработки", value: "8–18 см" },
      { label: "Диаметр дисков", value: "560 мм" },
      { label: "Количество дисков", value: "32" },
      { label: "Междисковое расстояние", value: "29 см" },
      { label: "Необходимая мощность трактора", value: "160–200 л.с." },
      { label: "Производительность", value: "3,5–4,2 га/ч" },
    ]),
  }),

  createDiscovoProduct({
    id: 508,
    name: "Дисковая борона Lisicki 6,0 м",
    price: 29000,
    oldPrice: 31000,
    description: createDescription([
      { label: "Рабочая ширина", value: "6,0 м" },
      { label: "Глубина обработки", value: "8–18 см" },
      { label: "Диаметр дисков", value: "560 мм" },
      { label: "Количество дисков", value: "48" },
      { label: "Междисковое расстояние", value: "29 см" },
      { label: "Необходимая мощность трактора", value: "250–300 л.с." },
      { label: "Производительность", value: "6,0–7,2 га/ч" },
    ]),
  }),
];
