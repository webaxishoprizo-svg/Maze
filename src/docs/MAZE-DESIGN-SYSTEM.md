# Maze Design System Documentation
**Complete A-Z Reference Guide**

---

## Table of Contents
1. [Overview & Brand Identity](#overview--brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Shadows & Effects](#shadows--effects)
6. [Border Radius](#border-radius)
7. [Animation Library](#animation-library)
8. [Component Specifications](#component-specifications)
9. [Page Sections](#page-sections)
10. [Responsive Design](#responsive-design)
11. [Code Examples](#code-examples)

---

## Overview & Brand Identity

### Brand Name
**Maze** - Timeless Elegance & Contemporary Luxury

### Aesthetic Direction
- **Style References**: Prada, Dior, Celine, The Row
- **Mood**: Refined, Sophisticated, Editorial
- **Approach**: Minimalist Luxury with Subtle Movement
- **Design Philosophy**: Clean layouts, generous negative space, elegant micro-interactions

### Technical Stack
- React 18.3.1
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion 12.23.24
- React Router DOM 6.30.1
- Shadcn/ui components

---

## Color System

### Light Mode Colors

#### Primary Background Colors
```css
--background: 30 25% 95%;        /* HSL */
/* Hex: #f7f5f2 - Warm cream/beige background */

--foreground: 30 15% 15%;        /* HSL */
/* Hex: #2d2724 - Deep warm brown text */
```

#### Accent Colors
```css
--primary: 30 20% 25%;           /* HSL */
/* Hex: #403632 - Rich warm brown */

--primary-foreground: 30 25% 95%; /* HSL */
/* Hex: #f7f5f2 - Light text on primary */

--secondary: 30 20% 88%;         /* HSL */
/* Hex: #e8e3de - Soft taupe */

--secondary-foreground: 30 15% 15%; /* HSL */
/* Hex: #2d2724 - Dark text on secondary */
```

#### Muted & Accent Colors
```css
--muted: 30 18% 85%;             /* HSL */
/* Hex: #ddd7d0 - Muted taupe */

--muted-foreground: 30 10% 40%;  /* HSL */
/* Hex: #6b6360 - Muted text */

--accent: 30 22% 82%;            /* HSL */
/* Hex: #dbd3ca - Light accent */

--accent-foreground: 30 15% 15%; /* HSL */
/* Hex: #2d2724 - Text on accent */
```

#### UI Element Colors
```css
--card: 30 25% 98%;              /* HSL */
/* Hex: #fcfbfa - Card background */

--card-foreground: 30 15% 15%;   /* HSL */
/* Hex: #2d2724 - Card text */

--popover: 30 25% 98%;           /* HSL */
/* Hex: #fcfbfa - Popover background */

--popover-foreground: 30 15% 15%; /* HSL */
/* Hex: #2d2724 - Popover text */
```

#### Border & Input Colors
```css
--border: 30 20% 85%;            /* HSL */
/* Hex: #ddd7d0 - Border color */

--input: 30 20% 85%;             /* HSL */
/* Hex: #ddd7d0 - Input border */

--ring: 30 20% 25%;              /* HSL */
/* Hex: #403632 - Focus ring */
```

#### Status Colors
```css
--destructive: 0 65% 55%;        /* HSL */
/* Hex: #dc4e41 - Error/destructive red */

--destructive-foreground: 30 25% 95%; /* HSL */
/* Hex: #f7f5f2 - Text on destructive */
```

#### Chart Colors
```css
--chart-1: 30 70% 50%;           /* HSL */
--chart-2: 30 60% 45%;           /* HSL */
--chart-3: 30 50% 40%;           /* HSL */
--chart-4: 30 40% 35%;           /* HSL */
--chart-5: 30 30% 30%;           /* HSL */
```

### Dark Mode Colors

```css
.dark {
  --background: 30 15% 8%;       /* HSL */
  /* Hex: #171412 - Deep warm black */
  
  --foreground: 30 25% 95%;      /* HSL */
  /* Hex: #f7f5f2 - Light warm white */
  
  --primary: 30 25% 90%;         /* HSL */
  /* Hex: #f2ede8 - Light warm cream */
  
  --primary-foreground: 30 15% 8%; /* HSL */
  /* Hex: #171412 - Dark text on primary */
  
  --secondary: 30 15% 15%;       /* HSL */
  /* Hex: #2d2724 - Dark warm brown */
  
  --secondary-foreground: 30 25% 95%; /* HSL */
  /* Hex: #f7f5f2 - Light text on secondary */
  
  --muted: 30 12% 18%;           /* HSL */
  /* Hex: #332e2b - Muted dark brown */
  
  --muted-foreground: 30 18% 65%; /* HSL */
  /* Hex: #b5ada6 - Muted light text */
  
  --accent: 30 15% 20%;          /* HSL */
  /* Hex: #3a342f - Accent dark */
  
  --accent-foreground: 30 25% 95%; /* HSL */
  /* Hex: #f7f5f2 - Text on accent */
  
  --border: 30 15% 20%;          /* HSL */
  /* Hex: #3a342f - Border dark */
  
  --input: 30 15% 20%;           /* HSL */
  /* Hex: #3a342f - Input border dark */
  
  --ring: 30 25% 90%;            /* HSL */
  /* Hex: #f2ede8 - Focus ring light */
  
  --card: 30 15% 10%;            /* HSL */
  /* Hex: #1f1a17 - Card background dark */
  
  --card-foreground: 30 25% 95%; /* HSL */
  /* Hex: #f7f5f2 - Card text light */
}
```

### Custom Design Tokens

```css
/* Shadows */
--shadow-soft: 0 2px 20px -2px hsl(30 20% 20% / 0.06);
--shadow-elegant: 0 4px 30px -4px hsl(30 20% 20% / 0.08);
--shadow-lifted: 0 8px 40px -6px hsl(30 20% 20% / 0.12);

/* Transitions */
--transition-base: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
--transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-luxury: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
```

### Tailwind Extended Colors

```javascript
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
  // ... etc
}
```

---

## Typography

### Font Families

#### Display/Heading Font
```css
font-family: 'Playfair Display', serif;
```
**Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
```

**Usage:** All headings (h1, h2, h3, h4, h5, h6)

#### Body Font
```css
font-family: 'Inter', sans-serif;
```
**Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Usage:** Body text, paragraphs, UI elements

### Font Size Scale

```javascript
fontSize: {
  xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
  sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
  base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
  lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
  xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
  '5xl': ['3rem', { lineHeight: '1' }],           // 48px
  '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
  '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
}
```

### Letter Spacing

```javascript
letterSpacing: {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
  'extra-wide': '0.15em',
  'ultra-wide': '0.3em',
}
```

**Common Usage:**
- `.tracking-ultra-wide` - Marquee banner text (0.3em)
- `.tracking-wider` - Section headings (0.05em)
- `.tracking-wide` - Uppercase labels (0.025em)

### Heading Styles (Global CSS)

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
  font-weight: 500;
}
```

---

## Spacing & Layout

### Container Configuration

```javascript
container: {
  center: true,
  padding: "1.5rem",
  screens: {
    "2xl": "1400px",
  },
}
```

### Spacing Scale

Standard Tailwind spacing + custom utilities:

```javascript
spacing: {
  '18': '4.5rem',    // 72px
  '88': '22rem',     // 352px
  '128': '32rem',    // 512px
}
```

### Common Section Padding

- **Desktop:** `py-28 lg:py-36` (7rem - 9rem vertical)
- **Mobile:** `py-16 lg:py-24` (4rem - 6rem vertical)
- **Containers:** `px-6 lg:px-12` (1.5rem - 3rem horizontal)

### Grid Patterns

#### 2-Column Grid
```jsx
<div className="grid md:grid-cols-2 gap-12 lg:gap-20">
```

#### 3-Column Grid
```jsx
<div className="grid md:grid-cols-3 gap-8 lg:gap-12">
```

#### 4-Column Product Grid
```jsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
```

#### Auto-Fit Responsive Grid
```jsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
```

---

## Shadows & Effects

### Shadow System

```css
/* Soft Shadow */
--shadow-soft: 0 2px 20px -2px hsl(30 20% 20% / 0.06);
/* Usage: box-shadow: var(--shadow-soft); */

/* Elegant Shadow */
--shadow-elegant: 0 4px 30px -4px hsl(30 20% 20% / 0.08);
/* Usage: box-shadow: var(--shadow-elegant); */

/* Lifted Shadow */
--shadow-lifted: 0 8px 40px -6px hsl(30 20% 20% / 0.12);
/* Usage: box-shadow: var(--shadow-lifted); */
```

### Tailwind Shadow Classes

```javascript
boxShadow: {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
}
```

### Blur Effects

```css
/* Backdrop Blur */
.backdrop-blur-sm { backdrop-filter: blur(4px); }
.backdrop-blur { backdrop-filter: blur(8px); }
.backdrop-blur-md { backdrop-filter: blur(12px); }
.backdrop-blur-lg { backdrop-filter: blur(16px); }
```

---

## Border Radius

**CRITICAL:** Maze uses **ZERO** border radius for sharp, luxury aesthetic

```javascript
borderRadius: {
  none: '0px',
  sm: '0px',
  DEFAULT: '0px',
  md: '0px',
  lg: '0px',
  xl: '0px',
  '2xl': '0px',
  '3xl': '0px',
  full: '9999px',  // Only for circles (dots, avatars)
}
```

---

## Animation Library

### Timing Functions

```javascript
transitionTimingFunction: {
  luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}
```

### Transition Duration

```javascript
transitionDuration: {
  DEFAULT: '200ms',
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
}
```

### Keyframe Animations

#### 1. Reveal Up Animation
```css
@keyframes revealUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-reveal-up {
  animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

#### 2. Marquee Animation
```css
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee {
  animation: marquee 30s linear infinite;
}
```

#### 3. Stagger Fade In
```css
@keyframes staggerFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-container > * {
  animation: staggerFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.stagger-container > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-container > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-container > *:nth-child(3) { animation-delay: 0.3s; }
```

#### 4. Float Gentle
```css
@keyframes floatGentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float-gentle {
  animation: floatGentle 3s ease-in-out infinite;
}
```

#### 5. Shimmer Effect
```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-shimmer {
  animation: shimmer 2s linear infinite;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  background-size: 1000px 100%;
}
```

#### 6. Pulse Glow
```css
@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.animate-pulse-glow {
  animation: pulseGlow 2s ease-in-out infinite;
}
```

#### 7. Scale Rotate
```css
@keyframes scaleRotate {
  0% {
    transform: scale(0) rotate(0deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}

.animate-scale-rotate {
  animation: scaleRotate 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

#### 8. Slide In Stagger
```css
@keyframes slideInStagger {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-stagger {
  animation: slideInStagger 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}
```

### Animation Delay Utilities

```javascript
animationDelay: {
  '100': '100ms',
  '200': '200ms',
  '300': '300ms',
  '400': '400ms',
  '500': '500ms',
  '600': '600ms',
  '700': '700ms',
  '800': '800ms',
  '900': '900ms',
  '1000': '1000ms',
}
```

**Usage:**
```jsx
<div className="animate-fade-in animation-delay-200">
```

### Framer Motion Variants

#### Container Variant (Stagger Children)
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};
```

#### Item Variant (Fade + Slide)
```javascript
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
```

#### Scale Hover
```javascript
whileHover={{ 
  scale: 1.05,
  transition: { duration: 0.2 }
}}
```

#### Slide In From Right
```javascript
initial={{ x: "100%" }}
animate={{ x: 0 }}
exit={{ x: "100%" }}
transition={{ type: "spring", damping: 25, stiffness: 200 }}
```

---

## Component Specifications

### Custom CSS Utility Classes

#### 1. Refined Button (Outline)
```css
.btn-refined {
  @apply relative px-8 py-3 text-sm tracking-wider uppercase;
  @apply bg-transparent text-foreground;
  @apply border border-foreground;
  @apply overflow-hidden;
  @apply transition-all duration-500 ease-luxury;
}

.btn-refined::before {
  content: '';
  @apply absolute inset-0 bg-foreground;
  @apply transform translate-y-full;
  @apply transition-transform duration-500 ease-luxury;
  z-index: -1;
}

.btn-refined:hover::before {
  @apply translate-y-0;
}

.btn-refined:hover {
  @apply text-background;
}
```

**Usage:**
```jsx
<button className="btn-refined">Shop Now</button>
```

#### 2. Refined Filled Button
```css
.btn-refined-filled {
  @apply relative px-8 py-3 text-sm tracking-wider uppercase;
  @apply bg-foreground text-background;
  @apply border border-foreground;
  @apply overflow-hidden;
  @apply transition-all duration-500 ease-luxury;
}

.btn-refined-filled::before {
  content: '';
  @apply absolute inset-0 bg-background;
  @apply transform translate-y-full;
  @apply transition-transform duration-500 ease-luxury;
  z-index: -1;
}

.btn-refined-filled:hover::before {
  @apply translate-y-0;
}

.btn-refined-filled:hover {
  @apply text-foreground;
}
```

#### 3. Card Float Effect
```css
.card-float {
  @apply transition-all duration-500 ease-luxury;
}

.card-float:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lifted);
}
```

#### 4. Product Card Hover
```css
.product-card {
  @apply transition-all duration-500 ease-luxury;
  @apply hover:-translate-y-2;
}
```

#### 5. Elegant Divider
```css
.divider-elegant {
  @apply relative w-24 h-px bg-foreground/20 mx-auto my-8;
}

.divider-elegant::before {
  content: '✦';
  @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
  @apply text-foreground/40 text-xs;
  @apply bg-background px-3;
}
```

#### 6. Link Hover Effect
```css
.link-hover {
  @apply relative inline-block;
  @apply after:content-[''] after:absolute after:w-full;
  @apply after:scale-x-0 after:h-px after:bottom-0 after:left-0;
  @apply after:bg-foreground;
  @apply after:origin-bottom-right;
  @apply after:transition-transform after:duration-300;
  @apply hover:after:scale-x-100 hover:after:origin-bottom-left;
}
```

#### 7. Image Zoom Container
```css
.img-zoom {
  @apply overflow-hidden;
}

.img-zoom img {
  @apply transition-transform duration-700 ease-luxury;
  @apply hover:scale-110;
}
```

#### 8. Magnetic Effect
```css
.magnetic {
  @apply transition-transform duration-300 ease-out;
}

.magnetic:hover {
  transform: translate(var(--x, 0), var(--y, 0));
}
```

#### 9. Custom Scrollbar
```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--background));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--foreground) / 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--foreground) / 0.3);
}
```

### Shadcn/ui Button Component

#### Button Variants
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

---

## Page Sections

### 1. Header Component

**File:** `src/components/layout/Header.tsx`

#### Features
- Sticky header with scroll behavior
- Backdrop blur when scrolled
- Mobile hamburger menu
- Desktop navigation with dropdown
- Cart icon with item count badge
- Search functionality

#### Scroll Behavior
```javascript
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

#### Sticky Header Classes
```jsx
<header className={`
  fixed top-0 left-0 right-0 z-50
  transition-all duration-300
  ${isScrolled 
    ? 'bg-background/80 backdrop-blur-md shadow-sm py-3' 
    : 'bg-transparent py-5'
  }
`}>
```

#### Mobile Menu Animation
```jsx
<motion.div
  initial={{ x: "-100%" }}
  animate={{ x: 0 }}
  exit={{ x: "-100%" }}
  transition={{ type: "spring", damping: 25, stiffness: 200 }}
  className="fixed inset-y-0 left-0 w-full bg-background z-50"
>
```

### 2. Hero Section

**File:** `src/components/home/HeroSection.tsx`

#### Layout
```jsx
<section className="relative min-h-screen flex items-center overflow-hidden">
```

#### Parallax Effect
```javascript
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start start", "end start"],
});

const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
```

#### Background Image with Parallax
```jsx
<motion.div
  className="absolute inset-0 z-0"
  style={{ y, opacity }}
>
  <img
    src={heroImage}
    alt="Hero"
    className="w-full h-full object-cover"
  />
</motion.div>
```

#### Text Stagger Animation
```jsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
```

#### Floating Decorative Element
```jsx
<motion.div
  className="absolute top-1/4 right-20"
  animate={{
    y: [0, -20, 0],
    rotate: [0, 5, 0],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <div className="w-32 h-32 border border-background/30" />
</motion.div>
```

### 3. Marquee Banner

**File:** `src/components/home/MarqueeBanner.tsx`

#### Structure
```jsx
<div className="py-5 bg-foreground text-background overflow-hidden">
  <div className="flex">
    <motion.div className="flex shrink-0 gap-12 items-center"
      animate={{ x: [0, "-50%"] }}
      transition={{
        duration: 35,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {[...items, ...items].map((item, index) => (
        <span className="text-[10px] uppercase tracking-[0.3em] whitespace-nowrap font-light">
          {item}
        </span>
      ))}
    </motion.div>
  </div>
</div>
```

#### Items Array
```javascript
const items = [
  "Free Shipping Over $500",
  "✦",
  "New Collection",
  "✦",
  "Complimentary Gift Wrapping",
  "✦",
  "Sustainable Luxury",
  "✦",
  "Made in Italy",
  "✦",
  "2 Year Warranty",
  "✦",
];
```

### 4. Featured Products

**File:** `src/components/home/FeaturedProducts.tsx`

#### Grid Layout
```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
>
```

#### Container Animation
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};
```

#### Item Animation
```javascript
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
```

### 5. Product Card Component

**File:** `src/components/ui/ProductCard.tsx`

#### Card Structure
```jsx
<motion.div
  variants={variants}
  whileHover={{ y: -5 }}
  className="group relative cursor-pointer"
>
```

#### Image Zoom Effect
```jsx
const [isHovered, setIsHovered] = useState(false);

<motion.img
  src={product.image}
  alt={product.name}
  className="w-full aspect-[3/4] object-cover"
  animate={{ scale: isHovered ? 1.08 : 1 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
/>
```

#### Quick Add Slide Up
```jsx
<motion.div
  initial={{ y: "100%", opacity: 0 }}
  animate={{ y: isHovered ? "0%" : "100%", opacity: isHovered ? 1 : 0 }}
  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
  className="absolute bottom-0 left-0 right-0 p-4 bg-background/95"
>
  <button className="w-full btn-refined-filled py-2">
    Quick Add
  </button>
</motion.div>
```

#### Badge Styling
```jsx
{product.isNew && (
  <span className="absolute top-4 left-4 px-3 py-1 bg-foreground text-background text-[10px] uppercase tracking-wider">
    New
  </span>
)}
```

### 6. Category Tiles

**File:** `src/components/home/CategoryTiles.tsx`

#### Card Animation
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
>
```

#### Image Zoom on Hover
```jsx
<div className="relative overflow-hidden aspect-[3/4] mb-6">
  <img
    src={category.image}
    alt={category.name}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />
</div>
```

#### Bottom Line Animation
```jsx
<div className="absolute bottom-0 left-0 right-0 h-px bg-foreground transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
```

### 7. Testimonials Carousel

**File:** `src/components/home/Testimonials.tsx`

#### Carousel Variants
```javascript
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};
```

#### Auto-Advance Timer
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    paginate(1);
  }, 7000); // 7 seconds
  
  return () => clearInterval(timer);
}, [page]);
```

#### Active Dot Style
```jsx
<button
  className={`w-2 h-2 rounded-full transition-all duration-300 ${
    index === page % testimonials.length
      ? 'bg-foreground w-8'
      : 'bg-foreground/30'
  }`}
