import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLoader from "./PageLoader";

export default function ProtectedRoute({ isLoggedIn, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecking(false);
      if (!isLoggedIn) {
        sessionStorage.setItem("raja_redirect_after_login", location.pathname);
        navigate("/login");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  if (checking) return <PageLoader message="Checking authentication…" />;
  if (!isLoggedIn) return null;

  return children;
}
