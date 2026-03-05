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
      <section className="pb-24 lg:pb-32 bg-[#FAFAF9]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[4px] border border-[#f0f0f0]"
            >
              <h2 className="text-display-sm font-serif mb-8 text-[#111]">Send Us a Message</h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 bg-secondary/30 text-center rounded-[4px]"
                >
                  <div className="w-16 h-16 bg-[#111] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="text-subheading font-serif mb-4">Message Sent</h3>
                  <p className="text-body text-muted-foreground">
                    Your inquiry has been received. Our concierge team will reach out within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-secondary/20 border border-transparent rounded-[4px] px-5 py-4 text-body-sm focus:bg-white focus:border-border outline-none transition-all shadow-inner"
                        placeholder="e.g. James Bond"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-secondary/20 border border-transparent rounded-[4px] px-5 py-4 text-body-sm focus:bg-white focus:border-border outline-none transition-all shadow-inner"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                      Subject
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-secondary/20 border border-transparent rounded-[4px] px-5 py-4 text-body-sm focus:bg-white focus:border-border outline-none transition-all cursor-pointer appearance-none"
                    >
                      <option value="">Choose a subject...</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Sizing & Fit</option>
                      <option value="returns">Returns Center</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                      How Can We Help?
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-secondary/20 border border-transparent rounded-[4px] px-5 py-4 text-body-sm focus:bg-white focus:border-border outline-none transition-all resize-none shadow-inner"
                      placeholder="Describe your request in detail..."
                    />
                  </div>
                  <button type="submit" className="btn-couture-filled w-full group !rounded-[4px]">
                    <span className="flex items-center justify-center gap-2">
                      Send Message <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                    </span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[4px] border border-[#f0f0f0]">
                <h2 className="text-display-sm font-serif mb-10 text-[#111]">Our Atelier</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {contactInfo.map((info, index) => (
                    <div key={info.title} className="group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-[#111] text-white rounded-[4px] shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <info.icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-xs uppercase tracking-widest font-bold text-[#111]">{info.title}</h3>
                      </div>
                      <div className="pl-14">
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-body-sm text-muted-foreground leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative aspect-video bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden rounded-[4px] border border-[#f0f0f0] p-2"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124844.75704179313!2d75.3181822!3d11.8744773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba422b9b2aca753%3A0x380ffdec0867bc5a!2sKannur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '2px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Maze Store Location"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
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
