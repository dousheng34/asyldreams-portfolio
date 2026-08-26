import { ArrowDownRight, Check, ChevronLeft, ChevronRight, Moon, Play, Send, Share2, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent } from "react";
import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";

// Moving Paper Gallery: minimal home selection directs visitors to a dedicated Pinterest archive for the complete work collection.
const pinterestUrl = "https://www.pinterest.com/AsylDreams/";
const defaultVideo = "/manus-storage/asyldreams-public-motion_ab0647f3.mp4";
const featuredWorks = [
  { id: "01", title: "Облака", image: "/manus-storage/asyldreams-art-01-1200_eca251cd.jpg", color: "#DDE9B8", size: "wide" },
  { id: "02", title: "Розовый кадр", image: "/manus-storage/asyldreams-art-02_be1a2e8a.jpg", color: "#F5C9C0", size: "portrait" },
  { id: "03", title: "Тень", image: "/manus-storage/asyldreams-art-03_6586bdc4.jpg", color: "#BFC5ED", size: "portrait" },
  { id: "04", title: "Хаул", image: "/manus-storage/asyldreams-leaf04-howl_12a01b41.jpg", color: "#BFD4EF", size: "portrait" },
  { id: "05", title: "Свет", image: "/manus-storage/asyldreams-art-05_8e78876f.jpg", color: "#C8DED6", size: "wide" },
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [loaderPhase, setLoaderPhase] = useState<"visible" | "leaving" | "hidden">("visible");
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");
  const [orderStatus, setOrderStatus] = useState<"idle" | "copied" | "ready">("idle");
  const activeWork = activeWorkIndex === null ? null : featuredWorks[activeWorkIndex];
  const aboutSection = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setLoaderPhase("hidden"); return; }
    const exit = window.setTimeout(() => setLoaderPhase("leaving"), 920);
    const hide = window.setTimeout(() => setLoaderPhase("hidden"), 1460);
    return () => { window.clearTimeout(exit); window.clearTimeout(hide); };
  }, []);

  function moveAboutPhoto(event: PointerEvent<HTMLDivElement>) { const rect = event.currentTarget.getBoundingClientRect(); setPhotoTilt({ x: ((event.clientX - rect.left) / rect.width - .5) * 8, y: ((event.clientY - rect.top) / rect.height - .5) * -8 }); }
  function moveWork(direction: number) { setActiveWorkIndex((index) => index === null ? 0 : (index + direction + featuredWorks.length) % featuredWorks.length); }
  async function sharePortfolio() {
    const data = { title: "AsylDreams — Мои кадры", text: "Смотри портфолио AsylDreams", url: window.location.href };
    try { if (navigator.share) { await navigator.share(data); return; } await navigator.clipboard.writeText(window.location.href); setShareStatus("copied"); window.setTimeout(() => setShareStatus("idle"), 2400); } catch { /* Окно распространения можно закрыть без сообщения об ошибке. */ }
  }
  async function prepareOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const brief = ["Заявка для AsylDreams", `Тип AI-арта: ${data.get("artType")}`, `Контакт: ${data.get("contact")}`, `Идея: ${data.get("idea")}`, `Референсы: ${data.get("references") || "не добавлены"}`].join("\n");
    try { await navigator.clipboard.writeText(brief); setOrderStatus("copied"); } catch { setOrderStatus("ready"); }
  }

  return <div className="paper-site page-transition min-h-screen overflow-x-hidden text-[#1d2547]">
    {loaderPhase !== "hidden" && <div className={`paper-loader ${loaderPhase === "leaving" ? "is-leaving" : ""}`} role="status" aria-label="Загружается портфолио AsylDreams"><div className="loader-sheet"><div className="loader-portal" aria-hidden="true"><span className="loader-lens" /><span className="loader-dot" /></div><p className="loader-title">ОТКРЫВАЕМ<br />СНЫ</p><div className="loader-progress"><span /></div></div></div>}
    <header className="paper-nav px-4 py-4 sm:px-7 lg:px-10"><div className="mx-auto flex max-w-[1540px] items-center justify-between"><a href="#top" className="paper-wordmark" aria-label="AsylDreams — в начало"><span className="portal-mark" aria-hidden="true"><span /></span><span>Asyl<br /><i>Dreams</i></span></a><nav className="hidden gap-7 text-[11px] font-semibold uppercase tracking-[0.14em] md:flex" aria-label="Основная навигация"><a href="#works">Работы</a><Link href="/pinterest">Pinterest</Link><a href="#order">Заказать</a><a href="#contacts">Контакты</a></nav><div className="paper-actions"><button type="button" onClick={toggleTheme} className="theme-toggle" aria-label={theme === "light" ? "Включить тёмную тему" : "Включить светлую тему"}>{theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}<span>{theme === "light" ? "Ночь" : "Свет"}</span></button><Link href="/pinterest" className="pinterest-pill">Pinterest <ArrowDownRight className="h-3.5 w-3.5" /></Link></div></div></header>
    <main id="top">
      <section className="hero-paper px-4 pb-16 pt-4 sm:px-7 sm:pb-24 lg:px-10"><div className="hero-paper-inner mx-auto grid max-w-[1540px] overflow-hidden lg:grid-cols-[1fr_minmax(420px,.88fr)]"><div className="hero-copy flex min-h-[540px] flex-col justify-between p-7 sm:p-10 lg:min-h-[680px] lg:p-14"><ScrollReveal><h1 className="juz-heading max-w-3xl text-[clamp(4.2rem,8.7vw,10rem)] leading-[0.75] tracking-[-0.075em]">МОИ<br />КАДРЫ</h1></ScrollReveal><a href="#works" className="round-arrow self-end" aria-label="Перейти к работам"><ArrowDownRight className="h-5 w-5" /></a></div><div className="video-panel public-video relative flex min-h-[540px] items-center justify-center overflow-hidden p-7 sm:p-10 lg:min-h-[680px]"><div className="video-orbit aspect-square w-[min(83vw,430px)] rounded-full border border-[#1d2547]/20 p-3 sm:w-[min(52vw,480px)]"><div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#FAF3E8] bg-[#B9E6E6] shadow-[14px_18px_0_rgba(29,37,71,0.16)]"><video autoPlay muted loop playsInline className="h-full w-full object-cover"><source src={defaultVideo} type="video/mp4" /></video></div></div></div></div></section>
      <section id="works" className="works-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10"><div className="mx-auto max-w-[1540px]"><ScrollReveal className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end"><h2 className="juz-heading text-[clamp(3.2rem,6vw,6.5rem)] leading-[0.8] tracking-[-0.065em]">ИЗБРАННЫЕ<br />РАБОТЫ</h2><Link href="/pinterest" className="text-link">Все работы <ArrowDownRight className="h-4 w-4" /></Link></ScrollReveal><div className="art-layout">{featuredWorks.map((work, index) => <ScrollReveal key={work.id} delay={(index % 3) * 60} className={`paper-work ${work.size}`}><button type="button" onClick={() => setActiveWorkIndex(index)} aria-label={`Открыть работу ${work.title}`}><div className="paper-mat" style={{ backgroundColor: work.color }}><img src={work.image} alt={work.title} className="work-image" decoding="async" /></div><h3 className="juz-heading mt-3 text-3xl tracking-[-.045em]">{work.title}</h3></button></ScrollReveal>)}</div></div></section>
      <section className="note-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10"><ScrollReveal className="mx-auto max-w-[1540px]"><p className="juz-heading max-w-5xl text-[clamp(3rem,5.8vw,7.5rem)] leading-[0.81] tracking-[-0.065em]">КАДРЫ МОГУТ<br /><i className="text-[#F04A36]">МЕНЯТЬ СВЕТ</i></p></ScrollReveal></section>
      <section id="about" ref={aboutSection} className="about-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10"><div className="about-paper-inner mx-auto grid max-w-[1540px] gap-10 lg:grid-cols-[.74fr_1.26fr] lg:gap-16"><div className="about-photo-wrap" onPointerMove={moveAboutPhoto} onPointerLeave={() => setPhotoTilt({ x: 0, y: 0 })} style={{ transform: `perspective(900px) rotateX(${photoTilt.y}deg) rotateY(${photoTilt.x}deg)` }}><img src="/manus-storage/asyldreams-about-character_5420337c.png" alt="Персонаж AsylDreams" className="about-photo" /></div><ScrollReveal className="about-copy"><h2 className="juz-heading text-[clamp(3.1rem,5.8vw,7.2rem)] leading-[0.8] tracking-[-0.07em]">СОБИРАЮ<br />СНЫ В КАДР</h2><p className="about-text">Я создаю AI-образы, где персонажи, цвет и атмосфера становятся отдельными историями. Pinterest AsylDreams уже смотрят тысячи людей каждый месяц.</p></ScrollReveal></div></section>
      <section id="order" className="order-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10"><div className="order-paper-inner mx-auto max-w-[1540px] p-7 sm:p-10 lg:grid lg:grid-cols-[.8fr_1.2fr] lg:gap-16 lg:p-14"><ScrollReveal><h2 className="juz-heading text-[clamp(3.1rem,5.6vw,6.6rem)] leading-[0.78] tracking-[-0.07em]">ЗАКАЖИ<br />СВОЙ МИР</h2></ScrollReveal><form className="order-form mt-10 lg:mt-0" onSubmit={prepareOrder}><label className="paper-field"><span>Тип AI-арта</span><select name="artType" defaultValue="Персонаж"><option>Персонаж</option><option>Портрет</option><option>Пейзаж</option><option>Обложка / постер</option><option>Серия кадров</option></select></label><label className="paper-field"><span>Где связаться</span><input name="contact" required placeholder="Instagram, Telegram или email" /></label><label className="paper-field"><span>Идея</span><textarea name="idea" required rows={4} placeholder="Опишите ваш мир" /></label><label className="paper-field"><span>Референсы</span><textarea name="references" rows={3} placeholder="Ссылки на Pinterest, Behance или сайт" /></label><button type="submit" className="order-submit"><Send className="h-4 w-4" /> Собрать заявку</button>{orderStatus === "copied" && <p className="form-status"><Check className="h-4 w-4" /> Бриф скопирован</p>}{orderStatus === "ready" && <p className="form-status">Бриф готов для отправки</p>}</form></div></section>
      <section id="contacts" className="contacts-paper px-4 pb-8 pt-16 sm:px-7 sm:pt-24 lg:px-10"><div className="contact-plate mx-auto flex max-w-[1540px] flex-col justify-between gap-12 overflow-hidden p-7 sm:p-10 lg:flex-row lg:items-end lg:p-14"><ScrollReveal><h2 className="juz-heading text-[clamp(3.2rem,6.5vw,7.5rem)] leading-[0.8] tracking-[-0.07em]">СМОТРИ<br />ДАЛЬШЕ</h2></ScrollReveal><div className="flex flex-col gap-3"><a className="pinterest-portal" href={pinterestUrl} target="_blank" rel="noreferrer"><span className="portal-orbit"><span>P</span></span><span>Pinterest</span><ArrowDownRight className="h-6 w-6" /></a><button type="button" className="share-paper" onClick={sharePortfolio}>{shareStatus === "copied" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}{shareStatus === "copied" ? "Ссылка скопирована" : "Поделиться"}</button></div></div></section>
      {activeWork && activeWorkIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Просмотр работы ${activeWork.title}`} onClick={() => setActiveWorkIndex(null)}><button type="button" className="lightbox-close" onClick={() => setActiveWorkIndex(null)} aria-label="Закрыть просмотр"><X className="h-5 w-5" /></button><button type="button" className="lightbox-nav is-left" onClick={(event) => { event.stopPropagation(); moveWork(-1); }} aria-label="Предыдущая работа"><ChevronLeft className="h-8 w-8" /></button><div className="lightbox-frame" onClick={(event) => event.stopPropagation()}><div className="lightbox-mat" style={{ backgroundColor: activeWork.color }}><img src={activeWork.image} alt={activeWork.title} /></div><div className="lightbox-meta"><h3 className="juz-heading">{activeWork.title}</h3><Link href="/pinterest">Все работы <ArrowDownRight className="h-4 w-4" /></Link></div></div><button type="button" className="lightbox-nav is-right" onClick={(event) => { event.stopPropagation(); moveWork(1); }} aria-label="Следующая работа"><ChevronRight className="h-8 w-8" /></button></div>}
    </main>
  </div>;
}
