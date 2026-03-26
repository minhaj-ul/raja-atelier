import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Minus,
  Plus,
  Check,
  Heart,
  Zap,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Badge from "../components/shared/Badge";
import { PRODUCTS } from "../data/products";
import Layout from "../layouts/Layout";
import PageTitle from "../components/shared/PageTitle";
import Spinner from "../components/shared/Spinner";
import ImageLoader from "../components/shared/ImageLoader";

export default function ProductPage({
  onAddToCart,
  user,
  onLogout,
  cart,
  cartCount,
  onUpdateQty,
  onRemove,
  wishlistCount,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 200);
    return () => clearTimeout(timer);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center gap-4 text-stone-500">
        <p className="font-display text-2xl italic">Product not found</p>
        <Button
          variant="outline"
          className="rounded-none uppercase tracking-widest text-xs border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-stone-50"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={14} /> Back to Shop
        </Button>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  return (
    <Layout
      user={user}
      onLogout={onLogout}
      cart={cart}
      cartCount={cartCount}
      onUpdateQty={onUpdateQty}
      onRemove={onRemove}
      wishlistCount={wishlistCount}
      onClearCart={onClearCart}
    >
      <div className="min-h-screen bg-stone-100">
        <PageTitle title={product.name} />

        {pageLoading ? (
          <div className="flex items-center justify-center py-40">
            <div className="flex flex-col items-center gap-4">
              <Spinner size={28} />
              <p className="text-xs uppercase tracking-widest text-stone-400">
                Loading product…
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="max-w-340 mx-auto px-5 md:px-7 pt-6 pb-2">
              <Button
                variant="ghost"
                className="rounded-none text-xs uppercase tracking-widest text-stone-500 hover:text-stone-950 hover:bg-transparent gap-1.5 px-0"
                onClick={() => navigate("/")}
              >
                <ArrowLeft size={14} />
                Back to Shop
              </Button>
            </div>

            {/* Main content */}
            <div className="max-w-340 mx-auto px-5 md:px-7 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
                {/* Image */}
                <div className="relative overflow-hidden">
                  {product.badge && <Badge text={product.badge} />}
                  <ImageLoader
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-3/4 object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-2.5">
                    {product.category}
                  </p>
                  <h1 className="font-display font-normal text-3xl md:text-4xl leading-tight mb-2.5">
                    {product.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={11}
                          className={
                            i <= Math.round(product.rating)
                              ? "fill-amber-600 stroke-amber-600"
                              : "fill-stone-200 stroke-stone-200"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-stone-500">
                      {product.rating} · {product.reviews} reviews
                    </span>
                  </div>

                  <p className="text-3xl font-medium mb-5">৳{product.price}</p>

                  <Separator className="bg-stone-300 mb-5" />

                  <p className="text-sm leading-relaxed text-stone-600 font-light mb-6">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-7">
                    {product.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-stone-300 px-3 py-1 text-[10px] tracking-widest uppercase text-stone-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Qty + Add */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                    {/* Qty selector */}
                    <div className="flex items-center border border-stone-300 w-full sm:w-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-none hover:bg-stone-200 shrink-0"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="text-sm flex-1 sm:flex-none sm:px-3 sm:min-w-10 text-center">
                        {qty}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-none hover:bg-stone-200 shrink-0"
                        onClick={() => setQty((q) => q + 1)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>

                    {/* Add to bag + Wishlist — side by side on mobile */}
                    <div className="flex items-center gap-3 w-full sm:w-auto sm:contents">
                      {/* Add to bag */}
                      <Button
                        className="flex-1 rounded-none bg-stone-950 hover:bg-stone-800 text-stone-50 uppercase tracking-widest text-xs py-5 gap-2"
                        onClick={handleAdd}
                      >
                        {added ? (
                          <>
                            <Check size={14} /> Added!
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={14} /> Add to Bag
                          </>
                        )}
                      </Button>

                      {/* Wishlist */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-none border-stone-300 hover:bg-stone-200 shrink-0"
                            onClick={() => setWished((w) => !w)}
                          >
                            <Heart
                              size={16}
                              className={
                                wished
                                  ? "fill-amber-600 stroke-amber-600"
                                  : "fill-none stroke-stone-950"
                              }
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="rounded-none text-xs">
                          {wished ? "Remove from wishlist" : "Add to wishlist"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Buy Now button */}
                  <Button
                    className="w-full rounded-none bg-amber-600 hover:bg-amber-700 text-stone-50 uppercase tracking-widest text-xs py-5 gap-2 mb-4"
                    onClick={() => {
                      for (let i = 0; i < qty; i++) onAddToCart(product);
                      navigate("/checkout");
                    }}
                  >
                    <Zap size={14} />
                    Buy Now — ৳{(product.price * qty).toLocaleString()}
                  </Button>

                  <p className="text-[11px] text-stone-500 tracking-wide">
                    Free shipping on orders over ৳5,000 · Easy returns
                  </p>
                </div>
              </div>
            </div>

            {/* Related products */}
            {related.length > 0 && (
              <div className="max-w-340 mx-auto px-5 md:px-7 py-10">
                <Separator className="bg-stone-300 mb-10" />

                <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-2">
                  You may also like
                </p>
                <h2 className="font-display font-normal text-2xl md:text-3xl mb-7">
                  Related Pieces
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                  {related.map((p) => (
                    <div
                      key={p.id}
                      className="cursor-pointer group"
                      onClick={() => navigate(`/product/${p.id}`)}
                    >
                      <div className="relative overflow-hidden mb-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full aspect-3/4 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="font-display text-base leading-snug text-stone-950 group-hover:text-amber-600 transition-colors">
                        {p.name}
                      </p>
                      <p className="text-sm text-stone-500 mt-0.5">
                        ৳{p.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
