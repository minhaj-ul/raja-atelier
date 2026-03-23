import { User, Package, Heart, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
];

export default function AccountSidebar({
  activeTab,
  setActiveTab,
  orderCount,
  wishlistCount,
  onLogout,
}) {
  return (
    <>
      {/* ── Mobile: horizontal pills ── */}
      <div className="flex md:hidden gap-2 mb-6">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex flex-col items-center justify-center gap-1
                py-3 px-2 text-[10px] uppercase tracking-widest
                border transition-all relative
                ${
                  activeTab === tab.id
                    ? "bg-stone-950 text-stone-50 border-stone-950"
                    : "bg-stone-50 text-stone-500 border-stone-300 hover:border-stone-950 hover:text-stone-950"
                }
              `}
            >
              <Icon size={15} />
              {tab.label}
              {tab.id === "orders" && orderCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-amber-600 text-stone-50 w-4 h-4 rounded-full text-[9px] flex items-center justify-center">
                  {orderCount}
                </span>
              )}
              {tab.id === "wishlist" && wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-amber-600 text-stone-50 w-4 h-4 rounded-full text-[9px] flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Desktop: vertical sidebar ── */}
      <nav className="hidden md:flex flex-col gap-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2.5 px-4 py-3 text-xs uppercase tracking-widest
                transition-all border-l-2 text-left
                ${
                  activeTab === tab.id
                    ? "border-amber-600 text-amber-600 bg-amber-50"
                    : "border-transparent text-stone-500 hover:text-stone-950 hover:bg-stone-200"
                }
              `}
            >
              <Icon size={14} />
              {tab.label}
              {tab.id === "orders" && orderCount > 0 && (
                <span className="ml-auto bg-amber-600 text-stone-50 w-5 h-5 rounded-full text-[10px] flex items-center justify-center shrink-0">
                  {orderCount}
                </span>
              )}
              {tab.id === "wishlist" && wishlistCount > 0 && (
                <span className="ml-auto bg-amber-600 text-stone-50 w-5 h-5 rounded-full text-[10px] flex items-center justify-center shrink-0">
                  {wishlistCount}
                </span>
              )}
            </button>
          );
        })}

        <Separator className="bg-stone-200 my-2" />

        <button
          onClick={onLogout}
          className="flex items-center gap-2.5 px-4 py-3 text-xs uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors border-l-2 border-transparent text-left"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </nav>

      {/* ── Mobile: sign out button ── */}
      <Button
        variant="outline"
        onClick={onLogout}
        className="flex md:hidden w-full rounded-none border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 uppercase tracking-widest text-xs gap-2 mb-6"
      >
        <LogOut size={13} /> Sign Out
      </Button>
    </>
  );
}
