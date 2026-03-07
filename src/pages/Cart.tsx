import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, ArrowLeft, Minus, Plus, Trash2, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { useCart } from "@/store/cartStore";

const Cart = () => {
    const { items, updateQuantity, removeItem, subtotal, checkout, isCheckingOut } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-[80vh] px-6 pt-32 pb-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Back to Home</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center mt-20"
                    >
                        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <ShoppingBag className="w-10 h-10 text-muted-foreground/40" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif mb-6">Your Bag is Empty</h1>
                        <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed italic">
                            The finest pieces are still waiting for you. Discover our seasonal collections and find your signature style.
                        </p>
                        <Link to="/collection" className="btn-standard-filled px-12">
                            <span>Discover Collections</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Side: Cart Items */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-12"
                        >
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[10px] uppercase tracking-widest font-bold">Back to Home</span>
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-serif mb-2">Shopping Bag</h1>

                            <p className="text-muted-foreground uppercase tracking-luxury text-[11px] font-bold">
                                {items.length} {items.length === 1 ? 'item' : 'items'} in your selection
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col sm:flex-row gap-8 pb-8 border-b border-border group"
                                >
                                    <div className="w-full sm:w-48 aspect-[3/4] bg-secondary overflow-hidden rounded-[4px] shadow-couture relative group">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-silk"
                                        />
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className="flex-1 flex flex-col py-2">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-serif mb-1 group-hover:italic transition-all">{item.name}</h3>
                                                <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold">
                                                    {item.size && `Size: ${item.size}`}
                                                    {item.color && (item.size ? ` / ${item.color}` : `Color: ${item.color}`)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-muted-foreground hover:text-destructive transition-colors p-2"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-6 mt-auto">
                                            <div className="flex items-center border border-border rounded-[4px] bg-secondary/30">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-3 hover:bg-secondary transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-10 text-center text-sm font-bold border-x border-border">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-3 hover:bg-secondary transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <div className="text-lg font-serif italic">
                                                ₹{(item.price * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Order Benefits */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-border">
                            <div className="flex items-center gap-4">
                                <Truck className="w-5 h-5 text-accent-gold" />
                                <span className="text-[11px] uppercase tracking-widest font-bold">Complimentary Shipping</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <ShieldCheck className="w-5 h-5 text-accent-gold" />
                                <span className="text-[11px] uppercase tracking-widest font-bold">Secure Transactions</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <RefreshCcw className="w-5 h-5 text-accent-gold" />
                                <span className="text-[11px] uppercase tracking-widest font-bold">14-Day Returns</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:w-[400px]">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-secondary/20 border border-border rounded-[8px] p-8 sticky top-32"
                        >
                            <h2 className="text-2xl font-serif mb-8 italic">Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                                    <span className="text-accent-gold uppercase tracking-widest text-[10px] font-bold italic">Complimentary</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border mb-10">
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-serif italic">Total</span>
                                    <span className="text-2xl font-serif">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-4 italic">
                                    Taxes are calculated at checkout based on your delivery address.
                                </p>
                            </div>

                            <button
                                onClick={checkout}
                                disabled={isCheckingOut}
                                className="w-full btn-buy py-5 flex items-center justify-center gap-4 group"
                            >
                                {isCheckingOut ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Redirecting...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Proceed to Checkout</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <div className="mt-8">
                                <Link to="/collection" className="block text-center text-[11px] uppercase tracking-luxury font-bold hover:text-accent-gold transition-colors">
                                    Continue Shopping
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
