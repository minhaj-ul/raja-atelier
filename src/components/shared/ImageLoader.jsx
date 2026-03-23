import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ImageLoader({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
      )}
      {error && (
        <div className="absolute inset-0 bg-stone-200 flex items-center justify-center">
          <p className="text-[10px] uppercase tracking-widest text-stone-400">
            Image unavailable
          </p>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={cn(
          "transition-opacity duration-500",
          loaded && !error ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </div>
  );
}
