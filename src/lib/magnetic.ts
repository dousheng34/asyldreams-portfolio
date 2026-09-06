import { gsap, isFinePointer, prefersReducedMotion } from "./gsap";

// Магнитные кнопки: элемент с data-magnetic тянется к курсору и мягко возвращается.
export function initMagnetic(root: ParentNode = document) {
  if (!isFinePointer() || prefersReducedMotion()) return () => {};
  const cleanups: Array<() => void> = [];
  root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}
