import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { scrollTo } from "@/lib/scroll";
import { profile, works } from "@/data/portfolio";
import ArtImage from "./ArtImage";
import SectionHead from "./SectionHead";

// Услуги: список строк; при наведении рядом с курсором всплывает превью кадра.
export default function Services() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-row]", { y: 30, opacity: 0, duration: 1, stagger: 0.08, scrollTrigger: { trigger: root.current, start: "top 75%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isFinePointer()) return;
    const el = preview.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX + 24);
      yTo(e.clientY - 120);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const el = preview.current!;
    gsap.to(el, { opacity: active === null ? 0 : 1, scale: active === null ? 0.9 : 1, rotate: active === null ? -4 : 0, duration: 0.5, ease: "power3.out" });
  }, [active]);

  return (
    <section ref={root} className="container-x py-24 sm:py-32 lg:py-40">
      <SectionHead index="04" title="Что можно" accent="заказать" note="Форматы, с которыми я работаю чаще всего. Сроки и цену обсуждаем под задачу." />
      <ul className="mt-14 border-t hairline">
        {profile.services.map((s, i) => (
          <li key={s.name} data-row className="border-b hairline">
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => scrollTo("#order", -8)}
              className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-6 text-left transition-colors duration-300 hover:text-amber sm:gap-10 sm:py-8"
            >
              <span className="eyebrow w-8">0{i + 1}</span>
              <span className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-10">
                <span className="display text-[clamp(1.5rem,3.4vw,3.2rem)] font-medium transition-transform duration-500 group-hover:translate-x-2">{s.name}</span>
                <span className="max-w-[46ch] text-[14px] leading-snug text-mute sm:text-[15px]">{s.desc}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
            </button>
          </li>
        ))}
      </ul>

      <div ref={preview} className="pointer-events-none fixed left-0 top-0 z-[80] hidden w-[220px] overflow-hidden rounded-[2px] opacity-0 lg:block" aria-hidden="true">
        <div className="aspect-[3/4] w-full">{active !== null && <ArtImage work={works[profile.services[active].key]} sizes="220px" eager />}</div>
      </div>
    </section>
  );
}
