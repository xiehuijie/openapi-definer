import type { ZodStructType } from './_zod.ts';
import { setMediaGenerator } from './_openapi.ts';

interface JsonContentOptions {
  /**
   * ### JSON 内容的模式定义
   */
  schema: ZodStructType;
}

interface FileContentOptions {}

type MimeType = 'application/json' | 'application/octet-stream';

export class MediaTypeDefinition {
  constructor(mime: 'application/json', options: JsonContentOptions);
  constructor(mime: 'application/octet-stream', options: FileContentOptions);
  constructor(
    public readonly mime: MimeType,
    public readonly options: JsonContentOptions | FileContentOptions,
  ) {
    setMediaGenerator(this, (_locale) => {
      return {};
    });
  }
}

export const defineJsonContent = (options: JsonContentOptions) => new MediaTypeDefinition('application/json', options);

export const defineFileContent = () => new MediaTypeDefinition('application/octet-stream', {});
