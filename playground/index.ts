/**
 * Playground for testing OpenAPI Definder
 *
 * Run with: pnpm playground
 */

import { defineApi, formatPath, isValidHttpMethod, version } from '../src/index.js';

console.log('='.repeat(60));
console.log('OpenAPI Definder Playground');
console.log(`Version: ${version}`);
console.log('='.repeat(60));
console.log();

// Example 1: Define an API
console.log('Example 1: Define an API');
console.log('-'.repeat(60));
const api = defineApi({
  name: 'pet-store',
  version: '1.0.0',
  description: 'A sample Pet Store API',
});
console.log('API Definition:', api);
console.log();

// Example 2: Format paths
console.log('Example 2: Format paths');
console.log('-'.repeat(60));
console.log('formatPath("api/users"):', formatPath('api/users'));
console.log('formatPath("/api/users"):', formatPath('/api/users'));
console.log();

// Example 3: Validate HTTP methods
console.log('Example 3: Validate HTTP methods');
console.log('-'.repeat(60));
console.log('isValidHttpMethod("GET"):', isValidHttpMethod('GET'));
console.log('isValidHttpMethod("post"):', isValidHttpMethod('post'));
console.log('isValidHttpMethod("INVALID"):', isValidHttpMethod('INVALID'));
console.log();

console.log('='.repeat(60));
console.log('Playground execution complete!');
console.log('='.repeat(60));
