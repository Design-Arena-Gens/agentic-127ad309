import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexaForge Pro - AI-Powered Website Builder",
  description: "Create stunning websites with AI agents in minutes. Premium website builder with intelligent design, content generation, and deployment.",
  keywords: "AI website builder, website generator, automated web design, AI design tool",
  openGraph: {
    title: "NexaForge Pro - AI-Powered Website Builder",
    description: "Create stunning websites with AI agents in minutes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
