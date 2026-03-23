import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  LogOut,
  Edit,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  MapPin,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Layout from "../layouts/Layout";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
];

const STATUS_STYLES = {
  confirmed: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  dispatched: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  delivered: "bg-green-100 text-green-700 hover:bg-green-100",
  cancelled: "bg-red-100 text-red-700 hover:bg-red-100",
};

// ── Single order card ──────────────────────────────────────────
function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(order.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const delivery = new Date(order.estimatedDelivery).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className="bg-stone-50 border border-stone-300">
      {/* Order header */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 p-4 md:p-5 cursor-pointer hover:bg-stone-100 transition-colors"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-stone-950">{order.id}</p>
            <Badge
              className={`rounded-none text-[9px] tracking-widest uppercase ${STATUS_STYLES[order.status] || STATUS_STYLES.confirmed}`}
            >
              {order.status}
            </Badge>
          </div>
          <p className="text-xs text-stone-400">{date}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-stone-950">
              ৳{order.total.toLocaleString()}
            </p>
            <p className="text-xs text-stone-400">
              {order.items.reduce((s, i) => s + i.qty, 0)} items
            </p>
          </div>
          {expanded ? (
            <ChevronUp size={16} className="text-stone-400 shrink-0" />
          ) : (
            <ChevronDown size={16} className="text-stone-400 shrink-0" />
          )}
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-stone-200">
          {/* Items */}
          <div className="p-4 md:p-5 flex flex-col gap-0">
            <p className="text-[10px] tracking-widest uppercase text-amber-600 mb-3">
              Items Ordered
            </p>
            {order.items.map((item) => (
              <div key={item.id}>
                <div className="flex gap-3 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-16 object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] tracking-widest uppercase text-amber-600 mb-0.5">
                      {item.category}
                    </p>
                    <p className="font-display text-sm leading-snug text-stone-950">
                      {item.name}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Qty: {item.qty}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-stone-950 shrink-0">
                    ৳{(item.price * item.qty).toLocaleString()}
                  </p>
                </div>
                <Separator className="bg-stone-100" />
              </div>
            ))}

            {/* Totals */}
            <div className="flex flex-col gap-1.5 pt-3">
              <div className="flex justify-between text-xs text-stone-500">
                <span>Subtotal</span>
                <span>৳{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Shipping</span>
                <span>
                  {order.shippingCost === 0 ? "Free" : `৳${order.shippingCost}`}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-xs text-amber-600">
                  <span>Discount</span>
                  <span>-৳{order.discount.toLocaleString()}</span>
                </div>
              )}
              <Separator className="bg-stone-200 my-1" />
              <div className="flex justify-between text-sm font-semibold text-stone-950">
                <span>Total</span>
                <span>৳{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <Separator className="bg-stone-200" />

          {/* Shipping + Payment info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin size={13} className="text-amber-600" />
                <p className="text-[10px] tracking-widest uppercase text-amber-600">
                  Delivery Address
                </p>
              </div>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {order.shipping.firstName} {order.shipping.lastName}
                <br />
                {order.shipping.address1}
                {order.shipping.address2 && `, ${order.shipping.address2}`}
                <br />
                {order.shipping.city}, {order.shipping.postalCode}
                <br />
                {order.shipping.country}
              </p>
            </div>

            <div className="p-4 md:p-5 sm:border-l border-t sm:border-t-0 border-stone-200">
              <div className="flex items-center gap-1.5 mb-2">
                <CreditCard size={13} className="text-amber-600" />
                <p className="text-[10px] tracking-widests uppercase text-amber-600">
                  Payment
                </p>
              </div>
              <p className="text-xs text-stone-600 font-light">
                Card ending in {order.paymentLast4}
              </p>
              <p className="text-xs text-stone-600 font-light mt-1">
                {order.selectedShipping?.label}
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Est. delivery: {delivery}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Account Page ───────────────────────────────────────────────
export default function AccountPage({
  user,
  onLogout,
  onUpdateProfile,
  getUserOrders,
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const userOrders = getUserOrders ? getUserOrders(user?.id) : [];

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
    <Layout user={user} onLogout={onLogout}>
      <div className="min-h-screen bg-stone-100">
        {/* Hero */}
        <section className="bg-stone-950 text-stone-100 px-5 md:px-7 py-14 md:py-20">
          <div className="max-w-340 mx-auto">
            <div className="flex items-center gap-5">
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
                      {tab.id === "orders" && userOrders.length > 0 && (
                        <span className="ml-auto bg-amber-600 text-stone-50 w-5 h-5 rounded-full text-[10px] flex items-center justify-center shrink-0">
                          {userOrders.length}
                        </span>
                      )}
                    </button>
                  );
                })}

                <Separator className="bg-stone-200 my-2 hidden md:block" />

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
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-light text-2xl text-stone-950">
                      My Orders
                    </h2>
                    {userOrders.length > 0 && (
                      <p className="text-xs text-stone-400">
                        {userOrders.length}{" "}
                        {userOrders.length === 1 ? "order" : "orders"}
                      </p>
                    )}
                  </div>

                  {userOrders.length === 0 ? (
                    <div className="bg-stone-50 border border-stone-300 p-10 flex flex-col items-center gap-4 text-stone-400">
                      <Package size={40} strokeWidth={1} />
                      <p className="font-display text-lg italic">
                        No orders yet
                      </p>
                      <p className="text-xs font-light text-center">
                        Your order history will appear here after you make a
                        purchase.
                      </p>
                      <Button
                        onClick={() => navigate("/")}
                        className="rounded-none bg-stone-950 hover:bg-amber-600 text-stone-50 uppercase tracking-widest text-xs px-8 py-5 mt-2 gap-2"
                      >
                        <ShoppingBag size={13} />
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {userOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  )}
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
    </Layout>
  );
}
