import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from "../../data/home";

export default function Testimonials() {
  return (
    <section className="bg-stone-200 py-14 md:py-20">
      <div className="max-w-340 mx-auto px-5 md:px-7">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-2">
            What They Say
          </p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-stone-950">
            Customer Reviews
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.id}
              className="rounded-none border-stone-300 bg-stone-50 flex flex-col"
            >
              <CardContent className="p-5 md:p-6 flex flex-col gap-4 h-full">
                {/* Quote icon + stars */}
                <div className="flex items-center justify-between">
                  <Quote size={24} className="text-amber-600 fill-amber-600" />
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i <= t.rating
                            ? "fill-amber-600 stroke-amber-600"
                            : "fill-stone-200 stroke-stone-200"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Review text */}
                <p className="text-sm text-stone-600 font-light leading-relaxed flex-1">
                  "{t.review}"
                </p>

                {/* Product */}
                <p className="text-[9px] tracking-widest uppercase text-amber-600">
                  {t.product}
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-2 border-t border-stone-200">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="text-sm font-medium text-stone-950">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-stone-400 tracking-wide">
                      {t.location}, Bangladesh
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
