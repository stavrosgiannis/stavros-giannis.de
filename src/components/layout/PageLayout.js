import React from "react";

/**
 * PageLayout - Main page layout wrapper
 * Provides consistent structure for all pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
export function PageLayout({ children, className = "" }) {
  return (
    <main className={`page ${className}`}>
      {children}
    </main>
  );
}

export default React.memo(PageLayout);
