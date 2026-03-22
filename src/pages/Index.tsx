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

import { Helmet } from "react-helmet-async";

const Index = () => {
  const { products } = useProducts(4);
  const { testimonials } = useStoreTestimonials();

  return (
    <main className="min-h-screen bg-white">
      <Helmet>
        <title>MAZE | Engineered Performance & Track Pants at themaze.shop</title>
        <meta name="description" content="Welcome to MAZE. Shop our premium collection of performance track pants and luxury activewear. Engineered for performance at themaze.shop." />
        <meta name="keywords" content="maze, maze shop, themaze.shop, track pants, performance track pants, premium activewear, luxury sportswear" />
        <meta property="og:title" content="MAZE | Luxury Activewear & Performance Track Pants" />
        <meta property="og:description" content="Engineered for strength, designed for style. Shop premium track pants at themaze.shop." />
        <link rel="canonical" href="https://themaze.shop" />
      </Helmet>
      <Header />
      <CartDrawer />

      <HeroSection />
      <NewArrivals />
      <BestSellers />
      <WhyMaze />
      {/* <FeaturedProducts products={products} /> */}
      <Testimonials data={testimonials} />
      <RecentlyViewedSection />
      <EditorialSection />
      <Newsletter />

      <Footer />
    </main>
  );
};

export default Index;
