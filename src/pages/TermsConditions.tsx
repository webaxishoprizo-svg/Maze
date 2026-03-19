import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const TermsConditions = () => {
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
                            Legal
                        </span>
                        <h1 className="text-display-lg font-serif">Terms & Conditions</h1>
                        <p className="text-body-sm text-muted-foreground mt-4">Welcome to MAZE!</p>
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
                        className="max-w-4xl mx-auto"
                    >
                        <div className="prose prose-gray max-w-none">
                            <div className="space-y-12 text-muted-foreground leading-relaxed">
                                <section>
                                    <p>
                                        These Terms & Conditions outline the rules and regulations for using our website — <a href="https://themaze.shop" className="text-foreground font-medium underline">https://themaze.shop</a> — and purchasing our products. By accessing or placing an order with us, you agree to these terms.
                                    </p>
                                    <p className="mt-4 font-medium text-foreground">
                                        If you disagree with any part of the terms, please do not use our website.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">General Information</h2>
                                    <p>
                                        MAZE is an online store offering unisex track pants and apparel designed for comfort, style, and performance. All products on our website are subject to availability. We reserve the right to discontinue or modify any product at any time without prior notice.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Orders & Payments</h2>
                                    <ul className="space-y-4 list-disc pl-6">
                                        <li>All orders must be placed through our official website.</li>
                                        <li>Payments can be made via credit/debit cards, UPI, wallets, or net banking using secure payment gateways.</li>
                                        <li>Once payment is confirmed, your order will be processed and shipped within the mentioned timeframe.</li>
                                        <li>MAZE reserves the right to cancel orders suspected of fraud or incorrect payment information.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Shipping & Delivery</h2>
                                    <p>
                                        We aim to deliver all orders within the estimated delivery time mentioned at checkout. However, delays may occur due to factors beyond our control (weather, courier delays, etc.). Shipping charges, if any, will be displayed during checkout.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Returns & Exchanges</h2>
                                    <p>
                                        Please refer to our <a href="/return-policy" className="text-foreground font-bold hover:text-[#C6A75E]">Return & Exchange Policy</a> for detailed information on returns, replacements, and refunds. Only products that meet our return conditions are eligible.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Pricing & Taxes</h2>
                                    <p>
                                        All prices listed on our website are inclusive of applicable taxes (GST). We reserve the right to change prices without prior notice, but confirmed orders will not be affected.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Privacy</h2>
                                    <p>
                                        Your privacy is important to us. Please read our <a href="/privacy-policy" className="text-foreground font-bold hover:text-[#C6A75E]">Privacy Policy</a> to understand how we collect, use, and protect your information.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Intellectual Property</h2>
                                    <p>
                                        All logos, images, text, and content on this website are the property of MAZE. Unauthorized use, reproduction, or modification of our content without permission is strictly prohibited.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Limitation of Liability</h2>
                                    <p>
                                        MAZE is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our website or products. We make every effort to ensure accuracy but cannot guarantee the completeness of product information.
                                    </p>
                                </section>

                                <section className="pt-12 border-t border-border">
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Contact Us</h2>
                                    <p>For any questions regarding these terms, please contact us at:</p>
                                    <div className="mt-4 space-y-2">
                                        <p><span className="text-foreground font-bold">Email:</span> <a href="mailto:maze.ecom.store@gmail.com" className="hover:text-[#C6A75E]">maze.ecom.store@gmail.com</a></p>

                                    </div>
                                </section>

                                <div className="text-center pt-24 pb-12">
                                    <p className="text-xl font-serif text-foreground">© 2026 MAZE. All rights reserved.</p>
                                    <p className="text-sm uppercase tracking-widest mt-2">Engineered for Strength & Style.</p>
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

export default TermsConditions;
