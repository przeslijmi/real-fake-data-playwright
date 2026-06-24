# @przeslijmi/real-fake-data-playwright

Playwright fixtures for [Real Fake Data](https://github.com/przeslijmi/rfd) — **136 generators** of realistic, synthetic test data, one typed method per record:

- **Person and company names across 27 EU countries** — `dePersonName`, `itCompanyName`, `frPersonName`, … in the local script and inflection, plus multi-country `personName`/`companyName` that draw from any mix of countries.
- **National identifiers and VAT / company numbers for every EU member state** — French `frNir`/`frSiren`, Italian `itCodiceFiscale`, Spanish `esDni`/`esNie`, Danish `dkCpr`, Swedish `sePersonnummer`, Dutch `nlBsn`, German `deSteuerId`/`deUstIdnr`, and 60+ more — each with correct checksums and the same `invalid`/`edge` triggers.
- **The full Polish national set** — valid PESELs (correct checksums), NIPs, REGONs, IBANs, KRS and land-register numbers, ID cards, passports, driving licences, addresses drawn from real cities and streets, and vehicle plates.
- **Locale-agnostic** — emails and lorem ipsum.

Output _looks_ real but is fake — safe for staging, demos, and seed data.

- **Seeded and reproducible by default.** Each test derives a stable seed from its title, so a failing test replays the exact same data on the next run — no flakiness, trivial repro.
- **Typed end to end.** Two methods per generator (one record, or a batch), fully typed inputs and results.
- **Zero ceremony.** A `fakeData` fixture; no manual client wiring.

## Install

```sh
npm install -D @przeslijmi/real-fake-data-playwright
# or: pnpm add -D @przeslijmi/real-fake-data-playwright
```

Requires `@playwright/test` (peer dependency) and Node 18+ (for global `fetch`).

## Quick start

Point the fixture at a Real Fake Data API instance, then pull data inside any test:

```ts
import { test, expect } from '@przeslijmi/real-fake-data-playwright';

test.use({ realFakeData: { baseUrl: 'https://realfakedata-api.onrender.com' } });

test('registers a new customer', async ({ page, fakeData }) => {
  const person = await fakeData.plPerson({ sex: 'f' });

  await page.goto('/signup');
  await page.getByLabel('First name').fill(person.name);
  await page.getByLabel('Surname').fill(person.surname);
  await page.getByLabel('PESEL').fill(person.pesel);
  await page.getByRole('button', { name: 'Create account' }).click();

  await expect(page.getByText(person.surname)).toBeVisible();
});
```

`test` and `expect` are the standard Playwright exports, extended with the `fakeData` fixture — use them exactly as you would `@playwright/test`.

## Configuration

Set options with `test.use({ realFakeData: { … } })`, at any scope (file, `describe`, or project, via your Playwright config).

| Option    | Type                     | Description                                                                                              |
| --------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `baseUrl` | `string` (required)      | Base URL of the Real Fake Data API, e.g. `https://realfakedata-api.onrender.com`.                                      |
| `seed`    | `number`                 | Base seed for the test. Omit to derive a stable seed from the test title (reproducible-by-default).      |
| `headers` | `Record<string, string>` | Extra headers sent with every request (e.g. an API key once your plan requires one).                    |

### Determinism

With a base seed in play, the **Nth call within a test uses `seed + N`** — so calls are reproducible across runs yet distinct from one another. Because the default seed comes from the test title, every test is already deterministic without configuring anything; set `seed` explicitly only when you want to pin a test to a known fixed dataset.

```ts
test.use({ realFakeData: { baseUrl, seed: 42 } }); // pin this file to a fixed dataset
```

## Generators

Each generator exposes a **singular** method returning one record and a **plural** taking `count` as its first argument and returning an array of that many. Method names are locale-prefixed (`plPesel`, `dePersonName`, …) so generators for different countries never collide; locale-agnostic generators (`email`, `lorem`) and the multi-country aggregates (`personName`, `companyName`) carry no prefix.

Every method accepts optional constraints. Pass `seed` on any call to override that call's automatic seed.

#### Names across 27 EU countries

Every country listed below exposes `<cc>PersonName`/`<cc>PersonNames` and `<cc>CompanyName`/`<cc>CompanyNames`, where `<cc>` is its ISO 3166 code: `at`, `be`, `bg`, `cy`, `cz`, `de`, `dk`, `ee`, `es`, `fi`, `fr`, `gr`, `hr`, `hu`, `ie`, `it`, `lt`, `lu`, `lv`, `mt`, `nl`, `pl`, `pt`, `ro`, `se`, `si`, `sk`.

| Singular                | Plural                          | Returns (singular)                          | Options                                |
| ----------------------- | ------------------------------- | ------------------------------------------- | -------------------------------------- |
| `<cc>PersonName(opts?)` | `<cc>PersonNames(count, opts?)` | `{ name, surname, initials, sex }`          | `sex`, `edge`, `caseStrict`            |
| `<cc>CompanyName(opts?)`| `<cc>CompanyNames(count, opts?)`| `{ value, legalForm, strategy }`            | `strategy`, `legalForm`, `edge`        |
| `personName(opts?)`     | `personNames(count, opts?)`     | `{ name, surname, initials, sex, country }` | `sex`, `edge`, `caseStrict`, `countries` |
| `companyName(opts?)`    | `companyNames(count, opts?)`    | `{ value, legalForm, strategy, country }`   | `strategy`, `edge`, `countries`        |

```ts
const ceo = await fakeData.dePersonName({ sex: 'f' });        // German given name + surname
const vendor = await fakeData.itCompanyName({ edge: true });  // edge-case Italian company name
const eu = await fakeData.personName({ countries: ['pl', 'sk', 'it'] }); // drawn from one of the three
```

`countries` (on the prefix-less `personName`/`companyName` only) is an array of ISO codes; each record is generated by one country picked from the list. Omit it to draw from all 27. The per-country `legalForm` values differ by country (e.g. `GmbH`, `S.r.l.`, `S.A.`), so they are typed as `string`; pass `'any'` for a weighted-random one or `'none'` to omit it.

#### Polish national generators

| Singular                       | Plural                                 | Returns (singular)                                          | Common options                                                        |
| ------------------------------ | -------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| `plPesel(opts?)`               | `plPesels(count, opts?)`               | `{ value, birthDate, sex }`                                | `sex`, `atAge`, `olderThan`, `youngerThan`, `bornOn/Before/After`, `invalid` |
| `plPerson(opts?)`              | `plPeople(count, opts?)`               | `{ name, surname, initials, birthDate, pesel }`            | same as `plPesel`                                                     |
| `plAddress(opts?)`             | `plAddresses(count, opts?)`            | `{ buildingNumber, postalCode, cityName, …, terytCodes }` | `teryt` (1–7 digit prefix)                                            |
| `plNip(opts?)`                 | `plNips(count, opts?)`                 | `{ value, digits }`                                        | `format`, `invalid`                                                   |
| `plIban(opts?)`                | `plIbans(count, opts?)`                | `{ value, electronicFormat, bankCode, bankName }`         | `format`, `bankCode`, `bankName`, `invalid`                          |
| `plRegon(opts?)`               | `plRegons(count, opts?)`               | `{ value, variant }`                                       | `variant` (`short`/`long`/`any`), `invalid`                          |
| `plCompany(opts?)`             | `plCompanies(count, opts?)`            | `{ name, legalForm, nip, regon, krs }`                    | `strategy`, `legalForm`, `activityPrefix`, `format`, `edge`, `invalid` |
| `plCompanyName(opts?)`         | `plCompanyNames(count, opts?)`         | `{ value, legalForm, strategy }`                           | `strategy`, `legalForm`, `activityPrefix`, `edge`                   |
| `plIdCard(opts?)`              | `plIdCards(count, opts?)`              | `{ value, series, number, expirationDate }`                | `format`, `expired`, `invalid`                                       |
| `plPassport(opts?)`            | `plPassports(count, opts?)`            | `{ value, series, number }`                                | `format`, `invalid`                                                   |
| `plKrs(opts?)`                 | `plKrsNumbers(count, opts?)`           | `{ value, number }`                                        | `format`                                                             |
| `plLandRegister(opts?)`        | `plLandRegisters(count, opts?)`        | `{ value, courtCode, number, checkDigit, court? }`         | `format`, `court`, `invalid`                                         |
| `plDrivingLicense(opts?)`      | `plDrivingLicenses(count, opts?)`      | `{ value, serial, year, suffix }`                          | `format`, `year`                                                     |
| `plVehicleRegistration(opts?)` | `plVehicleRegistrations(count, opts?)` | `{ value, prefix, individualPart, type, … }`              | `type`, `voivodeship`, `county`, `format`                           |

A Polish person name on its own (no PESEL/birth date) is `plPersonName` — part of the 27-country table above.

#### EU national identifiers

Every EU member state exposes its core national-person identifier and its business / VAT numbers. Numbers that encode a birth date and/or sex accept the same person constraints as `plPesel` (`sex`, `atAge`, `olderThan`, `youngerThan`, `bornOn`/`bornBefore`/`bornAfter`); the rest expose only their own knobs. Every checksum-bearing number takes `invalid` (deliberately wrong check digit) and `edge` (rare-corner values); generators with a VAT/intra-EU rendering take `format: 'national' | 'vat'` (some use a generator-specific enum — see each row).

**France (`fr`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `frSiren(opts?)` | `frSirens(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |
| `frNir(opts?)` | `frNirs(count, opts?)` | `{ value, digits, sex, birthYear, birthMonth }` | `sex`, age/birth filters, `invalid`, `edge` |

**Austria (`at`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `atSvnr(opts?)` | `atSvnrs(count, opts?)` | `{ value, digits, birthDate }` | age/birth filters, `invalid`, `edge` |
| `atUid(opts?)` | `atUids(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |
| `atFirmenbuchnummer(opts?)` | `atFirmenbuchnummers(count, opts?)` | `{ value, number, letter }` | `invalid`, `edge` |
| `atSteuernummer(opts?)` | `atSteuernummers(count, opts?)` | `{ value, digits }` | `edge` |

**Belgium (`be`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `beRijksregisternummer(opts?)` | `beRijksregisternummers(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `kind`, `invalid`, `edge` |
| `beOndernemingsnummer(opts?)` | `beOndernemingsnummers(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Bulgaria (`bg`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `bgEgn(opts?)` | `bgEgns(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `bgEik(opts?)` | `bgEiks(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Croatia (`hr`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `hrOib(opts?)` | `hrOibs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |
| `hrJmbg(opts?)` | `hrJmbgs(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |

**Cyprus (`cy`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `cyTic(opts?)` | `cyTics(count, opts?)` | `{ value, digits, letter }` | `format`, `invalid`, `edge` |

**Czechia (`cz`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `czRodneCislo(opts?)` | `czRodneCislos(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `format`, `invalid`, `edge` |
| `czIco(opts?)` | `czIcos(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Denmark (`dk`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `dkCpr(opts?)` | `dkCprs(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `checksum`, `format`, `invalid`, `edge` |
| `dkCvr(opts?)` | `dkCvrs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Estonia (`ee`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `eeIsikukood(opts?)` | `eeIsikukoods(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `eeRegistrikood(opts?)` | `eeRegistrikoods(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `eeKmkr(opts?)` | `eeKmkrs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Finland (`fi`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `fiHenkilotunnus(opts?)` | `fiHenkilotunnuss(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `fiYTunnus(opts?)` | `fiYTunnuss(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Germany (`de`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `deSteuerId(opts?)` | `deSteuerIds(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `deUstIdnr(opts?)` | `deUstIdnrs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |
| `deHandelsregisternummer(opts?)` | `deHandelsregisternummers(count, opts?)` | `{ value, division, court, number }` | `division`, `edge` |
| `deWirtschaftsIdnr(opts?)` | `deWirtschaftsIdnrs(count, opts?)` | `{ value, digits, suffix }` | `suffix`, `invalid`, `edge` |
| `dePersonalausweis(opts?)` | `dePersonalausweiss(count, opts?)` | `{ value, serial, checkDigit }` | `invalid`, `edge` |

**Greece (`gr`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `grAmka(opts?)` | `grAmkas(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `grAfm(opts?)` | `grAfms(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Hungary (`hu`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `huAdoazonositoJel(opts?)` | `huAdoazonositoJels(count, opts?)` | `{ value, digits, birthDate }` | age/birth filters, `invalid`, `edge` |
| `huTaj(opts?)` | `huTajs(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `huSzemelyiAzonosito(opts?)` | `huSzemelyiAzonositos(count, opts?)` | `{ value, digits, birthDate, sex, standard }` | `sex`, age/birth filters, `standard`, `invalid`, `edge` |
| `huAdoszam(opts?)` | `huAdoszams(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |
| `huCegjegyzekszam(opts?)` | `huCegjegyzekszams(count, opts?)` | `{ value, court, form, serial, digits }` | `edge` |

**Ireland (`ie`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `iePpsn(opts?)` | `iePpsns(count, opts?)` | `{ value, digits, checkLetter, secondLetter? }` | `standard`, `invalid`, `edge` |
| `ieVat(opts?)` | `ieVats(count, opts?)` | `{ value, digits }` | `format`, `standard`, `invalid`, `edge` |
| `ieCro(opts?)` | `ieCros(count, opts?)` | `{ value, digits }` | `edge` |

**Italy (`it`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `itCodiceFiscale(opts?)` | `itCodiceFiscales(count, opts?)` | `{ value, surnameCode, nameCode, birthDate, sex }` | `sex`, age/birth filters, `surname`, `name`, `invalid`, `edge` |
| `itPartitaIva(opts?)` | `itPartitaIvas(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Latvia (`lv`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `lvPersonasKods(opts?)` | `lvPersonasKodss(count, opts?)` | `{ value, digits, birthDate? }` | age/birth filters, `standard`, `format`, `invalid`, `edge` |
| `lvRegistracijasNumurs(opts?)` | `lvRegistracijasNumurss(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Lithuania (`lt`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `ltAsmensKodas(opts?)` | `ltAsmensKodass(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `ltImonesKodas(opts?)` | `ltImonesKodass(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `ltPvm(opts?)` | `ltPvms(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Luxembourg (`lu`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `luMatricule(opts?)` | `luMatricules(count, opts?)` | `{ value, digits, birthDate }` | age/birth filters, `invalid`, `edge` |
| `luTva(opts?)` | `luTvas(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Malta (`mt`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `mtIdCard(opts?)` | `mtIdCards(count, opts?)` | `{ value, digits, category }` | `category`, `edge` |
| `mtVat(opts?)` | `mtVats(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Netherlands (`nl`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `nlBsn(opts?)` | `nlBsns(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `nlRsin(opts?)` | `nlRsins(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `nlBtwId(opts?)` | `nlBtwIds(count, opts?)` | `{ value, digits, standard }` | `standard`, `invalid`, `edge` |
| `nlKvk(opts?)` | `nlKvks(count, opts?)` | `{ value, digits }` | `edge` |

**Portugal (`pt`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `ptNif(opts?)` | `ptNifs(count, opts?)` | `{ value, digits, entity }` | `entity`, `format`, `invalid`, `edge` |
| `ptCartaoCidadao(opts?)` | `ptCartaoCidadaos(count, opts?)` | `{ value, nic, version }` | `invalid`, `edge` |

**Romania (`ro`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `roCnp(opts?)` | `roCnps(count, opts?)` | `{ value, digits, birthDate, sex, county }` | `sex`, age/birth filters, `invalid`, `edge` |
| `roCui(opts?)` | `roCuis(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Slovakia (`sk`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `skRodneCislo(opts?)` | `skRodneCislos(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `format`, `invalid`, `edge` |
| `skIco(opts?)` | `skIcos(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `skIcDph(opts?)` | `skIcDphs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Slovenia (`si`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `siEmso(opts?)` | `siEmsos(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `siDavcnaStevilka(opts?)` | `siDavcnaStevilkas(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Spain (`es`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `esDni(opts?)` | `esDnis(count, opts?)` | `{ value, digits, letter }` | `invalid`, `edge` |
| `esNie(opts?)` | `esNies(count, opts?)` | `{ value, prefix, digits, letter }` | `invalid`, `edge` |
| `esCif(opts?)` | `esCifs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Sweden (`se`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `sePersonnummer(opts?)` | `sePersonnummers(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `format`, `kind`, `invalid`, `edge` |
| `seOrganisationsnummer(opts?)` | `seOrganisationsnummers(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

#### Locale-agnostic

| Singular                       | Plural                                 | Returns (singular)                                          | Common options                                                        |
| ------------------------------ | -------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| `email(opts?)`                 | `emails(count, opts?)`                 | `{ value, localPart, domain, pattern, plusTag }`          | `domain`, `domainCategory`, `pattern`, `plusTag`, `exotic`           |
| `lorem(opts?)`                 | `lorems(count, opts?)`                 | `{ value, words, chars, bytes, paragraphs, startedWithLorem }` | `bytes`, `chars`, `words`, `paragraphs`, `startWithLorem`      |

### Generating many records at once

Every plural takes `count` as its first argument and returns an array. The bound (10 by default, raised by paid tiers) is enforced by the API — an out-of-range `count` throws a `RealFakeDataError` (HTTP 400), never a silent clamp. A plural is a single request seeded once, so it consumes one slot of the per-test seed sequence just like a singular call.

```ts
const team = await fakeData.plPeople(5, { sex: 'f' }); // PolishPersonData[] of length 5
const inboxes = await fakeData.emails(3); // EmailData[] of length 3
```

### Special triggers

Three opt-in flags steer generators toward the cases real-world data throws at your code:

- **`invalid: true`** — on every checksum generator (`plPesel`, `plNip`, `plRegon`, `plIban`, `plCompany`, `plIdCard`, `plPassport`, `plLandRegister`), produces a value with a **deliberately wrong check digit** while the rest stays well-formed. For asserting that your own validators reject bad input. When set, the response `meta.invalid` is `true` so a batch can tell the broken record apart.
- **`edge: true`** — on the name generators (`<cc>PersonName`, `<cc>CompanyName`, `personName`, `companyName`, `plCompany`), biases toward **edge-case shapes**: second given names, double-barrelled surnames, very short names, punctuation-heavy or unusually long company names. The corners that break naïve form validation and layout.
- **`caseStrict: false`** — on the person-name generators, **deliberately mangles the casing** of name and surname (all-lower, all-upper, or random); initials stay proper uppercase. Defaults to `true` (proper casing). For testing case-insensitive matching and normalisation.

```ts
const bad = await fakeData.plNip({ invalid: true });
await expect(submitNip(bad.value)).rejects.toThrow('invalid checksum');

const messy = await fakeData.dePersonName({ caseStrict: false }); // e.g. { name: 'hANS', surname: 'müller' }
const tricky = await fakeData.itCompanyName({ edge: true });      // punctuation-heavy / long-form name
```

## Error handling

A non-2xx API response throws a `RealFakeDataError` carrying `status` (HTTP code), `code` (the API's machine error code), and `details` (per-field validation messages):

```ts
import { RealFakeDataError } from '@przeslijmi/real-fake-data-playwright';

try {
  await fakeData.plAddress({ teryt: 'not-digits' });
} catch (error) {
  if (error instanceof RealFakeDataError) {
    console.log(error.status, error.code, error.details);
    // 400 'VALIDATION_ERROR' [{ path: 'teryt', message: 'teryt must be 1–7 digits' }]
  }
}
```

## Advanced: using the client without the fixture

The fixture is a thin wrapper over a provider and a facade you can use directly — handy in global setup, scripts, or non-Playwright code:

```ts
import { CloudFakeDataProvider, createFakeData } from '@przeslijmi/real-fake-data-playwright';

const provider = new CloudFakeDataProvider({ baseUrl: 'https://realfakedata-api.onrender.com' });
const fakeData = createFakeData(provider, { seed: 42 });

const company = await fakeData.plCompanyName({ legalForm: 'S.A.' });
```

The `FakeDataProvider` interface is the swap point: the cloud provider talks HTTP to the hosted API, and the same facade can run against other backends.

## License

MIT

---

> **This repository is auto-generated** from a private upstream monorepo. Open
> **issues** here, but code changes are made upstream and re-synced — pull
> requests against this repo are applied upstream, not merged directly.
