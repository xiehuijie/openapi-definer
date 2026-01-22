import { defineApp } from '../dist/index.js';
import { Authorization, Signature, t } from './common.ts';
import { endpoints } from './endpoints.ts';

export default defineApp({
  title: t({
    'zh-CN': '示例 API',
    'en-US': 'Example API',
  }),
  version: '1.0.0',
  description: t({
    'zh-CN': '这是一个示例 API 文档',
    'en-US': 'This is an example API documentation',
  }),
  endpoints: [...endpoints],
  security: [Authorization.require(), Signature.require()],
});
