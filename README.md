# Agent-Driven Dynamic Launcher (ADDL) UI API

## Overview
The ADDL UI API is a Cloudflare Workers-based service that provides intent-based dynamic icons for launcher applications. It enables developers to create "agent OS" experiences where icons appear contextually based on user intent.

## Key Features
- **Intent-based Icons**: Returns appropriate icons based on user's intent (e.g., 출장, 배달, 운동)
- **Widget Support**: Icons can include widget data for real-time information
- **Clustering**: Groups related icons together
- **Pin-board**: Save and manage pinned items
- **Ephemeral Icons**: Icons have built-in expiry times

## Tech Stack (Zero-Cost Strategy)
- **API Server**: Cloudflare Workers (100k free requests/day)
- **UI Assets**: Cloudflare R2 (free egress)
- **Database**: Cloudflare D1/KV (placeholders ready)
- **Framework**: Hono (lightweight, fast)

## Endpoints

### 1. GET /
Returns API info and available endpoints.

### 2. POST /v1/launcher/compose
Compose launcher icons based on user intent.

**Request:**
```json
{
  "user_intent": "내일 부산 출장 가"
}
```

**Response:**
```json
{
  "layout_id": "busan_trip_001",
  "icons": [
    {
      "id": "ktx_001",
      "label": "KTX 예매",
      "icon_url": "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/korail.svg",
      "action": "https://www.letskorail.com",
      "type": "action"
    }
  ],
  "clusters": [
    {
      "id": "trip_cluster_001",
      "label": "부산 출장 준비",
      "icon_ids": ["ktx_001", "weather_001"],
      "color": "#3B82F6"
    }
  ],
  "expiry": "2026-05-07T18:00:00.000Z"
}
```

### 3. GET /v1/launcher/pins
Get all pinned items.

### 4. POST /v1/launcher/pin
Pin a new item.

**Request:**
```json
{
  "label": "중요 문서",
  "icon_url": "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/googledrive.svg",
  "action": "https://drive.google.com/file/123"
}
```

### 5. DELETE /v1/launcher/pin/:id
Delete a pinned item.

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Deployment
```bash
npm run deploy
```

## Project Structure
```
├── src/
│   ├── index.ts       # Main API entry
│   └── icons.ts       # Icon templates and pin management
├── wrangler.toml      # Cloudflare Workers config
├── package.json
├── tsconfig.json
└── README.md
```
