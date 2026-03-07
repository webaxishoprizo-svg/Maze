import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";


export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "warm-cream": "hsl(var(--warm-cream))",
        "light-taupe": "hsl(var(--light-taupe))",
        "soft-beige": "hsl(var(--soft-beige))",
        camel: "hsl(var(--camel))",
        charcoal: "hsl(var(--charcoal))",
        "warm-gray": "hsl(var(--warm-gray))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 10vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 7vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading": ["clamp(1.5rem, 3.5vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "subheading": ["clamp(1.125rem, 2vw, 1.625rem)", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "body": ["1rem", { lineHeight: "1.75" }],
        "body-sm": ["0.875rem", { lineHeight: "1.65" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.03em" }],
        "overline": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.25em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        elevated: "var(--shadow-elevated)",
        glow: "var(--shadow-glow)",
        "3d": "var(--shadow-3d)",
        "3d-hover": "var(--shadow-3d-hover)",
        "3d-active": "var(--shadow-3d-active)",
        "card-3d": "var(--shadow-card-3d)",
        "card-3d-hover": "var(--shadow-card-3d-hover)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
        "900": "900ms",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(60px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-60px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          from: { opacity: "0", transform: "translateX(-60px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          from: { opacity: "0", transform: "translateX(60px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "scale-out": {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.9)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(1deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        // Enhanced scroll animations
        "scroll-fade-up": {
          from: { opacity: "0", transform: "translateY(80px) scale(0.95)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "scroll-fade-left": {
          from: { opacity: "0", transform: "translateX(-80px) rotateY(10deg)" },
          to: { opacity: "1", transform: "translateX(0) rotateY(0deg)" },
        },
        "scroll-fade-right": {
          from: { opacity: "0", transform: "translateX(80px) rotateY(-10deg)" },
          to: { opacity: "1", transform: "translateX(0) rotateY(0deg)" },
        },
        "scroll-scale-up": {
          from: { opacity: "0", transform: "scale(0.8) translateY(40px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "scroll-rotate-in": {
          from: { opacity: "0", transform: "rotate(-5deg) translateY(60px)" },
          to: { opacity: "1", transform: "rotate(0deg) translateY(0)" },
        },
        "scroll-blur-in": {
          "0%": { opacity: "0", filter: "blur(10px)", transform: "translateY(40px)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
        },
        "parallax-up": {
          from: { transform: "translateY(100px)" },
          to: { transform: "translateY(-100px)" },
        },
        "tilt-in": {
          from: { opacity: "0", transform: "perspective(1000px) rotateX(15deg) translateY(50px)" },
          to: { opacity: "1", transform: "perspective(1000px) rotateX(0deg) translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.35s ease-out",
        "accordion-up": "accordion-up 0.35s ease-out",
        marquee: "marquee 35s linear infinite",
        "marquee-slow": "marquee 70s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "fade-in": "fade-in 0.7s ease-out forwards",
        "fade-in-up": "fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-down": "fade-in-down 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-left": "fade-in-left 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-right": "fade-in-right 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-out-right": "slide-out-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-out": "scale-out 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        wiggle: "wiggle 3s ease-in-out infinite",
        // Enhanced scroll animations
        "scroll-fade-up": "scroll-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scroll-fade-left": "scroll-fade-left 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scroll-fade-right": "scroll-fade-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scroll-scale-up": "scroll-scale-up 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "scroll-rotate-in": "scroll-rotate-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scroll-blur-in": "scroll-blur-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "tilt-in": "tilt-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-warm": "linear-gradient(135deg, hsl(var(--warm-cream)) 0%, hsl(var(--light-taupe)) 100%)",
        "gradient-elegant": "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--secondary)) 100%)",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
