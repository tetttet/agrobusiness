import { Products } from "@/types/products.types";

const DEFAULT_CURRENCY = "EUR";
const KOSYLKA_IMAGE_1 = "kosylka/kosiarka-rotacyjna.jpg";
const KOSYLKA_IMAGE_2 = "kosylka/6866376805.jpg";
const KOSYLKA_IMAGE_3 = "kosylka/kosarka-traktor-lisicki-1-85.1800x1200w.jpg";
const KOSYLKA_IMAGE_4 = "kosylka/item_image2741.jpg";
const KOSYLKA_CATEGORY = "Косилки";

const createDescription = (items: { label: string; value: string }[]) => {
  return `### Характеристики

${items.map((item) => `- **${item.label}:** ${item.value}`).join("\n")}`;
};

const createKosylkaProduct = ({
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
  image: [KOSYLKA_IMAGE_1, KOSYLKA_IMAGE_2, KOSYLKA_IMAGE_3, KOSYLKA_IMAGE_4],
  category: KOSYLKA_CATEGORY,
  description,
});

export const kosylkaProducts: Products[] = [
  createKosylkaProduct({
    id: 111,
    name: "Косилка роторная, 1.00",
    price: 840,
    oldPrice: 900,
    description: createDescription([
      { label: "Ширина захвата", value: "1 м" },
      { label: "Барабаны", value: "2 (по 3 ножа)" },
      { label: "Высота скашивания", value: "32–40 мм" },
      { label: "Мощность трактора", value: "от 8 л.с." },
      { label: "Обороты ВОМ", value: "540 об/мин" },
      { label: "Скорость", value: "до 10 км/ч" },
      { label: "Производительность", value: "до 0,65 га/ч" },
    ]),
  }),

  createKosylkaProduct({
    id: 112,
    name: "Косилка роторная, 1.35",
    price: 1225,
    oldPrice: 1350,
    description: createDescription([
      { label: "Ширина захвата", value: "1,35 м" },
      { label: "Высота среза", value: "32–42 мм" },
      { label: "Обороты ВОМ", value: "540 об/мин" },
      { label: "Барабаны", value: "2 (по 3 ножа)" },
      { label: "Мощность трактора", value: "от 24 л.с." },
      { label: "Производительность", value: "до 0,65 га/ч" },
      { label: "Скорость", value: "до 15 км/ч" },
    ]),
  }),

  createKosylkaProduct({
    id: 113,
    name: "Косилка роторная, 1.65",
    price: 1485,
    oldPrice: 1600,
    description: createDescription([
      { label: "Ширина захвата", value: "1,65 м" },
      { label: "Высота среза", value: "32–42 мм" },
      { label: "Обороты ВОМ", value: "540 об/мин" },
      { label: "Барабаны", value: "2 (по 3 ножа)" },
      { label: "Мощность трактора", value: "от 40 л.с." },
      { label: "Производительность", value: "до 1,5 га/ч" },
      { label: "Скорость", value: "до 15 км/ч" },
    ]),
  }),

  createKosylkaProduct({
    id: 114,
    name: "Косилка роторная, 1.85",
    price: 1900,
    oldPrice: 2000,
    description: createDescription([
      { label: "Ширина захвата", value: "1,85 м" },
      { label: "Высота среза", value: "32–42 мм" },
      { label: "Барабаны", value: "2 (по 3 ножа)" },
      { label: "Обороты ВОМ", value: "540 об/мин" },
      { label: "Мощность трактора", value: "от 40 л.с." },
      { label: "Производительность", value: "до 2,4 га/ч" },
      { label: "Скорость", value: "до 15 км/ч" },
    ]),
  }),

  createKosylkaProduct({
    id: 115,
    name: "Косилка роторная, 1.85 с гидроцилиндром",
    price: 2040,
    oldPrice: 2200,
    description: createDescription([
      { label: "Ширина захвата", value: "1,85 м" },
      { label: "Высота среза", value: "32–42 мм" },
      { label: "Барабаны", value: "2 (по 3 ножа)" },
      { label: "Обороты ВОМ", value: "540 об/мин" },
      { label: "Мощность трактора", value: "от 40 л.с." },
      { label: "Производительность", value: "до 2,4 га/ч" },
      { label: "Скорость", value: "до 15 км/ч" },
      { label: "Особенность", value: "гидроцилиндр" },
    ]),
  }),

  createKosylkaProduct({
    id: 116,
    name: "Косилка роторная, 2.1 с гидроцилиндром",
    price: 2900,
    oldPrice: 3000,
    description: createDescription([
      { label: "Ширина захвата", value: "2,1 м" },
      { label: "Количество ножей", value: "12" },
      { label: "Обороты ВОМ", value: "540 об/мин" },
      { label: "Мощность трактора", value: "от 45 л.с." },
      { label: "Скорость", value: "до 15 км/ч" },
      { label: "Особенность", value: "гидроцилиндр" },
    ]),
  }),

  createKosylkaProduct({
    id: 117,
    name: "Косилка роторная, 2.4 с гидроцилиндром",
    price: 3300,
    oldPrice: 3500,
    description: createDescription([
      { label: "Ширина захвата", value: "2,4 м" },
      { label: "Высота среза", value: "40–70 мм" },
      { label: "Обороты ВОМ", value: "540 об/мин" },
      { label: "Роторы", value: "4 (по 2 ножа)" },
      { label: "Мощность трактора", value: "от 45 л.с." },
      { label: "Скорость", value: "до 15 км/ч" },
      { label: "Особенность", value: "гидроцилиндр" },
    ]),
  }),
];
