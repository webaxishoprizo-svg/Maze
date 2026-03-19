import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import ProductCard from "./ProductCard";

const RECENTLY_VIEWED_KEY = "maze_recently_viewed";

export const RecentlyViewedSection = ({ excludeHandle }: { excludeHandle?: string }) => {
    const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
        if (saved) {
            try {
                let list = JSON.parse(saved);
                if (excludeHandle) {
                    list = list.filter((p: any) => p.handle !== excludeHandle);
                }
                setRecentlyViewed(list.slice(0, 4));
            } catch (e) {
                console.error("Failed to parse recently viewed", e);
            }
        }
    }, [excludeHandle]);

    if (recentlyViewed.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                    <div className="flex-1">
                        <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground block mb-4">
                            History
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight flex items-center gap-6">
                            Recently <span className="italic">Viewed</span>
                            <Eye className="w-8 h-8 opacity-20" />
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {recentlyViewed.map((p: any, index: number) => {
                        const mappedProduct = {
                            id: p.id,
                            variantId: p.variantId,
                            name: p.title,
                            price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
                            image: p.image,
                            hoverImage: p.image,
                            category: "History",
                            handle: p.handle,
                        };
                        return (
                            <motion.div 
                                key={p.id} 
                                initial={{ opacity: 0, y: 20 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard {...mappedProduct} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
