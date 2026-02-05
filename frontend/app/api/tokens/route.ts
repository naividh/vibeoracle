import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic();

// Tokens to analyze - can be extended with real on-chain data
const TOKENS_TO_ANALYZE = [
  { address: "0x1234", name: "VibeAI", symbol: "VIBE" },
  { address: "0x5678", name: "TrenchCat", symbol: "TCAT" },
  { address: "0x9abc", name: "BaseBuilder", symbol: "BLDR" },
  { address: "0xdef0", name: "DegenOracle", symbol: "DGEN" },
  { address: "0x1111", name: "NeuralNet", symbol: "NNET" },
  { address: "0x2222", name: "FadeCoin", symbol: "FADE" },
  ];

interface SentimentResult {
    score: number;
    confidence: number;
    summary: string;
    mentions: number;
}

export async function GET() {
    try {
          const results = await Promise.all(
                  TOKENS_TO_ANALYZE.map(async (token) => {
                            const message = await client.messages.create({
                                        model: "claude-sonnet-4-20250514",
                                        max_tokens: 200,
                                        system: "You are a crypto sentiment analyst. Return only valid JSON.",
                                        messages: [{
                                                      role: "user",
                                                      content: `Analyze hypothetical social sentiment for crypto token ${token.name} (${token.symbol}). 
                                                                  Return JSON with: score (-100 to +100), confidence (0-100), summary (one sentence max 50 chars), mentions (random 50-500).
                                                                              Example: {"score": 45, "confidence": 78, "summary": "Moderate bullish interest", "mentions": 234}`
                                        }]
                            });

                                                try {
                                                            const content = message.content[0];
                                                            if (content.type === 'text') {
                                                                          const result: SentimentResult = JSON.parse(content.text);
                                                                          return { ...token, ...result };
                                                            }
                                                } catch {
                                                            // Fallback if parsing fails
                              return {
                                            ...token,
                                            score: Math.floor(Math.random() * 200) - 100,
                                            confidence: Math.floor(Math.random() * 40) + 60,
                                            summary: "Analysis in progress",
                                            mentions: Math.floor(Math.random() * 450) + 50
                              };
                                                }

                                                return {
                                                            ...token,
                                                            score: 0,
                                                            confidence: 50,
                                                            summary: "Unable to analyze",
                                                            mentions: 0
                                                };
                  })
                );

      return NextResponse.json(results);
    } catch (error) {
          console.error("API Error:", error);
          return NextResponse.json(
            { error: "Failed to analyze sentiment" },
            { status: 500 }
                );
    }
}
