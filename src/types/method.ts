export const Method = {
  /** GET */
  GET: 'GET',
  /** POST */
  POST: 'POST',
  /** PUT */
  PUT: 'PUT',
  /** DELETE */
  DELETE: 'DELETE',
  /** PATCH */
  PATCH: 'PATCH',
  /** HEAD */
  HEAD: 'HEAD',
  /** OPTIONS */
  OPTIONS: 'OPTIONS',
  /** TRACE */
  TRACE: 'TRACE',
};
export type Method = (typeof Method)[keyof typeof Method];
