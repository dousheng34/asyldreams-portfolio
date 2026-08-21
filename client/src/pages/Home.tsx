import { ArrowDownRight, ChevronRight, Play, Plus, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";

// Moving Paper Gallery: light editorial collage where every Pinterest image keeps its native proportion and video remains tactile.
const pinterestUrl = "https://www.pinterest.com/AsylDreams/";
const artBoardUrl = "https://www.pinterest.com/asyldreams/art/";
const defaultVideo = "/manus-storage/asyldreams-moving-paper_7cfea5de.mp4";

const artworks = [
  { id: "01", title: "Облака", tag: "Pinterest / Art", image: "/manus-storage/asyldreams-art-01_1b019e43.jpg", color: "#DDE9B8", size: "wide" },
  { id: "02", title: "Розовый кадр", tag: "Pinterest / Art", image: "/manus-storage/asyldreams-art-02_be1a2e8a.jpg", color: "#F5C9C0", size: "portrait" },
  { id: "03", title: "Тень", tag: "Pinterest / Art", image: "/manus-storage/asyldreams-art-03_6586bdc4.jpg", color: "#BFC5ED", size: "portrait" },
  { id: "04", title: "Взгляд", tag: "Pinterest / Art", image: "/manus-storage/asyldreams-art-04_8bb316da.jpg", color: "#FFD285", size: "portrait" },
  { id: "05", title: "Свет", tag: "Pinterest / Art", image: "/manus-storage/asyldreams-art-05_8e78876f.jpg", color: "#C8DED6", size: "wide" },
];

const lenses = {
  milk: { label: "Молоко", filter: "brightness(1.12) saturate(0.75) contrast(0.92)", color: "#FAF3E8" },
  peach: { label: "Персик", filter: "sepia(0.23) saturate(1.12) hue-rotate(336deg) brightness(1.07)", color: "#FFC1B1" },
  silver: { label: "Серебро", filter: "grayscale(0.78) contrast(1.18) brightness(1.05)", color: "#BFC9D3" },
  aqua: { label: "Синее стекло", filter: "sepia(0.13) saturate(1.3) hue-rotate(150deg) brightness(1.05)", color: "#B9E6E6" },
} as const;

type LensKey = keyof typeof lenses;

export default function Home() {
  const [activeLens, setActiveLens] = useState<LensKey>("milk");
  const [videoSource, setVideoSource] = useState(defaultVideo);
  const [videoName, setVideoName] = useState("движущийся коллаж");
  const fileInput = useRef<HTMLInputElement>(null);
  const lens = lenses[activeLens];

  function chooseVideo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setVideoSource(URL.createObjectURL(file));
    setVideoName(file.name.replace(/\.[^/.]+$/, ""));
  }

  return (
    <div className="paper-site min-h-screen overflow-x-hidden text-[#1d2547]">
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
              <div className="relative z-10 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em]">
                <span>Motion / 01</span>
                <span className="flex items-center gap-2"><Play className="h-3.5 w-3.5 fill-current" /> {videoName}</span>
              </div>
              <div className="video-orbit absolute left-1/2 top-1/2 aspect-square w-[min(83vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1d2547]/20 p-3 sm:w-[min(52vw,480px)]">
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#FAF3E8] bg-[#B9E6E6] shadow-[14px_18px_0_rgba(29,37,71,0.16)]">
                  <video key={videoSource} autoPlay muted loop playsInline className="h-full w-full object-cover transition-[filter] duration-500" style={{ filter: lens.filter }}>
                    <source src={videoSource} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,.46),transparent_34%)]" />
                </div>
              </div>
              <div className="relative z-10 mt-auto grid gap-5 border-t border-[#1d2547]/15 pt-5">
                <div className="flex flex-wrap gap-2" aria-label="Выберите фильтр видео">
                  {(Object.keys(lenses) as LensKey[]).map((key) => (
                    <button key={key} type="button" onClick={() => setActiveLens(key)} aria-pressed={activeLens === key} className={`lens-button ${activeLens === key ? "is-active" : ""}`}>{lenses[key].label}</button>
                  ))}
                </div>
                <button type="button" className="upload-video" onClick={() => fileInput.current?.click()}><Plus className="h-4 w-4" /> Выбрать своё видео</button>
                <input ref={fileInput} className="hidden" type="file" accept="video/*" onChange={chooseVideo} />
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

            <div className="art-layout">
              {artworks.map((artwork) => (
                <a key={artwork.id} href={artBoardUrl} target="_blank" rel="noreferrer" className={`paper-work ${artwork.size}`}>
                  <div className="paper-mat" style={{ backgroundColor: artwork.color }}>
                    <span className="paper-tab">Лист {artwork.id}</span>
                    <img src={artwork.image} alt={artwork.title} className="work-image" />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <div><p className="work-index">{artwork.id} / {artwork.tag}</p><h3 className="juz-heading mt-1 text-3xl tracking-[-0.045em]">{artwork.title}</h3></div>
                    <ArrowDownRight className="mt-2 h-4 w-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="note-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10">
          <div className="mx-auto grid max-w-[1540px] gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div className="sticker-note"><Sparkles className="h-7 w-7" /><span>New mood<br />every frame</span></div>
            <p className="juz-heading max-w-5xl text-[clamp(3rem,5.8vw,7.5rem)] leading-[0.81] tracking-[-0.065em]">КАДРЫ МОГУТ<br /><i className="text-[#F04A36]">МЕНЯТЬ СВЕТ.</i></p>
          </div>
        </section>

        <section id="contacts" className="contacts-paper px-4 pb-8 pt-16 sm:px-7 sm:pt-24 lg:px-10">
          <div className="mx-auto flex max-w-[1540px] flex-col justify-between gap-12 border-t-2 border-[#1d2547] pt-7 lg:flex-row lg:items-end">
            <div><p className="paper-kicker"><span /> AsylDreams / Moving Paper</p><h2 className="juz-heading mt-4 text-[clamp(3.2rem,6.5vw,7.5rem)] leading-[0.8] tracking-[-0.07em]">СМОТРИ<br />ДАЛЬШЕ.</h2></div>
            <div className="flex flex-col gap-2 pb-2">
              <a className="contact-paper" href={pinterestUrl} target="_blank" rel="noreferrer">Pinterest <ArrowDownRight className="h-4 w-4" /></a>
              <a className="contact-paper" href="https://www.instagram.com/ornalya11" target="_blank" rel="noreferrer">Instagram <ArrowDownRight className="h-4 w-4" /></a>
              <a className="contact-paper" href="http://tiktok.com/@ornalya11" target="_blank" rel="noreferrer">TikTok <ArrowDownRight className="h-4 w-4" /></a>
            </div>
          </div>
          <footer className="mx-auto mt-14 max-w-[1540px] border-t border-[#1d2547]/15 py-5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#1d2547]/60">© AsylDreams. Сделано в движении.</footer>
        </section>
      </main>
    </div>
  );
}
