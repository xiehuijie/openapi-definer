import * as def from 'openapi-definer';
import { z } from 'zod';
import { randomUUID } from 'crypto';

const t = def.createTextDefiner(['zh-CN', 'en-US'], 'zh-CN');

const USER_ID = def.defineField({
  id: 'USER_ID',
  title: t({
    'zh-CN': '用户ID',
    'en-US': 'User ID',
  }),
  schema: z.uuidv4(),
  examples: [randomUUID(), randomUUID()],
});

const USER_NAME = def.defineField({
  id: 'USER_NAME',
  title: t({
    'zh-CN': '用户名',
    'en-US': 'User Name',
  }),
  schema: z.string().min(3).max(30),
  examples: ['alice', 'bob', 'charlie'],
});

const GENDER = def.defineField({
  id: 'GENDER',
  title: t({
    'zh-CN': '性别',
    'en-US': 'Gender',
  }),
  schema: z.enum(['male', 'female', 'other']),
  examples: ['male', 'female'],
});

const CreateUserRequest = def.defineStruct({
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

const User = def.defineStruct({
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

const UserNotFound = def.defineError({
  id: 'UserNotFound',
  name: t({
    'zh-CN': '用户未找到错误',
    'en-US': 'User Not Found Error',
  }),
  http: 404,
  description: t({
    'zh-CN': '请求的用户不存在',
    'en-US': 'The requested user does not exist',
  }),
});

const UserAlreadyExists = def.defineError({
  id: 'UserAlreadyExists',
  name: t({
    'zh-CN': '用户已存在错误',
    'en-US': 'User Already Exists Error',
  }),
  http: 409,
  description: t({
    'zh-CN': '尝试创建的用户已存在',
    'en-US': 'The user being created already exists',
  }),
});

const createUser = def.defineEndpoint({
  id: 'createUser',
  path: '/users',
  method: 'POST',
  summary: t({
    'zh-CN': '创建新用户',
    'en-US': 'Create a New User',
  }),
  inputs: {
    body: def.defineJsonContent({
      schema: CreateUserRequest,
    }),
  },
  outputs: [
    {
      status: 201,
      description: t({
        'zh-CN': '用户创建成功',
        'en-US': 'User Created Successfully',
      }),
      content: def.defineJsonContent({
        schema: User,
      }),
    },
  ],
});

const getUser = def.defineEndpoint({
  id: 'getUser',
  path: '/users/{userId}',
  method: 'GET',
  summary: t({
    'zh-CN': '获取用户信息',
    'en-US': 'Get User Information',
  }),
  inputs: {
    path: {
      userId: USER_ID,
    },
  },
  outputs: [
    {
      status: 200,
      description: t({
        'zh-CN': '用户信息',
        'en-US': 'User Information',
      }),
      content: def.defineJsonContent({
        schema: User,
      }),
    },
  ],
});
