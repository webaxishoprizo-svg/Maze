import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "The quality is exceptional, and the design is just what I was looking for.",
    author: "Emily Chen",
    title: "Fashion Enthusiast",
  },
  {
    id: 2,
    quote: "Every piece feels like an investment. The craftsmanship is truly remarkable.",
    author: "Sarah Laurent",
    title: "Style Consultant",
  },
  {
    id: 3,
    quote: "Timeless designs that elevate any wardrobe. I couldn't be happier with my purchase.",
    author: "Isabella Martinez",
    title: "Creative Director",
  },
];

// Ultra-luxury easing curves
const easeEditorial: [number, number, number, number] = [0.4, 0, 0, 1];
const easeSilk: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000); // Slower, more deliberate timing
    return () => clearInterval(timer);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length;
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  // Magazine spread transition - mask reveal style
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Quote Mark - Editorial reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: 1,
              transition: { duration: 1, ease: easeSilk }
            } : {}}
            className="text-center mb-12"
          >
            <span className="text-[120px] lg:text-[180px] font-serif text-background/10 leading-none select-none">
              "
            </span>
          </motion.div>

          {/* Testimonial Carousel - Smooth editorial transitions */}
          <div className="relative min-h-[200px] lg:min-h-[180px] flex items-center justify-center -mt-24 lg:-mt-32">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ 
                  duration: 0.7, 
                  ease: easeSilk 
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <p className="text-heading font-serif mb-10 leading-relaxed max-w-2xl italic">
                  {testimonials[current].quote}
                </p>
                <div>
                  <p className="text-body font-medium tracking-wide">
                    {testimonials[current].author}
                  </p>
                  <p className="text-body-sm text-background/50 mt-1">
                    {testimonials[current].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation - Refined couture buttons */}
          <motion.div 
            className="flex items-center justify-center gap-6 mt-16"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, delay: 0.4, ease: easeSilk }
            } : {}}
          >
            <motion.button
              onClick={() => navigate(-1)}
              className="p-3 border border-background/20 transition-all duration-300"
              style={{
                transition: "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              whileHover={{ 
                borderColor: "rgba(255,255,255,0.4)",
                backgroundColor: "rgba(255,255,255,0.05)"
              }}
              whileTap={{ 
                scale: 0.98,
                y: 1 
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className="relative group"
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <motion.span
                    className="block w-2 h-2 rounded-full"
                    animate={{
                      width: index === current ? 32 : 8,
                      backgroundColor: index === current 
                        ? "hsl(30 25% 95%)" 
                        : "hsl(30 25% 95% / 0.3)"
                    }}
                    transition={{ duration: 0.5, ease: easeEditorial }}
                  />
                </button>
              ))}
            </div>
            
            <motion.button
              onClick={() => navigate(1)}
              className="p-3 border border-background/20 transition-all duration-300"
              style={{
                transition: "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              whileHover={{ 
                borderColor: "rgba(255,255,255,0.4)",
                backgroundColor: "rgba(255,255,255,0.05)"
              }}
              whileTap={{ 
                scale: 0.98,
                y: 1 
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
