import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const STATUS_STYLES = {
  confirmed: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  dispatched: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  delivered: "bg-green-100 text-green-700 hover:bg-green-100",
  cancelled: "bg-red-100 text-red-700 hover:bg-red-100",
};

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(order.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const delivery = new Date(order.estimatedDelivery).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className="bg-stone-50 border border-stone-300">
      {/* Order header — click to expand */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 p-4 md:p-5 cursor-pointer hover:bg-stone-100 transition-colors"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-stone-950">{order.id}</p>
            <Badge
              className={`rounded-none text-[9px] tracking-widest uppercase ${STATUS_STYLES[order.status] || STATUS_STYLES.confirmed}`}
            >
              {order.status}
            </Badge>
          </div>
          <p className="text-xs text-stone-400">{date}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-stone-950">
              ৳{order.total.toLocaleString()}
            </p>
            <p className="text-xs text-stone-400">
              {order.items.reduce((s, i) => s + i.qty, 0)} items
            </p>
          </div>
          {expanded ? (
            <ChevronUp size={16} className="text-stone-400 shrink-0" />
          ) : (
            <ChevronDown size={16} className="text-stone-400 shrink-0" />
          )}
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-stone-200">
          {/* Items */}
          <div className="p-4 md:p-5">
            <p className="text-[10px] tracking-widests uppercase text-amber-600 mb-3">
              Items Ordered
            </p>
            <div className="flex flex-col">
              {order.items.map((item) => (
                <div key={item.id}>
                  <div className="flex gap-3 py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-16 object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] tracking-widests uppercase text-amber-600 mb-0.5">
                        {item.category}
                      </p>
                      <p className="font-display text-sm leading-snug text-stone-950">
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Qty: {item.qty}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-stone-950 shrink-0">
                      ৳{(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>
                  <Separator className="bg-stone-100" />
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-1.5 pt-3">
              <div className="flex justify-between text-xs text-stone-500">
                <span>Subtotal</span>
                <span>৳{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Shipping</span>
                <span>
                  {order.shippingCost === 0 ? "Free" : `৳${order.shippingCost}`}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-xs text-amber-600">
                  <span>Discount</span>
                  <span>-৳{order.discount.toLocaleString()}</span>
                </div>
              )}
              <Separator className="bg-stone-200 my-1" />
              <div className="flex justify-between text-sm font-semibold text-stone-950">
                <span>Total</span>
                <span>৳{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator className="bg-stone-200" />

          {/* Shipping + Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin size={13} className="text-amber-600" />
                <p className="text-[10px] tracking-widests uppercase text-amber-600">
                  Delivery Address
                </p>
              </div>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {order.shipping.firstName} {order.shipping.lastName}
                <br />
                {order.shipping.address1}
                {order.shipping.address2 && `, ${order.shipping.address2}`}
                <br />
                {order.shipping.city}, {order.shipping.postalCode}
                <br />
                {order.shipping.country}
              </p>
            </div>
            <div className="p-4 md:p-5 sm:border-l border-t sm:border-t-0 border-stone-200">
              <div className="flex items-center gap-1.5 mb-2">
                <CreditCard size={13} className="text-amber-600" />
                <p className="text-[10px] tracking-widests uppercase text-amber-600">
                  Payment
                </p>
              </div>
              <p className="text-xs text-stone-600 font-light">
                Card ending in {order.paymentLast4}
              </p>
              <p className="text-xs text-stone-600 font-light mt-1">
                {order.selectedShipping?.label}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Est. delivery: {delivery}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
