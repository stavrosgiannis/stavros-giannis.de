const express = require('express');
const compression = require('compression');
const path = require('path');
// npm install helmet
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
}));

// Enable gzip compression for all responses
app.use(compression());

// Serve static files from build directory
const buildPath = path.join(__dirname, 'build');

// Cache content-hashed Vite assets aggressively.
app.use('/assets', express.static(path.join(buildPath, 'assets'), {
  maxAge: '365d',
  immutable: true,
  etag: false,
}));

// Serve public root assets without allowing index.html to be cached as static.
app.use(express.static(buildPath, {
  index: false,
  maxAge: 0,
  etag: true,
  setHeaders: (res, filePath) => {
    if (/\.(jpg|jpeg|png|gif|svg|webp|woff2|pdf)$/i.test(filePath)) {
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
  },
}));

// Cache index.html with short TTL and must-revalidate
app.get('/', (req, res) => {
  res.set('Cache-Control', 'no-cache, must-revalidate');
  res.sendFile(path.join(buildPath, 'index.html'));
});

// SPA: Catch all routes and serve index.html for client-side routing
app.get('*', (req, res) => {
  res.set('Cache-Control', 'no-cache, must-revalidate');
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Serving: ${buildPath}`);
  console.log(`✓ Cache headers configured for production`);
});
