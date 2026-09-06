import { useCallback, useEffect, useMemo, useState } from "react";
import { AppContext, type LightboxState } from "@/lib/store";
import { initScroll } from "@/lib/scroll";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { initMagnetic } from "@/lib/magnetic";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Works from "@/components/Works";
import Series from "@/components/Series";
import Manifesto from "@/components/Manifesto";
import About from "@/components/About";
import Services from "@/components/Services";
import Order from "@/components/Order";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";

export default function App() {
  const [ready, setReady] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  useEffect(() => {
    initScroll();
    // шрифты догружаются — пересчитываем позиции триггеров
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    if (!ready) return;
    const off = initMagnetic();
    // полоска прогресса чтения сверху
    const bar = document.querySelector<HTMLElement>(".scroll-progress");
    const st = ScrollTrigger.create({ start: 0, end: () => document.documentElement.scrollHeight - window.innerHeight, onUpdate: (s) => gsap.set(bar, { scaleX: s.progress }) });
    return () => {
      off();
      st.kill();
    };
  }, [ready]);

  const openLightbox = useCallback((keys: string[], index: number) => setLightbox({ keys, index }), []);
  const ctx = useMemo(() => ({ ready, openLightbox }), [ready, openLightbox]);

  return (
    <AppContext.Provider value={ctx}>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Works />
        <Series />
        <Manifesto />
        <About />
        <Services />
        <Order />
      </main>
      <Footer />
      {lightbox && <Lightbox keys={lightbox.keys} index={lightbox.index} onClose={() => setLightbox(null)} />}
    </AppContext.Provider>
  );
}