/>
```

### 8. Newsletter Section

**File:** `src/components/home/Newsletter.tsx`

#### Image Animation
```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
```

#### Content Animation
```jsx
<motion.div
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
```

#### Submit Button with Icon Transition
```jsx
<button
  type="submit"
  disabled={isSubmitted}
  className="btn-refined-filled min-w-[120px]"
>
  {isSubmitted ? (
    <Check className="w-5 h-5" />
  ) : (
    "Subscribe"
  )}
</button>
```

### 9. Cart Drawer

**File:** `src/components/cart/CartDrawer.tsx`

#### Drawer Animation
```jsx
<motion.div
  initial={{ x: "100%" }}
  animate={{ x: isOpen ? 0 : "100%" }}
  exit={{ x: "100%" }}
  transition={{ type: "spring", damping: 25, stiffness: 200 }}
  className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-background shadow-2xl z-[60]"
>
```

#### Backdrop
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: isOpen ? 1 : 0 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[59]"
  onClick={closeCart}
/>
```

#### Free Shipping Progress
```jsx
const freeShippingThreshold = 500;
const progressPercentage = Math.min((subtotal / freeShippingThreshold) * 100, 100);

<div className="h-1 bg-muted rounded-full overflow-hidden">
  <motion.div
    className="h-full bg-foreground"
    initial={{ width: 0 }}
    animate={{ width: `${progressPercentage}%` }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  />
</div>
```

