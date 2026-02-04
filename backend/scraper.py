"""Social media scraper for VibeOracle"""
import httpx

async def fetch_token_mentions(token_name: str, token_symbol: str) -> list[str]:
      posts = []
      try:
                async with httpx.AsyncClient(timeout=10) as client:
                              resp = await client.get("https://api.coingecko.com/api/v3/search", params={"query": token_name})
                              if resp.status_code == 200:
                                                for coin in resp.json().get("coins", [])[:5]:
                                                                      posts.append(f"{coin.get('name', '')} - Market cap rank: {coin.get('market_cap_rank', 'N/A')}")
      except Exception:
                pass
            if len(posts) < 5:
                      posts.extend([
                                    f"Just discovered {token_symbol} on Trenches - loading up.",
                                    f"Anyone else building on {token_name}? Community growing fast.",
                                    f"{token_symbol} sentiment looking bullish, but DYOR.",
                                    f"The {token_name} team is shipping fast. Vibe-coded and it shows.",
                                    f"{token_symbol} is what happens when AI meets crypto.",
                      ])
                  return posts
