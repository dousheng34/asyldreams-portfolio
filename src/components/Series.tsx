import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { series, works } from "@/data/portfolio";
import { useApp } from "@/lib/store";
import ArtImage from "./ArtImage";
import SectionHead from "./SectionHead";

// Серии: на десктопе секция закрепляется, а лента серий едет горизонтально по скроллу.
// На планшетах/мобильных — обычная вертикальная раскладка.
export default function Series() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const { openLightbox } = useApp();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const t = track.current!;
      const getX = () => -(t.scrollWidth - window.innerWidth);
      const tween = gsap.to(t, {
        x: getX,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${t.scrollWidth - window.innerWidth + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (st) => {
            if (progress.current) progress.current.style.transform = `scaleX(${st.progress})`;
          },
        },
      });
      // параллакс картинок внутри панелей относительно движения ленты
      gsap.utils.toArray<HTMLElement>("[data-panel] img", t).forEach((img) => {
        gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${t.scrollWidth}`, scrub: true } });
      });
      return () => tween.kill();
    });
    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((p) => {
        gsap.from(p, { y: 40, opacity: 0, duration: 1.1, scrollTrigger: { trigger: p, start: "top 85%" } });
      });
    });
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="series" className="relative overflow-hidden py-24 sm:py-32 lg:h-[100svh] lg:py-0">
      <div className="container-x lg:absolute lg:inset-x-0 lg:top-8 lg:z-10">
        <SectionHead index="02" title="Авторские" accent="серии" note="Каждая серия — один визуальный язык: палитра, свет, формат." />
      </div>

      <div ref={track} className="mt-14 flex flex-col gap-16 lg:mt-0 lg:h-full lg:flex-row lg:items-end lg:gap-0 lg:pb-20 lg:pt-56">
        {series.map((s) => {
          const cover = works[s.works[0]];
          return (
            <article
              key={s.slug}
              data-panel
              className="container-x flex shrink-0 flex-col gap-8 lg:w-auto lg:flex-row lg:items-end lg:gap-10 lg:pr-[8vw]"
            >
              <button
                type="button"
                data-cursor="Смотреть"
                onClick={() => openLightbox(s.works, 0)}
                className="work-card group relative block w-full text-left lg:h-[50vh] lg:w-auto"
                aria-label={`Открыть серию ${s.title}`}
              >
                <div className={`work-mat lg:h-full lg:w-auto ${s.ratio === "16:9" ? "aspect-[16/9]" : "aspect-[9/16]"}`} style={{ ["--mat" as string]: cover.color }}>
                  <ArtImage work={cover} sizes="(min-width:1024px) 40vw, 100vw" className="scale-[1.18]" />
                  <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-paper backdrop-blur">
                    {s.works.length} работ
                  </span>
                </div>
              </button>

              <div className="flex min-w-0 flex-1 flex-col justify-between gap-8 lg:h-[50vh] lg:w-[26vw] lg:flex-none">
                <div>
                  <p className="eyebrow">{s.eyebrow} · {s.ratio}</p>
                  <h3 className="display mt-3 text-[clamp(1.8rem,2.6vw,2.9rem)] leading-[0.95]">{s.title}</h3>
                  <p className="mt-5 max-w-[38ch] text-[16px] leading-[1.5] text-paper/70 sm:text-[17px]">{s.desc}</p>
                </div>
                <div>
                  <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-4">
                    {s.works.slice(1, 7).map((k, j) => (
                      <button
                        key={k}
                        type="button"
                        data-cursor="Открыть"
                        onClick={() => openLightbox(s.works, j + 1)}
                        className={`relative shrink-0 overflow-hidden rounded-[2px] opacity-70 transition-opacity duration-300 hover:opacity-100 ${s.ratio === "16:9" ? "h-14 w-24" : "h-24 w-[54px]"}`}
                        aria-label={`Открыть ${works[k].title}`}
                      >
                        <ArtImage work={works[k]} sizes="80px" />
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={() => openLightbox(s.works, 0)} className="link-ul inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em]">
                    Смотреть серию <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              
            </article>
          );
        })}
      </div>

      <div className="container-x pointer-events-none absolute inset-x-0 bottom-8 hidden items-center justify-between lg:flex">
        <span className="eyebrow">Скролл — лента движется</span>
        <span className="relative h-px w-40 bg-line">
          <span ref={progress} className="absolute inset-0 origin-left bg-amber" style={{ transform: "scaleX(0)" }} />
        </span>
      </div>
    </section>
  );
}
