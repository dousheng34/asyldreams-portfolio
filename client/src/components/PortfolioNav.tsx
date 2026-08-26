import { ArrowDownRight, Moon, Sun } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

// Moving Paper Gallery: a concise, consistent navigation strip for professional series and case-study pages.
export default function PortfolioNav() {
  const { theme, toggleTheme } = useTheme();
  return <header className="paper-nav px-4 py-4 sm:px-7 lg:px-10"><div className="mx-auto flex max-w-[1540px] items-center justify-between"><Link href="/" className="paper-wordmark" aria-label="AsylDreams — на главную"><span className="portal-mark" aria-hidden="true"><span /></span><span>Asyl<br /><i>Dreams</i></span></Link><nav className="hidden gap-7 text-[11px] font-semibold uppercase tracking-[0.14em] md:flex" aria-label="Навигация"><Link href="/">Главная</Link><Link href="/series">Серии</Link><Link href="/pinterest">Pinterest</Link><Link href="/#order">Заказать</Link></nav><div className="paper-actions"><button type="button" onClick={toggleTheme} className="theme-toggle" aria-label={theme === "light" ? "Включить тёмную тему" : "Включить светлую тему"}>{theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}<span>{theme === "light" ? "Ночь" : "Свет"}</span></button><Link href="/pinterest" className="pinterest-pill">Pinterest <ArrowDownRight className="h-3.5 w-3.5" /></Link></div></div></header>;
}
