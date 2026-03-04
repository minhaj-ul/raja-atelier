const BADGE_CLR = {
  "Bestseller":   "#2d4a2d",
  "New":          "#1a2d4a",
  "Editor's Pick":"#4a2d1a",
  "Limited":      "#4a1a1a",
  "Popular":      "#3d2d4a",
};

export default function Badge({ text }) {
  return (
    <span
      style={{
        position: "absolute", top: 12, left: 12, zIndex: 2,
        background: BADGE_CLR[text] || "#2d2d2d",
        color: "#f5f2ed",
        fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase",
        padding: "3px 9px", fontFamily: "var(--fb)",
      }}
    >
      {text}
    </span>
  );
}