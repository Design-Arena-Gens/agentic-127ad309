export const INDUSTRIES = [
  "E-commerce",
  "Restaurant",
  "Healthcare",
  "Real Estate",
  "Education",
  "Fitness",
  "Legal",
  "Photography",
  "Consulting",
  "Marketing Agency",
  "Technology",
  "Finance",
  "Travel",
  "Entertainment",
  "Non-Profit",
  "Fashion",
  "Automotive",
  "Construction",
  "Beauty & Spa",
  "Event Planning",
  "Interior Design",
  "Pet Services",
  "Agriculture",
  "Manufacturing",
] as const;

export const THEMES = [
  "Modern Minimalist",
  "Bold & Vibrant",
  "Elegant Corporate",
  "Creative Portfolio",
  "Tech Startup",
  "Luxury Premium",
  "Playful & Fun",
  "Professional Business",
  "Artistic & Expressive",
  "Clean & Simple",
  "Dark & Mysterious",
  "Bright & Energetic",
  "Vintage Classic",
  "Futuristic",
  "Nature & Organic",
  "Industrial",
  "Boutique Chic",
  "Medical & Health",
  "Educational",
  "Community Focused",
] as const;

export const COLOR_PALETTES = {
  "Modern Minimalist": {
    primary: "#1a1a1a",
    secondary: "#ffffff",
    accent: "#4a90e2",
    background: "#f5f5f5",
  },
  "Bold & Vibrant": {
    primary: "#ff6b6b",
    secondary: "#4ecdc4",
    accent: "#ffe66d",
    background: "#ffffff",
  },
  "Elegant Corporate": {
    primary: "#2c3e50",
    secondary: "#34495e",
    accent: "#3498db",
    background: "#ecf0f1",
  },
  "Creative Portfolio": {
    primary: "#8e44ad",
    secondary: "#e74c3c",
    accent: "#f39c12",
    background: "#ffffff",
  },
  "Tech Startup": {
    primary: "#667eea",
    secondary: "#764ba2",
    accent: "#f093fb",
    background: "#0f0f1e",
  },
  "Luxury Premium": {
    primary: "#1a1a1a",
    secondary: "#d4af37",
    accent: "#c0c0c0",
    background: "#ffffff",
  },
} as const;

export const DESIGN_EFFECTS = ["glassmorphism", "neumorphism", "gradient", "flat", "material"] as const;

export type Industry = (typeof INDUSTRIES)[number];
export type Theme = (typeof THEMES)[number];
export type DesignEffect = (typeof DESIGN_EFFECTS)[number];
