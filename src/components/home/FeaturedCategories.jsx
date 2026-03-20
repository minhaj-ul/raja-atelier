import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "../../data/products";

const CATEGORY_IMAGES = {
  "Suits & Blazers":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  Shirts:
    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
  "Trousers & Chinos":
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
  "Outerwear & Coats":
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
  Footwear:
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80",
  Accessories:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  "Ties & Pocket Squares":
    "https://images.unsplash.com/photo-1589756823695-278bc923f962?w=600&q=80",
  "Knitwear & Sweaters":
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
  "Casual Wear":
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  "Formal Wear":
    "https://images.unsplash.com/photo-1611898872015-0571a9e38375?w=600&q=80",
};

const CATEGORIES = Object.keys(CATEGORY_IMAGES);

export default function FeaturedCategories() {
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("col")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
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
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="group relative overflow-hidden aspect-square cursor-pointer"
            >
              {/* Image */}
              <img
                src={CATEGORY_IMAGES[cat]}
                alt={cat}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/60 transition-colors duration-300" />

              {/* Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <p className="text-stone-50 font-display text-sm md:text-base font-normal text-center leading-snug">
                  {cat}
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
