import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useMedia(query: string) {
  const [match, setMatch] = useState(() => (typeof window !== "undefined" ? window.matchMedia(query).matches : false));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = () => setMatch(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [query]);
  return match;
}

export function useLocalTime(timeZone = "Asia/Aqtobe") {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit", timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}

export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
