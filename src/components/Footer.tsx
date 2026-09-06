import { useEffect, useRef } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { scrollTo } from "@/lib/scroll";
import { useLocalTime } from "@/lib/hooks";
import { profile } from "@/data/portfolio";

// Футер: гигантский контурный логотип выезжает снизу, ссылки, время и «наверх».
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const time = useLocalTime();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-foot-word]", { yPercent: 60, opacity: 0, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 85%" } });
      gsap.from("[data-foot-fade]", { y: 16, opacity: 0, duration: 0.9, stagger: 0.06, scrollTrigger: { trigger: root.current, start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} id="contacts" className="relative overflow-hidden border-t hairline">
      <div className="container-x grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-foot-fade className="eyebrow">Смотри дальше</p>
          <a data-foot-fade href={profile.pinterest} target="_blank" rel="noreferrer" className="display mt-4 inline-flex items-center gap-3 text-[clamp(1.6rem,3vw,2.6rem)] font-medium hover:text-amber transition-colors">
            pinterest.com/AsylDreams <ArrowUpRight className="h-6 w-6" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:col-start-7">
          <div data-foot-fade className="space-y-3">
            <p className="eyebrow">Навигация</p>
            {[
              ["#works", "Работы"],
              ["#series", "Серии"],
              ["#about", "Обо мне"],
              ["#order", "Заказать"],
            ].map(([h, l]) => (
              <a
                key={h}
                href={h}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(h, -8);
                }}
                className="link-ul block text-[15px]"
              >
                {l}
              </a>
            ))}
          </div>
          <div data-foot-fade className="space-y-3">
            <p className="eyebrow">Снаружи</p>
            <a href={profile.pinterest} target="_blank" rel="noreferrer" className="link-ul block text-[15px]">
              Pinterest
            </a>
            <a href={profile.github + "/asyldreams-portfolio"} target="_blank" rel="noreferrer" className="link-ul block text-[15px]">
              Исходники на GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="container-x flex items-end justify-between pb-4">
        <span data-foot-fade className="eyebrow">© 2026 AsylDreams · Актобе {time}</span>
        <button type="button" onClick={() => scrollTo(0)} className="pill" aria-label="Наверх">
          Наверх <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="container-x overflow-hidden pt-4">
        <p data-foot-word className="display outline-text -mb-[0.16em] whitespace-nowrap text-[clamp(4rem,17.5vw,20rem)] font-semibold leading-none" aria-hidden="true">
          AsylDreams
        </p>
      </div>
    </footer>
  );
}
