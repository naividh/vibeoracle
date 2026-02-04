"""VibeOracle Sentiment Engine - Uses Claude AI to analyze social sentiment"""
import os, json
from anthropic import Anthropic
from pydantic import BaseModel

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

class SentimentResult(BaseModel):
      score: int
      confidence: int
      summary: str
      mention_count: int

SYSTEM_PROMPT = """You are a crypto sentiment analyst. Given social media posts about a token, analyze the overall sentiment.
Return JSON with: score (-100 to +100), confidence (0-100), summary (one sentence), mention_count (posts analyzed).
Be objective. Consider hype vs genuine interest. Detect potential manipulation."""

async def analyze_sentiment(token_name: str, posts: list[str]) -> SentimentResult:
      if not posts:
                return SentimentResult(score=0, confidence=0, summary="No social data available", mention_count=0)
            posts_text = "\n---\n".join(posts[:50])
    message = client.messages.create(
              model="claude-sonnet-4-20250514",
              max_tokens=300,
              system=SYSTEM_PROMPT,
              messages=[{"role": "user", "content": f"Token: {token_name}\n\nSocial posts:\n{posts_text}"}]
    )
    try:
              result = json.loads(message.content[0].text)
              return SentimentResult(**result)
except (json.JSONDecodeError, KeyError):
        return SentimentResult(score=0, confidence=10, summary="Analysis inconclusive", mention_count=len(posts))
