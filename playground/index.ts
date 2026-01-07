import { defineApp } from 'openapi-definer';
import { Authorization, Signature } from './common.ts';
import { endpoints } from './endpoints.ts';

export const app = defineApp({
  endpoints: [...endpoints],
  security: [Authorization, Signature],
});
