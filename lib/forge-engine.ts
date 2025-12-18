import { ArchitectAgent, ArchitectAnalysis } from "./agents/architect-agent";
import { CopywriterAgent, WebsiteContent } from "./agents/copywriter-agent";
import { VisualAgent, VisualDesign } from "./agents/visual-agent";
import { IntegrationAgent, IntegrationConfig } from "./agents/integration-agent";

export interface ForgeResult {
  analysis: ArchitectAnalysis;
  content: WebsiteContent;
  design: VisualDesign;
  integrations: IntegrationConfig;
}

export class ForgeEngine {
  private architectAgent: ArchitectAgent;
  private copywriterAgent: CopywriterAgent;
  private visualAgent: VisualAgent;
  private integrationAgent: IntegrationAgent;

  constructor() {
    this.architectAgent = new ArchitectAgent();
    this.copywriterAgent = new CopywriterAgent();
    this.visualAgent = new VisualAgent();
    this.integrationAgent = new IntegrationAgent();
  }

  async forge(userInput: string, onProgress?: (step: string, progress: number) => void): Promise<ForgeResult> {
    try {
      // Step 1: Architect Agent Analysis (25%)
      onProgress?.("Analyzing requirements...", 25);
      const analysis = await this.architectAgent.analyze(userInput);

      // Step 2: Copywriter Agent Content Generation (50%)
      onProgress?.("Generating content...", 50);
      const content = await this.copywriterAgent.generateContent(analysis);

      // Step 3: Visual Agent Design Creation (75%)
      onProgress?.("Crafting visual design...", 75);
      const design = await this.visualAgent.generateDesign(analysis);

      // Step 4: Integration Agent Configuration (90%)
      onProgress?.("Configuring integrations...", 90);
      const integrations = await this.integrationAgent.configure(analysis);

      // Complete (100%)
      onProgress?.("Website ready!", 100);

      return {
        analysis,
        content,
        design,
        integrations,
      };
    } catch (error) {
      console.error("Forge Engine Error:", error);
      throw new Error("Failed to forge website. Please try again.");
    }
  }
}
