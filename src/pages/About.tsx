import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
const heroModel = "https://images.unsplash.com/photo-1550614000-4b95d41d14e9?auto=format&fit=crop&q=80&w=800";
const categoryDresses = "https://images.unsplash.com/photo-1515347619152-19e04863f69b?auto=format&fit=crop&q=80&w=800";
const categoryKnitwear = "https://images.unsplash.com/photo-1611095973763-414019e72400?auto=format&fit=crop&q=80&w=800";
const categoryJackets = "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800";

const values = [
  {
    title: "Craftsmanship",
    description: "Each piece is meticulously crafted by skilled artisans using time-honored techniques passed down through generations.",
  },
  {
    title: "Sustainability",
    description: "We are committed to responsible practices, using eco-friendly materials and ethical production methods.",
  },
  {
    title: "Timelessness",
    description: "Our designs transcend trends, creating pieces that remain elegant and relevant season after season.",
  },
  {
    title: "Quality",
    description: "We source only the finest materials, ensuring each garment meets our exacting standards of excellence.",
  },
];

const team = [
  {
    name: "Elena Marchetti",
    role: "Creative Director",
    image: categoryDresses,
  },
  {
    name: "Alexander Chen",
    role: "Head of Design",
    image: categoryKnitwear,
  },
  {
    name: "Sofia Laurent",
    role: "Sustainability Lead",
    image: categoryJackets,
  },
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen">
      <Header />
      <CartDrawer />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[80vh] flex items-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent z-10" />
          <img
            src={heroModel}
            alt="MAANCE Atelier"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div style={{ opacity }} className="container mx-auto px-6 lg:px-12 relative z-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-overline uppercase tracking-luxury text-foreground/70 block mb-6"
          >
            Our Story
          </motion.span>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-display-xl font-serif max-w-3xl"
            >
              Engineered for Strength & Style
            </motion.h1>
          </div>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-overline uppercase tracking-luxury text-muted-foreground block mb-6">
                Founded 2024
              </span>
              <h2 className="text-display font-serif mb-8">The MAZE Vision</h2>
              <div className="space-y-6 text-body-lg text-muted-foreground">
                <p>
                  MAZE was born from a desire to create activewear that speaks to the modern
                  individual who values both performance and high fashion. We envisioned a brand that would bridge the gap between durable engineering and timeless design.
                </p>
                <p>
                  Based in Kerala, India, our team brings together the finest textiles and
                  modern silhouettes for those who share a passion for pushing their limits without compromising on elegance. Each collection is a testament to our commitment to quality, power, and enduring style.
                </p>
                <p>
                  Today, MAZE stands as a symbol of athletic luxury—pieces that are
                  designed to be worn in the gym, on the track, and in the city with pride.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2670&auto=format&fit=crop"
                  alt="MAZE Performance"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-12 -left-12 w-48 h-48 bg-foreground/5 -z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-overline uppercase tracking-luxury text-background/70 block mb-4">
              Our Principles
            </span>
            <h2 className="text-display font-serif">What We Stand For</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <span className="text-6xl font-serif text-background/20 block mb-4">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-subheading font-serif mb-4">{value.title}</h3>
                <p className="text-body-sm text-background/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-display font-serif mb-6">Experience MAZE</h2>
            <p className="text-body-lg text-muted-foreground mb-10">
              Discover our latest performance collection and experience the art of athletic luxury.
            </p>
            <a href="/collection" className="btn-refined-filled">
              <span>Shop the Collection</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
