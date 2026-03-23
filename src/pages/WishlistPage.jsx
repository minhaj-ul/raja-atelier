import { useState, useEffect } from "react";
import ConfirmDialog from "../components/shared/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Badge from "../components/shared/Badge";
import Layout from "../layouts/Layout";
import PageTitle from "../components/shared/PageTitle";
import Spinner from "../components/shared/Spinner";

export default function WishlistPage({
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  user,
  onLogout,
  cart,
  cartCount,
  onUpdateQty,
  onRemove,
  wishlistCount,
}) {
  const navigate = useNavigate();
  const [pendingDelete, setPendingDelete] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout
      user={user}
      onLogout={onLogout}
      cart={cart}
      cartCount={cartCount}
      onUpdateQty={onUpdateQty}
      onRemove={onRemove}
      wishlistCount={wishlistCount}
    >
      <div className="bg-stone-100 min-h-screen">
        <PageTitle title="Wishlist" />

        {/* Hero */}
        <section className="bg-stone-950 text-stone-100 px-5 md:px-7 py-16 md:py-24 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-amber-600 mb-4">
            Your Collection
          </p>
          <h1 className="font-display font-light text-4xl md:text-5xl leading-tight mb-4">
            Wishlist
          </h1>
          <p className="text-sm font-light text-stone-400 max-w-md mx-auto leading-relaxed">
            {wishlist.length === 0
              ? "You haven't saved any pieces yet."
              : `You have ${wishlist.length} ${wishlist.length === 1 ? "piece" : "pieces"} saved.`}
          </p>
        </section>

        {/* Content */}
        <section className="max-w-340 mx-auto px-5 md:px-7 py-16 md:py-24">
          {/* Empty state */}
          {loading ? (
            <div className="flex justify-center py-24">
              <Spinner size={24} />
            </div>
          ) : wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-5 text-stone-500">
              <Heart size={48} strokeWidth={1} className="text-stone-300" />
              <p className="font-display text-2xl italic">
                Your wishlist is empty
              </p>
              <p className="text-sm font-light">
                Save pieces you love by clicking the heart icon on any product.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs px-8 py-5 gap-2 mt-2"
              >
                Explore the Collection
                <ArrowRight size={14} />
              </Button>
            </div>
          ) : (
            <>
              {/* Wishlist grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="bg-stone-50 border border-stone-300 group"
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.badge && <Badge text={product.badge} />}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-3/4 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-amber-600 mb-1">
                        {product.category}
                      </p>
                      <h3
                        className="font-display font-normal text-lg leading-snug mb-1.5 text-stone-950 cursor-pointer hover:text-amber-600 transition-colors"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mb-3">
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
                        <span className="text-[11px] text-stone-500">
                          ({product.reviews})
                        </span>
                      </div>
                      <p className="text-xl font-medium text-stone-950 mb-4">
                        ৳{product.price}
                      </p>

                      <Separator className="bg-stone-200 mb-4" />

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-[11px] h-9 gap-1.5"
                          onClick={() => onAddToCart(product)}
                        >
                          <ShoppingBag size={13} />
                          Add to Bag
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-none border-stone-300 hover:bg-red-50 hover:text-red-500 hover:border-red-200 h-9 w-9 transition-colors"
                          onClick={() => setPendingDelete(product)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-stone-300 my-12" />

              {/* Bottom CTA */}
              <div className="text-center">
                <p className="text-sm text-stone-500 font-light mb-5">
                  Want to keep exploring?
                </p>
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="rounded-none border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-stone-50 uppercase tracking-widest text-xs px-8 py-5 gap-2"
                >
                  Back to Shop
                  <ArrowRight size={14} />
                </Button>
              </div>
            </>
          )}
        </section>

        {/* Delete confirmation */}
        <ConfirmDialog
          open={!!pendingDelete}
          onOpenChange={(open) => !open && setPendingDelete(null)}
          title="Remove from wishlist?"
          description={
            pendingDelete
              ? `Are you sure you want to remove ${pendingDelete.name} from your wishlist?`
              : ""
          }
          confirmLabel="Remove"
          cancelLabel="Keep it"
          variant="danger"
          onConfirm={() => {
            onRemoveFromWishlist(pendingDelete.id);
            setPendingDelete(null);
          }}
        />
      </div>
    </Layout>
  );
}
