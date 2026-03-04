import { CATEGORIES } from "../data/products";
import { Icon, IC } from "../utils/icons";

export default function FilterSheet({ category, setCategory, sortBy, setSortBy, count, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className="overlay"
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(15,14,12,.45)", zIndex: 61, backdropFilter: "blur(2px)" }}
      />

      {/* Sheet */}
      <div className="filter-sheet">
        <div style={{ width: 40, height: 4, background: "var(--border)", borderRadius: 2, margin: "0 auto 18px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontFamily: "var(--fd)", fontSize: 22, fontWeight: 400 }}>Filter & Sort</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
            <Icon d={IC.close} size={18} />
          </button>
        </div>

        {/* Categories */}
        <p style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 11 }}>Category</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
          {CATEGORIES.map(c => (
            <button key={c} className={`fpill${category === c ? " active" : ""}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        {/* Sort */}
        <p style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 11 }}>Sort By</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            ["default",    "Featured"],
            ["price-asc",  "Price: Low to High"],
            ["price-desc", "Price: High to Low"],
            ["rating",     "Top Rated"],
          ].map(([val, lbl]) => (
            <button
              key={val}
              onClick={() => setSortBy(val)}
              style={{
                background: "none", border: "none", cursor: "pointer", textAlign: "left",
                fontFamily: "var(--fb)", fontSize: 14, padding: "12px 4px",
                borderBottom: "1px solid var(--border)",
                color: sortBy === val ? "var(--gold)" : "var(--ink)",
                fontWeight: sortBy === val ? 400 : 300, letterSpacing: ".04em",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              {lbl}
              {sortBy === val && <Icon d={IC.check} size={15} stroke="var(--gold)" />}
            </button>
          ))}
        </div>

        <button className="btn-dark" style={{ width: "100%", justifyContent: "center", marginTop: 22, padding: 14 }} onClick={onClose}>
          Show {count} pieces
        </button>
      </div>
    </>
  );
}