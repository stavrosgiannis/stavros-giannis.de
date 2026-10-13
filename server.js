// Serves the static Astro build (dist/) with security and cache headers.
import express from "express";
import compression from "compression";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 3000;
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist");

app.disable("x-powered-by");
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
}));
app.use(compression());

// Content-hashed build assets never change.
app.use("/_astro", express.static(path.join(dist, "_astro"), { maxAge: "365d", immutable: true }));

// Pages are built as /privacy.html etc.; serve them at extensionless URLs.
app.use(express.static(dist, {
  extensions: ["html"],
  setHeaders: (res, filePath) => {
    res.set("Cache-Control", filePath.endsWith(".html") ? "no-cache" : "public, max-age=86400");
  },
}));

app.use((_req, res) => {
  res.status(404).sendFile(path.join(dist, "404.html"));
});

app.listen(PORT, () => console.log(`Serving ${dist} on port ${PORT}`));
