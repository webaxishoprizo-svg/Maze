import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Index from "../../pages/Index";
import Collection from "../../pages/Collection";
import NewArrivalsPage from "../../pages/NewArrivalsPage";
import Product from "../../pages/Product";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import Search from "../../pages/Search";
import Wishlist from "../../pages/Wishlist";
import NotFound from "../../pages/NotFound";
import Bags from "../../pages/categories/Bags";
import Dresses from "../../pages/categories/Dresses";
import Jackets from "../../pages/categories/Jackets";
import Knitwear from "../../pages/categories/Knitwear";
import Accessories from "../../pages/categories/Accessories";
import ReturnPolicy from "../../pages/ReturnPolicy";
import PrivacyPolicy from "../../pages/PrivacyPolicy";
import TermsConditions from "../../pages/TermsConditions";
import Register from "../../pages/Register";
import TrackOrder from "../../pages/TrackOrder";
import Cookies from "../../pages/Cookies";
import Cart from "../../pages/Cart";

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
          path="/new-arrivals"
          element={
            <PageTransition>
              <NewArrivalsPage />
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
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />

        <Route
          path="/track-order"
          element={
            <PageTransition>
              <TrackOrder />
            </PageTransition>
          }
        />
        <Route
          path="/cookies"
          element={
            <PageTransition>
              <Cookies />
            </PageTransition>
          }
        />
        <Route
          path="/return-policy"
          element={
            <PageTransition>
              <ReturnPolicy />
            </PageTransition>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PageTransition>
              <PrivacyPolicy />
            </PageTransition>
          }
        />
        <Route
          path="/terms-conditions"
          element={
            <PageTransition>
              <TermsConditions />
            </PageTransition>
          }
        />
        <Route
          path="/cart"
          element={
            <PageTransition>
              <Cart />
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
