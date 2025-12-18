import { ArchitectAnalysis } from "./architect-agent";

export interface WebsiteContent {
  heroHeadline: string;
  heroSubheadline: string;
  aboutTitle: string;
  aboutText: string;
  services: Array<{ title: string; description: string }>;
  ctaText: string;
  metaTitle: string;
  metaDescription: string;
  structuredData: any;
}

export class CopywriterAgent {
  async generateContent(analysis: ArchitectAnalysis): Promise<WebsiteContent> {
    const { industry, theme, targetAudience } = analysis;

    const heroHeadlines: Record<string, string> = {
      "E-commerce": "Discover Your Perfect Products",
      "Restaurant": "Experience Culinary Excellence",
      "Healthcare": "Your Health, Our Priority",
      "Real Estate": "Find Your Dream Home",
      "Education": "Unlock Your Learning Potential",
      "Fitness": "Transform Your Body & Mind",
      "Legal": "Expert Legal Guidance",
      "Photography": "Capturing Life's Precious Moments",
      "Consulting": "Strategic Solutions for Success",
      "Marketing Agency": "Grow Your Brand with Impact",
      "Technology": "Innovation That Transforms",
      "Finance": "Smart Financial Planning",
      "Travel": "Your Next Adventure Awaits",
      "Entertainment": "Experience the Extraordinary",
      "Non-Profit": "Making a Difference Together",
      "Fashion": "Style That Speaks",
      "Automotive": "Drive Your Dreams",
      "Construction": "Building Excellence",
      "Beauty & Spa": "Reveal Your Natural Beauty",
      "Event Planning": "Unforgettable Events, Perfectly Planned",
      "Interior Design": "Spaces That Inspire",
      "Pet Services": "Premium Care for Your Pets",
      "Agriculture": "Sustainable Farming Solutions",
      "Manufacturing": "Quality Manufacturing Excellence",
    };

    const services = this.generateServices(industry);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": `${industry} Business`,
      "description": `Professional ${industry.toLowerCase()} services`,
      "url": "https://example.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "English"
      }
    };

    return {
      heroHeadline: heroHeadlines[industry] || "Welcome to Excellence",
      heroSubheadline: `Premium ${industry.toLowerCase()} services tailored for ${targetAudience.toLowerCase()}`,
      aboutTitle: `About Our ${industry} Services`,
      aboutText: `We are dedicated to providing exceptional ${industry.toLowerCase()} services that exceed expectations. Our team of experts combines years of experience with cutting-edge approaches to deliver outstanding results for our clients.`,
      services,
      ctaText: industry === "E-commerce" ? "Shop Now" : "Get Started",
      metaTitle: `${industry} Services | Premium ${theme} Solutions`,
      metaDescription: `Discover professional ${industry.toLowerCase()} services with our ${theme.toLowerCase()} approach. Serving ${targetAudience.toLowerCase()} with excellence and dedication.`,
      structuredData,
    };
  }

  private generateServices(industry: string): Array<{ title: string; description: string }> {
    const servicesMap: Record<string, Array<{ title: string; description: string }>> = {
      "E-commerce": [
        { title: "Quality Products", description: "Curated selection of premium items" },
        { title: "Fast Shipping", description: "Quick delivery to your doorstep" },
        { title: "Secure Checkout", description: "Safe and encrypted transactions" },
      ],
      "Restaurant": [
        { title: "Fine Dining", description: "Exquisite culinary creations" },
        { title: "Fresh Ingredients", description: "Locally sourced, organic produce" },
        { title: "Exceptional Service", description: "Memorable dining experience" },
      ],
      "Healthcare": [
        { title: "Expert Care", description: "Experienced medical professionals" },
        { title: "Modern Facilities", description: "State-of-the-art equipment" },
        { title: "Patient-Centered", description: "Personalized treatment plans" },
      ],
      "Real Estate": [
        { title: "Property Listings", description: "Extensive database of properties" },
        { title: "Expert Agents", description: "Knowledgeable real estate professionals" },
        { title: "Market Insights", description: "Data-driven market analysis" },
      ],
      "Education": [
        { title: "Expert Instructors", description: "Learn from industry professionals" },
        { title: "Flexible Learning", description: "Study at your own pace" },
        { title: "Certification", description: "Recognized credentials" },
      ],
    };

    return servicesMap[industry] || [
      { title: "Professional Service", description: "High-quality solutions" },
      { title: "Expert Team", description: "Experienced professionals" },
      { title: "Customer Support", description: "Dedicated assistance" },
    ];
  }
}
