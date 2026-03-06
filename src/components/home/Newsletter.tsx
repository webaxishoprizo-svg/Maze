import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { storefrontFetch } from "../../lib/storefront";
import { NEWSLETTER_SIGNUP_MUTATION } from "../../lib/queries";
const heroModel = "/images/newsletter_baggy.png";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setLoading(true);
      setError(null);
      try {
        const { body } = await storefrontFetch({
          query: NEWSLETTER_SIGNUP_MUTATION,
          variables: {
            input: {
              email,
              password: Math.random().toString(36).slice(-10), // Required for customerCreate
              acceptsMarketing: true,
            },
          },
        });

        const userErrors = body.data?.customerCreate?.customerUserErrors || [];

        if (userErrors.length > 0) {
          // If already taken, treat as success for newsletter
          if (userErrors.some((err: any) => err.code === "TAKEN")) {
            setIsSubmitted(true);
            setEmail("");
            return;
          }
          throw new Error(userErrors[0].message);
        }

        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => setIsSubmitted(false), 5000);
      } catch (err: any) {
        console.error("Newsletter error:", err);
        // If it's a GraphQL schema error (like missing password was), don't show the raw text
        if (err.message && err.message.includes("Variable $input")) {
          setError("Unable to process request. Please try again later.");
        } else {
          setError(err.message || "Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-x-20 lg:gap-y-6 items-start lg:items-center">

          {/* Header/Image Group - Mobile Horizontal split, Desktop Column */}
          <div className="flex flex-row items-start gap-5 sm:gap-8 lg:contents w-full">
            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0 lg:flex lg:items-center lg:justify-center order-1 lg:order-1 lg:row-span-2"
            >
              <div className="relative w-[120px] sm:w-[180px] lg:w-full lg:max-w-[400px] aspect-[4/5] card-float rounded-[4px] overflow-hidden shadow-card-3d group">
                <img
                  src={heroModel}
                  alt="Newsletter"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-silk"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 pointer-events-none" />
              </div>
            </motion.div>

            {/* Content Text - On mobile: Right side, On desktop: Full width block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 lg:flex-none order-2 lg:order-2 pt-2 lg:pt-0"
            >
              <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.3em] text-muted-foreground block mb-2 lg:mb-4">
                Stay Connected
              </span>
              <h2 className="text-xl sm:text-3xl lg:text-display font-serif mb-2 lg:mb-4 leading-tight">
                Join the
                <br />
                <span className="italic">Inner Circle</span>
              </h2>
              {/* Description visible on BOTH mobile and desktop now */}
              <p className="text-[11px] sm:text-sm lg:text-body-lg text-muted-foreground mb-0 lg:mb-0 max-w-lg leading-relaxed">
                Be the first to discover new arrivals, exclusive offers, and behind-the-scenes
                stories from the world of MAZE.
              </p>
            </motion.div>
          </div>

          {/* Form Area - Pushed below the horizontal group on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:col-start-2 order-3 lg:mt-0"
          >
            <form onSubmit={handleSubmit} className="max-w-md w-full">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={`w-full bg-secondary/30 border border-transparent rounded-[6px] px-6 py-4 text-body outline-none placeholder:text-muted-foreground focus:border-foreground/20 focus:bg-white transition-all duration-500 shadow-inner`}
                  disabled={isSubmitted}
                />
                <div className="absolute right-2 inset-y-0 flex items-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitted || loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ y: 1 }}
                    className="p-2 bg-foreground text-background rounded-[4px] shadow-[0_2px_0_rgba(0,0,0,0.15)] flex items-center justify-center transition-colors hover:bg-[#C6A75E]"
                    aria-label="Subscribe"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isSubmitted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
              </div>
              {error && (
                <p className="mt-2 text-caption text-destructive font-medium">{error}</p>
              )}
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-body-sm text-muted-foreground"
                >
                  Welcome to the MAZE world.
                </motion.p>
              )}
            </form>

            <p className="mt-6 text-[10px] uppercase font-bold tracking-widest text-[#C6A75E]/60">
              Maze Global Society
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
