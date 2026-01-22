import { defineField } from '../dist/index.js';
import { t } from './common.ts';
import { z } from 'zod';
import { randomUUID } from 'crypto';

/** 用户ID */
export const USER_ID = defineField({
  id: 'USER_ID',
  title: t({
    'zh-CN': '用户ID',
    'en-US': 'User ID',
  }),
  schema: z.uuidv4(),
  examples: [randomUUID(), randomUUID()],
});

/** 用户姓名 */
export const USER_NAME = defineField({
  id: 'USER_NAME',
  title: t({
    'zh-CN': '用户姓名',
    'en-US': 'User Name',
  }),
  schema: z.string().min(3).max(30),
  examples: ['alice', 'bob', 'charlie'],
});

/** 性别 */
export const GENDER = defineField({
  id: 'GENDER',
  title: t({
    'zh-CN': '性别',
    'en-US': 'Gender',
  }),
  schema: z.enum(['male', 'female', 'other']),
  examples: ['male', 'female'],
});
