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
