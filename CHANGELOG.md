# Changelog

All notable changes to `@przeslijmi/real-fake-data-playwright` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.18.0] - 2026-10-07

**`enum` and `object` can draw from a team Dictionary.** Pass `dictionary` — the name of a Dictionary defined in the Real-Fake-Data.com dashboard — instead of `choices`: `fakeData.enum({ dictionary: 'client-products' })`, `fakeData.object({ dictionary: 'plans' })`. It needs the team's API key in the fixture's `headers`. `EnumOptions` and `ObjectOptions` now take exactly one of `choices` or `dictionary`, so passing both, or neither, is a type error; existing `choices` calls are unchanged.

**Every method now takes all three testing modes.** The API accepts `edge`, `extreme` and `invalid` on every generator, but 59 of the addon's option types were missing one or more of them — `uuid`, `ulid`, `nanoId`, `objectId`, `sequence`, `lorem`, `customRegex`, the per-country `vehicleRegistration`s, the name and email methods, several national identifiers and the Polish set among them — so typed code could not pass them. They all accept the three now (a new shared `ModeOptions` type), and `plPerson` gains `caseStrict`. Nothing changes for calls that do not use them.

**A multi-country `vehicleRegistration` fixture.** `vehicleRegistration(opts?)` /
`vehicleRegistrations(count, opts?)` draw a plate from any of the 29 countries and
return `{ country, value, type, category, region? }`. The generator count grows
from **326** to **327**.

Its `type` is the one option that is not a per-country passthrough. The 29
national `type` unions share no vocabulary — Italy's `standard` is the US's
`passenger`, Hungary's `oldtimer` is Ireland's `vintage` is Finland's `museum` —
so the cross-country option takes a **shared category** (`standard`, `custom`,
`motorcycle`, `moped`, `military`, `police`, `diplomatic`, `government`,
`commercial`, `taxi`, `trailer`, `historic`, `electric`, `temporary`, `export`,
`dealer`, `other`) and each record reports both it and the national name. A
`type` narrows the pool to the countries that issue it; pairing it with a
`countries` pool that issues nothing of the kind is a 400 rather than a silent
substitution. The per-country methods are unchanged.

**`plAddress` takes a new `live` option, and a pinned seed now reproduces.**
The endpoint serves a frozen catalogue by default — ~9,300 places, ~25,000
streets, all 2,479 gminas, so `teryt` still resolves at every level — which
means `plAddress({ seed: 42 })` keeps returning the same address instead of
drifting whenever the national register is republished. Pass `live: true` for
the full, current register, accepting that a seed may not reproduce across
releases. No method signatures moved.

**Dictionary-backed fixtures return different values than in 1.17.0.** Names,
company names, offerings and emails are now drawn by scoring entries against the
seed rather than by list position, so adding entries to a dictionary no longer
reshuffles everyone else's data. That is a **one-time** change of what each seed
yields; snapshots taken against 1.17.0 need re-recording.

**No feature is gated by payment any more.** `edge`, `extreme`, `invalid` and
compose work on every lane, anonymous callers included; `customRegex` is the one
exception and needs a *free* account, for an audit trail of caller-supplied
patterns rather than for revenue. Earlier entries below describe these as
"Requires the Pro plan or above" — that was true when they were written and is
kept as the record, but the Pro plan no longer exists.

Usage is now metered purely in **tokens**: no request quota, no per-minute rate
limit, and no per-call records cap beyond a flat 10,000 memory guard. A call
costs `1 + ceil(records / 10)` tokens. Only the type docs changed in this
package; no method signatures moved.

## [1.17.0] - 2026-08-10

The multi-country `personName`, `companyName` and `offering` fixtures now draw
from **29** countries instead of 27 — the US and Canada join the pool that
`email` already spanned. No new methods, so the generator count stays at
**326**; `CountryCode` already carried `'us'` and `'ca'`, so
`personName({ countries: ['us', 'ca'] })` type-checked before this release and
merely returned a 400 from the API.

**`offering` is now multi-currency.** US offerings are quoted in USD and
Canadian ones in CAD, and prices are *not* rate-converted, so an unpinned
`offerings(100)` mixes EUR, USD and CAD. Each record has always reported its
own `currency` — read it rather than assuming euros. Pin `countries` to a
single country if a test needs one currency.

Canadian records arrive bilingual: names draw from a weighted anglophone /
French-Canadian mix, and company legal forms include `Ltée` and `ULC` beside
`Inc.` and `Ltd.`.

Also corrects the README and type docs, which described the plate family as
EU-only — `usVehicleRegistration` and `caVehicleRegistration` have shipped
since 1.15.0 and 1.16.0 respectively.

