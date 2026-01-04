interface EndpointOptions {
  /** 接口ID */
  id: string;
}

class Endpoint {
  private options: EndpointOptions;
  constructor(options: EndpointOptions) {
    this.options = options;
  }
  get id() {
    return this.options.id;
  }
}

export const defineEndpoint = (options: EndpointOptions): Endpoint => new Endpoint(options);
