import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/ui/ProductCard";
import { useNewArrivals } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";
import { Product as ProductType } from "@/api/products";

const NewArrivalsPage = () => {
  const { products, loading, error } = useNewArrivals(20);

  useEffect(() => {
    document.title = "New Arrivals | Maze";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen flex flex-col pt-24 bg-background">
      <Header />
      <CartDrawer />

      <div className="container mx-auto px-6 lg:px-12 flex-1 mb-24">
        <div className="mb-12">
          <h1 className="text-display font-bold uppercase tracking-tight mb-4 text-center">
            New Arrivals
          </h1>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto text-center">
            Discover our latest drops, fetched directly from the workshop.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-foreground" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-32">
            <p className="text-destructive">Failed to load new arrivals: {error}</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((p: ProductType) => {
              const mappedProduct = {
                id: p.id,
                variantId: p.variantId,
                name: p.title,
                price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
                image: p.image,
                hoverImage: p.image,
                category: "New Arrival",
                handle: p.handle,
              };
              return <ProductCard key={p.id} {...mappedProduct} />;
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center py-32 bg-secondary/20 rounded-lg">
            <p className="font-serif text-lg text-muted-foreground">
              No new arrivals at the moment. Check back soon.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default NewArrivalsPage;
