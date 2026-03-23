import { useState, useEffect } from "react";
import { Instagram, Heart } from "lucide-react";
import { INSTAGRAM_POSTS } from "../../data/home";
import Spinner from "../shared/Spinner";

export default function InstagramBanner() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-340 mx-auto px-5 md:px-7">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-2">
            Follow Us
          </p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-stone-950 mb-2">
            @rajaatelier
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-amber-600 transition-colors uppercase tracking-widest"
          >
            <Instagram size={13} /> Follow on Instagram
          </a>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size={24} className="text-stone-400" />
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 md:gap-2">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden aspect-square block"
              >
                <img
                  src={post.image}
                  alt="Instagram post"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/50 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-stone-50">
                    <Heart
                      size={16}
                      className="fill-stone-50 stroke-stone-50"
                    />
                    <span className="text-xs font-medium">{post.likes}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
