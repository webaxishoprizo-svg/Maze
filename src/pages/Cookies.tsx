import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Cookies = () => {
    return (
        <main className="min-h-screen bg-background">
            <Header />
            <div className="pt-32 pb-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto editorial-content"
                    >
                        <h1 className="text-display font-serif mb-12 uppercase">Cookie Policy</h1>
                        <div className="prose prose-neutral max-w-none">
                            <p className="text-body mb-8">
                                Last updated: March 05, 2026
                            </p>
                            <h3 className="font-serif text-heading mb-4">What Are Cookies</h3>
                            <p className="text-body mb-8">
                                As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.
                            </p>
                            <h3 className="font-serif text-heading mb-4">How We Use Cookies</h3>
                            <p className="text-body mb-8">
                                We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.
                            </p>
                            <h3 className="font-serif text-heading mb-4">Disabling Cookies</h3>
                            <p className="text-body mb-8">
                                You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Cookies;
