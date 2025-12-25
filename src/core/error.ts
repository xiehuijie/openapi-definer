interface ErrorOptions {
  id: string;
  httpStatus: number;
}

class ErrorDefinition {
  private options: ErrorOptions;
  constructor(options: ErrorOptions) {
    this.options = options;
  }
}

export const defineApp = (options: ErrorOptions) => new ErrorDefinition(options);
