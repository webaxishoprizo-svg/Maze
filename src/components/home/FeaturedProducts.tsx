import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ui/ProductCard";
import { useRef } from "react";

interface FeaturedProductsProps {
  products: any[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const staggerDelay = 0.15;

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6"
          >
            <h2 className="text-xl md:text-2xl font-serif font-bold uppercase tracking-widest text-[#111]">
              Bestsellers
            </h2>
            <div className="hidden md:block h-px bg-[#e5e5e5] w-24 lg:w-48" />
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-center"
          >
            <span className="text-xl md:text-2xl font-serif italic text-[#333]">
              Limited Edition Drops
            </span>
          </motion.div>

          {/* View All */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-end"
          >
            <Link
              to="/collection"
              className="btn-couture-filled min-w-[120px] text-center"
            >
              <span>View All</span>
            </Link>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((p, index) => {
            const mappedProduct = {
              id: p.id,
              variantId: p.variantId,
              name: p.title,
              price: parseFloat(p.price),
              image: p.image,
              hoverImage: p.image, // FeaturedProducts previously had hoverImage logic, keeping it simple for now
              category: "Bestseller",
              handle: p.handle,
            };
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.3 + (index * staggerDelay),
                  }
                } : {}}
              >
                <ProductCard {...mappedProduct} />
              </motion.div>
            );
          })}
        </div>
        {products.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 italic">Connecting to Maze Storefront...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
