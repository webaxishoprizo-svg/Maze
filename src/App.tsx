import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "@/store/cartStore";
import AnimatedRoutes from "@/components/layout/AnimatedRoutes";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import LoadingScreen from "@/components/layout/LoadingScreen";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          {isLoading && (
            <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
          )}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
          <WhatsAppButton phoneNumber="+1234567890" message="Hi! I'm interested in your products." />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
