# SEO & Accessibility Optimization Guide

## 🔍 SEO Enhancements Implemented

### Meta Tags Configuration
```javascript
import { initializeSEO } from './services/seoAndAccessibility';

initializeSEO({
  title: "Stavros Giannis - Software Engineer & Full-Stack Developer",
  description: "Portfolio of Stavros Giannis. Software Engineer specializing in C#, .NET, TypeScript, and React. Based in Düsseldorf, Germany.",
  keywords: "software engineer, web developer, C#, .NET, TypeScript, React, cybersecurity",
  ogImage: "/og-image.png",
  ogUrl: "https://stavros-giannis.de",
});
```

### Structured Data (JSON-LD)
```javascript
import { addPersonSchema, addProjectSchema } from './services/seoAndAccessibility';

// Automatically adds Person schema
addPersonSchema();

// Add schema for each project
projects.forEach(project => addProjectSchema(project));
```

### Sitemap & Robots
- Add sitemap.xml to public folder
- Configure robots.txt for search engines
- Add canonical tags for duplicate prevention

### Open Graph Tags
- og:title - Page title
- og:description - Page description
- og:image - Share image (1200x630px)
- og:url - Canonical URL
- og:type - Content type

### Twitter Card Tags
- twitter:card - summary_large_image
- twitter:creator - @stavrosgiannis
- twitter:image - Share image

## ♿ Accessibility Improvements

### ARIA Labels
```javascript
<button aria-label="Toggle navigation menu">
  Menu
</button>

<section aria-label="Skills">
  {/* Skills content */}
</section>
```

### Semantic HTML
```html
<!-- ✓ Good -->
<main>
  <section>
    <h1>About Me</h1>
    <article>Content</article>
  </section>
</main>

<!-- ✗ Avoid -->
<div>
  <div>
    <h1>About Me</h1>
    <div>Content</div>
  </div>
</div>
```

### Color Contrast
- Text: WCAG AA requires 4.5:1 contrast ratio
- Large text: WCAG AA requires 3:1 contrast ratio
- Current theme: --imp-text-color on --section-background-color

### Focus Management
```javascript
// Ensure keyboard navigation works
<button onFocus={(e) => e.target.style.outline = '2px solid #c770f0'}>
  Click me
</button>
```

### Image Alt Text
```jsx
<img 
  src="avatar.svg" 
  alt="Stavros Giannis software engineer avatar"
/>
```

### Form Labels
```jsx
<label htmlFor="email">Email Address</label>
<input 
  id="email" 
  type="email" 
  aria-required="true"
/>
```

### Skip Links
```html
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Loading States
```jsx
<div aria-live="polite" aria-atomic="true">
  {isLoading ? "Loading..." : content}
</div>
```

## 🧪 Testing Tools

### SEO Testing
- Google Search Console
- Lighthouse (Chrome DevTools)
- SEO Meta Tag Checker
- Rich Snippet Testing Tool

### Accessibility Testing
- axe DevTools
- WAVE Web Accessibility Evaluation Tool
- Lighthouse Accessibility Audit
- Manual keyboard testing

## 📋 SEO Checklist

- ✓ Meta descriptions for all pages
- ✓ Keyword optimization (not keyword stuffing)
- ✓ Internal linking structure
- ✓ Mobile responsive design
- ✓ Fast page loading (< 3s)
- ✓ XML sitemap
- ✓ robots.txt configured
- ✓ Structured data (JSON-LD)
- ✓ Open Graph tags
- ✓ Twitter Card tags
- ✓ HTTPS enabled
- ✓ No duplicate content

## ♿ Accessibility Checklist

- ✓ Keyboard navigation works
- ✓ Color contrast meets WCAG AA
- ✓ Images have alt text
- ✓ Form labels associated with inputs
- ✓ ARIA labels for icon buttons
- ✓ Semantic HTML structure
- ✓ Focus visible states
- ✓ No auto-playing audio/video
- ✓ Readable font sizes
- ✓ Proper heading hierarchy
- ✓ Links have descriptive text
- ✓ Error messages clearly visible

## 🚀 Best Practices

### URL Structure
```
Good:
/about
/projects/wlan-csi
/resume

Bad:
/page1
/p/123456
/get-cv
```

### Page Titles
```
Good: "Stavros Giannis - Software Engineer Portfolio"
Bad: "Home" or "Welcome"
```

### Meta Descriptions
```
Good: "Full-stack software engineer with expertise in C#, .NET, TypeScript, and React. 
Based in Düsseldorf, Germany."
Bad: "This is my website"
```

## 📊 Performance vs Accessibility Trade-offs

| Feature | Performance | Accessibility | Balance |
|---------|-------------|----------------|---------|
| Images | Lazy load | Require alt text | Use both |
| JavaScript | Minimize | Enhance interactivity | Code split |
| Colors | Fast rendering | High contrast | Use CSS vars |
| Animations | Reduce motion | Enhance experience | Respect prefers-reduced-motion |
| Forms | Minimal fields | Clear labels | Both needed |

## 🔗 Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Accessibility in Mind](https://webaim.org/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
