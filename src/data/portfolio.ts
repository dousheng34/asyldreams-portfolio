// Данные портфолио AsylDreams. Изображения лежат в public/art (WebP, несколько размеров + LQIP-заглушка).
// Чтобы заменить работу: положи файл в public/art, добавь запись в works и укажи ключ в нужной серии.

export type Work = {
  key: string;
  title: string;
  w: number;
  h: number;
  color: string;
  src: string;
  srcset: string;
  lqip: string;
};

export type Series = {
  slug: string;
  eyebrow: string;
  title: string;
  ratio: string;
  desc: string;
  works: string[];
};

export const works: Record<string, Work> = {
  w161568: { key: "w161568", title: "Небесная река", w: 1920, h: 1080, color: "#64655f", src: "art/w161568.webp", srcset: "art/w161568.webp 1200w", lqip: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAwAgCdASoQAAkAA4BaJaACdAYqryBctKwiAAD+coJh5F+jdYLJudFiJcINPczn5HTUGMZYTIT9TJLNxVkTG/BmEIxhTGA6fxh6L8z0gbjE2YkhwCN9Z7MAAAA=" },
  w161008: { key: "w161008", title: "Лепестки", w: 640, h: 960, color: "#c16864", src: "art/w161008.webp", srcset: "art/w161008.webp 640w", lqip: "data:image/webp;base64,UklGRs4AAABXRUJQVlA4IMIAAADwBACdASoQABgAPu1iqU2ppaOiMAgBMB2JbACdMoAluBbiHiY/N9MnaHjKwJIv8YAA/uqYEUv/WvawWOUXijVj1zoPFkyEIdpIjy15qmm3tUQ1QzvKfJ6FQr8+BK9hBUvSmPT15XMxDg6GQpKVgyA24OG03akFxY6E2gOfnHUWCN5oOaAurr6mAwPoy3KoomIeXatRMM7A8qrgxl3pvwF0y9+sSSFY+LdrIuUr8RSGt+4LSsHjbTEcEKwDXx/MkwAAAA==" },
  w152592: { key: "w152592", title: "Под аркой", w: 1080, h: 1920, color: "#392c27", src: "art/w152592.webp", srcset: "art/w152592.webp 1080w", lqip: "data:image/webp;base64,UklGRpAAAABXRUJQVlA4IIQAAAAwBACdASoQABwAPu1Ct1apoqakGAEwHYlnAMiYYiSDr1gj5xvEjes3B6AA/vx+PjX761aowXSPXIaJBtNj72Hh3Cz3T0X6w6bKwSK0qdeXNsEw2BK1Z9vtphIn0Od4yYESCwvlv7jeCF2Ou4AbHzHJQimKuwBkC0fCkKMzaNReO0VAAAA=" },
  w152590: { key: "w152590", title: "Полночь", w: 1080, h: 1920, color: "#251d1a", src: "art/w152590.webp", srcset: "art/w152590.webp 1080w", lqip: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAADQAwCdASoQABwAPu1kqU2ppaOiMAgBMB2JZwDG9CP/9MoIiA66BYAA/k9U1SE801AdbAZY6gx1O6cDDPbeYcZFMMW1PczKHpw2cDME4ssG9JSSRRnixirdDcBcCjoOd6aP1NYijFHZrLiTAAA=" },
  w152585: { key: "w152585", title: "Огонёк", w: 1080, h: 1920, color: "#5b463c", src: "art/w152585.webp", srcset: "art/w152585.webp 1080w", lqip: "data:image/webp;base64,UklGRtAAAABXRUJQVlA4IMQAAADwBACdASoQABwAPu1iqk4ppaQiMAgBMB2JYwC/OdwLg3TLV9fciHkmxiLY4S35pgAA/snj/85mTSnzaVH/B1NecPzWtdQ9pfrvgmb3N1Jnip3ou9+p7Xt1HqF6+yCLDgMihFE+nNSJ/Ie+VdP6liZTHZHeCw700MhxX76zQLh87HNmSSr/tVW2OJb779xaMleP+kN3+Zb+WJwcl94VT1/sIGveFNiuWdcLi934ewybkqWCr2vOOdRMitF0J6OqeobTaAAA" },
  w152583: { key: "w152583", title: "Искра", w: 1080, h: 1920, color: "#3d2821", src: "art/w152583.webp", srcset: "art/w152583.webp 1080w", lqip: "data:image/webp;base64,UklGRrYAAABXRUJQVlA4IKoAAABQBACdASoQABwAPu1iqU2ppaOiMAgBMB2JZQC7AYwKw+txeHII5LgWJN5AAP70x9ieYhnEtaUhd+bw70Sn3qjK3li3Br6s7OJHoxvL4+lrqVBwHp7G9pXV1rZMb5KADORXYVytXku8YaXaNgpSxSuozEyHf/ab1oNZgc5i4nS9tPr3vwHCfkyHyixM9KHyRoGlmyl3DqDZZPpGF6U4m50H3C4T0GJSQWwQAA==" },
  w152568: { key: "w152568", title: "Тихий час", w: 1080, h: 1920, color: "#4c3a31", src: "art/w152568.webp", srcset: "art/w152568.webp 1080w", lqip: "data:image/webp;base64,UklGRs4AAABXRUJQVlA4IMIAAADwBACdASoQABwAPu1iqk2ppaQiMAgBMB2JYwC2yYwooED+INqJrp3OEumH1ibvVAAA/gjB/8vggFs3kSv+DqbCZvr0dY1z0o/mu/vc2QAUtH8Qtd0x/Kxgpye55on9k6P8manJ/Y9I0Fp1AdaLfCDf3MHmvUQ13yBEtqkohj3t6/957BW+97E2hrAJ9Y/4IuSKrsK4S1rsP69DgL11HCxprymv3QPLNXNTNxApj394euIiAbbEYs2oIB5+om/1rRgAAA==" },
  w152552: { key: "w152552", title: "Мрамор", w: 1080, h: 1920, color: "#332722", src: "art/w152552.webp", srcset: "art/w152552.webp 1080w", lqip: "data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAAAwBACdASoQABwAPu1qrU8ppiQiMAgBMB2JZwDImGMkg69YReYOU1ZjcgAA/v0v/vn+0BHL32Ez9pPJAGrOuXc9E0xvSvma8ZrMxa5tywjjU22yNZknZFkAQhO6d+qrqhd/73qHVt5rsU4GrAsLO6NZC0C+wPFn6Eq43x+vqTVvAAAA" },
  w141147: { key: "w141147", title: "Руины", w: 1456, h: 816, color: "#233232", src: "art/w141147.webp", srcset: "art/w141147.webp 1200w", lqip: "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADQAQCdASoQAAkAA4BaJZQC7ADdoiH1wAD+8UistfWaLZCdlp8cQoPZ4UlJwb6eGcR+S+wzgqiSW4KMtDxaC0AA" },
  w141146: { key: "w141146", title: "Пепел", w: 1456, h: 816, color: "#34322b", src: "art/w141146.webp", srcset: "art/w141146.webp 1200w", lqip: "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACwAQCdASoQAAkAA4BaJYwCdACQ5VKAAP7qFuJe4CKA4NKn6/v3bQpm3Xs/7N/pBU8qxUaNF32m3XVz0J2LtVaQ+/Kp42y7gAA=" },
  w141145: { key: "w141145", title: "Гроза", w: 1456, h: 816, color: "#202340", src: "art/w141145.webp", srcset: "art/w141145.webp 1200w", lqip: "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAQCdASoQAAkAA4BaJQBOgCHwqO4lehAA/vGGCQ93l3/dryfKEn9bwFc3rcIlXjbmaltRbz/pMe4hYNJK+vikXZbjOyfWcT5ZL+6/sgA=" },
  w141144: { key: "w141144", title: "Прилив", w: 1456, h: 816, color: "#0a2e2c", src: "art/w141144.webp", srcset: "art/w141144.webp 1200w", lqip: "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADQAQCdASoQAAkAA4BaJYgCdAEPfsouAAD+9F0QKI4r7j+FZelm724W/iSLnyq/vQjvBpYEy6JXnMWJL87fQ7gZ/eO05uxaK1xqIxXWAAA=" },
  w141142: { key: "w141142", title: "Пламя", w: 1456, h: 816, color: "#0a1012", src: "art/w141142.webp", srcset: "art/w141142.webp 1200w", lqip: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAAAwAgCdASoQAAkAA4BaJbAC7AELZS8HgGIIAAD+93zAbCSJLcrOyvtDlWkmr8fiIwnHImJSVo2DmFJ3Y2e6O1ojmUSPfg8zr7ZsSQebUpjBIAAA" },
  w131916: { key: "w131916", title: "Ночной магазин", w: 816, h: 1456, color: "#4f524e", src: "art/w131916.webp", srcset: "art/w131916.webp 816w", lqip: "data:image/webp;base64,UklGRr4AAABXRUJQVlA4ILIAAABwBACdASoQAB0APu1iqU2ppaOiMAgBMB2JYwC7AYtowO7Nbk9Vpx9uy8mKyAD+TxfMsVPfSZ3zVs4tK6P+5ibGZe5YBhgfTtB15i1N0SOwPE3gq157j/mTYQLqEGkSzYwrJ4wLqVhb4VViEiY/vPTDYZt64C0L1BnmbOp8XcOlJ+tbwV3kmrvm7EtBamFLy8+56yndDIu9AA849eDTH1r+cfs4bV113cn9cEA0HjbMgAAA" },
  w131906: { key: "w131906", title: "Эскиз", w: 1456, h: 816, color: "#dfdfdb", src: "art/w131906.webp", srcset: "art/w131906.webp 1200w", lqip: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADQAQCdASoQAAkAA4BaJZQCdADGgnywAAD+8399U/bQ0/JBuEeE/1Nzebas8kDAVKkT4ayFnmiOWrQstjAAAA==" },
  w853011: { key: "w853011", title: "Туман", w: 810, h: 1440, color: "#778e96", src: "art/w853011.webp", srcset: "art/w853011.webp 810w", lqip: "data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAAAwBACdASoQABwAPu1iqU2ppaQiMAgBMB2JZQCw86gA03E/jtFUO0cznqAA/uqHKvaUIKYhgYVJ8xAcikJEtv9Ylx1EwEkUMAh2DSdVvCKgRyCnsr3AnVeUGYW60zU0cH2ORv1tkVH69dI+lOoaJOO9g2YAAA==" },
  w053515: { key: "w053515", title: "Волна", w: 816, h: 1440, color: "#6d594e", src: "art/w053515.webp", srcset: "art/w053515.webp 816w", lqip: "data:image/webp;base64,UklGRrwAAABXRUJQVlA4ILAAAACwBACdASoQABwAPu1iqU2ppaOiMAgBMB2JZQCuHdwLgnZVmrFl9sIrp8mT6y4AAP7v14ZN8m25oxb6/8FEdvwwIVxz5Np1/iGDHWFv4E+JR/CMZJDjZwq8ae7l3LlD8jJGrHUF/oCGBd3W/sQtn+ozgbr7RYe78tuRgP7OrEA+7tm1GthaA/PDrc/7UXdFecqfO3ZGr7yXpuEUinqGkBeZctZRJYYGkk+KAXigx0AAAA==" },
  w053514: { key: "w053514", title: "Шёлк", w: 816, h: 1440, color: "#b69f91", src: "art/w053514.webp", srcset: "art/w053514.webp 816w", lqip: "data:image/webp;base64,UklGRp4AAABXRUJQVlA4IJIAAAAwBACdASoQABwAPu1iqk2ppaQiMAgBMB2JYwC07agBJ8JOY8p0sXdDSAAA/ufsTC9Tiz4NGAQ87QhoAdeMnlBF/em7C7QN7HFcm3fHk3VymVWuvKQSplzPDaXP9vCgHgJfXamQPu6D1ueyC4vPQhh/WgsJ3vxP+DxMwCa1+lUIKpK4rxbQx9o1w9Cq+K7SBnQAAA==" },
  w053513: { key: "w053513", title: "Пепельный блонд", w: 816, h: 1440, color: "#9d8779", src: "art/w053513.webp", srcset: "art/w053513.webp 816w", lqip: "data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAADQAwCdASoQABwAPu1kqk2ppaQiMAgBMB2JYwC7ACPzVADsw3z6tsAA/OMfnVDQB3YkmpqgqtpfG9ThuxD02jnqgRbKBafLKMHFxYE0bERrRbCvZvEp20sybo8drdVQD7KVO2YI7sbc96596wfwIRDWyFQ9XCu+yqtb2f0KL1auxm1DyqgqVHvh0gERSrQA" },
  w053512: { key: "w053512", title: "Шэг", w: 816, h: 1440, color: "#998c7a", src: "art/w053512.webp", srcset: "art/w053512.webp 816w", lqip: "data:image/webp;base64,UklGRrAAAABXRUJQVlA4IKQAAACQBACdASoQABwAPu1iqk2ppaQiMAgBMB2JYgCw8AgOWAdO3r1ZyjbQAtgAowAA/dEpxzxzkfKl2bHI0r+/zObRlEojedb19CHQniwhC3sszsnlkaEhOe+opHvTcIqFnBIWZAe9L5Q05onpg5aO7S2xCXx6WIYGQiPBYrM61Sn2E3OhGhnKCzCcDohcAbBJAUhKtei/J4IHeeA4aR0yDxuQRUAAAA==" },
  w053511: { key: "w053511", title: "Пикси", w: 816, h: 1440, color: "#a08b7f", src: "art/w053511.webp", srcset: "art/w053511.webp 816w", lqip: "data:image/webp;base64,UklGRpgAAABXRUJQVlA4IIwAAACwBACdASoQABwAPu1krU6ppaSiMAgBMB2JZQDE+ExDA0L3v4q13v+YJrkAOpeAAP6vPvW/IwpZJxbuJCSAOXDOg/tFTU5vQEIUGZnMtZc9v9eZWom2KjtkhrWGYaR/GOA0X5EckidkUFy/d/MkIY5ZId1SOtMyEiTzziSlLMQpmDwNBEgMnHNq6AAAAA==" },
  w053510: { key: "w053510", title: "Слои", w: 816, h: 1440, color: "#9c887a", src: "art/w053510.webp", srcset: "art/w053510.webp 816w", lqip: "data:image/webp;base64,UklGRrYAAABXRUJQVlA4IKoAAACQBACdASoQABwAPu1iqU2ppaOiMAgBMB2JQBOgZYA2soywcZCmBpSEWmiTuwAA/OLCv/YeORKUlzzbvkfsZ9bBk4LkBJSJ4iSd7dN7sY7ZWc4iq2w8pQ9AjLtLoUJwmM1Fzj03Ads2zzur7KBTou2csJbDvs/Fz9Tj4sBkax2d3rl9ngmI1YRLD9mekTJTqWNVoASCAuJs0n6O4JK5HF+6VQaSjaWQrIAAAA==" },
  w053509: { key: "w053509", title: "Карамель", w: 816, h: 1440, color: "#9a816b", src: "art/w053509.webp", srcset: "art/w053509.webp 816w", lqip: "data:image/webp;base64,UklGRsYAAABXRUJQVlA4ILoAAADwBACdASoQABwAPu1iqU2ppaQiMAgBMB2JYwCdMoM6DBAj/RW9kWLb3U5BnHnAYgAA/pjxJgkRyGoUt8wASxa12tZmHKRwRe3SB4mlsq9uoilYgiX+KdX5H40DF0BxscGEokzi63xbkFevkG6PTED8TMFPQNa2+Xpf08cl4VA0V5SWWrKMax2cprwMHkc/GArX/vq1sP6Vq1v2KQ5SE22IufG/h5S5g9ioyjLIoDEe9jfJgh00p70TAAA=" },
};

export const series: Series[] = [
  { slug: "night", eyebrow: "Серия 01", title: "Ночные обои", ratio: "9:16", desc: "Вертикальные 4K-обои для телефона: тёплая темнота, мокрые волосы, один источник света — и герой, который живёт на экране блокировки.", works: ["w152585", "w152592", "w152590", "w152583", "w152552", "w152568"] },
  { slug: "cinema", eyebrow: "Серия 02", title: "Кинокадры", ratio: "16:9", desc: "Широкие кадры с настроением фильма: руины, гроза, прилив и пламя. Холодная палитра, силуэт и воздух вокруг героя.", works: ["w141147", "w141145", "w141144", "w141142", "w141146", "w161568"] },
  { slug: "quiet", eyebrow: "Серия 03", title: "Тихие кадры", ratio: "3:5", desc: "Портреты без шума: ночной магазин, туман и бамбук, лепестки на ветру, карандашный эскиз. Тишина вместо контраста.", works: ["w131916", "w853011", "w161008", "w131906"] },
  { slug: "hair", eyebrow: "Серия 04", title: "Причёски", ratio: "9:16", desc: "AI-референсы для стилистов и салонов: текстура, свет и цвет волос в одном узнаваемом стиле съёмки.", works: ["w053515", "w053514", "w053513", "w053512", "w053510", "w053509", "w053511"] },
];

export const featured: string[] = ["w152585", "w141145", "w131916", "w141144", "w152590", "w161568", "w161008", "w141147"];
export const heroKeys: string[] = ["w152585", "w152592", "w131916", "w152590", "w853011"];

export const profile = {
  name: "AsylDreams",
  tagline: "AI visual artist",
  pinterest: "https://www.pinterest.com/AsylDreams/",
  github: "https://github.com/dousheng34",
  stats: [
    { value: 350, suffix: "K+", label: "просмотров в месяц" },
    { value: 719, suffix: "", label: "подписчиков на Pinterest" },
    { value: 23, suffix: "", label: "работы в подборке" },
    { value: 4, suffix: "", label: "авторские серии" },
  ],
  services: [
    { name: "Персонаж", desc: "Герой с характером: силуэт, взгляд, палитра — читается за секунду.", key: "w152585" },
    { name: "Портрет", desc: "Крупный план и мягкий свет. Работает как аватар и как постер.", key: "w161008" },
    { name: "Пейзаж / обои", desc: "Вертикальный 4K-кадр для экрана телефона или рабочего стола.", key: "w152590" },
    { name: "Обложка / постер", desc: "Кинематографичный кадр под текст: плейлист, книга, канал.", key: "w141145" },
    { name: "Серия кадров", desc: "5–10 работ в одном визуальном языке для ленты или коллекции.", key: "w053509" },
    { name: "Короткий клип", desc: "Живые обои: движение света, ветра и деталей в 5–10 секунд.", key: "w853011" },
  ],
};

export const seriesOf = (key: string) => series.find((s) => s.works.includes(key));
export const allKeys = series.flatMap((s) => s.works);
