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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[400px] aspect-[4/5] card-float rounded-[4px] overflow-hidden shadow-card-3d group">
              <img
                src={heroModel}
                alt="Newsletter"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-silk"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 pointer-events-none" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground block mb-6">
              Stay Connected
            </span>
            <h2 className="text-display font-serif mb-6">
              Join the
              <br />
              <span className="italic">Inner Circle</span>
            </h2>
            <p className="text-body-lg text-muted-foreground mb-10 max-w-lg">
              Be the first to discover new arrivals, exclusive offers, and behind-the-scenes
              stories from the world of MAZE.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={`w-full bg-secondary/30 border border-transparent rounded-[6px] px-6 py-4 text-body outline-none placeholder:text-muted-foreground focus:border-foreground/20 focus:bg-white transition-all duration-500 shadow-inner`}
                  disabled={isSubmitted}
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitted || loading}
                  whileHover={{ scale: 1.1, x: -4 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-foreground text-background rounded-[4px] shadow-[0_2px_0_rgba(0,0,0,0.2)]"
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
              {error && (
                <p className="mt-2 text-caption text-destructive font-medium">{error}</p>
              )}
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-body-sm text-muted-foreground"
                >
                  Thank you for subscribing. Welcome to the MAZE world.
                </motion.p>
              )}
            </form>

            <p className="mt-6 text-caption text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
