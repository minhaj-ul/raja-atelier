import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Shop", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

export default function Header({
  isMobile,
  cartCount,
  wishlistCount,
  onCartOpen,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-100/90 backdrop-blur-md border-b border-stone-300">
      {/* Promo bar */}
      <div className="bg-stone-950 text-stone-100 text-center py-1.5 px-4 text-[10px] tracking-[0.18em] uppercase">
        Free Delivery on Orders Over ৳5,000
      </div>

      <div className="max-w-340 mx-auto px-4 md:px-7">
        <div className="flex items-center justify-between gap-3 h-14 md:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-display shrink-0 text-left hover:opacity-70 transition-opacity"
          >
            <span className="italic text-xl md:text-2xl font-light tracking-wide block">
              RAJA
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

          {/* Right icons */}
          <div className="flex items-center gap-1 md:gap-2">
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

      {/* Mobile nav sheet */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="bg-stone-50 border-stone-300 w-72">
          <SheetHeader className="mb-8">
            <SheetTitle className="font-display font-light text-2xl italic text-left">
              RAJA{" "}
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
