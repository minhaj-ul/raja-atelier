import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "../data/products";

const LINKS = [
  { title: "Shop", items: CATEGORIES.slice(1) },
  { title: "Help", items: ["Sizing Guide", "Returns", "Shipping", "Contact"] },
  { title: "Company", items: ["About", "Sustainability", "Careers", "Press"] },
];

export default function Footer({ isMobile, isTablet }) {
  return (
    <footer className="bg-stone-950 text-stone-400 border-t-4 border-amber-600">
      {/* Main grid */}
      <div
        className={`
        max-w-340 mx-auto px-5 md:px-7
        pt-10 pb-7
        grid gap-6 md:gap-9
        ${isMobile ? "grid-cols-2" : isTablet ? "grid-cols-2" : "grid-cols-4"}
      `}
      >
        {/* Brand */}
        <div className={isMobile ? "col-span-2" : ""}>
          <div className="font-display text-xl font-light text-stone-100 mb-2.5">
            <span className="italic">MAISON</span>
            <span className="text-[9px] tracking-[0.3em] text-amber-600 ml-1.5">
              Atelier
            </span>
          </div>
          <p className="text-xs leading-relaxed font-light max-w-52">
            Thoughtfully curated fashion for those who dress with intention.
          </p>
        </div>

        {/* Link columns */}
        {LINKS.map((col) => (
          <div key={col.title}>
            <h4 className="text-[9px] tracking-[0.2em] uppercase text-amber-600 mb-3.5">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {col.items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs text-stone-400 hover:text-stone-100 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator className="bg-stone-800 max-w-340 mx-auto" />

      {/* Bottom bar */}
      <div className="max-w-340 mx-auto px-5 md:px-7 py-4 flex justify-between flex-wrap gap-2">
        <p className="text-[10px] tracking-wide">
          © 2026 Maison Atelier. All rights reserved.
        </p>
        <p className="text-[10px] tracking-wide">Free demo project</p>
      </div>
    </footer>
  );
}
