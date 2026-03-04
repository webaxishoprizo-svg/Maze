import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      <section className="flex-1 flex items-center justify-center py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[120px] lg:text-[180px] font-serif text-foreground/10 block leading-none"
            >
              404
            </motion.span>
            <h1 className="text-display font-serif mb-4 -mt-8">Page Not Found</h1>
            <p className="text-body-lg text-muted-foreground mb-10">
              The page you're looking for doesn't exist or has been moved.
              Let us help you find your way back.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 btn-couture group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Return Home</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NotFound;
