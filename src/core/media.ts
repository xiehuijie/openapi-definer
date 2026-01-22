import { type ZodStructType, getJsonSchemaSpec, setMediaGenerator } from './_openapi.ts';

export interface JsonContentOptions {
  /**
   * ### JSON 内容的模式定义
   */
  schema: ZodStructType;
}

export type FileContentOptions = Record<string, never>;

type MimeType = 'application/json' | 'application/octet-stream';

type MediaTypeOptions = JsonContentOptions | FileContentOptions;

export class MediaTypeDefinition<M extends MimeType = MimeType, T extends MediaTypeOptions = MediaTypeOptions> {
  constructor(
    /** 媒体类型 */
    public readonly mime: M,
    /** 媒体内容选项 */
    public readonly options: T,
  ) {
    setMediaGenerator(this, (_locale) => {
      switch (this.mime) {
        case 'application/json':
          return {
            schema: getJsonSchemaSpec((this.options as JsonContentOptions).schema),
          };
        case 'application/octet-stream':
          return {
            schema: {
              type: 'string',
              format: 'binary',
            },
          };
        default:
          throw new Error(`Unsupported mime type: ${this.mime}`);
      }
    });
  }
}

export const defineJsonContent = (options: JsonContentOptions) => new MediaTypeDefinition('application/json', options);

export const defineFileContent = (options: FileContentOptions) => new MediaTypeDefinition('application/octet-stream', options);
