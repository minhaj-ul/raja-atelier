import { Check, Tag, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function PaymentStep({
  data,
  onChange,
  promoInput,
  onPromoInput,
  onApplyPromo,
  appliedPromo,
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Card details */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
          Card Details
        </p>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
              Name on Card <span className="text-amber-600">*</span>
            </label>
            <Input
              value={data.cardName}
              onChange={(e) => onChange("cardName", e.target.value)}
              placeholder="Isabelle Laurent"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
              Card Number <span className="text-amber-600">*</span>
            </label>
            <Input
              value={data.cardNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                const formatted = val.replace(/(.{4})/g, "$1 ").trim();
                onChange("cardNumber", formatted);
              }}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light tracking-widest"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
                Expiry Date <span className="text-amber-600">*</span>
              </label>
              <Input
                value={data.expiry}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  const formatted =
                    val.length > 2 ? `${val.slice(0, 2)}/${val.slice(2)}` : val;
                  onChange("expiry", formatted);
                }}
                placeholder="MM/YY"
                maxLength={5}
                className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
                CVV <span className="text-amber-600">*</span>
              </label>
              <Input
                value={data.cvv}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  onChange("cvv", val);
                }}
                placeholder="123"
                maxLength={4}
                type="password"
                className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-stone-200" />

      {/* Promo code */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
          Promo Code
        </p>
        <div className="flex gap-2">
          <Input
            value={promoInput}
            onChange={(e) => onPromoInput(e.target.value.toUpperCase())}
            placeholder="Enter promo code…"
            className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light flex-1"
          />
          <Button
            onClick={onApplyPromo}
            variant="outline"
            className="rounded-none border-stone-300 hover:bg-stone-950 hover:text-stone-50 uppercase tracking-widest text-xs px-5 shrink-0 gap-1.5"
          >
            <Tag size={13} /> Apply
          </Button>
        </div>
        {appliedPromo && (
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1.5">
            <Check size={12} /> Promo code applied: {appliedPromo.label}
          </p>
        )}
      </div>

      {/* Security notice */}
      <div className="flex items-center gap-2 text-stone-400 bg-stone-50 border border-stone-200 p-3">
        <Lock size={14} className="shrink-0" />
        <p className="text-xs font-light">
          Your payment information is encrypted and secure. We never store your
          card details.
        </p>
      </div>
    </div>
  );
}
