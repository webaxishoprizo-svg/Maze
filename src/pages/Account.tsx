import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { User, Package, Heart, LogOut, Mail, MapPin, Settings } from "lucide-react";

const Account = () => {
    const { customer, isLoggedIn, logout, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, loading, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 border-2 border-foreground/10 border-t-foreground rounded-full"
                />
            </div>
        );
    }

    if (!customer) return null;

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="pt-32 pb-24 lg:pt-40">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-12 border-b border-border/50">
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-muted-foreground mb-4">Member Profile</p>
                                <h1 className="text-display font-serif uppercase leading-tight">
                                    Hello, {customer.firstName}
                                </h1>
                            </div>
                            <button
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                                className="flex items-center gap-3 px-8 py-4 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all font-bold tracking-[0.2em] uppercase text-[10px]"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Navigation Sidebar */}
                            <div className="lg:col-span-3">
                                <nav className="flex flex-col gap-2">
                                    <button className="flex items-center gap-4 px-6 py-5 bg-foreground text-background font-bold tracking-widest uppercase text-[10px] text-left">
                                        <User className="w-4 h-4" />
                                        Personal Information
                                    </button>
                                    <button className="flex items-center gap-4 px-6 py-5 border border-border hover:border-foreground transition-all font-bold tracking-widest uppercase text-[10px] text-muted-foreground hover:text-foreground text-left">
                                        <Package className="w-4 h-4" />
                                        Order History
                                    </button>
                                    <button className="flex items-center gap-4 px-6 py-5 border border-border hover:border-foreground transition-all font-bold tracking-widest uppercase text-[10px] text-muted-foreground hover:text-foreground text-left">
                                        <Heart className="w-4 h-4" />
                                        My Wishlist
                                    </button>
                                    <button className="flex items-center gap-4 px-6 py-5 border border-border hover:border-foreground transition-all font-bold tracking-widest uppercase text-[10px] text-muted-foreground hover:text-foreground text-left">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </button>
                                </nav>
                            </div>

                            {/* Main Content Area */}
                            <div className="lg:col-span-9 space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Profile Details Card */}
                                    <div className="p-10 border border-border bg-secondary/10 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-heading font-serif uppercase mb-8">Personal Details</h3>
                                            <div className="space-y-6">
                                                <div className="flex items-start gap-4">
                                                    <User className="w-4 h-4 text-muted-foreground mt-1" />
                                                    <div>
                                                        <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-black mb-1">Full Name</p>
                                                        <p className="text-body font-medium">{customer.firstName} {customer.lastName}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <Mail className="w-4 h-4 text-muted-foreground mt-1" />
                                                    <div>
                                                        <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-black mb-1">Email Address</p>
                                                        <p className="text-body font-medium">{customer.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="mt-12 text-[9px] uppercase font-black tracking-[0.3em] text-foreground underline underline-offset-8 hover:opacity-60 transition-opacity">
                                            Edit Information
                                        </button>
                                    </div>

                                    {/* Shipping Address Placeholder */}
                                    <div className="p-10 border border-border flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-heading font-serif uppercase mb-8">Default Address</h3>
                                            <div className="flex items-start gap-4 text-muted-foreground italic">
                                                <MapPin className="w-4 h-4 mt-1" />
                                                <p className="text-body-sm leading-relaxed">No shipping address provided yet.</p>
                                            </div>
                                        </div>
                                        <button className="mt-12 text-[9px] uppercase font-black tracking-[0.3em] text-foreground underline underline-offset-8 hover:opacity-60 transition-opacity text-left">
                                            Add New Address
                                        </button>
                                    </div>
                                </div>

                                {/* Orders Preview Section */}
                                <div className="p-10 border border-border">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-heading font-serif uppercase">Recent Orders</h3>
                                        <button className="text-[9px] uppercase tracking-[0.2em] font-black underline underline-offset-4">View All</button>
                                    </div>
                                    <div className="py-12 flex flex-col items-center justify-center gap-6 bg-secondary/5 border border-dashed border-border">
                                        <Package className="w-8 h-8 opacity-20" />
                                        <p className="text-body-sm text-center text-muted-foreground italic">You haven't placed any orders with this account yet.</p>
                                        <button
                                            onClick={() => navigate("/collection")}
                                            className="mt-2 btn-couture px-10 text-[9px]"
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Account;
