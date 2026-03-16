import { Routes, Route } from "react-router-dom";
import { useCart } from "./hooks/useCart";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

export default function App() {
  const { cart, cartCount, addToCart, updateQty, removeItem } = useCart();

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
          />
        }
      />
      <Route
        path="/product/:id"
        element={<ProductPage onAddToCart={addToCart} />}
      />
    </Routes>
  );
}
