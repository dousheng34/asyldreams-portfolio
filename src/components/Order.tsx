import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { profile } from "@/data/portfolio";
import SectionHead from "./SectionHead";

type Status = "idle" | "copied" | "ready";

// Заказ: форма собирает бриф в текст, копирует его в буфер и ведёт в Pinterest-переписку.
// Никакого бэкенда — сайт остаётся статическим и работает на GitHub Pages.
export default function Order() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [brief, setBrief] = useState("");

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-order-fade]", { y: 24, opacity: 0, duration: 1, stagger: 0.07, scrollTrigger: { trigger: root.current, start: "top 70%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      "Заявка для AsylDreams",
      `Формат: ${data.get("type")}`,
      `Контакт: ${data.get("contact")}`,
      `Идея и дедлайн: ${data.get("idea")}`,
      `Референсы: ${data.get("refs") || "не добавлены"}`,
    ].join("\n");
    setBrief(text);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("ready");
    }
    window.setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <section ref={root} id="order" className="container-x py-24 sm:py-32 lg:py-40">
      <SectionHead index="05" title="Закажи" accent="свой мир" />
      <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p data-order-fade className="max-w-[40ch] text-[18px] leading-[1.45] text-paper/80 sm:text-[20px]">
            Выберите формат, опишите идею и добавьте референсы. Бриф скопируется одним нажатием — отправьте его мне в Pinterest, и обсудим сроки.
          </p>
          <ul data-order-fade className="mt-10 space-y-4 text-[15px] text-mute">
            {["Ответ в течение 1–2 дней", "1–3 варианта на выбор + правки", "Файлы в 4K для экрана или печати"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-px w-6 bg-amber" />
                {t}
              </li>
            ))}
          </ul>
          <a data-order-fade href={profile.pinterest} target="_blank" rel="noreferrer" data-magnetic className="btn-magnetic mt-10 border hairline px-7 py-4 text-[12px] uppercase tracking-[0.16em]">
            <span className="fill" />
            <span className="flex items-center gap-2">
              Написать в Pinterest <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

        <form onSubmit={submit} className="lg:col-span-6 lg:col-start-7" data-order-fade>
          <label className="field">
            <span>Формат</span>
            <select name="type" defaultValue="Персонаж">
              {profile.services.map((s) => (
                <option key={s.name}>{s.name}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Где связаться</span>
            <input name="contact" required placeholder="Instagram, Telegram или email" autoComplete="off" />
          </label>
          <label className="field">
            <span>Идея и дедлайн</span>
            <textarea name="idea" required rows={4} placeholder="Опишите мир, настроение и желаемую дату" />
          </label>
          <label className="field">
            <span>Референсы</span>
            <textarea name="refs" rows={2} placeholder="Ссылки на Pinterest, Behance или сайт" />
          </label>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" data-magnetic className="btn-magnetic bg-paper px-7 py-4 text-[12px] uppercase tracking-[0.16em] text-ink">
              <span className="fill !bg-amber" />
              <span className="flex items-center gap-2">
                {status === "copied" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {status === "copied" ? "Бриф скопирован" : "Собрать бриф"}
              </span>
            </button>
            <p className="text-[13px] text-mute" aria-live="polite">
              {status === "copied" && "Теперь вставьте его в сообщение на Pinterest."}
              {status === "ready" && "Скопируйте бриф ниже вручную."}
            </p>
          </div>
          {status === "ready" && brief && <pre className="mt-6 whitespace-pre-wrap rounded-[2px] border hairline bg-ink-2 p-4 text-[13px] text-paper/80">{brief}</pre>}
        </form>
      </div>
    </section>
  );
}
