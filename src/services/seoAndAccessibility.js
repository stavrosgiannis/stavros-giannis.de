/**
 * SEO and Accessibility Utilities
 * Helps optimize meta tags, structured data, and accessibility
 */

/**
 * Set document meta tags dynamically
 * @param {Object} config - Meta configuration
 */
export function setMetaTags(config) {
  const {
    title = "Stavros Giannis - Software Engineer",
    description = "Portfolio of Stavros Giannis, Software Engineer specializing in C#, .NET, and TypeScript",
    keywords = "software engineer, web developer, C#, .NET, TypeScript, React",
    ogImage = "/og-image.png",
    ogUrl = "https://stavros-giannis.de",
    ogType = "website",
    twitterHandle = "@stavrosgiannis",
  } = config;

  // Set page title
  document.title = title;

  // Helper to set or create meta tag
  const setMetaTag = (name, value, isProperty = false) => {
    const attribute = isProperty ? "property" : "name";
    let element = document.querySelector(`meta[${attribute}="${name}"]`);

    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }

    element.setAttribute("content", value);
  };

  // Standard meta tags
  setMetaTag("description", description);
  setMetaTag("keywords", keywords);
  setMetaTag("viewport", "width=device-width, initial-scale=1");
  setMetaTag("charset", "UTF-8");
  setMetaTag("language", "English");
  setMetaTag("author", "Stavros Giannis");

  // Open Graph tags
  setMetaTag("og:title", title, true);
  setMetaTag("og:description", description, true);
  setMetaTag("og:image", ogImage, true);
  setMetaTag("og:url", ogUrl, true);
  setMetaTag("og:type", ogType, true);

  // Twitter Card tags
  setMetaTag("twitter:card", "summary_large_image", true);
  setMetaTag("twitter:title", title);
  setMetaTag("twitter:description", description);
  setMetaTag("twitter:image", ogImage);
  setMetaTag("twitter:creator", twitterHandle);

  // Robots meta tag
  setMetaTag(
    "robots",
    process.env.NODE_ENV === "production"
      ? "index, follow"
      : "noindex, nofollow"
  );
}

/**
 * Add structured data (JSON-LD) for SEO
 * @param {Object} data - Structured data object
 */
export function addStructuredData(data) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Add person schema
 */
export function addPersonSchema() {
  addStructuredData({
    "@context": "https://schema.org/",
    "@type": "Person",
    name: "Stavros Giannis",
    url: "https://stavros-giannis.de",
    jobTitle: "Software Engineer",
    description:
      "Full-stack software engineer specializing in C#, .NET, TypeScript, and React",
    image: "/avatar.svg",
    sameAs: [
      "https://github.com/stavrosgiannis",
      "https://linkedin.com/in/stavros-giannis-76818719b/",
      "https://instagram.com/stavi.g",
    ],
  });
}

/**
 * Add project schema
 * @param {Object} project - Project data
 */
export function addProjectSchema(project) {
  addStructuredData({
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.demo || project.github,
    applicationCategory: "Productivity",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  });
}

/**
 * Enhance accessibility with ARIA labels
 * @param {HTMLElement} element - DOM element
 * @param {string} ariaLabel - ARIA label
 */
export function setAriaLabel(element, ariaLabel) {
  if (element) {
    element.setAttribute("aria-label", ariaLabel);
  }
}

/**
 * Set ARIA live region for dynamic updates
 * @param {HTMLElement} element - DOM element
 * @param {string} politeness - "polite" or "assertive"
 */
export function setAriaLive(element, politeness = "polite") {
  if (element) {
    element.setAttribute("aria-live", politeness);
    element.setAttribute("aria-atomic", "true");
  }
}

/**
 * Initialize SEO and accessibility
 */
export function initializeSEO(config = {}) {
  setMetaTags(config);
  addPersonSchema();

  // Add canonical tag
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = "https://stavros-giannis.de";
    document.head.appendChild(link);
  }
}

export default {
  setMetaTags,
  addStructuredData,
  addPersonSchema,
  addProjectSchema,
  setAriaLabel,
  setAriaLive,
  initializeSEO,
};
