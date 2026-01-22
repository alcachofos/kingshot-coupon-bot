# kingshot-coupon-bot

Serverless bot that fetches gift codes from KingShot API and auto-posts to Telegram using Cloudflare Workers.

## 🚀 One-click deploy
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)]

## Features
- Auto fetch gift codes
- Deduplication
- Telegram posting
- Inline buttons (copy + redeem)
- Multi-target broadcast
- Web dashboard
- Active/expired filters
- KV storage
- Cron scheduler (3h)
- CI/CD
- WhatsApp ready (Meta Cloud API EU)

## Setup

### 1. Create KV
```bash
wrangler kv:namespace create CODES_KV
```

### 2. Configure wrangler.toml
Replace KV id.

### 3. Add secrets
```bash
wrangler secret put BOT_TOKEN
wrangler secret put TELEGRAM_TARGETS
```

### 4. Deploy
```bash
wrangler deploy
```

## Dashboard
https://your-worker.workers.dev/

## API
GET /api/codes

## Telegram
Supports multi-target:
@kingshotgiftcodes,-1003173100625

## WhatsApp (future)
Meta Cloud API EU adapter already scaffolded.
