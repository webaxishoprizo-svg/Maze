import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyMaze from "@/components/home/WhyMaze";
import EditorialSection from "@/components/home/EditorialSection";
import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/ui/Testimonials";
import { useProducts, useStoreTestimonials } from "@/hooks/useProducts";
import { RecentlyViewedSection } from "@/components/ui/RecentlyViewed";

const Index = () => {
  const { products } = useProducts(4);
  const { testimonials } = useStoreTestimonials();

  useEffect(() => {
    document.title = "Maze | Engineered for Strength & Style";
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <CartDrawer />

      <HeroSection />
      <NewArrivals />
      <BestSellers />
      <WhyMaze />
      <FeaturedProducts products={products} />
      <Testimonials data={testimonials} />
      <RecentlyViewedSection />
      <EditorialSection />
      <Newsletter />

      <Footer />
    </main>
  );
};

export default Index;
