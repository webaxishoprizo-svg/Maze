import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Grid, LayoutGrid, X, ChevronDown, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/ui/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/api/products";

const filters = {
  category: ["All", "Dresses", "Outerwear", "Blazers", "Knitwear", "Accessories"],
  color: ["Black", "White", "Cream", "Navy", "Camel", "Grey"],
  size: ["XS", "S", "M", "L", "XL"],
  price: ["Under $300", "$300 - $500", "$500 - $800", "Over $800"],
};

const Collection = () => {
  const { products, loading } = useProducts(50);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridSize, setGridSize] = useState<2 | 3 | 4>(4);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    category: [],
    color: [],
    size: [],
    price: [],
  });
  const [sortBy, setSortBy] = useState("newest");

  const toggleFilter = (type: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[type];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      }
      return { ...prev, [type]: [...current, value] };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({ category: [], color: [], size: [], price: [] });
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

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
            className="text-center"
          >
            <span className="text-overline uppercase tracking-luxury text-muted-foreground block mb-4">
              Our Collection
            </span>
            <h1 className="text-display-lg font-serif">All Products</h1>
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="border-y border-border sticky top-[72px] bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 text-body-sm uppercase tracking-luxury hover:opacity-70 transition-opacity"
            >
              <Filter className="w-4 h-4" />
              Filter
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-foreground text-background text-[10px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <span className="text-body-sm text-muted-foreground">
              {products.length} Products
            </span>

            <div className="flex items-center gap-6">
              {/* Grid Toggle */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => setGridSize(2)}
                  className={`p-1 ${gridSize === 2 ? "opacity-100" : "opacity-40"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridSize(3)}
                  className={`p-1 ${gridSize === 3 ? "opacity-100" : "opacity-40"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridSize(4)}
                  className={`p-1 ${gridSize === 4 ? "opacity-100" : "opacity-40"}`}
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

      {/* Filter Sidebar */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-full max-w-sm bg-background shadow-elevated"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <span className="text-subheading font-serif">Filters</span>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {Object.entries(filters).map(([type, options]) => (
                    <div key={type}>
                      <h4 className="text-overline uppercase tracking-luxury mb-4">
                        {type}
                      </h4>
                      <div className="space-y-3">
                        {options.map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <div
                              className={`w-5 h-5 border flex items-center justify-center transition-colors ${selectedFilters[type].includes(option)
                                ? "bg-foreground border-foreground"
                                : "border-border group-hover:border-foreground"
                                }`}
                              onClick={() => toggleFilter(type, option)}
                            >
                              {selectedFilters[type].includes(option) && (
                                <motion.svg
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-3 h-3 text-background"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </motion.svg>
                              )}
                            </div>
                            <span className="text-body-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-border space-y-4">
                  <button
                    onClick={clearFilters}
                    className="w-full btn-couture"
                  >
                    <span>Clear All</span>
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full btn-couture-filled"
                  >
                    <span>Apply Filters</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
            {loading ? (
              <div className="col-span-full py-24 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
                <p className="text-body-sm text-muted-foreground">Loading collection...</p>
              </div>
            ) : (
              products.map((p: Product, index: number) => {
                const mappedProduct = {
                  id: p.id,
                  variantId: p.variantId,
                  name: p.title,
                  price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
                  image: p.image,
                  hoverImage: p.image, // Could add hover image logic to API if needed
                  category: "Activewear",
                  handle: p.handle,
                };
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    <ProductCard {...mappedProduct} />
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Collection;
