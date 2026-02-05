"use client";

import { useState, useCallback } from "react";

interface Token {
      address: string;
      name: string;
      symbol: string;
      score: number;
      confidence: number;
      summary: string;
      mentions: number;
      lastUpdated?: string;
      manipulationRisk?: 'low' | 'medium' | 'high';
      trend?: 'up' | 'down' | 'stable';
      scoreHistory?: number[];
}

const INITIAL_TOKENS: Token[] = [
    { address: "0x1234...5678", name: "VibeAI", symbol: "VIBE", score: 78, confidence: 85, summary: "Strong bullish sentiment with organic growth signals", mentions: 342, lastUpdated: "2 min ago", manipulationRisk: "low", trend: "up", scoreHistory: [65, 70, 72, 75, 78] },
    { address: "0x5678...9abc", name: "TrenchCat", symbol: "TCAT", score: 45, confidence: 72, summary: "Moderate interest, community building phase", mentions: 189, lastUpdated: "5 min ago", manipulationRisk: "low", trend: "stable", scoreHistory: [40, 42, 44, 43, 45] },
    { address: "0x9abc...def0", name: "BaseBuilder", symbol: "BLDR", score: 92, confidence: 91, summary: "Extremely bullish - strong dev activity detected", mentions: 567, lastUpdated: "1 min ago", manipulationRisk: "low", trend: "up", scoreHistory: [80, 85, 88, 90, 92] },
    { address: "0xdef0...1111", name: "DegenOracle", symbol: "DGEN", score: -15, confidence: 68, summary: "Mixed signals - possible coordination detected", mentions: 98, lastUpdated: "8 min ago", manipulationRisk: "medium", trend: "down", scoreHistory: [10, 5, 0, -8, -15] },
    { address: "0x1111...2222", name: "NeuralNet", symbol: "NNET", score: 61, confidence: 79, summary: "Positive AI sentiment, growing adoption", mentions: 234, lastUpdated: "3 min ago", manipulationRisk: "low", trend: "up", scoreHistory: [50, 53, 55, 58, 61] },
    { address: "0x2222...3333", name: "FadeCoin", symbol: "FADE", score: -52, confidence: 88, summary: "Bearish outlook - high sell pressure signals", mentions: 156, lastUpdated: "4 min ago", manipulationRisk: "high", trend: "down", scoreHistory: [-30, -35, -42, -48, -52] },
    ];

const CONTRACT_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f...";

function SentimentBar({ score }: { score: number }) {
      const width = (score + 100) / 2;
      const color = score > 20 ? "bg-green-500" : score < -20 ? "bg-red-500" : "bg-orange-500";
      return (
              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600 z-10" />
                    <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${width}%` }} />
              </div>div>
            );
}

function MiniChart({ data }: { data: number[] }) {
      const max = Math.max(...data.map(Math.abs), 1);
      return (
              <div className="flex items-end gap-0.5 h-8">
                  {data.map((val, i) => {
                          const height = Math.abs(val) / max * 100;
                          const color = val > 0 ? "bg-green-500" : "bg-red-500";
                          return <div key={i} className={`w-1.5 ${color} rounded-sm`} style={{ height: `${Math.max(height, 10)}%`, opacity: 0.6 + (i * 0.1) }} />;
              })}
              </div>div>
            );
}

function TrendIndicator({ trend }: { trend: 'up' | 'down' | 'stable' }) {
      const icons = { up: "↑", down: "↓", stable: "→" };
      const colors = { up: "text-green-400", down: "text-red-400", stable: "text-gray-400" };
      return <span className={`${colors[trend]} text-lg font-bold`}>{icons[trend]}</span>span>;
}

function ManipulationBadge({ risk }: { risk: 'low' | 'medium' | 'high' }) {
      if (risk === 'low') return null;
      const styles = {
              medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
              high: "bg-red-500/20 text-red-400 border-red-500/30"
      };
      return (
              <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[risk]}`}>
                  {risk === 'high' ? '⚠️ Suspicious' : '⚡ Caution'}
              </span>span>
            );
}

