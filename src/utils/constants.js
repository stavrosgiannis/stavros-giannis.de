/**
 * Application-wide constants
 * Centralized constants used throughout the application
 */

// Breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: 576,
  TABLET: 768,
  DESKTOP: 992,
  LARGE: 1200,
  XLARGE: 1400,
};

// Animation timings (in milliseconds)
export const ANIMATION_TIMINGS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
};

// Scroll throttle delay
export const SCROLL_THROTTLE_DELAY = 100;

// Particle configuration
export const PARTICLE_CONFIG = {
  DESKTOP_COUNT: 80,
  MOBILE_COUNT: 30,
  MOBILE_BREAKPOINT: 768,
  DESKTOP_SPEED: 0.05,
  MOBILE_SPEED: 0.02,
};

// Resume access configuration
export const RESUME_ACCESS = {
  CORRECT_CODE: "WeWantYou",
  MAX_ATTEMPTS: 3,
  LOCK_DURATION: 3600000, // 1 hour in milliseconds
};

// Social media icons and colors
export const SOCIAL_COLORS = {
  github: "#333333",
  linkedin: "#0077b5",
  instagram: "#E1306C",
  twitter: "#1DA1F2",
  email: "#EA4335",
};

// Project card configuration
export const PROJECT_CONFIG = {
  CARDS_PER_ROW: 3,
  CARD_MIN_HEIGHT: 400,
};

// Skill level thresholds
export const SKILL_LEVELS = {
  EXPERT: 90,
  ADVANCED: 70,
  INTERMEDIATE: 50,
  BEGINNER: 25,
};

// Feature flags
export const FEATURE_FLAGS = {
  SHOW_PARTICLES: true,
  ENABLE_ANIMATIONS: true,
  SHOW_COMING_SOON: false,
  ENABLE_DARK_MODE: false,
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_CODE: "Invalid access code. Please try again.",
  MAX_ATTEMPTS_EXCEEDED: "Too many failed attempts. Please try again later.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  NOT_FOUND: "The requested resource was not found.",
};

// Success messages
export const SUCCESS_MESSAGES = {
  ACCESS_GRANTED: "Access granted!",
  COPIED_TO_CLIPBOARD: "Copied to clipboard!",
  MESSAGE_SENT: "Message sent successfully!",
};

// API endpoints (if needed)
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || "https://api.example.com",
  PROJECTS: "/projects",
  SKILLS: "/skills",
  CONTACT: "/contact",
};

// Cache keys
export const CACHE_KEYS = {
  PORTFOLIO_DATA: "portfolio_data",
  GITHUB_CONTRIBUTION: "github_contribution",
};

// Local storage keys
export const LOCAL_STORAGE_KEYS = {
  THEME: "app_theme",
  LANGUAGE: "app_language",
  RESUME_ACCESS_GRANTED: "resume_access_granted",
  USER_PREFERENCES: "user_preferences",
};

export default {
  BREAKPOINTS,
  ANIMATION_TIMINGS,
  SCROLL_THROTTLE_DELAY,
  PARTICLE_CONFIG,
  RESUME_ACCESS,
  SOCIAL_COLORS,
  PROJECT_CONFIG,
  SKILL_LEVELS,
  FEATURE_FLAGS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  API_ENDPOINTS,
  CACHE_KEYS,
  LOCAL_STORAGE_KEYS,
};
