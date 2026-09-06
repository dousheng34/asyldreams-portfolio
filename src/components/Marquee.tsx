const items = ["AI-арт", "4K обои", "Anime aesthetics", "Кинокадры", "Ghibli mood", "Live wallpapers", "Портреты", "Серии кадров"];

// Бесконечная бегущая строка. Два одинаковых трека, чтобы шов был невидим.
export default function Marquee() {
  const track = (
    <div className="marquee-track" aria-hidden="true">
      {items.map((t, i) => (
        <span key={i} className="display flex items-center gap-8 pr-8 text-[clamp(1.4rem,3.2vw,2.6rem)] font-light text-paper/70">
          {t}
          <span className="inline-block h-2 w-2 rounded-full bg-amber" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee border-y hairline py-5" role="presentation">
      {track}
      {track}
    </div>
  );
}
