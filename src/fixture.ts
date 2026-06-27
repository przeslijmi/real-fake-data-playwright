import { test as base } from '@playwright/test';

import { createFakeData } from './fake-data.js';
import type { FakeData } from './fake-data.js';
import { hashString } from './hash.js';
import { CloudFakeDataProvider } from './providers/cloud-provider.js';

/** Test-level configuration, set with `test.use({ realFakeData: { … } })`. */
export interface RealFakeDataConfig {
  /** Base URL of the Real Fake Data API, e.g. `https://api.real-fake-data.com`. */
  baseUrl: string;
  /**
   * Base seed for the test. When omitted, a stable seed is derived from the
   * test title, so each test is reproducible-by-default yet distinct from its
   * neighbours. Set it explicitly to pin a test to known data.
   */
  seed?: number;
  /** Extra headers (e.g. authentication) sent with every request. */
  headers?: Record<string, string>;
}

export interface RealFakeDataFixtures {
  realFakeData: RealFakeDataConfig;
  fakeData: FakeData;
}

/**
 * A Playwright `test` extended with a `fakeData` fixture. Configure the API
 * location once with `test.use({ realFakeData: { baseUrl: '…' } })`, then pull
 * synthetic data inside any test via the `fakeData` fixture.
 */
export const test = base.extend<RealFakeDataFixtures>({
  realFakeData: [{ baseUrl: '' }, { option: true }],
  fakeData: async ({ realFakeData }, use, testInfo) => {
    const provider = new CloudFakeDataProvider({
      baseUrl: realFakeData.baseUrl,
      ...(realFakeData.headers === undefined ? {} : { headers: realFakeData.headers }),
    });
    const seed = realFakeData.seed ?? hashString(testInfo.titlePath.join(' › '));
    await use(createFakeData(provider, { seed }));
  },
});

export { expect } from '@playwright/test';
