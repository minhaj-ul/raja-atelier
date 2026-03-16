import { useRef } from "react";
import { Search, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Header({
  isMobile,
  search,
  setSearch,
  mobSearch,
  setMobSearch,
  cartCount,
  onCartOpen,
}) {
  const mobInputRef = useRef(null);

  const handleMobSearchToggle = () => {
    setMobSearch((s) => !s);
    setTimeout(() => mobInputRef.current?.focus(), 50);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-100/90 backdrop-blur-md border-b border-stone-300">
      {/* Promo bar */}
      <div className="bg-stone-950 text-stone-100 text-center py-1.5 px-4 text-[10px] tracking-[0.18em] uppercase">
        Free Shipping on Orders Over $250
      </div>

      <div className="max-w-340 mx-auto px-4 md:px-7">
        <div className="flex items-center justify-between gap-3 h-14 md:h-16">
          {/* Logo */}
          <div className="font-display shrink-0">
            <span className="italic text-xl md:text-2xl font-light tracking-wide">
              MAISON
            </span>
            <span className="block text-[9px] tracking-[0.3em] uppercase text-amber-600 leading-none -mt-0.5">
              Atelier
            </span>
          </div>

          {/* Desktop search */}
          {!isMobile && (
            <div className="flex items-center gap-2 bg-stone-200 border border-stone-300 px-4 py-2 w-72 md:w-80 shrink-0">
              <Search size={14} className="text-stone-500 shrink-0" />
              <Input
                type="search"
                placeholder="Search pieces…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 bg-transparent p-0 h-auto text-sm font-light shadow-none focus-visible:ring-0 text-stone-950 placeholder:text-stone-500"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSearch("")}
                >
                  <X size={12} className="text-stone-500" />
                </Button>
              )}
            </div>
          )}

          {/* Right icons */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Mobile search toggle */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-stone-200"
                onClick={handleMobSearchToggle}
              >
                {mobSearch ? (
                  <X size={20} className="text-stone-950" />
                ) : (
                  <Search size={20} className="text-stone-950" />
                )}
              </Button>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-stone-200"
              onClick={onCartOpen}
            >
              <ShoppingBag
                size={isMobile ? 20 : 22}
                className="text-stone-950"
              />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-amber-600 text-stone-50 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Separator className="bg-stone-300" />

      {/* Mobile expanding search */}
      <div
        className={`overflow-hidden transition-all duration-300 bg-stone-200 ${
          mobSearch ? "max-h-16 border-b border-stone-300" : "max-h-0"
        }`}
      >
        <div className="flex items-center gap-3 px-4 h-14">
          <Search size={16} className="text-stone-500 shrink-0" />
          <Input
            ref={mobInputRef}
            type="search"
            placeholder="Search pieces…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent p-0 h-auto text-base font-light shadow-none focus-visible:ring-0 text-stone-950 placeholder:text-stone-500"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 hover:bg-transparent shrink-0"
              onClick={() => setSearch("")}
            >
              <X size={14} className="text-stone-500" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
