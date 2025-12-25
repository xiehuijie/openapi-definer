import type { Text } from '../i18n';

interface AppOptions {
  title: string;
  version: string;
  description: Text;
}

class AppDefinition {
  private options: AppOptions;
  constructor(options: AppOptions) {
    this.options = options;
  }
}

export const defineApp = (options: AppOptions) => new AppDefinition(options);
