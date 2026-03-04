import { Icon, IC } from "../utils/icons";

export default function CartPanel({ cart, isMobile, onClose, onUpdateQty, onRemove }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className="overlay"
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(15,14,12,.5)", zIndex: 60, backdropFilter: "blur(2px)" }}
      />

      {/* Panel */}
      <div
        className={`cart-panel ${isMobile ? "slide-u" : "slide-r"}`}
        style={{
          position: "fixed",
          ...(isMobile
            ? { left: 0, right: 0, bottom: 0, maxHeight: "88vh" }
            : { right: 0, top: 0, bottom: 0, width: "min(420px,100vw)", borderLeft: "1px solid var(--border)" }
          ),
          background: "var(--white)", zIndex: 61,
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Drag handle (mobile only) */}
        {isMobile && (
          <div style={{ width: 40, height: 4, background: "var(--border)", borderRadius: 2, margin: "12px auto 0", flexShrink: 0 }} />
        )}

        {/* Header */}
        <div style={{ padding: isMobile ? "14px 18px 12px" : "24px 26px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <h2 style={{ fontFamily: "var(--fd)", fontSize: isMobile ? 21 : 25, fontWeight: 400 }}>Your Bag</h2>
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{count} {count === 1 ? "item" : "items"}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <Icon d={IC.close} size={19} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 0" }}>
          {cart.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 200, gap: 14, color: "var(--muted)" }}>
              <Icon d={IC.bag} size={38} sw={1} />
              <p style={{ fontFamily: "var(--fd)", fontSize: 19, fontStyle: "italic" }}>Your bag is empty</p>
              <p style={{ fontSize: 12, letterSpacing: ".06em" }}>Discover something beautiful</p>
            </div>
          ) : cart.map(item => (
            <div
              key={item.id}
              className="scale-in"
              style={{ display: "flex", gap: 13, padding: isMobile ? "13px 18px" : "15px 26px", borderBottom: "1px solid var(--border)" }}
            >
              <img src={item.image} alt={item.name} style={{ width: isMobile ? 64 : 72, height: isMobile ? 80 : 90, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 10, letterSpacing: ".15em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 3 }}>{item.category}</p>
                <p style={{ fontFamily: "var(--fd)", fontSize: 15, fontWeight: 400, lineHeight: 1.3 }}>{item.name}</p>
                <p style={{ fontFamily: "var(--fd)", fontSize: 16, fontWeight: 500, marginTop: 4 }}>${item.price}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 9 }}>
                  {/* Qty control */}
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)" }}>
                    <button onClick={() => onUpdateQty(item.id, item.qty - 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 9px" }}>
                      <Icon d={IC.minus} size={13} />
                    </button>
                    <span style={{ fontSize: 13, padding: "4px 6px", minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, item.qty + 1)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 9px" }}>
                      <Icon d={IC.plus} size={13} />
                    </button>
                  </div>
                  <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 4 }}>
                    <Icon d={IC.trash} size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: isMobile ? "14px 18px 22px" : "20px 26px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--fd)", fontSize: 20, fontWeight: 500 }}>${total.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 14 }}>Shipping & taxes at checkout</p>
            <button className="btn-dark" style={{ width: "100%", justifyContent: "center", padding: "13px 20px" }}>
              Checkout <Icon d={IC.arrow} size={14} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}