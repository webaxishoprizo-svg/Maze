import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Heart, Minus, Plus, ChevronDown, ChevronUp, Truck, RotateCcw, Shield, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCart } from "@/store/cartStore";
import ProductCard from "@/components/ui/ProductCard";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { Product as ProductType } from "@/api/products";

const Product = () => {
  const { handle } = useParams();
  const { product, loading: productLoading, error: productError } = useProduct(handle || "");
  const { products: relatedProducts } = useProducts(3);
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

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
    });
  };

  const accordionItems = [
    { title: "Product Details", content: [product.description] },
    { title: "Shipping & Returns", content: ["Free shipping on orders over $200", "Express delivery: 2-3 days", "Free returns within 30 days"] },
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

              {/* Variant Selection */}
              {product.variants && product.variants.length > 1 && (
                <div className="mb-8">
                  <p className="text-body-sm uppercase tracking-luxury mb-3 font-bold">Options</p>
                  <div className="grid grid-cols-2 gap-3">
                    {product.variants.map((variant: any) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`py-3 border text-body-sm font-bold tracking-widest uppercase transition-all duration-300 ${selectedVariant?.id === variant.id ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"}`}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="flex gap-3 mb-8">
                <div className="flex items-center border border-border">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 hover:bg-secondary transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-body font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-4 hover:bg-secondary transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant || !selectedVariant.availableForSale}
                  className={`flex-1 btn-couture-filled ${(!selectedVariant || !selectedVariant.availableForSale) ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span>
                    {!selectedVariant?.availableForSale ? "Sold Out" : "Add to Cart"}
                  </span>
                </button>
                <button onClick={() => setIsWishlisted(!isWishlisted)} className="p-4 border border-border hover:border-foreground transition-colors">
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-foreground" : ""}`} />
                </button>
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
