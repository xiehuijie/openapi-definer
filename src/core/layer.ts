import type { SecurityDefinition } from './security.ts';

interface LayerOptions {
  /**
   * ### 共同路径
   */
  path: string;
  /**
   * ### 共同安全配置
   */
  security?: SecurityDefinition[];
}

export class LayerDefinition {
  constructor(public options: LayerOptions) {}
}

export const defineLayer = (options: LayerOptions) => new LayerDefinition(options);
