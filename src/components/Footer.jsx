import { CATEGORIES } from "../data/products";

const LINKS = [
  { title: "Shop",    items: CATEGORIES.slice(1) },
  { title: "Help",    items: ["Sizing Guide", "Returns", "Shipping", "Contact"] },
  { title: "Company", items: ["About", "Sustainability", "Careers", "Press"] },
];

export default function Footer({ isMobile, isTablet }) {
  return (
    <footer style={{ background: "var(--ink)", color: "#a09890", borderTop: "3px solid var(--gold)" }}>
      <div style={{
        maxWidth: 1360, margin: "0 auto",
        padding: isMobile ? "36px 18px 24px" : "46px 28px 26px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)",
        gap: isMobile ? 24 : 34,
      }}>
        {/* Brand blurb */}
        <div style={{ gridColumn: isMobile ? "1/-1" : "auto" }}>
          <div style={{ fontFamily: "var(--fd)", fontSize: 21, fontWeight: 300, color: "var(--paper)", marginBottom: 9 }}>
            <span style={{ fontStyle: "italic" }}>MAISON</span>
            <span style={{ fontSize: 9, letterSpacing: ".3em", color: "var(--gold)", marginLeft: 6 }}>Atelier</span>
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.7, fontWeight: 300, maxWidth: 210 }}>
            Thoughtfully curated fashion for those who dress with intention.
          </p>
        </div>

        {/* Link columns */}
        {LINKS.map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 13 }}>
              {col.title}
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
              {col.items.map(item => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ fontSize: 12, color: "#a09890", textDecoration: "none", transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "#f5f2ed"}
                    onMouseLeave={e => e.target.style.color = "#a09890"}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #2a2820", maxWidth: 1360, margin: "0 auto", padding: isMobile ? "14px 18px" : "16px 28px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <p style={{ fontSize: 10, letterSpacing: ".06em" }}>© 2026 Maison Atelier. All rights reserved.</p>
        <p style={{ fontSize: 10, letterSpacing: ".06em" }}>Free demo project</p>
      </div>
    </footer>
  );
}