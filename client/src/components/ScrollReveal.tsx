import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

// Moving Paper Gallery: quiet scroll-driven text entrance that respects reduced-motion preferences.
export default function ScrollReveal({ children, className = "", delay = 0, ...props }: { children: ReactNode; className?: string; delay?: number } & HTMLAttributes<HTMLDivElement>) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const current = element.current;
    if (!current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.16 });
    observer.observe(current);
    return () => observer.disconnect();
  }, []);

  return <div ref={element} {...props} className={`scroll-reveal ${visible ? "is-visible" : ""} ${className}`} style={{ ...props.style, transitionDelay: `${delay}ms` }}>{children}</div>;
}
