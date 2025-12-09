/**
 * Utility helper functions
 * Reusable functions for common operations
 */

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'en-US')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = "en-US") => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
};

/**
 * Format date to short string (MM/DD/YYYY)
 * @param {Date|string} date - Date to format
 * @returns {string} Short formatted date
 */
export const formatDateShort = (date) => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US");
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, delay = 300) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

/**
 * Check if element is visible in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
export const isInViewport = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Smooth scroll to element
 * @param {HTMLElement|string} target - Element or selector to scroll to
 * @param {number} offset - Offset from top (default: 0)
 */
export const smoothScroll = (target, offset = 0) => {
  const element = typeof target === "string" ? document.querySelector(target) : target;
  if (!element) return;

  const top = element.offsetTop - offset;
  window.scrollTo({
    top,
    behavior: "smooth",
  });
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} True if successful
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  };
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials (e.g., "SG" for "Stavros Giannis")
 */
export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @param {string} suffix - Suffix to add (default: "...")
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100, suffix = "...") => {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.slice(0, length) + suffix;
};

/**
 * Get reading time for text
 * @param {string} text - Text to analyze
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {number} Reading time in minutes
 */
export const getReadingTime = (text, wordsPerMinute = 200) => {
  if (!text) return 0;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Format number to readable format
 * @param {number} num - Number to format
 * @returns {string} Formatted number (e.g., "1K", "1.5M")
 */
export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

/**
 * Sleep for specified duration
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
export const sleep = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Retry async function with exponential backoff
 * @param {Function} func - Async function to retry
 * @param {number} maxAttempts - Maximum retry attempts (default: 3)
 * @param {number} initialDelay - Initial delay in ms (default: 1000)
 * @returns {Promise} Result of function
 */
export const retryAsync = async (func, maxAttempts = 3, initialDelay = 1000) => {
  let lastError;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await func();
    } catch (error) {
      lastError = error;
      if (i < maxAttempts - 1) {
        const delay = initialDelay * Math.pow(2, i);
        await sleep(delay);
      }
    }
  }
  throw lastError;
};

/**
 * Get random item from array
 * @param {Array} array - Array to pick from
 * @returns {*} Random item from array
 */
export const getRandomItem = (array) => {
  if (!Array.isArray(array) || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Shuffle array (non-mutating)
 * @param {Array} array - Array to shuffle
 * @returns {Array} New shuffled array
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Deep clone object
 * @param {*} obj - Object to clone
 * @returns {*} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (obj instanceof Object) {
    const cloned = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
};

/**
 * Group array by property
 * @param {Array} array - Array to group
 * @param {string|Function} key - Property name or function
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  if (!Array.isArray(array)) return {};
  return array.reduce((result, item) => {
    const groupKey = typeof key === "function" ? key(item) : item[key];
    if (!result[groupKey]) result[groupKey] = [];
    result[groupKey].push(item);
    return result;
  }, {});
};

export default {
  formatDate,
  formatDateShort,
  debounce,
  throttle,
  isInViewport,
  smoothScroll,
  copyToClipboard,
  validateEmail,
  validateURL,
  getInitials,
  truncateText,
  getReadingTime,
  formatNumber,
  sleep,
  retryAsync,
  getRandomItem,
  shuffleArray,
  deepClone,
  groupBy,
};
