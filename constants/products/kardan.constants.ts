import { Products } from "@/types/products.types";

const DEFAULT_CURRENCY = "EUR";

const KARDAN_IMAGE_2 = "kardan/kardan1.webp";
const KARDAN_IMAGE_1 = "kardan/karden2.png";

const KARDAN_CATEGORY = "Карданы";

const createDescription = (items: { label: string; value: string }[]) => {
  return `### Характеристики

${items.map((item) => `- **${item.label}:** ${item.value}`).join("\n")}`;
};

const createKardanProduct = ({
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
  image: [KARDAN_IMAGE_1, KARDAN_IMAGE_2],
  category: KARDAN_CATEGORY,
  description,
});

export const kardanProducts: Products[] = [
  createKardanProduct({
    id: 201,
    name: "Кардан Lisicki",
    price: 85,
    oldPrice: 100,
    description: createDescription([
      { label: "Тип", value: "карданный вал" },
      { label: "Длина", value: "от 600 до 1200 мм (в зависимости от модели)" },
      { label: "Диаметр трубы", value: "40–50 мм" },
      { label: "Тип со единения", value: "шлицевое" },
      { label: "Максимальная мощность", value: "до 100 л.с." },
      { label: "Материал", value: "высокопрочная сталь" },
    ]),
  }),
];
