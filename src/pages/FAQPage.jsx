import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { FAQS } from "../data/faq";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-stone-300">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left hover:text-amber-600 transition-colors"
      >
        <span className="text-sm font-light tracking-wide text-stone-950 hover:text-amber-600">
          {question}
        </span>
        {open ? (
          <Minus size={15} className="text-amber-600 shrink-0" />
        ) : (
          <Plus size={15} className="text-stone-500 shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-48 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-stone-500 font-light leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(FAQS[0].category);

  return (
    <div className="bg-stone-100">
      {/* Hero */}
      <section className="bg-stone-950 text-stone-100 px-5 md:px-7 py-16 md:py-24 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-amber-600 mb-4">
          Help Centre
        </p>
        <h1 className="font-display font-light text-4xl md:text-5xl leading-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-sm font-light text-stone-400 max-w-md mx-auto leading-relaxed">
          Everything you need to know about orders, returns, sizing and more.
          Can't find your answer?{" "}
          <button
            onClick={() => navigate("/contact")}
            className="text-amber-600 hover:underline"
          >
            Contact us
          </button>
          .
        </p>
      </section>

      {/* Content */}
      <section className="max-w-340 mx-auto px-5 md:px-7 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16">
          {/* Category sidebar */}
          <div className="md:col-span-1">
            <p className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mb-4">
              Categories
            </p>
            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible scrollbar-none">
              {FAQS.map((section) => (
                <button
                  key={section.category}
                  onClick={() => setActiveCategory(section.category)}
                  className={`
                    text-left text-xs uppercase tracking-widest py-2.5 px-3 shrink-0
                    border-l-2 transition-all duration-200
                    ${
                      activeCategory === section.category
                        ? "border-amber-600 text-amber-600 bg-amber-50"
                        : "border-transparent text-stone-500 hover:text-stone-950 hover:border-stone-300"
                    }
                  `}
                >
                  {section.category}
                </button>
              ))}
            </nav>
          </div>

          {/* FAQ items */}
          <div className="md:col-span-3">
            {FAQS.filter((s) => s.category === activeCategory).map(
              (section) => (
                <div key={section.category}>
                  <h2 className="font-display font-light text-2xl md:text-3xl mb-6 text-stone-950">
                    {section.category}
                  </h2>
                  <div>
                    {section.items.map((item) => (
                      <FAQItem
                        key={item.question}
                        question={item.question}
                        answer={item.answer}
                      />
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <Separator className="bg-stone-300 max-w-340 mx-auto" />

      {/* CTA */}
      <section className="max-w-340 mx-auto px-5 md:px-7 py-16 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-3">
          Still have questions?
        </p>
        <h2 className="font-display font-light text-2xl md:text-3xl mb-4">
          We're here to help
        </h2>
        <p className="text-sm text-stone-500 font-light max-w-sm mx-auto mb-7 leading-relaxed">
          Our team is available Monday to Saturday, 10am to 7pm CET.
        </p>
        <Button
          onClick={() => navigate("/contact")}
          className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs px-8 py-5 gap-2"
        >
          Contact Us
          <ArrowRight size={14} />
        </Button>
      </section>
    </div>
  );
}
