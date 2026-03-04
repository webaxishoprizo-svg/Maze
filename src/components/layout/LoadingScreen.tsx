import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minDisplayTime?: number;
}

// Ultra-luxury couture easing curves
const easeCouture: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeSilk: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeEditorial: [number, number, number, number] = [0.4, 0, 0, 1];

const LoadingScreen = ({
  onLoadingComplete,
  minDisplayTime = 2200
}: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<'line' | 'brand' | 'tagline' | 'exit'>('line');

  useEffect(() => {
    // Phase timing for the couture reveal sequence
    const lineTimer = setTimeout(() => setPhase('brand'), 400);
    const brandTimer = setTimeout(() => setPhase('tagline'), 1000);
    const taglineTimer = setTimeout(() => setPhase('exit'), 1800);
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 600); // Wait for exit animation
    }, minDisplayTime);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(brandTimer);
      clearTimeout(taglineTimer);
      clearTimeout(exitTimer);
    };
  }, [minDisplayTime, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: easeSilk }
          }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />

          {/* Content container */}
          <div className="relative flex flex-col items-center">

            {/* Decorative line - draws from center */}
            <motion.div
              className="absolute -top-12 w-px bg-foreground/20"
              initial={{ height: 0 }}
              animate={{
                height: phase !== 'line' ? 48 : 0,
              }}
              transition={{ duration: 0.6, ease: easeCouture }}
            />

            {/* Brand logo - vertical mask reveal */}
            <div className="overflow-hidden">
              <motion.img
                src="/logo.png"
                alt="Maze"
                className="h-32 md:h-48 lg:h-64 w-auto object-contain dark:invert"
                initial={{
                  y: "100%",
                  opacity: 0
                }}
                animate={{
                  y: phase === 'brand' || phase === 'tagline' || phase === 'exit' ? "0%" : "100%",
                  opacity: phase === 'brand' || phase === 'tagline' || phase === 'exit' ? 1 : 0,
                }}
                transition={{
                  duration: 0.9,
                  ease: easeEditorial,
                }}
              />
            </div>

            {/* Tagline - delayed opacity lift with micro drift */}
            <motion.p
              className="mt-4 text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground"
              initial={{
                opacity: 0,
                y: 8
              }}
              animate={{
                opacity: phase === 'tagline' || phase === 'exit' ? 1 : 0,
                y: phase === 'tagline' || phase === 'exit' ? 0 : 8,
              }}
              transition={{
                duration: 0.7,
                ease: easeSilk,
              }}
            >
              Luxury Redefined
            </motion.p>

            {/* Subtle loading indicator - elegant dot pulse */}
            <motion.div
              className="mt-12 flex gap-1.5"
              initial={{ opacity: 0 }}
              animate={{
                opacity: phase === 'tagline' ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: easeSilk }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 rounded-full bg-foreground/30"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: easeSilk,
                  }}
                />
              ))}
            </motion.div>

            {/* Decorative line - bottom */}
            <motion.div
              className="absolute -bottom-12 w-px bg-foreground/20"
              initial={{ height: 0 }}
              animate={{
                height: phase !== 'line' ? 48 : 0,
              }}
              transition={{ duration: 0.6, ease: easeCouture, delay: 0.1 }}
            />
          </div>

          {/* Corner accents - ultra-subtle editorial touch */}
          <motion.div
            className="absolute top-8 left-8 w-12 h-px bg-foreground/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase !== 'line' ? 1 : 0 }}
            transition={{ duration: 0.8, ease: easeCouture, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
          <motion.div
            className="absolute top-8 left-8 h-12 w-px bg-foreground/10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase !== 'line' ? 1 : 0 }}
            transition={{ duration: 0.8, ease: easeCouture, delay: 0.4 }}
            style={{ transformOrigin: 'top' }}
          />

          <motion.div
            className="absolute bottom-8 right-8 w-12 h-px bg-foreground/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase !== 'line' ? 1 : 0 }}
            transition={{ duration: 0.8, ease: easeCouture, delay: 0.3 }}
            style={{ transformOrigin: 'right' }}
          />
          <motion.div
            className="absolute bottom-8 right-8 h-12 w-px bg-foreground/10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase !== 'line' ? 1 : 0 }}
            transition={{ duration: 0.8, ease: easeCouture, delay: 0.4 }}
            style={{ transformOrigin: 'bottom' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
