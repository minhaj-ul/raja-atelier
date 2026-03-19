import { ShoppingBag, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Badge from "./Badge";
import Stars from "./Stars";

export default function ProductCard({
  product,
  onView,
  onAddToCart,
  onToggleWishlist,
  onBuyNow,
  isWished,
  delay = 0,
}) {
  return (
    <Card
      className="group relative overflow-hidden rounded-none border border-stone-300 bg-stone-50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onView(product)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {product.badge && <Badge text={product.badge} />}
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-3/4 object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Wishlist button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2.5 right-2.5 bg-stone-100/85 hover:bg-stone-100 backdrop-blur-sm rounded-none h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
        >
          <Heart
            size={15}
            className={
              isWished
                ? "fill-amber-600 stroke-amber-600"
                : "fill-none stroke-stone-950"
            }
          />
        </Button>
      </div>

      {/* Info */}
      <CardContent className="p-3.5">
        <p className="text-[10px] tracking-[0.15em] uppercase text-amber-600 mb-1">
          {product.category}
        </p>
        <h3 className="font-display font-normal text-lg leading-snug mb-1.5 text-stone-950">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} />
          <span className="text-[11px] text-stone-500">
            ({product.reviews})
          </span>
        </div>
        <p className="text-xl font-medium text-stone-950 mb-3">
          ৳{product.price.toLocaleString()}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {/* Add to cart */}
            <Button
              size="sm"
              variant="outline"
              className="flex-1 rounded-none border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-stone-50 uppercase tracking-widest text-[11px] h-8 gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              <ShoppingBag size={12} />
              Add
            </Button>

            {/* Buy now */}
            <Button
              size="sm"
              className="flex-1 rounded-none bg-amber-600 hover:bg-amber-700 text-stone-50 uppercase tracking-widest text-[11px] h-8 gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                onBuyNow(product);
              }}
            >
              <Zap size={12} />
              Buy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
