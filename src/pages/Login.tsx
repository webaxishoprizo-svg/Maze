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
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="pt-40 pb-24 lg:pt-48">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-md mx-auto"
                    >
                        <div className="text-center mb-12">
                            <h1 className="text-display font-serif uppercase mb-4">Welcome Back</h1>
                            <p className="text-body-sm text-muted-foreground">Enter your credentials to access your account.</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold tracking-wide uppercase text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground block mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none transition-colors text-body font-medium placeholder:text-muted-foreground/30"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-end mb-2">
                                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Password</label>
                                    <button type="button" className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground/50 hover:text-foreground transition-colors">Forgot?</button>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none transition-colors text-body font-medium"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-couture-filled py-5 flex items-center justify-center gap-3 mt-10"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 text-center pt-8 border-t border-border/50">
                            <p className="text-body-sm text-muted-foreground mb-4">New to Maze?</p>
                            <Link
                                to="/register"
                                className="text-[11px] uppercase font-black tracking-[0.3em] text-foreground hover:opacity-60 transition-opacity"
                            >
                                Create an Account
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Login;
