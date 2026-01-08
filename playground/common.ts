import { createTextDefiner, defineTag, defineLayer, defineApiKeySecurity } from '../dist/index.js';

export const t = createTextDefiner(['zh-CN', 'en-US'], 'zh-CN');

export const userTag = defineTag({
  name: 'user',
  description: t({
    'zh-CN': '与用户相关的操作',
    'en-US': 'Operations related to users',
  }),
});

export const userLayer = defineLayer({
  id: 'user',
  path: '/users',
  tags: [userTag],
});

export const Authorization = defineApiKeySecurity({
  in: 'header',
  name: 'Authorization',
  description: t({
    'zh-CN': '用于授权校验',
    'en-US': 'Authorization',
  }),
});

export const Signature = defineApiKeySecurity({
  in: 'header',
  name: 'Signature',
  description: t({
    'zh-CN': '请求签名，用于防篡改',
    'en-US': 'Request signature for tamper-proofing',
  }),
});
