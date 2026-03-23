import { useState, useEffect } from "react";

const ORDERS_KEY = "raja_atelier_orders";

function loadOrders() {
  try {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {}
}

export function useOrders() {
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const placeOrder = ({
    cart,
    shipping,
    payment,
    selectedShipping,
    subtotal,
    shippingCost,
    discount,
    total,
    userId,
  }) => {
    const newOrder = {
      id: `RA-${Date.now()}`,
      userId,
      date: new Date().toISOString(),
      status: "confirmed",
      items: cart,
      shipping,
      paymentLast4: payment.cardNumber.replace(/\s/g, "").slice(-4),
      selectedShipping,
      subtotal,
      shippingCost,
      discount,
      total,
      estimatedDelivery: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getUserOrders = (userId) => orders.filter((o) => o.userId === userId);

  return {
    orders,
    placeOrder,
    getUserOrders,
  };
}
