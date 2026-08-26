import { ArrowDownRight, ArrowUp, ArrowUpRight, Check, ChevronLeft, ChevronRight, Moon, Pencil, Sun, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import ScrollReveal from "@/components/ScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";

// Moving Paper Gallery: a dedicated, edit-friendly Pinterest archive with natural image proportions and no duplicate presentation.
const pinterestUrl = "https://www.pinterest.com/AsylDreams/";
const artBoardUrl = "https://www.pinterest.com/asyldreams/art/";

type Category = "all" | "character" | "landscape" | "portrait";
type Pin = { id: string; title: string; image: string; source: string; category: Exclude<Category, "all">; managed?: boolean };

function LazyPinterestImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return <span className={`lazy-pinterest-image ${loaded ? "is-loaded" : ""}`}><img src={src} alt={alt} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} /></span>;
}

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Все" }, { id: "character", label: "Персонажи" }, { id: "landscape", label: "Пейзажи" }, { id: "portrait", label: "Портреты" },
];

const initialPins: Pin[] = [
  { id: "fresh-01", title: "Облака", image: "/manus-storage/asyldreams-art-01-1200_eca251cd.jpg", source: artBoardUrl, category: "landscape", managed: true },
  { id: "fresh-02", title: "Розовый кадр", image: "/manus-storage/asyldreams-art-02_be1a2e8a.jpg", source: artBoardUrl, category: "character", managed: true },
  { id: "fresh-03", title: "Хаул", image: "/manus-storage/asyldreams-leaf04-howl_12a01b41.jpg", source: artBoardUrl, category: "character", managed: true },
];

const archivePins: Pin[] = [
  { id: "archive-01", title: "Тень", image: "/manus-storage/asyldreams-art-03_6586bdc4.jpg", source: artBoardUrl, category: "portrait" },
  { id: "archive-02", title: "Свет", image: "/manus-storage/asyldreams-art-05_8e78876f.jpg", source: artBoardUrl, category: "portrait" },
  { id: "archive-03", title: "Мягкий портрет", image: "/manus-storage/asyldreams-art-04_0be11e69.jpg", source: artBoardUrl, category: "portrait" },
  { id: "archive-04", title: "Звёздный лист", image: "/manus-storage/asyldreams-space-01_17a24c7c.jpg", source: pinterestUrl, category: "landscape" },
  { id: "archive-05", title: "Тихий кадр", image: "/manus-storage/asyldreams-pinterest-work_b23fd463.jpg", source: pinterestUrl, category: "character" },
  { id: "archive-06", title: "Воздушный портрет", image: "/manus-storage/asyldreams-howl-01_2946edf9.jpg", source: pinterestUrl, category: "portrait" },
];

