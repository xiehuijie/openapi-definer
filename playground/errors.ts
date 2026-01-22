import { defineError } from '../dist/index.js';
import { t } from './common.ts';

export const UserNotFound = defineError({
  id: 'UserNotFound',
  message: '',
  code: '1001',
  status: 404,
  description: t({
    'zh-CN': '请求的用户不存在',
    'en-US': 'The requested user does not exist',
  }),
});

export const UserAlreadyExists = defineError({
  id: 'UserAlreadyExists',
  code: '1002',
  message: '',
  status: 409,
  description: t({
    'zh-CN': '尝试创建的用户已存在',
    'en-US': 'The user being created already exists',
  }),
});
