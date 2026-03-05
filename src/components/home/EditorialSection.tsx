import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const EditorialSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative mt-20">
      {/* Banner Area */}
      <div className="relative h-[600px] lg:h-[700px] bg-[#111] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/lifestyle_baggy.png"
            alt="Maze baggy track pants lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute inset-y-0 right-0 w-2/3 lg:w-1/2 bg-gradient-to-l from-black/90 via-black/80 to-transparent" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 h-full flex flex-col justify-center items-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-right lg:text-left mr-0 lg:mr-20 xl:mr-40"
          >
            <h3 className="text-white/80 font-bold uppercase tracking-[0.3em] mb-4 text-sm md:text-base">
              Engineered For
            </h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-widest mb-6 leading-tight">
              Strength & Style
            </h2>
            <div className="h-0.5 bg-[#c19864] w-24 mb-8 ml-auto lg:ml-0" />
            <p className="text-lg md:text-xl text-white/90 font-medium tracking-wide mb-10">
              From Gym to Street — One Fit.
            </p>

            <Link
              to="/collection"
              className="btn-couture min-w-[240px] text-center !text-white !border-white/30 hover:!bg-white hover:!text-black"
            >
              <span>Explore Collection</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-black py-8 md:py-12 border-t border-[#222]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x-0 lg:divide-x border-0 lg:border-x-0 divide-[#333] border-[#333]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center justify-center"
            >
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</h4>
              <p className="text-[#999] text-sm md:text-base">Customers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center text-center justify-center border-l border-[#333] lg:border-0 pl-8 lg:pl-0"
            >
              <div className="flex items-center gap-1 mb-2">
                <h4 className="text-3xl md:text-4xl font-bold text-white">4.9</h4>
                <Star className="w-6 h-6 text-[#c19864] fill-current" />
              </div>
              <p className="text-[#999] text-sm md:text-base">Rating</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center text-center justify-center lg:border-l border-[#333]"
            >
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">30-Day</h4>
              <p className="text-[#999] text-sm md:text-base">Return</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col items-center text-center justify-center border-l border-[#333] lg:border-l pl-8 lg:pl-0"
            >
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">100%</h4>
              <p className="text-[#999] text-sm md:text-base">Premium Quality</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
