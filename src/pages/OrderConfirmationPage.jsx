import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ORDER_STEPS } from "../data/orderConfirmation";
import PageTitle from "../components/shared/PageTitle";
import Layout from "../layouts/Layout";

const ORDER_NUMBER = `MA-${Math.floor(100000 + Math.random() * 900000)}`;
const ORDER_DATE = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const ESTIMATED_DELIVERY = new Date(
  Date.now() + 5 * 24 * 60 * 60 * 1000,
).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function OrderConfirmationPage({
  cart,
  onClearCart,
  user,
  onLogout,
  cartCount,
  onUpdateQty,
  onRemove,
  wishlistCount,
}) {
  const navigate = useNavigate();

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  const handleBackToShop = () => {
    if (onClearCart) onClearCart();
    navigate("/");
  };

  return (
    <Layout
      user={user}
      onLogout={onLogout}
      cart={cart}
      cartCount={cartCount}
      onUpdateQty={onUpdateQty}
      onRemove={onRemove}
      wishlistCount={wishlistCount}
      onClearCart={onClearCart}
    >
      <div className="bg-stone-100 min-h-screen">
        <PageTitle title="Order Confirmed" />

        {/* Hero */}
        <section className="bg-stone-950 text-stone-100 px-5 md:px-7 py-16 md:py-24 text-center">
          <CheckCircle
            size={48}
            className="text-amber-600 mx-auto mb-6"
            strokeWidth={1.5}
          />
          <p className="text-[10px] tracking-[0.4em] uppercase text-amber-600 mb-4">
            Thank You
          </p>
          <h1 className="font-display font-light text-4xl md:text-5xl leading-tight mb-4">
            Your order is confirmed
          </h1>
          <p className="text-sm font-light text-stone-400 max-w-md mx-auto leading-relaxed">
            We have received your order and will send you a confirmation email
            shortly. Your pieces are being carefully prepared for dispatch.
          </p>
        </section>

        {/* Content */}
        <section className="max-w-340 mx-auto px-5 md:px-7 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Order details */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-3">
                Order Details
              </p>
              <h2 className="font-display font-light text-3xl mb-8 leading-snug">
                Summary
              </h2>

              {/* Order meta */}
              <div className="bg-stone-50 border border-stone-300 p-5 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">
                      Order Number
                    </p>
                    <p className="text-sm font-medium text-stone-950">
                      {ORDER_NUMBER}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">
                      Order Date
                    </p>
                    <p className="text-sm font-medium text-stone-950">
                      {ORDER_DATE}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">
                      Est. Delivery
                    </p>
                    <p className="text-sm font-medium text-stone-950">
                      {ESTIMATED_DELIVERY}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-1">
                      Items
                    </p>
                    <p className="text-sm font-medium text-stone-950">
                      {itemCount} {itemCount === 1 ? "piece" : "pieces"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order items */}
              {cart.length > 0 && (
                <div className="flex flex-col gap-0">
                  {cart.map((item) => (
                    <div key={item.id}>
                      <div className="flex gap-4 py-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] tracking-widest uppercase text-amber-600 mb-1">
                            {item.category}
                          </p>
                          <p className="font-display text-base leading-snug text-stone-950">
                            {item.name}
                          </p>
                          <p className="text-xs text-stone-500 mt-1">
                            Qty: {item.qty}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-stone-950 shrink-0">
                          ৳{(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                      <Separator className="bg-stone-200" />
                    </div>
                  ))}

                  {/* Total */}
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xs uppercase tracking-widest text-stone-500">
                      Total
                    </span>
                    <span className="text-xl font-medium text-stone-950">
                      ৳{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {/* Empty cart fallback */}
              {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-stone-400">
                  <Package size={36} strokeWidth={1} />
                  <p className="font-display italic text-lg">
                    No order details available
                  </p>
                </div>
              )}
            </div>

            {/* Order tracking */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-3">
                What happens next
              </p>
              <h2 className="font-display font-light text-3xl mb-8 leading-snug">
                Order tracking
              </h2>

              {/* Steps */}
              <div className="flex flex-col gap-0">
                {ORDER_STEPS.map((step, index) => (
                  <div key={step.step} className="flex gap-4">
                    {/* Step indicator */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0
                      ${
                        index === 0
                          ? "bg-amber-600 text-stone-50"
                          : "bg-stone-200 text-stone-500"
                      }
                    `}
                      >
                        {index === 0 ? <CheckCircle size={16} /> : step.step}
                      </div>
                      {index < ORDER_STEPS.length - 1 && (
                        <div
                          className={`w-px flex-1 my-1 ${
                            index === 0 ? "bg-amber-600" : "bg-stone-200"
                          }`}
                        />
                      )}
                    </div>

                    {/* Step content */}
                    <div className="pb-8">
                      <p
                        className={`text-sm font-medium mb-1 ${
                          index === 0 ? "text-amber-600" : "text-stone-400"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-stone-500 font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-stone-300 my-8" />

              {/* Email notice */}
              <div className="flex gap-3 bg-amber-50 border border-amber-200 p-4">
                <Mail size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-stone-950 mb-1">
                    Confirmation email sent
                  </p>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    A confirmation email with your order details and tracking
                    information will be sent to your email address shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-stone-300 my-12" />

          {/* CTA */}
          <div className="text-center">
            <p className="text-sm text-stone-500 font-light mb-6">
              Want to continue shopping?
            </p>
            <Button
              onClick={handleBackToShop}
              className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs px-8 py-5 gap-2"
            >
              Back to Shop
              <ArrowRight size={14} />
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
