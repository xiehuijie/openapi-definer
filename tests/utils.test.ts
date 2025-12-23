import { describe, it, expect } from 'vitest';
import { formatPath, isValidHttpMethod } from '../src/utils';

describe('utils', () => {
  describe('formatPath', () => {
    it('should add leading slash if missing', () => {
      expect(formatPath('api/users')).toBe('/api/users');
    });

    it('should keep leading slash if present', () => {
      expect(formatPath('/api/users')).toBe('/api/users');
    });

    it('should handle empty string', () => {
      expect(formatPath('')).toBe('/');
    });

    it('should handle root path', () => {
      expect(formatPath('/')).toBe('/');
    });
  });

  describe('isValidHttpMethod', () => {
    it('should validate correct HTTP methods', () => {
      expect(isValidHttpMethod('GET')).toBe(true);
      expect(isValidHttpMethod('POST')).toBe(true);
      expect(isValidHttpMethod('PUT')).toBe(true);
      expect(isValidHttpMethod('DELETE')).toBe(true);
      expect(isValidHttpMethod('PATCH')).toBe(true);
      expect(isValidHttpMethod('HEAD')).toBe(true);
      expect(isValidHttpMethod('OPTIONS')).toBe(true);
    });

    it('should validate lowercase HTTP methods', () => {
      expect(isValidHttpMethod('get')).toBe(true);
      expect(isValidHttpMethod('post')).toBe(true);
    });

    it('should reject invalid HTTP methods', () => {
      expect(isValidHttpMethod('INVALID')).toBe(false);
      expect(isValidHttpMethod('CONNECT')).toBe(false);
      expect(isValidHttpMethod('')).toBe(false);
    });
  });
});
