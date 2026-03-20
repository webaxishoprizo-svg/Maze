import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, ChevronDown, ChevronUp, Truck, RotateCcw, Shield, Loader2, Check, Ruler, Eye, Wind, Zap, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/store/cartStore";
import ProductCard from "@/components/ui/ProductCard";
import Testimonials from "@/components/ui/Testimonials";
import { useProduct } from "@/hooks/useProduct";
import { useProductRecommendations, useProducts } from "@/hooks/useProducts";
import { Product as ProductType } from "@/api/products";
import { storefrontClient } from "@/lib/storefront";
import { CART_CREATE_MUTATION } from "@/lib/queries";
import useEmblaCarousel from "embla-carousel-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { RecentlyViewedSection } from "@/components/ui/RecentlyViewed";

const Product = () => {
  const { handle } = useParams();
  const { product, loading: productLoading, error: productError } = useProduct(handle || "");
  
  // Use native Shopify Product Recommendations API
  const { products: relatedProducts } = useProductRecommendations(product?.id || "");
  const { addItem } = useCart();

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  // Memory for local History (Used only for saving to Storage)
  const RECENTLY_VIEWED_KEY = "maze_recently_viewed";
  const [showStickyBar, setShowStickyBar] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [product?.images, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  // Recently Viewed Logic
  useEffect(() => {
    if (product) {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      let list = stored ? JSON.parse(stored) : [];
      
      // Filter out current product and keep last 5
      const cleanedList = list.filter((p: any) => p.handle !== product.handle);
      cleanedList.unshift({
        id: product.id,
        variantId: product.variantId,
        title: product.title,
        handle: product.handle,
        image: product.image,
        price: product.price
      });
      
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(cleanedList.slice(0, 5)));
    }
  }, [product]);

  // Sticky Bar Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const atcButton = document.getElementById('main-atc-button');
      if (atcButton) {
        const rect = atcButton.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      const defaultVariant = product.variants[0];
      setSelectedVariant(defaultVariant);

      // Initialize selected options from the first variant
      if (defaultVariant.selectedOptions) {
        const initialOptions: Record<string, string> = {};
        defaultVariant.selectedOptions.forEach((opt: any) => {
          initialOptions[opt.name] = opt.value;
        });
        setSelectedOptions(initialOptions);
      }
    }
  }, [product]);

  // Update selected variant when options change
  useEffect(() => {
    if (product?.variants && Object.keys(selectedOptions).length > 0) {
      const variant = product.variants.find((v: any) =>
        v.selectedOptions.every((opt: any) => selectedOptions[opt.name] === opt.value)
      );
      if (variant) {
        setSelectedVariant(variant);
      }
    }
  }, [selectedOptions, product?.variants]);

  if (productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-foreground" />
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-display font-bold text-center">Product Not Found</h2>
        <Link to="/collection" className="btn-couture-filled">
          <span>Back to Collection</span>
        </Link>
      </div>
    );
  }

  const images = product.images || [];
  const price = selectedVariant?.price.amount || product.price;
  const currency = selectedVariant?.price.currencyCode || product.currencyCode;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      id: selectedVariant.id,
      name: product.title,
      price: parseFloat(price as string),
      image: images[0] || product.image,
      size: selectedVariant.title !== "Default Title" ? selectedVariant.title : undefined,
    }, quantity);
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    try {
      const response = await storefrontClient.request<any>(CART_CREATE_MUTATION, {
        input: {
          lines: [{ merchandiseId: selectedVariant.id, quantity }]
        }
      });
      if (response.cartCreate?.cart?.checkoutUrl) {
        window.location.href = response.cartCreate.cart.checkoutUrl;
      }
    } catch (error) {
      console.error("Buy Now Error:", error);
    }
  };

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [name]: value }));
  };

  const colorMap: Record<string, string> = {
    gold: "#C6A75E",
  };

  const isLowStock = selectedVariant && selectedVariant.availableForSale && !selectedVariant.inventoryQuantity; // Fallback logic if inventoryQuantity isn't fetched, otherwise just check value if available

  const accordionItems = [
    { 
      title: "Product Details", 
      contentHtml: product.descriptionHtml || `<p>${product.description}</p>` 
    }
  ];

  if (product.fabricMetafield) {
    accordionItems.push({
      title: "Fabric & Fit",
      contentHtml: product.fabricMetafield
    });
  }

  if (product.shippingMetafield) {
    accordionItems.push({
      title: "Shipping & Returns",
      contentHtml: product.shippingMetafield
    });
  }

  if (product.careMetafield) {
    accordionItems.push({
      title: "Care Instructions",
      contentHtml: product.careMetafield
    });
  }

  return (
    <main className="min-h-screen">
      <Header />
      <CartDrawer />

      {/* Back Button */}
      <div className="pt-28 pb-6 md:pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          <Link 
            to="/collection"
            className="inline-flex items-center gap-2 text-caption text-muted-foreground hover:text-foreground transition-colors group px-4 py-2 bg-secondary/50 rounded-full border border-border/40 hover:bg-secondary"
          >
            <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
            <span className="font-bold uppercase tracking-widest text-[10px]">Back</span>
          </Link>
        </div>
      </div>

      {/* Product Section */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <div className="relative overflow-hidden bg-secondary w-full touch-pan-y group" ref={emblaRef}>
                <div className="flex cursor-grab active:cursor-grabbing">
                  {images.length > 0 ? (
                    images.map((img: string, idx: number) => (
                      <div className="flex-[0_0_100%] min-w-0 relative aspect-[3/4]" key={idx}>
                        <img
                          src={img}
                          alt={`${product.title} ${idx + 1}`}
                          className="w-full h-full object-cover select-none pointer-events-none"
                          draggable={false}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex-[0_0_100%] min-w-0 relative aspect-[3/4]">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover select-none pointer-events-none" 
                        draggable={false} 
                      />
                    </div>
                  )}
                </div>

                {/* Dot Indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                    {images.map((_: any, idx: number) => (
                      <div 
                        key={idx} 
                        className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${selectedIndex === idx ? "bg-foreground scale-110" : "bg-foreground/30"}`} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <h1 className="text-display font-bold mb-4 uppercase">{product.title}</h1>

              {/* Highlights / Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.slice(0, 4).map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-secondary text-secondary-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-border/50">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-heading font-bold mb-6">
                {currency === "INR" ? "₹" : currency} {parseFloat(price as string).toLocaleString()}
              </p>
              <p className="text-body text-muted-foreground mb-8">{product.description}</p>

              {/* Fabric Highlights - Perfect for Track Pants */}
              <div className="flex gap-6 mb-10 pb-8 border-b border-border/50">
                 <div className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                       <Wind className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-widest">Breathable</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                       <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-widest">4-Way Stretch</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-widest">Durability</span>
                 </div>
              </div>

              {/* Product Options Redesign */}
              <div className="space-y-8 mb-8">
                {product.options?.filter((opt: any) => opt.name !== "Title").map((option: any) => {
                  const isColor = option.name.toLowerCase() === "color";
                  const isSize = option.name.toLowerCase() === "size";

                  if (isColor) {
                    return (
                      <div key={option.name} className="space-y-4">
                        <p className="text-[11px] uppercase font-bold text-foreground">
                          {option.name}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          {option.values.map((value: string) => {
                            const isSelected = selectedOptions[option.name] === value;
                            const colorHex = colorMap[value.toLowerCase()] || value.toLowerCase();
                            return (
                              <button
                                key={value}
                                onClick={() => handleOptionChange(option.name, value)}
                                className={`group relative w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center shadow-[2px_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[4px_8px_16px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 ${isSelected ? "ring-2 ring-offset-2 ring-foreground" : "ring-1 ring-border"}`}
                                style={{ backgroundColor: colorHex }}
                                title={value}
                              >
                                {isSelected && (
                                  <Check className={`w-5 h-5 ${value.toLowerCase() === 'white' ? 'text-black' : 'text-white'}`} />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  if (isSize) {
                    return (
                      <div key={option.name} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] uppercase font-bold text-foreground">
                            {option.name}
                          </p>
                          {isSize && product.sizeChartMetafield && (
                            <button 
                              onClick={() => setIsSizeChartOpen(true)}
                              className="text-[10px] uppercase font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                            >
                              <Ruler className="w-3 h-3" />
                              Size Guide
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                          {option.values.map((value: string) => {
                            const isSelected = selectedOptions[option.name] === value;
                            return (
                              <button
                                key={value}
                                onClick={() => handleOptionChange(option.name, value)}
                                className={`h-14 flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 ${isSelected ? "bg-foreground text-background" : "bg-background text-foreground border border-border"}`}
                              >
                                {value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={option.name} className="space-y-4">
                      <p className="text-[11px] uppercase font-bold text-foreground">
                        {option.name}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {option.values.map((value: string) => {
                          const isSelected = selectedOptions[option.name] === value;
                          return (
                            <button
                              key={value}
                              onClick={() => handleOptionChange(option.name, value)}
                              className={`px-6 py-3 rounded-xl text-xs font-bold border transition-all duration-300 ${isSelected ? "bg-foreground text-background border-foreground shadow-[2px_4px_12px_rgba(0,0,0,0.1)]" : "bg-background text-foreground border-border hover:border-foreground"}`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Options / Purchase Area */}
                <div className="space-y-4 pt-4">
                  <p className="text-[11px] uppercase font-bold text-foreground">
                    Options
                  </p>
                  <div className="flex flex-wrap sm:flex-nowrap gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-[#F8F8F8] rounded-xl p-1 h-14 w-full sm:w-auto shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="flex-1 sm:w-12 text-center text-sm font-bold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <div className="flex-[3]">
                      <Magnetic>
                        <button
                          id="main-atc-button"
                          onClick={handleAddToCart}
                          disabled={!selectedVariant || !selectedVariant.availableForSale}
                          className="w-full h-14 bg-foreground text-background rounded-xl text-xs font-bold uppercase shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group active:translate-y-0"
                        >
                          <span>
                            {!selectedVariant?.availableForSale ? "Sold Out" : "Add to Cart"}
                          </span>
                        </button>
                      </Magnetic>
                    </div>

                    {/* Inventory Urgency - Simulated for D2C experience */}
                    {selectedVariant?.availableForSale && (
                      <div className="mt-2 flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                         <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">
                           Selling Fast! Low stock in this size.
                         </span>
                      </div>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="w-14 h-14 flex items-center justify-center bg-[#F8F8F8] rounded-xl border border-transparent hover:border-border hover:bg-white hover:shadow-md transition-all duration-300 group active:scale-95"
                    >
                      <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? "fill-foreground text-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
                    </button>
                  </div>

                  {/* Buy It Now */}
                  <button
                    onClick={handleBuyNow}
                    disabled={!selectedVariant || !selectedVariant.availableForSale}
                    className="w-full h-14 rounded-xl text-xs font-bold uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                             bg-gradient-to-r from-[#F5D17E] via-[#C6A75E] to-[#B38B3F] text-white
                             shadow-[0_8px_20px_rgba(198,167,94,0.3)] hover:shadow-[0_12px_28px_rgba(198,167,94,0.4)] 
                             hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
                  >
                    <span>
                      {!selectedVariant?.availableForSale ? "Sold Out" : "Buy it Now"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border mb-8">
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">No Returns Available</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Authenticity</p>
                </div>
              </div>

              {/* Accordion */}
              <div className="space-y-0">
                {accordionItems.map((item, index) => (
                  <div key={index} className="border-b border-border">
                    <button onClick={() => setOpenAccordion(openAccordion === index ? null : index)} className="w-full flex items-center justify-between py-4 text-left">
                      <span className="text-body-sm font-bold uppercase">{item.title}</span>
                      {openAccordion === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                      {openAccordion === index && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div 
                            className="pb-4 space-y-2 text-body-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none prose-p:text-muted-foreground prose-li:text-muted-foreground" 
                            dangerouslySetInnerHTML={{ __html: item.contentHtml }} 
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Reviews / Testimonials */}
      <Testimonials data={product.testimonialsMetafield || ""} />

      {/* Related Products - Fetching natively from Shopify Recommendations */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-display font-bold text-center mb-16 uppercase">
              Complete The Look
            </motion.h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.slice(0, 4).map((p: ProductType, index: number) => {
              const mappedProduct = {
                id: p.id,
                variantId: p.variantId,
                name: p.title,
                price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
                image: p.image,
                hoverImage: p.image,
                category: "Bestseller",
                handle: p.handle,
              };
              return (
                <motion.div key={p.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <ProductCard {...mappedProduct} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Recently Viewed */}
      <RecentlyViewedSection excludeHandle={handle} />

      {/* Size Chart Modal */}
      <AnimatePresence>
        {isSizeChartOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <div className="p-8">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold uppercase flex items-center gap-2">
                       <Ruler className="w-6 h-6" />
                       Size Guide
                    </h3>
                    <button onClick={() => setIsSizeChartOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-secondary rounded-full transition-colors">
                       <Plus className="w-6 h-6 rotate-45" />
                    </button>
                 </div>
                 <div 
                   className="prose prose-luxury max-w-none"
                   dangerouslySetInnerHTML={{ __html: product.sizeChartMetafield || "No size chart available." }}
                 />
                 <div className="mt-12 bg-secondary/50 p-6 rounded-xl">
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-2">Pro Tip:</p>
                    <p className="text-sm italic">"Our track pants are designed for a relaxed streetwear fit. If you prefer a slimmer look, we recommend sizing down."</p>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile Add to Cart Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-border px-6 py-4 flex items-center justify-between gap-4 lg:hidden shadow-[0_-8px_30px_rgb(0,0,0,0.12)]"
          >
            <div className="flex items-center gap-3 overflow-hidden">
               <div className="w-12 h-12 rounded-lg bg-secondary shrink-0 overflow-hidden">
                  <img src={images[0] || product.image} alt="" className="w-full h-full object-cover" />
               </div>
               <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold truncate tracking-tight">{product.title}</p>
                  <p className="text-xs font-black">{currency === "INR" ? "₹" : currency} {parseFloat(price as string).toLocaleString()}</p>
               </div>
            </div>
            <button 
              onClick={handleAddToCart}
              disabled={!selectedVariant || !selectedVariant.availableForSale}
              className="px-6 h-12 bg-foreground text-background rounded-xl text-[10px] font-bold uppercase whitespace-nowrap"
            >
              {!selectedVariant?.availableForSale ? "Sold Out" : "Buy Now"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default Product;
