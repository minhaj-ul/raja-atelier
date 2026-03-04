import { useRef } from "react";
import { Icon, IC } from "../utils/icons";

export default function Header({ isMobile, search, setSearch, mobSearch, setMobSearch, cartCount, onCartOpen }) {
  const mobInputRef = useRef(null);

  const handleMobSearchToggle = () => {
    setMobSearch(s => !s);
    setTimeout(() => mobInputRef.current?.focus(), 50);
  };

  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(245,242,237,.93)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Promo bar */}
      <div style={{ background: "var(--ink)", color: "var(--paper)", textAlign: "center", padding: "7px 16px", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase" }}>
        Free Shipping on Orders Over $250
      </div>

      <div style={{ maxWidth: 1360, margin: "0 auto", padding: isMobile ? "0 13px" : "0 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: isMobile ? 56 : 66, gap: 12 }}>

          {/* Logo */}
          <div style={{ fontFamily: "var(--fd)", fontSize: isMobile ? 20 : 26, fontWeight: 300, letterSpacing: ".05em", flexShrink: 0 }}>
            <span style={{ fontStyle: "italic" }}>MAISON</span>
            <span style={{ fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase", display: "block", lineHeight: 1, color: "var(--gold)", marginTop: -1 }}>
              Atelier
            </span>
          </div>

          {/* Desktop search bar */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--cream)", border: "1px solid var(--border)", padding: "9px 15px", width: 320, flexShrink: 0 }}>
              <Icon d={IC.search} size={14} stroke="var(--muted)" />
              <input
                type="search"
                placeholder="Search pieces…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 2 }}>
                  <Icon d={IC.close} size={12} />
                </button>
              )}
            </div>
          )}

          {/* Right icons */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 2 : 10 }}>
            {/* Mobile search toggle */}
            {isMobile && (
              <button onClick={handleMobSearchToggle} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "var(--ink)" }}>
                <Icon d={mobSearch ? IC.close : IC.search} size={20} />
              </button>
            )}
            {/* Cart */}
            <button
              onClick={onCartOpen}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, position: "relative" }}
            >
              <Icon d={IC.bag} size={isMobile ? 20 : 22} stroke="var(--ink)" />
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: 2, right: 2, background: "var(--gold)", color: "var(--white)", width: 15, height: 15, borderRadius: "50%", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 500 }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile expanding search */}
      <div className={`mob-search${mobSearch ? " open" : ""}`}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 14px", height: 54 }}>
          <Icon d={IC.search} size={16} stroke="var(--muted)" />
          <input
            ref={mobInputRef}
            type="search"
            placeholder="Search pieces…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ fontSize: 15 }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: 2, flexShrink: 0 }}>
              <Icon d={IC.close} size={14} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}