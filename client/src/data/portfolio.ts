// Moving Paper Gallery: curated series and concise case studies turn individual AI images into a professional body of work.
export type Artwork = { id: string; title: string; image: string; color: string };

export type Series = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  cover: string;
  artworks: Artwork[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  image: string;
  color: string;
  challenge: string;
  idea: string;
  approach: string;
  result: string;
  tools: string[];
};

export const series: Series[] = [
  {
    slug: "faces-of-dream",
    title: "ЛИЦА СНА",
    subtitle: "Портретная серия",
    description: "Портреты, в которых ветер, свет и цвет становятся характером героя.",
    color: "#F5C9C0",
    cover: "/manus-storage/asyldreams-art-02_be1a2e8a.jpg",
    artworks: [
      { id: "portrait-01", title: "Розовый кадр", image: "/manus-storage/asyldreams-art-02_be1a2e8a.jpg", color: "#F5C9C0" },
      { id: "portrait-02", title: "Хаул", image: "/manus-storage/asyldreams-leaf04-howl_12a01b41.jpg", color: "#BFD4EF" },
      { id: "portrait-03", title: "Мягкий портрет", image: "/manus-storage/asyldreams-art-04_0be11e69.jpg", color: "#FFD385" },
    ],
  },
  {
    slug: "sky-memory",
    title: "ПАМЯТЬ НЕБА",
    subtitle: "Пейзажная серия",
    description: "Световые пространства, облака и тихие детали, оставшиеся после сна.",
    color: "#C7E2D9",
    cover: "/manus-storage/asyldreams-art-01-1200_eca251cd.jpg",
    artworks: [
      { id: "sky-01", title: "Облака", image: "/manus-storage/asyldreams-art-01-1200_eca251cd.jpg", color: "#DDE9B8" },
      { id: "sky-02", title: "Звёздный лист", image: "/manus-storage/asyldreams-space-01_17a24c7c.jpg", color: "#BFD4EF" },
      { id: "sky-03", title: "Тихий кадр", image: "/manus-storage/asyldreams-pinterest-work_b23fd463.jpg", color: "#C8DED6" },
    ],
  },
  {
    slug: "night-figures",
    title: "НОЧНЫЕ ФИГУРЫ",
    subtitle: "Персонажная серия",
    description: "Герои на границе тени и света: собранные, кинематографичные, немного опасные.",
    color: "#BFD4EF",
    cover: "/manus-storage/asyldreams-art-03_6586bdc4.jpg",
    artworks: [
      { id: "night-01", title: "Тень", image: "/manus-storage/asyldreams-art-03_6586bdc4.jpg", color: "#BFD4EF" },
      { id: "night-02", title: "Свет", image: "/manus-storage/asyldreams-art-05_8e78876f.jpg", color: "#C8DED6" },
      { id: "night-03", title: "Воздушный портрет", image: "/manus-storage/asyldreams-howl-01_2946edf9.jpg", color: "#F5C9C0" },
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "clouds",
    title: "ОБЛАКА",
    category: "Пейзаж / обложка",
    image: "/manus-storage/asyldreams-art-01-1200_eca251cd.jpg",
    color: "#DDE9B8",
    challenge: "Собрать мягкий пейзаж, который ощущается как обложка истории, а не как случайный фон.",
    idea: "Построить кадр вокруг тёплого света и одного выразительного движения в облаках.",
    approach: "Сначала выбирается настроение, затем композиция, палитра и финальный ритм деталей.",
    result: "Готовый визуал можно использовать как обложку, постер, фон или исходную точку для серии кадров.",
    tools: ["Midjourney", "арт-дирекшн", "цветовой ритм"],
  },
  {
    slug: "pink-frame",
    title: "РОЗОВЫЙ КАДР",
    category: "Персонаж / портрет",
    image: "/manus-storage/asyldreams-art-02_be1a2e8a.jpg",
    color: "#F5C9C0",
    challenge: "Создать героя, которого зритель считывает за секунду — через цвет, взгляд и силуэт.",
    idea: "Сделать розовый цвет не декоративным, а эмоциональным: лёгким, но уверенным.",
    approach: "Внимание сосредоточено на лице, развевающихся линиях и контрасте холодного фона с тёплой палитрой.",
    result: "Портрет работает как самостоятельная карточка персонажа и как кадр для будущей серии.",
    tools: ["Midjourney", "персонажный дизайн", "портретная композиция"],
  },
  {
    slug: "howl",
    title: "ХАУЛ",
    category: "Фан-арт / настроение",
    image: "/manus-storage/asyldreams-leaf04-howl_12a01b41.jpg",
    color: "#BFD4EF",
    challenge: "Сохранить узнаваемое настроение любимого персонажа, но сделать кадр личным и современным.",
    idea: "Показать героя как образ из сна: близко, мягко и с воздухом вокруг него.",
    approach: "Силуэт, свет и вертикальный формат работают как обложка романтической визуальной истории.",
    result: "Работа показывает, как узнаваемый референс можно перевести в собственный визуальный язык.",
    tools: ["Midjourney", "визуальная интерпретация", "вертикальная композиция"],
  },
];

export const getSeries = (slug: string) => series.find((item) => item.slug === slug);
export const getCaseStudy = (slug: string) => caseStudies.find((item) => item.slug === slug);
