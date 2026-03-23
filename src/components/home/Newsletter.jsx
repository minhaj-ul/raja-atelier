import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Spinner from "../shared/Spinner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("Welcome to RAJA Atelier! You're now on the list.");
    }, 1200);
  };

  return (
    <section className="bg-stone-950 py-14 md:py-20">
      <div className="max-w-340 mx-auto px-5 md:px-7">
        <div className="max-w-xl mx-auto text-center">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-amber-600/10 border border-amber-600/30 flex items-center justify-center mx-auto mb-6">
            <Mail size={20} className="text-amber-600" />
          </div>

          {/* Header */}
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-3">
            Stay Connected
          </p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-stone-100 mb-4">
            Join the Inner Circle
          </h2>
          <p className="text-sm font-light text-stone-400 leading-relaxed mb-8">
            Be the first to know about new arrivals, exclusive offers, and
            styling inspiration from RAJA Atelier. No spam — only the finest.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-none border-stone-700 bg-stone-900 text-stone-100 placeholder:text-stone-500 focus-visible:ring-amber-600 font-light"
            />
            <Button
              type="submit"
              disabled={loading}
              className="rounded-none bg-amber-600 hover:bg-amber-700 text-stone-50 uppercase tracking-widest text-xs px-6 gap-2 shrink-0"
            >
              {loading ? (
                "Subscribing…"
              ) : (
                <>
                  <ArrowRight size={13} /> Subscribe
                </>
              )}
            </Button>
          </form>

          <p className="text-[10px] text-stone-600 mt-4 tracking-wide">
            By subscribing you agree to our privacy policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