## [1.16.0] - 2026-08-09

Adds **Canada**. Eleven new methods: `caSin`, `caBusinessNumber`,
`caTransitNumber`, `caBankAccount`, `caVehicleRegistration`, `caPerson`,
`caCompany`, plus `caPersonName`, `caCompanyName`, `caEmail` and `caOffering`.
The generator count grows from **315** to **326**.

Canada inverts several US expectations, and the types say so:

- **`caSin` and `caBusinessNumber` are Luhn-checked**, where the US SSN and EIN
  carry no checksum at all — so `invalid` breaks real arithmetic rather than
  merely violating a range.
- **`caTransitNumber`** returns both real renderings, and their **field order
  reverses**: `XXXXX-YYY` on a cheque, `0YYYXXXXX` for EFT. `electronicFormat`
  is always reported, whichever you asked for.
- **`caBankAccount` is *better* standardised than `usBankAccount`**: CPA
  Standard 006 fixes the account number at 7 or 12 digits, where no US
  authority defines a length at all.
- **`caBusinessNumber`'s `programAccount`** appends the CRA suffix. Mind the
  distinction: two results sharing a `businessNumber` are the same company —
  `…RC0001` and `…RT0001` are its corporate-tax and GST/HST accounts.

Names, company forms and jurisdictions are bilingual throughout: surnames draw
from a weighted anglophone/French-Canadian mix, legal forms include `Ltée`
alongside `Inc.`/`Ltd.`, and `caVehicleRegistration` accepts `QC`, `Quebec` or
`Québec` interchangeably across all 13 provinces and territories.

## [1.15.0] - 2026-08-09

Adds the **United States** — the first country outside the EU. Eleven new
methods: `usSsn`, `usEin`, `usRoutingNumber`, `usBankAccount`,
`usVehicleRegistration`, `usPerson`, `usCompany`, plus `usPersonName`,
`usCompanyName`, `usEmail` and `usOffering`. The generator count grows from
**304** to **315**.

Three of these behave unlike their European counterparts, and the types say so:

- **`usSsn`** takes no `sex` or age options. An SSN encodes nothing — not sex,
  not birth date, and since 2011 not even a state of issue — so there would be
  nothing for them to constrain.
- **`usPerson`** does accept them, but they shape the drawn `birthDate` and name
  directly rather than being decoded from the identifier, as they are for a CPR
  or PESEL.
- **`usBankAccount`** returns a checksum-valid routing number paired with a
  synthetic account number. That asymmetry is inherent: the US has no national
  account-number standard, so there is no checksum or registry to validate the
  account half against. `usRoutingNumber({ realBank: true })` draws a genuine
  published number from a bundled registry.

`usVehicleRegistration` covers all 51 jurisdictions with each state's own serial
format, and reports `state` rather than expecting you to parse it out of the
plate — a US plate does not encode its jurisdiction. Wyoming additionally
reports the `county` its leading number identifies.

## [1.14.0] - 2026-07-30

Adds `compose()` — seed a whole nested dataset in one call. You send a `shape`
skeleton with `$`-sources (`$generator.…`, `$count`, `$generators`/`shared`,
`$date`/`$anchor`) and get back the filled document, foreign keys and dates
already consistent. Requires a Pro API key. The generator count is unchanged
(**304**) — compose is a capability over the generators, not a new one.

## [1.13.0] - 2026-07-19

Adds the weighted `enum` and `object` pickers — draw a member or a whole object
from a distribution you supply. The fixture grows from **302** to **304** typed
generators.

### Added

- **`enum(opts)` / `enums(count, opts)`.** Draw a member from a weighted map
  (`choices`, member → **relative** weight; need not sum to 1), returning
  `{ value, probability }` where `probability` is the drawn member's normalized
  weight. Supports the shared `edge` (inverts the distribution — the rarest
  member becomes the most likely), `extreme` (hostile-encoded value), and
  `invalid` (a value not in `choices`) triggers.
- **`object(opts)` / `objects(count, opts)`.** The object counterpart: draw from
  a weighted list of `{ object, weight }` candidates and get the chosen object
  back verbatim, with the same three mode triggers. `choices` is sent as a
  single JSON query param under the hood.

## [1.12.0] - 2026-07-12

Adds product & service **offerings** for all 27 EU countries plus a
multi-country aggregate. The fixture grows from **274** to **302** typed
generators.

### Added

