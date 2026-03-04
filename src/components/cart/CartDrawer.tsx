import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, checkout, isCheckingOut } = useCart();

  const freeShippingThreshold = 500;
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = freeShippingThreshold - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-foreground/30 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[90] w-full max-w-md bg-background shadow-elevated flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-subheading font-serif">Your Bag</span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-secondary transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {subtotal > 0 && (
              <div className="px-6 py-4 bg-secondary/50">
                <div className="flex justify-between text-caption mb-2">
                  <span className="text-muted-foreground">
                    {amountToFreeShipping > 0
                      ? `Add $${amountToFreeShipping.toFixed(2)} for free shipping`
                      : "You've unlocked free shipping!"}
                  </span>
                  <span className="text-foreground">${freeShippingThreshold}</span>
                </div>
                <div className="h-1 bg-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-foreground"
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-heading font-serif mb-2">Your bag is empty</p>
                  <p className="text-body-sm text-muted-foreground mb-6">
                    Discover our latest collections
                  </p>
                  <Link
                    to="/collection"
                    onClick={closeCart}
                    className="btn-couture"
                  >
                    <span>Shop Now</span>
                  </Link>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4"
                    >
                      <div className="w-24 h-32 bg-secondary overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <h4 className="text-body font-medium">{item.name}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-caption text-muted-foreground mt-1">
                          {item.size && `Size: ${item.size}`}
                          {item.color && ` · ${item.color}`}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-secondary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-4 text-body-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-secondary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-body font-medium">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                {/* Discount Code */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="flex-1 bg-transparent border border-border px-4 py-2 text-body-sm placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors"
                  />
                  <button className="px-4 py-2 border border-foreground text-overline uppercase tracking-luxury hover:bg-foreground hover:text-background transition-colors">
                    Apply
                  </button>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between py-4 border-t border-border">
                  <span className="text-body">Subtotal</span>
                  <span className="text-body font-medium">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={checkout}
                  disabled={isCheckingOut}
                  className={`w-full btn-couture-filled py-4 flex items-center justify-center gap-2 ${isCheckingOut ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isCheckingOut ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Proceed to Checkout</span>
                  )}
                </motion.button>

                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="block text-center text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
