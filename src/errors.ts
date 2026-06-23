/** One field-level problem reported by the API for a bad request. */
export interface RealFakeDataErrorDetail {
  readonly path: string;
  readonly message: string;
}

/**
 * Thrown when a Real Fake Data request fails: a non-2xx API response
 * (`status` carries the HTTP code, `code` the API's machine error code) or a
 * transport/configuration failure (`status` is `0`).
 */
export class RealFakeDataError extends Error {
  public readonly status: number;
  public readonly code: string | undefined;
  public readonly details: readonly RealFakeDataErrorDetail[] | undefined;

  public constructor(
    message: string,
    status: number,
    code?: string,
    details?: readonly RealFakeDataErrorDetail[],
  ) {
    super(message);
    this.name = 'RealFakeDataError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
