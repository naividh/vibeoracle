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
## Deployment Guide

### Prerequisites

- Node.js 18+
- - An Anthropic API key (get one at https://console.anthropic.com)
  - - A wallet with Base ETH for contract deployment (optional)
   
    - ### Quick Start - Frontend Only
   
    - 1. **Clone the repository**
      2. ```bash
         git clone https://github.com/naividh/vibeoracle.git
         cd vibeoracle/frontend
         ```

         2. **Install dependencies**
         3. ```bash
            npm install
            ```

            3. **Set up environment variables**
            4. ```bash
               # Create .env.local file
               ANTHROPIC_API_KEY=your_anthropic_api_key
               NEXT_PUBLIC_API_URL=/api
               ```

               4. **Run locally**
               5. ```bash
                  npm run dev
                  ```

                  ### Deploy to Vercel

                  1. **Fork or push this repo to GitHub**
                 
                  2. 2. **Connect to Vercel**
                     3.    - Go to [vercel.com](https://vercel.com)
                           -    - Import your GitHub repository
                                -    - Set the root directory to `frontend`
                                 
                                     - 3. **Add Environment Variables in Vercel**
                                       4.    - `ANTHROPIC_API_KEY` - Your Claude API key
                                         
                                             - 4. **Deploy!**
                                               5.    - Vercel will automatically build and deploy
                                                 
                                                     - ### Deploy Smart Contract to Base
                                                 
                                                     - 1. **Configure Hardhat**
                                                       2. ```bash
                                                          cd vibeoracle
                                                          npm install
                                                          ```

                                                          2. **Set environment variables**
                                                          3. ```bash
                                                             PRIVATE_KEY=your_wallet_private_key
                                                             BASE_RPC_URL=https://mainnet.base.org
                                                             ```

                                                             3. **Deploy contract**
                                                             4. ```bash
                                                                npx hardhat run scripts/deploy.js --network base
                                                                ```

                                                                ### Architecture

                                                                ```
                                                                vibeoracle/
                                                                ├── frontend/          # Next.js 14 frontend
                                                                │   ├── app/
                                                                │   │   ├── api/tokens/route.ts  # Claude AI sentiment API
                                                                │   │   └── page.tsx             # Main dashboard
                                                                ├── backend/           # Python FastAPI (alternative backend)
                                                                │   ├── main.py
                                                                │   ├── sentiment.py   # Claude AI integration
                                                                │   └── scraper.py     # Social media scraper
                                                                ├── contracts/         # Solidity smart contracts
                                                                │   └── SentimentOracle.sol
                                                                └── scripts/           # Deployment scripts
                                                                ```

                                                                ### API Endpoints

                                                                - `GET /api/tokens` - Returns sentiment analysis for all tracked tokens
                                                               
                                                                - ### Tech Stack
                                                               
                                                                - - **Frontend**: Next.js 14, React, Tailwind CSS
                                                                  - - **AI**: Claude Sonnet (Anthropic API)
                                                                    - - **Blockchain**: Base L2 (Ethereum)
                                                                      - - **Smart Contract**: Solidity, Hardhat
                                                                       
                                                                        - ---

                                                                        Built with vibes, powered by Claude AI 🚀
>
> Built with vibes, powered by Claude AI on Base.
