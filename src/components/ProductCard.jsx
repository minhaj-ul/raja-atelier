import { useState } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Badge from "./Badge";
import Stars from "./Stars";

export default function ProductCard({
  product,
  onView,
  onAddToCart,
  delay = 0,
}) {
  const [wished, setWished] = useState(false);

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
            setWished((w) => !w);
          }}
        >
          <Heart
            size={15}
            className={
              wished
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
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-medium text-stone-950">
            ${product.price}
          </span>
          <Button
            size="sm"
            className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-[11px] h-8 px-3 gap-1.5"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <ShoppingBag size={13} />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
