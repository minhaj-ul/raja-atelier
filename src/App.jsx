import { Routes, Route } from 'react-router-dom'
import { useState, useMemo, useEffect, useRef } from "react";
import globalStyles from "./styles/global";
import { useWidth } from "./hooks/useWidth";
import { PRODUCTS, CATEGORIES } from "./data/products";
import { Icon, IC } from "./utils/icons";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import CartPanel from "./components/CartPanel";
import Detail from "./components/Detail";
import FilterSheet from "./components/FilterSheet";
import Footer from "./components/Footer";

function HomePage() {
   const vw = useWidth();
  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;

  // ── State ──────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [toast, setToast] = useState(null);
  const [mobSearch, setMobSearch] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ── Filtered & sorted products ─────────────────────────────────
  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)),
      );
    }
    if (sortBy === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating")
      list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sortBy]);

  // ── Cart helpers ───────────────────────────────────────────────
  const addToCart = (p) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      return ex
        ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...p, qty: 1 }];
    });
    setToast(`${p.name} added to bag`);
    setTimeout(() => setToast(null), 2500);
  };
  const updateQty = (id, qty) =>
    qty < 1
      ? removeItem(id)
      : setCart((p) => p.map((i) => (i.id === id ? { ...i, qty } : i)));
  const removeItem = (id) => setCart((p) => p.filter((i) => i.id !== id));

  // ── Lock body scroll when any overlay is open ──────────────────
  useEffect(() => {
    document.body.style.overflow =
      cartOpen || detail || filterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, detail, filterOpen]);

  // ── Layout helpers ─────────────────────────────────────────────
  const cols = isMobile
    ? "repeat(2,1fr)"
    : isTablet
      ? "repeat(3,1fr)"
      : "repeat(4,1fr)";
  const gap = isMobile ? 12 : isTablet ? 20 : 26;
  const pad = isMobile ? "0 13px" : "0 28px";

  return (
    <>
      {/* Inject global CSS */}
      <style>{globalStyles}</style>

      {/* ── Header ─────────────────────────────────────────────── */}
      <Header
        isMobile={isMobile}
        search={search}
        setSearch={setSearch}
        mobSearch={mobSearch}
        setMobSearch={setMobSearch}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <Hero isMobile={isMobile} />

      {/* ── Collection ─────────────────────────────────────────── */}
      <main
        id="col"
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: isMobile
            ? "28px 13px 52px"
            : isTablet
              ? "44px 22px 58px"
              : "52px 28px 68px",
        }}
      >
        {/* Filter bar — desktop & tablet */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 14,
              marginBottom: 36,
              paddingBottom: 22,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="hscroll" style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  alignSelf: "center",
                  whiteSpace: "nowrap",
                  marginRight: 4,
                }}
              >
                Filter:
              </span>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={`fpill${category === c ? " active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: "var(--muted)",
                  whiteSpace: "nowrap",
                }}
              >
                {filtered.length} pieces
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--white)",
                  padding: "7px 28px 7px 12px",
                  fontSize: 12,
                  fontFamily: "var(--fb)",
                  color: "var(--ink)",
                  cursor: "pointer",
                  outline: "none",
                  appearance: "none",
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='10' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238a8277' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                }}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        )}

        {/* Filter bar — mobile */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
              paddingBottom: 14,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="hscroll" style={{ flex: 1 }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={`fpill${category === c ? " active" : ""}`}
                  style={{ fontSize: 11, padding: "5px 12px" }}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                flexShrink: 0,
                background: "none",
                border: "1px solid var(--border)",
                padding: "6px 11px",
                cursor: "pointer",
                fontFamily: "var(--fb)",
                fontSize: 11,
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              <Icon d={IC.filter} size={12} /> Sort
            </button>
          </div>
        )}

        {isMobile && (
          <p
            style={{
              fontSize: 11,
              color: "var(--muted)",
              marginBottom: 14,
              letterSpacing: ".06em",
            }}
          >
            {filtered.length} pieces
          </p>
        )}

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "var(--muted)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--fd)",
                fontSize: 25,
                fontStyle: "italic",
                marginBottom: 10,
              }}
            >
              No pieces found
            </p>
            <p style={{ fontSize: 13 }}>Try adjusting your search or filters</p>
            <button
              className="btn-out"
              style={{ marginTop: 20 }}
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: cols, gap }}>
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                onView={setDetail}
                onAddToCart={addToCart}
                delay={i * 45}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <Footer isMobile={isMobile} isTablet={isTablet} />

      {/* ── Overlays ───────────────────────────────────────────── */}
      {cartOpen && (
        <CartPanel
          cart={cart}
          isMobile={isMobile}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />
      )}
      {detail && (
        <Detail
          product={detail}
          isMobile={isMobile}
          onClose={() => setDetail(null)}
          onAdd={addToCart}
        />
      )}
      {filterOpen && (
        <FilterSheet
          category={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          count={filtered.length}
          onClose={() => setFilterOpen(false)}
        />
      )}

      {/* ── Toast notification ─────────────────────────────────── */}
      {toast && (
        <div className="toast">
          <Icon d={IC.check} size={14} stroke="var(--gold)" /> {toast}
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<div className="p-8">Product Page — coming soon</div>} />
    </Routes>
  )
}

export default App