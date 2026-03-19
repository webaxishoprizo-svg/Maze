import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

export const ExitIntent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 50 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsVisible(false);
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [hasTriggered]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send to backend or show success
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-background rounded-[4px] p-10 lg:p-14 shadow-elevated border border-border"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" strokeWidth={1.5} />
                        </button>

                        <div className="text-center space-y-6">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C6A75E] font-bold">Exclusive Offer</span>
                            <h2 className="text-2xl lg:text-3xl font-serif leading-tight">
                                Experience refined <br /> <span className="italic">Performance</span> before you go
                            </h2>
                            <p className="text-body-sm text-muted-foreground max-w-[320px] mx-auto">
                                Join the MAZE elite and unlock a performance-driven experience in your inbox.
                            </p>

                            <form onSubmit={handleSubmit} className="relative group max-w-sm mx-auto mt-8">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-secondary/30 border border-transparent rounded-[4px] px-6 py-4 text-body outline-none placeholder:text-muted-foreground focus:border-foreground/20 focus:bg-white transition-all duration-500"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-foreground text-background rounded-[2px] transition-colors hover:bg-[#C6A75E]"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                            
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground/50 font-bold !mt-10">
                                Rare Drops. Performance Only.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
