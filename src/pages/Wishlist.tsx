import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/store/cartStore";

const productJacket = "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800";
const productSweater = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800";
const productBag = "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800";
const productDress = "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800";

const initialWishlist = [
  { id: "1", name: "Wool Cashmere Coat", price: 1890, image: productJacket, category: "Outerwear" },
  { id: "2", name: "Merino Knit Sweater", price: 590, image: productSweater, category: "Knitwear" },
  { id: "3", name: "Leather Tote Bag", price: 1290, image: productBag, category: "Accessories" },
  { id: "4", name: "Silk Evening Dress", price: 2450, image: productDress, category: "Dresses" },
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlist);
  const { addItem } = useCart();

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const moveToCart = (item: typeof initialWishlist[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: "M",
      color: "Default",
    });
    removeFromWishlist(item.id);
  };

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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-6 border border-border rounded-full flex items-center justify-center"
            >
              <Heart className="w-6 h-6" />
            </motion.div>
            <h1 className="text-display-lg font-serif mb-4">Wishlist</h1>
            <p className="text-body text-muted-foreground">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatePresence mode="popLayout">
            {wishlistItems.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {wishlistItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative"
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-4 right-4 z-10 w-8 h-8 bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-foreground hover:text-background"
                      aria-label="Remove from wishlist"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Image */}
                    <Link to={`/product/${item.id}`} className="block">
                      <div className="aspect-[3/4] overflow-hidden bg-secondary/30 mb-4">
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-body font-medium mb-1">{item.name}</h3>
                    <p className="text-body-sm text-muted-foreground mb-4">
                      ${item.price.toLocaleString()}
                    </p>

                    {/* Add to Cart Button */}
                    <motion.button
                      onClick={() => moveToCart(item)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-foreground text-background text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Bag
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-8 border border-border rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-heading font-serif mb-4">Your wishlist is empty</h2>
                <p className="text-body text-muted-foreground mb-10 max-w-md mx-auto">
                  Save your favorite pieces to your wishlist and they'll appear here for easy access.
                </p>
                <Link to="/collection" className="btn-couture-filled">
                  <span className="flex items-center gap-2">
                    Browse Collection
                    <ArrowRight className="w-4 h-4" />
                  </span>
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
