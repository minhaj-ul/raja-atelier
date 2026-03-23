import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Layout from "../layouts/Layout";
import AccountSidebar from "../components/account/AccountSidebar";
import ProfileTab from "../components/account/ProfileTab";
import OrdersTab from "../components/account/OrdersTab";
import WishlistTab from "../components/account/WishlistTab";

export default function AccountPage({
  user,
  onLogout,
  onUpdateProfile,
  getUserOrders,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const userOrders = getUserOrders ? getUserOrders(user?.id) : [];

  const handleLogout = () => {
    onLogout();
    toast.success("You have been signed out");
    navigate("/");
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
              <AccountSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                orderCount={userOrders.length}
                wishlistCount={wishlist?.length || 0}
                onLogout={handleLogout}
              />
            </div>

            {/* Main content */}
            <div className="md:col-span-3">
              {activeTab === "profile" && (
                <ProfileTab user={user} onUpdateProfile={onUpdateProfile} />
              )}

              {activeTab === "orders" && <OrdersTab orders={userOrders} />}

              {activeTab === "wishlist" && (
                <WishlistTab
                  wishlist={wishlist}
                  onRemoveFromWishlist={onRemoveFromWishlist}
                  onAddToCart={onAddToCart}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
