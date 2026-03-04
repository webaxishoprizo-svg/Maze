import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
    {
        title: "4-WAY STRETCH",
        description: "Ultra Performance Fabric",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 3l-4 18M3 14l18-4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "SWEAT-WICKING",
        description: "Stay Dry. Stay Cool.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2.5v19M6.5 7L17.5 17M17.5 7L6.5 17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "PREMIUM FIT",
        description: "Tailored for Athletes",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="6" width="16" height="12" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 10h16M4 14h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "PREMIUM FABRIC",
        description: "Ultra Performance Fabric",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 8l8 4 8-4M12 12v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

const WhyMaze = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="py-20 bg-white border-y border-[#e5e5e5]">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-[#111]">
                        Why Maze?
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                            className="flex items-center lg:justify-center gap-6"
                        >
                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-[#111]">
                                {feature.icon}
                            </div>
                            <div className="flex flex-col border-l border-[#e5e5e5] pl-6 text-left">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#111] mb-1">
                                    {feature.title}
                                </h3>
                                <p className="text-xs text-[#666] font-medium tracking-wide">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyMaze;
