#!/bin/bash
set -e

# ──────────────────────────────────
# Initial SSL setup with Let's Encrypt
# Run once on the Hetzner VPS
# ──────────────────────────────────

DOMAIN="obitko.de"
EMAIL="info@obitko.de"  # Change to your email

echo "→ Starting nginx for ACME challenge …"
docker compose up -d nginx

echo ""
echo "→ Requesting SSL certificate …"
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  -d $DOMAIN \
  -d www.$DOMAIN \
  -d analytics.$DOMAIN \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email

echo ""
echo "→ Restarting nginx with SSL …"
docker compose restart nginx

echo ""
echo "✓ SSL setup complete!"
