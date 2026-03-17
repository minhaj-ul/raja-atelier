import { Routes, Route } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import { useWishlist } from "./hooks/useWishlist";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import WishlistPage from "./pages/WishlistPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import NotFoundPage from "./pages/NotFoundPage";

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
          />
        }
      />
      <Route
        path="/product/:id"
        element={<ProductPage onAddToCart={addToCart} />}
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route
        path="/wishlist"
        element={
          <WishlistPage
            wishlist={wishlist}
            onRemoveFromWishlist={removeFromWishlist}
            onAddToCart={addToCart}
          />
        }
      />
      <Route
        path="/order-confirmation"
        element={<OrderConfirmationPage cart={cart} onClearCart={clearCart} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
