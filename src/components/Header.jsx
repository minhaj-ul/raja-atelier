import { useRef } from "react";
import { Search, X, ShoppingBag, Heart, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Shop", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

export default function Header({
  isMobile,
  search,
  setSearch,
  mobSearch,
  setMobSearch,
  cartCount,
  wishlistCount,
  onCartOpen,
}) {
  const mobInputRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link
            to="/"
            className="font-display shrink-0 text-left hover:opacity-70 transition-opacity"
          >
            <span className="italic text-xl md:text-2xl font-light tracking-wide block">
              MAISON
            </span>
            <span className="block text-[9px] tracking-[0.3em] uppercase text-amber-600 leading-none -mt-0.5">
              Atelier
            </span>
          </Link>

          {/* Desktop nav links */}
          {!isMobile && (
            <nav className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs uppercase tracking-widest text-stone-600 hover:text-amber-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop search bar */}
          {!isMobile && (
            <div className="flex items-center gap-2 bg-stone-200 border border-stone-300 px-4 py-2 w-56 shrink-0">
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
          <div className="flex items-center gap-1 md:gap-2">
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

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-stone-200"
              >
                <Heart size={isMobile ? 20 : 22} className="text-stone-950" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-amber-600 text-stone-50 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

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

            {/* Mobile menu */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-stone-200"
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={20} className="text-stone-950" />
              </Button>
            )}
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

      {/* Mobile nav menu sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="bg-stone-50 border-stone-300 w-72">
          <SheetHeader className="mb-8">
            <SheetTitle className="font-display font-light text-2xl italic text-left">
              MAISON{" "}
              <span className="text-amber-600 text-sm not-italic tracking-widest">
                Atelier
              </span>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-stone-600 hover:text-amber-600 hover:bg-stone-100 transition-colors py-3 px-2 border-b border-stone-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-stone-600 hover:text-amber-600 hover:bg-stone-100 transition-colors py-3 px-2 border-b border-stone-200 flex items-center gap-2"
            >
              <Heart size={14} /> Wishlist
              {wishlistCount > 0 && (
                <span className="ml-auto bg-amber-600 text-stone-50 w-5 h-5 rounded-full text-[10px] flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
