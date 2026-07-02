# @przeslijmi/real-fake-data-playwright

Playwright fixtures for [Real Fake Data](https://github.com/przeslijmi/rfd) — **217 generators** of realistic, synthetic test data, one typed method per record:

- **Person & company names and email addresses across 27 EU countries** — `dePersonName`, `itCompanyName`, `plEmail`, … in the local script and inflection (names romanised to ASCII for emails, with free, regional, and company-derived domains), plus multi-country `personName`/`companyName`/`email` that draw from any mix of countries.
- **National identifiers and VAT / company numbers for every EU member state** — French `frNir`/`frSiren`, Italian `itCodiceFiscale`, Spanish `esDni`/`esNie`, Danish `dkCpr`, Swedish `sePersonnummer`, Dutch `nlBsn`, German `deSteuerId`/`deUstIdnr`, and 60+ more — each with correct checksums and the same `invalid`/`edge` triggers.
- **One-call whole people and companies for every EU country** — `dkPerson`, `frPerson`, … return a consistent name + national number; `dkCompany`, `deCompany`, `nlCompany`, … return a consistent trading name, legal form, and the country's register / tax / VAT numbers, all from one seed.
- **The full Polish national set** — valid PESELs (correct checksums), NIPs, REGONs, IBANs, KRS and land-register numbers, ID cards, passports, driving licences, addresses drawn from real cities and streets, and vehicle plates.
- **Locale-agnostic** — lorem ipsum and `customRegex` (a random string matching any regex you supply; Pro plan and above).

Output _looks_ real but is fake — safe for staging, demos, and seed data.

- **Random by default.** It's a random-data generator: every call returns fresh data on each run. Pin a `seed` only when you want a fixed, reproducible dataset — e.g. to replay exactly what a failing run used.
- **Three ways in, no lock-in.** A zero-config `fakeData` singleton (import and go), a `createFakeData` builder for full control (custom URL, auth headers, seed), or the Playwright `fakeData` fixture — pick per test, mix freely.
- **Typed end to end.** Two methods per generator (one record, or a batch), fully typed inputs and results.

## Install

```sh
npm install -D @przeslijmi/real-fake-data-playwright
# or: pnpm add -D @przeslijmi/real-fake-data-playwright
```

Requires `@playwright/test` (peer dependency) and Node 18+ (for global `fetch`).

## Quick start

There are three ways to pull data in — pick whichever fits, they all return the same typed records. None is privileged; the fixture is not required.

### 1. Singleton — import and go

Zero config. The `fakeData` singleton is pre-wired to the public hosted API and returns fresh random data on every run. Best when you just want data in one (or many) tests without touching your Playwright config.

```ts
import { test, expect } from '@playwright/test';
import { fakeData } from '@przeslijmi/real-fake-data-playwright';

test('registers a new customer', async ({ page }) => {
  const person = await fakeData.plPerson({ sex: 'f' });

  await page.goto('/signup');
  await page.getByLabel('First name').fill(person.name);
  await page.getByLabel('Surname').fill(person.surname);
  await page.getByLabel('PESEL').fill(person.pesel);
  await page.getByRole('button', { name: 'Create account' }).click();

  await expect(page.getByText(person.surname)).toBeVisible();
});
```

The singleton targets the public endpoint only and sends no auth headers. Need a custom URL, headers, or a pinned seed? Use one of the next two.

### 2. `createFakeData` — full control

Build your own instance over any base URL, with auth headers and an optional seed. Best when you self-host the API, need authentication, or want to pin a fixed dataset.

```ts
import { test, expect } from '@playwright/test';
import { createFakeData, CloudFakeDataProvider } from '@przeslijmi/real-fake-data-playwright';

const fakeData = createFakeData(
  new CloudFakeDataProvider({
    baseUrl: 'https://api.real-fake-data.com',
    headers: { 'x-api-key': process.env.RFD_API_KEY ?? '' },
  }),
  { seed: 42 }, // optional — omit for random
);

test('uses pinned data', async ({ page }) => {
  const person = await fakeData.plPerson({ sex: 'f' });
  // …
});
```

### 3. Fixture — Playwright-native

Configure once with `test.use(...)` and the `fakeData` fixture is injected into every test in scope. Best when you want the data wired into Playwright's lifecycle and configured per file / project.

```ts
import { test, expect } from '@przeslijmi/real-fake-data-playwright';

test.use({ realFakeData: { baseUrl: 'https://api.real-fake-data.com' } });

test('registers a new customer', async ({ page, fakeData }) => {
  const person = await fakeData.plPerson({ sex: 'f' });
  // …
  await expect(page.getByText(person.surname)).toBeVisible();
});
```

Here `test` and `expect` are the standard Playwright exports, extended with the `fakeData` fixture — use them exactly as you would `@playwright/test`. `baseUrl` is optional: omit it to use the public hosted API, set it for a self-hosted instance. Like the other two, it's random by default; add `seed` to pin it (see [Configuration](#configuration)).

## Configuration

Set options with `test.use({ realFakeData: { … } })`, at any scope (file, `describe`, or project, via your Playwright config).

| Option    | Type                     | Description                                                                                              |
| --------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `baseUrl` | `string`                 | Base URL of the Real Fake Data API. Omit to use the public hosted API (`https://api.real-fake-data.com`); set it for a self-hosted or staging instance. |
| `seed`    | `number`                 | Base seed for the test. Omit (the default) for fresh random data on every run; set it to pin the test to a fixed, reproducible dataset. |
| `headers` | `Record<string, string>` | Extra headers sent with every request (e.g. an API key once your plan requires one).                    |

### Random by default, reproducible on demand

By default no seed is set, so every call draws fresh random data on each run — this is a random-data generator, and that's the point. When a test fails on a particular record, log the data (or have your CI capture it) and pin a `seed` to replay the exact same dataset:

```ts
test.use({ realFakeData: { baseUrl, seed: 42 } }); // pin this file to a fixed dataset
```

With a base seed in play, the **Nth call within a test uses `seed + N`** — so the calls stay distinct from one another, yet the whole sequence reproduces identically on the next run. So three back-to-back `plPerson()` calls still return three *different* people; re-running with the same seed returns those same three. The same holds for the singleton and `createFakeData` instances. Pass `seed` on any individual call to override just that one draw.

## Generators

Each generator exposes a **singular** method returning one record and a **plural** taking `count` as its first argument and returning an array of that many. Method names are locale-prefixed (`plPesel`, `dePersonName`, `plEmail`, …) so generators for different countries never collide; the locale-agnostic `lorem` and the multi-country aggregates (`personName`, `companyName`, `email`) carry no prefix.

Every method accepts optional constraints. Pass `seed` on any call to pin just that draw (overriding the instance's seed sequence when one is set).

#### Names across 27 EU countries

Every country listed below exposes `<cc>PersonName`/`<cc>PersonNames`, `<cc>CompanyName`/`<cc>CompanyNames`, `<cc>Company`/`<cc>Companies`, and `<cc>Email`/`<cc>Emails`, where `<cc>` is its ISO 3166 code: `at`, `be`, `bg`, `cy`, `cz`, `de`, `dk`, `ee`, `es`, `fi`, `fr`, `gr`, `hr`, `hu`, `ie`, `it`, `lt`, `lu`, `lv`, `mt`, `nl`, `pl`, `pt`, `ro`, `se`, `si`, `sk`.

| Singular                | Plural                          | Returns (singular)                          | Options                                |
| ----------------------- | ------------------------------- | ------------------------------------------- | -------------------------------------- |
| `<cc>PersonName(opts?)` | `<cc>PersonNames(count, opts?)` | `{ name, surname, initials, sex }`          | `sex`, `edge`, `caseStrict`            |
| `<cc>CompanyName(opts?)`| `<cc>CompanyNames(count, opts?)`| `{ value, legalForm, strategy }`            | `strategy`, `legalForm`, `edge`        |
| `<cc>Company(opts?)`    | `<cc>Companies(count, opts?)`   | `{ name, legalForm, …national ids }`        | `strategy`, `legalForm`, `invalid`, `edge` |
| `<cc>Email(opts?)`      | `<cc>Emails(count, opts?)`      | `{ value, localPart, domain, pattern, domainCategory, company, plusTag }` | `domain`, `domainCategory`, `pattern`, `plusTag`, `exotic`, `edge` |
| `personName(opts?)`     | `personNames(count, opts?)`     | `{ name, surname, initials, sex, country }` | `sex`, `edge`, `caseStrict`, `countries` |
| `companyName(opts?)`    | `companyNames(count, opts?)`    | `{ value, legalForm, strategy, country }`   | `strategy`, `edge`, `countries`        |
| `email(opts?)`          | `emails(count, opts?)`          | `{ value, localPart, domain, pattern, domainCategory, company, plusTag, country }` | `domain`, `domainCategory`, `pattern`, `plusTag`, `exotic`, `edge`, `countries` |

```ts
const ceo = await fakeData.dePersonName({ sex: 'f' });        // German given name + surname
const vendor = await fakeData.itCompanyName({ edge: true });  // edge-case Italian company name
const eu = await fakeData.personName({ countries: ['pl', 'sk', 'it'] }); // drawn from one of the three
const inbox = await fakeData.plEmail({ domainCategory: 'corporate' }); // anna.kowalska@kowalski-bud.pl
```

`countries` (on the prefix-less `personName`/`companyName`/`email` only) is an array of ISO codes; each record is generated by one country picked from the list. Omit it to draw from all 27. The per-country `legalForm` values differ by country (e.g. `GmbH`, `S.r.l.`, `S.A.`), so they are typed as `string`; pass `'any'` for a weighted-random one or `'none'` to omit it. For email, `domainCategory: 'corporate'` builds the address on a company-derived domain and reports the brand in `company`; non-Latin names (Cyrillic, Greek) are romanised to ASCII.

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
| `frPerson(opts?)` | `frPeople(count, opts?)` | `{ name, surname, initials, birthDate, nir }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |

**Austria (`at`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `atSvnr(opts?)` | `atSvnrs(count, opts?)` | `{ value, digits, birthDate }` | age/birth filters, `invalid`, `edge` |
| `atPerson(opts?)` | `atPeople(count, opts?)` | `{ name, surname, initials, birthDate, svnr }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `atUid(opts?)` | `atUids(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |
| `atFirmenbuchnummer(opts?)` | `atFirmenbuchnummers(count, opts?)` | `{ value, number, letter }` | `invalid`, `edge` |
| `atSteuernummer(opts?)` | `atSteuernummers(count, opts?)` | `{ value, digits }` | `edge` |

**Belgium (`be`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `beRijksregisternummer(opts?)` | `beRijksregisternummers(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `kind`, `invalid`, `edge` |
| `bePerson(opts?)` | `bePeople(count, opts?)` | `{ name, surname, initials, birthDate, rijksregisternummer }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `beOndernemingsnummer(opts?)` | `beOndernemingsnummers(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Bulgaria (`bg`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `bgEgn(opts?)` | `bgEgns(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `bgPerson(opts?)` | `bgPeople(count, opts?)` | `{ name, surname, initials, birthDate, egn }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `bgEik(opts?)` | `bgEiks(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Croatia (`hr`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `hrOib(opts?)` | `hrOibs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |
| `hrJmbg(opts?)` | `hrJmbgs(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `hrPerson(opts?)` | `hrPeople(count, opts?)` | `{ name, surname, initials, birthDate, jmbg }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |

**Cyprus (`cy`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `cyTic(opts?)` | `cyTics(count, opts?)` | `{ value, digits, letter }` | `format`, `invalid`, `edge` |
| `cyPerson(opts?)` | `cyPeople(count, opts?)` | `{ name, surname, initials, birthDate, tic }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |

**Czechia (`cz`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `czRodneCislo(opts?)` | `czRodneCislos(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `format`, `invalid`, `edge` |
| `czPerson(opts?)` | `czPeople(count, opts?)` | `{ name, surname, initials, birthDate, rodneCislo }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `czIco(opts?)` | `czIcos(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Denmark (`dk`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `dkCpr(opts?)` | `dkCprs(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `checksum`, `format`, `invalid`, `edge` |
| `dkPerson(opts?)` | `dkPeople(count, opts?)` | `{ name, surname, initials, birthDate, cpr }` | same as `dkCpr`, plus `caseStrict` |
| `dkCvr(opts?)` | `dkCvrs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Estonia (`ee`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `eeIsikukood(opts?)` | `eeIsikukoods(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `eePerson(opts?)` | `eePeople(count, opts?)` | `{ name, surname, initials, birthDate, isikukood }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `eeRegistrikood(opts?)` | `eeRegistrikoods(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `eeKmkr(opts?)` | `eeKmkrs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Finland (`fi`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `fiHenkilotunnus(opts?)` | `fiHenkilotunnuss(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `fiPerson(opts?)` | `fiPeople(count, opts?)` | `{ name, surname, initials, birthDate, henkilotunnus }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `fiYTunnus(opts?)` | `fiYTunnuss(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Germany (`de`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `deSteuerId(opts?)` | `deSteuerIds(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `dePerson(opts?)` | `dePeople(count, opts?)` | `{ name, surname, initials, birthDate, steuerId }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `deUstIdnr(opts?)` | `deUstIdnrs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |
| `deHandelsregisternummer(opts?)` | `deHandelsregisternummers(count, opts?)` | `{ value, division, court, number }` | `division`, `edge` |
| `deWirtschaftsIdnr(opts?)` | `deWirtschaftsIdnrs(count, opts?)` | `{ value, digits, suffix }` | `suffix`, `invalid`, `edge` |
| `dePersonalausweis(opts?)` | `dePersonalausweiss(count, opts?)` | `{ value, serial, checkDigit }` | `invalid`, `edge` |

**Greece (`gr`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `grAmka(opts?)` | `grAmkas(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `grPerson(opts?)` | `grPeople(count, opts?)` | `{ name, surname, initials, birthDate, amka }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `grAfm(opts?)` | `grAfms(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Hungary (`hu`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `huAdoazonositoJel(opts?)` | `huAdoazonositoJels(count, opts?)` | `{ value, digits, birthDate }` | age/birth filters, `invalid`, `edge` |
| `huTaj(opts?)` | `huTajs(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `huSzemelyiAzonosito(opts?)` | `huSzemelyiAzonositos(count, opts?)` | `{ value, digits, birthDate, sex, standard }` | `sex`, age/birth filters, `standard`, `invalid`, `edge` |
| `huPerson(opts?)` | `huPeople(count, opts?)` | `{ name, surname, initials, birthDate, szemelyiAzonosito }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `huAdoszam(opts?)` | `huAdoszams(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |
| `huCegjegyzekszam(opts?)` | `huCegjegyzekszams(count, opts?)` | `{ value, court, form, serial, digits }` | `edge` |

**Ireland (`ie`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `iePpsn(opts?)` | `iePpsns(count, opts?)` | `{ value, digits, checkLetter, secondLetter? }` | `standard`, `invalid`, `edge` |
| `iePerson(opts?)` | `iePeople(count, opts?)` | `{ name, surname, initials, birthDate, ppsn }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `ieVat(opts?)` | `ieVats(count, opts?)` | `{ value, digits }` | `format`, `standard`, `invalid`, `edge` |
| `ieCro(opts?)` | `ieCros(count, opts?)` | `{ value, digits }` | `edge` |

**Italy (`it`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `itCodiceFiscale(opts?)` | `itCodiceFiscales(count, opts?)` | `{ value, surnameCode, nameCode, birthDate, sex }` | `sex`, age/birth filters, `surname`, `name`, `invalid`, `edge` |
| `itPerson(opts?)` | `itPeople(count, opts?)` | `{ name, surname, initials, birthDate, codiceFiscale }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `itPartitaIva(opts?)` | `itPartitaIvas(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Latvia (`lv`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `lvPersonasKods(opts?)` | `lvPersonasKodss(count, opts?)` | `{ value, digits, birthDate? }` | age/birth filters, `standard`, `format`, `invalid`, `edge` |
| `lvPerson(opts?)` | `lvPeople(count, opts?)` | `{ name, surname, initials, birthDate, personasKods }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `lvRegistracijasNumurs(opts?)` | `lvRegistracijasNumurss(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Lithuania (`lt`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `ltAsmensKodas(opts?)` | `ltAsmensKodass(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `ltPerson(opts?)` | `ltPeople(count, opts?)` | `{ name, surname, initials, birthDate, asmensKodas }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `ltImonesKodas(opts?)` | `ltImonesKodass(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `ltPvm(opts?)` | `ltPvms(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Luxembourg (`lu`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `luMatricule(opts?)` | `luMatricules(count, opts?)` | `{ value, digits, birthDate }` | age/birth filters, `invalid`, `edge` |
| `luPerson(opts?)` | `luPeople(count, opts?)` | `{ name, surname, initials, birthDate, matricule }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `luTva(opts?)` | `luTvas(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Malta (`mt`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `mtIdCard(opts?)` | `mtIdCards(count, opts?)` | `{ value, digits, category }` | `category`, `edge` |
| `mtPerson(opts?)` | `mtPeople(count, opts?)` | `{ name, surname, initials, birthDate, idCard }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `mtVat(opts?)` | `mtVats(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Netherlands (`nl`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `nlBsn(opts?)` | `nlBsns(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `nlPerson(opts?)` | `nlPeople(count, opts?)` | `{ name, surname, initials, birthDate, bsn }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `nlRsin(opts?)` | `nlRsins(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `nlBtwId(opts?)` | `nlBtwIds(count, opts?)` | `{ value, digits, standard }` | `standard`, `invalid`, `edge` |
| `nlKvk(opts?)` | `nlKvks(count, opts?)` | `{ value, digits }` | `edge` |

**Portugal (`pt`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `ptNif(opts?)` | `ptNifs(count, opts?)` | `{ value, digits, entity }` | `entity`, `format`, `invalid`, `edge` |
| `ptCartaoCidadao(opts?)` | `ptCartaoCidadaos(count, opts?)` | `{ value, nic, version }` | `invalid`, `edge` |
| `ptPerson(opts?)` | `ptPeople(count, opts?)` | `{ name, surname, initials, birthDate, cartaoCidadao }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |

**Romania (`ro`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `roCnp(opts?)` | `roCnps(count, opts?)` | `{ value, digits, birthDate, sex, county }` | `sex`, age/birth filters, `invalid`, `edge` |
| `roPerson(opts?)` | `roPeople(count, opts?)` | `{ name, surname, initials, birthDate, cnp }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `roCui(opts?)` | `roCuis(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Slovakia (`sk`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `skRodneCislo(opts?)` | `skRodneCislos(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `format`, `invalid`, `edge` |
| `skPerson(opts?)` | `skPeople(count, opts?)` | `{ name, surname, initials, birthDate, rodneCislo }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `skIco(opts?)` | `skIcos(count, opts?)` | `{ value, digits }` | `invalid`, `edge` |
| `skIcDph(opts?)` | `skIcDphs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Slovenia (`si`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `siEmso(opts?)` | `siEmsos(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `invalid`, `edge` |
| `siPerson(opts?)` | `siPeople(count, opts?)` | `{ name, surname, initials, birthDate, emso }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `siDavcnaStevilka(opts?)` | `siDavcnaStevilkas(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Spain (`es`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `esDni(opts?)` | `esDnis(count, opts?)` | `{ value, digits, letter }` | `invalid`, `edge` |
| `esPerson(opts?)` | `esPeople(count, opts?)` | `{ name, surname, initials, birthDate, dni }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `esNie(opts?)` | `esNies(count, opts?)` | `{ value, prefix, digits, letter }` | `invalid`, `edge` |
| `esCif(opts?)` | `esCifs(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

**Sweden (`se`)**

| Singular | Plural | Returns (singular) | Options |
| -------- | ------ | ------------------ | ------- |
| `sePersonnummer(opts?)` | `sePersonnummers(count, opts?)` | `{ value, digits, birthDate, sex }` | `sex`, age/birth filters, `format`, `kind`, `invalid`, `edge` |
| `sePerson(opts?)` | `sePeople(count, opts?)` | `{ name, surname, initials, birthDate, personnummer }` | `sex`, age/birth filters, `invalid`, `edge`, `caseStrict` |
| `seOrganisationsnummer(opts?)` | `seOrganisationsnummers(count, opts?)` | `{ value, digits }` | `format`, `invalid`, `edge` |

#### Locale-agnostic

| Singular                       | Plural                                 | Returns (singular)                                          | Common options                                                        |
| ------------------------------ | -------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| `lorem(opts?)`                 | `lorems(count, opts?)`                 | `{ value, words, chars, bytes, paragraphs, startedWithLorem }` | `bytes`, `chars`, `words`, `paragraphs`, `startWithLorem`      |
| `customRegex(opts)`            | `customRegexes(count, opts)`           | `{ value, pattern }`                                       | `pattern` (required), `maxRepetition` — Pro plan and above            |

### Generating many records at once

Every plural takes `count` as its first argument and returns an array. The bound (10 by default, raised by paid tiers) is enforced by the API — an out-of-range `count` throws a `RealFakeDataError` (HTTP 400), never a silent clamp. A plural is a single request, so — when a seed is in play — it consumes one slot of the seed sequence just like a singular call.

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

const provider = new CloudFakeDataProvider({ baseUrl: 'https://api.real-fake-data.com' });
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
