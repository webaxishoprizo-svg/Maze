import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useCollections } from "@/hooks/useProducts";

const CategoryTiles = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const categories = [
    {
      id: "men",
      title: "Men's Collection",
      handle: "men",
      image: "/images/men-collection.png",
      description: "Performance engineered for the modern athlete.",
      link: "/men"
    },
    {
      id: "women",
      title: "Women's Collection",
      handle: "women",
      image: "/images/women-collection.png",
      description: "Elegance meets power in every movement.",
      link: "/women"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-overline uppercase tracking-[0.4em] text-muted-foreground block mb-4">Discover</span>
            <h2 className="text-display-sm font-serif uppercase tracking-tight">
              Shop by Collection
            </h2>
          </div>
          <div className="hidden md:block h-px bg-border flex-1 mx-12 mb-4" />
          <Link
            to="/collection"
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity mb-2"
          >
            View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <Link to={item.link} className="block relative overflow-hidden bg-secondary aspect-[4/5] lg:aspect-[16/10]">
                {/* Image Component */}
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold mb-3 block">
                      Explore
                    </span>
                    <h3 className="text-white text-3xl lg:text-4xl font-serif mb-4 uppercase tracking-tight group-hover:tracking-normal transition-all duration-700">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm max-w-xs mb-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/30 pb-2 group-hover:border-white transition-all duration-500">
                      Shop Now <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </motion.div>
                </div>

                {/* Border Effect */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-700 m-4 lg:m-6 pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryTiles;
