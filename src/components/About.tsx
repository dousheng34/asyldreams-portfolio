import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { profile, works } from "@/data/portfolio";
import ArtImage from "./ArtImage";
import SectionHead from "./SectionHead";

// Обо мне: цифры «накручиваются» при появлении, карточка с кадром наклоняется за курсором.
export default function About() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const feature = works["w853011"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();
      root.current!.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        if (reduced) {
          el.textContent = String(target);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString("ru-RU")),
        });
      });
      if (reduced) return;
      gsap.from("[data-about-fade]", { y: 24, opacity: 0, duration: 1, stagger: 0.08, scrollTrigger: { trigger: root.current, start: "top 70%" } });
      gsap.from(card.current, { yPercent: 12, opacity: 0, duration: 1.4, scrollTrigger: { trigger: card.current, start: "top 85%" } });

      // tilt за курсором
      const el = card.current!;
      const rx = gsap.quickTo(el, "rotateX", { duration: 0.8, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotateY", { duration: 0.8, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx(-py * 10);
        ry(px * 12);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="container-x py-24 sm:py-32 lg:py-40">
      <SectionHead index="03" title="Собираю" accent="сны в кадр" />
      <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5" style={{ perspective: "1200px" }}>
          <div ref={card} className="work-mat aspect-[4/5] max-w-[460px] rounded-[2px]" style={{ ["--mat" as string]: feature.color, transformStyle: "preserve-3d" }}>
            <ArtImage work={feature} sizes="(min-width:1024px) 40vw, 100vw" />
            <span className="pointer-events-none absolute bottom-4 left-4 eyebrow text-paper/80">{feature.title} · серия 03</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-12 lg:col-span-6 lg:col-start-7">
          <div className="space-y-6">
            <p data-about-fade className="text-[19px] leading-[1.45] text-paper sm:text-[22px]">
              Я — AsylDreams. Делаю AI-образы, в которых персонажи, цвет и атмосфера становятся отдельными историями: ночные обои для телефона, широкие кинокадры и мягкие портретные серии.
            </p>
            <p data-about-fade className="max-w-[52ch] text-[16px] leading-[1.55] text-mute sm:text-[17px]">
              Каждый кадр проходит один путь: настроение → композиция → палитра → ритм деталей. Так отдельные картинки складываются в узнаваемые серии, а не в ленту случайных генераций.
            </p>
            <div data-about-fade className="flex flex-wrap gap-2 pt-2">
              {["Midjourney", "арт-дирекшн", "цветовой ритм", "вертикальный формат", "короткий монтаж"].map((t) => (
                <span key={t} className="pill pointer-events-none">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-t hairline pt-8">
            {profile.stats.map((s) => (
              <div key={s.label} data-about-fade>
                <dt className="eyebrow">{s.label}</dt>
                <dd className="display mt-2 text-[clamp(2.4rem,4.5vw,4.2rem)] font-medium tabular-nums">
                  <span data-count={s.value}>0</span>
                  {s.suffix && <span className="serif-i text-amber">{s.suffix}</span>}
                </dd>
              </div>
            ))}
          </dl>

          <a data-about-fade href={profile.pinterest} target="_blank" rel="noreferrer" className="link-ul inline-flex items-center gap-2 self-start text-[12px] font-medium uppercase tracking-[0.16em]">
            Профиль на Pinterest <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
