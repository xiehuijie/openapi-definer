/**
 * https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
export const HttpStatusCode = {
  /** Continue */
  Continue: 100,
  /** Switching Protocols */
  SwitchingProtocols: 101,
  /** Processing */
  Processing: 102,
  /** Early Hints */
  EarlyHints: 103,
  /** Upload Resumption Supported */
  UploadResumptionSupported: 104,
  /** OK */
  OK: 200,
  /** Created */
  Created: 201,
  /** Accepted */
  Accepted: 202,
  /** Non-Authoritative Information */
  NonAuthoritativeInformation: 203,
  /** No Content */
  NoContent: 204,
  /** Reset Content */
  ResetContent: 205,
  /** Partial Content */
  PartialContent: 206,
  /** Multi-Status */
  MultiStatus: 207,
  /** Already Reported */
  AlreadyReported: 208,
  /** IM Used */
  IMUsed: 226,
  /** Multiple Choices */
  MultipleChoices: 300,
  /** Moved Permanently */
  MovedPermanently: 301,
  /** Found */
  Found: 302,
  /** See Other */
  SeeOther: 303,
  /** Not Modified */
  NotModified: 304,
  /** Use Proxy */
  UseProxy: 305,
  /** Temporary Redirect */
  TemporaryRedirect: 307,
  /** Permanent Redirect */
  PermanentRedirect: 308,
  /** Bad Request */
  BadRequest: 400,
  /** Unauthorized */
  Unauthorized: 401,
  /** Payment Required */
  PaymentRequired: 402,
  /** Forbidden */
  Forbidden: 403,
  /** Not Found */
  NotFound: 404,
  /** Method Not Allowed */
  MethodNotAllowed: 405,
  /** Not Acceptable */
  NotAcceptable: 406,
  /** Proxy Authentication Required */
  ProxyAuthenticationRequired: 407,
  /** Request Timeout */
  RequestTimeout: 408,
  /** Conflict */
  Conflict: 409,
  /** Gone */
  Gone: 410,
  /** Length Required */
  LengthRequired: 411,
  /** Precondition Failed */
  PreconditionFailed: 412,
  /** Content Too Large */
  ContentTooLarge: 413,
  /** URI Too Long */
  URITooLong: 414,
  /** Unsupported Media Type */
  UnsupportedMediaType: 415,
  /** Range Not Satisfiable */
  RangeNotSatisfiable: 416,
  /** Expectation Failed */
  ExpectationFailed: 417,
  /** Misdirected Request */
  MisdirectedRequest: 421,
  /** Unprocessable Content */
  UnprocessableContent: 422,
  /** Locked */
  Locked: 423,
  /** Failed Dependency */
  FailedDependency: 424,
  /** Too Early */
  TooEarly: 425,
  /** Upgrade Required */
  UpgradeRequired: 426,
  /** Precondition Required */
  PreconditionRequired: 428,
  /** Too Many Requests */
  TooManyRequests: 429,
  /** Request Header Fields Too Large */
  RequestHeaderFieldsTooLarge: 431,
  /** Unavailable For Legal Reasons */
  UnavailableForLegalReasons: 451,
  /** Internal Server Error */
  InternalServerError: 500,
  /** Not Implemented */
  NotImplemented: 501,
  /** Bad Gateway */
  BadGateway: 502,
  /** Service Unavailable */
  ServiceUnavailable: 503,
  /** Gateway Timeout */
  GatewayTimeout: 504,
  /** HTTP Version Not Supported */
  HTTPVersionNotSupported: 505,
  /** Variant Also Negotiates */
  VariantAlsoNegotiates: 506,
  /** Insufficient Storage */
  InsufficientStorage: 507,
  /** Loop Detected */
  LoopDetected: 508,
  /** Not Extended */
  NotExtended: 510,
  /** Network Authentication Required */
  NetworkAuthenticationRequired: 511,
} as const;
/**
 * https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
// eslint-disable-next-line no-redeclare
export type HttpStatusCode = (typeof HttpStatusCode)[keyof typeof HttpStatusCode];
