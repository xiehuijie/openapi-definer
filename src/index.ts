/**
 * OpenAPI Definder - Main Entry Point
 *
 * A factory definition program that allows you to define things related to the API
 * using intuitive code and generate a non-intrusive SDK that can be highly reused
 * by both the server and the client.
 */

export const version = '0.1.0';

/**
 * Main API definition interface
 */
export interface ApiDefinition {
  name: string;
  version: string;
  description?: string;
}

/**
 * Create an API definition
 * @param definition - The API definition configuration
 * @returns The configured API definition
 */
export function defineApi(definition: ApiDefinition): ApiDefinition {
  return definition;
}

// Export all types and utilities
export * from './types';
export * from './utils';
