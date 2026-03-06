import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Search, Package, ArrowRight, Truck, ShieldCheck } from "lucide-react";

const TrackOrder = () => {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <CartDrawer />

            <div className="pt-40 pb-24 lg:pt-48 lg:pb-32 px-6 overflow-hidden relative">
                {/* Abstract Background Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[120px] -z-10" />

                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                            {/* Left Side: Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-left"
                            >
                                <span className="text-overline uppercase tracking-[0.4em] text-[#C6A75E] font-bold block mb-6">
                                    Logistics & Tracking
                                </span>
                                <h1 className="text-display font-serif mb-8 uppercase leading-[1.1]">
                                    Track Your <br />
                                    <span className="italic text-[#111]/40 transition-colors hover:text-[#C6A75E]">Shipment</span>
                                </h1>
                                <p className="text-body text-muted-foreground mb-10 max-w-md leading-relaxed">
                                    Enter your unique order identifier and email to access real-time status updates on your Maze performance gear.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4 items-center group">
                                        <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                                            <Truck className="w-5 h-5 text-[#111]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest">Global Express</p>
                                            <p className="text-caption text-muted-foreground">Door-to-door tracking enabled</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center group">
                                        <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                                            <ShieldCheck className="w-5 h-5 text-[#111]" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest">Secure Handling</p>
                                            <p className="text-caption text-muted-foreground">Insured movement across transit</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Side: Form Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative"
                            >
                                {/* 3D Reflection Effect */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-[#C6A75E]/5 to-transparent rounded-[40px] blur-2xl -z-10" />

                                <div className="bg-white p-8 lg:p-12 rounded-[32px] shadow-card-3d border border-border/40 relative overflow-hidden group hover:shadow-card-3d-hover transition-all duration-700">
                                    {/* Decorative faint icon */}
                                    <Package className="absolute -bottom-10 -right-10 w-40 h-40 text-secondary/40 -z-0 opacity-50 grayscale group-hover:rotate-12 transition-transform duration-1000" />

                                    <form className="relative z-10 space-y-8">
                                        <div className="space-y-3">
                                            <label className="block text-[11px] uppercase font-bold tracking-[0.2em] text-foreground/60 ml-1">
                                                Order Identifier
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="e.g. #MZ12345"
                                                    className="w-full bg-[#fbfbfb] border border-border/80 rounded-2xl px-6 py-4 text-body-sm outline-none focus:border-[#C6A75E] focus:bg-white transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="block text-[11px] uppercase font-bold tracking-[0.2em] text-foreground/60 ml-1">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    className="w-full bg-[#fbfbfb] border border-border/80 rounded-2xl px-6 py-4 text-body-sm outline-none focus:border-[#C6A75E] focus:bg-white transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                                                />
                                            </div>
                                        </div>

                                        <button className="w-full btn-buy py-5 flex items-center justify-center gap-3">
                                            <Search className="w-5 h-5" />
                                            <span>Track Order</span>
                                            <ArrowRight className="w-4 h-4 ml-1 opacity-60 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>

                                    <div className="mt-8 pt-8 border-t border-border/40 flex items-center justify-between">
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                                            Help Center
                                        </p>
                                        <a href="/contact" className="text-[10px] uppercase font-bold tracking-widest text-[#C6A75E] hover:underline">
                                            Contact Support
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default TrackOrder;
