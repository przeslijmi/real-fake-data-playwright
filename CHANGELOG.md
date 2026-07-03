# Changelog

All notable changes to `@przeslijmi/real-fake-data-playwright` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.8.0] - 2026-07-03

Adds the `extreme` trigger across every generator.

### Added

- **`extreme` trigger.** Every generator that already took `edge` now also accepts
  `extreme: true` — it returns **correct** data presented in a deliberately hostile
  encoding: untrimmed whitespace (incl. non-breaking spaces), invisible/zero-width
  characters and a leading BOM, homoglyph letters (Cyrillic/Greek/fullwidth
  lookalikes), or a bidi override / stacked combining marks. One class is drawn per
  value, so a batch (the plural methods) rotates across them. Use it to test that
  your pipeline trims, normalises, and compares values safely.

  Only the human-facing string is mangled and the value stays recoverable:
  - **identifiers** (PESEL, NIP, IBAN, CPR, codice fiscale, BSN, …) mangle `value`
    and exclude the homoglyph class, so the digits/letters stay machine-parseable
    and still checksum after normalisation.
  - **names / companies / emails** mangle the name (or assembled `value`); `initials`,
    `legalForm`, and the decomposition stay clean.
  - **whole people / companies** mangle the name only — the national identifier and
    birth date stay clean.

  `lorem` and `customRegex` do not take `extreme` (it would break their length and
  regex-match contracts).

## [1.7.0] - 2026-06-28

Adds two seedless ways to pull data — the fixture is no longer the only entry point — and makes data random by default everywhere.

### Added

- **`fakeData` singleton.** `import { fakeData } from '@przeslijmi/real-fake-data-playwright'`
  gives a zero-config, ready-to-use instance bound to the public hosted API
  (`https://api.real-fake-data.com`). No fixture, no `test.use`, no seed — import and call
  `fakeData.plPerson(...)` in any test. For a custom URL, auth headers, or a pinned seed, use
  `createFakeData` + `CloudFakeDataProvider` (already exported) or the fixture.

### Changed

- **Random by default.** The `fakeData` fixture no longer derives a seed from the test title;
  with no `seed` configured, each call now returns fresh random data on every run. Set
  `seed` (via `test.use({ realFakeData: { seed } })`, `createFakeData(provider, { seed })`, or
  per-call) to pin a fixed, reproducible dataset — e.g. to replay what a failing run used.
  Suites that relied on the old title-derived determinism must now set `seed` explicitly.
- **`baseUrl` is now optional in all three tiers.** `CloudFakeDataProvider` and the fixture's
  `realFakeData` config default to the public hosted API (`https://api.real-fake-data.com`)
  when `baseUrl` is omitted or empty; pass it only to target a self-hosted or staging instance.
  Previously an unset `baseUrl` threw *"baseUrl is not configured"* — that guard is gone, so a
  missing `baseUrl` now silently uses the public API instead of erroring.

## [1.6.0] - 2026-06-28

Adds localised email fixtures for every EU country and a country-aware `email` aggregate: the fixture grows from 190 generators to **217**.

### Added

- **Per-country email fixtures for all 27 EU countries** — `<cc>Email` / `<cc>Emails` for
  every ISO code (`deEmail`, `plEmail`, …). Each builds a name-based local part from that
  country's first-name and surname banks (romanised to ASCII for Cyrillic/Greek) on a free,
  regional, or company-derived domain.

### Changed

- **`email` / `emails` are now country-aware.** They accept `countries` (draw from a mix of
  EU countries) and each record reports the `country` it came from (`AnyEmailData`).
- **`EmailData` gained `domainCategory` and `company`.** `domainCategory` adds a `corporate`
  value (a company-derived domain like `anna.schmidt@mueller-bau.de`); `company` reports the
  brand behind a corporate domain or a company local-part, or `null`.
- **`EmailOptions` gained `edge`**, and `pattern` adds `first.company` / `company.first`.

## [1.5.0] - 2026-06-27

Adds full-company fixtures for every EU country: the fixture grows from 164 generators to **190**.

### Added

- **Full-company fixtures for all 27 EU countries** — `<cc>Company` / `<cc>Companies` for
  every member state (`dkCompany`, `frCompany`, `deCompany`, `nlCompany`, …) return a
  consistent synthetic company (trading name, legal form, and the matching national
  identifiers) in one call, like `plCompany`. Each bundles that country's real registers —
  Denmark's CVR, France's SIREN, the Netherlands' KvK + RSIN + btw-id, Germany's
  Handelsregister + USt-IdNr + Wirtschafts-IdNr, and so on — one to three numbers per
  country. `strategy` / `legalForm` shape the name; `invalid` corrupts every checksummed
  identifier (the name and any checksum-less number stay intact); `edge` sweeps the rare
  corners. New `LocaleCompanyOptions` plus one `<Cc>CompanyData` type per country.

## [1.4.0] - 2026-06-24

Adds the custom-regex generator: the fixture grows from 163 generators to **164**.

### Added

- **Custom-regex generator** — `customRegex` / `customRegexes` produce a random string
  matching a regular expression you supply (`pattern`), for seeding data whose format the
  catalogue doesn't model (in-house serial numbers, SKUs, ticket ids). `maxRepetition`
  caps how far unbounded quantifiers (`*`, `+`, `{n,}`) expand. Back-references,
  look-around assertions, and patterns with an over-large worst-case expansion are
  rejected (a `400`). New `CustomRegexOptions` / `CustomRegexData` types. **Requires the
  Pro plan or above.**

