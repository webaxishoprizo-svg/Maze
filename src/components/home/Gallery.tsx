import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
const galleryModel = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800";
const productShoes = "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800";
const productClutch = "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800";
const galleryBag = "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800";

const galleryItems = [
  {
    id: 1,
    image: galleryModel,
    title: "Turtleneck Dress",
    category: "Dresses",
    size: "large",
  },
  {
    id: 2,
    image: productShoes,
    title: "Ballet Flats",
    category: "Shoes",
    size: "small",
  },
  {
    id: 3,
    image: productClutch,
    title: "Leather Clutch",
    category: "Accessories",
    size: "small",
  },
  {
    id: 4,
    image: galleryBag,
    title: "Soft Tote",
    category: "Bags",
    size: "medium",
  },
];

// Ultra-luxury easing curves
const easeEditorial: [number, number, number, number] = [0.4, 0, 0, 1];
const easeSilk: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-28 lg:py-36">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header - Editorial reveal */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: easeSilk }
              } : {}}
              className="flex items-center gap-3 mb-4"
            >
              <span className="text-overline uppercase tracking-luxury text-muted-foreground">
                2024.MAANCE
              </span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? {
                  y: 0,
                  opacity: 1,
                  transition: {
                    y: { duration: 0.9, ease: easeEditorial, delay: 0.1 },
                    opacity: { duration: 0.6, ease: easeSilk, delay: 0.1 }
                  }
                } : {}}
                className="text-display font-serif italic"
              >
                Gallery
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.3, ease: easeSilk }
            } : {}}
            className="mt-6 lg:mt-0"
          >
            <Link
              to="/collection"
              className="btn-couture inline-flex items-center justify-center"
            >
              <span>View All</span>
            </Link>
          </motion.div>
        </div>

        {/* Gallery Grid - Magazine spread layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Large Item - Featured with depth layering */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, ease: easeSilk }
            } : {}}
            className="col-span-2 row-span-2"
          >
            <Link
              to={`/product/${galleryItems[0].id}`}
              className="group block relative aspect-square overflow-hidden bg-secondary"
            >
              <motion.img
                src={galleryItems[0].image}
                alt={galleryItems[0].title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.9, ease: easeSilk }}
              />
              <motion.div
                className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5"
                transition={{ duration: 0.6, ease: easeSilk }}
              />
              {/* Text overlay reveals through mask on hover */}
              <motion.div
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 12 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeSilk }}
              >
                <p className="text-overline text-background/70 uppercase tracking-luxury mb-1">
                  {galleryItems[0].category}
                </p>
                <h3 className="text-subheading font-serif text-background">
                  {galleryItems[0].title}
                </h3>
              </motion.div>
            </Link>
          </motion.div>

          {/* Small Items - Staggered editorial entrance */}
          {galleryItems.slice(1).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.15 + (index * 0.12),
                  ease: easeSilk
                }
              } : {}}
              className="col-span-1"
            >
              <Link
                to={`/product/${item.id}`}
                className="group block relative aspect-square overflow-hidden bg-secondary"
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.9, ease: easeSilk }}
                />
                <motion.div
                  className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5"
                  transition={{ duration: 0.6, ease: easeSilk }}
                />
              </Link>
              <motion.div
                className="mt-3"
                initial={{ opacity: 0 }}
                animate={isInView ? {
                  opacity: 1,
                  transition: { duration: 0.6, delay: 0.3 + (index * 0.12), ease: easeSilk }
                } : {}}
              >
                <p className="text-[10px] text-muted-foreground uppercase tracking-luxury">
                  {item.category}
                </p>
                <h3 className="text-body-sm font-medium mt-1">{item.title}</h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
