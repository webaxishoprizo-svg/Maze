import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Loader2, ArrowRight } from "lucide-react";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await signup(formData);
            navigate("/account");
        } catch (err: any) {
            setError(err.message || "Failed to create account. Email might be already in use.");
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
                            <h1 className="text-display font-serif uppercase mb-4">Join Maze</h1>
                            <p className="text-body-sm text-muted-foreground">Become part of our performance community.</p>
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
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground block mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none transition-colors text-body font-medium"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground block mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none transition-colors text-body font-medium"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground block mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none transition-colors text-body font-medium"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground block mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none transition-colors text-body font-medium"
                                />
                                <p className="text-[9px] text-muted-foreground/50 mt-2 uppercase tracking-widest font-bold">Minimum 6 characters required</p>
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
                                        <span>Create Account</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 text-center pt-8 border-t border-border/50">
                            <p className="text-body-sm text-muted-foreground mb-4">Already have an account?</p>
                            <Link
                                to="/login"
                                className="text-[11px] uppercase font-black tracking-[0.3em] text-foreground hover:opacity-60 transition-opacity"
                            >
                                Sign In
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Register;
