import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS } from "../../data/products";

const NEW_ARRIVALS = PRODUCTS.filter((p) => p.badge === "New").slice(0, 4);

export default function NewArrivals({
  onAddToCart,
  onToggleWishlist,
  isWished,
}) {
  const navigate = useNavigate();

  return (
    <section className="max-w-340 mx-auto px-5 md:px-7 py-14 md:py-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-2">
            Just Arrived
          </p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-stone-950">
            New Arrivals
          </h2>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate("/?filter=new", { replace: true })}
          className="rounded-none text-xs uppercase tracking-widest text-stone-500 hover:text-amber-600 hover:bg-transparent gap-1.5 hidden md:flex"
        >
          View All <ArrowRight size={13} />
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {NEW_ARRIVALS.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {/* Image */}
            <div className="relative overflow-hidden mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-3/4 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-2.5 left-2.5 bg-amber-600 text-stone-50 text-[9px] tracking-widest uppercase px-2.5 py-1">
                New
              </span>
            </div>

            {/* Info */}
            <p className="text-[9px] tracking-widest uppercase text-amber-600 mb-1">
              {product.category}
            </p>
            <h3 className="font-display text-base md:text-lg font-normal leading-snug text-stone-950 group-hover:text-amber-600 transition-colors line-clamp-2 mb-1">
              {product.name}
            </h3>
            <p className="text-sm font-semibold text-stone-950">
              ৳{product.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile view all */}
      <div className="flex justify-center mt-8 md:hidden">
        <Button
          variant="outline"
          onClick={() => navigate("/?filter=new", { replace: true })}
          className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-950 hover:text-stone-50 uppercase tracking-widest text-xs px-8 py-5 gap-2"
        >
          View All <ArrowRight size={13} />
        </Button>
      </div>

      <Separator className="bg-stone-200 mt-14 md:mt-20" />
    </section>
  );
}
