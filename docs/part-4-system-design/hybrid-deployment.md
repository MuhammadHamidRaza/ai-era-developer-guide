---
title: ""Hybrid Deployment: Vercel + Render + Northflank""
description: How to deploy modern AI-augmented applications using a hybrid cloud strategy
---

# Hybrid Deployment: Vercel + Render + Northflank

In 2026, deploying an application means making choices about where each component lives. Your frontend might be on Vercel, your API on Render, your databases on Northflank, and your AI inference on a specialized GPU provider.

This hybrid approach is not a compromise — it's a strategy. Each platform excels at different things. Using the right platform for each component gives you the best performance, cost, and developer experience.

This chapter teaches you to design and implement hybrid deployment architectures.

## The Platform Landscape

### Vercel: Frontend and Edge

**Strengths:**
- Best-in-class frontend deployment (Next.js, React, Vue, Svelte)
- Edge functions for low-latency API routes
- Automatic HTTPS, CDN, and image optimization
- Preview deployments for every PR
- Seamless Git integration

**Best for:** Frontends, static sites, edge APIs, serverless functions.

**Limitations:** Serverless cold starts, execution time limits (10-60 seconds), not suitable for long-running processes or WebSocket servers.

### Render: Backend and Services

**Strengths:**
- Simple deployment for web services, APIs, and background workers
- Managed PostgreSQL and Redis
- Automatic HTTPS and custom domains
- Good pricing for always-on services
- Docker support

**Best for:** REST APIs, GraphQL servers, background workers, cron jobs, databases.

**Limitations:** Less sophisticated than Kubernetes for complex orchestration, limited GPU support.

### Northflank: Full-Stack Platform

**Strengths:**
- Kubernetes-based deployment without Kubernetes complexity
- Full-stack deployment (frontend, backend, databases, workers)
- Built-in CI/CD pipeline
- GPU support for AI workloads
- Multi-region deployment
- Internal networking between services

**Best for:** Complex applications requiring multiple services, AI workloads, custom infrastructure.

**Limitations:** More complex than Vercel/Render, steeper learning curve.

## The Hybrid Architecture Pattern

A typical hybrid architecture distributes components across platforms:

```
┌─────────────────────────────────────────────────────┐
│                    Vercel                            │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │   Next.js   │  │ Edge API    │  │   Static     │ │
│  │   Frontend  │  │   Routes    │  │   Assets     │ │
│  └──────┬──────┘  └──────┬──────┘  └──────────────┘ │
│         │                │                           │
└─────────┼────────────────┼───────────────────────────┘
          │                │
          ▼                ▼
┌─────────────────────────────────────────────────────┐
│                    Render                            │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │   REST API  │  │  GraphQL    │  │   Background │ │
│  │   Server    │  │   Server    │  │   Workers    │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘ │
│         │                │                │          │
│  ┌──────┴────────────────┴────────────────┴───────┐  │
│  │           Managed PostgreSQL                   │  │
│  │           Managed Redis                        │  │
│  └────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────┐
│                  Northflank                          │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │   AI Agent  │  │   Vector    │  │   ML Model   │ │
│  │   Service   │  │   Database  │  │   Inference  │ │
│  └─────────────┘  └─────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────┘
```

## Deployment Configuration

### Vercel: Frontend

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.yourdomain.com/:path*"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.yourdomain.com"
  }
}
```

### Render: Backend API

```yaml
# render.yaml
services:
  - type: web
    name: api-server
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: postgres-db
          property: connectionString
      - key: REDIS_URL
        fromService:
          name: redis-cache
          type: redis
          property: connectionString

  - type: worker
    name: background-worker
    env: node
    buildCommand: npm install
    startCommand: npm run worker

databases:
  - name: postgres-db
    databaseName: appdb
    user: appuser

  - name: redis-cache
    plan: free
```

### Northflank: AI Services

```yaml
# northflank-compose.yml
services:
  ai-agent:
    image: your-registry/ai-agent:latest
    replicas: 2
    resources:
      cpu: 2
      memory: 4Gi
      gpu: 1  # GPU for inference
    env:
      - name: VECTOR_DB_URL
        value: ${vector-db.url}
      - name: API_KEY
        secretRef: openai-api-key
    ports:
      - port: 8080
        protocol: HTTP

  vector-db:
    image: pgvector/pgvector:pg15
    replicas: 1
    resources:
      cpu: 1
      memory: 2Gi
    volumes:
      - name: vector-data
        mountPath: /var/lib/postgresql/data
        size: 50Gi
