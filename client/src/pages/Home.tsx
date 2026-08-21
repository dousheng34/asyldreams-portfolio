import { ArrowDownRight, ChevronLeft, ChevronRight, Filter, Play, Plus, Sparkles, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import type { ChangeEvent, PointerEvent } from "react";

// Moving Paper Gallery: light editorial collage where every Pinterest image keeps its native proportion and video remains tactile.
const pinterestUrl = "https://www.pinterest.com/AsylDreams/";
const artBoardUrl = "https://www.pinterest.com/asyldreams/art/";
const defaultVideo = "/manus-storage/asyldreams-moving-paper_7cfea5de.mp4";

const artworks = [
  { id: "01", title: "Облака", tag: "Pinterest / Art", category: "landscape", mood: "тихий день", image: "/manus-storage/asyldreams-art-01_1b019e43.jpg", color: "#DDE9B8", size: "wide" },
  { id: "02", title: "Розовый кадр", tag: "Pinterest / Art", category: "character", mood: "персиковый свет", image: "/manus-storage/asyldreams-art-02_be1a2e8a.jpg", color: "#F5C9C0", size: "portrait" },
  { id: "03", title: "Тень", tag: "Pinterest / Art", category: "portrait", mood: "прохладный лист", image: "/manus-storage/asyldreams-art-03_6586bdc4.jpg", color: "#BFC5ED", size: "portrait" },
  { id: "04", title: "Млечный путь", tag: "Pinterest / Space", category: "landscape", mood: "звёздный лист", image: "/manus-storage/asyldreams-space-01_117f4afe.jpg", color: "#D8C4B4", size: "portrait" },
  { id: "05", title: "Свет", tag: "Pinterest / Art", category: "portrait", mood: "молочное стекло", image: "/manus-storage/asyldreams-art-05_8e78876f.jpg", color: "#C8DED6", size: "wide" },
];

const lenses = {
  milk: { label: "Молоко", filter: "brightness(1.12) saturate(0.75) contrast(0.92)", color: "#FAF3E8" },
  peach: { label: "Персик", filter: "sepia(0.23) saturate(1.12) hue-rotate(336deg) brightness(1.07)", color: "#FFC1B1" },
  silver: { label: "Серебро", filter: "grayscale(0.78) contrast(1.18) brightness(1.05)", color: "#BFC9D3" },
  aqua: { label: "Синее стекло", filter: "sepia(0.13) saturate(1.3) hue-rotate(150deg) brightness(1.05)", color: "#B9E6E6" },
} as const;

type LensKey = keyof typeof lenses;
type CategoryKey = "all" | "character" | "landscape" | "portrait";

const categories: { id: CategoryKey; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "character", label: "Персонажи" },
  { id: "landscape", label: "Пейзажи" },
  { id: "portrait", label: "Портреты" },
];

