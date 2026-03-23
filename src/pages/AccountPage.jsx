import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Package, Heart, LogOut, Edit, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
];

export default function AccountPage({ user, onLogout, onUpdateProfile }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleLogout = () => {
    onLogout();
    toast.success("You have been signed out");
    navigate("/");
  };

  const handleSave = () => {
    onUpdateProfile(form);
    setEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Hero */}
      <section className="bg-stone-950 text-stone-100 px-5 md:px-7 py-14 md:py-20">
        <div className="max-w-340 mx-auto">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-600 flex items-center justify-center shrink-0">
              <span className="font-display text-2xl md:text-3xl font-light text-stone-50">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-1">
                My Account
              </p>
              <h1 className="font-display font-light text-2xl md:text-3xl">
                {user?.name}
              </h1>
              <p className="text-xs text-stone-400 mt-1">{user?.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-340 mx-auto px-5 md:px-7 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Sidebar */}
          <div className="md:col-span-1">
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
                  </button>
                );
              })}

              <Separator className="bg-stone-200 my-2 hidden md:block" />

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-4 py-3 text-xs uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors shrink-0 border-b-2 md:border-b-0 md:border-l-2 border-transparent"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            {/* ── Profile Tab ── */}
            {activeTab === "profile" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-light text-2xl text-stone-950">
                    Profile Details
                  </h2>
                  {!editing ? (
                    <Button
                      variant="outline"
                      onClick={() => setEditing(true)}
                      className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-950 hover:text-stone-50 uppercase tracking-widest text-xs gap-1.5"
                    >
                      <Edit size={13} /> Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        className="rounded-none border-stone-300 text-stone-950 hover:bg-stone-200 uppercase tracking-widest text-xs gap-1.5"
                      >
                        <X size={13} /> Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="rounded-none bg-amber-600 hover:bg-amber-700 text-stone-50 uppercase tracking-widest text-xs gap-1.5"
                      >
                        <Check size={13} /> Save
                      </Button>
                    </div>
                  )}
                </div>

                <div className="bg-stone-50 border border-stone-300 p-6 flex flex-col gap-5">
                  {/* Name */}
                  <div>
                    <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
                      Full Name
                    </label>
                    {editing ? (
                      <Input
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        className="rounded-none border-stone-300 bg-stone-100 focus-visible:ring-amber-600 font-light"
                      />
                    ) : (
                      <p className="text-sm text-stone-950 font-light">
                        {user?.name}
                      </p>
                    )}
                  </div>

                  <Separator className="bg-stone-200" />

                  {/* Email — not editable */}
                  <div>
                    <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
                      Email Address
                    </label>
                    <p className="text-sm text-stone-950 font-light">
                      {user?.email}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">
                      Email cannot be changed
                    </p>
                  </div>

                  <Separator className="bg-stone-200" />

                  {/* Phone */}
                  <div>
                    <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
                      Phone Number
                    </label>
                    {editing ? (
                      <Input
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        placeholder="+880 1711-234567"
                        className="rounded-none border-stone-300 bg-stone-100 focus-visible:ring-amber-600 font-light"
                      />
                    ) : (
                      <p className="text-sm text-stone-950 font-light">
                        {user?.phone || (
                          <span className="text-stone-400 italic">
                            Not provided
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  <Separator className="bg-stone-200" />

                  {/* Address */}
                  <div>
                    <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
                      Delivery Address
                    </label>
                    {editing ? (
                      <Input
                        value={form.address}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, address: e.target.value }))
                        }
                        placeholder="House 12, Road 6, Banani, Dhaka"
                        className="rounded-none border-stone-300 bg-stone-100 focus-visible:ring-amber-600 font-light"
                      />
                    ) : (
                      <p className="text-sm text-stone-950 font-light">
                        {user?.address || (
                          <span className="text-stone-400 italic">
                            Not provided
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  <Separator className="bg-stone-200" />

                  {/* Member since */}
                  <div>
                    <label className="text-[10px] tracking-widests uppercase text-stone-500 mb-1.5 block">
                      Member Since
                    </label>
                    <p className="text-sm text-stone-950 font-light">
                      {user?.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Orders Tab ── */}
            {activeTab === "orders" && (
              <div>
                <h2 className="font-display font-light text-2xl text-stone-950 mb-6">
                  My Orders
                </h2>
                <div className="bg-stone-50 border border-stone-300 p-10 flex flex-col items-center gap-4 text-stone-400">
                  <Package size={40} strokeWidth={1} />
                  <p className="font-display text-lg italic">No orders yet</p>
                  <p className="text-xs font-light text-center">
                    Your order history will appear here after you make a
                    purchase.
                  </p>
                  <Button
                    onClick={() => navigate("/")}
                    className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs px-8 py-5 mt-2"
                  >
                    Start Shopping
                  </Button>
                </div>
              </div>
            )}

            {/* ── Wishlist Tab ── */}
            {activeTab === "wishlist" && (
              <div>
                <h2 className="font-display font-light text-2xl text-stone-950 mb-6">
                  My Wishlist
                </h2>
                <div className="bg-stone-50 border border-stone-300 p-10 flex flex-col items-center gap-4 text-stone-400">
                  <Heart size={40} strokeWidth={1} />
                  <p className="font-display text-lg italic">
                    View your wishlist
                  </p>
                  <p className="text-xs font-light text-center">
                    Items you've saved will appear on the wishlist page.
                  </p>
                  <Button
                    onClick={() => navigate("/wishlist")}
                    className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs px-8 py-5 mt-2"
                  >
                    Go to Wishlist
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
