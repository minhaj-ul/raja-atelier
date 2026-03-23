import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <TooltipProvider>
          <App />
          <Toaster position="bottom-center" richColors />
        </TooltipProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
