/**
 * https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */
export const HttpStatusCode = {
  /** Continue */
  100: 100,
  /** Switching Protocols */
  101: 101,
  /** Processing */
  102: 102,
  /** Early Hints */
  103: 103,
  /** Upload Resumption Supported */
  104: 104,
  /** OK */
  200: 200,
  /** Created */
  201: 201,
  /** Accepted */
  202: 202,
  /** Non-Authoritative Information */
  203: 203,
  /** No Content */
  204: 204,
  /** Reset Content */
  205: 205,
  /** Partial Content */
  206: 206,
  /** Multi-Status */
  207: 207,
  /** Already Reported */
  208: 208,
  /** IM Used */
  226: 226,
  /** Multiple Choices */
  300: 300,
  /** Moved Permanently */
  301: 301,
  /** Found */
  302: 302,
  /** See Other */
  303: 303,
  /** Not Modified */
  304: 304,
  /** Use Proxy */
  305: 305,
  /** Temporary Redirect */
  307: 307,
  /** Permanent Redirect */
  308: 308,
  /** Bad Request */
  400: 400,
  /** Unauthorized */
  401: 401,
  /** Payment Required */
  402: 402,
  /** Forbidden */
  403: 403,
  /** Not Found */
  404: 404,
  /** Method Not Allowed */
  405: 405,
  /** Not Acceptable */
  406: 406,
  /** Proxy Authentication Required */
  407: 407,
  /** Request Timeout */
  408: 408,
  /** Conflict */
  409: 409,
  /** Gone */
  410: 410,
  /** Length Required */
  411: 411,
  /** Precondition Failed */
  412: 412,
  /** Content Too Large */
  413: 413,
  /** URI Too Long */
  414: 414,
  /** Unsupported Media Type */
  415: 415,
  /** Range Not Satisfiable */
  416: 416,
  /** Expectation Failed */
  417: 417,
  /** Misdirected Request */
  421: 421,
  /** Unprocessable Content */
  422: 422,
  /** Locked */
  423: 423,
  /** Failed Dependency */
  424: 424,
  /** Too Early */
  425: 425,
  /** Upgrade Required */
  426: 426,
  /** Precondition Required */
  428: 428,
  /** Too Many Requests */
  429: 429,
  /** Request Header Fields Too Large */
  431: 431,
  /** Unavailable For Legal Reasons */
  451: 451,
  /** Internal Server Error */
  500: 500,
  /** Not Implemented */
  501: 501,
  /** Bad Gateway */
  502: 502,
  /** Service Unavailable */
  503: 503,
  /** Gateway Timeout */
  504: 504,
  /** HTTP Version Not Supported */
  505: 505,
  /** Variant Also Negotiates */
  506: 506,
  /** Insufficient Storage */
  507: 507,
  /** Loop Detected */
  508: 508,
  /** Not Extended */
  510: 510,
  /** Network Authentication Required */
  511: 511,
} as const;
// export type HttpStatusCode = keyof typeof HttpStatusCode;

export enum HttpStatusCode2 {
  /** Continue */
  Continue = 100,
  /** Switching Protocols */
  SwitchingProtocols = 101,
  /** Processing */
  Processing = 102,
  /** Early Hints */
  EarlyHints = 103,
  /** Upload Resumption Supported */
  UploadResumptionSupported = 104,
  /** OK */
  OK = 200,
  /** Created */
  Created = 201,
  /** Accepted */
  Accepted = 202,
  /** Non-Authoritative Information */
  NonAuthoritativeInformation = 203,
  /** No Content */
  NoContent = 204,
  /** Reset Content */
  ResetContent = 205,
  /** Partial Content */
  PartialContent = 206,
  /** Multi-Status */
  MultiStatus = 207,
  /** Already Reported */
  AlreadyReported = 208,
  /** IM Used */
  IMUsed = 226,
  /** Multiple Choices */
  MultipleChoices = 300,
  /** Moved Permanently */
  MovedPermanently = 301,
  /** Found */
  Found = 302,
  /** See Other */
  SeeOther = 303,
  /** Not Modified */
  NotModified = 304,
  /** Use Proxy */
  UseProxy = 305,
  /** Temporary Redirect */
  TemporaryRedirect = 307,
  /** Permanent Redirect */
  PermanentRedirect = 308,
  /** Bad Request */
  BadRequest = 400,
  /** Unauthorized */
  Unauthorized = 401,
  /** Payment Required */
  PaymentRequired = 402,
  /** Forbidden */
  Forbidden = 403,
  /** Not Found */
  NotFound = 404,
  /** Method Not Allowed */
  MethodNotAllowed = 405,
  /** Not Acceptable */
  NotAcceptable = 406,
  /** Proxy Authentication Required */
  ProxyAuthenticationRequired = 407,
  /** Request Timeout */
  RequestTimeout = 408,
  /** Conflict */
  Conflict = 409,
  /** Gone */
  Gone = 410,
  /** Length Required */
  LengthRequired = 411,
  /** Precondition Failed */
  PreconditionFailed = 412,
  /** Content Too Large */
  ContentTooLarge = 413,
  /** URI Too Long */
  URITooLong = 414,
  /** Unsupported Media Type */
  UnsupportedMediaType = 415,
  /** Range Not Satisfiable */
  RangeNotSatisfiable = 416,
  /** Expectation Failed */
  ExpectationFailed = 417,
  /** Misdirected Request */
  MisdirectedRequest = 421,
  /** Unprocessable Content */
  UnprocessableContent = 422,
  /** Locked */
  Locked = 423,
  /** Failed Dependency */
  FailedDependency = 424,
  /** Too Early */
  TooEarly = 425,
  /** Upgrade Required */
  UpgradeRequired = 426,
  /** Precondition Required */
  PreconditionRequired = 428,
  /** Too Many Requests */
  TooManyRequests = 429,
  /** Request Header Fields Too Large */
  RequestHeaderFieldsTooLarge = 431,
  /** Unavailable For Legal Reasons */
  UnavailableForLegalReasons = 451,
  /** Internal Server Error */
  InternalServerError = 500,
  /** Not Implemented */
  NotImplemented = 501,
  /** Bad Gateway */
  BadGateway = 502,
  /** Service Unavailable */
  ServiceUnavailable = 503,
  /** Gateway Timeout */
  GatewayTimeout = 504,
  /** HTTP Version Not Supported */
  HTTPVersionNotSupported = 505,
  /** Variant Also Negotiates */
  VariantAlsoNegotiates = 506,
  /** Insufficient Storage */
  InsufficientStorage = 507,
  /** Loop Detected */
  LoopDetected = 508,
  /** Not Extended */
  NotExtended = 510,
  /** Network Authentication Required */
  NetworkAuthenticationRequired = 511,
}
