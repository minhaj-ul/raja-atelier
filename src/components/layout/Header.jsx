import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  user,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

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

            {/* User account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-stone-200 rounded-full"
                  >
                    <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center">
                      <span className="text-stone-50 text-xs font-medium">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-none border-stone-300 bg-stone-50 w-48"
                >
                  <DropdownMenuLabel className="font-normal">
                    <p className="text-xs font-medium text-stone-950">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-stone-400 truncate">
                      {user.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-stone-200" />
                  <DropdownMenuItem
                    className="text-xs uppercase tracking-widest cursor-pointer hover:text-amber-600 gap-2"
                    onClick={() => navigate("/account")}
                  >
                    <User size={13} /> My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs uppercase tracking-widest cursor-pointer hover:text-amber-600 gap-2"
                    onClick={() => navigate("/wishlist")}
                  >
                    <Heart size={13} /> Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-stone-200" />
                  <DropdownMenuItem
                    className="text-xs uppercase tracking-widest cursor-pointer text-red-500 hover:text-red-600 gap-2"
                    onClick={onLogout}
                  >
                    <LogOut size={13} /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-stone-200"
                >
                  <User size={isMobile ? 20 : 22} className="text-stone-950" />
                </Button>
              </Link>
            )}

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
            {user ? (
              <>
                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm uppercase tracking-widests text-stone-600 hover:text-amber-600 hover:bg-stone-100 transition-colors py-3 px-2 border-b border-stone-200 flex items-center gap-2"
                >
                  <User size={14} /> My Account
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  className="text-sm uppercase tracking-widests text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors py-3 px-2 border-b border-stone-200 flex items-center gap-2 w-full text-left"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm uppercase tracking-widests text-stone-600 hover:text-amber-600 hover:bg-stone-100 transition-colors py-3 px-2 border-b border-stone-200 flex items-center gap-2"
              >
                <User size={14} /> Sign In
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
