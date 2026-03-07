import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ArrowRight } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await login(email, password);
            navigate("/account");
        } catch (err: any) {
            setError(err.message || "Failed to login. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFDFD] text-foreground flex flex-col justify-center py-20 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12 flex justify-center w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-lg bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-border/40 relative overflow-hidden group"
                >
                    {/* Back to Home inside Card */}
                    <Link to="/" className="absolute top-8 left-10 group/back flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all z-20">
                        <ArrowRight className="w-3 h-3 rotate-180 group-hover/back:-translate-x-1 transition-transform" />
                        <span>Home</span>
                    </Link>

                    {/* Premium Glow Effect */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-[#C6A75E]/15 to-transparent rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000" />

                    <div className="relative z-10 w-full">
                        <div className="text-center mb-12 mt-4">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block px-4 py-1.5 rounded-full bg-secondary text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-6"
                            >
                                Private Access
                            </motion.div>
                            <h1 className="flex flex-col items-center justify-center text-display font-serif uppercase mb-4 tracking-tighter leading-[1.1]">
                                <span className="block">Welcome</span>
                                <div className="flex items-center gap-4">
                                    <span>To</span>
                                    <img src="/logo.png" alt="Maze" className="h-[1.1em] w-auto object-contain translate-y-[-0.05em]" />
                                </div>
                            </h1>
                            <p className="text-body-sm text-muted-foreground max-w-[280px] mx-auto text-balance">Enter your primary credentials to unlock your MAZE profile.</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-10 p-5 bg-red-50/50 border border-red-100/50 text-red-600 text-[10px] font-black tracking-widest uppercase text-center rounded-2xl backdrop-blur-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-foreground block px-2">Account ID / Email</label>
                                <div className="relative group/input">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-[#F9F9F9] border border-border/60 focus:border-foreground focus:bg-white rounded-[1.25rem] px-6 py-5 outline-none transition-all text-body font-medium placeholder:text-muted-foreground/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)] focus:shadow-[0_12px_24px_rgba(0,0,0,0.04)]"
                                        placeholder="your@access.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end px-2">
                                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-foreground">Secure Token</label>
                                    <button type="button" className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground hover:text-foreground transition-all hover:underline underline-offset-4 decoration-border">Access Recovery</button>
                                </div>
                                <div className="relative group/input">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-[#F9F9F9] border border-border/60 focus:border-foreground focus:bg-white rounded-[1.25rem] px-6 py-5 outline-none transition-all text-body font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)] focus:shadow-[0_12px_24px_rgba(0,0,0,0.04)]"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-16 bg-foreground text-background rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 active:translate-y-0.5 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 overflow-hidden group/btn mt-10 active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>Authorize Access</span>
                                        <div className="p-1 px-2 border-l border-white/20 group-hover/btn:translate-x-1 transition-transform">
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </div>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-16 text-center pt-10 border-t border-border/40">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8 font-black">No Profile Yet?</p>
                            <Link
                                to="/register"
                                className="inline-flex items-center gap-4 px-12 py-5 rounded-[1.25rem] border border-border text-[11px] font-black uppercase tracking-[0.3em] text-foreground hover:bg-foreground hover:text-background hover:scale-105 active:scale-95 transition-all duration-500 group/reg"
                            >
                                <span>Create Account</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#C6A75E] scale-0 group-hover/reg:scale-100 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default Login;
