import { useState } from "react";
import Badge from "./Badge";
import Stars from "./Stars";
import { Icon, IC } from "../utils/icons";

export default function ProductCard({ product, onView, onAddToCart, delay = 0 }) {
  const [wished, setWished] = useState(false);

  return (
    <div
      className="pcard fade-up"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onView(product)}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {product.badge && <Badge text={product.badge} />}
        <img
          src={product.image}
          alt={product.name}
          className="cimg"
          loading="lazy"
        />
        <button
          onClick={e => { e.stopPropagation(); setWished(w => !w); }}
          style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(245,242,237,.85)", border: "none",
            padding: 7, cursor: "pointer", backdropFilter: "blur(4px)",
          }}
        >
          <svg
            width={15} height={15} viewBox="0 0 24 24"
            fill={wished ? "var(--gold)" : "none"}
            stroke={wished ? "var(--gold)" : "var(--ink)"}
            strokeWidth={1.5}
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 14px 17px" }}>
        <p style={{ fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>
          {product.category}
        </p>
        <h3 style={{ fontFamily: "var(--fd)", fontWeight: 400, fontSize: 17, lineHeight: 1.25, marginBottom: 6 }}>
          {product.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 11, color: "var(--muted)" }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--fd)", fontSize: 20, fontWeight: 500 }}>
            ${product.price}
          </span>
          <button
            className="btn-dark"
            style={{ padding: "7px 12px", fontSize: 11 }}
            onClick={e => { e.stopPropagation(); onAddToCart(product); }}
          >
            <Icon d={IC.bag} size={13} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}