import { describe, it, expect } from 'vitest';
import { defineApi, version } from '../src/index';

describe('openapi-definder', () => {
  describe('version', () => {
    it('should export version', () => {
      expect(version).toBeDefined();
      expect(typeof version).toBe('string');
    });
  });

  describe('defineApi', () => {
    it('should create an API definition', () => {
      const definition = defineApi({
        name: 'test-api',
        version: '1.0.0',
        description: 'Test API',
      });

      expect(definition).toBeDefined();
      expect(definition.name).toBe('test-api');
      expect(definition.version).toBe('1.0.0');
      expect(definition.description).toBe('Test API');
    });

    it('should create an API definition without description', () => {
      const definition = defineApi({
        name: 'test-api',
        version: '1.0.0',
      });

      expect(definition).toBeDefined();
      expect(definition.name).toBe('test-api');
      expect(definition.version).toBe('1.0.0');
      expect(definition.description).toBeUndefined();
    });
  });
});
