import { ArchitectAnalysis } from "./architect-agent";

export interface IntegrationConfig {
  contactForm: boolean;
  bookingSystem: boolean;
  paymentProcessing: boolean;
  analytics: boolean;
  chatWidget: boolean;
}

export class IntegrationAgent {
  async configure(analysis: ArchitectAnalysis): Promise<IntegrationConfig> {
    const { keyFeatures, industry } = analysis;

    const config: IntegrationConfig = {
      contactForm: keyFeatures.includes("Contact Form") || true, // Always include contact
      bookingSystem: keyFeatures.includes("Booking System") ||
        ["Healthcare", "Restaurant", "Fitness", "Beauty & Spa", "Legal"].includes(industry),
      paymentProcessing: keyFeatures.includes("Payment Integration") ||
        ["E-commerce", "Fitness", "Education"].includes(industry),
      analytics: true, // Always include analytics
      chatWidget: ["E-commerce", "Healthcare", "Technology", "Consulting"].includes(industry),
    };

    return config;
  }

  generateStripeProducts(industry: string): Array<{ name: string; price: number }> {
    const productsMap: Record<string, Array<{ name: string; price: number }>> = {
      "E-commerce": [
        { name: "Premium Product", price: 99.99 },
        { name: "Standard Product", price: 49.99 },
        { name: "Basic Product", price: 29.99 },
      ],
      "Fitness": [
        { name: "Annual Membership", price: 599.99 },
        { name: "Monthly Membership", price: 59.99 },
        { name: "Day Pass", price: 19.99 },
      ],
      "Education": [
        { name: "Full Course", price: 199.99 },
        { name: "Module Access", price: 49.99 },
        { name: "Single Lesson", price: 9.99 },
      ],
    };

    return productsMap[industry] || [
      { name: "Premium Service", price: 99.99 },
      { name: "Standard Service", price: 49.99 },
    ];
  }
}
