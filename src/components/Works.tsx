import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { featured, works, seriesOf, profile } from "@/data/portfolio";
import { useApp } from "@/lib/store";
import ArtImage from "./ArtImage";
import SectionHead from "./SectionHead";

// Раскладка: 12-колоночная сетка с намеренно рваным ритмом (как разворот журнала).
// col — старт/ширина, off — вертикальное смещение на десктопе. Пропорции рамки берутся из самой работы.
const aspectOf = (w: { w: number; h: number }) => (w.h / w.w > 1.5 ? "aspect-[9/14]" : w.h > w.w ? "aspect-[4/5]" : "aspect-[16/10]");
const layout = [
  { col: "lg:col-start-1 lg:col-span-5", off: "lg:mt-0" },
  { col: "lg:col-start-7 lg:col-span-6", off: "lg:mt-40" },
  { col: "lg:col-start-2 lg:col-span-4", off: "lg:mt-0" },
  { col: "lg:col-start-7 lg:col-span-5", off: "lg:mt-16" },
  { col: "lg:col-start-1 lg:col-span-6", off: "lg:mt-8" },
  { col: "lg:col-start-8 lg:col-span-5", off: "lg:mt-48" },
  { col: "lg:col-start-2 lg:col-span-4", off: "lg:mt-4" },
  { col: "lg:col-start-7 lg:col-span-6", off: "lg:mt-24" },
];

export default function Works() {
  const root = useRef<HTMLElement>(null);
  const { openLightbox } = useApp();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-work]").forEach((card) => {
        const mat = card.querySelector<HTMLElement>(".reveal-img");
        const img = card.querySelector<HTMLElement>("img");
        const meta = card.querySelectorAll("[data-work-meta]");
        gsap.to(mat, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: { trigger: card, start: "top 82%" },
        });
        gsap.from(meta, { y: 18, opacity: 0, duration: 1, stagger: 0.08, scrollTrigger: { trigger: card, start: "top 70%" } });
        // параллакс внутри рамки
        gsap.fromTo(img, { yPercent: -5, scale: 1.1 }, { yPercent: 5, scale: 1.1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="works" className="container-x relative py-24 sm:py-32 lg:py-40">
      <SectionHead index="01" title="Избранные" accent="работы" note={`${featured.length} кадров из трёх серий`} />

      <div className="mt-16 grid grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
        {featured.map((key, i) => {
          const w = works[key];
          const s = seriesOf(key);
          const l = layout[i % layout.length];
          return (
            <article key={key} data-work className={`work-card group ${l.col} ${l.off}`}>
              <button
                type="button"
                data-cursor="Открыть"
                onClick={() => openLightbox(featured, i)}
                className="block w-full text-left"
                aria-label={`Открыть работу ${w.title}`}
              >
                <div className={`work-mat reveal-img ${aspectOf(w)}`} style={{ ["--mat" as string]: w.color }}>
                  <ArtImage work={w} sizes="(min-width:1024px) 45vw, (min-width:640px) 50vw, 100vw" className="scale-[1.1]" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 data-work-meta className="display text-[clamp(1.25rem,2vw,1.75rem)] font-medium">
                    {w.title}
                  </h3>
                  <span data-work-meta className="eyebrow shrink-0">
                    {s?.title} · {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-20 flex justify-center lg:mt-32">
        <a href={profile.pinterest} target="_blank" rel="noreferrer" className="btn-magnetic border hairline px-7 py-4 text-[12px] uppercase tracking-[0.16em]">
          <span className="fill" />
          <span className="flex items-center gap-2">
            Весь архив на Pinterest <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </section>
  );
}
