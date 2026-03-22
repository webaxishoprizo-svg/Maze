import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "@/store/cartStore";

import AnimatedRoutes from "@/components/layout/AnimatedRoutes";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

import MetaPixelTracker from "@/components/layout/MetaPixelTracker";

import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <SmoothScroll />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <MetaPixelTracker />
              <AnimatedRoutes />
            </BrowserRouter>
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
