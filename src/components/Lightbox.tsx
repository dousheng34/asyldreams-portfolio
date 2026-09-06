import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { lockScroll } from "@/lib/scroll";
import { works, seriesOf } from "@/data/portfolio";
import ArtImage from "./ArtImage";

// Лайтбокс: плавное открытие, смена кадра с направлением, клавиатура (←/→/Esc) и свайпы.
export default function Lightbox({ keys, index, onClose }: { keys: string[]; index: number; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(index);
  const w = works[keys[i]];
  const s = seriesOf(keys[i]);

  const go = useCallback(
    (dir: 1 | -1) => {
      const next = (i + dir + keys.length) % keys.length;
      if (prefersReducedMotion()) {
        setI(next);
        return;
      }
      gsap
        .timeline()
        .to(frame.current, { xPercent: -6 * dir, opacity: 0, duration: 0.32, ease: "power2.in" })
        .add(() => setI(next))
        .fromTo(frame.current, { xPercent: 6 * dir, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.6, ease: "expo.out" });
    },
    [i, keys.length],
  );

  const close = useCallback(() => {
    if (prefersReducedMotion()) return onClose();
    gsap.to(root.current, { opacity: 0, duration: 0.4, ease: "power2.inOut", onComplete: onClose });
    gsap.to(frame.current, { scale: 0.96, duration: 0.4, ease: "power2.inOut" });
  }, [onClose]);

  useEffect(() => {
    lockScroll(true);
    const el = root.current!;
    if (!prefersReducedMotion()) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo(frame.current, { scale: 0.92, y: 24, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.9, ease: "expo.out", delay: 0.05 });
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    // свайп
    let x0 = 0;
    const down = (e: PointerEvent) => (x0 = e.clientX);
    const up = (e: PointerEvent) => {
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    (el.querySelector("[data-close]") as HTMLElement | null)?.focus();
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerup", up);
    };
  }, [close, go]);

  const portrait = w.h > w.w;
  return (
    <div ref={root} className="fixed inset-0 z-[250] flex flex-col bg-ink/95 text-paper backdrop-blur-md" role="dialog" aria-modal="true" aria-label={`Просмотр: ${w.title}`} onClick={close}>
      <div className="container-x flex items-center justify-between py-5" onClick={(e) => e.stopPropagation()}>
        <span className="eyebrow">
          {s?.title} · {String(i + 1).padStart(2, "0")} / {String(keys.length).padStart(2, "0")}
        </span>
        <button data-close type="button" onClick={close} className="pill" aria-label="Закрыть">
          Закрыть <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16">
        <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border hairline transition-colors hover:bg-paper hover:text-ink sm:flex" aria-label="Предыдущая">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div ref={frame} className={`relative ${portrait ? "h-full max-h-[78vh] aspect-[9/16]" : "w-full max-w-[1200px] aspect-[16/9]"} max-w-full`} onClick={(e) => e.stopPropagation()}>
          <ArtImage work={w} sizes="(min-width:1024px) 80vw, 100vw" eager className="rounded-[2px]" />
        </div>
        <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border hairline transition-colors hover:bg-paper hover:text-ink sm:flex" aria-label="Следующая">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="container-x flex items-center justify-between border-t hairline py-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="display text-[clamp(1.2rem,2.4vw,2rem)] font-medium">{w.title}</h3>
        <span className="eyebrow hidden sm:block">
          {w.w} × {w.h} · ← → листать · Esc закрыть
        </span>
        <div className="flex gap-2 sm:hidden">
          <button type="button" onClick={() => go(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border hairline" aria-label="Предыдущая">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => go(1)} className="flex h-10 w-10 items-center justify-center rounded-full border hairline" aria-label="Следующая">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
