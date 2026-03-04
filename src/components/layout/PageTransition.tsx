import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Ultra-luxury couture easing curves
const easeEditorial: [number, number, number, number] = [0.4, 0, 0, 1];
const easeSilk: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Couture reveal - layered like silk fabric uncovering
const pageVariants = {
  initial: {
    opacity: 0,
    clipPath: "inset(100% 0 0 0)", // Start masked from bottom
  },
  animate: {
    opacity: 1,
    clipPath: "inset(0% 0 0 0)", // Reveal upward like fabric lifting
    transition: {
      duration: 0.9,
      ease: easeEditorial,
      opacity: {
        duration: 0.6,
        ease: easeSilk,
      },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: easeSilk,
    },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
