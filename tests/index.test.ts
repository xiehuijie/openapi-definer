import { describe, it, expect } from 'vitest';
import { version } from '../src/index';

describe('openapi-definder', () => {
  describe('version', () => {
    it('should export version', () => {
      expect(version).toBeDefined();
      expect(typeof version).toBe('string');
      expect(version).toBe('0.1.0');
    });
  });
});
