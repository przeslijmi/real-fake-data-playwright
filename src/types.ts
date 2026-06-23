/**
 * Result and option types for every generator. The result shapes mirror the
 * API's response `data` schemas; the option shapes mirror its query params
 * (minus `seed`, which the facade manages — see {@link RequestOptions}).
 */

/** Sex marker used by the PESEL and person generators. */
export type Sex = 'm' | 'f';

/**
 * ISO 3166 alpha-2 codes of the 27 EU countries that have `person-name` and
 * `company-name` generators. Poland (`pl`) additionally has the full national
 * generator set (PESEL, NIP, addresses, …).
 */
export type CountryCode =
  | 'at'
  | 'be'
  | 'bg'
  | 'cy'
  | 'cz'
  | 'de'
  | 'dk'
  | 'ee'
  | 'es'
  | 'fi'
  | 'fr'
  | 'gr'
  | 'hr'
  | 'hu'
  | 'ie'
  | 'it'
  | 'lt'
  | 'lu'
  | 'lv'
  | 'mt'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'se'
  | 'si'
  | 'sk';

/** A Polish legal form the company-name generator can append. */
export type PolishLegalForm =
  | 'Sp. z o.o.'
  | 'Sp. z o.o. sp.k.'
  | 'P.S.A.'
  | 'S.A.'
  | 'Sp. j.'
  | 'Sp. k.'
  | 'S.C.';

/** Naming family the company-name generator drew from. */
export type CompanyNameStrategy = 'morpheme' | 'surname' | 'descriptive' | 'modern';

/** Kind of vehicle registration plate produced. */
export type VehicleRegistrationType = 'standard' | 'custom' | 'police' | 'military';

/** Local-part shape the email generator can produce. */
export type EmailLocalPattern =
  | 'first.last'
  | 'firstlast'
  | 'first_last'
  | 'first.last.number'
  | 'flast'
  | 'initial.last'
  | 'noun.number';

/** Provider-domain category the email generator can draw from. */
export type EmailDomainCategory = 'free' | 'regional';

/**
 * Per-call options shared by every method. A `seed` here overrides the
 * fixture's automatic per-call seed for this one request.
 */
export interface RequestOptions {
  readonly seed?: number;
}

/** Shared inputs of the PESEL and person generators. */
export interface PersonConstraintOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  /** `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`. */
  readonly bornOn?: string;
  /** `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`. */
  readonly bornBefore?: string;
  /** `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`. */
  readonly bornAfter?: string;
  /** Produce a value with a deliberately wrong check digit. */
  readonly invalid?: boolean;
}

export type PeselOptions = PersonConstraintOptions;
export type PersonOptions = PersonConstraintOptions;

export interface AddressOptions extends RequestOptions {
  /** TERYT prefix, 1–7 digits, narrowing the location. */
  readonly teryt?: string;
}

export interface NipOptions extends RequestOptions {
  readonly format?: 'with-hyphens' | 'digits-only';
  readonly invalid?: boolean;
}

export interface IbanOptions extends RequestOptions {
  readonly format?: 'grouped' | 'compact';
  readonly invalid?: boolean;
  /** Pin the issuing bank by its four-digit code. Mutually exclusive with `bankName`. */
  readonly bankCode?: string;
  /** Pin the issuing bank by a case-insensitive name fragment. Mutually exclusive with `bankCode`. */
  readonly bankName?: string;
}

export interface RegonOptions extends RequestOptions {
  readonly variant?: 'short' | 'long' | 'any';
  readonly invalid?: boolean;
}

export interface CompanyNameOptions extends RequestOptions {
  readonly strategy?: CompanyNameStrategy | 'any';
  readonly legalForm?: PolishLegalForm | 'any' | 'none';
  readonly activityPrefix?: boolean;
  /** Restrict output to edge-case names (punctuation-heavy families, long/rare forms). */
  readonly edge?: boolean;
}

export interface CompanyOptions extends RequestOptions {
  readonly strategy?: CompanyNameStrategy | 'any';
  readonly legalForm?: PolishLegalForm | 'any' | 'none';
  readonly activityPrefix?: boolean;
  readonly format?: 'with-hyphens' | 'digits-only';
  readonly invalid?: boolean;
  /** Restrict output to edge-case values from the rare corners. */
  readonly edge?: boolean;
}