function TokenCard({ token, onClick }: { token: Token; onClick: () => void }) {
      const scoreIcon = token.score > 60 ? "🔥" : token.score > 0 ? "✓" : "✗";
      
      return (
              <div onClick={onClick} className="bg-[#12121a] rounded-xl p-5 border border-gray-800 hover:border-orange-500/50 transition-all cursor-pointer hover:scale-[1.02]">
                    <div className="flex justify-between items-start mb-3">
                            <div>
                                      <div className="flex items-center gap-2">
                                                  <h3 className="font-bold text-lg">{token.name}</h3>h3>
                                          {token.manipulationRisk && <ManipulationBadge risk={token.manipulationRisk} />}
                                      </div>div>
                                      <span className="text-sm text-gray-400">${token.symbol}</span>span>
                            </div>div>
                            <div className="flex items-center gap-2">
                                {token.trend && <TrendIndicator trend={token.trend} />}
                                      <span className="text-2xl">{scoreIcon}</span>span>
                            </div>div>
                    </div>div>
                    <SentimentBar score={token.score} />
                    <div className="flex justify-between items-center mt-2 mb-3">
                            <span className={`text-xl font-bold ${token.score > 0 ? "text-green-400" : "text-red-400"}`}>
                                {token.score > 0 ? "+" : ""}{token.score}
                            </span>span>
                            <div className="flex items-center gap-3">
                                {token.scoreHistory && <MiniChart data={token.scoreHistory} />}
                                      <span className="text-sm text-gray-400">{token.confidence}%</span>span>
                            </div>div>
                    </div>div>
                    <p className="text-sm text-gray-300">{token.summary}</p>p>
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-3 pt-3 border-t border-gray-800">
                            <span>{token.mentions} mentions</span>span>
                            <span>{token.lastUpdated || "Just now"}</span>span>
                    </div>div>
              </div>div>
            );
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
      return (
              <div className="relative">
                    <input type="text" placeholder="Search tokens or paste address..." value={value} onChange={(e) => onChange(e.target.value)}
                                className="w-full md:w-80 bg-[#12121a] border border-gray-800 rounded-lg px-4 py-2 text-sm focus:border-orange-500 focus:outline-none transition-colors" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>span>
              </div>div>
            );
}

function TokenModal({ token, onClose }: { token: Token; onClose: () => void }) {
      return (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
                    <div className="bg-[#12121a] rounded-2xl p-6 max-w-lg w-full border border-gray-800" onClick={e => e.stopPropagation()}>
                            <div className="flex justify-between items-start mb-4">
                                      <div>
                                                  <h2 className="text-2xl font-bold">{token.name}</h2>h2>
                                                  <p className="text-gray-400">${token.symbol}</p>p>
                                      </div>div>
                                      <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>button>
                            </div>div>
                            <div className="space-y-4">
                                      <div className="bg-[#0a0a0f] rounded-xl p-4">
                                                  <div className="flex justify-between items-center mb-2">
                                                                <span className="text-gray-400">Sentiment Score</span>span>
                                                                <span className={`text-3xl font-bold ${token.score > 0 ? "text-green-400" : "text-red-400"}`}>
                                                                    {token.score > 0 ? "+" : ""}{token.score}
                                                                </span>span>
                                                  </div>div>
                                                  <SentimentBar score={token.score} />
                                      </div>div>
                                      <div className="grid grid-cols-2 gap-4">
                                                  <div className="bg-[#0a0a0f] rounded-xl p-4">
                                                                <span className="text-gray-400 text-sm">Confidence</span>span>
                                                                <p className="text-2xl font-bold">{token.confidence}%</p>p>
                                                  </div>div>
                                                  <div className="bg-[#0a0a0f] rounded-xl p-4">
                                                                <span className="text-gray-400 text-sm">Mentions</span>span>
                                                                <p className="text-2xl font-bold">{token.mentions}</p>p>
                                                  </div>div>
                                      </div>div>
                                      <div className="bg-[#0a0a0f] rounded-xl p-4">
                                                  <span className="text-gray-400 text-sm">AI Analysis</span>span>
                                                  <p className="mt-1">{token.summary}</p>p>
                                      </div>div>
                                      <div className="bg-[#0a0a0f] rounded-xl p-4">
                                                  <span className="text-gray-400 text-sm">Contract Address</span>span>
                                                  <p className="font-mono text-sm mt-1 text-orange-400">{token.address}</p>p>
                                      </div>div>
                                {token.scoreHistory && (
                              <div className="bg-[#0a0a0f] rounded-xl p-4">
                                            <span className="text-gray-400 text-sm">Score History (24h)</span>span>
                                            <div className="mt-2 flex items-end gap-1 h-16">
                                                {token.scoreHistory.map((val, i) => {
                                                    const height = (val + 100) / 2;
                                                    const color = val > 0 ? "bg-green-500" : "bg-red-500";
                                                    return <div key={i} className={`flex-1 ${color} rounded-t`} style={{ height: `${height}%` }} />;
                              })}
                                            </div>div>
                              </div>div>
                                      )}
                            </div>div>
                    </div>div>
              </div>div>
            );
}

