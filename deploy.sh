#!/bin/bash
set -e

echo "══════════════════════════════════"
echo "  Obitko Innenausbau – Deployment"
echo "══════════════════════════════════"

# Pull latest code
echo ""
echo "→ Pulling latest changes …"
git pull origin main

# Build and restart containers
echo ""
echo "→ Building containers …"
docker compose build --no-cache app

echo ""
echo "→ Running database migrations …"
docker compose run --rm app npx prisma migrate deploy

echo ""
echo "→ Starting services …"
docker compose up -d

echo ""
echo "→ Cleaning up old images …"
docker image prune -f

echo ""
echo "✓ Deployment complete!"
echo ""
echo "  Website:   https://obitko.de"
echo "  Analytics: https://analytics.obitko.de"
echo ""
