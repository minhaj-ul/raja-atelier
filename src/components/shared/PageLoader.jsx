import Spinner from "./Spinner";

export default function PageLoader({ message = "Loading…" }) {
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center gap-4">
      <div className="font-display italic text-2xl font-light text-stone-950">
        RAJA{" "}
        <span className="text-[10px] tracking-[0.3em] not-italic uppercase text-amber-600">
          Atelier
        </span>
      </div>
      <Spinner size={24} />
      <p className="text-xs uppercase tracking-widest text-stone-400">
        {message}
      </p>
    </div>
  );
}
