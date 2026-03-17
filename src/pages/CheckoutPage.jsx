import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Tag,
  Truck,
  CreditCard,
  ClipboardList,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  SHIPPING_METHODS,
  VALID_PROMO_CODES,
  COUNTRIES,
} from "../data/checkout";

// ── Step indicator ────────────────────────────────────────────────
const STEPS = [
  { label: "Shipping", icon: Truck },
  { label: "Payment", icon: CreditCard },
  { label: "Review", icon: ClipboardList },
];

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        return (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`
                w-9 h-9 rounded-full flex items-center justify-center transition-all
                ${
                  isCompleted
                    ? "bg-amber-600 text-stone-50"
                    : isActive
                      ? "bg-stone-950 text-stone-50"
                      : "bg-stone-200 text-stone-400"
                }
              `}
              >
                {isCompleted ? <Check size={15} /> : <Icon size={15} />}
              </div>
              <span
                className={`text-[10px] uppercase tracking-widest ${
                  isActive ? "text-stone-950" : "text-stone-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`w-16 md:w-24 h-px mx-2 mb-5 ${
                  isCompleted ? "bg-amber-600" : "bg-stone-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div>
      <label className="text-[10px] tracking-widest uppercase text-stone-500 mb-1.5 block">
        {label} {required && <span className="text-amber-600">*</span>}
      </label>
      {children}
    </div>
  );
}