export default function PinterestGallery() {
  const { theme, toggleTheme } = useTheme();
  const [pins, setPins] = useState<Pin[]>(initialPins);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [isFiltering, setIsFiltering] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("asyldreams-new-pins");
      if (stored) setPins(JSON.parse(stored));
    } catch { /* Архив остаётся доступным с исходной подборкой. */ }
  }, []);

  useEffect(() => {
    const updateTopButton = () => setShowTopButton(window.scrollY > 520);
    updateTopButton();
    window.addEventListener("scroll", updateTopButton, { passive: true });
    return () => window.removeEventListener("scroll", updateTopButton);
  }, []);

  function persist(next: Pin[]) {
    setPins(next);
    try { window.localStorage.setItem("asyldreams-new-pins", JSON.stringify(next)); } catch { /* В крайнем случае изменения живут в текущей сессии. */ }
  }

  function beginEdit(pin: Pin) { setEditing(pin.id); setTitle(pin.title); setSource(pin.source); }
  function saveEdit() {
    if (!editing) return;
    persist(pins.map((pin) => pin.id === editing ? { ...pin, title: title.trim() || pin.title, source: source.trim() || pin.source } : pin));
    setEditing(null);
  }
  function deletePin(id: string) { persist(pins.filter((pin) => pin.id !== id)); if (editing === id) setEditing(null); }
  function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

  const collection = [...pins, ...archivePins];
  const visible = activeCategory === "all" ? collection : collection.filter((pin) => pin.category === activeCategory);
  const previewPin = previewIndex === null ? null : visible[previewIndex];

  useEffect(() => {
    if (previewIndex === null) return;
    const closeByKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewIndex(null);
      if (event.key === "ArrowLeft") setPreviewIndex((index) => index === null ? null : (index - 1 + visible.length) % visible.length);
      if (event.key === "ArrowRight") setPreviewIndex((index) => index === null ? null : (index + 1) % visible.length);
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeByKey);
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener("keydown", closeByKey); };
  }, [previewIndex, visible.length]);

  function chooseCategory(category: Category) {
    if (category === activeCategory) return;
    setActiveCategory(category);
    setPreviewIndex(null);
    setIsFiltering(true);
    window.setTimeout(() => setIsFiltering(false), 420);
  }

  function movePreview(direction: number) { setPreviewIndex((index) => index === null ? 0 : (index + direction + visible.length) % visible.length); }

  return <div className="paper-site pinterest-page page-transition min-h-screen overflow-x-hidden text-[#1d2547]">
    <header className="paper-nav px-4 py-4 sm:px-7 lg:px-10">
      <div className="mx-auto flex max-w-[1540px] items-center justify-between">
        <Link href="/" className="paper-wordmark" aria-label="AsylDreams — на главную"><span className="portal-mark" aria-hidden="true"><span /></span><span>Asyl<br /><i>Dreams</i></span></Link>
        <nav className="hidden gap-7 text-[11px] font-semibold uppercase tracking-[0.14em] md:flex" aria-label="Навигация Pinterest-галереи"><Link href="/">Главная</Link><a href="#all-works">Все работы</a><a href="#pinterest-profile">Pinterest</a></nav>
        <div className="paper-actions"><button type="button" onClick={toggleTheme} className="theme-toggle" aria-label={theme === "light" ? "Включить тёмную тему" : "Включить светлую тему"}>{theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}<span>{theme === "light" ? "Ночь" : "Свет"}</span></button><a className="pinterest-pill" href={pinterestUrl} target="_blank" rel="noreferrer">Pinterest <ArrowDownRight className="h-3.5 w-3.5" /></a></div>
      </div>
    </header>
    <main id="all-works">
      <section className="pinterest-hero px-4 py-14 sm:px-7 sm:py-20 lg:px-10">
        <div className="pinterest-hero-inner mx-auto max-w-[1540px]">
          <ScrollReveal><h1 className="juz-heading text-[clamp(4.6rem,12vw,12rem)] leading-[.7] tracking-[-.085em]">МОИ<br />ПИНЫ</h1></ScrollReveal>
          <ScrollReveal delay={100} className="pinterest-hero-copy"><a href={pinterestUrl} target="_blank" rel="noreferrer">Открыть профиль <ArrowDownRight className="h-5 w-5" /></a></ScrollReveal>
        </div>
      </section>
      <section className="pinterest-archive px-4 pb-20 sm:px-7 sm:pb-28 lg:px-10">
        <div className="mx-auto max-w-[1540px]">
          <ScrollReveal className="pinterest-toolbar"><h2 className="juz-heading text-[clamp(2.9rem,6vw,6.2rem)] leading-[.75] tracking-[-.07em]">ВСЕ<br />РАБОТЫ</h2><div className="pinterest-filters">{categories.map((category) => <button key={category.id} type="button" onClick={() => chooseCategory(category.id)} className={`gallery-filter ${activeCategory === category.id ? "is-active" : ""}`}>{category.label}</button>)}</div></ScrollReveal>
          <div className={`pinterest-grid ${isFiltering ? "is-filtering" : ""}`}>
            {visible.map((pin, index) => <ScrollReveal key={pin.id} delay={(index % 3) * 60} className={`pinterest-tile ${pin.category}`}>
              <article className="pinterest-card">
                <button type="button" className="pinterest-card-link" onClick={() => setPreviewIndex(index)} aria-label={`Открыть работу ${pin.title}`}><LazyPinterestImage src={pin.image} alt={pin.title} /><span className="pinterest-card-overlay"><strong className="juz-heading">{pin.title}</strong><ArrowUpRight className="h-5 w-5" /></span></button>
                {pin.managed && (editing === pin.id ? <div className="pin-inline-editor"><input value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Название пина" /><input value={source} onChange={(event) => setSource(event.target.value)} aria-label="Ссылка пина" /><button type="button" onClick={saveEdit}><Check className="h-3.5 w-3.5" /> Сохранить</button><button type="button" onClick={() => setEditing(null)}>Отмена</button></div> : <div className="pin-card-actions"><button type="button" onClick={() => beginEdit(pin)} aria-label={`Редактировать ${pin.title}`}><Pencil className="h-3.5 w-3.5" /></button><button type="button" onClick={() => deletePin(pin.id)} aria-label={`Удалить ${pin.title}`}><Trash2 className="h-3.5 w-3.5" /></button></div>)}
              </article>
            </ScrollReveal>)}
          </div>
          <ScrollReveal id="pinterest-profile" className="pinterest-end"><p className="juz-heading">БОЛЬШЕ<br />НА PINTEREST</p><a href={pinterestUrl} target="_blank" rel="noreferrer">Смотреть профиль <ArrowDownRight className="h-5 w-5" /></a></ScrollReveal>
        </div>
      </section>
    </main>
    <button type="button" className={`back-to-top ${showTopButton ? "is-visible" : ""}`} onClick={scrollToTop} aria-label="Наверх"><ArrowUp className="h-4 w-4" /><span>Наверх</span></button>
    {previewPin && <div className="lightbox pinterest-lightbox" role="dialog" aria-modal="true" aria-label={`Просмотр работы ${previewPin.title}`} onClick={() => setPreviewIndex(null)}><button type="button" className="lightbox-close" onClick={() => setPreviewIndex(null)} aria-label="Закрыть просмотр"><X className="h-5 w-5" /></button><button type="button" className="lightbox-nav is-left" onClick={(event) => { event.stopPropagation(); movePreview(-1); }} aria-label="Предыдущая работа"><ChevronLeft className="h-8 w-8" /></button><div className="lightbox-frame" onClick={(event) => event.stopPropagation()}><div className="lightbox-mat"><img src={previewPin.image} alt={previewPin.title} /></div><div className="lightbox-meta"><h3 className="juz-heading">{previewPin.title}</h3><a href={previewPin.source || pinterestUrl} target="_blank" rel="noreferrer">Открыть в Pinterest <ArrowUpRight className="h-4 w-4" /></a></div></div><button type="button" className="lightbox-nav is-right" onClick={(event) => { event.stopPropagation(); movePreview(1); }} aria-label="Следующая работа"><ChevronRight className="h-8 w-8" /></button></div>}
  </div>;
}
