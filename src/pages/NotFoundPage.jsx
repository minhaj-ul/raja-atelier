import { useNavigate } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PageTitle from "../components/shared/PageTitle";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center px-5 text-center">
      <PageTitle title="Page Not Found" />

      {/* 404 */}
      <p className="font-display text-[120px] md:text-[180px] font-light leading-none text-stone-200 select-none">
        404
      </p>

      <SearchX size={40} className="text-amber-600 -mt-6 mb-6" />

      <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-3">
        Page Not Found
      </p>

      <h1 className="font-display font-light text-3xl md:text-4xl text-stone-950 mb-4">
        This page doesn't exist
      </h1>

      <p className="text-sm text-stone-500 font-light max-w-sm leading-relaxed mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Separator className="bg-stone-300 max-w-xs mb-8" />

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-200 uppercase tracking-widest text-xs gap-2 px-6 py-5"
        >
          <ArrowLeft size={14} />
          Go Back
        </Button>
        <Button
          onClick={() => navigate("/")}
          className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs gap-2 px-6 py-5"
        >
          Back to Shop
        </Button>
      </div>
    </div>
  );
}