export interface VehicleRegistrationOptions extends RequestOptions {
  readonly type?: VehicleRegistrationType;
  readonly voivodeship?: string;
  readonly county?: string;
  readonly format?: 'with-space' | 'compact';
}

export interface IdCardOptions extends RequestOptions {
  readonly format?: 'compact' | 'with-space';
  readonly invalid?: boolean;
  /** Produce a card whose expiration date is in the past. */
  readonly expired?: boolean;
}

export interface PassportOptions extends RequestOptions {
  readonly format?: 'compact' | 'with-space';
  readonly invalid?: boolean;
}

export interface KrsOptions extends RequestOptions {
  readonly format?: 'padded' | 'plain';
}

export interface LandRegisterOptions extends RequestOptions {
  readonly format?: 'with-slashes' | 'compact';
  /** Restrict to a single court, by code (e.g. `WA1M`) or name substring. */
  readonly court?: string;
  readonly invalid?: boolean;
}

export interface DrivingLicenseOptions extends RequestOptions {
  readonly format?: 'with-slashes' | 'compact';
  /** Full 4-digit issue year, within the supported range. */
  readonly year?: number;
}

export interface EmailOptions extends RequestOptions {
  /** Pin an exact provider domain, e.g. `"gmail.com"`. */
  readonly domain?: string;
  /** Scope the weighted domain draw; ignored when `domain` is set. */
  readonly domainCategory?: EmailDomainCategory | 'any';
  /** Which local-part shape to produce, or `any` for a weighted-random one. */
  readonly pattern?: EmailLocalPattern | 'any';
  /**
   * Plus-addressing (sub-addressing) tag: `true` always adds a random tag,
   * `false` never, a string is used verbatim (`name+tag@…`). Omitted means
   * the generator occasionally adds one.
   */
  readonly plusTag?: boolean | string;
  /** Opt in to the rarer-but-still-RFC-valid local-part characters. */
  readonly exotic?: boolean;
}

export interface LoremOptions extends RequestOptions {
  /**
   * Size the text by a length unit. When more than one is given the most
   * precise wins, in precedence `bytes` → `chars` → `words` → `paragraphs`;
   * with none given a few paragraphs are returned. `bytes`/`chars` cut on an
   * exact boundary (the final word may be clipped); `words`/`paragraphs` end
   * on a whole sentence.
   */
  readonly bytes?: number;
  readonly chars?: number;
  readonly words?: number;
  readonly paragraphs?: number;
  /**
   * Begin with the canonical "Lorem ipsum dolor sit amet…" opening. Defaults
   * to `true`; `false` starts from a random word.
   */
  readonly startWithLorem?: boolean;
}

export interface PolishPeselData {
  readonly value: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface PolishPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly pesel: string;
}

export interface PolishAddressTerytCodes {
  readonly voivodeshipCode: string;
  readonly countyCode: string;
  readonly municipalityCode: string;
  readonly cityCode: string;
  readonly streetCode?: string;
}

export interface PolishAddressData {
  readonly streetFullName?: string;
  readonly buildingNumber: string;
  readonly postalCode: string;
  readonly cityName: string;
  readonly municipalityName: string;
  readonly countyName: string;
  readonly voivodeshipName: string;
  readonly terytCodes: PolishAddressTerytCodes;
}

export interface PolishNipData {
  readonly value: string;
  readonly digits: string;
}

export interface PolishIbanData {
  readonly value: string;
  readonly electronicFormat: string;
  readonly bankCode: string;
  readonly bankName: string;
}

export interface PolishRegonData {
  readonly value: string;
  readonly variant: 'short' | 'long';
}

export interface PolishCompanyNameData {
  readonly value: string;
  readonly legalForm: PolishLegalForm | null;
  readonly strategy: CompanyNameStrategy;
}

export interface PolishCompanyData {
  readonly name: string;
  readonly legalForm: PolishLegalForm | null;
  readonly nip: string;
  readonly regon: string;
  readonly krs: string | null;
}

export interface PolishVehicleRegistrationData {
  readonly value: string;
  readonly prefix: string;
  readonly individualPart: string;
  readonly type: VehicleRegistrationType;
  readonly voivodeship?: string;
  readonly county?: string;
}

