import type { Metadata } from "next";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';

export const metadata: Metadata = {
    title: "VibeOracle - AI Sentiment Oracle for Trenches",
    description: "Real-time AI-powered sentiment analysis for tokens on Base. Know the vibe before you ape.",
    keywords: ["crypto", "sentiment", "AI", "Base", "oracle", "trading"],
    openGraph: {
          title: "VibeOracle - Read the Vibes",
          description: "AI-powered sentiment oracle for Trenches tokens on Base",
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
                <body className="bg-[#0a0a0f] antialiased">
                        <Providers>{children}</Providers>Providers>
                </body>body>
          </html>html>
        );
}</html>
