import { ArrowDownRight } from "lucide-react";
import { Link } from "wouter";
import PortfolioNav from "@/components/PortfolioNav";
import ScrollReveal from "@/components/ScrollReveal";
import { series } from "@/data/portfolio";

// Moving Paper Gallery: curated author series give the portfolio a professional narrative beyond a stream of individual images.
export default function Series() {
  return <div className="paper-site page-transition min-h-screen overflow-x-hidden text-[#1d2547]"><PortfolioNav /><main><section className="series-hero px-4 py-14 sm:px-7 sm:py-20 lg:px-10"><div className="series-hero-inner mx-auto max-w-[1540px]"><ScrollReveal><h1 className="juz-heading text-[clamp(4.4rem,11vw,11.5rem)] leading-[.7] tracking-[-.085em]">МОИ<br />СЕРИИ</h1></ScrollReveal><ScrollReveal delay={100}><p>Каждая серия — это отдельный визуальный мир с собственным настроением, цветом и героями.</p></ScrollReveal></div></section><section className="series-index px-4 py-16 sm:px-7 sm:py-24 lg:px-10"><div className="mx-auto grid max-w-[1540px] gap-12">{series.map((item, index) => <ScrollReveal key={item.slug} delay={index * 80}><Link href={`/series/${item.slug}`} className="series-card" style={{ backgroundColor: item.color }}><div className="series-card-copy"><span>Серия 0{index + 1} · {item.subtitle}</span><h2 className="juz-heading">{item.title}</h2><p>{item.description}</p><b>Смотреть серию <ArrowDownRight className="h-4 w-4" /></b></div><div className="series-cover-sheet"><em>PIN SET / SELECTED</em><img src={item.cover} alt={item.title} /></div></Link></ScrollReveal>)}</div></section></main></div>;
}
