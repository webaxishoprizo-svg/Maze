import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, ChevronDown, ChevronUp, Truck, RotateCcw, Shield, Loader2, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/store/cartStore";
import ProductCard from "@/components/ui/ProductCard";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { Product as ProductType } from "@/api/products";
import { storefrontClient } from "@/lib/storefront";
import { CART_CREATE_MUTATION } from "@/lib/queries";

const Product = () => {
  const { handle } = useParams();
  const { product, loading: productLoading, error: productError } = useProduct(handle || "");
  const { products: relatedProducts } = useProducts(3);
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

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
        <h2 className="text-display font-serif text-center">Product Not Found</h2>
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
    black: "#121212",
    white: "#FFFFFF",
    grey: "#8e8e8e",
    gray: "#8e8e8e",
    brown: "#5C4033",
    beige: "#F5F5DC",
    navy: "#000080",
    blue: "#0000FF",
    red: "#FF0000",
    gold: "#C6A75E",
  };

  const accordionItems = [
    { title: "Product Details", content: [product.description] },
    { title: "Shipping & Returns", content: ["Free shipping on orders over ₹200", "Express delivery: 2-3 days", "Free returns within 30 days"] },
    { title: "Care Instructions", content: ["Machine wash cold", "Store in a cool dry place"] },
  ];

  return (
    <main className="min-h-screen">
      <Header />
      <CartDrawer />

      {/* Breadcrumb */}
      <div className="pt-28 pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-caption text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/collection" className="hover:text-foreground transition-colors">Collection</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>
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
              className="space-y-4"
            >
              <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={images[selectedImage] || product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-secondary overflow-hidden transition-all duration-300 ${selectedImage === index ? "ring-2 ring-foreground" : "opacity-60 hover:opacity-100"
                        }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <h1 className="text-display font-serif mb-4 uppercase">{product.title}</h1>
              <p className="text-heading font-serif mb-6">{currency} {parseFloat(price as string).toLocaleString()}</p>
              <p className="text-body text-muted-foreground mb-8">{product.description}</p>

              {/* Product Options Redesign */}
              <div className="space-y-8 mb-8">
                {product.options?.filter((opt: any) => opt.name !== "Title").map((option: any) => {
                  const isColor = option.name.toLowerCase() === "color";
                  const isSize = option.name.toLowerCase() === "size";

                  if (isColor) {
                    return (
                      <div key={option.name} className="space-y-4">
                        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-foreground">
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
                        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-foreground">
                          {option.name}
                        </p>
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
                      <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-foreground">
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
                  <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-foreground">
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
                    <button
                      onClick={handleAddToCart}
                      disabled={!selectedVariant || !selectedVariant.availableForSale}
                      className="flex-[3] h-14 bg-foreground text-background rounded-xl text-xs font-bold uppercase tracking-widest shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group active:translate-y-0"
                    >
                      <span>
                        {!selectedVariant?.availableForSale ? "Sold Out" : "Add to Cart"}
                      </span>
                    </button>

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
                    className="w-full h-14 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                             bg-gradient-to-r from-[#F5D17E] via-[#C6A75E] to-[#B38B3F] text-white
                             shadow-[0_8px_20px_rgba(198,167,94,0.3)] hover:shadow-[0_12px_28px_rgba(198,167,94,0.4)] 
                             hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
                  >
                    <span>Buy it Now</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border mb-8">
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">30-Day Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Authenticity</p>
                </div>
              </div>

              {/* Accordion */}
              <div className="space-y-0">
                {accordionItems.map((item, index) => (
                  <div key={index} className="border-b border-border">
                    <button onClick={() => setOpenAccordion(openAccordion === index ? null : index)} className="w-full flex items-center justify-between py-4 text-left">
                      <span className="text-body-sm font-bold uppercase tracking-widest">{item.title}</span>
                      {openAccordion === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <AnimatePresence>
                      {openAccordion === index && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div className="pb-4 space-y-2">
                            {item.content.map((line, i) => (
                              <p key={i} className="text-body-sm text-muted-foreground leading-relaxed">{line}</p>
                            ))}
                          </div>
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

      {/* Related Products */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-display font-serif text-center mb-16 uppercase">
            You May Also Like
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {relatedProducts.map((p: ProductType, index: number) => {
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

      <Footer />
    </main>
  );
};

export default Product;
