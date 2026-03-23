import { Routes, Route } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { useWishlist } from "./hooks/useWishlist";
import { useAuth } from "./hooks/useAuth";
import { useOrders } from "./hooks/useOrders";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AccountPage from "./pages/AccountPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/shared/ProtectedRoute";

export default function App() {
  const { cart, cartCount, addToCart, updateQty, removeItem, clearCart } =
    useCart();
  const {
    wishlist,
    wishlistCount,
    isWished,
    toggleWishlist,
    removeFromWishlist,
  } = useWishlist();
  const {
    user,
    isLoggedIn,
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
  } = useAuth();
  const { placeOrder, getUserOrders } = useOrders();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            cart={cart}
            cartCount={cartCount}
            onAddToCart={addToCart}
            onUpdateQty={updateQty}
            onRemove={removeItem}
            onToggleWishlist={toggleWishlist}
            isWished={isWished}
            wishlistCount={wishlistCount}
            user={user}
            onLogout={logout}
          />
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProductPage onAddToCart={addToCart} user={user} onLogout={logout} />
        }
      />
      <Route
        path="/about"
        element={<AboutPage user={user} onLogout={logout} />}
      />
      <Route
        path="/contact"
        element={<ContactPage user={user} onLogout={logout} />}
      />
      <Route path="/faq" element={<FAQPage user={user} onLogout={logout} />} />
      <Route
        path="/wishlist"
        element={
          <WishlistPage
            wishlist={wishlist}
            onRemoveFromWishlist={removeFromWishlist}
            onAddToCart={addToCart}
            user={user}
            onLogout={logout}
            cart={cart}
            cartCount={cartCount}
            onUpdateQty={updateQty}
            onRemove={removeItem}
            wishlistCount={wishlistCount}
          />
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CheckoutPage
              cart={cart}
              onClearCart={clearCart}
              onPlaceOrder={placeOrder}
              user={user}
              onLogout={logout}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-confirmation"
        element={
          <OrderConfirmationPage
            cart={cart}
            onClearCart={clearCart}
            user={user}
            onLogout={logout}
          />
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <AccountPage
              user={user}
              onLogout={logout}
              onUpdateProfile={updateProfile}
              getUserOrders={getUserOrders}
              wishlist={wishlist}
              onRemoveFromWishlist={removeFromWishlist}
              onAddToCart={addToCart}
            />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage onLogin={login} />} />
      <Route
        path="/register"
        element={<RegisterPage onRegister={register} />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage onForgotPassword={forgotPassword} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
