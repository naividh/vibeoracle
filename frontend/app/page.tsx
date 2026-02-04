"use client";
import { useState } from "react";

const TOKENS = [
  { address: "0x1234", name: "VibeAI", symbol: "VIBE", score: 78, confidence: 85, summary: "Strong bullish sentiment", mentions: 342 },
  { address: "0x5678", name: "TrenchCat", symbol: "TCAT", score: 45, confidence: 72, summary: "Moderate interest", mentions: 189 },
  { address: "0x9abc", name: "BaseBuilder", symbol: "BLDR", score: 92, confidence: 91, summary: "Extremely bullish", mentions: 567 },
  { address: "0xdef0", name: "DegenOracle", symbol: "DGEN", score: -15, confidence: 68, summary: "Mixed signals", mentions: 98 },
  { address: "0x1111", name: "NeuralNet", symbol: "NNET", score: 61, confidence: 79, summary: "Positive AI sentiment", mentions: 234 },
  { address: "0x2222", name: "FadeCoin", symbol: "FADE", score: -52, confidence: 88, summary: "Bearish outlook", mentions: 156 },
  ];

function Bar({ score }: { score: number }) {
    const w = (score + 100) / 2;
    const c = score > 20 ? "bg-green-500" : score < -20 ? "bg-red-500" : "bg-orange-500";
    return (<div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden relative"><div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600 z-10"/><div className={`h-full rounded-full ${c}`} style={{width:`${w}%`}}/></div>div>);
}

export default function Home() {
    const [filter, setFilter] = useState("all");
    const tokens = TOKENS.filter(t => filter==="bullish"?t.score>0:filter==="bearish"?t.score<0:true).sort((a,b)=>b.score-a.score);
    return (
          <main className="min-h-screen bg-[#0a0a0f] text-white">
                <header className="border-b border-gray-800 px-6 py-4"><div className="max-w-7xl mx-auto flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center text-xl">O</div>div><div><h1 className="text-xl font-bold">VibeOracle</h1>h1><p className="text-xs text-gray-400">AI Sentiment Oracle on Base</p>p></div>div></div>div><span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Live</span>span></div>div></header>header>
                <section className="px-6 py-12 text-center"><h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">Read the Vibes</h2>h2><p className="mt-4 text-gray-400 text-lg">AI-powered sentiment for Trenches tokens on Base</p>p></section>section>
                <section className="px-6 max-w-7xl mx-auto">
                        <div className="flex gap-2 mb-6">{["all","bullish","bearish"].map(f=>(<button key={f} onClick={()=>setFilter(f)} className={`px-4 py-2 rounded-lg text-sm ${filter===f?"bg-orange-500 text-white":"bg-[#12121a] text-gray-400 border border-gray-800"}`}>{f}</button>button>))}</div>div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{tokens.map(t=>(<div key={t.address} className="bg-[#12121a] rounded-xl p-5 border border-gray-800"><div className="flex justify-between mb-3"><div><h3 className="font-bold">{t.name}</h3>h3><span className="text-sm text-gray-400">${t.symbol}</span>span></div>div><span className="text-2xl">{t.score>60?"F":t.score>0?"V":"X"}</span>span></div>div><Bar score={t.score}/><div className="flex justify-between mt-2 mb-3"><span className={`text-xl font-bold ${t.score>0?"text-green-400":"text-red-400"}`}>{t.score>0?"+":""}{t.score}</span>span><span className="text-sm text-gray-400">{t.confidence}%</span>span></div>div><p className="text-sm text-gray-300">{t.summary}</p>p><div className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-800">{t.mentions} mentions</div>div></div>div>))}</div>div>
                </section>section>
                <footer className="border-t border-gray-800 px-6 py-8 mt-16 text-center text-gray-500 text-sm">VibeOracle - Vibe Coding Hackathon by CreatorBid | Claude AI on Base</footer>footer>
          </main>main>
        );
}</div>
