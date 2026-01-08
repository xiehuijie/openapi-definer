import { defineEndpoint, defineJsonContent } from '../dist/index.js';
import { userLayer, t, Signature } from './common.ts';
import { UserAlreadyExists, UserNotFound } from './errors.ts';
import { USER_ID } from './fields.ts';
import { CreateUserRequest, User } from './structs.ts';
import { z } from 'zod';

const createUser = defineEndpoint({
  id: 'createUser',
  layer: userLayer,
  path: '',
  method: 'POST',
  title: t({
    'zh-CN': '创建新用户',
    'en-US': 'Create a New User',
  }),
  parameters: {
    body: {
      content: defineJsonContent({
        schema: CreateUserRequest,
      }),
    },
  },
  responses: [
    {
      status: 201,
      description: t({
        'zh-CN': '用户创建成功',
        'en-US': 'User Created Successfully',
      }),
      content: defineJsonContent({
        schema: User,
      }),
    },
  ],
  errors: [UserAlreadyExists],
});

const getUser = defineEndpoint({
  id: 'getUser',
  layer: userLayer,
  path: '/{userId}',
  method: 'GET',
  title: t({
    'zh-CN': '获取用户信息',
    'en-US': 'Get User Information',
  }),
  parameters: {
    path: {
      userId: USER_ID,
    },
  },
  responses: [
    {
      status: 200,
      description: t({
        'zh-CN': '用户信息',
        'en-US': 'User Information',
      }),
      content: defineJsonContent({
        schema: User,
      }),
    },
  ],
  errors: [UserNotFound],
});

const login = defineEndpoint({
  id: 'login',
  path: '/login',
  method: 'POST',
  security: [Signature],
  parameters: {
    body: {
      content: defineJsonContent({
        schema: z.object({
          username: z.string(),
          password: z.string(),
        }),
      }),
    },
  },
  responses: [
    {
      status: 200,
      description: t({
        'zh-CN': '登录成功',
        'en-US': 'Login Successful',
      }),
      content: defineJsonContent({
        schema: z.object({
          token: z.string(),
        }),
      }),
    },
  ],
});

export const endpoints = [createUser, getUser, login];
