import { Check, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "../../data/products";

export default function FilterSheet({
  category,
  setCategory,
  sortBy,
  setSortBy,
  count,
  onClose,
}) {
  const SORT_OPTIONS = [
    { value: "default", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
  ];

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="bg-stone-50 border-stone-300 rounded-t-2xl px-5 pb-9 max-h-[82vh] overflow-y-auto"
      >
        {/* Handle bar */}
        <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto mb-5 mt-1" />

        {/* Header */}
        <SheetHeader>
          <SheetTitle className="font-display font-normal text-2xl text-stone-950 flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-amber-600" />
            Filter & Sort
          </SheetTitle>
        </SheetHeader>

        {/* Category */}
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-3">
          Category
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              variant="outline"
              onClick={() => setCategory(c)}
              className={`
                rounded-none text-xs uppercase tracking-widest h-8 px-4
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

        <Separator className="bg-stone-200 mb-6" />

        {/* Sort */}
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-3">
          Sort By
        </p>
        <div className="flex flex-col">
          {SORT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSortBy(value)}
              className="flex items-center justify-between py-3 px-1 border-b border-stone-200 text-left font-sans text-sm font-light tracking-wide hover:text-amber-600 transition-colors"
            >
              <span
                className={
                  sortBy === value ? "text-amber-600" : "text-stone-950"
                }
              >
                {label}
              </span>
              {sortBy === value && (
                <Check size={15} className="text-amber-600" />
              )}
            </button>
          ))}
        </div>

        {/* CTA */}
        <Button
          className="w-full mt-6 rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs py-5"
          onClick={onClose}
        >
          Show {count} pieces
        </Button>
      </SheetContent>
    </Sheet>
  );
}
