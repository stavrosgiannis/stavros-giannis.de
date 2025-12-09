import { useMemo } from "react";
import { useWindowSize } from "./useWindowSize";

/**
 * Custom hook to detect if viewport is mobile
 * @param {number} breakpoint - Breakpoint in pixels (default: 768)
 * @returns {boolean} True if viewport width is less than breakpoint
 */
export function useMobileDetect(breakpoint = 768) {
  const { width } = useWindowSize();
  return useMemo(() => width < breakpoint, [width, breakpoint]);
}
