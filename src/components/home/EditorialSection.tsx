import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const EditorialSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative mt-6">
      {/* Banner Area */}
      <div className="relative min-h-[420px] md:h-[450px] lg:h-[550px] bg-[#111] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/lifestyle_baggy.png"
            alt="Maze baggy track pants lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute inset-y-0 right-0 w-2/3 lg:w-1/2 bg-gradient-to-l from-black/90 via-black/80 to-transparent" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 h-full flex flex-col justify-center items-center lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-center lg:text-right"
          >
            <h3 className="text-white/80 font-serif font-bold uppercase tracking-[0.3em] mb-4 text-sm md:text-base">
              Engineered For
            </h3>
            <h2 className="text-fluid-h1 font-serif font-black text-white uppercase tracking-widest mb-6 leading-tight">
              Strength & Style
            </h2>
            <div className="h-0.5 bg-[#c19864] w-24 mb-8 ml-auto lg:ml-0" />
            <p className="text-fluid-body text-white/90 font-serif font-medium tracking-wide mb-10">
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


    </section>
  );
};

export default EditorialSection;
