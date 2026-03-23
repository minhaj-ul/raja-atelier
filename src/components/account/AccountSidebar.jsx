import { User, Package, Heart, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
];

export default function AccountSidebar({
  activeTab,
  setActiveTab,
  orderCount,
  onLogout,
}) {
  return (
    <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2.5 px-4 py-3 text-xs uppercase tracking-widest
              transition-all shrink-0 border-b-2 md:border-b-0 md:border-l-2
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
          </button>
        );
      })}

      <Separator className="bg-stone-200 my-2 hidden md:block" />

      <button
        onClick={onLogout}
        className="flex items-center gap-2.5 px-4 py-3 text-xs uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors shrink-0 border-b-2 md:border-b-0 md:border-l-2 border-transparent w-full text-left"
      >
        <LogOut size={14} />
        Sign Out
      </button>
    </nav>
  );
}
