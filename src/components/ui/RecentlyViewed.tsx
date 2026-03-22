import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product as ProductType } from "@/api/products";

const RECENTLY_VIEWED_KEY = "maze_recently_viewed";

interface HistoryItem extends Omit<ProductType, 'price'> {
    name: string;
    category: string;
    price: number;
}

export const RecentlyViewedSection = ({ excludeHandle }: { excludeHandle?: string }) => {
    const [recentlyViewed, setRecentlyViewed] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(RECENTLY_VIEWED_KEY);
        if (saved) {
            try {
                let list = JSON.parse(saved);
                if (excludeHandle) {
                    list = list.filter((p: { handle: string }) => p.handle !== excludeHandle);
                }

                const mapped: HistoryItem[] = list.map((p: any) => ({
                    ...p,
                    name: p.title || p.name,
                    price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
                    category: "Viewed History"
                }));

                setRecentlyViewed(mapped.slice(0, 4));
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
                        <h2 className="text-heading flex items-center gap-6">
                            Recently <span className="font-serif">Viewed</span>
                            <Eye className="w-8 h-8 opacity-20" />
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {recentlyViewed.map((p, index) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard {...p} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
