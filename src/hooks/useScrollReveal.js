import { useLayoutEffect, useRef } from "react";

const REVEAL_LINE_RATIO = 0.85;
const REVEAL_ROOT_MARGIN = "0px 0px -35% 0px";

export function useScrollReveal() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll("[data-reveal]"));
    if (items.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const revealLine = window.innerHeight * REVEAL_LINE_RATIO;
    const pendingItems = items.filter((item) => {
      const bounds = item.getBoundingClientRect();
      const isInitiallyVisible =
        bounds.bottom > 0 && bounds.top < revealLine;
      return !isInitiallyVisible;
    });

    if (pendingItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.style.setProperty("--reveal-index", String(batchIndex));
          entry.target.classList.add("reveal-item--visible");
          observer.unobserve(entry.target);
          batchIndex += 1;
        }
      },
      {
        rootMargin: REVEAL_ROOT_MARGIN,
        threshold: 0,
      }
    );

    for (const item of pendingItems) {
      item.classList.add("reveal-item");
      observer.observe(item);
    }

    return () => {
      observer.disconnect();
      for (const item of pendingItems) {
        item.classList.remove("reveal-item", "reveal-item--visible");
        item.style.removeProperty("--reveal-index");
      }
    };
  }, []);

  return containerRef;
}
