import type { SecurityDefinition } from './security.ts';
import type { TagDefinition } from './tag.ts';
import type { ExternalDocsDefinition } from './external.ts';
import type { CommonParameters } from './endpoint.ts';

interface LayerOptions {
  /**
   * ### 层ID `unique`
   * ---
   * - 用于标识该层的ID，全局唯一
   */
  id: string;
  /**
   * ### 共同路径
   * ---
   * - 该路径会作为所属端点路径的前缀
   * - 路径需以斜杠`/`开头
   * - 该路径为相对于所属层的路径，若无所属层则为绝对路径
   */
  path: string;
  /**
   * ### 所属层
   * ---
   * - 若设置此属性，则此层会在该层的共同路径、标签和安全配置等基础上进行扩展。
   * - 不同属性的合并规则详见各属性说明。
   */
  layer?: LayerDefinition;
  /**
   * ### 共同安全配置
   * ---
   * - 适用于此层内所有接口的安全配置。
   * - 将会完全覆盖已在上层中定义的安全配置。
   */
  security?: SecurityDefinition[];
  /**
   * ### 共同标签
   * ---
   * - 适用于此层内所有接口的标签。
   * - 将会扩展已在上层中定义的标签，而非覆盖它们。
   */
  tags?: TagDefinition[];
  /**
   * ### 共同外部文档
   * ---
   * - 适用于此层内所有接口的外部文档。
   * - 将会覆盖已在上层中定义的外部文档。
   */
  externalDocs?: ExternalDocsDefinition;
  /**
   * ### 共同请求参数
   * ---
   * - 适用于此层内所有接口的参数。
   * - 将会扩展已在上层中定义的参数。
   * - 如果参数已在上层中定义，则新定义将覆盖它，但永远不会删除它。
   */
  parameters?: CommonParameters;
}

export class LayerDefinition {
  /** {@link LayerOptions.id 层ID} */
  public readonly id: string;

  /** {@link LayerOptions.path 共同路径} */
  public readonly path: string;

  /** {@link LayerOptions.security 共同安全配置} */
  public readonly security: readonly SecurityDefinition[];

  /** {@link LayerOptions.tags 共同标签} */
  public readonly tags: readonly TagDefinition[];

  /** {@link LayerOptions.externalDocs 共同外部文档} */
  public readonly externalDocs: ExternalDocsDefinition;

  /** {@link LayerOptions.parameters 共同请求参数} */
  public readonly parameters: CommonParameters;

  constructor(options: LayerOptions) {
    const upper = options.layer === void 0 ? none : options.layer;

    this.id = options.id;
    this.path = `${upper.path}${options.path}`;
    this.security = options.security ?? upper.security;
    this.tags = [...upper.tags, ...(options.tags ?? [])];
    this.externalDocs = options.externalDocs ?? upper.externalDocs;
    this.parameters = {
      query: { ...upper.parameters?.query, ...options.parameters?.query },
      header: { ...upper.parameters?.header, ...options.parameters?.header },
      cookie: { ...upper.parameters?.cookie, ...options.parameters?.cookie },
    };
  }
}

const __INTERNAL__ = '__INTERNAL__';
const none = new LayerDefinition({ id: __INTERNAL__, path: '' });

export const defineLayer = (options: LayerOptions) => new LayerDefinition(options);
