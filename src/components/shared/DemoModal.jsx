import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, User, Code, Layers, Globe, X } from "lucide-react";

const DEMO_KEY = "raja_demo_seen";

const ROUTES = [
  {
    path: "/",
    label: "Home",
    desc: "Hero, New Arrivals, Categories, Bestsellers, Testimonials, Instagram, Newsletter",
  },
  {
    path: "/product/:id",
    label: "Product Detail",
    desc: "Images, size selector, add to cart, wishlist, buy now",
  },
  {
    path: "/wishlist",
    label: "Wishlist",
    desc: "Saved products with add to bag and remove",
  },
  {
    path: "/checkout",
    label: "Checkout",
    desc: "3-step: Shipping → Payment → Review (login required)",
  },
  {
    path: "/account",
    label: "My Account",
    desc: "Profile, orders history, wishlist, change password",
  },
  { path: "/about", label: "About", desc: "Brand story, values, and team" },
  { path: "/contact", label: "Contact", desc: "Contact form and store info" },
  { path: "/faq", label: "FAQ", desc: "Accordion FAQ by category" },
  {
    path: "/login",
    label: "Login / Register",
    desc: "Auth with demo credentials pre-filled",
  },
];

const TECH = [
  "React 18 + Vite",
  "Tailwind CSS v4",
  "shadcn/ui + Radix UI",
  "React Router v6",
  "Lucide React icons",
  "Sonner toasts",
  "react-helmet-async",
  "localStorage persistence",
];

const DEMO_CREDS = {
  email: "abdur.rahman@gmail.com",
  password: "demo1234",
};

export default function DemoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(DEMO_KEY)) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(DEMO_KEY, "1");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
      }}
    >
      <DialogContent className="rounded-none border-stone-300 bg-stone-50 max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-stone-950 px-6 py-6 sticky top-0 z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-1">
                Demo Project
              </p>
              <DialogTitle className="font-display font-light text-2xl text-stone-50">
                RAJA Atelier
              </DialogTitle>
              <p className="text-xs text-stone-400 font-light mt-1">
                A luxury menswear e-commerce built with React
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-stone-400 hover:text-stone-50 transition-colors mt-1 shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-6">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={14} className="text-amber-600" />
              <h3 className="text-[10px] tracking-widest uppercase text-amber-600">
                About This Project
              </h3>
            </div>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              RAJA Atelier is a fully functional luxury menswear e-commerce demo
              for Bangladesh. It includes a complete shopping experience — from
              browsing products to checkout — with all data stored locally in
              your browser. No backend required.
            </p>
          </div>

          <Separator className="bg-stone-200" />

          {/* Demo credentials */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User size={14} className="text-amber-600" />
              <h3 className="text-[10px] tracking-widests uppercase text-amber-600">
                Demo Credentials
              </h3>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 flex flex-col gap-1.5">
              <p className="text-xs text-stone-600">
                <span className="text-stone-400 font-light">Email: </span>
                <span className="font-medium text-stone-950">
                  {DEMO_CREDS.email}
                </span>
              </p>
              <p className="text-xs text-stone-600">
                <span className="text-stone-400 font-light">Password: </span>
                <span className="font-medium text-stone-950">
                  {DEMO_CREDS.password}
                </span>
              </p>
              <p className="text-[10px] text-amber-600 mt-1">
                Or register a new account — it will be saved in your browser.
              </p>
            </div>
          </div>

          <Separator className="bg-stone-200" />

          {/* What you can do */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag size={14} className="text-amber-600" />
              <h3 className="text-[10px] tracking-widests uppercase text-amber-600">
                What You Can Do
              </h3>
            </div>
            <ul className="flex flex-col gap-2">
              {[
                "Browse 52 luxury menswear products across 10 categories",
                "Add items to cart and wishlist — persisted in browser",
                "Filter by category, sort by price or rating, search products",
                "Complete a full checkout with shipping and payment steps",
                "Use promo codes: RAJA10, WELCOME20, FREESHIP",
                "View order history in your account",
                "Edit your profile and change your password",
                "Register a new account or use demo credentials",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-stone-600 font-light"
                >
                  <span className="text-amber-600 mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="bg-stone-200" />

          {/* Routes */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers size={14} className="text-amber-600" />
              <h3 className="text-[10px] tracking-widests uppercase text-amber-600">
                Pages & Routes
              </h3>
            </div>
            <div className="flex flex-col gap-0">
              {ROUTES.map((r, i) => (
                <div key={r.path}>
                  <div className="flex items-start gap-3 py-2.5">
                    <code className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 shrink-0 font-mono">
                      {r.label}
                    </code>
                    <p className="text-xs text-stone-500 font-light leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                  {i < ROUTES.length - 1 && (
                    <Separator className="bg-stone-100" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-stone-200" />

          {/* Tech stack */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code size={14} className="text-amber-600" />
              <h3 className="text-[10px] tracking-widests uppercase text-amber-600">
                Tech Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="border border-stone-300 px-3 py-1 text-[10px] tracking-wide uppercase text-stone-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={handleClose}
            className="w-full rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs py-5"
          >
            Start Exploring
          </Button>

          <p className="text-[10px] text-stone-400 text-center -mt-2">
            This modal won't appear again. Refresh storage to reset.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
