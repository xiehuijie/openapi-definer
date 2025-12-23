/**
 * Utility functions for OpenAPI Definder
 */

/**
 * Format a path to ensure it starts with /
 * @param path - The path to format
 * @returns The formatted path
 */
export function formatPath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Validate an HTTP method
 * @param method - The HTTP method to validate
 * @returns True if the method is valid
 */
export function isValidHttpMethod(method: string): boolean {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
  return validMethods.includes(method.toUpperCase());
}
