import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS } from "../../data/products";
import Spinner from "../shared/Spinner";

const BESTSELLERS = PRODUCTS.filter((p) => p.badge === "Bestseller").slice(
  0,
  4,
);

export default function Bestsellers({ onAddToCart }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="max-w-340 mx-auto px-5 md:px-7 py-14 md:py-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-2">
            Most Loved
          </p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-stone-950">
            Bestsellers
          </h2>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate("/?filter=bestseller", { replace: true })}
          className="rounded-none text-xs uppercase tracking-widest text-stone-500 hover:text-amber-600 hover:bg-transparent gap-1.5 hidden md:flex"
        >
          View All <ArrowRight size={13} />
        </Button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size={24} />
        </div>
      ) : (
        <div className="flex flex-col gap-0">
          {BESTSELLERS.map((product, index) => (
            <div key={product.id}>
              <div
                className="flex items-center gap-4 md:gap-6 py-4 md:py-5 group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Number */}
                <span className="font-display text-3xl md:text-4xl font-light text-stone-200 w-8 shrink-0 select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Image */}
                <div className="w-16 h-20 md:w-20 md:h-24 overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] tracking-widest uppercase text-amber-600 mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-display text-base md:text-xl font-normal text-stone-950 group-hover:text-amber-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm font-semibold text-stone-950 mt-1">
                    ৳{product.price.toLocaleString()}
                  </p>
                </div>

                {/* Add to cart */}
                <Button
                  size="sm"
                  className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-[10px] h-9 px-3 gap-1.5 shrink-0 hidden sm:flex"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                >
                  <ShoppingBag size={12} />
                  Add
                </Button>
              </div>
              <Separator className="bg-stone-200" />
            </div>
          ))}
        </div>
      )}

      {/* Mobile view all */}
      <div className="flex justify-center mt-8 md:hidden">
        <Button
          variant="outline"
          onClick={() => navigate("/?filter=bestseller", { replace: true })}
          className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-950 hover:text-stone-50 uppercase tracking-widest text-xs px-8 py-5 gap-2"
        >
          View All <ArrowRight size={13} />
        </Button>
      </div>

      <Separator className="bg-stone-200 mt-14 md:mt-20" />
    </section>
  );
}
