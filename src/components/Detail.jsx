import { useState } from "react";
import Badge from "./Badge";
import Stars from "./Stars";
import { Icon, IC } from "../utils/icons";

export default function Detail({ product, isMobile, onClose, onAdd }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="overlay"
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(15,14,12,.6)", zIndex: 50, backdropFilter: "blur(3px)" }}
      />

      {/* Modal */}
      <div className="detail-wrap">
        {/* Close button */}
        <button
          onClick={onClose}
          className="detail-close"
          style={{
            background: "var(--cream)", border: "1px solid var(--border)",
            cursor: "pointer", padding: "7px 9px",
            ...(isMobile ? {} : { position: "absolute", top: 14, right: 14, zIndex: 2 }),
          }}
        >
          <Icon d={IC.close} size={18} />
        </button>

        <div className="detail-grid">
          {/* Image */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            {product.badge && <Badge text={product.badge} />}
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: isMobile ? 260 : 480, display: "block" }}
            />
          </div>

          {/* Info */}
          <div style={{ padding: isMobile ? "22px 18px 36px" : "46px 42px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 9 }}>
              {product.category}
            </p>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: isMobile ? 26 : 33, fontWeight: 400, lineHeight: 1.15, marginBottom: 9 }}>
              {product.name}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Stars rating={product.rating} />
              <span style={{ fontSize: 12, color: "var(--muted)" }}>{product.rating} · {product.reviews} reviews</span>
            </div>
            <p style={{ fontFamily: "var(--fd)", fontSize: 28, fontWeight: 500, marginBottom: 18 }}>${product.price}</p>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#4a4540", fontWeight: 300, marginBottom: 22 }}>
              {product.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
              {product.tags.map(t => (
                <span key={t} style={{ border: "1px solid var(--border)", padding: "3px 11px", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)" }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Qty + Add */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 13px" }}>
                  <Icon d={IC.minus} size={14} />
                </button>
                <span style={{ fontSize: 14, padding: "10px 8px", minWidth: 34, textAlign: "center" }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 13px" }}>
                  <Icon d={IC.plus} size={14} />
                </button>
              </div>
              <button className="btn-dark" onClick={handleAdd} style={{ flex: 1, justifyContent: "center", padding: "13px 16px", minWidth: 140 }}>
                {added
                  ? <><Icon d={IC.check} size={14} /> Added!</>
                  : <><Icon d={IC.bag} size={14} /> Add to Bag</>
                }
              </button>
            </div>

            <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".05em" }}>
              Free shipping on orders over $250 · Easy returns
            </p>
          </div>
        </div>
      </div>
    </>
  );
}