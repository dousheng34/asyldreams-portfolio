import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { scrollTo } from "@/lib/scroll";
import { useApp } from "@/lib/store";
import { heroKeys, profile } from "@/data/portfolio";
import HeroCanvas from "./HeroCanvas";

// Hero: гигантский заголовок с посимвольным появлением, WebGL-портал справа,
// параллакс при скролле и отдельный ритм для мета-строк.
export default function Hero() {
  const { ready } = useApp();
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();
      const q = gsap.utils.selector(root);
      const split = new SplitText(title.current, { type: "lines,chars", linesClass: "mask-line", charsClass: "split-char" });
      if (reduced) {
        gsap.set([split.chars, q("[data-hero-fade]")], { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
      tl.from(split.chars, { yPercent: 115, rotate: 4, duration: 1.4, stagger: { each: 0.028, from: "start" } })
        .from(q("[data-hero-fade]"), { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, "-=0.9")
        .from(q("[data-hero-line]"), { scaleX: 0, transformOrigin: "left", duration: 1.2 }, "-=0.9");

      // параллакс при скролле
      gsap.to(q("[data-hero-portal]"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(title.current, {
        yPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={root} id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28">
      <div className="container-x relative grid gap-10 pb-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="relative z-10 lg:col-span-8">
          <p data-hero-fade className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber" />
            AI visual artist · Казахстан
          </p>
          <h1 ref={title} className="display whitespace-nowrap text-[clamp(3.2rem,10.4vw,12rem)] font-semibold text-paper">
            Asyl
            <br />
            Dreams
          </h1>
          <div data-hero-line className="my-8 h-px w-full bg-line lg:my-10" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p data-hero-fade className="max-w-[34ch] text-[17px] leading-[1.45] text-paper/80 sm:text-[19px]">
              Ночные 4K-обои, кинокадры и мягкие портретные серии. Образы, которые каждый месяц смотрят{" "}
              <span className="serif-i text-[1.25em] text-amber">350 000+</span> человек.
            </p>
            <div data-hero-fade className="flex items-center gap-3">
              <button type="button" onClick={() => scrollTo("#works", -8)} data-magnetic className="btn-magnetic border hairline px-6 py-3 text-[12px] uppercase tracking-[0.16em]">
                <span className="fill" />
                <span className="flex items-center gap-2">
                  Смотреть работы <ArrowDown className="h-3.5 w-3.5" />
                </span>
              </button>
              <a href={profile.pinterest} target="_blank" rel="noreferrer" className="pill sm:hidden">
                Pinterest <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div data-hero-portal className="relative lg:col-span-4 lg:col-start-9">
          <div className="relative ml-auto aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-[2px] lg:max-h-[72vh]" data-cursor="Листать">
            <HeroCanvas keys={heroKeys} active={ready} className="absolute inset-0" />
          </div>
          <div className="mt-3 flex items-center justify-between lg:max-w-[360px] lg:ml-auto">
            <span data-hero-fade className="eyebrow">Ночные обои</span>
            <span data-hero-fade className="eyebrow">9:16 · 4K</span>
          </div>
        </div>
      </div>

      <div className="container-x relative z-20 flex items-center justify-between border-t hairline bg-ink py-4">
        <span data-hero-fade className="eyebrow">Портфолио 2026</span>
        <span data-hero-fade className="eyebrow hidden sm:block">Midjourney · арт-дирекшн · монтаж</span>
        <span data-hero-fade className="eyebrow">Скролл</span>
      </div>
    </section>
  );
}
