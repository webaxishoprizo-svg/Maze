import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[75vh] pt-28 pb-24 lg:pb-40 flex items-center overflow-hidden bg-white">
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

      <div className="container mx-auto px-6 pr-12 lg:px-12 relative z-20 mt-16 lg:mt-0">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-heading">
              THE MAZE
            </h2>
            <h1 className="text-display mb-6">
              PERFORMANCE
            </h1>
            <p className="text-body mb-10">
              Engineered Track Pants & Luxury Activewear redefined.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <Link
                to="/collection"
                className="btn-couture-filled min-w-[240px]"
              >
                <span>Shop Now</span>
                <span className="ml-4">→</span>
              </Link>
              <Link 
                to="/collection" 
                className="text-button-secondary"
              >
                Shop MAZE Track Pant
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#c19864]" strokeWidth={2.5} />
                <span className="text-body-sm font-bold uppercase text-[#333]">Premium Fabric</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#c19864]" strokeWidth={2.5} />
                <span className="text-body-sm font-bold uppercase text-[#333]">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#c19864] fill-current" strokeWidth={1} />
                <span className="text-body-sm font-bold uppercase text-[#333]">Limited Drops</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
