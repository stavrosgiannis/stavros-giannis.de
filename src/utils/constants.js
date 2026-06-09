/**
 * Application-wide constants
 * Centralized constants used throughout the application
 */

// Particle configuration
export const PARTICLE_CONFIG = {
  DESKTOP_COUNT: 110,
  MOBILE_COUNT: 42,
  MOBILE_BREAKPOINT: 768,
  DESKTOP_SPEED: 0.006,
  MOBILE_SPEED: 0.003,
};

// Resume lockout configuration (secret code is read from VITE_RESUME_CODE or REACT_APP_RESUME_CODE)
export const MAX_ATTEMPTS = 3;
export const LOCK_DURATION = 3600000; // 1 hour in milliseconds
