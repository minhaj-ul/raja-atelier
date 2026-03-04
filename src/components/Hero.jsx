import { Icon, IC } from "../utils/icons";

export default function Hero({ isMobile }) {
  const scrollToCollection = () =>
    document.getElementById("col")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      style={{
        background: "var(--ink)", color: "var(--paper)",
        padding: isMobile ? "48px 18px 56px" : "76px 28px",
        textAlign: "center", position: "relative", overflow: "hidden",
        backgroundImage: "radial-gradient(ellipse at 30% 50%, #1a1814 0%, #0f0e0c 100%)",
      }}
    >
      {/* Glow overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 20%, rgba(184,148,63,.08) 0%, transparent 60%)", pointerEvents: "none" }} />

      <p className="fade-up" style={{ fontSize: 10, letterSpacing: ".4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
        Spring Collection 2026
      </p>

      <h1 className="fade-up" style={{ fontFamily: "var(--fd)", fontSize: "clamp(34px,8vw,82px)", fontWeight: 300, lineHeight: 1.06, animationDelay: "80ms", marginBottom: 18 }}>
        Dressed with<br /><em>intention</em>
      </h1>

      <p className="fade-up" style={{ fontSize: isMobile ? 13 : 15, fontWeight: 300, color: "#a09890", maxWidth: 440, margin: "0 auto 32px", lineHeight: 1.75, animationDelay: "160ms" }}>
        Curated essentials that transcend seasons. Each piece chosen for its craftsmanship and quiet elegance.
      </p>

      <button
        className="fade-up btn-dark"
        style={{ animationDelay: "240ms", background: "transparent", border: "1px solid var(--gold)", color: "var(--gold)", padding: isMobile ? "11px 26px" : "13px 36px" }}
        onClick={scrollToCollection}
      >
        Explore Collection <Icon d={IC.arrow} size={13} />
      </button>
    </section>
  );
}