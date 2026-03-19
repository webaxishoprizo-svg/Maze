import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  author: string;
  text: string;
  rating?: string | number;
}

interface TestimonialsProps {
  data: string | any[]; // either JSON string from product metafield or Metaobject array
}

const Testimonials = ({ data }: TestimonialsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [items, itemsSet] = useState<Testimonial[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    let parsedItems: Testimonial[] = [];

    if (typeof data === "string" && data.trim()) {
      try {
        parsedItems = JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse testimonials JSON", e);
      }
    } else if (Array.isArray(data)) {
      parsedItems = data;
    }
    itemsSet(parsedItems);
  }, [data]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [items, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  if (!items.length) return null;

  return (
    <section className="py-24 bg-[#FAF9F6] border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground font-bold mb-3 block">
            Reviews
          </span>
          <h2 className="text-3xl lg:text-5xl font-sans font-medium text-foreground tracking-tight">
            What They Say
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" ref={emblaRef}>
          <div className="flex cursor-grab active:cursor-grabbing touch-pan-y">
            {items.map((item, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_80%] px-4 md:px-8">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-border/30 text-center mx-auto h-full flex flex-col justify-center">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: Number(item.rating) || 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-foreground text-foreground" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl font-sans text-foreground/90 leading-relaxed mb-8">
                    "{item.text}"
                  </p>
                  <p className="text-[13px] uppercase tracking-widest font-bold text-foreground">
                    — {item.author || "Verified Customer"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {items.length > 1 && (
            <div className="flex justify-center gap-3 mt-12">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    selectedIndex === idx ? "bg-foreground scale-110" : "bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
