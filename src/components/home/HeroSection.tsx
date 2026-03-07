import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] pt-28 pb-16 flex items-center overflow-hidden bg-white">
      {/* Background image half right */}
      <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full opacity-30 lg:opacity-100 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:via-max-w-max lg:to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
        <img
          src="/images/hero_man_baggy.png"
          alt="Athlete wearing Maze baggy track pants"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 mt-16 lg:mt-0">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-[#222] uppercase mb-1">
              Crafted For
            </h2>
            <h1 className="text-6xl md:text-7xl lg:text-9xl font-serif font-black text-[#111] uppercase tracking-[-0.03em] mb-6 leading-none">
              Greatness
            </h1>
            <p className="text-lg md:text-xl text-[#333] font-serif font-medium mb-10">
              Performance Track Pants Redefined
            </p>

            <Link
              to="/collection"
              className="btn-couture-filled min-w-[240px] mb-16"
            >
              <span>Shop Now</span>
              <span className="ml-4">→</span>
            </Link>

            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#c19864]" strokeWidth={2.5} />
                <span className="text-xs font-bold uppercase text-[#333]">Premium Fabric</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#c19864]" strokeWidth={2.5} />
                <span className="text-xs font-bold uppercase text-[#333]">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#c19864] fill-current" strokeWidth={1} />
                <span className="text-xs font-bold uppercase text-[#333]">Limited Drops</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
