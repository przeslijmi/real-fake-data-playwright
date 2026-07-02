import { test as base } from '@playwright/test';

import { createFakeData } from './fake-data.js';
import type { FakeData } from './fake-data.js';
import { CloudFakeDataProvider } from './providers/cloud-provider.js';

/** Test-level configuration, set with `test.use({ realFakeData: { … } })`. */
export interface RealFakeDataConfig {
  /**
   * Base URL of the Real Fake Data API. Omit to target the public hosted API
   * (`https://api.real-fake-data.com`); set it to point at a self-hosted or
   * staging instance.
   */
  baseUrl?: string;
  /**
   * Base seed for the test. When omitted, each call returns fresh random data
   * on every run — the default, because this is a random-data generator. Set
   * it explicitly to pin the test to a fixed, reproducible dataset (e.g. to
   * replay the data a failing run used).
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
 * A Playwright `test` extended with a `fakeData` fixture. Works against the
 * public hosted API out of the box; override the endpoint (or add auth) once
 * with `test.use({ realFakeData: { baseUrl: '…' } })`, then pull synthetic
 * data inside any test via the `fakeData` fixture.
 */
export const test = base.extend<RealFakeDataFixtures>({
  realFakeData: [{}, { option: true }],
  fakeData: async ({ realFakeData }, use) => {
    const provider = new CloudFakeDataProvider({
      ...(realFakeData.baseUrl === undefined ? {} : { baseUrl: realFakeData.baseUrl }),
      ...(realFakeData.headers === undefined ? {} : { headers: realFakeData.headers }),
    });
    // No configured seed → leave it unset so each call draws fresh random data
    // on every run. A pinned `seed` makes the test replay an exact dataset.
    await use(
      createFakeData(provider, realFakeData.seed === undefined ? {} : { seed: realFakeData.seed }),
    );
  },
});

export { expect } from '@playwright/test';
