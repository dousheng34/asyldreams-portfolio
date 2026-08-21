import { ArrowDownRight, ArrowUpRight, Crosshair, Sparkles } from "lucide-react";
import { useState } from "react";
import type { PointerEvent } from "react";

// Dream Archive: an asymmetric cinematic route where images, ritual-like metadata, and an observant character lead the viewer.
const pinterestUrl = "https://www.pinterest.com/AsylDreams/";
const artBoardUrl = "https://www.pinterest.com/asyldreams/art/";

const artworks = [
  {
    number: "01 / ART BOARD",
    title: "Untitled 01",
    detail: "Pinterest / Art / 5h",
    image: "/manus-storage/asyldreams-art-01_1b019e43.jpg",
    href: artBoardUrl,
    layout: "wide",
  },
  {
    number: "02 / ART BOARD",
    title: "Untitled 02",
    detail: "Pinterest / Art / 5h",
    image: "/manus-storage/asyldreams-art-02_be1a2e8a.jpg",
    href: artBoardUrl,
    layout: "tall",
  },
  {
    number: "03 / ART BOARD",
    title: "Untitled 03",
    detail: "Pinterest / Art / 5h",
    image: "/manus-storage/asyldreams-art-03_6586bdc4.jpg",
    href: artBoardUrl,
    layout: "tall",
  },
  {
    number: "04 / ART BOARD",
    title: "Untitled 04",
    detail: "Pinterest / Art / 5h",
    image: "/manus-storage/asyldreams-art-04_8bb316da.jpg",
    href: artBoardUrl,
    layout: "tall",
  },
  {
    number: "05 / ART BOARD",
    title: "Untitled 05",
    detail: "Pinterest / Art / 5h",
    image: "/manus-storage/asyldreams-art-05_8e78876f.jpg",
    href: artBoardUrl,
    layout: "wide",
  },
];

