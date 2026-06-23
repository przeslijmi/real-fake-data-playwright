/** A query value as it goes on the wire; `undefined` entries are dropped. */
export type QueryValue = string | number | boolean | undefined;

/** Reproducibility metadata every generator response carries. */
export interface GeneratorMeta {
  readonly seed: number;
  readonly generatorId: string;
  readonly [key: string]: unknown;
}

/** The `{ data, meta }` envelope every Real Fake Data endpoint returns. */
export interface GeneratorResponse<Data> {
  readonly data: Data;
  readonly meta: GeneratorMeta;
}

/**
 * The swappable transport seam.
 *
 * The cloud provider speaks HTTP to the Real Fake Data API; a future
 * on-premise provider will run the generators in-process. Both produce the
 * same `{ data, meta }` envelope, so the typed {@link FakeData} facade is
 * written once on top of this interface and never needs to know which
 * backend is behind it.
 */
export interface FakeDataProvider {
  generate<Data>(
    path: string,
    query: Readonly<Record<string, QueryValue>>,
  ): Promise<GeneratorResponse<Data>>;
}
