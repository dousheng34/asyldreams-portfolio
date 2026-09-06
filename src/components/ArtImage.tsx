import { useState } from "react";
import type { Work } from "@/data/portfolio";

// Картинка с LQIP-заглушкой: пока грузится WebP, виден размытый 16px-превью.
// Итог — ноль скачков раскладки (width/height заданы) и мягкое проявление.
export default function ArtImage({ work, sizes, className = "", eager = false }: { work: Work; sizes: string; className?: string; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span
      className={`relative block h-full w-full overflow-hidden ${className}`}
      style={{ backgroundImage: `url(${work.lqip})`, backgroundSize: "cover", backgroundPosition: "center", backgroundColor: work.color }}
    >
      <img
        src={work.src}
        srcSet={work.srcset}
        sizes={sizes}
        width={work.w}
        height={work.h}
        alt={work.title}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}