## [1.3.0] - 2026-06-24

### Added

- **Full-person fixtures for all 27 EU countries** — `<cc>Person` / `<cc>People` for every
  member state (`dkPerson`, `frPerson`, `itPerson`, `sePerson`, `dePerson`, …) return a
  mutually consistent person (name, surname, initials, birth date, and the matching national
  number) in one call, like `plPerson`. Where the number encodes a birth date and sex (CPR,
  EGN, isikukood, CNP, …) those facts drive the name; Italy’s `itPerson` derives the Codice
  Fiscale from the generated name; non-semantic numbers (BSN, DNI, Steuer-ID, PPSN, …) draw
  the birth date independently with `sex` shaping the name. Every method takes `sex`, the
  age/birth filters, `invalid`, `edge`, and `caseStrict`; results carry the country’s own
  field (`cpr`, `nir`, `codiceFiscale`, `personnummer`, `bsn`, …). The fixture grows to
  **163** generators.

## [1.2.0] - 2026-06-24

### Added

- **Historic (vintage) Polish plates** — `plVehicleRegistration` / `plVehicleRegistrations`
  now accept `type: 'historic'`, producing a *tablica zabytkowa* (e.g. `BSI 12A`): a real
  area code plus the short, five-character-total number used by registered vintage
  vehicles. `voivodeship` and `county` apply as for `standard` plates. The
  `VehicleRegistrationType` union grows the `'historic'` member.
- **`standard: 'both'` for the time-versioned ID generators** — `iePpsn`, `ieVat`,
  `nlBtwId`, `lvPersonasKods`, and `huSzemelyiAzonosito` now accept `'both'` on top of
  their two single-standard choices, drawing one standard per record so a batch mixes the
  old and new forms. The corresponding `Options` `standard` unions grow the `'both'`
  member; result `standard` fields stay concrete (a value is always one resolved standard).

## [1.1.0] - 2026-06-24

Adds the EU national-identifier set: the fixture grows from 70 generators to **136**.

### Added

- **National ID and tax numbers for all 27 EU countries** — singular + plural method
  pairs for every new generator (`frNir` / `frNirs`, `deSteuerId` / `deSteuerIds`,
  `itCodiceFiscale`, `sePersonnummer`, `nlBtwId`, …; 66 pairs), each with its own typed
  `Options` and `Data`. Personal numbers take `sex` and age/birth-date filters; company
  and VAT numbers take `format`; versioned standards (DK `checksum`, NL/IE/HU `standard`,
  …) are exposed where they exist.

## [1.0.0] - 2026-06-23

First stable release. The fixture grows from 8 generators to **70**, and the method
names gain a locale prefix to make room for non-Polish data. The renames are breaking;
see **Migrating from 0.1.0** below.

### Added

- **Person and company names across 27 EU countries** — `<cc>PersonName` /
  `<cc>PersonNames` and `<cc>CompanyName` / `<cc>CompanyNames` for every ISO code in
  `at be bg cy cz de dk ee es fi fr gr hr hu ie it lt lu lv mt nl pl pt ro se si sk`.
- **Multi-country aggregates** — prefix-less `personName` / `companyName`, with a
  `countries` option to draw each record from a chosen mix of countries (omit for all 27).
  Their results carry a `country` field.
- **More Polish national generators** — `plCompany`, `plPersonName`, `plKrs`,
  `plLandRegister`, `plIdCard`, `plPassport`, `plDrivingLicense`.
- **Locale-agnostic generators** — `email` and `lorem`.
- **Batch methods** — every generator now has a plural (`plPeople`, `emails`, …) taking
  `count` as its first argument and returning an array. The per-plan cap is enforced by
  the API.
- **Special triggers** documented and typed: `invalid` (deliberately wrong check digit),
  `edge` (edge-case name shapes), and `caseStrict: false` (deliberately mangled casing).

### Changed

- **BREAKING — every locale-specific method is now `pl`-prefixed:**

  | 0.1.0                   | 1.0.0                     |
  | ----------------------- | ------------------------- |
  | `pesel()`               | `plPesel()`               |
  | `person()`              | `plPerson()`              |
  | `address()`             | `plAddress()`             |
  | `nip()`                 | `plNip()`                 |
  | `iban()`                | `plIban()`                |
  | `regon()`               | `plRegon()`               |
  | `vehicleRegistration()` | `plVehicleRegistration()` |

- **BREAKING — `companyName` was repurposed.** In 0.1.0 it returned a *Polish* company
  name. It now returns the **multi-country aggregate** (different shape: `legalForm` is a
  plain `string` and a `country` field is added). The Polish company name is now
  `plCompanyName`. This is the one rename that does **not** surface as a "method not found"
  error — old calls keep compiling but return different data, so check this one first.

### Migrating from 0.1.0

- Add the `pl` prefix to the seven renamed methods (table above).
- Replace `fakeData.companyName(...)` with `fakeData.plCompanyName(...)` to keep the
  previous Polish-company-name behaviour. Use the new prefix-less `companyName(...)` only
  if you actually want the multi-country aggregate.

## [0.1.0] - 2026-06-12

### Added

- Initial release: a Playwright `fakeData` fixture over the hosted Real Fake Data API,
  with seeded-by-default reproducibility. Eight Polish generators: `pesel`, `person`,
  `address`, `nip`, `iban`, `regon`, `companyName`, `vehicleRegistration`.
