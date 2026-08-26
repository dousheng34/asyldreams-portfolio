import { ArrowDownRight, Check, ChevronLeft, ChevronRight, Filter, Moon, Pencil, Play, Send, Share2, Sparkles, Sun, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// Moving Paper Gallery: light editorial collage where every Pinterest image keeps its native proportion and video remains tactile.
const pinterestUrl = "https://www.pinterest.com/AsylDreams/";
const artBoardUrl = "https://www.pinterest.com/asyldreams/art/";
const defaultVideo = "/manus-storage/asyldreams-public-motion_ab0647f3.mp4";

const artworks = [
  { id: "01", title: "Облака", tag: "Pinterest / Art", category: "landscape", mood: "тихий день", image: "/manus-storage/asyldreams-art-01-1200_eca251cd.jpg", color: "#DDE9B8", size: "wide" },
  { id: "02", title: "Розовый кадр", tag: "Pinterest / Art", category: "character", mood: "персиковый свет", image: "/manus-storage/asyldreams-art-02_be1a2e8a.jpg", color: "#F5C9C0", size: "portrait" },
  { id: "03", title: "Тень", tag: "Pinterest / Art", category: "portrait", mood: "прохладный лист", image: "/manus-storage/asyldreams-art-03_6586bdc4.jpg", color: "#BFC5ED", size: "portrait" },
  { id: "04", title: "Хаул", tag: "Pinterest / Ghibli", category: "character", mood: "небесный ветер", image: "/manus-storage/asyldreams-leaf04-howl_12a01b41.jpg", color: "#BFD4EF", size: "portrait" },
  { id: "05", title: "Свет", tag: "Pinterest / Art", category: "portrait", mood: "молочное стекло", image: "/manus-storage/asyldreams-art-05_8e78876f.jpg", color: "#C8DED6", size: "wide" },
];

type CategoryKey = "all" | "character" | "landscape" | "portrait";

const categories: { id: CategoryKey; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "character", label: "Персонажи" },
  { id: "landscape", label: "Пейзажи" },
  { id: "portrait", label: "Портреты" },
];

type NewPin = { id: string; title: string; image: string; source: string };

