import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ui/ProductCard";
import { useRef } from "react";
import { useNewArrivals } from "@/hooks/useProducts";

const NewArrivals = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const { products, loading } = useNewArrivals(4);

    const staggerDelay = 0.1;

    return (
        <section ref={sectionRef} className="py-16 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Editorial Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="flex-1"
                    >
                        <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground block mb-4">
                            Seasonal Drop
                        </span>
                        <h2 className="text-heading">
                            Fresh <span className="font-serif">Arrivals</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-start md:items-end gap-6"
                    >
                        <p className="text-body text-muted-foreground max-w-[360px] md:text-right">
                            Discover the latest silhouettes and textures meticulously crafted for the modern curated wardrobe.
                        </p>
                        <Link
                            to="/new-arrivals"
                            className="inline-flex items-center gap-3 text-[12px] uppercase tracking-widest font-bold group"
                        >
                            <span className="border-b border-foreground/20 pb-1 group-hover:border-foreground transition-colors">
                                Explore The Drop
                            </span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>

                {/* Products Grid - Horizontal Scroll on Mobile, Grid on Desktop */}
                <div className="relative">
                    <div className="flex overflow-x-auto pb-8 lg:pb-0 lg:grid lg:grid-cols-4 gap-4 lg:gap-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="min-w-[180px] lg:min-w-0 space-y-4 animate-pulse">
                                    <div className="aspect-[3/4] bg-secondary/30 rounded-[4px]" />
                                    <div className="h-4 bg-secondary/30 w-2/3" />
                                    <div className="h-4 bg-secondary/30 w-1/3" />
                                </div>
                            ))
                        ) : (
                            products.map((p, index) => {
                                const mappedProduct = {
                                    id: p.id,
                                    variantId: p.variantId,
                                    name: p.title,
                                    price: Number(p.price),
                                    image: p.image,
                                    hoverImage: p.image,
                                    category: "New Arrival",
                                    handle: p.handle,
                                };
                                return (
                                    <motion.div
                                        key={p.id}
                                        className="min-w-[160px] lg:min-w-0 snap-center"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isInView ? {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 1,
                                                delay: 0.4 + (index * staggerDelay),
                                                ease: [0.22, 1, 0.36, 1]
                                            }
                                        } : {}}
                                    >
                                        <ProductCard {...mappedProduct} />
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </div>

                {!loading && products.length === 0 && (
                    <div className="text-center py-20 bg-secondary/10 rounded-[4px] border border-dashed border-foreground/5">
                        <p className="text-muted-foreground font-serif text-lg">
                            The workshop is refining new creations. Check back soon.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewArrivals;
