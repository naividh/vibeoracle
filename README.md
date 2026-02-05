# 🔮 VibeOracle

## AI-Powered Sentiment Oracle for Trenches/Base

> **Know the vibe before you ape.** Real-time social sentiment analysis powered by Claude AI, delivered on-chain.
>
> [![Built on Base](https://img.shields.io/badge/Built%20on-Base-blue)](https://base.org)
> [![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude%20AI-purple)](https://anthropic.com)
> [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
>
> Built for the **Vibe Coding Hackathon** by CreatorBid.
>
> ---
>
> ## 🎯 The Problem
>
> Tokens launch on Trenches every day, but traders have no reliable way to gauge real social sentiment. They rely on gut feeling, hype cycles, and FOMO - often getting rugged or missing genuine opportunities.
>
> ## 💡 The Solution
>
> VibeOracle is an AI-powered on-chain sentiment oracle that analyzes real-time social data (Twitter/X, Telegram, Discord) for every token launched on Trenches. It uses Claude AI to process social mentions, detect manipulation, and deliver objective sentiment scores directly on-chain.
>
> ## ✨ Key Features
>
> - **🎯 Real-time Sentiment Scores** — AI-analyzed scores from -100 (extremely bearish) to +100 (extremely bullish)
> - - **📊 Confidence Ratings** — Know how reliable the signal is based on data quality
>   - - **🤖 AI-Generated Summaries** — One-line sentiment summaries powered by Claude
>     - - **⚠️ Manipulation Detection** — Flag suspicious hype, coordinated shilling, and bot activity
>       - - **📈 Trend Indicators** — See if sentiment is trending up, down, or stable
>         - - **⛓️ On-Chain Data** — All sentiment data stored on Base for transparency
>           - - **🔄 Batch Updates** — Gas-efficient bulk oracle updates
>             - - **💼 Wallet Integration** — Connect with RainbowKit (MetaMask, Coinbase, WalletConnect)
>              
>               - ## 🏗️ Architecture
>              
>               - ```
>                 ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
>                 │   Social APIs   │────▶│  Python Backend │────▶│  Claude AI API  │
>                 │ (Twitter, TG)   │     │   (FastAPI)     │     │  (Anthropic)    │
>                 └─────────────────┘     └────────┬────────┘     └─────────────────┘
>                                                  │
>                                                  ▼
>                                         ┌─────────────────┐
>                                         │ Smart Contract  │
>                                         │ (Base L2)       │
>                                         └────────┬────────┘
>                                                  │
>                                                  ▼
>                                         ┌─────────────────┐
>                                         │   Frontend      │
>                                         │ (Next.js + RK)  │
>                                         └─────────────────┘
>                 ```
>
> ## 🛠️ Tech Stack
>
> | Component | Technology |
> |-----------|------------|
> | Smart Contract | Solidity 0.8.19 (Base L2) |
> | Backend | Python + FastAPI |
> | AI Engine | Claude Sonnet (Anthropic API) |
> | Frontend | Next.js 14 + Tailwind CSS |
> | Wallet | RainbowKit + Wagmi + Viem |
> | Chain | Base (Ethereum L2) |
>
> ## 📁 Project Structure
>
> ```
> vibeoracle/
> ├── contracts/
> │   └── SentimentOracle.sol    # On-chain oracle contract
> ├── backend/
> │   ├── main.py                # FastAPI server
> │   ├── sentiment.py           # Claude AI sentiment engine
> │   └── scraper.py             # Social data scraper
> ├── frontend/
> │   └── app/
> │       ├── page.tsx           # Main dashboard
> │       ├── layout.tsx         # Root layout with providers
> │       └── providers.tsx      # RainbowKit/Wagmi config
> └── scripts/
>     └── deploy.js              # Contract deployment
> ```
>
> ## 🚀 Quick Start
>
> ### Prerequisites
> - Node.js 18+
> - - Python 3.10+
>   - - Anthropic API Key
>     - - Base Sepolia ETH (for testing)
>      
>       - ### Installation
>      
>       - ```bash
>         # Clone the repository
>         git clone https://github.com/naividh/vibeoracle.git
>         cd vibeoracle
>
>         # Install dependencies
>         npm install
>
>         # Install backend dependencies
>         cd backend && pip install -r requirements.txt
>
>         # Install frontend dependencies
>         cd frontend && npm install
>         ```
>
> ### Environment Setup
>
> Create a `.env` file:
>
> ```env
> # Anthropic
> ANTHROPIC_API_KEY=your_claude_api_key
>
> # Base
> BASE_RPC_URL=https://mainnet.base.org
> PRIVATE_KEY=your_wallet_private_key
>
> # Frontend
> NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
> ```
>
> ### Running Locally
>
> ```bash
> # Run backend
> cd backend && python main.py
>
> # Run frontend
> cd frontend && npm run dev
>
> # Deploy contract (optional)
> npx hardhat run scripts/deploy.js --network base
> ```
>
> ## 📜 Smart Contract
>
> The `SentimentOracle` contract stores:
> - Sentiment scores (-100 to +100)
> - - Confidence percentages (0-100)
>   - - Manipulation risk levels (low/medium/high)
>     - - Trend indicators (up/down/stable)
>       - - AI-generated summaries
>         - - Score history for trend analysis
>          
>           - ### Key Functions
>          
>           - ```solidity
>             // Update sentiment for a token
>             function updateSentiment(
>                 address token,
>                 int8 score,
>                 uint32 confidence,
>                 uint32 mentionCount,
>                 string calldata summary,
>                 uint8 manipulationRisk,
>                 int8 trend
>             ) external onlyUpdater;
>
>             // Get sentiment data
>             function getSentiment(address token) external view returns (SentimentData memory);
>
>             // Batch update multiple tokens
>             function batchUpdateSentiment(...) external onlyUpdater;
>             ```
>
> ## 🔗 Links
>
> - **Live Demo:** [vibeoracle.vercel.app](https://vibeoracle-git-main-naividhs-projects.vercel.app)
> - - **GitHub:** [github.com/naividh/vibeoracle](https://github.com/naividh/vibeoracle)
>   - - **Contract:** [BaseScan](https://basescan.org/address/0x...)
>    
>     - ## 🤝 Built With
>    
>     - - [Anthropic Claude](https://anthropic.com) — AI sentiment analysis
>       - - [Base](https://base.org) — Ethereum L2 for low-cost on-chain data
>         - - [RainbowKit](https://rainbowkit.com) — Wallet connection
>           - - [Wagmi](https://wagmi.sh) — React hooks for Ethereum
>             - - [Next.js](https://nextjs.org) — React framework
>              
>               - ## 📄 License
>              
>               - MIT License - see [LICENSE](LICENSE) for details.
>              
>               - ---
>
> **Built with vibes, powered by Claude AI. 🔮**
