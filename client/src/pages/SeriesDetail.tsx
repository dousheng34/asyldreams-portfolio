import { ArrowDownRight, ChevronLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import PortfolioNav from "@/components/PortfolioNav";
import ScrollReveal from "@/components/ScrollReveal";
import { caseStudies, getSeries } from "@/data/portfolio";

// Moving Paper Gallery: each series page gives artworks room, context, and a direct route to a relevant short case study.
export default function SeriesDetail() {
  const [, params] = useRoute("/series/:slug");
  const current = getSeries(params?.slug ?? "");
  if (!current) return <div className="paper-site min-h-screen"><PortfolioNav /><main className="px-4 py-24 text-center"><h1 className="juz-heading text-6xl">СЕРИЯ НЕ НАЙДЕНА</h1><Link href="/series" className="text-link mt-8">Вернуться к сериям</Link></main></div>;
  const featuredCase = caseStudies.find((item) => current.artworks.some((artwork) => artwork.title === item.title));
  return <div className="paper-site page-transition min-h-screen overflow-x-hidden text-[#1d2547]"><PortfolioNav /><main><section className="series-detail-hero px-4 py-14 sm:px-7 sm:py-20 lg:px-10" style={{ backgroundColor: current.color }}><div className="mx-auto max-w-[1540px]"><Link href="/series" className="series-back"><ChevronLeft className="h-4 w-4" /> Все серии</Link><ScrollReveal><h1 className="juz-heading mt-10 max-w-5xl text-[clamp(4rem,10vw,10rem)] leading-[.7] tracking-[-.085em]">{current.title}</h1></ScrollReveal><ScrollReveal delay={90}><p className="series-detail-description">{current.description}</p></ScrollReveal></div></section><section className="series-artwork-grid px-4 py-16 sm:px-7 sm:py-24 lg:px-10"><div className="mx-auto grid max-w-[1540px] grid-cols-1 gap-10 md:grid-cols-3">{current.artworks.map((artwork, index) => <ScrollReveal key={artwork.id} delay={index * 70}><figure className="series-artwork" style={{ backgroundColor: artwork.color }}><span className="series-artwork-index">SELECTED PIN / 0{index + 1}</span><img src={artwork.image} alt={artwork.title} /><figcaption className="juz-heading">{artwork.title}</figcaption></figure></ScrollReveal>)}</div></section>{featuredCase && <section className="series-case-teaser px-4 py-16 sm:px-7 sm:py-24 lg:px-10"><ScrollReveal className="mx-auto flex max-w-[1540px] flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><span>Короткий кейс</span><h2 className="juz-heading">КАК РОДИЛСЯ<br />ЭТОТ КАДР</h2></div><Link href={`/cases/${featuredCase.slug}`} className="pinterest-portal">Открыть кейс <ArrowDownRight className="h-5 w-5" /></Link></ScrollReveal></section>}</main></div>;
}
