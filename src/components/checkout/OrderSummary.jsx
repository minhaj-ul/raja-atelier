import { Separator } from "@/components/ui/separator";

export default function OrderSummary({
  cart,
  subtotal,
  shippingCost,
  discount,
  total,
}) {
  return (
    <div className="bg-stone-50 border border-stone-300 p-5 sticky top-24">
      <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
        Order Summary
      </p>

      {/* Items */}
      <div className="flex flex-col gap-0">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 py-3 border-b border-stone-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-16 object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm leading-snug text-stone-950">
                {item.name}
              </p>
              <p className="text-xs text-stone-500 mt-0.5">Qty: {item.qty}</p>
            </div>
            <p className="text-sm font-medium text-stone-950 shrink-0">
              ${(item.price * item.qty).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex flex-col gap-2 pt-4">
        <div className="flex justify-between text-xs text-stone-500">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs text-stone-500">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-xs text-amber-600">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <Separator className="bg-stone-200 my-1" />
        <div className="flex justify-between font-medium text-stone-950">
          <span className="text-sm">Total</span>
          <span className="text-base">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
