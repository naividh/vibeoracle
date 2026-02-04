"""VibeOracle Backend API - FastAPI server for sentiment analysis"""
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from sentiment import analyze_sentiment, SentimentResult
from scraper import fetch_token_mentions

load_dotenv()
app = FastAPI(title="VibeOracle API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

sentiment_cache: dict[str, SentimentResult] = {}

class TokenRequest(BaseModel):
    address: str
    name: str
    symbol: str

class AnalyzeResponse(BaseModel):
    token_address: str
    sentiment: SentimentResult

@app.get("/")
async def root():
    return {"name": "VibeOracle API", "version": "1.0.0", "status": "live"}

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_token(req: TokenRequest):
    try:
        posts = await fetch_token_mentions(req.name, req.symbol)
        result = await analyze_sentiment(req.name, posts)
        sentiment_cache[req.address] = result
        return AnalyzeResponse(token_address=req.address, sentiment=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/sentiment/{token_address}")
async def get_sentiment(token_address: str):
    if token_address in sentiment_cache:
        return {"token": token_address, "sentiment": sentiment_cache[token_address]}
    return {"token": token_address, "sentiment": None, "message": "Not analyzed yet"}

@app.get("/leaderboard")
async def leaderboard():
    ranked = sorted(sentiment_cache.items(), key=lambda x: x[1].score, reverse=True)
    return [{"address": addr, "sentiment": sent} for addr, sent in ranked]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
