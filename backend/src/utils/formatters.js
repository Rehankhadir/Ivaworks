/**
 * Parse JSON columns returned by MySQL into native JS arrays/objects.
 */
function parseJsonField(value, fallback = []) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * Format a DB timestamp for API consumers (ISO string).
 */
function formatDate(date) {
  if (!date) return null;
  return new Date(date).toISOString();
}

/**
 * Format blog date for public display (matches frontend seed format).
 */
function formatBlogDate(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

module.exports = { parseJsonField, formatDate, formatBlogDate };
