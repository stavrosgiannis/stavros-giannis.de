# stavros-giannis.de

Personal site of Stavros Giannis, built with [Astro](https://astro.build) as a fully static site.

- `src/data/site.ts`: all content (intro, highlights, experience, projects, skills). Edit this to update the site.
- `src/pages/`: the homepage, privacy page and 404.
- `src/styles/global.css`: styles; light and dark mode follow the system setting.

```sh
npm install
npm run dev      # local dev server
npm run check    # type-check
npm run build    # static build to dist/
npm start        # serve dist/ with security headers (server.js)
```

Deployed on Coolify with Nixpacks (`nixpacks.toml`): `npm run build`, then `node server.js`.
