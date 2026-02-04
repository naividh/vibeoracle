# VibeOracle

## AI-Powered Sentiment Oracle for Trenches/Base

> Know the vibe before you ape. Real-time social sentiment analysis powered by Claude AI, delivered on-chain.
>
> Built for the **Vibe Coding Hackathon** by CreatorBid.
>
> ## The Problem
>
> Tokens launch on Trenches every day, but traders have no reliable way to gauge real social sentiment. They rely on gut feeling, hype cycles, and FOMO - often getting rugged or missing genuine opportunities.
>
> ## The Solution
>
> VibeOracle is an AI-powered on-chain sentiment oracle that analyzes real-time social data (Twitter/X, Telegram, Discord) for every token launched on Trenches. It uses Claude AI to process social mentions, detect manipulation, and deliver objective sentiment scores directly on-chain.
>
> ## How It Works
>
> 1. **Social Scraper** - Collects mentions from public social APIs
> 2. 2. **Claude AI Engine** - Analyzes posts for sentiment, confidence, and manipulation signals
>    3. 3. **On-Chain Oracle** - Pushes scores (-100 to +100) to a Solidity smart contract on Base
>       4. 4. **Dashboard** - Beautiful real-time UI showing token sentiment leaderboards
>         
>          5. ## Tech Stack
>         
>          6. - **Smart Contract**: Solidity 0.8.19 (deployed on Base L2)
>             - - **Backend**: Python + FastAPI + Claude AI (Anthropic API)
>               - - **Frontend**: Next.js 14 + Tailwind CSS
>                 - - **AI Model**: Claude Sonnet for sentiment analysis
>                   - - **Chain**: Base (Ethereum L2)
>                    
>                     - ## Project Structure
>                    
>                     - ```
>                       vibeoracle/
>                         contracts/SentimentOracle.sol    # On-chain oracle
>                         backend/main.py                  # FastAPI server
>                         backend/sentiment.py             # Claude AI engine
>                         backend/scraper.py               # Social data scraper
>                         frontend/app/page.tsx            # Dashboard UI
>                         hardhat.config.js                # Hardhat config for Base
>                         package.json                     # Root config
>                       ```
>
> ## Quick Start
>
> ```bash
> # Install dependencies
> npm install
>
> # Compile smart contract
> npx hardhat compile
>
> # Run backend
> cd backend && pip install -r requirements.txt && python main.py
>
> # Run frontend
> cd frontend && npm install && npm run dev
> ```
>
> ## Environment Variables
>
> Create a `.env` file:
> ```
> PRIVATE_KEY=your_wallet_private_key
> ANTHROPIC_API_KEY=your_claude_api_key
> ```
>
> ## Key Features
>
> - Real-time sentiment scores for any Trenches token
> - - Confidence ratings showing signal reliability
>   - - AI-generated one-line market summaries
>     - - Manipulation detection to flag suspicious hype
>       - - Batch oracle updates for gas efficiency
>         - - Historical score tracking for trend analysis
>          
>           - ## License
>          
>           - MIT
>          
>           - ---
>
> Built with vibes, powered by Claude AI on Base.
