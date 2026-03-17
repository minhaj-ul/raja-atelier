import { useState } from "react";
import { toast } from "sonner";

export function useCart() {
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });
    toast.success(`${product.name} added to bag`);
  };

  const updateQty = (id, qty) => {
    if (qty < 1) {
      removeItem(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    cartCount,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
  };
}