export default function Home() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    setPointer({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  }

  function resetPointer() {
    setPointer({ x: 0, y: 0 });
  }

  function scrollToArchive() {
    document.getElementById("archive")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="archive-site min-h-screen overflow-x-hidden bg-[#08090b] text-[#f4f0e9]">
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-7 lg:px-10">
        <div className="archive-nav mx-auto flex max-w-[1560px] items-center justify-between border border-white/10 bg-[#0e1012]/72 px-4 py-3 backdrop-blur-xl sm:px-5">
          <a href="#top" className="group flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em]" aria-label="AsylDreams — к началу страницы">
            <img className="h-8 w-8 transition-transform duration-300 group-hover:rotate-12" src="/manus-storage/asyldreams-logo-mark_f887aaf3.png" alt="Знак AsylDreams" />
            <span className="brand-wordmark hidden sm:inline">AsylDreams</span>
          </a>
          <nav className="hidden items-center gap-8 text-[10px] font-medium uppercase tracking-[0.18em] text-white/58 md:flex" aria-label="Основная навигация">
            <a className="nav-link" href="#archive">Архив</a>
            <a className="nav-link" href="#about">Об авторе</a>
            <a className="nav-link" href="#contact">Контакты</a>
          </nav>
          <a className="magnetic-link" href={pinterestUrl} target="_blank" rel="noreferrer">
            Pinterest <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main id="top">
        <section
          className="hero-stage relative min-h-[760px] overflow-hidden px-4 pb-12 pt-28 sm:px-7 lg:min-h-screen lg:px-10 lg:pb-10 lg:pt-28"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/manus-storage/asyldreams-hero-reference_5ac21165.jpg"
              alt="Кинематографичный архив AI-образов"
              className="hero-photo absolute inset-0 h-full w-full object-cover"
              style={{ transform: `scale(1.06) translate3d(${pointer.x * -7}px, ${pointer.y * -5}px, 0)` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,10,0.98)_0%,rgba(7,8,10,0.88)_26%,rgba(7,8,10,0.25)_64%,rgba(7,8,10,0.48)_100%)]" />
            <div className="hero-grain absolute inset-0" />
            <div className="pointer-glow absolute -inset-[25%] opacity-90" style={{ transform: `translate3d(${pointer.x * 28}%, ${pointer.y * 18}%, 0)` }} />
          </div>

          <div className="relative mx-auto flex min-h-[620px] max-w-[1560px] flex-col justify-end lg:min-h-[calc(100vh-9rem)]">
            <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,0.98fr)_minmax(420px,0.72fr)] lg:gap-10">
              <div className="max-w-3xl pb-4">
                <div className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.23em] text-[#7eebff]">
                  <span className="live-dot" aria-hidden="true" />
                  AI визуальный архив · 2026
                </div>
                <h1 className="max-w-[830px] font-['DM_Serif_Display'] text-[clamp(4rem,9.4vw,9.2rem)] leading-[0.78] tracking-[-0.075em] text-[#f7f4ee]">
                  Сны
                  <span className="block pl-[0.1em] italic text-[#82eaff]">с пульсом.</span>
                </h1>
                <div className="mt-10 flex max-w-xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <p className="max-w-[20rem] text-sm leading-6 text-white/62 sm:text-[15px]">
                    Невозможные пространства, лица и истории, созданные на грани сна и алгоритма.
                  </p>
                  <button className="archive-cta group" type="button" onClick={scrollToArchive}>
                    <span>Войти в архив</span>
                    <span className="cta-icon"><ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" /></span>
                  </button>
                </div>
              </div>

              <div className="relative hidden min-h-[510px] lg:block">
                <div className="hero-profile-card absolute bottom-4 right-[5%] w-[82%] overflow-hidden border border-white/20 bg-[#0a0b0d] p-2" style={{ transform: `translate3d(${pointer.x * 16}px, ${pointer.y * 12}px, 0) rotate(${pointer.x * 1.1}deg)` }}>
                  <img src="/manus-storage/asyldreams-pinterest-work_96826cc9.jpg" alt="Профильный визуальный сигнал AsylDreams на Pinterest" className="aspect-[3/4] w-full object-cover object-center grayscale" />
                  <div className="absolute inset-x-2 bottom-2 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/15 to-transparent px-4 pb-4 pt-16">
                    <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.15em] text-white/68">Profile signal / Pinterest</span>
                    <Crosshair className="h-4 w-4 text-[#5ee7ff]" />
                  </div>
                </div>
                <div className="character-label absolute bottom-0 left-3"><span>Персонаж следует за курсором</span></div>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-white/12 pt-5 text-[10px] uppercase tracking-[0.18em] text-white/52">
              <span>Asyl Dreams / AI-художник</span>
              <span className="text-[#5ee7ff]">710 followers</span>
              <span>290K monthly views</span>
            </div>
          </div>
        </section>

        <section id="archive" className="relative bg-[#0b0d10] px-4 py-24 sm:px-7 sm:py-32 lg:px-10 lg:py-40">
          <div className="absolute left-[5%] top-20 h-px w-[18%] bg-[#5ee7ff]/70" />
          <div className="mx-auto max-w-[1560px]">
            <div className="grid items-end gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="section-eyebrow">Pinterest / Art / 05 пинов</p>
                <h2 className="mt-5 max-w-md font-['DM_Serif_Display'] text-6xl leading-[0.88] tracking-[-0.055em] sm:text-7xl">Архив<br /><i className="text-[#74eaff]">открывается медленно.</i></h2>
              </div>
              <p className="max-w-lg pb-1 text-sm leading-7 text-white/58 lg:ml-auto">
                Опубликованная подборка с доски Art в Pinterest. Каждый кадр ведёт к исходному профилю AsylDreams, где хранится полная живая коллекция.
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10">
              {artworks.map((work, index) => (
                <a
                  key={work.number}
                  href={work.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`artwork-card group ${work.layout === "tall" ? "lg:col-span-4 lg:mt-24" : "lg:col-span-8"} ${index === 2 ? "lg:col-start-5 lg:mt-4" : ""}`}
                >
                  <div className={`artwork-image ${work.layout === "tall" ? "aspect-[4/5]" : "aspect-[16/10]"}`}>
                    <img src={work.image} alt={work.title} className="h-full w-full object-cover" />
                    <div className="artwork-wash absolute inset-0" />
                    <div className="artwork-hover absolute inset-0 flex items-end justify-between p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.15em]">Открыть в Pinterest</span>
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-5 pt-4">
                    <div>
                      <p className="font-['IBM_Plex_Mono'] text-[9px] tracking-[0.15em] text-[#69e9ff]">{work.number}</p>
                      <h3 className="mt-1 font-['DM_Serif_Display'] text-3xl tracking-[-0.04em] text-white/95">{work.title}</h3>
                    </div>
                    <span className="mt-2 whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-white/43">{work.detail}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="relative overflow-hidden border-t border-white/10 bg-[#101317] px-4 py-24 sm:px-7 lg:px-10 lg:py-36">
          <div className="absolute -right-20 top-5 h-72 w-72 rounded-full bg-[#5ee7ff]/10 blur-[100px]" />
          <div className="mx-auto grid max-w-[1560px] gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
            <div>
              <p className="section-eyebrow">Координаты автора</p>
              <div className="mt-8 flex items-center gap-4">
                <img src="/manus-storage/asyldreams-logo-mark_f887aaf3.png" alt="" className="h-16 w-16" />
                <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.17em] text-white/55">AsylDreams<br />Визуальный архив</span>
              </div>
            </div>
            <div>
              <p className="max-w-4xl font-['DM_Serif_Display'] text-[clamp(2.7rem,5.2vw,5.5rem)] leading-[0.93] tracking-[-0.055em] text-[#f4f0e9]">
                «Я собираю образы, которые кажутся <i className="text-[#7eeaff]">воспоминаниями</i> из миров, где нас ещё не было».
              </p>
              <div className="mt-12 grid max-w-2xl grid-cols-1 gap-6 border-t border-white/15 pt-6 sm:grid-cols-3">
                <div><p className="metric">710</p><p className="metric-label">подписчиков Pinterest</p></div>
                <div><p className="metric text-[#5ee7ff]">290K</p><p className="metric-label">просмотров в месяц</p></div>
                <div><p className="metric">∞</p><p className="metric-label">возможных миров</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative bg-[#08090b] px-4 pb-12 pt-28 sm:px-7 lg:px-10 lg:pt-36">
          <div className="mx-auto max-w-[1560px] border-b border-white/10 pb-20 lg:pb-28">
            <p className="section-eyebrow">Следующий кадр ждёт</p>
            <div className="mt-7 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
              <h2 className="max-w-4xl font-['DM_Serif_Display'] text-[clamp(3.6rem,7.8vw,8rem)] leading-[0.79] tracking-[-0.072em]">Давайте мечтать<br /><i className="text-[#75eaff]">дальше.</i></h2>
              <div className="flex flex-col items-start gap-3">
                <a className="contact-link" href="https://www.instagram.com/ornalya11" target="_blank" rel="noreferrer">Instagram <ArrowUpRight className="h-4 w-4" /></a>
                <a className="contact-link" href="http://tiktok.com/@ornalya11" target="_blank" rel="noreferrer">TikTok <ArrowUpRight className="h-4 w-4" /></a>
                <a className="contact-link" href={pinterestUrl} target="_blank" rel="noreferrer">Pinterest <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
          <footer className="mx-auto flex max-w-[1560px] flex-col justify-between gap-5 py-7 font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.15em] text-white/36 sm:flex-row">
            <span>© 2026 AsylDreams</span>
            <span className="flex items-center gap-2"><Sparkles className="h-3 w-3 text-[#5ee7ff]" /> Сделано из света и latent space</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
