import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderCard from "./OrderCard";
import Spinner from "../shared/Spinner";

export default function OrdersTab({ orders }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-light text-2xl text-stone-950">
          My Orders
        </h2>
        {orders.length > 0 && (
          <p className="text-xs text-stone-400">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        )}
      </div>

      {/* Empty state */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size={22} />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-stone-50 border border-stone-300 p-10 flex flex-col items-center gap-4 text-stone-400">
          <Package size={40} strokeWidth={1} />
          <p className="font-display text-lg italic">No orders yet</p>
          <p className="text-xs font-light text-center">
            Your order history will appear here after you make a purchase.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs px-8 py-5 mt-2 gap-2"
          >
            <ShoppingBag size={13} />
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
