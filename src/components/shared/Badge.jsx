import { Badge as ShadcnBadge } from "@/components/ui/badge";

const BADGE_STYLES = {
  Bestseller: "bg-green-900 text-stone-100 hover:bg-green-900",
  New: "bg-blue-900 text-stone-100 hover:bg-blue-900",
  "Editor's Pick": "bg-orange-900 text-stone-100 hover:bg-orange-900",
  Limited: "bg-red-900 text-stone-100 hover:bg-red-900",
  Popular: "bg-purple-900 text-stone-100 hover:bg-purple-900",
};

export default function Badge({ text }) {
  return (
    <ShadcnBadge
      className={`
        absolute top-3 left-3 z-10 rounded-none
        text-[9px] tracking-widest uppercase font-normal
        ${BADGE_STYLES[text] || "bg-stone-800 text-stone-100 hover:bg-stone-800"}
      `}
    >
      {text}
    </ShadcnBadge>
  );
}
