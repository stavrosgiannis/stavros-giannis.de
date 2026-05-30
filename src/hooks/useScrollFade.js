import { useLayoutEffect, useRef, useState } from "react";

export function useScrollFade() {
  const ref = useRef(null);
  const [revealClass, setRevealClass] = useState("");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const initialBounds = el.getBoundingClientRect();
    const revealLine = window.innerHeight * 0.85;
    const isInitiallyVisible =
      initialBounds.bottom > 0 && initialBounds.top < revealLine;

    if (isInitiallyVisible || !("IntersectionObserver" in window)) {
      return;
    }

    let previousScrollY = window.scrollY;
    const scrollDirection = { current: null };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > previousScrollY) {
        scrollDirection.current = "down";
      } else if (currentScrollY < previousScrollY) {
        scrollDirection.current = "up";
      }

      previousScrollY = currentScrollY;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealClass(
            scrollDirection.current === "down" ? "section-fade-in" : ""
          );
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -15% 0px",
        threshold: 0,
      }
    );

    setRevealClass("section-pending");
    window.addEventListener("scroll", handleScroll, { passive: true });
    observer.observe(el);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return [ref, revealClass];
}
