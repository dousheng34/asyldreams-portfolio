import { useEffect, useRef } from "react";
import { gsap, isFinePointer } from "@/lib/gsap";

// Кастомный курсор: точка с инерцией, режим "hover" для ссылок и
// режим "label" для карточек работ (data-cursor="Открыть").
export default function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isFinePointer()) return;
    const cursor = el.current!;
    document.body.classList.add("has-cursor");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      xTo(target.x);
      yTo(target.y);
      cursor.classList.remove("is-hidden");
    };
    const onLeave = () => cursor.classList.add("is-hidden");

    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, [role=button]");
      if (!t) {
        cursor.classList.remove("is-hover", "is-label");
        return;
      }
      const text = t.dataset.cursor;
      if (text) {
        if (label.current) label.current.textContent = text;
        cursor.classList.add("is-label");
        cursor.classList.remove("is-hover");
      } else {
        cursor.classList.add("is-hover");
        cursor.classList.remove("is-label");
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={el} className="cursor is-hidden" aria-hidden="true">
      <span ref={label} className="cursor-label" />
    </div>
  );
}
