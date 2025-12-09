/**
 * Performance Monitoring Service
 * Tracks Web Vitals and component performance metrics
 */

// Web Vitals thresholds (in milliseconds)
export const VITALS_THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint
  FID: 100,  // First Input Delay
  CLS: 0.1,  // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint
  TTFB: 600, // Time to First Byte
};

/**
 * Report Web Vitals metrics
 * @param {Function} callback - Callback to handle metrics
 */
export function reportWebVitals(callback) {
  try {
    // Largest Contentful Paint
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          callback({
            name: "LCP",
            value: entry.renderTime || entry.loadTime,
            rating: entry.renderTime || entry.loadTime > VITALS_THRESHOLDS.LCP ? "poor" : "good",
          });
        }
      });
      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    }

    // First Input Delay
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const delay = entry.processingEnd - entry.startTime;
          callback({
            name: "FID",
            value: delay,
            rating: delay > VITALS_THRESHOLDS.FID ? "poor" : "good",
          });
        }
      });
      observer.observe({ entryTypes: ["first-input"] });
    }

    // Cumulative Layout Shift
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        callback({
          name: "CLS",
          value: clsValue,
          rating: clsValue > VITALS_THRESHOLDS.CLS ? "poor" : "good",
        });
      });
      observer.observe({ entryTypes: ["layout-shift"] });
    }

    // Navigation Timing metrics
    if ("PerformanceNavigationTiming" in window) {
      window.addEventListener("load", () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        callback({
          name: "Page Load Time",
          value: pageLoadTime,
          rating: pageLoadTime > 3000 ? "poor" : "good",
        });

        // First Contentful Paint
        const fcp = perfData.responseEnd - perfData.navigationStart;
        callback({
          name: "FCP",
          value: fcp,
          rating: fcp > VITALS_THRESHOLDS.FCP ? "poor" : "good",
        });
      });
    }
  } catch (error) {
    console.error("Error reporting web vitals:", error);
  }
}

/**
 * Measure component render time
 * @param {string} componentName - Component name for tracking
 * @param {Function} callback - Callback with render time
 */
export function measureComponentRender(componentName, callback) {
  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    callback({
      component: componentName,
      renderTime,
      rating: renderTime > 16.67 ? "slow" : "fast", // 60fps threshold
    });
  };
}

/**
 * Get performance metrics
 * @returns {Object} Performance metrics
 */
export function getPerformanceMetrics() {
  if (!window.performance) {
    return null;
  }

  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

  return {
    pageLoadTime,
    domInteractiveTime: perfData.domInteractive - perfData.navigationStart,
    resourceLoadTime: perfData.responseEnd - perfData.fetchStart,
    domContentLoadedTime: perfData.domContentLoadedEventEnd - perfData.navigationStart,
  };
}

/**
 * Log performance metrics to console (development only)
 */
export function logPerformanceMetrics() {
  if (process.env.NODE_ENV === "development") {
    const metrics = getPerformanceMetrics();
    if (metrics) {
      console.group("Performance Metrics");
      console.table(metrics);
      console.groupEnd();
    }
  }
}

/**
 * Initialize performance monitoring
 * @param {boolean} logMetrics - Whether to log metrics to console
 */
export function initializePerformanceMonitoring(logMetrics = false) {
  reportWebVitals((metric) => {
    if (logMetrics) {
      console.log(`${metric.name}: ${metric.value}ms (${metric.rating})`);
    }

    // Send to analytics service if available
    if (window.gtag) {
      window.gtag("event", metric.name, {
        value: Math.round(metric.value),
        event_category: "Web Vitals",
        event_label: metric.rating,
        non_interaction: true,
      });
    }
  });

  if (logMetrics) {
    logPerformanceMetrics();
  }
}

export default {
  VITALS_THRESHOLDS,
  reportWebVitals,
  measureComponentRender,
  getPerformanceMetrics,
  logPerformanceMetrics,
  initializePerformanceMonitoring,
};
