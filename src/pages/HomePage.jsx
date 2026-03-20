import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWidth } from "../hooks/useWidth";
import { PRODUCTS, CATEGORIES } from "../data/products";
import Header from "../components/Header";
import Hero from "../components/Hero";
import NewArrivals from "../components/home/NewArrivals";
import FeaturedCategories from "../components/home/FeaturedCategories";
import Bestsellers from "../components/home/Bestsellers";
import ProductCard from "../components/ProductCard";
import CartPanel from "../components/CartPanel";
import FilterSheet from "../components/FilterSheet";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

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

  useEffect(() => {
    setVisibleCount(12);
  }, [search, category, sortBy]);

  const hasFilters = search || category !== "All" || sortBy !== "default";

  const cols = isMobile
    ? "grid-cols-2"
    : isTablet
      ? "grid-cols-3"
      : "grid-cols-4";

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header — no search props needed anymore */}
      <Header
        isMobile={isMobile}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* Hero */}
      <Hero isMobile={isMobile} />

      {/* New Arrivals */}
      <NewArrivals
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        isWished={isWished}
      />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Bestsellers */}
      <Bestsellers onAddToCart={onAddToCart} />

      {/* Collection */}
      <main
        id="col"
        className={`max-w-340 mx-auto ${isMobile ? "px-3 py-7" : isTablet ? "px-5 py-11" : "px-7 py-14"}`}
      >
        {/* ── Filter bar — desktop ─────────────────────────────── */}
        {!isMobile && !isTablet && (
          <div className="flex items-center gap-3 mb-9 pb-5 border-b border-stone-300">
            {/* Search */}
            <div className="flex items-center gap-2 bg-stone-50 border border-stone-300 px-3 py-2 flex-1 max-w-72">
              <Search size={14} className="text-stone-400 shrink-0" />
              <Input
                type="search"
                placeholder="Search pieces…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 bg-transparent p-0 h-auto text-sm font-light shadow-none focus-visible:ring-0 text-stone-950 placeholder:text-stone-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-stone-400 hover:text-stone-950 transition-colors shrink-0"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Category dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] tracking-widest uppercase text-stone-500">
                Category
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-stone-300 bg-stone-50 py-2 pl-3 pr-8 text-xs font-sans text-stone-950 cursor-pointer outline-none appearance-none focus:ring-1 focus:ring-amber-600"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] tracking-widest uppercase text-stone-500">
                Sort
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-stone-300 bg-stone-50 py-2 pl-3 pr-8 text-xs font-sans text-stone-950 cursor-pointer outline-none appearance-none focus:ring-1 focus:ring-amber-600"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Result count + clear */}
            <div className="flex items-center gap-3 ml-auto shrink-0">
              <span className="text-xs text-stone-500">
                {filtered.length} pieces
              </span>
              {hasFilters && (
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setSortBy("default");
                  }}
                  className="text-[10px] uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
                >
                  <X size={11} /> Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── Filter bar — tablet & mobile ────────────────────── */}
        {(isMobile || isTablet) && (
          <div className="flex items-center gap-2 mb-6 pb-5 border-b border-stone-300">
            {/* Search */}
            <div className="flex items-center gap-2 bg-stone-50 border border-stone-300 px-3 py-2 flex-1">
              <Search size={14} className="text-stone-400 shrink-0" />
              <Input
                type="search"
                placeholder="Search pieces…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 bg-transparent p-0 h-auto text-sm font-light shadow-none focus-visible:ring-0 text-stone-950 placeholder:text-stone-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-stone-400 hover:text-stone-950 transition-colors shrink-0"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Filter & Sort button */}
            <Button
              variant="outline"
              onClick={() => setFilterOpen(true)}
              className={`
                rounded-none uppercase tracking-widest text-xs h-9 px-3 shrink-0 gap-1.5 border-stone-300
                ${hasFilters ? "border-amber-600 text-amber-600" : "hover:bg-stone-200"}
              `}
            >
              <SlidersHorizontal size={13} />
              {!isMobile && "Filter & Sort"}
              {hasFilters && (
                <span className="bg-amber-600 text-stone-50 w-4 h-4 rounded-full text-[9px] flex items-center justify-center ml-0.5">
                  !
                </span>
              )}
            </Button>
          </div>
        )}

        {/* Result count — tablet & mobile */}
        {(isMobile || isTablet) && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-stone-500 tracking-wide">
              {filtered.length} pieces
            </p>
            {hasFilters && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setSortBy("default");
                }}
                className="text-[10px] uppercase tracking-widest text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
              >
                <X size={11} /> Clear filters
              </button>
            )}
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
          <>
            {/* Grid */}
            <div
              className={`grid ${cols} ${isMobile ? "gap-3" : isTablet ? "gap-5" : "gap-6"}`}
            >
              {filtered.slice(0, visibleCount).map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={(product) => navigate(`/product/${product.id}`)}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWished={isWished(p.id)}
                  delay={i * 45}
                />
              ))}
            </div>

            {/* Load more */}
            {visibleCount < filtered.length && (
              <div className="flex flex-col items-center gap-3 mt-12">
                <p className="text-xs text-stone-400 tracking-wide">
                  Showing {Math.min(visibleCount, filtered.length)} of{" "}
                  {filtered.length} pieces
                </p>
                <Button
                  variant="outline"
                  className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-950 hover:text-stone-50 uppercase tracking-widest text-xs px-10 py-5 gap-2 transition-colors duration-200"
                  onClick={() => setVisibleCount((c) => c + 12)}
                >
                  Load More
                </Button>
              </div>
            )}

            {/* End of results */}
            {visibleCount >= filtered.length && filtered.length > 12 && (
              <div className="flex flex-col items-center gap-2 mt-12">
                <p className="text-xs text-stone-400 tracking-wide">
                  All {filtered.length} pieces loaded
                </p>
                <div className="w-12 h-px bg-amber-600" />
              </div>
            )}
          </>
        )}
      </main>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

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
