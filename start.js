const { createServer } = require("http");
const { parse } = require("url");
const path = require("path");
const fs = require("fs");

// Load the Next.js standalone handler
const NextServer = require("next/dist/server/next-server").default;

const MIME_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
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

createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;

  // Serve uploaded files directly from public/
  if (pathname.startsWith("/uploads/")) {
    const safePath = path.normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
    const filePath = path.join(__dirname, "public", safePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext];

    if (contentType && fs.existsSync(filePath)) {
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=2592000, immutable");
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  handler(req, res, parsedUrl);
}).listen(port, hostname, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});
