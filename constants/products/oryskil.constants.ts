import { Products } from "@/types/products.types";

const DEFAULT_CURRENCY = "EUR";

const OPRYSKIL_IMAGE_1 = "opryskil/opryskiwacz-polowy-tyl.png";
const OPRYSKIL_IMAGE_2 = "opryskil/85164851658782.jpg";
const OPRYSKIL_IMAGE_3 = "opryskil/85264218587166.jpg";

const OPRYSKIL_CATEGORY = "Опрыскиватели";

const createDescription = (items: { label: string; value: string }[]) => {
  return `### Характеристики

${items.map((item) => `- **${item.label}:** ${item.value}`).join("\n")}`;
};

const createOpryskilProduct = ({
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
  image: [OPRYSKIL_IMAGE_1, OPRYSKIL_IMAGE_2, OPRYSKIL_IMAGE_3],
  category: OPRYSKIL_CATEGORY,
  description,
});

export const opryskilProducts: Products[] = [
  createOpryskilProduct({
    id: 301,
    name: "Опрыскиватель Lisicki 400 /12/3",
    price: 1475,
    oldPrice: 1550,
    description: createDescription([
      { label: "Ёмкость бака", value: "400 л" },
      { label: "Рабочая ширина", value: "12 м" },
      { label: "Габариты", value: "1080 × 2700 × 1510 мм" },
      { label: "Производительность насоса", value: "100 л/мин" },
      { label: "Вес", value: "145 кг" },
    ]),
  }),

  createOpryskilProduct({
    id: 302,
    name: "Опрыскиватель Lisicki 600 /12/3",
    price: 1545,
    oldPrice: 1620,
    description: createDescription([
      { label: "Ёмкость бака", value: "600 л" },
      { label: "Рабочая ширина", value: "12 м" },
      { label: "Габариты", value: "1180 × 2700 × 1510 мм" },
      { label: "Производительность насоса", value: "100 л/мин" },
      { label: "Вес", value: "174 кг" },
    ]),
  }),

  createOpryskilProduct({
    id: 303,
    name: "Опрыскиватель Lisicki 800 /12/3",
    price: 2590,
    oldPrice: 2700,
    description: createDescription([
      { label: "Ёмкость бака", value: "800 л" },
      { label: "Рабочая ширина", value: "12 м" },
      { label: "Габариты", value: "1230 × 2700 × 1510 мм" },
      { label: "Производительность насоса", value: "100 л/мин" },
      { label: "Вес", value: "201 кг" },
    ]),
  }),

  createOpryskilProduct({
    id: 304,
    name: "Опрыскиватель Lisicki 800 /12/3 с Гидро",
    price: 3100,
    oldPrice: 3200,
    description: createDescription([
      { label: "Ёмкость бака", value: "800 л" },
      { label: "Рабочая ширина", value: "12 м" },
      { label: "Габариты", value: "1230 × 2700 × 1510 мм" },
      { label: "Производительность насоса", value: "100 л/мин" },
      { label: "Вес", value: "201 кг" },
    ]),
  }),

  createOpryskilProduct({
    id: 305,
    name: "Опрыскиватель Lisicki 1000 /12/3",
    price: 3100,
    oldPrice: 3200,
    description: createDescription([
      { label: "Ёмкость бака", value: "1000 л" },
      { label: "Рабочая ширина", value: "12 м" },
      { label: "Габариты", value: "1230 × 2700 × 1510 мм" },
      { label: "Производительность насоса", value: "100 л/мин" },
      { label: "Вес", value: "201 кг" },
    ]),
  }),

  createOpryskilProduct({
    id: 306,
    name: "Опрыскиватель Lisicki 1000 /12/3 с Гидро",
    price: 3200,
    oldPrice: 3300,
    description: createDescription([
      { label: "Ёмкость бака", value: "1000 л" },
      { label: "Рабочая ширина", value: "12 м" },
      { label: "Габариты", value: "1480 × 2450 × 2350 мм" },
      { label: "Производительность насоса", value: "100 л/мин" },
      { label: "Вес", value: "330 кг" },
    ]),
  }),

  createOpryskilProduct({
    id: 307,
    name: "Опрыскиватель Lisicki 1200 /12/3",
    price: 2890,
    oldPrice: 2990,
    description: createDescription([
      { label: "Ёмкость бака", value: "1200 л" },
      { label: "Рабочая ширина", value: "12 м" },
      { label: "Габариты", value: "1480 × 2450 × 2350 мм" },
      { label: "Производительность насоса", value: "100 л/мин" },
      { label: "Вес", value: "350 кг" },
    ]),
  }),
];
