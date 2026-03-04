import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useCollections } from "@/hooks/useProducts";

const CategoryTiles = () => {
  const { collections, loading } = useCollections(5);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  if (loading) return null;

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-12"
        >
          <h2 className="text-xl font-black uppercase tracking-widest text-[#111]">
            Shop by Collection
          </h2>
          <div className="h-px bg-[#e5e5e5] max-w-[120px] lg:max-w-xs w-full" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 w-full">
          {collections.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link to={`/collection/${item.handle}`} className="group block relative aspect-square md:aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={item.image?.url || "https://images.unsplash.com/photo-1510319766946-880629bb46fa?q=80&w=1500&auto=format&fit=crop"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
                  <span className="text-white font-bold tracking-widest uppercase text-[11px] md:text-xs">{item.title}</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryTiles;
