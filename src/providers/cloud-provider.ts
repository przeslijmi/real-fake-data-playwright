import { RealFakeDataError } from '../errors.js';
import type { RealFakeDataErrorDetail } from '../errors.js';
import type { FakeDataProvider, GeneratorResponse, QueryValue } from '../fake-data-provider.js';

/** The subset of the global `fetch` signature this provider relies on. */
export type FetchLike = (input: string | URL, init?: RequestInit) => Promise<Response>;

export interface CloudFakeDataProviderOptions {
  /** Base URL of the Real Fake Data API, e.g. `https://realfakedata-api.onrender.com`. */
  readonly baseUrl: string;
  /** Extra headers (e.g. authentication) sent with every request. */
  readonly headers?: Readonly<Record<string, string>>;
  /** Custom fetch implementation; defaults to the global `fetch`. */
  readonly fetch?: FetchLike;
}

/**
 * A {@link FakeDataProvider} that calls the hosted Real Fake Data API over
 * HTTP. It maps `(path, query)` to `GET {baseUrl}/v1/{path}?{query}` and
 * unwraps the `{ data, meta }` envelope, turning non-2xx responses into a
 * {@link RealFakeDataError}.
 */
export class CloudFakeDataProvider implements FakeDataProvider {
  readonly #baseUrl: string;
  readonly #headers: Record<string, string>;
  readonly #fetch: FetchLike;

  public constructor(options: CloudFakeDataProviderOptions) {
    this.#baseUrl = options.baseUrl.replace(/\/+$/u, '');
    this.#headers = { ...options.headers };
    this.#fetch = options.fetch ?? globalThis.fetch;
  }

  public async generate<Data>(
    path: string,
    query: Readonly<Record<string, QueryValue>>,
  ): Promise<GeneratorResponse<Data>> {
    if (this.#baseUrl === '') {
      throw new RealFakeDataError(
        'Real Fake Data baseUrl is not configured. Set it via ' +
          'test.use({ realFakeData: { baseUrl: "https://…" } }).',
        0,
      );
    }

    const url = new URL(`${this.#baseUrl}/v1/${path}`);
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }

    let response: Response;
    try {
      response = await this.#fetch(url, { headers: this.#headers });
    } catch (error) {
      throw new RealFakeDataError(
        `Request to ${url.pathname} failed: ${error instanceof Error ? error.message : String(error)}`,
        0,
      );
    }

    if (!response.ok) {
      throw await toError(response, url);
    }

    const body: unknown = await response.json();
    return body as GeneratorResponse<Data>;
  }
}

interface ApiErrorBody {
  readonly error?: {
    readonly message?: unknown;
    readonly code?: unknown;
    readonly details?: unknown;
  };
}

const isErrorDetail = (value: unknown): value is RealFakeDataErrorDetail =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as { path?: unknown }).path === 'string' &&
  typeof (value as { message?: unknown }).message === 'string';

const toError = async (response: Response, url: URL): Promise<RealFakeDataError> => {
  let parsed: unknown;
  try {
    parsed = await response.json();
  } catch {
    parsed = undefined;
  }

  const apiError = (parsed as ApiErrorBody | undefined)?.error;
  const message =
    typeof apiError?.message === 'string'
      ? apiError.message
      : `Request to ${url.pathname} failed with status ${String(response.status)}`;
  const code = typeof apiError?.code === 'string' ? apiError.code : undefined;
  const details = Array.isArray(apiError?.details)
    ? apiError.details.filter((detail) => isErrorDetail(detail))
    : undefined;

  return new RealFakeDataError(
    message,
    response.status,
    code,
    details !== undefined && details.length > 0 ? details : undefined,
  );
};
