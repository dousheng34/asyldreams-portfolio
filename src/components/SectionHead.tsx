import { useEffect, useRef } from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";

// Заголовок секции: индекс, крупная строка с построчным появлением и заметка справа.
export default function SectionHead({ index, title, accent, note }: { index: string; title: string; accent?: string; note?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const h = root.current!.querySelector("h2")!;
      const split = new SplitText(h, { type: "lines", linesClass: "mask-line" });
      const inner = split.lines.map((l) => {
        const s = document.createElement("span");
        s.className = "split-line";
        s.innerHTML = l.innerHTML;
        l.innerHTML = "";
        l.appendChild(s);
        return s;
      });
      gsap.from(inner, { yPercent: 110, duration: 1.3, stagger: 0.1, scrollTrigger: { trigger: root.current, start: "top 80%" } });
      gsap.from(root.current!.querySelectorAll("[data-sh-fade]"), { opacity: 0, y: 14, duration: 0.9, stagger: 0.1, scrollTrigger: { trigger: root.current, start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="grid gap-6 border-t hairline pt-6 lg:grid-cols-12">
      <span data-sh-fade className="eyebrow lg:col-span-2">
        ({index})
      </span>
      <h2 className="display text-[clamp(2.6rem,7vw,7rem)] font-semibold lg:col-span-7">
        {title} {accent && <span className="serif-i font-normal text-amber">{accent}</span>}
      </h2>
      {note && (
        <p data-sh-fade className="max-w-[28ch] self-end text-[15px] leading-snug text-mute lg:col-span-3 lg:text-right">
          {note}
        </p>
      )}
    </div>
  );
}
