import { motion } from "framer-motion";

const MarqueeBanner = () => {
  const items = [
    "Free Shipping Over $500",
    "✦",
    "New Collection",
    "✦",
    "Complimentary Gift Wrapping",
    "✦",
    "Sustainable Luxury",
    "✦",
    "Made in Italy",
    "✦",
    "2 Year Warranty",
    "✦",
  ];

  return (
    <div className="py-5 bg-foreground text-background overflow-hidden">
      <div className="flex">
        <motion.div
          className="flex shrink-0 gap-12 items-center"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...items, ...items].map((item, index) => (
            <span
              key={index}
              className="text-[10px] uppercase tracking-[0.3em] whitespace-nowrap font-light"
            >
              {item}
            </span>
          ))}
        </motion.div>
        <motion.div
          className="flex shrink-0 gap-12 items-center"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...items, ...items].map((item, index) => (
            <span
              key={index}
              className="text-[10px] uppercase tracking-[0.3em] whitespace-nowrap font-light"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