- **Offering generators for all 27 EU countries.** New method pairs
  `<cc>Offering(opts?)` / `<cc>Offerings(count, opts?)` for every ISO code, each
  returning a localized product or service — `{ value, offeringName, kind, unit,
  price, currency, industryCode, industryName, language }`. `price` is a single
  plausible amount in EUR minor units (cents), snapped onto a sensible grid.
  Options: `industry` (NACE code), `type` (`product`/`service`), `industryName`
  / `offeringName` full-text filters, `language`, and the shared `edge` /
  `extreme` / `invalid` triggers (`invalid` cannot combine with `edge`/`extreme`).
- **Multi-country `offering(opts?)` / `offerings(count, opts?)`.** Draws each
  record from one of `countries` (an array of ISO codes; omit for all 27) and
  reports the `country` it came from.

## [1.11.0] - 2026-07-05

Adds synthetic ID generators — the technical primary keys every record needs.
The fixture grows from **269** to **274** typed generators.

### Added

- **Five synthetic ID generators.** New locale-agnostic method pairs:
  `uuid(opts?)` / `uuids(count, opts?)` — a UUID, `version: '4'` (random,
  default) or `'7'` (time-ordered, RFC 9562); `ulid` — a 26-character
  Crockford-Base32 ULID; `nanoId` — a compact URL-safe Nano ID with `size` and a
  custom `alphabet`; `objectId` — a 24-character hex MongoDB ObjectId; and
  `sequence` — an auto-increment integer with `start` (default 1) and `step`
  (default 1), where a plural call returns the run `start, start + step, …`.
  Exported data types: `UuidData`, `UlidData`, `NanoIdData`, `ObjectIdData`,
  `SequenceData` (and matching `*Options`). Like everything else they are
  deterministic from the `seed`, so a seeded UUID is reproducible; any embedded
  timestamp (UUID v7, ULID, ObjectId) is seed-derived, not wall-clock.

## [1.10.0] - 2026-07-05

Extends the IBAN family from Poland to all 27 EU member states. The fixture
grows from **243** to **269** typed generators.

### Added

- **IBANs for the other 26 EU countries.** Alongside the existing `plIban`,
  every EU member state now exposes an `<cc>Iban(opts?)` /
  `<cc>Ibans(count, opts?)` pair — `deIban`, `frIban`, `itIban`, `esIban`, …
  through `skIban`. Each hits `GET /v1/<cc>/iban` and returns the uniform shape
  `{ value, electronicFormat, bankCode, bankName }` (exported as the shared
  `IbanData` type). Every IBAN carries correct mod-97 check digits and, where the
  national account number has its own internal check digit, that is reproduced
  too (Italy's CIN, Spain's DC, France's clé RIB, Belgium's mod-97 suffix,
  Portugal's and Slovenia's ISO 7064 checks, Finland's Luhn, Estonia's 7-3-1,
  Hungary's two check digits, Croatia's per-field MOD 11-10, the Czech/Slovak
  self-checking account). Pin the issuing bank by `bankCode` or `bankName` (both
  validated against each country's real-bank registry), or let it be chosen at
  random.
- **`edge` and `extreme` on `IbanOptions`.** The two shared triggers are now
  typed on the IBAN options, matching the rest of the fixture.

## [1.9.0] - 2026-07-04

Extends the vehicle-registration family from Poland to all 27 EU member states.
The fixture grows from **217** to **243** typed generators.

### Added

- **Vehicle registration plates for the other 26 EU countries.** Alongside the
  existing `plVehicleRegistration`, every EU member state now exposes a
  `<cc>VehicleRegistration(opts?)` / `<cc>VehicleRegistrations(count, opts?)`
  pair — `atVehicleRegistration`, `beVehicleRegistration`,
  `deVehicleRegistration`, `frVehicleRegistration`, … through
  `skVehicleRegistration`. Each hits `GET /v1/<cc>/vehicle-registration` and is
  typed to that country's own generator: its own `type` union (the plate kinds
  the country actually issues — standard, custom/vanity, motorcycle, diplomatic,
  military, historic, electric, taxi, dealer, …) and its own result fields
  (region / district / province / county codes, `era`, `expiryMonth`,
  `subregion`, …). Country-specific options are wired through verbatim
  (`script`, `era`, `withDepartment`/`department`, `withProvince`/`province`,
  `sidecode`, `expiryMonth`, `district`, `region`, `county`, `city`, `state`,
  and the per-country `format` enum), and every method takes the shared `edge`
  and `extreme` triggers.

### Changed

- **`VehicleRegistrationType` (Polish) now covers all seven plate kinds** the
  Polish generator produces: `standard`, `custom`, `police`, `military`,
  `historic`, and the previously missing `motorcycle` and `short`. The
  `VehicleRegistrationOptions` type also gains the `edge` and `extreme` triggers.

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