```

## Cross-Platform Communication

### API Gateway Pattern

Use the API on Render as the central gateway that coordinates between services:

```python
# Render API - coordinates between Vercel frontend and Northflank AI
from fastapi import FastAPI
import httpx

app = FastAPI()

AI_SERVICE_URL = "https://ai-agent.northflank.app"

@app.post("/api/chat")
async def chat(request: ChatRequest):
    # Process on Render
    user = authenticate(request.token)
    
    # Forward to AI service on Northflank
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{AI_SERVICE_URL}/generate",
            json={"message": request.message, "user_id": user.id},
            timeout=30.0,
        )
    
    return response.json()
```

### Event-Driven Communication

Use message queues for async communication between platforms:

```python
# Render worker publishes events
import redis

redis_client = redis.from_url(REDIS_URL)

def publish_event(event_type: str, data: dict):
    redis_client.xadd(
        "events",
        {"type": event_type, "data": json.dumps(data)},
        maxlen=10000,
    )

# Northflank service consumes events
def consume_events():
    while True:
        events = redis_client.xread({"events": last_id}, count=10, block=1000)
        for event in events:
            process_event(event)
```

## CI/CD Across Platforms

### GitHub Actions Workflow

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: render-deploy-action@v1
        with:
          api-key: ${{ secrets.RENDER_API_KEY }}
          service-id: ${{ secrets.RENDER_SERVICE_ID }}

  deploy-ai:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t ai-agent:latest .
      - uses: northflank/deploy-action@v1
        with:
          api-token: ${{ secrets.NORTHFLANK_TOKEN }}
          project-id: ${{ secrets.NORTHFLANK_PROJECT_ID }}
```

## Cost Optimization

### Platform Cost Comparison

| Component | Vercel | Render | Northflank |
|-----------|--------|--------|------------|
| Frontend hosting | $20/pro | N/A | $10+/mo |
| API server | $20+/serverless | $7+/instance | $15+/instance |
| Database | N/A | $7+/managed | $10+/managed |
| AI/GPU | N/A | Limited | $50+/GPU |
| CDN/Edge | Included | N/A | Add-on |

### Optimization Strategies

1. **Use Vercel's free tier** for preview deployments and low-traffic projects
2. **Right-size Render instances** — start small and scale up based on metrics
3. **Use Northflank only for what needs it** — don't put everything on Kubernetes
4. **Implement auto-scaling** on Render and Northflank to match demand
5. **Use CDN caching** on Vercel to reduce API calls

## Monitoring Across Platforms

### Centralized Logging

Send logs from all platforms to a central system:

```python
# Structured logging that works across all platforms
import logging
import json

class JSONFormatter(logging.Formatter):
    def format(self, record):
        return json.dumps({
            "timestamp": self.formatTime(record),
            "level": record.levelname,
            "service": os.getenv("SERVICE_NAME", "unknown"),
            "platform": os.getenv("PLATFORM", "unknown"),
            "message": record.getMessage(),
        })
```

### Health Checks

Implement health checks that work across all platforms:

```python
@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": os.getenv("SERVICE_NAME"),
        "platform": os.getenv("PLATFORM"),
        "version": os.getenv("VERSION"),
        "timestamp": datetime.utcnow().isoformat(),
    }
```

## End-of-Chapter Checklist

- [ ] I understand the strengths and limitations of Vercel, Render, and Northflank
- [ ] I can design a hybrid architecture that puts each component on the right platform
- [ ] I know how to configure deployments for each platform
- [ ] I can implement cross-platform communication (API gateway, event-driven)
- [ ] I've set up CI/CD that deploys to all platforms
- [ ] I optimize costs by using each platform's strengths
- [ ] I implement centralized monitoring across all platforms

## What's Next

Hybrid deployment gets your application running. But AI applications need a way to connect to external tools and data sources. The next chapter covers MCP connectors — the USB-C of AI.

**Next:** [MCP Connectors: The USB-C of AI](./mcp-connectors)
