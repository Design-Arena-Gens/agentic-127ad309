import { INDUSTRIES, THEMES, type Industry, type Theme } from "../constants";

export interface ArchitectAnalysis {
  industry: Industry;
  theme: Theme;
  primaryGoal: string;
  targetAudience: string;
  keyFeatures: string[];
  designEffect: string;
}

export class ArchitectAgent {
  async analyze(userInput: string): Promise<ArchitectAnalysis> {
    // Parse user input and select best matching industry and theme
    const inputLower = userInput.toLowerCase();

    // Determine industry
    let detectedIndustry: Industry = "Technology";
    for (const industry of INDUSTRIES) {
      if (inputLower.includes(industry.toLowerCase())) {
        detectedIndustry = industry;
        break;
      }
    }

    // Detect keywords for industry
    if (inputLower.includes("shop") || inputLower.includes("store") || inputLower.includes("sell")) {
      detectedIndustry = "E-commerce";
    } else if (inputLower.includes("food") || inputLower.includes("menu") || inputLower.includes("restaurant")) {
      detectedIndustry = "Restaurant";
    } else if (inputLower.includes("health") || inputLower.includes("medical") || inputLower.includes("clinic")) {
      detectedIndustry = "Healthcare";
    } else if (inputLower.includes("property") || inputLower.includes("house") || inputLower.includes("real estate")) {
      detectedIndustry = "Real Estate";
    } else if (inputLower.includes("learn") || inputLower.includes("course") || inputLower.includes("education")) {
      detectedIndustry = "Education";
    } else if (inputLower.includes("gym") || inputLower.includes("fitness") || inputLower.includes("workout")) {
      detectedIndustry = "Fitness";
    } else if (inputLower.includes("law") || inputLower.includes("legal") || inputLower.includes("attorney")) {
      detectedIndustry = "Legal";
    } else if (inputLower.includes("photo") || inputLower.includes("photographer")) {
      detectedIndustry = "Photography";
    }

    // Determine theme based on keywords
    let selectedTheme: Theme = "Modern Minimalist";
    if (inputLower.includes("luxury") || inputLower.includes("premium") || inputLower.includes("elegant")) {
      selectedTheme = "Luxury Premium";
    } else if (inputLower.includes("bold") || inputLower.includes("vibrant") || inputLower.includes("colorful")) {
      selectedTheme = "Bold & Vibrant";
    } else if (inputLower.includes("corporate") || inputLower.includes("professional")) {
      selectedTheme = "Elegant Corporate";
    } else if (inputLower.includes("creative") || inputLower.includes("portfolio") || inputLower.includes("artist")) {
      selectedTheme = "Creative Portfolio";
    } else if (inputLower.includes("tech") || inputLower.includes("startup") || inputLower.includes("futuristic")) {
      selectedTheme = "Tech Startup";
    } else if (inputLower.includes("fun") || inputLower.includes("playful")) {
      selectedTheme = "Playful & Fun";
    }

    // Extract features
    const features: string[] = [];
    if (inputLower.includes("contact") || inputLower.includes("form")) {
      features.push("Contact Form");
    }
    if (inputLower.includes("booking") || inputLower.includes("appointment") || inputLower.includes("schedule")) {
      features.push("Booking System");
    }
    if (inputLower.includes("payment") || inputLower.includes("checkout") || inputLower.includes("pay")) {
      features.push("Payment Integration");
    }
    if (inputLower.includes("gallery") || inputLower.includes("portfolio")) {
      features.push("Image Gallery");
    }
    if (inputLower.includes("blog") || inputLower.includes("news")) {
      features.push("Blog Section");
    }
    if (inputLower.includes("testimonial") || inputLower.includes("review")) {
      features.push("Testimonials");
    }

    // Default features if none detected
    if (features.length === 0) {
      features.push("Hero Section", "About Section", "Services", "Contact Form");
    }

    const designEffect = selectedTheme === "Tech Startup"
      ? "glassmorphism"
      : selectedTheme === "Modern Minimalist"
      ? "neumorphism"
      : "gradient";

    return {
      industry: detectedIndustry,
      theme: selectedTheme,
      primaryGoal: `Create a ${selectedTheme.toLowerCase()} website for ${detectedIndustry.toLowerCase()}`,
      targetAudience: this.determineAudience(detectedIndustry),
      keyFeatures: features,
      designEffect,
    };
  }

  private determineAudience(industry: Industry): string {
    const audienceMap: Record<Industry, string> = {
      "E-commerce": "Online shoppers, product enthusiasts",
      "Restaurant": "Food lovers, local diners",
      "Healthcare": "Patients, health-conscious individuals",
      "Real Estate": "Home buyers, property investors",
      "Education": "Students, lifelong learners",
      "Fitness": "Fitness enthusiasts, health seekers",
      "Legal": "Individuals needing legal services",
      "Photography": "Clients seeking photography services",
      "Consulting": "Businesses seeking expertise",
      "Marketing Agency": "Businesses needing marketing",
      "Technology": "Tech-savvy users, early adopters",
      "Finance": "Investors, financial planners",
      "Travel": "Travelers, adventure seekers",
      "Entertainment": "Entertainment seekers",
      "Non-Profit": "Donors, volunteers, supporters",
      "Fashion": "Fashion-conscious consumers",
      "Automotive": "Car buyers, automotive enthusiasts",
      "Construction": "Property developers, homeowners",
      "Beauty & Spa": "Beauty enthusiasts, wellness seekers",
      "Event Planning": "Event organizers, party hosts",
      "Interior Design": "Homeowners, business owners",
      "Pet Services": "Pet owners, animal lovers",
      "Agriculture": "Farmers, agricultural businesses",
      "Manufacturing": "B2B buyers, industrial clients",
    };
    return audienceMap[industry];
  }
}
