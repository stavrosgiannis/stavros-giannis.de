import { useState, useEffect, useCallback } from "react";
import { debounce } from "../utils/helpers";

/**
 * Custom hook to track window size
 * @returns {Object} Object with width and height properties
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    const debouncedResize = debounce(handleResize, 150);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, [handleResize]);

  return windowSize;
}