export default function Home() {
      const [filter, setFilter] = useState("all");
      const [search, setSearch] = useState("");
      const [tokens, setTokens] = useState<Token[]>(INITIAL_TOKENS);
      const [loading, setLoading] = useState(false);
      const [selectedToken, setSelectedToken] = useState<Token | null>(null);
      const [lastRefresh, setLastRefresh] = useState(new Date());
    
      const refreshData = useCallback(async () => {
              setLoading(true);
              await new Promise(resolve => setTimeout(resolve, 1000));
              setTokens(INITIAL_TOKENS.map(t => ({
                        ...t,
                        score: Math.max(-100, Math.min(100, t.score + Math.floor(Math.random() * 10) - 5)),
                        lastUpdated: "Just now"
              })));
              setLastRefresh(new Date());
              setLoading(false);
      }, []);
    
      const filteredTokens = tokens
              .filter(t => filter === "bullish" ? t.score > 0 : filter === "bearish" ? t.score < 0 : true)
              .filter(t => search === "" || t.name.toLowerCase().includes(search.toLowerCase()) || t.symbol.toLowerCase().includes(search.toLowerCase()) || t.address.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) => b.score - a.score);
    
      return (
              <main className="min-h-screen bg-[#0a0a0f] text-white">
                    <header className="border-b border-gray-800 px-6 py-4 sticky top-0 bg-[#0a0a0f]/95 backdrop-blur z-40">
                            <div className="max-w-7xl mx-auto flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-xl font-bold">V</div>div>
                                                  <div>
                                                                <h1 className="text-xl font-bold">VibeOracle</h1>h1>
                                                                <p className="text-xs text-gray-400">AI Sentiment Oracle on Base</p>p>
                                                  </div>div>
                                      </div>div>
                                      <div className="flex items-center gap-4">
                                                  <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
                                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                                <span>Live on Base</span>span>
                                                  </div>div>
                                                  <button className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
                                                                Connect Wallet
                                                  </button>button>
                                      </div>div>
                            </div>div>
                    </header>header>
              
                    <section className="px-6 py-12 text-center">
                            <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">Read the Vibes</h2>h2>
                            <p className="mt-4 text-gray-400 text-lg">AI-powered sentiment analysis for Trenches tokens on Base</p>p>
                            <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
                                      <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">⛓️ Built on Base</span>span>
                                      <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">⚡ Powered by Claude AI</span>span>
                            </div>div>
                    </section>section>
              
                    <section className="px-6 max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
                                      <div className="flex gap-2">
                                          {["all", "bullish", "bearish"].map(f => (
                                <button key={f} onClick={() => setFilter(f)}
                                                    className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${filter === f ? "bg-orange-500 text-white" : "bg-[#12121a] text-gray-400 border border-gray-800 hover:border-gray-600"}`}>
                                    {f === "bullish" && "🟢 "}{f === "bearish" && "🔴 "}{f}
                                </button>button>
                              ))}
                                      </div>div>
                                      <div className="flex items-center gap-3">
                                                  <SearchBar value={search} onChange={setSearch} />
                                                  <button onClick={refreshData} disabled={loading}
                                                                    className="px-4 py-2 rounded-lg bg-[#12121a] border border-gray-800 hover:border-orange-500 transition-all text-sm flex items-center gap-2">
                                                                <span className={loading ? "animate-spin" : ""}>🔄</span>span>
                                                      {loading ? "Refreshing..." : "Refresh"}
                                                  </button>button>
                                      </div>div>
                            </div>div>
                    
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                              <div key={i} className="bg-[#12121a] rounded-xl p-5 border border-gray-800 animate-pulse">
                                                              <div className="h-6 bg-gray-800 rounded w-1/2 mb-3" />
                                                              <div className="h-3 bg-gray-800 rounded w-full mb-3" />
                                                              <div className="h-8 bg-gray-800 rounded w-1/3 mb-3" />
                                                              <div className="h-4 bg-gray-800 rounded w-full" />
                                              </div>div>
                                            ))}
                            </div>div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredTokens.map(token => (
                                              <TokenCard key={token.address} token={token} onClick={() => setSelectedToken(token)} />
                                            ))}
                            </div>div>
                            )}
                    
                        {filteredTokens.length === 0 && !loading && (
                            <div className="text-center py-12 text-gray-400">
                                        <p className="text-lg">No tokens found</p>p>
                                        <p className="text-sm mt-2">Try adjusting your search or filter</p>p>
                            </div>div>
                            )}
                    </section>section>
              
                    <section className="px-6 max-w-7xl mx-auto mt-12 py-8 border-t border-gray-800">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                                      <div className="flex items-center gap-4">
                                                  <span>Oracle Contract:</span>span>
                                                  <code className="text-orange-400 font-mono text-xs bg-[#12121a] px-2 py-1 rounded">{CONTRACT_ADDRESS}</code>code>
                                      </div>div>
                                      <div>Last updated: {lastRefresh.toLocaleTimeString()}</div>div>
                            </div>div>
                    </section>section>
              
                    <footer className="border-t border-gray-800 px-6 py-8 mt-8 text-center text-gray-500 text-sm">
                            <p>VibeOracle — AI-Powered Sentiment Oracle for Base</p>p>
                            <p className="mt-2 text-xs">Built for the Vibe Coding Hackathon by CreatorBid | Powered by Claude AI & Anthropic</p>p>
                    </footer>footer>
              
                  {selectedToken && <TokenModal token={selectedToken} onClose={() => setSelectedToken(null)} />}
              </main>main>
            );
}</div>
