const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression for all responses
app.use(compression());

// Serve static files from build directory
const buildPath = path.join(__dirname, 'build');

// Cache-Control middleware for static assets
app.use(express.static(buildPath, {
  maxAge: '1y', // 31536000s for hashed assets with /static/ prefix
  etag: false,
}));

// Specific cache rules for different asset types
app.use('/static', express.static(path.join(buildPath, 'static'), {
  maxAge: '365d', // 1 year for content-hashed JS/CSS bundles
  immutable: true,
  etag: false,
}));

// Cache index.html with short TTL and must-revalidate
app.get('/', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Cache images with 1 day TTL
app.get(/\.(jpg|jpeg|png|gif|svg|webp)$/i, (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=86400');
  next();
});

// SPA: Catch all routes and serve index.html for client-side routing
app.get('*', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Serving: ${buildPath}`);
  console.log(`✓ Cache headers configured for production`);
});
