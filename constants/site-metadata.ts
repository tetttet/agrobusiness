export const SITE_URL = "https://agrobusiness.com";
export const SITE_NAME = "Agro Business";
export const COMPANY_NAME = "Agro Business Astana";

export const DEFAULT_DESCRIPTION =
  "Agro Business Astana — сельхозтехника, навесное оборудование и прямые поставки для современных хозяйств Казахстана.";

export const HOME_DESCRIPTION =
  "Agro Business Astana подбирает сельхозтехнику и навесное оборудование под реальные задачи хозяйства: прямые поставки, каталог моделей и уверенный выбор для работы в поле.";

export const ABOUT_DESCRIPTION =
  "Agro Business Astana работает для аграрного сектора Казахстана и соседних рынков: расширяет дилерскую сеть, подбирает технику под задачи хозяйства и делает выбор оборудования спокойным и понятным.";

export const CATALOG_DESCRIPTION =
  "Каталог Agro Business: косилки, опрыскиватели, дисковые бороны, карданы и другое сельхозоборудование с поставкой по Казахстану.";

export const SOCIAL_IMAGE_ALT =
  "Agro Business — сельхозтехника и агрооборудование для современных хозяйств";

export const DEFAULT_KEYWORDS = [
  "Agro Business",
  "Agro Business Astana",
  "сельхозтехника",
  "агрооборудование",
  "навесное оборудование",
  "сельскохозяйственная техника",
  "техника для хозяйства",
  "агробизнес Казахстан",
  "Астана",
  "Казахстан",
  "косилки",
  "опрыскиватели",
  "дисковые бороны",
  "кардан",
] as const;

export const createPageTitle = (title: string) => `${title} | ${SITE_NAME}`;
