import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/ui/ProductCard";

const Wishlist = () => {
  // Real-time wishlist logic could be implemented here using localStorage
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    document.title = "Wishlist | Maze";
    // Check localStorage if needed, otherwise start empty as dummy products must be removed
  }, []);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen">
      <Header />
      <CartDrawer />

      {/* Hero */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 bg-[#F4F1EA]/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto mb-8 bg-white rounded-full flex items-center justify-center shadow-soft"
            >
              <Heart className="w-8 h-8 text-foreground" />
            </motion.div>
            <h1 className="text-display font-serif mb-4 uppercase">My Wishlist</h1>
            <p className="text-body text-muted-foreground uppercase tracking-widest text-[10px]">
              {wishlistItems.length} {wishlistItems.length === 1 ? "piece" : "pieces"} saved
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="pb-24 lg:pb-32 min-h-[40vh]">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatePresence mode="popLayout">
            {wishlistItems.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {wishlistItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <ProductCard {...item} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-24 max-w-lg mx-auto"
              >
                <p className="text-subheading font-serif mb-6">Enrich your collection.</p>
                <p className="text-body text-muted-foreground mb-12">
                  Save your favorite technical apparel here to explore later.
                  Every piece in our collection is engineered for performance and precision.
                </p>
                <Link to="/collection" className="btn-couture-filled min-w-[240px]">
                  <span>Discover The Collection</span>
                  <ArrowRight className="w-4 h-4 ml-3" />
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

export default Wishlist;
