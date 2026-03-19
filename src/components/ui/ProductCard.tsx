import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { useCart } from "@/store/cartStore";
import { useRef } from "react";
import { Magnetic } from "./Magnetic";

// Ultra-luxury easing curves
const easeSilk: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeVelvet: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ProductCardProps {
  id: string;
  variantId?: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  category: string;
  handle?: string;
  isNew?: boolean;
  isSale?: boolean;
  originalPrice?: number;
  currency?: string;
}

const ProductCard = ({
  id,
  variantId,
  name,
  price,
  image,
  hoverImage,
  category,
  handle,
  isNew,
  isSale,
  originalPrice,
  currency = "₹",
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={cardRef}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={isInView ? {
        opacity: 1,
        transition: { duration: 0.8, ease: easeSilk }
      } : {}}
    >
      {/* Image Container - Editorial hover with micro-depth */}
      <motion.div
        animate={{
          y: isHovered ? -6 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: easeVelvet
        }}
      >
        <Link
          to={`/product/${handle || id}`}
          className="block relative overflow-hidden bg-secondary aspect-[3/4]"
          style={{
            borderRadius: '6px',
            boxShadow: isHovered
              ? "var(--shadow-card-3d-hover)"
              : "var(--shadow-card-3d)",
            transition: "box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Shimmer Loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-muted to-secondary animate-shimmer bg-[length:200%_100%]" />
          )}

          {/* Main Image - Subtle scale, no aggressive movement */}
          <motion.img
            src={image}
            alt={name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            animate={{
              opacity: imageLoaded ? (isHovered && hoverImage ? 0 : 1) : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              duration: 0.8,
              ease: easeSilk
            }}
          />

          {/* Hover Image - Mask reveal style */}
          {hoverImage && (
            <motion.img
              src={hoverImage}
              alt={`${name} alternate view`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{
                duration: 0.8,
                ease: easeSilk
              }}
            />
          )}

          {/* Badges - Calm entrance */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            <AnimatePresence>
              {isNew && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, ease: easeSilk }}
                  className="px-2 py-1 bg-[#222] text-white text-[10px] uppercase font-bold tracking-widest"
                >
                  NEW
                </motion.span>
              )}
              {isSale && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, ease: easeSilk, delay: 0.1 }}
                  className="px-2 py-1 bg-[#222] text-white text-[10px] uppercase font-bold tracking-widest"
                >
                  BESTSELLER
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 12,
            }}
            transition={{
              duration: 0.5,
              delay: isHovered ? 0.1 : 0,
              ease: easeVelvet
            }}
            className="absolute bottom-3 right-3 z-10"
          >
            <Magnetic>
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  addItem({ id: variantId || id, name, price, image });
                }}
                className="w-10 h-10 bg-[#111] text-white flex items-center justify-center transition-all hover:bg-black rounded-[6px] shadow-[0_3px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-none"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </Magnetic>
          </motion.div>
        </Link>
      </motion.div>

      {/* Product Info */}
      <div className="mt-4 flex items-start justify-between">
        <div className="space-y-1">
          <Link to={`/product/${handle || id}`}>
            <motion.h3
              className="text-sm font-bold text-[#111] hover:text-[#666] transition-colors"
              initial={{ opacity: 0, y: 4 }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.3, ease: easeSilk }
              } : {}}
            >
              {name}
            </motion.h3>
          </Link>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 4 }}
            animate={isInView ? {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.4, ease: easeSilk }
            } : {}}
          >
            {originalPrice && (
              <span className="text-sm text-[#999] line-through font-medium">
                {currency}{originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-sm font-bold text-[#111]">
              {currency}{price.toLocaleString()}
            </span>
          </motion.div>
        </div>

        {/* Color swatches mockup */}
        <div className="flex items-center gap-1.5 mt-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#d5d5d5]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#8c8479]" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
