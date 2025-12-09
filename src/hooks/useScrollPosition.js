import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook to track scroll position
 * @returns {Object} Object with position and direction
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const prevScrollRef = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;
    const direction = currentScroll > prevScrollRef.current ? "down" : "up";

    setScrollPosition(currentScroll);
    setScrollDirection(direction);
    prevScrollRef.current = currentScroll;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    position: scrollPosition,
    direction: scrollDirection,
    isScrolled: scrollPosition > 0,
  };
}
