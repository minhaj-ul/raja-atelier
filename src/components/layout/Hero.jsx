import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero({ isMobile }) {
  const scrollToCollection = () =>
    document.getElementById("col")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden bg-stone-950 text-stone-100 py-12 md:py-20 px-5 md:px-8 text-center">
      {/* Glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(184,148,63,0.08),transparent_60%)] pointer-events-none" />

      {/* Eyebrow */}
      <p className="text-[10px] tracking-[0.4em] uppercase text-amber-600 mb-4 fade-up">
        Spring Collection 2026
      </p>

      {/* Heading */}
      <h1 className="font-display font-light leading-[1.06] tracking-tight text-4xl md:text-6xl lg:text-8xl mb-5 fade-up [animation-delay:80ms]">
        Dressed with
        <br />
        <em>intention</em>
      </h1>

      {/* Subheading */}
      <p
        className={`font-light text-stone-400 max-w-md mx-auto leading-relaxed mb-8 fade-up [animation-delay:160ms] ${isMobile ? "text-sm" : "text-base"}`}
      >
        Curated essentials that transcend seasons. Each piece chosen for its
        craftsmanship and quiet elegance.
      </p>

      {/* CTA */}
      <Button
        variant="outline"
        onClick={scrollToCollection}
        className="fade-up [animation-delay:240ms] bg-transparent border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-stone-50 rounded-none uppercase tracking-widest text-xs px-8 py-5"
      >
        Explore Collection
        <ArrowRight size={13} />
      </Button>
    </section>
  );
}
