import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const featuredPost = {
  id: "1",
  title: "The Art of Slow Fashion: Why Quality Matters",
  excerpt: "In a world of fast fashion, we explore why investing in timeless pieces is not just a style choice, but a statement about values.",
  image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600",
  date: "November 24, 2024",
  category: "Philosophy",
  readTime: "8 min read",
};

const posts = [
  {
    id: "2",
    title: "Behind the Seams: A Day in Our Milan Atelier",
    excerpt: "Step inside our workshop and meet the artisans who bring each Maze piece to life.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    date: "November 20, 2024",
    category: "Behind the Scenes",
    readTime: "5 min read",
  },
  {
    id: "3",
    title: "Winter Layering: A Guide to Effortless Elegance",
    excerpt: "Master the art of layering with our expert tips for staying warm while looking chic.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
    date: "November 15, 2024",
    category: "Style Guide",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Sustainable Silk: Our Journey to Ethical Luxury",
    excerpt: "How we're reimagining silk production to create beautiful fabrics without compromise.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
    date: "November 10, 2024",
    category: "Sustainability",
    readTime: "7 min read",
  },
  {
    id: "5",
    title: "The Perfect Capsule Wardrobe for the Modern Woman",
    excerpt: "Build a versatile wardrobe with 15 essential pieces that work for every occasion.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
    date: "November 5, 2024",
    category: "Style Guide",
    readTime: "10 min read",
  },
  {
    id: "6",
    title: "Italian Craftsmanship: A Legacy of Excellence",
    excerpt: "Exploring the rich heritage of Italian fashion and its influence on our designs.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
    date: "October 28, 2024",
    category: "Heritage",
    readTime: "6 min read",
  },
];

const Blog = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <CartDrawer />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-overline uppercase tracking-luxury text-muted-foreground block mb-4">
              Stories & Inspiration
            </span>
            <h1 className="text-display-lg font-serif">The Journal</h1>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <Link to={`/blog/${featuredPost.id}`} className="block group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
            >
              <div className="aspect-[4/3] lg:aspect-[4/5] overflow-hidden">
                <motion.img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-overline uppercase tracking-luxury text-muted-foreground">
                    {featuredPost.category}
                  </span>
                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span className="text-caption text-muted-foreground">
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-display font-serif mb-6 group-hover:opacity-70 transition-opacity">
                  {featuredPost.title}
                </h2>
                <p className="text-body-lg text-muted-foreground mb-8">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-2 text-body-sm uppercase tracking-luxury">
                  Read Article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={`/blog/${post.id}`} className="block group">
                  <div className="aspect-[4/3] overflow-hidden mb-6">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-caption uppercase tracking-luxury text-muted-foreground">
                      {post.category}
                    </span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span className="text-caption text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-subheading font-serif mb-3 group-hover:opacity-70 transition-opacity">
                    {post.title}
                  </h3>
                  <p className="text-body-sm text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-caption text-muted-foreground">
                    {post.date}
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Blog;
