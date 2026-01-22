import { z } from 'zod';
import { defineStruct } from '../dist/index.js';
import { t } from './common.ts';
import { randomUUID } from 'crypto';
import { USER_ID, USER_NAME, GENDER } from './fields.ts';

export const CreateUserRequest = defineStruct({
  id: 'CreateUserRequest',
  title: t({
    'zh-CN': '创建用户的请求体',
    'en-US': 'Create User Request Body',
  }),
  schema: z.object({
    name: USER_NAME,
    gender: GENDER,
  }),
  examples: [{ name: 'alice', gender: 'female' }],
});

export const User = defineStruct({
  id: 'User',
  title: t({
    'zh-CN': '用户数据实体',
    'en-US': 'User Data Entity',
  }),
  schema: z.object({
    id: USER_ID,
    name: USER_NAME,
    gender: GENDER,
  }),
  examples: [
    { id: randomUUID(), name: 'alice', gender: 'female' },
    { id: randomUUID(), name: 'bob', gender: 'male' },
  ],
});
