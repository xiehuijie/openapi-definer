import { defineApi, formatPath, isValidHttpMethod } from '../../src/index.js';

// Define a Pet Store API
const petStoreApi = defineApi({
  name: 'pet-store',
  version: '1.0.0',
  description: 'A sample Pet Store API',
});

console.log('Pet Store API Definition:');
console.log(petStoreApi);
console.log();

// Demonstrate utility functions
console.log('Utility Functions:');
console.log('formatPath("api/pets"):', formatPath('api/pets'));
console.log('isValidHttpMethod("GET"):', isValidHttpMethod('GET'));
console.log('isValidHttpMethod("INVALID"):', isValidHttpMethod('INVALID'));
