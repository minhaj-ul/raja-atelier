import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ConfirmDialog from "../shared/ConfirmDialog";

const VISIBLE_STEP = 6;

export default function WishlistTab({
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
}) {
  const navigate = useNavigate();
  const [pendingDelete, setPendingDelete] = useState(null);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_STEP);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-light text-2xl text-stone-950">
          My Wishlist
        </h2>
        {wishlist.length > 0 && (
          <p className="text-xs text-stone-400">
            {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"}
          </p>
        )}
      </div>

      {/* Empty state */}
      {wishlist.length === 0 ? (
        <div className="bg-stone-50 border border-stone-300 p-10 flex flex-col items-center gap-4 text-stone-400">
          <Heart size={40} strokeWidth={1} />
          <p className="font-display text-lg italic">Your wishlist is empty</p>
          <p className="text-xs font-light text-center">
            Save pieces you love by clicking the heart icon on any product.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs px-8 py-5 mt-2 gap-2"
          >
            <ArrowRight size={13} /> Explore Collection
          </Button>
        </div>
      ) : (
        <>
          {/* Bestseller-style list */}
          <div className="flex flex-col gap-0">
            {wishlist.slice(0, visibleCount).map((product, index) => (
              <div key={product.id}>
                <div
                  className="flex items-center gap-4 md:gap-6 py-4 md:py-5 group cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Number */}
                  {/* <span className="font-display text-3xl md:text-4xl font-light text-stone-300 w-8 shrink-0 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span> */}

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
                    <h3 className="font-display text-base md:text-lg font-normal text-stone-950 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm font-semibold text-stone-950 mt-1">
                      ৳{product.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-[10px] h-9 px-3 gap-1.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                    >
                      <ShoppingBag size={12} /> Add
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-none border-stone-300 hover:bg-red-50 hover:text-red-500 hover:border-red-200 h-9 w-9 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPendingDelete(product);
                      }}
                    >
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>
                <Separator className="bg-stone-200" />
              </div>
            ))}
          </div>

          {/* Load more */}
          {visibleCount < wishlist.length && (
            <div className="flex flex-col items-center gap-2 mt-6">
              <p className="text-xs text-stone-400">
                Showing {visibleCount} of {wishlist.length} pieces
              </p>
              <Button
                variant="outline"
                onClick={() => setVisibleCount((c) => c + VISIBLE_STEP)}
                className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-950 hover:text-stone-50 uppercase tracking-widest text-xs px-8 py-4 gap-2"
              >
                Load More
              </Button>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="rounded-none border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-stone-50 uppercase tracking-widest text-xs px-8 py-5 gap-2"
            >
              Keep Exploring <ArrowRight size={13} />
            </Button>
          </div>
        </>
      )}

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
  );
}
