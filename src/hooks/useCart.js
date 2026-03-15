import { useState } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });
    setToast(`${product.name} added to bag`);
    setTimeout(() => setToast(null), 2500);
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

  return {
    cart,
    toast,
    cartCount,
    addToCart,
    updateQty,
    removeItem,
  };
}
