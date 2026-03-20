import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/store/cartStore";


// Ultra-luxury easing curves
const easeSilk: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeVelvet: [number, number, number, number] = [0.16, 1, 0.3, 1];

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/collection" },
  { name: "NEW ARRIVAL", href: "/new-arrivals" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

const categoryLinks = [
  { name: "Rail", href: "/collection/rail" },
  { name: "Train", href: "/collection/train" },
  { name: "Lift", href: "/collection/lift" },
  { name: "Jogger", href: "/collection/jogger" },
  { name: "Essentials", href: "/collection/essentials" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const { cartCount, toggleCart } = useCart();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAccountMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0,
          opacity: 1 
        }}
        transition={{ duration: 0.6, ease: easeSilk }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || location.pathname !== '/'
          ? "bg-background/98 backdrop-blur-md shadow-soft py-2"
          : "bg-transparent py-2 lg:py-4"
          }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:opacity-60 transition-opacity duration-300"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: easeSilk }}
              >
                <Link to="/" className="block" onClick={scrollToTop}>
                  <img src="/logo.png" alt="Maze" className="h-10 lg:h-16 w-auto object-contain dark:invert" />
                </Link>
              </motion.div>
            </div>

            {/* Center Navigation - Desktop with editorial hover */}
            <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2 lg:gap-8 xl:gap-12">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 * (index + 1),
                    duration: 0.6,
                    ease: easeSilk
                  }}
                >
                  <Link
                    to={link.href}
                    onClick={scrollToTop}
                    className="text-[13px] font-bold text-foreground hover:text-foreground/70 transition-colors uppercase"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right Icons - Micro-interactions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: easeSilk }}
              className="flex items-center gap-2 lg:gap-6"
            >
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1 text-foreground hover:text-foreground/70 transition-colors duration-300"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <div className="relative group">
                <a
                  href="https://shopify.com/64024543307/account"
                  className="p-1 text-foreground hover:text-foreground/70 transition-colors duration-300 block"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </a>

                {/* Dropdown for detailed links */}
                 <div className="hidden lg:group-hover:block absolute right-0 mt-2 w-48 bg-background border border-border shadow-elevated py-2 z-50">
                   <a href="https://shopify.com/64024543307/account/login?return_url=https://themaze.shop" className="block px-4 py-2 text-xs hover:bg-secondary transition-colors font-medium uppercase">Sign In</a>
                   <a href="https://shopify.com/64024543307/account/orders" className="block px-4 py-2 text-xs hover:bg-secondary transition-colors font-medium uppercase border-t border-border mt-2 pt-2">My Orders</a>
                   <a href="https://shopify.com/64024543307/account/logout" className="block px-4 py-2 text-xs hover:bg-secondary transition-colors font-medium uppercase text-destructive">Sign Out</a>
                </div>
              </div>

              <motion.button
                onClick={toggleCart}
                className="p-1 text-foreground hover:text-foreground/70 transition-colors duration-300 relative"
                whileHover={{ y: -1 }}
                whileTap={{ y: 1 }}
                transition={{ duration: 0.2, ease: easeVelvet }}
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: easeSilk }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[9px] font-medium flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Search Overlay & Mobile Menu ... (omitted for brevity in replace, but I'll write full file below) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeSilk }}
            className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-sm"
          >
            <div className="container mx-auto px-6 pt-40">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: easeSilk }}
                className="max-w-2xl mx-auto"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    autoFocus
                    className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-foreground py-4 text-display font-bold outline-none placeholder:text-foreground/20"
                  />
                  <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-foreground/30" />
                </div>
              </motion.div>
            </div>
            <motion.button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 p-2"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: easeSilk }}
              className="fixed left-0 top-0 bottom-0 z-[70] w-[85%] max-w-sm bg-background shadow-elevated lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <Link to="/" onClick={scrollToTop}>
                    <img src="/logo.png" alt="Maze" className="h-10 w-auto object-contain dark:invert" />
                  </Link>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X className="w-5 h-5" /></button>
                </div>
                <nav className="flex-1 overflow-y-auto py-8 px-6">
                  {navLinks.map((link) => (
                    <Link key={link.name} to={link.href} onClick={scrollToTop} className="block py-4 text-heading font-bold border-b border-border/50 uppercase">{link.name}</Link>
                  ))}
                  <Link to="/wishlist" onClick={scrollToTop} className="block py-4 text-heading font-bold border-b border-border/50 uppercase">Wishlist</Link>
                  <div className="mt-8">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold mb-4">Account</p>
                    <a href="https://shopify.com/64024543307/account" className="block py-3 text-body">My Account</a>
                    <a href="https://shopify.com/64024543307/account/login?return_url=https://themaze.shop" className="block py-3 text-body">Sign In</a>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
