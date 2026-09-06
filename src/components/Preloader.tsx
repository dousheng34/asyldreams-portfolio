import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { works, heroKeys } from "@/data/portfolio";

// Прелоадер: счётчик 0→100 привязан к реальной загрузке hero-изображений,
// затем шторка уходит вверх и отдаёт управление hero-анимации.
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setGone(true);
      onDone();
      return;
    }
    const el = root.current!;
    const progress = { v: 0 };
    let loaded = 0;
    const total = heroKeys.length;
    const minTime = 1400;
    const start = performance.now();

    const render = () => {
      if (counter.current) counter.current.textContent = String(Math.round(progress.v)).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${progress.v / 100})`;
    };

    const tweenTo = (v: number, d = 0.6) => gsap.to(progress, { v, duration: d, ease: "power2.out", onUpdate: render, overwrite: true });

    // предзагрузка hero-кадров — счётчик идёт вместе с ней
    heroKeys.forEach((k) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded += 1;
        tweenTo(Math.min(92, 10 + (loaded / total) * 82));
        if (loaded === total) finish();
      };
      img.src = works[k].src;
    });
    tweenTo(10, 0.5);

    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, minTime - (performance.now() - start));
      gsap.delayedCall(wait / 1000, () => {
        const tl = gsap.timeline({
          onComplete: () => {
            setGone(true);
          },
        });
        tl.to(progress, { v: 100, duration: 0.45, ease: "power3.inOut", onUpdate: render })
          .to(el.querySelectorAll("[data-pl-fade]"), { yPercent: -120, opacity: 0, duration: 0.7, ease: "power3.inOut", stagger: 0.04 }, "+=0.15")
          .add(() => onDone(), "-=0.2")
          .to(el, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "power4.inOut" }, "-=0.35");
      });
    }
    const safety = window.setTimeout(finish, 5000);
    return () => window.clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[300] flex flex-col justify-between bg-ink px-5 py-6 text-paper sm:px-8 lg:px-12"
      style={{ clipPath: "inset(0 0 0 0)" }}
      aria-live="polite"
      aria-label="Загрузка портфолио"
    >
      <div className="flex items-start justify-between">
        <span data-pl-fade className="eyebrow">AsylDreams — портфолио</span>
        <span data-pl-fade className="eyebrow">2026</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <p data-pl-fade className="display max-w-[14ch] text-[clamp(1.5rem,3.4vw,3rem)] font-medium leading-[1] text-paper/70">
          Собираю <span className="serif-i text-paper">сны</span>
          <br />в кадр
        </p>
        <span data-pl-fade ref={counter} className="display tabular-nums text-[clamp(4rem,14vw,12rem)] font-light leading-none">
          000
        </span>
      </div>
      <span ref={bar} className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-amber" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
