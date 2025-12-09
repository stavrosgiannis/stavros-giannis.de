/**
 * Unit Tests for Utility Functions
 * Run with: npm test
 */

import * as helpers from "../utils/helpers";
import * as validation from "../utils/validation";
import * as constants from "../utils/constants";

// ============ Helpers Tests ============

describe("Helpers - Date Functions", () => {
  test("formatDate should format date correctly", () => {
    const date = new Date("2025-12-09");
    const result = helpers.formatDate(date, "en-US");
    expect(result).toContain("December");
  });

  test("formatDateShort should return MM/DD/YYYY format", () => {
    const date = new Date("2025-12-09");
    const result = helpers.formatDateShort(date);
    expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
  });
});

describe("Helpers - String Functions", () => {
  test("truncateText should truncate text with suffix", () => {
    const text = "This is a long text that should be truncated";
    const result = helpers.truncateText(text, 10);
    expect(result).toHaveLength(13); // 10 chars + "..."
    expect(result).toContain("...");
  });

  test("getInitials should return initials from name", () => {
    const result = helpers.getInitials("Stavros Giannis");
    expect(result).toBe("SG");
  });
});

describe("Helpers - Array Functions", () => {
  test("shuffleArray should return array of same length", () => {
    const array = [1, 2, 3, 4, 5];
    const result = helpers.shuffleArray(array);
    expect(result).toHaveLength(array.length);
  });

  test("groupBy should group items by key", () => {
    const array = [
      { category: "A", name: "Item1" },
      { category: "B", name: "Item2" },
      { category: "A", name: "Item3" },
    ];
    const result = helpers.groupBy(array, "category");
    expect(Object.keys(result)).toContain("A");
    expect(Object.keys(result)).toContain("B");
    expect(result.A).toHaveLength(2);
  });

  test("getRandomItem should return item from array", () => {
    const array = [1, 2, 3, 4, 5];
    const result = helpers.getRandomItem(array);
    expect(array).toContain(result);
  });
});

describe("Helpers - Object Functions", () => {
  test("deepClone should create independent copy", () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = helpers.deepClone(original);
    cloned.b.c = 999;
    expect(original.b.c).toBe(2);
  });
});

describe("Helpers - Number Functions", () => {
  test("formatNumber should format numbers to K/M", () => {
    expect(helpers.formatNumber(1500)).toBe("1.5K");
    expect(helpers.formatNumber(1500000)).toBe("1.5M");
  });
});

// ============ Validation Tests ============

describe("Validation - Email", () => {
  test("validateEmail should accept valid emails", () => {
    expect(validation.validateEmail("test@example.com")).toBe(true);
  });

  test("validateEmail should reject invalid emails", () => {
    expect(validation.validateEmail("invalid.email")).not.toBe(true);
  });

  test("validateEmail should reject empty strings", () => {
    expect(validation.validateEmail("")).not.toBe(true);
  });
});

describe("Validation - Password Strength", () => {
  test("validatePasswordStrength should rate weak passwords", () => {
    const result = validation.validatePasswordStrength("weak");
    expect(result.strength).toBe("weak");
  });

  test("validatePasswordStrength should rate strong passwords", () => {
    const result = validation.validatePasswordStrength("StrongP@ss123");
    expect(result.strength).toBe("strong");
  });
});

describe("Validation - Phone", () => {
  test("validatePhone should accept valid phone numbers", () => {
    expect(validation.validatePhone("123-456-7890")).toBe(true);
  });

  test("validatePhone should reject numbers with < 10 digits", () => {
    expect(validation.validatePhone("123-456")).not.toBe(true);
  });
});

describe("Validation - URL", () => {
  test("validateURL should accept valid URLs", () => {
    expect(validation.validateURL("https://example.com")).toBe(true);
  });

  test("validateURL should reject invalid URLs", () => {
    expect(validation.validateURL("not a url")).not.toBe(true);
  });
});

describe("Validation - Message", () => {
  test("validateMessage should accept messages within range", () => {
    const msg = "This is a valid message";
    expect(validation.validateMessage(msg)).toBe(true);
  });

  test("validateMessage should reject short messages", () => {
    expect(validation.validateMessage("hi")).not.toBe(true);
  });
});

describe("Validation - Form Validation", () => {
  test("validateForm should validate all fields", () => {
    const formData = { email: "invalid" };
    const rules = { email: validation.validationRules.email };
    const errors = validation.validateForm(formData, rules);
    expect(errors.email).toBeDefined();
  });

  test("hasFormErrors should return true if errors exist", () => {
    const errors = { email: "Invalid email" };
    expect(validation.hasFormErrors(errors)).toBe(true);
  });
});

// ============ Constants Tests ============

describe("Constants", () => {
  test("BREAKPOINTS should have required sizes", () => {
    expect(constants.BREAKPOINTS.MOBILE).toBe(576);
    expect(constants.BREAKPOINTS.TABLET).toBe(768);
    expect(constants.BREAKPOINTS.DESKTOP).toBe(992);
  });

  test("ANIMATION_TIMINGS should have required values", () => {
    expect(constants.ANIMATION_TIMINGS.FAST).toBe(150);
    expect(constants.ANIMATION_TIMINGS.NORMAL).toBe(300);
  });

  test("RESUME_ACCESS should have correct code", () => {
    expect(constants.RESUME_ACCESS.CORRECT_CODE).toBe("WeWantYou");
  });
});

export default {
  // Test functions exported for integration
  helpers,
  validation,
  constants,
};
