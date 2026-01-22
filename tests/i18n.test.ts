import { defineApp, createTextDefiner, _generate, defineEndpoint } from '../src/index.ts';
import { describe, it, expect } from 'vitest';

describe('Internationalization (i18n)', () => {
  it('should support string literals', () => {
    const app = defineApp({
      title: 'Test API',
      version: '1.0.0',
      description: 'A simple test API',
      endpoints: [],
    });
    
    expect(app.title).toBe('Test API');
    expect(app.description).toBe('A simple test API');
  });
  
  it('should support createTextDefiner with multiple languages', () => {
    const t = createTextDefiner(['zh', 'en'] as const, 'zh');
    
    const app = defineApp({
      title: t({
        zh: '测试 API',
        en: 'Test API',
      }),
      version: '1.0.0',
      description: t({
        zh: '一个简单的测试 API',
        en: 'A simple test API',
      }),
      endpoints: [],
    });
    
    // The title should be an object with both languages
    expect(typeof app.title).toBe('object');
    expect((app.title as any).zh).toBe('测试 API');
    expect((app.title as any).en).toBe('Test API');
  });
  
  it('should generate Chinese OpenAPI spec', () => {
    const t = createTextDefiner(['zh', 'en'] as const, 'zh');
    
    const app = defineApp({
      title: t({
        zh: '测试 API',
        en: 'Test API',
      }),
      version: '1.0.0',
      description: t({
        zh: '一个简单的测试 API',
        en: 'A simple test API',
      }),
      endpoints: [],
    });
    
    const spec = _generate(app, 'zh');
    
    expect(spec.info.title).toBe('测试 API');
    expect(spec.info.description).toBe('一个简单的测试 API');
  });
  
  it('should generate English OpenAPI spec', () => {
    const t = createTextDefiner(['zh', 'en'] as const, 'zh');
    
    const app = defineApp({
      title: t({
        zh: '测试 API',
        en: 'Test API',
      }),
      version: '1.0.0',
      description: t({
        zh: '一个简单的测试 API',
        en: 'A simple test API',
      }),
      endpoints: [],
    });
    
    const spec = _generate(app, 'en');
    
    expect(spec.info.title).toBe('Test API');
    expect(spec.info.description).toBe('A simple test API');
  });
  
  it('should fallback to default language when requested language is not available', () => {
    const t = createTextDefiner(['zh', 'en'] as const, 'zh');
    
    const app = defineApp({
      title: t({
        zh: '测试 API',
        en: 'Test API',
      }),
      version: '1.0.0',
      endpoints: [],
    });
    
    // Request a language that doesn't exist, should fallback
    const spec = _generate(app, 'es'); // Spanish not defined
    
    // Should fallback to 'en' or 'zh' or first available
    expect(spec.info.title).toBeTruthy();
    expect(['Test API', '测试 API']).toContain(spec.info.title);
  });
  
  it('should work with mixed string and i18n text', () => {
    const t = createTextDefiner(['zh', 'en'] as const, 'zh');
    
    const app = defineApp({
      title: t({
        zh: '测试 API',
        en: 'Test API',
      }),
      version: '1.0.0',
      description: t('Simple description without i18n'), // Plain string wrapped with t()
      endpoints: [],
    });
    
    const specZh = _generate(app, 'zh');
    
    expect(specZh.info.title).toBe('测试 API');
    expect(specZh.info.description).toBe('Simple description without i18n');
    
    const specEn = _generate(app, 'en');
    
    expect(specEn.info.title).toBe('Test API');
    expect(specEn.info.description).toBe('Simple description without i18n');
  });
});
