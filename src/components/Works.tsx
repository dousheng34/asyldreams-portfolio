import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { featured, featuredLandscape, featuredPortrait, works, seriesOf, profile } from "@/data/portfolio";
import { useApp } from "@/lib/store";
import ArtImage from "./ArtImage";
import SectionHead from "./SectionHead";

// Работы сгруппированы по формату: сначала вертикальные 9:16 одной сеткой, затем широкие 16:9.
// Внутри блока все рамки одинаковые — ничего не наезжает друг на друга.
function Block({ title, ratio, keys, cols, aspect, offset }: { title: string; ratio: string; keys: string[]; cols: string; aspect: string; offset: number }) {
  const { openLightbox } = useApp();
  return (
    <div data-block className="mt-16 first:mt-14">
      <div className="mb-6 flex items-baseline justify-between border-b hairline pb-3">
        <h3 data-block-fade className="display text-[clamp(1.1rem,1.6vw,1.4rem)]">{title}</h3>
        <span data-block-fade className="eyebrow">{ratio} · {keys.length} работ</span>
      </div>
      <div className={`grid gap-x-4 gap-y-10 sm:gap-x-6 ${cols}`}>
        {keys.map((key, i) => {
          const w = works[key];
          const s = seriesOf(key);
          return (
            <article key={key} data-work className="work-card group">
              <button type="button" data-cursor="Открыть" onClick={() => openLightbox(featured, offset + i)} className="block w-full text-left" aria-label={`Открыть работу ${w.title}`}>
                <div className={`work-mat reveal-img ${aspect}`} style={{ ["--mat" as string]: w.color }}>
                  <ArtImage work={w} sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw" className="scale-[1.08]" />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h4 data-work-meta className="display truncate text-[clamp(1rem,1.3vw,1.25rem)]">{w.title}</h4>
                  <span data-work-meta className="eyebrow shrink-0">{s?.title}</span>
                </div>
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default function Works() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-block]").forEach((block) => {
        gsap.from(block.querySelectorAll("[data-block-fade]"), { y: 14, opacity: 0, duration: 0.9, stagger: 0.08, scrollTrigger: { trigger: block, start: "top 85%" } });
        const cards = block.querySelectorAll<HTMLElement>("[data-work]");
        cards.forEach((card, i) => {
          const mat = card.querySelector<HTMLElement>(".reveal-img");
          const img = card.querySelector<HTMLElement>("img");
          gsap.to(mat, { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power4.inOut", delay: (i % 3) * 0.08, scrollTrigger: { trigger: card, start: "top 85%" } });
          gsap.from(card.querySelectorAll("[data-work-meta]"), { y: 14, opacity: 0, duration: 0.9, delay: 0.2 + (i % 3) * 0.08, scrollTrigger: { trigger: card, start: "top 85%" } });
          gsap.fromTo(img, { yPercent: -4, scale: 1.08 }, { yPercent: 4, scale: 1.08, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="works" className="container-x relative py-24 sm:py-32 lg:py-40">
      <SectionHead index="01" title="Избранные" accent="работы" note={`${featured.length} кадров · два формата, каждый в своей сетке`} />
      <Block title="Вертикальные" ratio="9:16" keys={featuredPortrait} offset={0} cols="grid-cols-2 lg:grid-cols-4" aspect="aspect-[9/16]" />
      <Block title="Широкие" ratio="16:9" keys={featuredLandscape} offset={featuredPortrait.length} cols="grid-cols-1 sm:grid-cols-2" aspect="aspect-[16/9]" />
      <div className="mt-20 flex justify-center lg:mt-28">
        <a href={profile.pinterest} target="_blank" rel="noreferrer" data-magnetic className="btn-magnetic border hairline px-7 py-4 text-[12px] uppercase tracking-[0.16em]">
          <span className="fill" />
          <span className="flex items-center gap-2">
            Весь архив на Pinterest <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </section>
  );
}
