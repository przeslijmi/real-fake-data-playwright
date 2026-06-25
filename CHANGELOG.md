# Changelog

All notable changes to `@przeslijmi/real-fake-data-playwright` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
