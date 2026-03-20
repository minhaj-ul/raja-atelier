import { ShoppingBag, Heart, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Badge from "./Badge";

export default function ProductCard({
  product,
  onView,
  onAddToCart,
  onToggleWishlist,
  isWished,
  delay = 0,
}) {
  return (
    <Card
      className="group rounded-none border border-stone-200 bg-stone-50 overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-lg cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onView(product)}
    >
      {/* ── Image ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {product.badge && <Badge text={product.badge} />}
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-3/4 object-cover transition-transform duration-700 group-hover:scale-103"
          loading="lazy"
        />
      </div>

      {/* ── Info ──────────────────────────────────────────────── */}
      <CardContent className="flex flex-col gap-1.5 px-3 pt-3 pb-2 flex-1">
        {/* Category */}
        <p className="text-[9px] tracking-[0.18em] uppercase text-amber-600 font-medium">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="font-display font-normal text-base md:text-lg leading-snug text-stone-950 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating + reviews */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={10}
                className={
                  i <= Math.round(product.rating)
                    ? "fill-amber-600 stroke-amber-600"
                    : "fill-stone-200 stroke-stone-200"
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-stone-400 leading-none">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <p className="text-base md:text-lg font-semibold text-stone-950 mt-auto pt-1">
          ৳{product.price.toLocaleString()}
        </p>
      </CardContent>

      <Separator className="bg-stone-200 mx-3" />

      {/* ── Action buttons ─────────────────────────────────────── */}
      <CardFooter className="px-3 py-2.5 flex items-stretch gap-2">
        {/* Add to cart */}
        <Button
          className="flex-1 min-w-0 rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-[10px] h-9 gap-1 transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <ShoppingBag size={11} className="shrink-0" />
          <span className="truncate">Add to Bag</span>
        </Button>

        {/* Wishlist */}
        <Button
          variant="outline"
          className="rounded-none border-stone-200 hover:border-amber-600 hover:bg-amber-50 h-9 w-9 min-w-9 p-0 shrink-0 flex items-center justify-center transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
        >
          <Heart
            size={14}
            className={
              isWished
                ? "fill-amber-600 stroke-amber-600"
                : "fill-none stroke-stone-950"
            }
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
