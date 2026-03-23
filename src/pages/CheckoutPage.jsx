import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SHIPPING_METHODS, VALID_PROMO_CODES } from "../data/checkout";
import StepIndicator from "../components/checkout/StepIndicator";
import ShippingStep from "../components/checkout/ShippingStep";
import PaymentStep from "../components/checkout/PaymentStep";
import ReviewStep from "../components/checkout/ReviewStep";
import OrderSummary from "../components/checkout/OrderSummary";
import PageTitle from "../components/shared/PageTitle";

export default function CheckoutPage({
  cart,
  onClearCart,
  onPlaceOrder,
  user,
}) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: "Abdur",
    lastName: "Rahman",
    email: "abdur.rahman@gmail.com",
    phone: "+880 1711-234567",
    address1: "House 12, Road 6, Block F",
    address2: "Banani",
    city: "Dhaka",
    postalCode: "1213",
    country: "Bangladesh",
  });
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_METHODS[0]);

  const [payment, setPayment] = useState({
    cardName: "Abdur Rahman",
    cardNumber: "4242 4242 4242 4242",
    expiry: "12/27",
    cvv: "123",
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
      onPlaceOrder({
        cart,
        shipping,
        payment,
        selectedShipping,
        subtotal,
        shippingCost,
        discount,
        total,
        userId: user?.id,
      });
      onClearCart();
      navigate("/order-confirmation");
    }, 1500);
  };

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
      <PageTitle title="Checkout" />

      {/* Top bar */}
      <div className="bg-stone-950 text-stone-100 text-center py-1.5 px-4 text-[10px] tracking-[0.18em] uppercase">
        RAJA Atelier — Secure Checkout
      </div>

      <div className="max-w-340 mx-auto px-5 md:px-7 py-10 md:py-16">
        {/* Step indicator */}
        <StepIndicator currentStep={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
          {/* Form area */}
          <div className="lg:col-span-2">
            <div className="bg-stone-50 border border-stone-300 p-6 md:p-8">
              <h2 className="font-display font-light text-2xl md:text-3xl mb-6 text-stone-950">
                {["Shipping", "Payment", "Review"][step]}
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
            <OrderSummary
              cart={cart}
              subtotal={subtotal}
              shippingCost={shippingCost}
              discount={discount}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
