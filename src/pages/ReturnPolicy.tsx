import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const ReturnPolicy = () => {
    return (
        <main className="min-h-screen">
            <Header />
            <CartDrawer />

            {/* Hero */}
            <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-secondary/30">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="text-overline uppercase tracking-luxury text-muted-foreground block mb-4">
                            Policies
                        </span>
                        <h1 className="text-display-lg font-serif">Return & Exchange Policy</h1>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 lg:py-32">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="prose prose-lg prose-gray max-w-none">
                            <div className="mb-12">
                                <p className="text-xl text-foreground font-medium leading-relaxed mb-4">
                                    At MAZE, your comfort and satisfaction are our top priorities.
                                    If you’re not completely happy with your purchase, we’re here to make it right.
                                </p>
                            </div>

                            <div className="space-y-16">
                                <div>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Easy Returns</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        We accept returns and exchanges within 7 days of delivery for all unused and unwashed items in their original packaging with tags attached.
                                    </p>
                                    <div className="bg-secondary/50 p-8 border-l-4 border-foreground">
                                        <p className="text-foreground leading-relaxed mb-4">
                                            To initiate a return or exchange, simply contact us at:
                                        </p>
                                        <a
                                            href="mailto:maze.ecom.store@gmail.com"
                                            className="text-lg font-bold text-foreground hover:text-[#C6A75E] transition-colors"
                                        >
                                            maze.ecom.store@gmail.com
                                        </a>
                                        <p className="text-muted-foreground mt-4 italic">
                                            Please mention your order number, and we’ll guide you through the quick process.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Eligibility for Return / Exchange</h2>
                                    <p className="text-muted-foreground mb-6">Your item must meet these conditions:</p>
                                    <ul className="space-y-4 text-muted-foreground list-disc pl-6 leading-relaxed">
                                        <li>The product must be unused, unwashed, and in its original condition.</li>
                                        <li>Tags and packaging should be intact.</li>
                                        <li>Proof of purchase (order ID or receipt) is required.</li>
                                        <li className="font-medium text-foreground">Items that show signs of wear, damage, or alteration will not be eligible for return or exchange.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Return Pickup / Shipping</h2>
                                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                                        <p>For eligible orders, we’ll arrange a reverse pickup from your address.</p>
                                        <p>If reverse pickup is not available in your area, you may need to ship the item back manually to our return address.</p>
                                        <p>Once your return is received and inspected, we’ll notify you via email.</p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Refunds</h2>
                                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                                        <p>Refunds are issued as store credit or to your original payment method, based on your preference.</p>
                                        <p>Refunds usually take 5–7 business days after the returned product passes our quality check.</p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Exchanges</h2>
                                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                                        <p className="text-foreground font-medium">Want a different size or color?</p>
                                        <p>You can easily exchange your product instead of returning it — subject to stock availability.</p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Non-Returnable Items</h2>
                                    <p className="text-muted-foreground mb-6">Certain items are not eligible for return, such as:</p>
                                    <ul className="space-y-4 text-muted-foreground list-disc pl-6 leading-relaxed">
                                        <li>Discounted or clearance products</li>
                                        <li>Gift cards</li>
                                        <li>Items damaged after delivery due to misuse</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-24 pt-12 border-t border-border text-center">
                                <p className="text-muted-foreground mb-8">
                                    We aim to make your MAZE experience as smooth and reliable as possible.
                                    If you ever face an issue, just reach out — we’re here to help.
                                </p>
                                <div className="space-y-2">
                                    <p className="text-xl font-serif text-foreground">MAZE – Crafted for comfort, built for everyone.</p>
                                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground uppercase tracking-widest pt-4">
                                        <span>Move with MAZE</span>
                                        <span className="w-1 h-1 bg-border rounded-full" />
                                        <span>Everyday comfort</span>
                                        <span className="w-1 h-1 bg-border rounded-full" />
                                        <span>Timeless style</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default ReturnPolicy;
