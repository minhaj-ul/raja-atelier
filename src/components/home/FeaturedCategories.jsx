import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "../../data/products";

const CATEGORY_DATA = Object.values(
  PRODUCTS.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = {
        name: product.category,
        image: product.image,
      };
    }
    return acc;
  }, {}),
);

export default function FeaturedCategories() {
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    navigate(`/?category=${encodeURIComponent(cat)}`, { replace: true });
  };

  return (
    <section className="bg-stone-950 py-14 md:py-20">
      <div className="max-w-340 mx-auto px-5 md:px-7">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-2">
            Browse By
          </p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-stone-100">
            Featured Categories
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {CATEGORY_DATA.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative overflow-hidden aspect-square cursor-pointer"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/60 transition-colors duration-300" />

              {/* Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <p className="text-stone-50 font-display text-sm md:text-base font-normal text-center leading-snug">
                  {cat.name}
                </p>
                <ArrowRight
                  size={14}
                  className="text-amber-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
