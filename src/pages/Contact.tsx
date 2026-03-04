import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Inshas Taliparamba, near Sreedevi", "Kannur, Kerala, 670141, INDIA"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 94837 45479", "Mon-Sat, 10am-7pm IST"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["maze.ecom.store@gmail.com"],
  },
  {
    icon: Clock,
    title: "Opening Hours",
    details: ["Monday - Saturday: 10am - 7pm", "Sunday: Closed"],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

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
              Get in Touch
            </span>
            <h1 className="text-display-lg font-serif">Contact Us</h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-heading font-serif mb-8">Send Us a Message</h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 bg-secondary/50 text-center"
                >
                  <h3 className="text-subheading font-serif mb-4">Thank You</h3>
                  <p className="text-body text-muted-foreground">
                    Your message has been received. We'll be in touch within 24-48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-body-sm uppercase tracking-luxury block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border border-border px-4 py-3 text-body placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-body-sm uppercase tracking-luxury block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border border-border px-4 py-3 text-body placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-body-sm uppercase tracking-luxury block mb-2">
                      Subject
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-transparent border border-border px-4 py-3 text-body focus:border-foreground outline-none transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="press">Press Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-body-sm uppercase tracking-luxury block mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border border-border px-4 py-3 text-body placeholder:text-muted-foreground focus:border-foreground outline-none transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button type="submit" className="btn-couture-filled w-full sm:w-auto">
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-heading font-serif mb-8">Contact Information</h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 border border-border flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-body font-medium mb-1">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-body-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12 aspect-video bg-secondary overflow-hidden"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124844.75704179313!2d75.3181822!3d11.8744773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba422b9b2aca753%3A0x380ffdec0867bc5a!2sKannur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Maze Store Location"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
