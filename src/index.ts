export { test, expect } from './fixture.js';
export type { RealFakeDataConfig, RealFakeDataFixtures } from './fixture.js';

export { createFakeData } from './fake-data.js';
export type { CreateFakeDataOptions, FakeData } from './fake-data.js';

export { CloudFakeDataProvider } from './providers/cloud-provider.js';
export type { CloudFakeDataProviderOptions, FetchLike } from './providers/cloud-provider.js';

export type {
  FakeDataProvider,
  GeneratorMeta,
  GeneratorResponse,
  QueryValue,
} from './fake-data-provider.js';

export { RealFakeDataError } from './errors.js';
export type { RealFakeDataErrorDetail } from './errors.js';

export type * from './types.js';
