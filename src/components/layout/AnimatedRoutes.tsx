import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Collection from "@/pages/Collection";
import Product from "@/pages/Product";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Search from "@/pages/Search";
import Wishlist from "@/pages/Wishlist";
import NotFound from "@/pages/NotFound";
import Bags from "@/pages/categories/Bags";
import Dresses from "@/pages/categories/Dresses";
import Jackets from "@/pages/categories/Jackets";
import Knitwear from "@/pages/categories/Knitwear";
import Accessories from "@/pages/categories/Accessories";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/collection"
          element={
            <PageTransition>
              <Collection />
            </PageTransition>
          }
        />
        <Route
          path="/bags"
          element={
            <PageTransition>
              <Bags />
            </PageTransition>
          }
        />
        <Route
          path="/dresses"
          element={
            <PageTransition>
              <Dresses />
            </PageTransition>
          }
        />
        <Route
          path="/jackets"
          element={
            <PageTransition>
              <Jackets />
            </PageTransition>
          }
        />
        <Route
          path="/knitwear"
          element={
            <PageTransition>
              <Knitwear />
            </PageTransition>
          }
        />
        <Route
          path="/accessories"
          element={
            <PageTransition>
              <Accessories />
            </PageTransition>
          }
        />
        <Route
          path="/product/:handle"
          element={
            <PageTransition>
              <Product />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/blog"
          element={
            <PageTransition>
              <Blog />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/search"
          element={
            <PageTransition>
              <Search />
            </PageTransition>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PageTransition>
              <Wishlist />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
