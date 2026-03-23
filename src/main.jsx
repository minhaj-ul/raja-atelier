import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/shared/ScrollToTop";
import PageLoader from "./components/shared/PageLoader";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Suspense fallback={<PageLoader message="Loading…" />}>
            <ScrollToTop />
            <App />
            <Toaster position="bottom-center" richColors />
          </Suspense>
        </TooltipProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
