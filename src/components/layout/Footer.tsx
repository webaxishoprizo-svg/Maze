import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Youtube, ArrowUp, Loader2, Check } from "lucide-react";
import { useState } from "react";
import { storefrontFetch } from "../../lib/storefront";
import { NEWSLETTER_SIGNUP_MUTATION } from "../../lib/queries";

const footerLinks = {
  quickLinks: [
    { name: "Shop All", href: "/collection" },
    { name: "Men’s Collection", href: "/collection/men" },
    { name: "Women’s Collection", href: "/collection/women" },
    { name: "Track Order", href: "/track-order" },
  ],
  information: [
    { name: "About Us", href: "/about" },
    { name: "Return Policy", href: "/return-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    try {
      const { body } = await storefrontFetch({
        query: NEWSLETTER_SIGNUP_MUTATION,
        variables: {
          input: {
            email,
            acceptsMarketing: true,
          },
        },
      });

      if (body.data.customerCreate.customerUserErrors.length === 0) {
        setSubmitted(true);
        setEmail("");
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error("Newsletter error:", err);
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
            className="w-full py-6 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] hover:text-[#C6A75E] hover:opacity-100 opacity-70 transition-all font-bold"
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
            <Link to="/" className="inline-block mb-6">
              <img src="/logo.png" alt="Maze" className="h-16 w-auto object-contain invert" />
            </Link>
            <p className="text-body-sm text-[#A1A1A1] mb-8 max-w-xs leading-relaxed font-medium">
              Maze is an Indian performance brand engineered for strength and style. Based in Kerala, we build for the modern athlete.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#A1A1A1]/20 rounded-full flex items-center justify-center hover:border-[#C6A75E] hover:bg-[#C6A75E] hover:text-[#111111] text-[#A1A1A1] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-[#F4F1EA]">
              Quick Links
            </h4>
            <ul className="space-y-3 font-medium">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-body-sm text-[#A1A1A1] hover:text-[#C6A75E] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-[#F4F1EA]">
              Information
            </h4>
            <ul className="space-y-3 font-medium">
              {footerLinks.information.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-body-sm text-[#A1A1A1] hover:text-[#C6A75E] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-[#F4F1EA]">
              Contact
            </h4>
            <ul className="space-y-4 font-medium text-body-sm text-[#A1A1A1]">
              <li className="leading-relaxed">
                <span className="text-[#F4F1EA] block mb-1">Email:</span>
                <a href="mailto:maze.ecom.store@gmail.com" className="hover:text-[#C6A75E] transition-colors">
                  maze.ecom.store@gmail.com
                </a>
              </li>
              <li className="leading-relaxed">
                <span className="text-[#F4F1EA] block mb-1">Contact:</span>
                <a href="tel:+919483745479" className="hover:text-[#C6A75E] transition-colors">
                  +91 94837 45479
                </a>
              </li>
              <li className="leading-relaxed">
                <span className="text-[#F4F1EA] block mb-1">Address:</span>
                Inshas Taliparamba, near Sreedevi,<br />
                Kannur, Kerala, 670141, INDIA
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-[#F4F1EA]">
              Newsletter
            </h4>
            <p className="text-body-sm text-[#A1A1A1] mb-6 leading-relaxed font-medium">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="relative" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                disabled={loading || submitted}
                className="w-full bg-transparent border-b border-[#A1A1A1]/30 focus:border-[#C6A75E] py-2 pr-10 text-body-sm outline-none transition-colors placeholder:text-[#A1A1A1]/50 text-[#F4F1EA]"
              />
              <button
                type="submit"
                disabled={loading || submitted}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#A1A1A1] hover:text-[#C6A75E] transition-colors"
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
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#A1A1A1]/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-[#A1A1A1]">
            <p>© 2026 Maze. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-[#C6A75E] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="hover:text-[#C6A75E] transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-[#C6A75E] transition-colors">
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
