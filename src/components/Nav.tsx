import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { getLenis, lockScroll, scrollTo } from "@/lib/scroll";
import { useLocalTime } from "@/lib/hooks";
import { profile } from "@/data/portfolio";
import { useApp } from "@/lib/store";

const links = [
  { href: "#works", label: "Работы" },
  { href: "#series", label: "Серии" },
  { href: "#about", label: "Обо мне" },
  { href: "#order", label: "Заказать" },
];

// Навигация: прячется при скролле вниз, возвращается при скролле вверх.
// На мобильных — полноэкранное меню с каскадным появлением ссылок.
export default function Nav() {
  const { ready } = useApp();
  const bar = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const time = useLocalTime();

  useEffect(() => {
    if (!ready) return;
    gsap.fromTo(bar.current, { yPercent: -100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.2, delay: 0.4 });
  }, [ready]);

  useEffect(() => {
    const el = bar.current!;
    let last = 0;
    let hidden = false;
    const onScroll = (y: number) => {
      const dir = y > last ? 1 : -1;
      last = y;
      const shouldHide = dir === 1 && y > 140;
      if (shouldHide !== hidden) {
        hidden = shouldHide;
        gsap.to(el, { yPercent: hidden ? -100 : 0, duration: 0.7, ease: "power3.out", overwrite: true });
      }
    };
    const lenis = getLenis();
    if (lenis) {
      const fn = ({ scroll }: { scroll: number }) => onScroll(scroll);
      lenis.on("scroll", fn);
      return () => lenis.off("scroll", fn);
    }
    const fn = () => onScroll(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const ov = overlay.current!;
    lockScroll(open);
    if (open) {
      gsap.set(ov, { display: "flex" });
      gsap
        .timeline()
        .fromTo(ov, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power4.inOut" })
        .fromTo(ov.querySelectorAll("[data-menu-item]"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.07 }, "-=0.45")
        .fromTo(ov.querySelectorAll("[data-menu-meta]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, "-=0.6");
    } else {
      gsap.to(ov, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "power4.inOut", onComplete: () => gsap.set(ov, { display: "none" }) });
    }
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollTo(href, -8), open ? 500 : 0);
  };

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-[120] opacity-0" style={{ transform: "translateY(-100%)" }}>
        <div className="nav-blur pointer-events-none absolute inset-0 h-[140%]" />
        <div className="container-x relative flex items-center justify-between py-5">
          <a href="#top" onClick={go("#top")} className="display text-[15px] font-semibold tracking-tight" aria-label="AsylDreams — в начало">
            Asyl<span className="serif-i text-[19px] text-amber">Dreams</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={go(l.href)} className="link-ul text-[12px] font-medium uppercase tracking-[0.16em]">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="hidden text-[12px] tabular-nums tracking-[0.12em] text-mute lg:block" aria-label="Местное время">
              Актобе {time}
            </span>
            <a href={profile.pinterest} target="_blank" rel="noreferrer" className="pill hidden sm:inline-flex">
              Pinterest <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border hairline md:hidden"
            >
              <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
              <span className={`absolute h-px w-4 bg-paper transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-px w-4 bg-paper transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu"
        ref={overlay}
        className="fixed inset-0 z-[110] hidden flex-col justify-between bg-ink-2 px-5 pb-8 pt-28 text-paper"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
          {links.map((l, i) => (
            <span key={l.href} className="mask-line">
              <a data-menu-item href={l.href} onClick={go(l.href)} className="display inline-flex items-baseline gap-4 text-[clamp(2.6rem,12vw,4.5rem)] font-medium">
                <span className="font-sans text-[12px] font-normal tracking-[0.2em] text-mute">0{i + 1}</span>
                {l.label}
              </a>
            </span>
          ))}
        </nav>
        <div className="flex items-end justify-between">
          <a data-menu-meta href={profile.pinterest} target="_blank" rel="noreferrer" className="pill">
            Pinterest <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <span data-menu-meta className="text-[12px] tabular-nums text-mute">
            Актобе {time}
          </span>
        </div>
      </div>
    </>
  );
}
