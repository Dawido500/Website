const { createServer } = require("http");
const { parse } = require("url");
const path = require("path");
const fs = require("fs");

const NextServer = require("next/dist/server/next-server").default;

const MIME_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
  ".html": "text/html",
};

const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);
const dir = path.join(__dirname);

const nextServer = new NextServer({
  hostname,
  port,
  dir,
  dev: false,
  customServer: true,
  conf: require(path.join(__dirname, ".next", "required-server-files.json")).config,
});

const handler = nextServer.getRequestHandler();

function serveStatic(pathname, res) {
  const safePath = path.normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(__dirname, "public", safePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext];

  if (contentType && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=2592000, immutable");
    fs.createReadStream(filePath).pipe(res);
    return true;
  }
  return false;
}

function serveNextStatic(pathname, res) {
  const decoded = decodeURIComponent(pathname);
  const safePath = path.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(__dirname, safePath.replace(/^\/_next\//, ".next/"));
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext];

  if (contentType && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    fs.createReadStream(filePath).pipe(res);
    return true;
  }
  return false;
}

createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;

  // Serve _next/static files (CSS, JS chunks)
  if (pathname.startsWith("/_next/static/")) {
    if (serveNextStatic(pathname, res)) return;
  }

  // Serve public files (images, fonts, logos, favicon)
  if (!pathname.startsWith("/_next/") && !pathname.startsWith("/api/")) {
    if (serveStatic(pathname, res)) return;
  }

  handler(req, res, parsedUrl);
}).listen(port, hostname, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});
