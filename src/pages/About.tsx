import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
const heroModel = "/images/hero_woman_baggy.png";
const categoryDresses = "/images/hero_man_baggy.png";
const categoryKnitwear = "/images/lifestyle_baggy.png";
const categoryJackets = "/images/newsletter_baggy.png";

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
    name: "Founder",
    role: "Maze Visionary",
    image: categoryDresses,
  },
  {
    name: "Lead Designer",
    role: "Couture Lead",
    image: categoryKnitwear,
  },
  {
    name: "Our Team",
    role: "Craftsmanship Lead",
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
            alt="Maze Atelier"
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
              <h2 className="text-display font-serif mb-8">Welcome to MAZE, where comfort meets confidence.</h2>
              <div className="space-y-6 text-body-lg text-muted-foreground">
                <p>
                  We started MAZE with one simple idea — to create track pants that move with you, not against you.
                </p>
                <div className="py-4 border-l-2 border-foreground/10 pl-6 my-8">
                  <p className="text-xl font-serif italic text-foreground">
                    "Why should everyday wear feel ordinary?"
                  </p>
                </div>
                <p>
                  At MAZE, we design track pants for everyone — men, women, and kids — blending style, stretch, and strength into every thread. Whether you’re hitting the gym, stepping out with friends, or lounging at home, our fits are made to match your rhythm.
                </p>
                <p>
                  Every MAZE piece is crafted from premium-quality fabric, tested for durability, breathability, and comfort. From baggy fits to tapered joggers, our collection covers every style — because we believe movement should never be restricted by your clothes.
                </p>
                <p>
                  We’re not just another fashion label — we’re building a movement where every age, every body, and every lifestyle finds its comfort zone.
                </p>
                <p className="pt-4 font-semibold text-foreground">
                  Move with MAZE.<br />
                  Everyday comfort. Timeless style. All-in-one fit.
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
                  src="/images/lifestyle_baggy.png"
                  alt="MAZE Baggy Performance"
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
      <section className="py-24 lg:py-32 bg-[#111111] text-[#F4F1EA]">
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
      <section className="py-24 lg:py-32 bg-background border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-display font-serif mb-6 text-foreground">Experience MAZE</h2>
            <p className="text-body-lg text-muted-foreground mb-10">
              Discover our latest performance collection and experience the art of athletic luxury.
            </p>
            <a href="/collection" className="inline-flex items-center justify-center bg-[#C6A75E] text-[#111111] px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-[6px] hover:bg-[#b59855] transition-all shadow-[0_4px_0_rgba(198,167,94,0.3)] hover:shadow-[0_2px_0_rgba(198,167,94,0.3)] hover:translate-y-[2px]">
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
