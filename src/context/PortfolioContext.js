import React, { createContext, useContext, useMemo } from "react";
import { PORTFOLIO_META, SOCIAL_LINKS, INTERESTS, TECHNOLOGIES_FOCUS } from "../data/portfolio.data";
import { SKILLS_DATA, TOOLS_DATA } from "../data/skills.data";
import { PROJECTS_DATA } from "../data/projects.data";
import { ROUTES, NAV_ITEMS, RESUME_CONFIG } from "../data/navigation.config";

const PortfolioContext = createContext();

/**
 * PortfolioProvider - Centralizes all portfolio data
 * Provides access to portfolio information throughout the app
 */
export function PortfolioProvider({ children }) {
  const value = useMemo(
    () => ({
      // Portfolio metadata
      portfolio: PORTFOLIO_META,
      socials: SOCIAL_LINKS,
      interests: INTERESTS,
      technologies: TECHNOLOGIES_FOCUS,

      // Content data
      projects: PROJECTS_DATA,
      skills: SKILLS_DATA,
      tools: TOOLS_DATA,

      // Configuration
      routes: ROUTES,
      navItems: NAV_ITEMS,
      resumeConfig: RESUME_CONFIG,
    }),
    []
  );

  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  );
}

/**
 * Custom hook to access portfolio context
 * @throws {Error} If used outside of PortfolioProvider
 * @returns {Object} Portfolio data and configuration
 */
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error(
      "usePortfolio must be used within a PortfolioProvider component"
    );
  }
  return context;
}
