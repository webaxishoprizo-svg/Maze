import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const InactivityPrompt = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const navigate = useNavigate();
    const INACTIVITY_TIME = 30000; // 30 seconds

    useEffect(() => {
        if (hasTriggered) return;

        let timer: NodeJS.Timeout;

        const startTimer = () => {
            timer = setTimeout(() => {
                setIsVisible(true);
                setHasTriggered(true);
            }, INACTIVITY_TIME);
        };

        const activityListener = () => {
            clearTimeout(timer);
            startTimer();
        };

        // Events to monitor for activity
        const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
        events.forEach((event) => document.addEventListener(event, activityListener));

        startTimer();

        return () => {
            clearTimeout(timer);
            events.forEach((event) => document.removeEventListener(event, activityListener));
        };
    }, [hasTriggered]);

    const handleNavigation = (path: string) => {
        setIsVisible(false);
        navigate(path);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-10 left-10 z-[100] w-full max-w-sm bg-background/95 backdrop-blur-md rounded-[4px] p-8 shadow-elevated border border-border"
                >
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-[#C6A75E]">
                                <HelpCircle className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Need help choosing?</h3>
                        </div>

                        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider leading-relaxed pr-6">
                            Maximize your performance with the right choice. Our experts suggest:
                        </p>

                        <div className="flex flex-col gap-2">
                            <button 
                                onClick={() => handleNavigation("/bags")}
                                className="group flex items-center justify-between p-3 rounded-[2px] border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-all font-medium text-[10px] uppercase tracking-[0.2em] text-foreground text-left"
                            >
                                <span>Rail series</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </button>
                            <button 
                                onClick={() => handleNavigation("/jackets")}
                                className="group flex items-center justify-between p-3 rounded-[2px] border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-all font-medium text-[10px] uppercase tracking-[0.2em] text-foreground text-left"
                            >
                                <span>Lift series</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
