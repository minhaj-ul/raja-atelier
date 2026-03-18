import { Separator } from "@/components/ui/separator";

export default function ReviewStep({
  shipping,
  payment,
  selectedShipping,
  cart,
  subtotal,
  discount,
  total,
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Shipping info */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-3">
          Shipping Details
        </p>
        <div className="bg-stone-50 border border-stone-200 p-4 text-sm font-light text-stone-600 leading-relaxed">
          <p className="font-medium text-stone-950">
            {shipping.firstName} {shipping.lastName}
          </p>
          <p>{shipping.email}</p>
          {shipping.phone && <p>{shipping.phone}</p>}
          <Separator className="bg-stone-200 my-2" />
          <p>{shipping.address1}</p>
          {shipping.address2 && <p>{shipping.address2}</p>}
          <p>
            {shipping.city}, {shipping.postalCode}
          </p>
          <p>{shipping.country}</p>
          <Separator className="bg-stone-200 my-2" />
          <p className="text-amber-600">
            {selectedShipping?.label} — {selectedShipping?.description}
          </p>
        </div>
      </div>

      {/* Payment info */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-3">
          Payment
        </p>
        <div className="bg-stone-50 border border-stone-200 p-4 text-sm font-light text-stone-600">
          <p className="font-medium text-stone-950">{payment.cardName}</p>
          <p>Card ending in {payment.cardNumber.slice(-4)}</p>
          <p>Expires {payment.expiry}</p>
        </div>
      </div>

      {/* Order items */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-3">
          Order Items
        </p>
        <div className="flex flex-col">
          {cart.map((item) => (
            <div key={item.id}>
              <div className="flex gap-3 py-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-18 object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-widest text-amber-600 mb-0.5">
                    {item.category}
                  </p>
                  <p className="font-display text-base leading-snug text-stone-950">
                    {item.name}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Qty: {item.qty}
                  </p>
                </div>
                <p className="text-sm font-medium text-stone-950 shrink-0">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
              </div>
              <Separator className="bg-stone-200" />
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex flex-col gap-2 pt-4">
          <div className="flex justify-between text-sm text-stone-500">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-stone-500">
            <span>Shipping</span>
            <span>
              {selectedShipping?.price === 0
                ? "Free"
                : `$${selectedShipping?.price.toFixed(2)}`}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-amber-600">
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
    </div>
  );
}
