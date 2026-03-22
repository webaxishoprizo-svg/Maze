import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, ArrowRight, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/ui/ProductCard";
import { searchProducts, Product } from "@/api/products";

interface SearchResult extends Omit<Product, 'price'> {
  name: string;
  category: string;
  price: number;
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    document.title = "Search | MAZE";
  }, []);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const found = await searchProducts(query);
        const mapped: SearchResult[] = found.map(p => ({
          ...p,
          name: p.title,
          price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
          category: "Performance Gear",
        }));
        setResults(mapped);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

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
              <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-muted-foreground/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search our catalog..."
                autoFocus
                className="w-full bg-transparent text-display-sm font-serif pl-14 pr-12 pb-6 border-b border-foreground/10 focus:border-foreground outline-none placeholder:text-foreground/20 transition-all duration-700"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <X className="w-5 h-5 text-muted-foreground" />}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="pb-24 lg:pb-32 min-h-[40vh]">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Results Count */}
          {query && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-body-sm text-muted-foreground mb-12 flex items-center gap-2"
            >
              {isSearching ? (
                <>Searching for "<span className="text-foreground">{query}</span>"...</>
              ) : (
                <>{results.length} pieces found for "<span className="text-foreground">{query}</span>"</>
              )}
            </motion.p>
          )}

          {/* Results Grid */}
          <AnimatePresence mode="wait">
            {!query ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <p className="text-muted-foreground uppercase tracking-widest text-[10px] mb-8">Popular searches</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {["Track Pant", "Hoodie", "Shorts", "Baggy"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-6 py-2 border border-border hover:border-foreground transition-all duration-500 text-body-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-x-12 lg:gap-y-16"
              >
                {results.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.6 }}
                  >
                    <ProductCard {...product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : !isSearching && (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <p className="text-subheading font-serif mb-4">No results found for "{query}"</p>
                <p className="text-body text-muted-foreground mb-10">
                  Try adjusting your search terms or explore our collections.
                </p>
                <Link
                  to="/collection"
                  className="btn-couture-filled"
                >
                  <span>Explore All Products</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Search;
