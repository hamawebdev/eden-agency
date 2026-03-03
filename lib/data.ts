import { ProductSchema, type Product } from "./schemas";

// Sample products data - types are automatically inferred
export const sampleProducts = [
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    price: 900,
    image: "/products/chatgpt.webp",
    rating: 5.0,
    reviews: 124,
    category: "AI",
    badge: "Best Seller",
    description: "Pricing:\n- 900 DA per month\n- 2000 DA for 3 months\n- 7500 DA for 1 year",
    features: [
      "100% official ChatGPT Plus subscription",
      "Access to latest models",
      "unlimited file upload",
      "100% safe and guaranteed accounts",
      "Fast support for easy account activation"
    ]
  },
  {
    id: "capcut",
    name: "CapCut Pro",
    price: 900,
    image: "/products/capcut.webp",
    rating: 4.8,
    reviews: 89,
    category: "Editing",
    description: "Pricing:\n- 900 DA per month\n- 2000 DA for 3 months\n- 7500 DA for 1 year",
    features: [
      "Full access to all premium tools: ad-free and unlimited",
      "Advanced filters and effects for high-quality videos",
      "Exclusive transitions and animations for a professional touch",
      "Export in 1080p and 4K without watermarks",
      "Rich music and sound effects library",
      "Ready-made templates for fast and professional editing",
      "100GB secure storage for your videos and files",
      "100% safe and guaranteed accounts",
      "Fast support for easy account activation"
    ]
  },
  {
    id: "adobe",
    name: "Adobe Creative Cloud",
    price: 1500,
    image: "/products/adobe.webp",
    rating: 4.9,
    reviews: 156,
    category: "Design",
    badge: "Popular",
    description: "Pricing:\n- 1500 DA per month\n\n📌 Note: Also includes Adobe Firefly and Adobe Stock (professional stock photos and content).",
    features: [
      "100% official Adobe apps",
      "Activation via your personal email",
      "Use on two devices (PC / Mac)",
      "Direct Adobe technical support",
      "Full warranty for the entire subscription period"
    ]
  },
  {
    id: "perplexity",
    name: "Perplexity Pro",
    price: 1000,
    image: "/products/perplexity.webp",
    rating: 4.7,
    reviews: 67,
    category: "AI",
    description: "Pricing:\n- 1000 DA per month"
  }
] as const;

// Validate and export products with proper typing
export const products: Product[] = sampleProducts.map((product) => ProductSchema.parse(product));

// Categories data with inferred types
export const categories = [
  {
    name: "AI",
    href: "/products?category=AI",
    count: "2 products"
  },
  {
    name: "Editing",
    href: "/products?category=Editing",
    count: "1 product"
  },
  {
    name: "Design",
    href: "/products?category=Design",
    count: "1 product"
  }
] as const;

// Testimonials data with inferred types
export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Designer",
    content:
      "Amazing quality products and exceptional customer service. I've been shopping here for over a year and never been disappointed.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Developer",
    content:
      "Fast shipping, great prices, and the products always exceed my expectations. Highly recommend this store to everyone.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60"
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Marketing Manager",
    content:
      "The attention to detail in both products and packaging is incredible. This is my go-to store for premium tech accessories.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60"
  }
] as const;

// Export inferred types
export type Category = (typeof categories)[number];
export type Testimonial = (typeof testimonials)[number];
