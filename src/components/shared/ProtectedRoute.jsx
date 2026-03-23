import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.setItem("raja_redirect_after_login", location.pathname);
      navigate("/login");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return children;
}
