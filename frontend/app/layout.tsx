import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeOracle - AI Sentiment Oracle for Trenches",
  description: "Real-time AI-powered sentiment analysis for tokens on Base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
