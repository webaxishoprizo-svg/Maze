import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const productJacket = "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800";
const productSweater = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800";
const productBag = "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800";
const productDress = "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800";
const productShoes = "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800";
const productClutch = "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800";

const allProducts = [
  { id: "1", name: "Wool Cashmere Coat", category: "Outerwear", price: 1890, image: productJacket },
  { id: "2", name: "Merino Knit Sweater", category: "Knitwear", price: 590, image: productSweater },
  { id: "3", name: "Leather Tote Bag", category: "Accessories", price: 1290, image: productBag },
  { id: "4", name: "Silk Evening Dress", category: "Dresses", price: 2450, image: productDress },
  { id: "5", name: "Leather Ankle Boots", category: "Shoes", price: 890, image: productShoes },
  { id: "6", name: "Evening Clutch", category: "Accessories", price: 650, image: productClutch },
];

const categories = ["All", "Outerwear", "Knitwear", "Dresses", "Accessories", "Shoes"];

const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [results, setResults] = useState(allProducts);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    document.title = "Search | Maze";
  }, []);

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      const filtered = allProducts.filter((product) => {
        const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        return matchesQuery && matchesCategory;
      });
      setResults(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selectedCategory]);

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
            className="max-w-3xl mx-auto"
          >
            {/* Search Input */}
            <div className="relative mb-12">
              <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                autoFocus
                className="w-full bg-transparent text-display font-serif pl-12 pr-12 pb-4 border-b-2 border-foreground/20 focus:border-foreground outline-none placeholder:text-foreground/30 transition-colors duration-500"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 text-[11px] uppercase tracking-[0.2em] border transition-all duration-300 ${selectedCategory === category
                    ? "bg-foreground text-background border-foreground"
                    : "border-border hover:border-foreground"
                    }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-body-sm text-muted-foreground mb-8"
          >
            {isSearching ? "Searching..." : `${results.length} results found`}
          </motion.p>

          {/* Results Grid */}
          <AnimatePresence mode="wait">
            {results.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
              >
                {results.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link to={`/product/${product.id}`} className="group block">
                      <div className="aspect-[3/4] overflow-hidden bg-secondary/30 mb-4">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-body font-medium group-hover:opacity-70 transition-opacity">
                        {product.name}
                      </h3>
                      <p className="text-body-sm text-muted-foreground mt-1">
                        ${product.price.toLocaleString()}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <p className="text-heading font-serif mb-4">No results found</p>
                <p className="text-body text-muted-foreground mb-8">
                  Try adjusting your search or browse our collections
                </p>
                <Link
                  to="/collection"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium group"
                >
                  View All Products
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Popular Searches */}
          {!query && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-24 text-center"
            >
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-8">
                Popular Searches
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {["Cashmere", "Silk Dress", "Leather Bag", "Winter Coat"].map((term, index) => (
                  <motion.button
                    key={term}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => setQuery(term)}
                    className="px-8 py-3 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    {term}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Search;