#### Item Entry Animation
```jsx
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.3 }}
>
```

### 10. Footer Component

**File:** `src/components/layout/Footer.tsx`

#### Back to Top Button
```jsx
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

<button
  onClick={scrollToTop}
  className="text-sm uppercase tracking-wider hover:text-primary transition-colors"
>
  Back to Top ↑
</button>
```

#### Social Links with Hover
```jsx
<a
  href="#"
  className="text-foreground/60 hover:text-foreground transition-colors"
>
  <Instagram className="w-5 h-5" />
</a>
```

---

## Responsive Design

### Breakpoints

```javascript
screens: {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
```

### Common Responsive Patterns

#### Mobile-First Typography
```jsx
<h1 className="text-4xl md:text-5xl lg:text-6xl">
```

#### Grid Columns
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

#### Padding Adjustments
```jsx
<section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 lg:py-32">
```

#### Hidden on Mobile
```jsx
<div className="hidden lg:block">
```

#### Mobile Menu
```jsx
<div className="lg:hidden">
```

### Touch Interactions

#### Prevent Zoom on Double Tap
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
```

---

## Code Examples

### 1. Creating an Animated Button

```jsx
import { motion } from "framer-motion";

function AnimatedButton({ children }) {
  return (
    <motion.button
      className="btn-refined"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
```

### 2. Parallax Section

```jsx
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y }}>
        <img src="/image.jpg" alt="Parallax" />
      </motion.div>
    </section>
  );
}
```

### 3. Stagger Animation Container

```jsx
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function StaggerList({ items }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item, i) => (
        <motion.div key={i} variants={item}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### 4. Custom Cursor Follow

```jsx
import { useEffect, useState } from "react";

function useMagneticEffect(ref) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      setPosition({ x, y });
    };
    
    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };
    
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);
  
  return position;
}

// Usage
function MagneticButton() {
  const ref = useRef(null);
  const { x, y } = useMagneticEffect(ref);
  
  return (
    <button
      ref={ref}
      className="magnetic"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      Hover Me
    </button>
  );
}
```

### 5. Scroll Progress Indicator

```jsx
import { useScroll, motion } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-foreground origin-left z-[100]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

### 6. Intersection Observer Fade In

```jsx
import { motion } from "framer-motion";

function FadeInSection({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### 7. Image Gallery with Lightbox

```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            onClick={() => setSelectedImage(img)}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          />
        ))}
      </div>
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          >
            <motion.img
              src={selectedImage}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-[90%] max-h-[90%]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## Best Practices

### Performance
- Use `viewport={{ once: true }}` for animations that should only trigger once
- Implement lazy loading for images below the fold
- Use `will-change` sparingly and only when necessary
- Prefer CSS animations for simple effects over JavaScript

### Accessibility
- Always include `alt` attributes on images
- Use semantic HTML elements
- Ensure sufficient color contrast (WCAG AA minimum)
- Make interactive elements keyboard accessible
- Include focus styles on interactive elements

### Code Organization
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use TypeScript for type safety
- Follow consistent naming conventions
- Comment complex logic

---

## Quick Reference

### Most Used Classes

```css
/* Layout */
.container
.grid
.flex
.items-center
.justify-between

/* Spacing */
.px-6 lg:px-12
.py-16 lg:py-24
.gap-8

/* Typography */
.text-sm
.tracking-wider
.uppercase
.font-light

/* Animations */
.transition-all
.duration-500
.ease-luxury
.hover:scale-105

/* Custom */
.btn-refined
.btn-refined-filled
.card-float
.link-hover
```

### Color Usage Guide

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Page Background | `bg-background` | `bg-background` |
| Card Background | `bg-card` | `bg-card` |
| Text | `text-foreground` | `text-foreground` |
| Muted Text | `text-muted-foreground` | `text-muted-foreground` |
| Primary Button | `bg-primary text-primary-foreground` | `bg-primary text-primary-foreground` |
| Border | `border-border` | `border-border` |

---

## File Structure Reference

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AnimatedRoutes.tsx
│   │   └── PageTransition.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── MarqueeBanner.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── CategoryTiles.tsx
│   │   ├── EditorialSection.tsx
│   │   ├── Gallery.tsx
│   │   ├── Testimonials.tsx
│   │   └── Newsletter.tsx
│   ├── cart/
│   │   └── CartDrawer.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── ProductCard.tsx
│       └── [other shadcn components]
├── pages/
│   ├── Index.tsx
│   ├── Collection.tsx
│   ├── Product.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── categories/
│       ├── Bags.tsx
│       ├── Dresses.tsx
│       ├── Jackets.tsx
│       ├── Knitwear.tsx
│       └── Accessories.tsx
├── data/
│   └── products.ts
├── contexts/
│   └── CartContext.tsx
├── assets/
│   └── [images]
├── index.css
└── main.tsx
```

---

## Version History

**Version:** 1.0.0  
**Last Updated:** 2025-11-29  
**Created For:** Maze - Timeless Elegance & Contemporary Luxury

---

**END OF DOCUMENTATION**

For questions or updates, refer to the project's GitHub repository or contact the development team.
