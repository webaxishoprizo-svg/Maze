import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Grid, LayoutGrid, ChevronDown, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/ui/ProductCard";
import { useProductsByCategory } from "@/hooks/useProducts";

const Bags = () => {
  const [gridSize, setGridSize] = useState<2 | 3 | 4>(4);
  const [sortBy, setSortBy] = useState("newest");
  const { products: mappedProducts, loading } = useProductsByCategory("bags");

  const products = mappedProducts.map(p => ({
    ...p,
    name: p.title,
    price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
    category: "Bags"
  }));

  useEffect(() => {
    document.title = "Bags | Maze - Luxury Leather Handbags & Totes";
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-foreground" />
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      <CartDrawer />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-overline uppercase tracking-luxury text-muted-foreground block mb-4">
              Premium Collection
            </span>
            <h1 className="text-display-lg font-serif mb-6">Bags</h1>
            <p className="text-body text-muted-foreground">
              Discover our curated selection of luxury leather handbags, totes, and clutches crafted with exceptional attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="border-y border-border sticky top-[72px] bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            <span className="text-body-sm text-muted-foreground">
              {products.length} Products
            </span>

            <div className="flex items-center gap-6">
              {/* Grid Toggle */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => setGridSize(2)}
                  className={`p-1 transition-opacity ${gridSize === 2 ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridSize(3)}
                  className={`p-1 transition-opacity ${gridSize === 3 ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridSize(4)}
                  className={`p-1 transition-opacity ${gridSize === 4 ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent text-body-sm uppercase tracking-luxury pr-6 cursor-pointer outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="bestselling">Best Selling</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div
            className={`grid gap-6 lg:gap-8 ${gridSize === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : gridSize === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-2 lg:grid-cols-4"
              }`}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Bags;
