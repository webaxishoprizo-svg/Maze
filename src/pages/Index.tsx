import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryTiles from "@/components/home/CategoryTiles";
import WhyMaze from "@/components/home/WhyMaze";
import EditorialSection from "@/components/home/EditorialSection";
import Newsletter from "@/components/home/Newsletter";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const { products } = useProducts(4);

  useEffect(() => {
    document.title = "Maze | Engineered for Strength & Style";
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Build Diagnostic - Temporary */}
      {(!(import.meta.env.VITE_SHOPIFY_STORE || import.meta.env.VITE_STORE_DOMAIN) ||
        !(import.meta.env.VITE_SHOPIFY_TOKEN || import.meta.env.VITE_STORE_TOKEN)) && (
          <div className="bg-destructive text-destructive-foreground p-4 text-center text-xs font-bold uppercase tracking-widest z-[9999] sticky top-0">
            ⚠️ Shopify Connection Error: Environment Variables (VITE_SHOPIFY_STORE/TOKEN) Not Found in Build.
            Please check Vercel settings and REDEPLOY.
          </div>
        )}
      <Header />
      <CartDrawer />

      <HeroSection />
      <CategoryTiles />
      <WhyMaze />
      <FeaturedProducts products={products} />
      <EditorialSection />
      <Newsletter />

      <Footer />
    </main>
  );
};

export default Index;