export default function Home() {
  const [activeLens, setActiveLens] = useState<LensKey>("milk");
  const [videoSources, setVideoSources] = useState<string[]>([defaultVideo]);
  const [videoIndex, setVideoIndex] = useState(0);
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [aboutPhoto, setAboutPhoto] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const aboutInput = useRef<HTMLInputElement>(null);
  const lens = lenses[activeLens];
  const activeWork = activeWorkIndex === null ? null : artworks[activeWorkIndex];
  const visibleWorks = activeCategory === "all" ? artworks : artworks.filter((artwork) => artwork.category === activeCategory);

  function chooseVideo(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    setVideoSources(files.map((file) => URL.createObjectURL(file)));
    setVideoIndex(0);
  }

  function moveVideo(direction: number) {
    setVideoIndex((index) => (index + direction + videoSources.length) % videoSources.length);
  }

  function moveWork(direction: number) {
    setActiveWorkIndex((index) => index === null ? 0 : (index + direction + artworks.length) % artworks.length);
  }

  function moveCursor(event: PointerEvent<HTMLDivElement>) {
    setCursor({ x: event.clientX, y: event.clientY });
  }

  function chooseAboutPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setAboutPhoto(URL.createObjectURL(file));
  }

  return (
    <div className="paper-site min-h-screen overflow-x-hidden text-[#1d2547]" onPointerMove={moveCursor}>
      <div className="paper-cursor" aria-hidden="true" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}><span /></div>
      <header className="paper-nav px-4 py-4 sm:px-7 lg:px-10">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between">
          <a href="#top" className="paper-wordmark" aria-label="AsylDreams — в начало">
            <span className="portal-mark" aria-hidden="true"><span /></span>
            <span>Asyl<br /><i>Dreams</i></span>
          </a>
          <nav className="hidden gap-7 text-[11px] font-semibold uppercase tracking-[0.14em] md:flex" aria-label="Основная навигация">
            <a href="#works">Работы</a>
            <a href="#video">Видео</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <a className="pinterest-pill" href={pinterestUrl} target="_blank" rel="noreferrer">Pinterest <ArrowDownRight className="h-3.5 w-3.5" /></a>
        </div>
      </header>

      <main id="top">
        <section className="hero-paper px-4 pb-16 pt-4 sm:px-7 sm:pb-24 lg:px-10">
          <div className="hero-paper-inner mx-auto grid max-w-[1540px] overflow-hidden lg:grid-cols-[1fr_minmax(420px,.88fr)]">
            <div className="hero-copy flex min-h-[540px] flex-col justify-between p-7 sm:p-10 lg:min-h-[680px] lg:p-14">
              <div>
                <p className="paper-kicker"><span /> Кадры, которые меняют настроение</p>
                <h1 className="juz-heading mt-10 max-w-3xl text-[clamp(4.2rem,8.7vw,10rem)] leading-[0.75] tracking-[-0.075em]">МОИ<br />КАДРЫ<span className="text-[#F04A36]">.</span></h1>
                <p className="mt-9 max-w-sm text-sm font-medium leading-6 text-[#1d2547]/70 sm:text-base">Пять визуальных снов, которым не нужна рамка. Смотри медленно — и выбирай свой цвет для движения.</p>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[#1d2547]/15 pt-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em]">710 подписчиков · 290K взглядов в месяц</span>
                <a href="#works" className="round-arrow" aria-label="Перейти к работам"><ArrowDownRight className="h-5 w-5" /></a>
              </div>
            </div>

            <div id="video" className="video-panel relative flex min-h-[540px] flex-col justify-between overflow-hidden p-7 sm:p-10 lg:min-h-[680px] lg:p-14" style={{ backgroundColor: lens.color }}>
              <div className="video-topline relative z-10 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em]">
                <span>Видео / {String(videoIndex + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-2"><Play className="h-3.5 w-3.5 fill-current" /> Движение</span>
              </div>
              <div className="video-orbit absolute left-1/2 top-1/2 aspect-square w-[min(83vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1d2547]/20 p-3 sm:w-[min(52vw,480px)]">
                <span className="lens-note">Линза 01<br />меняет цвет</span>
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#FAF3E8] bg-[#B9E6E6] shadow-[14px_18px_0_rgba(29,37,71,0.16)]">
                  <video key={videoSources[videoIndex]} autoPlay muted loop playsInline className="h-full w-full object-cover transition-[filter] duration-500" style={{ filter: lens.filter }}>
                    <source src={videoSources[videoIndex]} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,.46),transparent_34%)]" />
                </div>
              </div>
              <div className="video-controls relative z-10 mt-auto grid gap-5 border-t border-[#1d2547]/15 pt-5">
                <div className="flex flex-wrap gap-2" aria-label="Выберите фильтр видео">
                  {(Object.keys(lenses) as LensKey[]).map((key) => (
                    <button key={key} type="button" onClick={() => setActiveLens(key)} aria-pressed={activeLens === key} className={`lens-button ${activeLens === key ? "is-active" : ""}`}>{lenses[key].label}</button>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <button type="button" className="upload-video" onClick={() => fileInput.current?.click()}><Plus className="h-4 w-4" /> Добавить мои видео</button>
                  {videoSources.length > 1 && <div className="video-carousel" aria-label="Листать видео"><button type="button" onClick={() => moveVideo(-1)} aria-label="Предыдущее видео"><ChevronLeft className="h-4 w-4" /></button><span>{videoIndex + 1} / {videoSources.length}</span><button type="button" onClick={() => moveVideo(1)} aria-label="Следующее видео"><ChevronRight className="h-4 w-4" /></button></div>}
                </div>
                <input ref={fileInput} className="hidden" type="file" accept="video/*" multiple onChange={chooseVideo} />
              </div>
            </div>
          </div>
        </section>

        <section id="works" className="works-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-[1540px]">
            <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <p className="paper-kicker"><span /> Pinterest / Art board</p>
                <h2 className="juz-heading mt-4 text-[clamp(3.2rem,6vw,6.5rem)] leading-[0.8] tracking-[-0.065em]">ПЯТЬ<br />ИЗБРАННЫХ.</h2>
              </div>
              <a href={artBoardUrl} target="_blank" rel="noreferrer" className="text-link">Открыть всю доску <ChevronRight className="h-4 w-4" /></a>
            </div>

            <div className="gallery-filter-bar" aria-label="Фильтры работ">
              <span className="filter-label"><Filter className="h-3.5 w-3.5" /> Смотреть</span>
              {categories.map((category) => <button type="button" key={category.id} onClick={() => setActiveCategory(category.id)} className={`gallery-filter ${activeCategory === category.id ? "is-active" : ""}`}>{category.label}</button>)}
            </div>
            <div className="art-layout">
              {visibleWorks.map((artwork) => {
                const index = artworks.findIndex((item) => item.id === artwork.id);
                return (
                <button key={artwork.id} type="button" className={`paper-work ${artwork.size}`} onClick={() => setActiveWorkIndex(index)} aria-label={`Открыть работу ${artwork.title}`}>
                  <div className="paper-mat" style={{ backgroundColor: artwork.color }}>
                    <span className="paper-tab">Лист {artwork.id} / {artwork.mood}</span>
                    <img src={artwork.image} alt={artwork.title} className="work-image" />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <div><p className="work-index">{artwork.id} / {artwork.tag}</p><h3 className="juz-heading mt-1 text-3xl tracking-[-0.045em]">{artwork.title}</h3></div>
                    <ArrowDownRight className="mt-2 h-4 w-4" />
                  </div>
                </button>
              );
              })}
            </div>
          </div>
        </section>

        <section className="note-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10">
          <div className="mx-auto grid max-w-[1540px] gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div className="sticker-note"><Sparkles className="h-7 w-7" /><span>New mood<br />every frame</span></div>
            <p className="juz-heading max-w-5xl text-[clamp(3rem,5.8vw,7.5rem)] leading-[0.81] tracking-[-0.065em]">КАДРЫ МОГУТ<br /><i className="text-[#F04A36]">МЕНЯТЬ СВЕТ.</i></p>
          </div>
        </section>

        <section id="about" className="about-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10">
          <div className="about-paper-inner mx-auto grid max-w-[1540px] gap-10 lg:grid-cols-[.74fr_1.26fr] lg:gap-16">
            <div className="about-photo-wrap">
              {aboutPhoto ? <img src={aboutPhoto} alt="Фотография автора AsylDreams" className="about-photo" /> : <div className="about-photo-placeholder"><span>AS</span><p>Ваше<br />фото здесь</p></div>}
              <button type="button" className="about-upload" onClick={() => aboutInput.current?.click()}><Upload className="h-4 w-4" /> Добавить моё фото</button>
              <input ref={aboutInput} className="hidden" type="file" accept="image/*" onChange={chooseAboutPhoto} />
            </div>
            <div className="about-copy">
              <p className="paper-kicker"><span /> Обо мне / AsylDreams</p>
              <h2 className="juz-heading mt-5 text-[clamp(3.1rem,5.8vw,7.2rem)] leading-[0.8] tracking-[-0.07em]">СОБИРАЮ<br />СНЫ В КАДР.</h2>
              <p className="about-text">Я создаю AI-образы, где персонажи, цвет и атмосфера становятся отдельными историями. Мой Pinterest уже собрал 710 подписчиков и около 290K просмотров в месяц — и я продолжаю искать новые миры для каждой серии.</p>
              <div className="about-stats"><span><b>710</b> подписчиков</span><span><b>290K</b> просмотров / месяц</span><span><b>∞</b> будущих миров</span></div>
            </div>
          </div>
        </section>

        <section id="contacts" className="contacts-paper px-4 pb-8 pt-16 sm:px-7 sm:pt-24 lg:px-10">
          <div className="contact-plate mx-auto max-w-[1540px] overflow-hidden p-7 sm:p-10 lg:grid lg:grid-cols-[1.1fr_.9fr] lg:p-14">
            <div className="flex flex-col justify-between gap-12">
              <div><p className="paper-kicker"><span /> AsylDreams / Moving Paper</p><h2 className="juz-heading mt-5 text-[clamp(3.2rem,6.5vw,7.5rem)] leading-[0.8] tracking-[-0.07em]">СМОТРИ<br />ДАЛЬШЕ.</h2></div>
              <a className="pinterest-portal" href={pinterestUrl} target="_blank" rel="noreferrer"><span className="portal-orbit"><span>P</span></span><span>Смотреть в Pinterest</span><ArrowDownRight className="h-6 w-6" /></a>
            </div>
            <div className="contact-routes mt-10 lg:mt-0">
              <p className="contact-caption">Ещё кадры и настроение</p>
              <a className="contact-paper" href={pinterestUrl} target="_blank" rel="noreferrer">Pinterest <ArrowDownRight className="h-4 w-4" /></a>
              <a className="contact-paper" href="https://www.instagram.com/ornalya11" target="_blank" rel="noreferrer">Instagram <ArrowDownRight className="h-4 w-4" /></a>
              <a className="contact-paper" href="http://tiktok.com/@ornalya11" target="_blank" rel="noreferrer">TikTok <ArrowDownRight className="h-4 w-4" /></a>
            </div>
          </div>
          <footer className="mx-auto mt-14 max-w-[1540px] border-t border-[#1d2547]/15 py-5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#1d2547]/60">© AsylDreams. Сделано в движении.</footer>
        </section>

        {activeWork && activeWorkIndex !== null && (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Просмотр работы ${activeWork.title}`} onClick={() => setActiveWorkIndex(null)}>
            <button type="button" className="lightbox-close" onClick={() => setActiveWorkIndex(null)} aria-label="Закрыть просмотр"><X className="h-5 w-5" /></button>
            <button type="button" className="lightbox-nav is-left" onClick={(event) => { event.stopPropagation(); moveWork(-1); }} aria-label="Предыдущая работа"><ChevronLeft className="h-8 w-8" /></button>
            <div className="lightbox-frame" onClick={(event) => event.stopPropagation()}>
              <div className="lightbox-mat" style={{ backgroundColor: activeWork.color }}><img src={activeWork.image} alt={activeWork.title} /></div>
              <div className="lightbox-meta"><div><p>{String(activeWorkIndex + 1).padStart(2, "0")} / 05 · Pinterest / Art</p><h3 className="juz-heading">{activeWork.title}</h3></div><a href={artBoardUrl} target="_blank" rel="noreferrer">Открыть на Pinterest <ArrowDownRight className="h-4 w-4" /></a></div>
            </div>
            <button type="button" className="lightbox-nav is-right" onClick={(event) => { event.stopPropagation(); moveWork(1); }} aria-label="Следующая работа"><ChevronRight className="h-8 w-8" /></button>
          </div>
        )}
      </main>
    </div>
  );
}
