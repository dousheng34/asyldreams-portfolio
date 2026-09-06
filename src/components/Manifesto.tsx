import { useEffect, useRef } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";

// Манифест: слова проявляются по мере скролла (scrub), как будто текст читают вслух.
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const p = root.current!.querySelector("p")!;
      const split = new SplitText(p, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        { opacity: 1, stagger: 0.06, ease: "none", scrollTrigger: { trigger: p, start: "top 78%", end: "bottom 45%", scrub: 0.4 } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="container-x py-28 sm:py-36 lg:py-48">
      <div className="grid gap-8 lg:grid-cols-12">
        <span className="eyebrow lg:col-span-2">Манифест</span>
        <p className="display max-w-[22ch] text-[clamp(1.9rem,4.6vw,4.6rem)] font-medium leading-[1.05] normal-case lg:col-span-10">
          Кадр — это не картинка, а настроение, которое остаётся на экране блокировки месяцами. Я собираю свет, цвет и тишину так, чтобы
          <span className="serif-i text-amber"> хотелось смотреть ещё</span>.
        </p>
      </div>
    </section>
  );
}
