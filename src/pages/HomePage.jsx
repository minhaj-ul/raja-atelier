import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWidth } from "../hooks/useWidth";
import { PRODUCTS, CATEGORIES } from "../data/products";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import CartPanel from "../components/CartPanel";
import FilterSheet from "../components/FilterSheet";
import Footer from "../components/Footer";

export default function HomePage({
  cart,
  cartCount,
  onAddToCart,
  onUpdateQty,
  onRemove,
  onToggleWishlist,
  isWished,
  wishlistCount,
}) {
  const vw = useWidth();
  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobSearch, setMobSearch] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const handleBuyNow = (product) => {
    onAddToCart(product);
    setCartOpen(true);
  };

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

  useEffect(() => {
    document.body.style.overflow = cartOpen || filterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, filterOpen]);

  const cols = isMobile
    ? "grid-cols-2"
    : isTablet
      ? "grid-cols-3"
      : "grid-cols-4";

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <Header
        isMobile={isMobile}
        search={search}
        setSearch={setSearch}
        mobSearch={mobSearch}
        setMobSearch={setMobSearch}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* Hero */}
      <Hero isMobile={isMobile} />

      {/* Collection */}
      <main
        id="col"
        className={`max-w-340 mx-auto ${isMobile ? "px-3 py-7" : isTablet ? "px-5 py-11" : "px-7 py-14"}`}
      >
        {/* Filter bar — desktop only */}
        {!isMobile && !isTablet && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-9 pb-5 border-b border-stone-300">
            <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-none">
              <span className="text-[10px] tracking-[0.15em] uppercase text-stone-500 shrink-0">
                Filter:
              </span>
              {CATEGORIES.map((c) => (
                <Button
                  key={c}
                  variant="outline"
                  onClick={() => setCategory(c)}
                  className={`
            rounded-none text-xs uppercase tracking-widest h-8 px-4 shrink-0
            ${
              category === c
                ? "bg-stone-950 text-stone-50 border-stone-950 hover:bg-stone-950 hover:text-stone-50"
                : "bg-transparent text-stone-950 border-stone-300 hover:bg-stone-200"
            }
          `}
                >
                  {c}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-stone-500 whitespace-nowrap">
                {filtered.length} pieces
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-stone-300 bg-stone-50 py-1.5 pl-3 pr-7 text-xs font-sans text-stone-950 cursor-pointer outline-none appearance-none"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        )}

        {/* Filter button — tablet & mobile */}
        {(isMobile || isTablet) && (
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-stone-300">
            <p className="text-xs text-stone-500 tracking-wide">
              {filtered.length} pieces
            </p>
            <Button
              variant="outline"
              onClick={() => setFilterOpen(true)}
              className="rounded-none text-xs uppercase tracking-widest h-8 px-4 border-stone-300 hover:bg-stone-200 gap-2"
            >
              <Filter size={13} /> Filter & Sort
            </Button>
          </div>
        )}

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <p className="font-display text-2xl italic mb-2">No pieces found</p>
            <p className="text-sm mb-5">Try adjusting your search or filters</p>
            <Button
              variant="outline"
              className="rounded-none uppercase tracking-widest text-xs border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-stone-50"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              <X size={13} /> Clear Filters
            </Button>
          </div>
        ) : (
          <div
            className={`grid ${cols} ${isMobile ? "gap-3" : isTablet ? "gap-5" : "gap-6"}`}
          >
            {filtered.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                onView={(product) => navigate(`/product/${product.id}`)}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onBuyNow={handleBuyNow}
                isWished={isWished(p.id)}
                delay={i * 45}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer isMobile={isMobile} isTablet={isTablet} />

      {/* Cart panel */}
      {cartOpen && (
        <CartPanel
          cart={cart}
          isMobile={isMobile}
          onClose={() => setCartOpen(false)}
          onUpdateQty={onUpdateQty}
          onRemove={onRemove}
        />
      )}

      {/* Filter sheet */}
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
    </div>
  );
}
