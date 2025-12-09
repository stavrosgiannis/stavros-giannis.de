/**
 * Validation utilities
 * Functions for common validation tasks
 */

/**
 * Validation schema for form fields
 */
export const validationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
    maxLength: {
      value: 50,
      message: "Name must not exceed 50 characters",
    },
  },
  phone: {
    pattern: {
      value: /^[\d\s\-\+\(\)]+$/,
      message: "Invalid phone number format",
    },
  },
  url: {
    pattern: {
      value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
      message: "Invalid URL format",
    },
  },
};

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {boolean|string} True if valid, error message otherwise
 */
export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!validationRules.email.pattern.value.test(email)) {
    return validationRules.email.pattern.message;
  }
  return true;
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with strength level and feedback
 */
export const validatePasswordStrength = (password) => {
  const result = {
    score: 0,
    strength: "weak",
    feedback: [],
  };

  if (!password) return result;

  // Length check
  if (password.length >= 8) result.score++;
  if (password.length >= 12) result.score++;

  // Character type checks
  if (/[a-z]/.test(password)) result.score++;
  if (/[A-Z]/.test(password)) result.score++;
  if (/[0-9]/.test(password)) result.score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) result.score++;

  // Determine strength
  if (result.score <= 2) {
    result.strength = "weak";
    result.feedback.push("Use a longer password");
    result.feedback.push("Include uppercase letters");
    result.feedback.push("Include special characters");
  } else if (result.score <= 4) {
    result.strength = "moderate";
    result.feedback.push("Consider adding more character variety");
  } else {
    result.strength = "strong";
    result.feedback.push("Great password!");
  }

  return result;
};

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {boolean|string} True if valid, error message otherwise
 */
export const validateName = (name) => {
  if (!name) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  if (name.length > 50) return "Name must not exceed 50 characters";
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return "Name contains invalid characters";
  return true;
};

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean|string} True if valid, error message otherwise
 */
export const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";
  if (!/^[\d\s\-\+\(\)]+$/.test(phone)) return "Invalid phone number format";
  if (phone.replace(/\D/g, "").length < 10) return "Phone number must have at least 10 digits";
  return true;
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean|string} True if valid, error message otherwise
 */
export const validateURL = (url) => {
  if (!url) return "URL is required";
  try {
    new URL(url);
    return true;
  } catch {
    return "Invalid URL format";
  }
};

/**
 * Validate message/text
 * @param {string} text - Text to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @returns {boolean|string} True if valid, error message otherwise
 */
export const validateMessage = (text, minLength = 10, maxLength = 1000) => {
  if (!text) return "Message is required";
  if (text.length < minLength) return `Message must be at least ${minLength} characters`;
  if (text.length > maxLength) return `Message must not exceed ${maxLength} characters`;
  return true;
};

/**
 * Validate access code
 * @param {string} code - Code to validate
 * @param {string} correctCode - Correct code
 * @returns {boolean|string} True if valid, error message otherwise
 */
export const validateAccessCode = (code, correctCode) => {
  if (!code) return "Access code is required";
  if (code !== correctCode) return "Invalid access code";
  return true;
};

/**
 * Validate form object against rules
 * @param {Object} formData - Form data to validate
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation errors object
 */
export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((fieldName) => {
    const fieldValue = formData[fieldName];
    const fieldRules = rules[fieldName];

    // Check required
    if (fieldRules.required && !fieldValue) {
      errors[fieldName] = fieldRules.required;
      return;
    }

    if (!fieldValue) return;

    // Check pattern
    if (fieldRules.pattern && !fieldRules.pattern.value.test(fieldValue)) {
      errors[fieldName] = fieldRules.pattern.message;
      return;
    }

    // Check min length
    if (fieldRules.minLength && fieldValue.length < fieldRules.minLength.value) {
      errors[fieldName] = fieldRules.minLength.message;
      return;
    }

    // Check max length
    if (fieldRules.maxLength && fieldValue.length > fieldRules.maxLength.value) {
      errors[fieldName] = fieldRules.maxLength.message;
      return;
    }

    // Check custom validator
    if (fieldRules.validate && typeof fieldRules.validate === "function") {
      const customError = fieldRules.validate(fieldValue);
      if (customError) {
        errors[fieldName] = customError;
      }
    }
  });

  return errors;
};

/**
 * Check if form has errors
 * @param {Object} errors - Errors object from validateForm
 * @returns {boolean} True if form has any errors
 */
export const hasFormErrors = (errors) => {
  return Object.values(errors).some((error) => error !== undefined && error !== "");
};

/**
 * Sanitize form input
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

export default {
  validationRules,
  validateEmail,
  validatePasswordStrength,
  validateName,
  validatePhone,
  validateURL,
  validateMessage,
  validateAccessCode,
  validateForm,
  hasFormErrors,
  sanitizeInput,
};
