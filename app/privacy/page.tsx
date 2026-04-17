import type { Metadata } from "next";
import { createPageTitle } from "@/constants/site-metadata";

export const metadata: Metadata = {
  title: createPageTitle("Политика конфиденциальности"),
  description:
    "Информация о том, какие данные может обрабатывать Agro Business и как они защищаются.",
  alternates: {
    canonical: "/privacy",
  },
};

const UPDATED_AT = "31 марта 2026";

const overviewCards = [
  {
    label: "Оператор данных",
    value: "Agro Business Astana",
    description: "Сайт и обращения пользователей обрабатываются от имени компании.",
  },
  {
    label: "Юрисдикция",
    value: "Казахстан",
    description: "Политика применяется к использованию сайта и связанным обращениям.",
  },
  {
    label: "Последнее обновление",
    value: UPDATED_AT,
    description: "Мы обновляем политику при изменении процессов или требований.",
  },
  {
    label: "Контакты",
    value: "Эл. почта и телефон",
    description: "По вопросам персональных данных можно связаться с нами напрямую.",
  },
];

const policySections = [
  {
    eyebrow: "01 / Общие положения",
    title: "Как мы понимаем эту политику",
    description:
      "Настоящая политика конфиденциальности описывает, какие данные могут собираться при использовании сайта Agro Business, зачем они нужны и как мы с ними работаем.",
    items: [
      "Политика распространяется на просмотр сайта, поиск по каталогу, отправку заявок и иные обращения через доступные формы связи.",
      "Используя сайт, вы подтверждаете, что ознакомились с этим документом и понимаете общие принципы обработки информации.",
      "Мы стараемся собирать только те данные, которые действительно нужны для связи, поддержки, безопасности сайта и улучшения сервиса.",
    ],
  },
  {
    eyebrow: "02 / Состав данных",
    title: "Какие данные мы можем получать",
    description:
      "В зависимости от того, как вы взаимодействуете с сайтом, мы можем обрабатывать разные категории данных.",
    items: [
      "Контактные данные: имя, номер телефона, адрес электронной почты и содержание сообщения, если вы сами отправляете нам заявку или обращение.",
      "Технические данные: IP-адрес, тип устройства, браузер, язык интерфейса, дата и время посещения, а также базовые журналы доступа.",
      "Поведенческие данные: страницы, которые вы открываете, поисковые запросы по каталогу, длительность сессии и взаимодействие с отдельными разделами сайта.",
      "Файлы cookie и похожие технологии: они помогают поддерживать работу сайта, сохранять пользовательские настройки и анализировать общую нагрузку.",
    ],
  },
  {
    eyebrow: "03 / Цели обработки",
    title: "Зачем мы используем информацию",
    description:
      "Обработка данных нужна не сама по себе, а для конкретных и понятных задач.",
    items: [
      "Чтобы отвечать на ваши запросы, связываться по вопросам техники, каталога, наличия, цен и условий сотрудничества.",
      "Чтобы поддерживать стабильную работу сайта, отслеживать ошибки, защищать ресурс от злоупотреблений и повышать общую безопасность.",
      "Чтобы улучшать каталог, поиск, навигацию и структуру контента на основе обезличенной статистики и пользовательских сценариев.",
      "Чтобы при необходимости выполнять требования закона, защищать законные интересы компании и вести внутренний учет обращений.",
    ],
  },
  {
    eyebrow: "04 / Файлы cookie",
    title: "Как мы используем cookie-файлы",
    description:
      "Cookie-файлы помогают сайту работать корректно и делают использование удобнее.",
    items: [
      "Необходимые cookie-файлы используются для базовой функциональности сайта, стабильной навигации и технической доступности страниц.",
      "Аналитические cookie-файлы могут применяться для понимания того, какие страницы и функции действительно полезны пользователям.",
      "Если законодательство требует отдельного согласия на необязательные cookie-файлы, такие инструменты должны использоваться только после его получения.",
      "Вы можете ограничить или отключить cookie-файлы в настройках браузера, но в этом случае часть функций сайта может работать хуже.",
    ],
  },
  {
    eyebrow: "05 / Передача и защита",
    title: "Кому данные могут передаваться и как они защищаются",
    description:
      "Мы не продаем персональные данные и не раскрываем их без необходимости.",
    items: [
      "Доступ к информации могут получать только сотрудники и подрядчики, которым это действительно нужно для обработки обращения, поддержки сайта или технического сопровождения.",
      "В отдельных случаях данные могут передаваться сервисам хостинга, аналитики, связи или иным поставщикам инфраструктуры, если это необходимо для работы сайта.",
      "Информация может быть раскрыта по требованию закона, суда, государственного органа или для защиты прав и безопасности компании и пользователей.",
      "Мы применяем организационные и технические меры защиты, однако ни один способ хранения или передачи данных через интернет не гарантирует абсолютную безопасность.",
    ],
  },
  {
    eyebrow: "06 / Сроки хранения",
    title: "Как долго мы храним информацию",
    description:
      "Срок хранения зависит от цели обработки и юридических обязанностей.",
    items: [
      "Обращения пользователей, переписка и контактные данные могут храниться столько, сколько требуется для ответа, сопровождения запроса и последующего взаимодействия.",
      "Технические журналы и аналитические данные обычно хранятся ограниченный период, как правило до 24 месяцев, если более длительное хранение не требуется по закону или для безопасности.",
      "Когда данные больше не нужны, мы удаляем их, обезличиваем или переводим в архивный режим с ограниченным доступом.",
    ],
  },
  {
    eyebrow: "07 / Права пользователя",
    title: "Какие права у вас есть",
    description:
      "Если ваши данные обрабатываются через сайт или связанные обращения, вы можете обратиться к нам с запросом.",
    items: [
      "Вы можете запросить сведения о том, какие данные о вас у нас есть и для каких целей они используются.",
      "Вы можете попросить исправить неточные данные, удалить лишнюю информацию или ограничить ее использование, если это допускается законом.",
      "Вы можете отозвать согласие на обработку там, где обработка строится именно на согласии.",
      "Вы можете отказаться от части коммуникаций, если больше не хотите получать сообщения информационного или маркетингового характера.",
    ],
  },
  {
    eyebrow: "08 / Дополнительно",
    title: "Дети, внешние ссылки и обновления политики",
    description:
      "Некоторые дополнительные положения помогают точнее понимать границы этой политики.",
    items: [
      "Сайт не предназначен для самостоятельного использования детьми младше 16 лет, и мы не стремимся целенаправленно собирать их персональные данные.",
      "На сайте могут встречаться ссылки на сторонние ресурсы. Мы не контролируем их содержание и рекомендуем отдельно знакомиться с их собственными политиками конфиденциальности.",
      "Мы можем обновлять этот документ при изменении функциональности сайта, внутренних процессов или применимых требований. Актуальная редакция всегда публикуется на этой странице.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fcfaf7] text-[#1f1814]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-[#4b2a23]/10" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#4b2a23]/8 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#c97c50]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <section className="w-full rounded-[2rem] border border-[#4b2a23]/10 bg-white/88 p-6 text-center shadow-[0_24px_80px_rgba(75,42,35,0.08)] backdrop-blur-sm sm:p-8 lg:p-12">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#4b2a23]/55">
              Конфиденциальность и защита данных
            </p>
            <h1 className="mt-4 font-[var(--font-display)] text-[2.2rem] leading-[0.95] tracking-[-0.04em] text-[#1f1814] sm:text-[3.5rem] lg:text-[4.6rem]">
              Политика конфиденциальности
            </h1>
            <p className="mt-5 text-sm leading-7 text-[#5f514a] sm:text-base">
              Мы бережно относимся к данным пользователей и используем их только
              для понятных рабочих задач: связи, обработки обращений,
              поддержки сайта и улучшения сервиса Agro Business.
            </p>

            <div className="mt-6 inline-flex items-center justify-center rounded-full border border-[#4b2a23]/10 bg-[#fcfaf7] px-5 py-2 text-[12px] font-medium uppercase tracking-[0.22em] text-[#4b2a23]/65">
              Актуально на {UPDATED_AT}
            </div>
          </div>
        </section>

        <section className="mt-6 grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((card) => (
            <article
              key={card.label}
              className="rounded-[1.6rem] border border-[#4b2a23]/10 bg-white/85 p-5 text-center shadow-[0_16px_40px_rgba(75,42,35,0.06)]"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#4b2a23]/45">
                {card.label}
              </p>
              <h2 className="mt-3 text-lg font-semibold text-[#1f1814]">
                {card.value}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#62544d]">
                {card.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 w-full space-y-5">
          {policySections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.9rem] border border-[#4b2a23]/10 bg-white/90 p-6 shadow-[0_18px_48px_rgba(75,42,35,0.06)] sm:p-8"
            >
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#4b2a23]/45">
                  {section.eyebrow}
                </p>
                <h2 className="mt-3 font-[var(--font-display)] text-[2rem] leading-tight tracking-[-0.03em] text-[#1f1814] sm:text-[2.4rem]">
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#5f514a] sm:text-base">
                  {section.description}
                </p>
              </div>

              <ul className="mx-auto mt-6 grid max-w-3xl gap-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-[1.2rem] border border-[#4b2a23]/8 bg-[#fcfaf7] px-4 py-4 text-left"
                  >
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#4b2a23]" />
                    <span className="text-sm leading-7 text-[#3f312c] sm:text-[15px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mt-8 w-full rounded-[2rem] border border-[#4b2a23]/10 bg-[#1f1814] px-6 py-8 text-center text-white shadow-[0_24px_80px_rgba(31,24,20,0.18)] sm:px-8 sm:py-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/55">
              Связаться с нами
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-[2.1rem] leading-tight tracking-[-0.03em] sm:text-[2.8rem]">
              Если у вас есть вопросы по обработке данных
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              Напишите нам или позвоните. Мы постараемся ответить на запросы,
              связанные с персональными данными, в разумный срок.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:rnadir2006@gmail.com"
                className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/12 bg-white/8 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/14"
              >
                rnadir2006@gmail.com
              </a>
              <a
                href="tel:+77479099012"
                className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-[#c97c50]/30 bg-[#c97c50]/14 px-5 py-3 text-sm font-medium text-white transition hover:bg-[#c97c50]/22"
              >
                +7 747 909 90 12
              </a>
            </div>

            <div className="mt-6 space-y-2 text-sm leading-6 text-white/60">
              <p>Agro Business Astana</p>
              <p>Акмолинская область, Астана, улица Пушкина, 58</p>
              <a
                href="https://agrobusiness.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white/80 transition hover:text-white"
              >
                agrobusiness.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
