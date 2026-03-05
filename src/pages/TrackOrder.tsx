import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, Package } from "lucide-react";

const TrackOrder = () => {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="pt-32 pb-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <h1 className="text-display font-serif mb-6 uppercase">Track Your Order</h1>
                        <p className="text-body text-muted-foreground mb-12 max-w-lg mx-auto">
                            Enter your order number and email address to track the status of your shipment.
                        </p>

                        <div className="p-8 border border-border bg-secondary/30">
                            <form className="space-y-6 text-left">
                                <div>
                                    <label className="block text-[10px] uppercase font-bold tracking-widest mb-2">Order Number</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. #MZ12345"
                                        className="w-full bg-background border border-border px-4 py-3 text-body-sm outline-none focus:border-foreground transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase font-bold tracking-widest mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full bg-background border border-border px-4 py-3 text-body-sm outline-none focus:border-foreground transition-colors"
                                    />
                                </div>
                                <button className="w-full btn-couture-filled py-4 flex items-center justify-center gap-2">
                                    <Search className="w-4 h-4" />
                                    <span>Track Order</span>
                                </button>
                            </form>
                        </div>

                        <div className="mt-12 flex flex-col items-center gap-4 text-muted-foreground">
                            <Package className="w-12 h-12 opacity-20" />
                            <p className="text-caption italic">Typically orders are processed within 24-48 hours.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default TrackOrder;