export interface PolishIdCardData {
  readonly value: string;
  readonly series: string;
  readonly number: string;
  readonly expirationDate: string;
}

export interface PolishPassportData {
  readonly value: string;
  readonly series: string;
  readonly number: string;
}

export interface PolishKrsData {
  readonly value: string;
  readonly number: number;
}

export interface PolishLandRegisterData {
  readonly value: string;
  readonly courtCode: string;
  readonly number: string;
  readonly checkDigit: string;
  readonly court?: string;
}

export interface PolishDrivingLicenseData {
  readonly value: string;
  readonly serial: string;
  readonly year: number;
  readonly suffix: string;
}

export interface EmailData {
  readonly value: string;
  readonly localPart: string;
  readonly domain: string;
  readonly pattern: EmailLocalPattern;
  readonly plusTag: string | null;
}

export interface LoremData {
  readonly value: string;
  readonly words: number;
  readonly chars: number;
  readonly bytes: number;
  readonly paragraphs: number;
  readonly startedWithLorem: boolean;
}

/**
 * Options shared by every country's `person-name` generator (`dePersonName`,
 * `itPersonName`, `plPersonName`, …). Only the underlying name pools and
 * inflection rules differ between countries — the controls are identical.
 */
export interface PersonNameOptions extends RequestOptions {
  /** Gendered form of the name (`m`/`f`). Omit for a random one. */
  readonly sex?: Sex;
  /**
   * Bias toward edge-case name shapes — second given names, double-barrelled
   * surnames, and minimal-length names become far more likely.
   */
  readonly edge?: boolean;
  /**
   * Defaults to `true` (proper casing). Set `false` to deliberately mangle the
   * casing of name and surname (all-lower, all-upper, or random); initials stay
   * proper uppercase.
   */
  readonly caseStrict?: boolean;
}

/** Options for the multi-country `personName` generator. */
export interface AnyPersonNameOptions extends PersonNameOptions {
  /**
   * ISO 3166 codes to draw each record from, e.g. `['pl', 'sk', 'it']`. Each
   * record picks one country from the list at random. Omit to draw from all 27.
   */
  readonly countries?: readonly CountryCode[];
}

/** One person name, shared shape across every country's `person-name` generator. */
export interface PersonNameData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly sex: Sex;
}

/** A multi-country person name: the shared fields plus the country it came from. */
export interface AnyPersonNameData extends PersonNameData {
  /** ISO 3166 alpha-2 code of the country this name was drawn from. */
  readonly country: string;
}

/**
 * Options shared by every country's `company-name` generator except Poland's
 * (use {@link CompanyNameOptions} for `plCompanyName`, which has a typed
 * Polish `legalForm`). `legalForm` values are country-specific, so they are
 * typed loosely as `string` here — the API validates them per country.
 */
export interface LocaleCompanyNameOptions extends RequestOptions {
  readonly strategy?: CompanyNameStrategy | 'any';
  /** Country-specific legal form, `'any'` for weighted-random, or `'none'` to omit. */
  readonly legalForm?: string;
  /** Restrict output to edge-case names (punctuation-heavy families, long/rare forms). */
  readonly edge?: boolean;
}

/** Options for the multi-country `companyName` generator (no `legalForm` — it is country-specific). */
export interface AnyCompanyNameOptions extends RequestOptions {
  readonly strategy?: CompanyNameStrategy | 'any';
  readonly edge?: boolean;
  /**
   * ISO 3166 codes to draw each record from, e.g. `['de', 'fr', 'it']`. Omit to
   * draw from all 27.
   */
  readonly countries?: readonly CountryCode[];
}

/** One company name, shared shape across every country's `company-name` generator. */
export interface LocaleCompanyNameData {
  readonly value: string;
  /** The appended legal form (e.g. `GmbH`, `S.r.l.`), or `null` when none was added. */
  readonly legalForm: string | null;
  readonly strategy: CompanyNameStrategy;
}

/** A multi-country company name: the shared fields plus the country it came from. */
export interface AnyCompanyNameData extends LocaleCompanyNameData {
  /** ISO 3166 alpha-2 code of the country this name was drawn from. */
  readonly country: string;
}
