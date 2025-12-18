"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ForgeEngine, ForgeResult } from "@/lib/forge-engine";
import { Sparkles, Wand2, Rocket } from "lucide-react";

export function ForgeBuilder() {
  const [userInput, setUserInput] = useState("");
  const [isForging, setIsForging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [result, setResult] = useState<ForgeResult | null>(null);

  const handleForge = async () => {
    if (!userInput.trim()) return;

    setIsForging(true);
    setProgress(0);
    setResult(null);

    const engine = new ForgeEngine();

    try {
      const forgeResult = await engine.forge(
        userInput,
        (step, progressValue) => {
          setProgress(progressValue);
          setProgressText(step);
        }
      );

      setResult(forgeResult);
    } catch (error) {
      console.error("Forge error:", error);
      alert("Failed to forge website. Please try again.");
    } finally {
      setIsForging(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Wand2 className="w-12 h-12 text-purple-600 mr-2" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              NexaForge Pro
            </h1>
          </div>
          <p className="text-xl text-gray-600">AI-Powered Website Builder</p>
          <p className="text-sm text-gray-500 mt-2">Describe your dream website and watch AI agents build it</p>
        </motion.div>

        <Card className="max-w-2xl mx-auto shadow-2xl border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Describe Your Website
            </CardTitle>
            <CardDescription>
              Tell us about your business, industry, and style preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="e.g., 'Create a modern restaurant website with booking system' or 'Build an e-commerce store for luxury fashion'"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleForge()}
                className="text-lg p-6 h-auto"
                disabled={isForging}
              />
              <Button
                onClick={handleForge}
                disabled={isForging || !userInput.trim()}
                className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isForging ? (
                  <>
                    <Wand2 className="w-5 h-5 mr-2 animate-spin" />
                    Forging Website...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5 mr-2" />
                    Forge Website
                  </>
                )}
              </Button>

              <AnimatePresence>
                {isForging && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-center text-gray-600">{progressText}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 max-w-6xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center mb-8">Your Website is Ready!</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Website Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Industry:</strong> {result.analysis.industry}</p>
                    <p><strong>Theme:</strong> {result.analysis.theme}</p>
                    <p><strong>Target Audience:</strong> {result.analysis.targetAudience}</p>
                    <p><strong>Design Effect:</strong> {result.design.designEffect}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Features Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {result.analysis.keyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Preview Section */}
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>Your generated website preview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border rounded-lg overflow-hidden"
                    style={{
                      backgroundColor: result.design.colorPalette.background,
                      color: result.design.colorPalette.primary,
                    }}
                  >
                    {/* Hero Section */}
                    <div
                      className={`relative px-8 py-24 text-center ${
                        result.design.designEffect === "glassmorphism" ? "glass-effect" : ""
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${result.design.colorPalette.primary}22, ${result.design.colorPalette.accent}22)`,
                      }}
                    >
                      <h1
                        className={`text-5xl mb-4 ${result.design.typography.heading}`}
                        style={{ color: result.design.colorPalette.primary }}
                      >
                        {result.content.heroHeadline}
                      </h1>
                      <p
                        className={`text-xl mb-8 ${result.design.typography.body}`}
                        style={{ color: result.design.colorPalette.secondary }}
                      >
                        {result.content.heroSubheadline}
                      </p>
                      <button
                        className="px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
                        style={{
                          backgroundColor: result.design.colorPalette.accent,
                          color: result.design.colorPalette.background,
                        }}
                      >
                        {result.content.ctaText}
                      </button>
                    </div>

                    {/* Services Section */}
                    <div className="px-8 py-16">
                      <h2
                        className={`text-3xl text-center mb-12 ${result.design.typography.heading}`}
                        style={{ color: result.design.colorPalette.primary }}
                      >
                        Our Services
                      </h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {result.content.services.map((service, idx) => (
                          <div
                            key={idx}
                            className="p-6 rounded-lg border"
                            style={{
                              borderColor: result.design.colorPalette.accent + "44",
                            }}
                          >
                            <h3
                              className={`text-xl font-semibold mb-2 ${result.design.typography.heading}`}
                              style={{ color: result.design.colorPalette.accent }}
                            >
                              {service.title}
                            </h3>
                            <p
                              className={result.design.typography.body}
                              style={{ color: result.design.colorPalette.secondary }}
                            >
                              {service.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* About Section */}
                    <div
                      className="px-8 py-16"
                      style={{
                        backgroundColor: result.design.colorPalette.primary + "11",
                      }}
                    >
                      <h2
                        className={`text-3xl text-center mb-6 ${result.design.typography.heading}`}
                        style={{ color: result.design.colorPalette.primary }}
                      >
                        {result.content.aboutTitle}
                      </h2>
                      <p
                        className={`text-center max-w-3xl mx-auto ${result.design.typography.body}`}
                        style={{ color: result.design.colorPalette.secondary }}
                      >
                        {result.content.aboutText}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <Button className="flex-1" variant="outline">
                      Edit Design
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                      Deploy Website
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
