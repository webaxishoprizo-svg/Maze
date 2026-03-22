import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Youtube, ArrowUp, Loader2, Check } from "lucide-react";
import { useState } from "react";
import { storefrontFetch } from "../../lib/storefront";
import { NEWSLETTER_SIGNUP_MUTATION } from "../../lib/queries";

const footerLinks = {
  quickLinks: [
    { name: "Shop All", href: "/collection" },
    { name: "My Account", href: "https://shopify.com/64024543307/account/login?return_url=https://themaze.shop" },
    { name: "Track Order", href: "/track-order" },
    { name: "Wishlist", href: "/wishlist" },
  ],
  information: [
    { name: "About Us", href: "/about" },
    { name: "Return Policy", href: "/return-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/themaze.store", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/themaze.store", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setErrorStatus(null);
    try {
      const { body } = await storefrontFetch({
        query: NEWSLETTER_SIGNUP_MUTATION,
        variables: {
          input: {
            email,
            password: Math.random().toString(36).slice(-10), // Required field for customerCreate
            acceptsMarketing: true,
          },
        },
      });

      const userErrors = body.data?.customerCreate?.customerUserErrors || [];

      if (userErrors.length === 0) {
        setSubmitted(true);
        setEmail("");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        // If the email is already taken, they are likely already subscribed or already have an account
        if (userErrors.some((err: any) => err.code === "TAKEN")) {
          setSubmitted(true);
          setEmail("");
        } else {
          setErrorStatus(userErrors[0].message);
        }
      }
    } catch (err: any) {
      console.error("Newsletter error:", err);
      // Don't show raw GraphQL errors to the user
      setErrorStatus("There was an error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111111] text-[#F4F1EA]">
      {/* Back to Top */}
      <div className="border-b border-[#A1A1A1]/10">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.button
            onClick={scrollToTop}
            className="w-full py-6 flex items-center justify-center gap-2 text-[11px] uppercase hover:text-[#C6A75E] hover:opacity-100 opacity-70 transition-all font-bold"
            whileHover={{ y: -2 }}
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </motion.button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link to="/" className="inline-block mb-6" onClick={scrollToTop}>
              <img src="/logo.png" alt="Maze" className="h-16 w-auto object-contain invert" />
            </Link>
            <p className="text-body text-gray-400 mb-8 max-w-xs font-medium leading-relaxed">
              MAZE is an Indian performance brand engineered for strength and style. Based in Kerala, we build for the modern athlete at themaze.shop.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/20 rounded-[6px] flex items-center justify-center hover:border-accent-gold hover:bg-accent-gold hover:text-black text-gray-400 transition-all duration-300 shadow-[0_2px_0_rgba(0,0,0,0.1)] active:translate-y-[1px] active:shadow-none"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase mb-6 text-white tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3 font-medium">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={scrollToTop}
                    className="text-body-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase mb-6 text-white tracking-widest">
              Information
            </h4>
            <ul className="space-y-3 font-medium">
              {footerLinks.information.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={scrollToTop}
                    className="text-body-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase mb-6 text-white tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4 font-medium text-body-sm text-gray-400">
              <li className="leading-relaxed">
                <span className="text-[#F4F1EA] block mb-1">Email:</span>
                <a href="mailto:maze.ecom.store@gmail.com" className="hover:text-[#C6A75E] transition-colors">
                  maze.ecom.store@gmail.com
                </a>
              </li>

              <li className="leading-relaxed">
                <span className="text-white block mb-1">Address:</span>
                Inshas Taliparamba, near Sreedevi,<br />
                Kannur, Kerala, 670141, INDIA
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-[11px] font-bold uppercase mb-6 text-white tracking-widest">
              Newsletter
            </h4>
            <p className="text-body-sm text-gray-400 mb-6 leading-relaxed font-medium">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                disabled={loading || submitted}
                className={`w-full bg-transparent border-b ${errorStatus ? 'border-destructive' : 'border-white/10'} focus:border-accent-gold py-2 pr-10 text-body-sm outline-none transition-colors placeholder:text-gray-500 text-white`}
              />
              <button
                type="submit"
                disabled={loading || submitted}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                aria-label="Subscribe"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : submitted ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowUp className="w-4 h-4 rotate-90" />
                )}
              </button>
            </form>
            {submitted && (
              <p className="mt-2 text-xs text-green-500">Thank you for subscribing!</p>
            )}
            {errorStatus && (
              <p className="mt-2 text-xs text-destructive">{errorStatus}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#A1A1A1]/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-[#A1A1A1]">
            <p>© 2025 Maze. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" onClick={scrollToTop} className="hover:text-[#C6A75E] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" onClick={scrollToTop} className="hover:text-[#C6A75E] transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" onClick={scrollToTop} className="hover:text-[#C6A75E] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