// ── Step 1: Shipping ──────────────────────────────────────────────
function ShippingStep({ data, onChange, selectedShipping, onSelectShipping }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
          Contact Information
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" required>
            <Input
              value={data.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              placeholder="Isabelle"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Last Name" required>
            <Input
              value={data.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              placeholder="Laurent"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Email Address" required>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="hello@example.com"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Phone Number">
            <Input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+33 1 23 45 67 89"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
        </div>
      </div>

      <Separator className="bg-stone-200" />

      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
          Shipping Address
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Address Line 1" required>
            <Input
              value={data.address1}
              onChange={(e) => onChange("address1", e.target.value)}
              placeholder="12 Rue du Faubourg"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light col-span-2"
            />
          </Field>
          <Field label="Address Line 2">
            <Input
              value={data.address2}
              onChange={(e) => onChange("address2", e.target.value)}
              placeholder="Apartment, suite, etc."
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="City" required>
            <Input
              value={data.city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="Paris"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Postal Code" required>
            <Input
              value={data.postalCode}
              onChange={(e) => onChange("postalCode", e.target.value)}
              placeholder="75008"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Country" required>
            <select
              value={data.country}
              onChange={(e) => onChange("country", e.target.value)}
              className="w-full border border-stone-300 bg-stone-50 px-3 py-2 text-sm font-sans font-light text-stone-950 outline-none focus:ring-1 focus:ring-amber-600 appearance-none cursor-pointer"
            >
              <option value="">Select a country…</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <Separator className="bg-stone-200" />

      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
          Shipping Method
        </p>
        <div className="flex flex-col gap-3">
          {SHIPPING_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => onSelectShipping(method)}
              className={`
                flex items-center justify-between p-4 border text-left transition-all
                ${
                  selectedShipping?.id === method.id
                    ? "border-amber-600 bg-amber-50"
                    : "border-stone-300 bg-stone-50 hover:border-stone-400"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                  ${
                    selectedShipping?.id === method.id
                      ? "border-amber-600"
                      : "border-stone-300"
                  }
                `}
                >
                  {selectedShipping?.id === method.id && (
                    <div className="w-2 h-2 rounded-full bg-amber-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-950">
                    {method.label}
                  </p>
                  <p className="text-xs text-stone-500 font-light">
                    {method.description} · {method.note}
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-stone-950 shrink-0 ml-4">
                {method.price === 0 ? "Free" : `$${method.price}`}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Payment ───────────────────────────────────────────────
function PaymentStep({
  data,
  onChange,
  promoCode,
  promoInput,
  onPromoInput,
  onApplyPromo,
  appliedPromo,
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
          Card Details
        </p>
        <div className="grid grid-cols-1 gap-4">
          <Field label="Name on Card" required>
            <Input
              value={data.cardName}
              onChange={(e) => onChange("cardName", e.target.value)}
              placeholder="Isabelle Laurent"
              className="rounded-none border-stone-300 bg-stone-50 focus-visible:ring-amber-600 font-light"
            />
          </Field>
          <Field label="Card Number" required>
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
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiry Date" required>
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
            </Field>
            <Field label="CVV" required>
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
            </Field>
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

// ── Step 3: Review ────────────────────────────────────────────────
function ReviewStep({
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
          <div className="flex justify-between text-base font-medium text-stone-950">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main CheckoutPage ─────────────────────────────────────────────
export default function CheckoutPage({ cart, onClearCart }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_METHODS[0]);

  const [payment, setPayment] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingCost =
    appliedPromo?.type === "freeship" ? 0 : selectedShipping?.price || 0;
  const discount =
    appliedPromo?.type === "percent"
      ? (subtotal * appliedPromo.discount) / 100
      : 0;
  const total = subtotal + shippingCost - discount;

  const handleShippingChange = (key, val) =>
    setShipping((prev) => ({ ...prev, [key]: val }));

  const handlePaymentChange = (key, val) =>
    setPayment((prev) => ({ ...prev, [key]: val }));

  const handleApplyPromo = () => {
    const promo = VALID_PROMO_CODES[promoInput];
    if (promo) {
      setAppliedPromo(promo);
      toast.success(`Promo code applied: ${promo.label}`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  const validateStep1 = () => {
    const { firstName, lastName, email, address1, city, postalCode, country } =
      shipping;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !address1 ||
      !city ||
      !postalCode ||
      !country
    ) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { cardName, cardNumber, expiry, cvv } = payment;
    if (!cardName || !cardNumber || !expiry || !cvv) {
      toast.error("Please fill in all payment details");
      return false;
    }
    if (cardNumber.replace(/\s/g, "").length < 16) {
      toast.error("Please enter a valid card number");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    setStep((s) => s + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClearCart();
      navigate("/order-confirmation");
    }, 1500);
  };

  // Redirect if cart is empty
  if (cart.length === 0 && step === 0) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center gap-4 text-stone-500">
        <p className="font-display text-2xl italic">Your bag is empty</p>
        <Button
          onClick={() => navigate("/")}
          className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs px-8 py-5"
        >
          Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-stone-100 min-h-screen">
      {/* Header */}
      <div className="bg-stone-950 text-stone-100 text-center py-1.5 px-4 text-[10px] tracking-[0.18em] uppercase">
        Secure Checkout
      </div>

      <div className="max-w-340 mx-auto px-5 md:px-7 py-10 md:py-16">
        {/* Step indicator */}
        <StepIndicator currentStep={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-stone-50 border border-stone-300 p-6 md:p-8">
              <h2 className="font-display font-light text-2xl md:text-3xl mb-6 text-stone-950">
                {STEPS[step].label}
              </h2>

              {step === 0 && (
                <ShippingStep
                  data={shipping}
                  onChange={handleShippingChange}
                  selectedShipping={selectedShipping}
                  onSelectShipping={setSelectedShipping}
                />
              )}
              {step === 1 && (
                <PaymentStep
                  data={payment}
                  onChange={handlePaymentChange}
                  promoInput={promoInput}
                  onPromoInput={setPromoInput}
                  onApplyPromo={handleApplyPromo}
                  appliedPromo={appliedPromo}
                />
              )}
              {step === 2 && (
                <ReviewStep
                  shipping={shipping}
                  payment={payment}
                  selectedShipping={selectedShipping}
                  cart={cart}
                  subtotal={subtotal}
                  discount={discount}
                  total={total}
                />
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-stone-200">
                {step > 0 ? (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-200 uppercase tracking-widest text-xs px-6 py-5 gap-2"
                  >
                    <ChevronLeft size={14} /> Back
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-200 uppercase tracking-widest text-xs px-6 py-5 gap-2"
                  >
                    <ChevronLeft size={14} /> Back to Shop
                  </Button>
                )}

                {step < 2 ? (
                  <Button
                    onClick={handleNext}
                    className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs px-6 py-5 gap-2"
                  >
                    Continue <ChevronRight size={14} />
                  </Button>
                ) : (
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="rounded-none bg-amber-600 hover:bg-amber-700 text-stone-50 uppercase tracking-widest text-xs px-6 py-5 gap-2"
                  >
                    {loading ? (
                      "Placing Order…"
                    ) : (
                      <>
                        <Check size={14} /> Place Order
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-stone-50 border border-stone-300 p-5 sticky top-24">
              <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
                Order Summary
              </p>
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
                      <p className="text-xs text-stone-500 mt-0.5">
                        Qty: {item.qty}
                      </p>
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
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
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
          </div>
        </div>
      </div>
    </div>
  );
}
