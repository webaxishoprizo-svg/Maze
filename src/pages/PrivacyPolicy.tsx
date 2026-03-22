import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const PrivacyPolicy = () => {
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
                        <h1 className="text-display-lg font-serif">Privacy Policy</h1>
                        <p className="text-body-sm text-muted-foreground mt-4">Last updated: November 3, 2025</p>
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
                                        Maze operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). Maze is powered by Shopify, which enables us to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us. If there is a conflict between our Terms of Service and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.
                                    </p>
                                    <p className="mt-4">
                                        Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Personal Information We Collect or Process</h2>
                                    <p>
                                        When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you. We may collect or process the following categories of personal information, including inferences drawn from this personal information, depending on how you interact with the Services, where you live, and as permitted or required by applicable law:
                                    </p>
                                    <ul className="mt-4 space-y-2 list-disc pl-6">
                                        <li><strong>Contact details</strong> including your name, address, billing address, shipping address, phone number, and email address.</li>
                                        <li><strong>Financial information</strong> including credit card, debit card, and financial account numbers, payment card information, financial account information, transaction details, form of payment, payment confirmation and other payment details.</li>
                                        <li><strong>Account information</strong> including your username, password, security questions, preferences and settings.</li>
                                        <li><strong>Transaction information</strong> including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.</li>
                                        <li><strong>Communications with us</strong> including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
                                        <li><strong>Device information</strong> including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
                                        <li><strong>Usage information</strong> including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Personal Information Sources</h2>
                                    <p>We may collect personal information from the following sources:</p>
                                    <ul className="mt-4 space-y-2 list-disc pl-6">
                                        <li><strong>Directly from you</strong> including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information;</li>
                                        <li><strong>Automatically through the Services</strong> including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies;</li>
                                        <li><strong>From our service providers</strong> including when we engage them to enable certain technology and when they collect or process your personal information on our behalf;</li>
                                        <li><strong>From our partners</strong> or other third parties.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">How We Use Your Personal Information</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground mb-2">Provide, Tailor, and Improve the Services</h3>
                                            <p>We use your personal information to provide you with the Services, including to perform our contract with you, to process your payments, to fulfill your orders, to remember your preferences and items you are interested in, to send notifications to you related to your account, to process purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, to facilitate any returns and exchanges, to enable you to post reviews, and to create a customized shopping experience for you, such as recommending products related to your purchases.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground mb-2">Marketing and Advertising</h3>
                                            <p>We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you online advertisements for products or services on the Services or other websites, including based on items you previously have purchased or added to your cart and other activity on the Services.</p>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-foreground mb-2">Security and Fraud Prevention</h3>
                                            <p>We use your personal information to authenticate your account, to provide a secure payment and shopping experience, detect, investigate or take action regarding possible fraudulent, illegal, unsafe, or malicious activity, protect public safety, and to secure our services.</p>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Relationship with Shopify</h2>
                                    <p>
                                        The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services in order to provide and improve the Services for you. Information you submit to the Services will be transmitted to and shared with Shopify as well as third parties that may be located in countries other than where you reside, in order to provide and improve the Services for you. In addition, to help protect, grow, and improve our business, we use certain Shopify enhanced features that incorporate data and information obtained from your interactions with our Store, along with other merchants and with Shopify.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Security and Retention of Your Information</h2>
                                    <p>
                                        Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee "perfect security." In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.
                                    </p>
                                    <p className="mt-4">
                                        How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide you with Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Your Rights and Choices</h2>
                                    <p>Depending on where you live, you may have some or all of the rights listed below in relation to your personal information:</p>
                                    <ul className="mt-4 space-y-2 list-disc pl-6">
                                        <li><strong>Right to Access / Know.</strong> You may have a right to request access to personal information that we hold about you.</li>
                                        <li><strong>Right to Delete.</strong> You may have a right to request that we delete personal information we maintain about you.</li>
                                        <li><strong>Right to Correct.</strong> You may have a right to request that we correct inaccurate personal information we maintain about you.</li>
                                        <li><strong>Right of Portability.</strong> You may have a right to receive a copy of the personal information we hold about you.</li>
                                    </ul>
                                </section>

                                <section className="pt-12 border-t border-border">
                                    <h2 className="text-2xl font-serif text-foreground mb-6">Contact</h2>
                                    <p>
                                        Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call or email us at <a href="mailto:maze.ecom.store@gmail.com" className="text-foreground font-bold hover:text-[#C6A75E]">maze.ecom.store@gmail.com</a> or contact us at:
                                    </p>
                                    <address className="mt-4 not- text-foreground font-medium">
                                        Inshas Taliparamba, near Sreedevi,<br />
                                        Kannur, Kerala, 670141, India
                                    </address>
                                </section>

                                <div className="text-center pt-24 pb-12">
                                    <p className="text-xl font-serif text-foreground">© 2025 MAZE. All rights reserved.</p>
                                    <p className="text-sm uppercase tracking-widest mt-2">Crafted for comfort. Built for everyone.</p>
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

export default PrivacyPolicy;
