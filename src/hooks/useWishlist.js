import { useState } from "react";
import { toast } from "sonner";

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  const isWished = (productId) =>
    wishlist.some((item) => item.id === productId);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        toast.success(`${product.name} removed from wishlist`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        toast.success(`${product.name} added to wishlist`);
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const wishlistCount = wishlist.length;

  return {
    wishlist,
    wishlistCount,
    isWished,
    toggleWishlist,
    removeFromWishlist,
  };
}