const initialNewPins: NewPin[] = [
  { id: "fresh-01", title: "Хаул", image: "/manus-storage/asyldreams-leaf04-howl_12a01b41.jpg", source: artBoardUrl },
  { id: "fresh-02", title: "Розовый кадр", image: "/manus-storage/asyldreams-art-02_be1a2e8a.jpg", source: artBoardUrl },
  { id: "fresh-03", title: "Облака", image: "/manus-storage/asyldreams-art-01-1200_eca251cd.jpg", source: artBoardUrl },
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [loaderPhase, setLoaderPhase] = useState<"visible" | "leaving" | "hidden">("visible");
  const [activeWorkIndex, setActiveWorkIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [galleryTransitioning, setGalleryTransitioning] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");
  const [newPins, setNewPins] = useState<NewPin[]>(initialNewPins);
  const [editingPinId, setEditingPinId] = useState<string | null>(null);
  const [editPinTitle, setEditPinTitle] = useState("");
  const [editPinSource, setEditPinSource] = useState("");
  const [orderStatus, setOrderStatus] = useState<"idle" | "copied" | "ready">("idle");
  const aboutSection = useRef<HTMLElement>(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const activeWork = activeWorkIndex === null ? null : artworks[activeWorkIndex];
  const visibleWorks = activeCategory === "all" ? artworks : artworks.filter((artwork) => artwork.category === activeCategory);

  function moveWork(direction: number) {
    setActiveWorkIndex((index) => index === null ? 0 : (index + direction + artworks.length) % artworks.length);
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoaderPhase("hidden");
      return;
    }
    const beginExit = window.setTimeout(() => setLoaderPhase("leaving"), 920);
    const removeLoader = window.setTimeout(() => setLoaderPhase("hidden"), 1460);
    return () => {
      window.clearTimeout(beginExit);
      window.clearTimeout(removeLoader);
    };
  }, []);

  useEffect(() => {
    const section = aboutSection.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAboutVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    try {
      const storedPins = window.localStorage.getItem("asyldreams-new-pins");
      if (storedPins) setNewPins(JSON.parse(storedPins));
    } catch {
      // Локальное хранение необязательно: блок доступен и в текущей сессии.
    }
  }, []);

  function moveCursor(event: PointerEvent<HTMLDivElement>) {
    setCursor({ x: event.clientX, y: event.clientY });
  }

  function selectCategory(category: CategoryKey) {
    if (category === activeCategory) return;
    setActiveCategory(category);
    setGalleryTransitioning(true);
    window.setTimeout(() => setGalleryTransitioning(false), 360);
  }

  function moveAboutPhoto(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    setPhotoTilt({ x, y });
  }

  async function sharePortfolio() {
    const shareData = { title: "AsylDreams — Мои кадры", text: "Смотри портфолио AsylDreams", url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("copied");
      window.setTimeout(() => setShareStatus("idle"), 2400);
    } catch {
      // Пользователь может закрыть системное окно; в этом случае интерфейс остаётся без ложного подтверждения.
    }
  }

  function persistPins(nextPins: NewPin[]) {
    setNewPins(nextPins);
    try { window.localStorage.setItem("asyldreams-new-pins", JSON.stringify(nextPins)); } catch { /* Изменения остаются в текущей сессии. */ }
  }

  function startPinEdit(pin: NewPin) {
    setEditingPinId(pin.id);
    setEditPinTitle(pin.title);
    setEditPinSource(pin.source);
  }

  function savePinEdit() {
    if (!editingPinId) return;
    persistPins(newPins.map((pin) => pin.id === editingPinId ? { ...pin, title: editPinTitle.trim() || pin.title, source: editPinSource.trim() || pin.source } : pin));
    setEditingPinId(null);
  }

  function deletePin(id: string) {
    persistPins(newPins.filter((pin) => pin.id !== id));
    if (editingPinId === id) setEditingPinId(null);
  }

  async function prepareOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const brief = ["Заявка для AsylDreams", `Тип AI-арта: ${formData.get("artType")}`, `Контакт: ${formData.get("contact")}`, `Идея: ${formData.get("idea")}`, `Референсы: ${formData.get("references") || "не добавлены"}`].join("\n");
    try {
      await navigator.clipboard.writeText(brief);
      setOrderStatus("copied");
    } catch {
      setOrderStatus("ready");
    }
  }

  return (
    <div className="paper-site min-h-screen overflow-x-hidden text-[#1d2547]" onPointerMove={moveCursor}>
      {loaderPhase !== "hidden" && <div className={`paper-loader ${loaderPhase === "leaving" ? "is-leaving" : ""}`} role="status" aria-label="Загружается портфолио AsylDreams">
        <div className="loader-sheet">
          <p className="loader-index">ASYLDREAMS / ПЕРВЫЙ КАДР</p>
          <div className="loader-portal" aria-hidden="true"><span className="loader-lens" /><span className="loader-dot" /></div>
          <p className="loader-title">ОТКРЫВАЕМ<br />СНЫ</p>
          <div className="loader-progress"><span /><i>01 / 01</i></div>
        </div>
      </div>}
      <div className="paper-cursor" aria-hidden="true" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}><span /></div>
      <header className="paper-nav px-4 py-4 sm:px-7 lg:px-10">
        <div className="mx-auto flex max-w-[1540px] items-center justify-between">
          <a href="#top" className="paper-wordmark" aria-label="AsylDreams — в начало">
            <span className="portal-mark" aria-hidden="true"><span /></span>
            <span>Asyl<br /><i>Dreams</i></span>
          </a>
          <nav className="hidden gap-7 text-[11px] font-semibold uppercase tracking-[0.14em] md:flex" aria-label="Основная навигация">
            <a href="#works">Работы</a>
            <a href="#new-pins">Новое</a>
            <a href="#video">Видео</a>
            <a href="#order">Заказать</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <div className="paper-actions">
            <button type="button" onClick={toggleTheme} className="theme-toggle" aria-label={theme === "light" ? "Включить тёмную тему" : "Включить светлую тему"}>
              {theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}<span>{theme === "light" ? "Ночь" : "Свет"}</span>
            </button>
            <a className="pinterest-pill" href={pinterestUrl} target="_blank" rel="noreferrer">Pinterest <ArrowDownRight className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-paper px-4 pb-16 pt-4 sm:px-7 sm:pb-24 lg:px-10">
          <div className="hero-paper-inner mx-auto grid max-w-[1540px] overflow-hidden lg:grid-cols-[1fr_minmax(420px,.88fr)]">
            <div className="hero-copy flex min-h-[540px] flex-col justify-between p-7 sm:p-10 lg:min-h-[680px] lg:p-14">
              <div>
                <p className="paper-kicker"><span /> Кадры, которые меняют настроение</p>
                <h1 className="juz-heading mt-10 max-w-3xl text-[clamp(4.2rem,8.7vw,10rem)] leading-[0.75] tracking-[-0.075em]">МОИ<br />КАДРЫ</h1>
                <p className="mt-9 max-w-sm text-sm font-medium leading-6 text-[#1d2547]/70 sm:text-base">Пять визуальных снов, которым не нужна рамка. Смотри медленно — и выбирай свой цвет для движения.</p>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[#1d2547]/15 pt-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em]">710 подписчиков · 290K взглядов в месяц</span>
                <a href="#works" className="round-arrow" aria-label="Перейти к работам"><ArrowDownRight className="h-5 w-5" /></a>
              </div>
            </div>

            <div id="video" className="video-panel public-video relative flex min-h-[540px] flex-col justify-between overflow-hidden p-7 sm:p-10 lg:min-h-[680px] lg:p-14">
              <div className="video-topline relative z-10 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em]">
                <span>Видео / AsylDreams</span>
                <span className="flex items-center gap-2"><Play className="h-3.5 w-3.5 fill-current" /> Готовая работа</span>
              </div>
              <div className="video-orbit absolute left-1/2 top-1/2 aspect-square w-[min(83vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1d2547]/20 p-3 sm:w-[min(52vw,480px)]">
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#FAF3E8] bg-[#B9E6E6] shadow-[14px_18px_0_rgba(29,37,71,0.16)]">
                  <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                    <source src={defaultVideo} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,.46),transparent_34%)]" />
                </div>
              </div>
              <p className="video-caption relative z-10 mt-auto border-t border-[#1d2547]/15 pt-5">Кадр из авторской серии AsylDreams.</p>
            </div>
          </div>
        </section>

        <section id="works" className="works-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-[1540px]">
            <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
              <div>
                <p className="paper-kicker"><span /> Pinterest / Art board</p>
                <h2 className="juz-heading mt-4 text-[clamp(3.2rem,6vw,6.5rem)] leading-[0.8] tracking-[-0.065em]">ПЯТЬ<br />ИЗБРАННЫХ</h2>
              </div>
              <a href={artBoardUrl} target="_blank" rel="noreferrer" className="text-link">Открыть всю доску <ChevronRight className="h-4 w-4" /></a>
            </div>

            <div className="gallery-filter-bar" aria-label="Фильтры работ">
              <span className="filter-label"><Filter className="h-3.5 w-3.5" /> Смотреть</span>
              {categories.map((category) => <button type="button" key={category.id} onClick={() => selectCategory(category.id)} className={`gallery-filter ${activeCategory === category.id ? "is-active" : ""}`}>{category.label}</button>)}
              <span className="selected-pins-note">Выбранные пины AsylDreams</span>
            </div>
            <div className={`art-layout ${galleryTransitioning ? "is-transitioning" : ""}`}>
              {visibleWorks.map((artwork) => {
                const index = artworks.findIndex((item) => item.id === artwork.id);
                return (
                <button key={artwork.id} type="button" className={`paper-work ${artwork.size}`} onClick={() => setActiveWorkIndex(index)} aria-label={`Открыть работу ${artwork.title}`}>
                  <div className="paper-mat" style={{ backgroundColor: artwork.color }}>
                    <span className="paper-tab">Лист {artwork.id} / {artwork.mood}</span>
                    <img src={artwork.image} alt={artwork.title} className="work-image" decoding="async" />
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

        <section id="new-pins" className="new-pins-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10">
          <div className="new-pins-inner mx-auto max-w-[1540px] p-7 sm:p-10 lg:grid lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:p-14">
            <div>
              <p className="paper-kicker"><span /> Pinterest / Fresh sheet</p>
              <h2 className="juz-heading mt-5 text-[clamp(3.1rem,5.6vw,6.6rem)] leading-[0.78] tracking-[-0.07em]">НОВЫЕ<br />ПИНЫ</h2>
              <p className="new-pins-intro">Свежая подборка готовых работ. Для владельца доступны короткое редактирование названия и ссылки, а также удаление карточки.</p>
              <div className="new-pins-grid mt-8">
                {newPins.length ? newPins.map((pin) => <article key={pin.id} className="new-pin-card"><a href={pin.source || pinterestUrl} target="_blank" rel="noreferrer"><img src={pin.image} alt={pin.title} /><span>{pin.title}</span></a>{editingPinId === pin.id ? <div className="pin-inline-editor"><input value={editPinTitle} onChange={(event) => setEditPinTitle(event.target.value)} aria-label="Название пина" /><input value={editPinSource} onChange={(event) => setEditPinSource(event.target.value)} aria-label="Ссылка пина" /><button type="button" onClick={savePinEdit}>Сохранить</button><button type="button" onClick={() => setEditingPinId(null)}>Отмена</button></div> : <div className="pin-card-actions"><button type="button" onClick={() => startPinEdit(pin)} aria-label={`Редактировать ${pin.title}`}><Pencil className="h-3.5 w-3.5" /></button><button type="button" onClick={() => deletePin(pin.id)} aria-label={`Удалить ${pin.title}`}><Trash2 className="h-3.5 w-3.5" /></button></div>}</article>) : <div className="new-pins-empty"><Sparkles className="h-5 w-5" /><p>Витрина пока<br />без новых работ.</p></div>}
              </div>
            </div>
            <aside className="fresh-pins-note mt-10 lg:mt-0"><span className="portal-mark" aria-hidden="true"><span /></span><p>ВИТРИНА<br />ГОТОВЫХ<br />РАБОТ</p><small>Фото и видео добавляются только при подготовке сайта, а не посетителями.</small></aside>
          </div>
        </section>

        <section className="note-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10">
          <div className="mx-auto grid max-w-[1540px] gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <div className="sticker-note"><Sparkles className="h-7 w-7" /><span>New mood<br />every frame</span></div>
            <p className="juz-heading max-w-5xl text-[clamp(3rem,5.8vw,7.5rem)] leading-[0.81] tracking-[-0.065em]">КАДРЫ МОГУТ<br /><i className="text-[#F04A36]">МЕНЯТЬ СВЕТ</i></p>
          </div>
        </section>

        <section id="about" ref={aboutSection} className="about-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10">
          <div className="about-paper-inner mx-auto grid max-w-[1540px] gap-10 lg:grid-cols-[.74fr_1.26fr] lg:gap-16">
            <div className="about-photo-wrap" onPointerMove={moveAboutPhoto} onPointerLeave={() => setPhotoTilt({ x: 0, y: 0 })} style={{ transform: `perspective(900px) rotateX(${photoTilt.y}deg) rotateY(${photoTilt.x}deg)` }}>
              <img src="/manus-storage/asyldreams-about-character_5420337c.png" alt="Персонаж AsylDreams" className="about-photo" />
            </div>
            <div className={`about-copy ${aboutVisible ? "is-visible" : ""}`}>
              <p className="paper-kicker"><span /> Обо мне / AsylDreams</p>
              <h2 className="juz-heading mt-5 text-[clamp(3.1rem,5.8vw,7.2rem)] leading-[0.8] tracking-[-0.07em]">СОБИРАЮ<br />СНЫ В КАДР</h2>
              <p className="about-text">Я создаю AI-образы, где персонажи, цвет и атмосфера становятся отдельными историями. Мой Pinterest уже собрал 710 подписчиков и около 290K просмотров в месяц — и я продолжаю искать новые миры для каждой серии.</p>
              <div className="about-stats"><span><b>710</b> подписчиков</span><span><b>290K</b> просмотров / месяц</span><span><b>∞</b> будущих миров</span></div>
            </div>
          </div>
        </section>

        <section id="order" className="order-paper px-4 py-16 sm:px-7 sm:py-24 lg:px-10">
          <div className="order-paper-inner mx-auto max-w-[1540px] p-7 sm:p-10 lg:grid lg:grid-cols-[.8fr_1.2fr] lg:gap-16 lg:p-14">
            <div>
              <p className="paper-kicker"><span /> Commission sheet</p>
              <h2 className="juz-heading mt-5 text-[clamp(3.1rem,5.6vw,6.6rem)] leading-[0.78] tracking-[-0.07em]">ЗАКАЖИ<br />СВОЙ МИР</h2>
              <p className="order-intro">Выберите формат, опишите настроение и добавьте ссылки. Форма соберёт готовый бриф, который можно отправить мне в личные сообщения Pinterest или Instagram.</p>
            </div>
            <form className="order-form mt-10 lg:mt-0" onSubmit={prepareOrder}>
              <label className="paper-field"><span>Тип AI-арта</span><select name="artType" defaultValue="Персонаж"><option>Персонаж</option><option>Портрет</option><option>Пейзаж</option><option>Обложка / постер</option><option>Серия кадров</option></select></label>
              <label className="paper-field"><span>Где связаться</span><input name="contact" required placeholder="Instagram, Telegram или email" /></label>
              <label className="paper-field"><span>Идея и настроение</span><textarea name="idea" required rows={4} placeholder="Кого или что вы хотите увидеть? Какие эмоции и цвета важны?" /></label>
              <label className="paper-field"><span>Ссылки на референсы</span><textarea name="references" rows={3} placeholder="Pinterest, Behance, сайт или любая ссылка" /></label>
              <button type="submit" className="order-submit"><Send className="h-4 w-4" /> Собрать заявку</button>
              {orderStatus === "copied" && <p className="form-status"><Check className="h-4 w-4" /> Бриф скопирован. Отправьте его в личные сообщения.</p>}
              {orderStatus === "ready" && <p className="form-status">Бриф готов. Скопируйте текст вручную и отправьте его в личные сообщения.</p>}
            </form>
          </div>
        </section>

        <section id="contacts" className="contacts-paper px-4 pb-8 pt-16 sm:px-7 sm:pt-24 lg:px-10">
          <div className="contact-plate mx-auto max-w-[1540px] overflow-hidden p-7 sm:p-10 lg:grid lg:grid-cols-[1.1fr_.9fr] lg:p-14">
            <div className="flex flex-col justify-between gap-12">
              <div><p className="paper-kicker"><span /> AsylDreams / Moving Paper</p><h2 className="juz-heading mt-5 text-[clamp(3.2rem,6.5vw,7.5rem)] leading-[0.8] tracking-[-0.07em]">СМОТРИ<br />ДАЛЬШЕ</h2></div>
              <a className="pinterest-portal" href={pinterestUrl} target="_blank" rel="noreferrer"><span className="portal-orbit"><span>P</span></span><span>Смотреть в Pinterest</span><ArrowDownRight className="h-6 w-6" /></a>
              <button type="button" className="share-paper" onClick={sharePortfolio}>{shareStatus === "copied" ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}{shareStatus === "copied" ? "Ссылка скопирована" : "Поделиться"}</button>
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
