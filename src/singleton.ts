import { createFakeData } from './fake-data.js';
import type { FakeData } from './fake-data.js';
import { CloudFakeDataProvider } from './providers/cloud-provider.js';

/**
 * A ready-to-use {@link FakeData} bound to the public hosted API — no client
 * wiring, no fixture, no seed. Every call returns fresh random data on each
 * run. Import it and go:
 *
 * ```ts
 * import { fakeData } from '@przeslijmi/real-fake-data-playwright';
 *
 * const person = await fakeData.plPerson({ sex: 'f' });
 * ```
 *
 * This is the zero-config tier and deliberately the least configurable: it
 * targets the default public endpoint and carries no authentication headers.
 * When you need a custom base URL, auth headers, or a pinned seed, reach for
 * {@link createFakeData} (build your own instance) or the {@link test} fixture
 * (Playwright integration) instead.
 */
export const fakeData: FakeData = createFakeData(new CloudFakeDataProvider());
