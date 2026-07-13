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

/** Kind of Polish vehicle registration plate produced. */
export type VehicleRegistrationType =
  | 'standard'
  | 'custom'
  | 'police'
  | 'military'
  | 'historic'
  | 'motorcycle'
  | 'short';

/** Local-part shape the email generator can produce. */
export type EmailLocalPattern =
  | 'first.last'
  | 'firstlast'
  | 'first_last'
  | 'first.last.number'
  | 'flast'
  | 'initial.last'
  | 'noun.number'
  | 'first.company'
  | 'company.first';

/** Domain category the email generator can draw from. */
export type EmailDomainCategory = 'free' | 'regional' | 'corporate';

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
  /** Restrict output to valid edge-case IBANs from the rare corners of the format. */
  readonly edge?: boolean;
  /** Return a correct value wrapped in a hostile encoding (whitespace, invisible chars, BOM, bidi). */
  readonly extreme?: boolean;
  /** Pin the issuing bank by its country-specific code. Mutually exclusive with `bankName`. */
  readonly bankCode?: string;
  /** Pin the issuing bank by a case-insensitive name fragment. Mutually exclusive with `bankCode`. */
  readonly bankName?: string;
}

/**
 * The result shape of every country's IBAN generator. The output contract is
 * uniform across the fleet (the electronic-format length and bank-code width
 * differ per country, but the fields do not), so one type serves all 27.
 */
export interface IbanData {
  readonly value: string;
  readonly electronicFormat: string;
  readonly bankCode: string;
  readonly bankName: string;
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
  /** Present the company name in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, homoglyphs, or bidi/combining marks); legal form and identifiers stay clean. */
  readonly extreme?: boolean;
}

export interface CompanyOptions extends RequestOptions {
  readonly strategy?: CompanyNameStrategy | 'any';
  readonly legalForm?: PolishLegalForm | 'any' | 'none';
  readonly activityPrefix?: boolean;
  readonly format?: 'with-hyphens' | 'digits-only';
  readonly invalid?: boolean;
  /** Restrict output to edge-case values from the rare corners. */
  readonly edge?: boolean;
  /** Present the company name in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, homoglyphs, or bidi/combining marks); legal form and identifiers stay clean. */
  readonly extreme?: boolean;
}

export interface VehicleRegistrationOptions extends RequestOptions {
  readonly type?: VehicleRegistrationType;
  readonly voivodeship?: string;
  readonly county?: string;
  readonly format?: 'with-space' | 'compact';
  /** Restrict output to edge-case plates from the rare corners of the format. */
  readonly edge?: boolean;
  /** Return a correct plate wrapped in a hostile-but-recoverable encoding. */
  readonly extreme?: boolean;
}

export interface AtVehicleRegistrationOptions extends RequestOptions {
  readonly type?: 'standard' | 'custom' | 'motorcycle' | 'military' | 'police' | 'diplomatic';
  readonly district?: string;
  readonly state?: string;
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface AtVehicleRegistrationData {
  readonly value: string;
  readonly type: 'standard' | 'custom' | 'motorcycle' | 'military' | 'police' | 'diplomatic';
  readonly district?: string;
  readonly state?: string;
}

export interface BeVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'custom'
    | 'motorcycle'
    | 'moped'
    | 'diplomatic'
    | 'dealer'
    | 'export'
    | 'oldtimer'
    | 'taxi'
    | 'trailer';
  readonly format?: 'hyphen' | 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface BeVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'custom'
    | 'motorcycle'
    | 'moped'
    | 'diplomatic'
    | 'dealer'
    | 'export'
    | 'oldtimer'
    | 'taxi'
    | 'trailer';
}

export interface BgVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'custom'
    | 'motorcycle'
    | 'military'
    | 'diplomatic'
    | 'electric'
    | 'temporary';
  readonly script?: 'latin' | 'native';
  readonly province?: string;
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface BgVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'custom'
    | 'motorcycle'
    | 'military'
    | 'diplomatic'
    | 'electric'
    | 'temporary';
  readonly province?: string;
  readonly provinceCode?: string;
}

export interface CyVehicleRegistrationOptions extends RequestOptions {
  readonly type?: 'standard' | 'motorcycle' | 'diplomatic' | 'trailer' | 'un' | 'sba';
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface CyVehicleRegistrationData {
  readonly value: string;
  readonly type: 'standard' | 'motorcycle' | 'diplomatic' | 'trailer' | 'un' | 'sba';
}

export interface CzVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'extended'
    | 'custom'
    | 'motorcycle'
    | 'diplomatic'
    | 'historic'
    | 'electric'
    | 'military';
  readonly region?: string;
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface CzVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'extended'
    | 'custom'
    | 'motorcycle'
    | 'diplomatic'
    | 'historic'
    | 'electric'
    | 'military';
  readonly region?: string;
}

export interface DeVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'custom'
    | 'seasonal'
    | 'historic'
    | 'electric'
    | 'motorcycle'
    | 'military'
    | 'diplomatic';
  readonly district?: string;
  readonly era?: 'current' | 'legacy' | 'both';
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface DeVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'custom'
    | 'seasonal'
    | 'historic'
    | 'electric'
    | 'motorcycle'
    | 'military'
    | 'diplomatic';
  readonly district?: string;
  readonly state?: string;
  readonly city?: string;
}

export interface DkVehicleRegistrationOptions extends RequestOptions {
  readonly type?: 'standard' | 'custom' | 'diplomatic' | 'trailer' | 'motorcycle' | 'export';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface DkVehicleRegistrationData {
  readonly value: string;
  readonly type: 'standard' | 'custom' | 'diplomatic' | 'trailer' | 'motorcycle' | 'export';
}

export interface EeVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'custom'
    | 'diplomatic'
    | 'dealer'
    | 'racing'
    | 'classic'
    | 'motorcycle'
    | 'moped'
    | 'transit'
    | 'military';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface EeVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'custom'
    | 'diplomatic'
    | 'dealer'
    | 'racing'
    | 'classic'
    | 'motorcycle'
    | 'moped'
    | 'transit'
    | 'military';
}

export interface EsVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'motorcycle'
    | 'military'
    | 'diplomatic'
    | 'guardia-civil'
    | 'national-police'
    | 'temporary'
    | 'dealer'
    | 'historic'
    | 'trailer';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly province?: string;
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface EsVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'motorcycle'
    | 'military'
    | 'diplomatic'
    | 'guardia-civil'
    | 'national-police'
    | 'temporary'
    | 'dealer'
    | 'historic'
    | 'trailer';
  readonly era: 'current' | 'legacy';
  readonly province?: string;
}

export interface FiVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'custom'
    | 'diplomatic'
    | 'export'
    | 'dealer'
    | 'museum'
    | 'trailer'
    | 'military'
    | 'motorcycle'
    | 'aland';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly format?: 'hyphen' | 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface FiVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'custom'
    | 'diplomatic'
    | 'export'
    | 'dealer'
    | 'museum'
    | 'trailer'
    | 'military'
    | 'motorcycle'
    | 'aland';
  readonly era?: 'current' | 'legacy';
}

export interface FrVehicleRegistrationOptions extends RequestOptions {
  readonly type?: 'standard' | 'diplomatic' | 'temporary' | 'export' | 'motorcycle';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly withDepartment?: boolean;
  readonly department?: string;
  readonly format?: 'hyphen' | 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface FrVehicleRegistrationData {
  readonly value: string;
  readonly type: 'standard' | 'diplomatic' | 'temporary' | 'export' | 'motorcycle';
  readonly era: 'current' | 'legacy';
  readonly department?: string;
}

export interface GrVehicleRegistrationOptions extends RequestOptions {
  readonly type?: 'standard' | 'motorcycle' | 'taxi' | 'diplomatic' | 'historic' | 'trailer';
  readonly script?: 'latin' | 'native';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly region?: string;
  readonly format?: 'hyphen' | 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface GrVehicleRegistrationData {
  readonly value: string;
  readonly type: 'standard' | 'motorcycle' | 'taxi' | 'diplomatic' | 'historic' | 'trailer';
  readonly region?: string;
  readonly regionCode?: string;
}

export interface HrVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'custom'
    | 'military'
    | 'diplomatic'
    | 'export'
    | 'historic'
    | 'motorcycle';
  readonly city?: string;
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface HrVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'custom'
    | 'military'
    | 'diplomatic'
    | 'export'
    | 'historic'
    | 'motorcycle';
  readonly city?: string;
}

export interface HuVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'custom'
    | 'military'
    | 'diplomatic'
    | 'police'
    | 'oldtimer'
    | 'taxi'
    | 'electric'
    | 'motorcycle'
    | 'temporary';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly format?: 'hyphen' | 'compact' | 'with-space';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface HuVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'custom'
    | 'military'
    | 'diplomatic'
    | 'police'
    | 'oldtimer'
    | 'taxi'
    | 'electric'
    | 'motorcycle'
    | 'temporary';
}

export interface IeVehicleRegistrationOptions extends RequestOptions {
  readonly type?: 'standard' | 'temporary-import' | 'vintage' | 'taxi' | 'electric';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly county?: string;
  readonly format?: 'with-hyphen' | 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface IeVehicleRegistrationData {
  readonly value: string;
  readonly type: 'standard' | 'temporary-import' | 'vintage' | 'taxi' | 'electric';
  readonly era?: 'current' | 'legacy';
  readonly county?: string;
  readonly subregion?: string;
}

export interface ItVehicleRegistrationOptions extends RequestOptions {
  readonly type?: 'standard' | 'motorcycle' | 'military' | 'diplomatic' | 'trailer';
  readonly withProvince?: boolean;
  readonly province?: string;
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface ItVehicleRegistrationData {
  readonly value: string;
  readonly type: 'standard' | 'motorcycle' | 'military' | 'diplomatic' | 'trailer';
  readonly province?: string;
}

export interface LtVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'custom'
    | 'military'
    | 'diplomatic'
    | 'motorcycle'
    | 'moped'
    | 'trailer'
    | 'ev'
    | 'taxi'
    | 'historic'
    | 'dealer';
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface LtVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'custom'
    | 'military'
    | 'diplomatic'
    | 'motorcycle'
    | 'moped'
    | 'trailer'
    | 'ev'
    | 'taxi'
    | 'historic'
    | 'dealer';
}

export interface LuVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'custom'
    | 'military'
    | 'diplomatic'
    | 'official'
    | 'dealer'
    | 'export'
    | 'moped'
    | 'deputies';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface LuVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'custom'
    | 'military'
    | 'diplomatic'
    | 'official'
    | 'dealer'
    | 'export'
    | 'moped'
    | 'deputies';
}

export interface LvVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'custom'
    | 'military'
    | 'diplomatic'
    | 'consular'
    | 'historic'
    | 'taxi'
    | 'transit'
    | 'motorcycle'
    | 'moped';
  readonly format?: 'hyphen' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface LvVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'custom'
    | 'military'
    | 'diplomatic'
    | 'consular'
    | 'historic'
    | 'taxi'
    | 'transit'
    | 'motorcycle'
    | 'moped';
}

export interface MtVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'motorcycle'
    | 'military'
    | 'government'
    | 'diplomatic'
    | 'taxi'
    | 'bus'
    | 'trailer'
    | 'tax-free'
    | 'custom';
  readonly expiryMonth?: string;
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface MtVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'motorcycle'
    | 'military'
    | 'government'
    | 'diplomatic'
    | 'taxi'
    | 'bus'
    | 'trailer'
    | 'tax-free'
    | 'custom';
  readonly expiryMonth?: string;
}

export interface NlVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'motorcycle'
    | 'historic'
    | 'diplomatic'
    | 'military'
    | 'dealer'
    | 'export';
  readonly sidecode?: 5 | 6 | 8 | 9 | 10 | 11;
  readonly era?: 'current' | 'legacy' | 'both';
  readonly format?: 'with-hyphen' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface NlVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'motorcycle'
    | 'historic'
    | 'diplomatic'
    | 'military'
    | 'dealer'
    | 'export';
}

export interface PtVehicleRegistrationOptions extends RequestOptions {
  readonly type?: 'standard' | 'motorcycle' | 'military' | 'diplomatic' | 'police' | 'export';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly format?: 'with-hyphen' | 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface PtVehicleRegistrationData {
  readonly value: string;
  readonly type: 'standard' | 'motorcycle' | 'military' | 'diplomatic' | 'police' | 'export';
  readonly era?: 'current' | '2005-2020' | '1992-2005' | 'pre-1992';
}

export interface RoVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'motorcycle'
    | 'electric'
    | 'temporary'
    | 'military'
    | 'police'
    | 'diplomatic';
  readonly county?: string;
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface RoVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'motorcycle'
    | 'electric'
    | 'temporary'
    | 'military'
    | 'police'
    | 'diplomatic';
  readonly county?: string;
  readonly countyCode?: string;
}

export interface SeVehicleRegistrationOptions extends RequestOptions {
  readonly type?: 'standard' | 'custom' | 'diplomatic' | 'military' | 'motorcycle';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface SeVehicleRegistrationData {
  readonly value: string;
  readonly type: 'standard' | 'custom' | 'diplomatic' | 'military' | 'motorcycle';
}

export interface SiVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'custom'
    | 'motorcycle'
    | 'military'
    | 'diplomatic'
    | 'police'
    | 'export';
  readonly region?: string;
  readonly format?: 'with-space' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface SiVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'custom'
    | 'motorcycle'
    | 'military'
    | 'diplomatic'
    | 'police'
    | 'export';
  readonly region?: string;
}

export interface SkVehicleRegistrationOptions extends RequestOptions {
  readonly type?:
    | 'standard'
    | 'motorcycle'
    | 'military'
    | 'diplomatic'
    | 'consular'
    | 'trailer'
    | 'historic'
    | 'electric'
    | 'dealer'
    | 'custom';
  readonly era?: 'current' | 'legacy' | 'both';
  readonly district?: string;
  readonly region?: string;
  readonly format?: 'hyphen' | 'compact';
  readonly edge?: boolean;
  readonly extreme?: boolean;
}

export interface SkVehicleRegistrationData {
  readonly value: string;
  readonly type:
    | 'standard'
    | 'motorcycle'
    | 'military'
    | 'diplomatic'
    | 'consular'
    | 'trailer'
    | 'historic'
    | 'electric'
    | 'dealer'
    | 'custom';
  readonly region?: string;
  readonly district?: string;
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

/**
 * Options shared by every country's `email` generator (`deEmail`, `plEmail`,
 * …) and the multi-country `email` aggregate. The controls are identical
 * across countries; only the underlying name pools and regional/corporate
 * domains differ.
 */
export interface EmailOptions extends RequestOptions {
  /** Pin an exact domain, e.g. `"gmail.com"`. */
  readonly domain?: string;
  /**
   * Scope the weighted domain draw — `free` webmail, `regional` providers,
   * `corporate` (a company-derived domain), or `any`. Ignored when `domain`
   * is set.
   */
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
  /** Restrict output to edge-case addresses from the rare corners of the format. */
  readonly edge?: boolean;
  /** Present the address in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, homoglyphs, or bidi/combining marks); the decomposition stays clean. */
  readonly extreme?: boolean;
}

/** Options for the multi-country `email` generator. */
export interface AnyEmailOptions extends EmailOptions {
  /**
   * ISO 3166 codes to draw each record from, e.g. `['pl', 'de', 'it']`. Each
   * record picks one country from the list at random. Omit to draw from all 27.
   */
  readonly countries?: readonly CountryCode[];
}

export interface OfferingOptions extends RequestOptions {
  /** Pin the industry by NACE code (`61`, `56.11`). Omit to draw across all covered industries. */
  readonly industry?: string;
  /** Full-text filter: keep offerings whose localized industry label contains this (case-insensitive). */
  readonly industryName?: string;
  /** Full-text filter: keep offerings whose localized name contains this (case-insensitive). */
  readonly offeringName?: string;
  /** Pin the name language to one of the country's official subtags. Omit for its weighted mix. */
  readonly language?: string;
  /** Restrict to products or services. Omit for both. */
  readonly type?: 'product' | 'service';
  /** Restrict to edge-case offerings (price-band extremes, unusual units, long names). */
  readonly edge?: boolean;
  /** Present the offering name in a hostile-but-recoverable encoding; price, unit and industry label stay clean. */
  readonly extreme?: boolean;
  /** Return a deliberately invalid offering (price outside its band, negative price, or empty name). Cannot combine with edge/extreme. */
  readonly invalid?: boolean;
}

/** Options for the multi-country `offering` generator. */
export interface AnyOfferingOptions extends OfferingOptions {
  /**
   * ISO 3166 codes to draw each record from, e.g. `['pl', 'de', 'it']`. Each
   * record picks one country from the list at random. Omit to draw from all 27.
   */
  readonly countries?: readonly CountryCode[];
}

export interface OfferingData {
  readonly value: string;
  /** The full offering name (alias of `value`). */
  readonly offeringName: string;
  readonly kind: 'product' | 'service';
  /** The unit the price is quoted per — a canonical symbol (`pc`, `month`, `kg`, …). */
  readonly unit: string;
  /** A single plausible price, in EUR minor units (cents). */
  readonly price: number;
  readonly currency: 'EUR';
  /** NACE Rev. 2.1 code of the offering's industry. */
  readonly industryCode: string;
  /** The localized industry label in the resolved language. */
  readonly industryName: string;
  /** BCP-47 subtag used for this record's names. */
  readonly language: string;
}

/** A multi-country offering: the shared fields plus the country it was drawn from. */
export interface AnyOfferingData extends OfferingData {
  /** ISO 3166 alpha-2 code of the country this offering was drawn from. */
  readonly country: string;
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

export interface CustomRegexOptions extends RequestOptions {
  /**
   * The regular expression (source form, no delimiters) to generate a matching
   * string for, e.g. `"[A-Z]{2}-\\d{6}"`. Required. Back-references and
   * look-around assertions are rejected, as are patterns with an over-large
   * worst-case expansion. Requires the Pro plan or above.
   */
  readonly pattern: string;
  /**
   * How many times unbounded quantifiers (`*`, `+`, `{n,}`) may expand.
   * Defaults to 32.
   */
  readonly maxRepetition?: number;
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

/**
 * Options for a country's one-call `company` generator — shared across every
 * country (the data shape differs per country, but the inputs do not).
 */
export interface LocaleCompanyOptions extends RequestOptions {
  readonly strategy?: CompanyNameStrategy | 'any';
  /** Country-specific legal form, `'any'` for weighted-random, or `'none'` to omit. */
  readonly legalForm?: string;
  /** Corrupt the checksummed identifiers so they fail validation; name unaffected. */
  readonly invalid?: boolean;
  /** Restrict output to edge-case values from the rare corners. */
  readonly edge?: boolean;
  /** Present the company name in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, homoglyphs, or bidi/combining marks); legal form and identifiers stay clean. */
  readonly extreme?: boolean;
}

/** One AT company: the name, its legal form, and the matching national identifiers. */
export interface AtCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly firmenbuchnummer: string;
  readonly uid: string;
  readonly steuernummer: string;
}

/** One BE company: the name, its legal form, and the matching national identifiers. */
export interface BeCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly ondernemingsnummer: string;
}

/** One BG company: the name, its legal form, and the matching national identifiers. */
export interface BgCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly eik: string;
}

/** One CY company: the name, its legal form, and the matching national identifiers. */
export interface CyCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly tic: string;
}

/** One CZ company: the name, its legal form, and the matching national identifiers. */
export interface CzCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly ico: string;
}

/** One DE company: the name, its legal form, and the matching national identifiers. */
export interface DeCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly handelsregisternummer: string;
  readonly ustIdnr: string;
  readonly wirtschaftsIdnr: string;
}

/** One DK company: the name, its legal form, and the matching national identifiers. */
export interface DkCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly cvr: string;
}

/** One EE company: the name, its legal form, and the matching national identifiers. */
export interface EeCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly registrikood: string;
  readonly kmkr: string;
}

/** One ES company: the name, its legal form, and the matching national identifiers. */
export interface EsCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly cif: string;
}

/** One FI company: the name, its legal form, and the matching national identifiers. */
export interface FiCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly yTunnus: string;
}

/** One FR company: the name, its legal form, and the matching national identifiers. */
export interface FrCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly siren: string;
}

/** One GR company: the name, its legal form, and the matching national identifiers. */
export interface GrCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly afm: string;
}

/** One HR company: the name, its legal form, and the matching national identifiers. */
export interface HrCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly oib: string;
}

/** One HU company: the name, its legal form, and the matching national identifiers. */
export interface HuCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly cegjegyzekszam: string;
  readonly adoszam: string;
}

/** One IE company: the name, its legal form, and the matching national identifiers. */
export interface IeCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly cro: string;
  readonly vat: string;
}

/** One IT company: the name, its legal form, and the matching national identifiers. */
export interface ItCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly partitaIva: string;
}

/** One LT company: the name, its legal form, and the matching national identifiers. */
export interface LtCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly imonesKodas: string;
  readonly pvm: string;
}

/** One LU company: the name, its legal form, and the matching national identifiers. */
export interface LuCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly tva: string;
}

/** One LV company: the name, its legal form, and the matching national identifiers. */
export interface LvCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly registracijasNumurs: string;
}

/** One MT company: the name, its legal form, and the matching national identifiers. */
export interface MtCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly vat: string;
}

/** One NL company: the name, its legal form, and the matching national identifiers. */
export interface NlCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly kvk: string;
  readonly rsin: string;
  readonly btwId: string;
}

/** One PT company: the name, its legal form, and the matching national identifiers. */
export interface PtCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly nif: string;
}

/** One RO company: the name, its legal form, and the matching national identifiers. */
export interface RoCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly cui: string;
}

/** One SE company: the name, its legal form, and the matching national identifiers. */
export interface SeCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly organisationsnummer: string;
}

/** One SI company: the name, its legal form, and the matching national identifiers. */
export interface SiCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly davcnaStevilka: string;
}

/** One SK company: the name, its legal form, and the matching national identifiers. */
export interface SkCompanyData {
  readonly name: string;
  readonly legalForm: string | null;
  readonly ico: string;
  readonly icDph: string;
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
  /** Whether the domain is free webmail, a regional provider, or corporate. */
  readonly domainCategory: EmailDomainCategory;
  /** The company a corporate domain / company local-part was derived from, or `null`. */
  readonly company: string | null;
  readonly plusTag: string | null;
}

/** A multi-country email: the shared fields plus the country it was drawn from. */
export interface AnyEmailData extends EmailData {
  /** ISO 3166 alpha-2 code of the country this address was drawn from. */
  readonly country: string;
}

export interface LoremData {
  readonly value: string;
  readonly words: number;
  readonly chars: number;
  readonly bytes: number;
  readonly paragraphs: number;
  readonly startedWithLorem: boolean;
}

export interface CustomRegexData {
  readonly value: string;
  /** The source pattern the value was generated from, echoed back. */
  readonly pattern: string;
}

export interface UuidOptions extends RequestOptions {
  /**
   * UUID version: `'4'` (fully random, the default) or `'7'` (time-ordered,
   * RFC 9562). The v7 timestamp is derived from the seed, not the wall clock.
   */
  readonly version?: '4' | '7';
}

export interface UuidData {
  /** The canonical hyphenated lowercase UUID. */
  readonly value: string;
  /** The version generated: `'4'` or `'7'`. */
  readonly version: '4' | '7';
}

/** ULID takes no options beyond the shared `seed`. */
export type UlidOptions = RequestOptions;

export interface UlidData {
  /** The 26-character Crockford-Base32 ULID. */
  readonly value: string;
}

export interface NanoIdOptions extends RequestOptions {
  /** Id length in characters (1–255). Defaults to 21. */
  readonly size?: number;
  /** Custom alphabet to draw from. Defaults to nanoid’s URL-safe 64-character set. */
  readonly alphabet?: string;
}

export interface NanoIdData {
  /** The generated Nano ID. */
  readonly value: string;
}

/** ObjectId takes no options beyond the shared `seed`. */
export type ObjectIdOptions = RequestOptions;

export interface ObjectIdData {
  /** The 24-character hex MongoDB ObjectId. */
  readonly value: string;
}

export interface SequenceOptions extends RequestOptions {
  /** First value of the sequence. Defaults to 1. */
  readonly start?: number;
  /** Increment between consecutive records. Defaults to 1; must be non-zero. */
  readonly step?: number;
}

export interface SequenceData {
  /** The sequence value: `start + index · step`. */
  readonly value: number;
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
  /** Present name and surname in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, homoglyphs, or bidi/combining marks); initials and any identifier stay clean. */
  readonly extreme?: boolean;
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
  /** Present the company name in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, homoglyphs, or bidi/combining marks); legal form and identifiers stay clean. */
  readonly extreme?: boolean;
}

/** Options for the multi-country `companyName` generator (no `legalForm` — it is country-specific). */
export interface AnyCompanyNameOptions extends RequestOptions {
  readonly strategy?: CompanyNameStrategy | 'any';
  readonly edge?: boolean;
  /** Present the company name in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, homoglyphs, or bidi/combining marks); legal form and identifiers stay clean. */
  readonly extreme?: boolean;
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

/* ------------------------------------------------------------------ *
 * EU national-identifier generators.                                 *
 *                                                                    *
 * One Options/Data pair per generator, mirroring its API route's     *
 * query params (minus seed/count) and response `data` shape. Numbers *
 * that encode a birth date and/or sex carry the shared person        *
 * constraints (`sex`, age, `bornOn/Before/After`); the rest expose    *
 * only their own knobs (`format`, `standard`, `invalid`, `edge`, …).   *
 * ------------------------------------------------------------------ */

export interface FrSirenOptions extends RequestOptions {
  readonly format?: 'siren' | 'siret' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface FrSirenData {
  readonly value: string;
  readonly digits: string;
}

export interface FrNirOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface FrNirData {
  readonly value: string;
  readonly digits: string;
  readonly sex: Sex;
  readonly birthYear: number;
  readonly birthMonth: number;
}

export interface AtSvnrOptions extends RequestOptions {
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface AtSvnrData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
}

export interface AtUidOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface AtUidData {
  readonly value: string;
  readonly digits: string;
}

export interface AtFirmenbuchnummerOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface AtFirmenbuchnummerData {
  readonly value: string;
  readonly number: number;
  readonly letter: string;
}

export interface AtSteuernummerOptions extends RequestOptions {
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface AtSteuernummerData {
  readonly value: string;
  readonly digits: string;
}

export interface BeRijksregisternummerOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly kind?: 'national' | 'bis';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface BeRijksregisternummerData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface BeOndernemingsnummerOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface BeOndernemingsnummerData {
  readonly value: string;
  readonly digits: string;
}

export interface BgEgnOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface BgEgnData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface BgEikOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface BgEikData {
  readonly value: string;
  readonly digits: string;
}

export interface HrOibOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface HrOibData {
  readonly value: string;
  readonly digits: string;
}

export interface HrJmbgOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface HrJmbgData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface CyTicOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface CyTicData {
  readonly value: string;
  readonly digits: string;
  readonly letter: string;
}

export interface CzRodneCisloOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly format?: 'plain' | 'with-slash';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface CzRodneCisloData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface CzIcoOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface CzIcoData {
  readonly value: string;
  readonly digits: string;
}

export interface DkCprOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly checksum?: 'modulus-11' | 'none';
  readonly format?: 'plain' | 'with-hyphen';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface DkCprData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface DkPersonOptions extends DkCprOptions {
  /** Mangle the casing of `name`/`surname` for testing. Defaults to `true`. */
  readonly caseStrict?: boolean;
}

export interface DkPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly cpr: string;
}

export interface DkCvrOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface DkCvrData {
  readonly value: string;
  readonly digits: string;
}

export interface EeIsikukoodOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface EeIsikukoodData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface EeRegistrikoodOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface EeRegistrikoodData {
  readonly value: string;
  readonly digits: string;
}

export interface EeKmkrOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface EeKmkrData {
  readonly value: string;
  readonly digits: string;
}

export interface FiHenkilotunnusOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface FiHenkilotunnusData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface FiYTunnusOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface FiYTunnusData {
  readonly value: string;
  readonly digits: string;
}

export interface DeSteuerIdOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface DeSteuerIdData {
  readonly value: string;
  readonly digits: string;
}

export interface DeUstIdnrOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface DeUstIdnrData {
  readonly value: string;
  readonly digits: string;
}

export interface DeHandelsregisternummerOptions extends RequestOptions {
  readonly division?: 'HRA' | 'HRB';
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface DeHandelsregisternummerData {
  readonly value: string;
  readonly division: 'HRA' | 'HRB';
  readonly court: string;
  readonly number: string;
}

export interface DeWirtschaftsIdnrOptions extends RequestOptions {
  readonly suffix?: number;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface DeWirtschaftsIdnrData {
  readonly value: string;
  readonly digits: string;
  readonly suffix: string;
}

export interface DePersonalausweisOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface DePersonalausweisData {
  readonly value: string;
  readonly serial: string;
  readonly checkDigit: number;
}

export interface GrAmkaOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface GrAmkaData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface GrAfmOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface GrAfmData {
  readonly value: string;
  readonly digits: string;
}

export interface HuAdoazonositoJelOptions extends RequestOptions {
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface HuAdoazonositoJelData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
}

export interface HuTajOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface HuTajData {
  readonly value: string;
  readonly digits: string;
}

export interface HuSzemelyiAzonositoOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly standard?: 'pre-1997' | 'modern' | 'both';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface HuSzemelyiAzonositoData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
  readonly standard: 'pre-1997' | 'modern';
}

export interface HuAdoszamOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface HuAdoszamData {
  readonly value: string;
  readonly digits: string;
}

export interface HuCegjegyzekszamOptions extends RequestOptions {
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface HuCegjegyzekszamData {
  readonly value: string;
  readonly court: number;
  readonly form: number;
  readonly serial: number;
  readonly digits: string;
}

export interface IePpsnOptions extends RequestOptions {
  readonly standard?: 'pre-2013' | 'modern' | 'both';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface IePpsnData {
  readonly value: string;
  readonly digits: string;
  readonly checkLetter: string;
  readonly secondLetter?: string;
}

export interface IeVatOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly standard?: 'pre-2013' | 'modern' | 'both';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface IeVatData {
  readonly value: string;
  readonly digits: string;
}

export interface IeCroOptions extends RequestOptions {
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface IeCroData {
  readonly value: string;
  readonly digits: string;
}

export interface ItCodiceFiscaleOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly surname?: string;
  readonly name?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface ItCodiceFiscaleData {
  readonly value: string;
  readonly surnameCode: string;
  readonly nameCode: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface ItPartitaIvaOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface ItPartitaIvaData {
  readonly value: string;
  readonly digits: string;
}

export interface LvPersonasKodsOptions extends RequestOptions {
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly standard?: 'legacy' | 'modern' | 'both';
  readonly format?: 'plain' | 'with-hyphen';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface LvPersonasKodsData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate?: string;
}

export interface LvRegistracijasNumursOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface LvRegistracijasNumursData {
  readonly value: string;
  readonly digits: string;
}

export interface LtAsmensKodasOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface LtAsmensKodasData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface LtImonesKodasOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface LtImonesKodasData {
  readonly value: string;
  readonly digits: string;
}

export interface LtPvmOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface LtPvmData {
  readonly value: string;
  readonly digits: string;
}

export interface LuMatriculeOptions extends RequestOptions {
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface LuMatriculeData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
}

export interface LuTvaOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface LuTvaData {
  readonly value: string;
  readonly digits: string;
}

export interface MtIdCardOptions extends RequestOptions {
  readonly category?: 'M' | 'G' | 'A' | 'P' | 'L' | 'H' | 'B' | 'Z';
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface MtIdCardData {
  readonly value: string;
  readonly digits: string;
  readonly category: 'M' | 'G' | 'A' | 'P' | 'L' | 'H' | 'B' | 'Z';
}

export interface MtVatOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface MtVatData {
  readonly value: string;
  readonly digits: string;
}

export interface NlBsnOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface NlBsnData {
  readonly value: string;
  readonly digits: string;
}

export interface NlPersonOptions extends PersonConstraintOptions {
  /** Bias the BSN and name shape toward their rare corners. */
  readonly edge?: boolean;
  /** Present name and surname in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, homoglyphs, or bidi/combining marks); initials and any identifier stay clean. */
  readonly extreme?: boolean;
  /** Mangle the casing of `name`/`surname` for testing. Defaults to `true`. */
  readonly caseStrict?: boolean;
}

export interface NlPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly bsn: string;
}

/**
 * Options shared by every full-person generator (`bePerson`, `frPerson`,
 * `itPerson`, …): the person constraints (`sex`, age/birth-date filters,
 * `invalid`) plus `edge` and `caseStrict`. The matching national number is
 * carried on each country's own `*PersonData` result.
 */
export interface FullPersonOptions extends PersonConstraintOptions {
  /** Bias the number and name shape toward their rarely-exercised corners. */
  readonly edge?: boolean;
  /** Present name and surname in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, homoglyphs, or bidi/combining marks); initials and any identifier stay clean. */
  readonly extreme?: boolean;
  /** Mangle the casing of `name`/`surname` for testing. Defaults to `true`. */
  readonly caseStrict?: boolean;
}

export type BePersonOptions = FullPersonOptions;

export interface BePersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly rijksregisternummer: string;
}

export type BgPersonOptions = FullPersonOptions;

export interface BgPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly egn: string;
}

export type CzPersonOptions = FullPersonOptions;

export interface CzPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly rodneCislo: string;
}

export type EePersonOptions = FullPersonOptions;

export interface EePersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly isikukood: string;
}

export type FiPersonOptions = FullPersonOptions;

export interface FiPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly henkilotunnus: string;
}

export type GrPersonOptions = FullPersonOptions;

export interface GrPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly amka: string;
}

export type HrPersonOptions = FullPersonOptions;

export interface HrPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly jmbg: string;
}

export type HuPersonOptions = FullPersonOptions;

export interface HuPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly szemelyiAzonosito: string;
}

export type LtPersonOptions = FullPersonOptions;

export interface LtPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly asmensKodas: string;
}

export type RoPersonOptions = FullPersonOptions;

export interface RoPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly cnp: string;
}

export type SePersonOptions = FullPersonOptions;

export interface SePersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly personnummer: string;
}

export type SiPersonOptions = FullPersonOptions;

export interface SiPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly emso: string;
}

export type SkPersonOptions = FullPersonOptions;

export interface SkPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly rodneCislo: string;
}

export type AtPersonOptions = FullPersonOptions;

export interface AtPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly svnr: string;
}

export type LuPersonOptions = FullPersonOptions;

export interface LuPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly matricule: string;
}

export type FrPersonOptions = FullPersonOptions;

export interface FrPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly nir: string;
}

export type ItPersonOptions = FullPersonOptions;

export interface ItPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly codiceFiscale: string;
}

export type CyPersonOptions = FullPersonOptions;

export interface CyPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly tic: string;
}

export type DePersonOptions = FullPersonOptions;

export interface DePersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly steuerId: string;
}

export type EsPersonOptions = FullPersonOptions;

export interface EsPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly dni: string;
}

export type IePersonOptions = FullPersonOptions;

export interface IePersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly ppsn: string;
}

export type MtPersonOptions = FullPersonOptions;

export interface MtPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly idCard: string;
}

export type PtPersonOptions = FullPersonOptions;

export interface PtPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly cartaoCidadao: string;
}

export type LvPersonOptions = FullPersonOptions;

export interface LvPersonData {
  readonly name: string;
  readonly surname: string;
  readonly initials: string;
  readonly birthDate: string;
  readonly personasKods: string;
}


export interface NlRsinOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface NlRsinData {
  readonly value: string;
  readonly digits: string;
}

export interface NlBtwIdOptions extends RequestOptions {
  readonly standard?: 'legacy' | 'modern' | 'both';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface NlBtwIdData {
  readonly value: string;
  readonly digits: string;
  readonly standard: 'legacy' | 'modern';
}

export interface NlKvkOptions extends RequestOptions {
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface NlKvkData {
  readonly value: string;
  readonly digits: string;
}

export interface PtNifOptions extends RequestOptions {
  readonly entity?: 'person' | 'company';
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface PtNifData {
  readonly value: string;
  readonly digits: string;
  readonly entity: 'person' | 'company';
}

export interface PtCartaoCidadaoOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface PtCartaoCidadaoData {
  readonly value: string;
  readonly nic: string;
  readonly version: string;
}

export interface RoCnpOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface RoCnpData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
  readonly county: string;
}

export interface RoCuiOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface RoCuiData {
  readonly value: string;
  readonly digits: string;
}

export interface SkRodneCisloOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly format?: 'plain' | 'with-slash';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface SkRodneCisloData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface SkIcoOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface SkIcoData {
  readonly value: string;
  readonly digits: string;
}

export interface SkIcDphOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface SkIcDphData {
  readonly value: string;
  readonly digits: string;
}

export interface SiEmsoOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface SiEmsoData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface SiDavcnaStevilkaOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface SiDavcnaStevilkaData {
  readonly value: string;
  readonly digits: string;
}

export interface EsDniOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface EsDniData {
  readonly value: string;
  readonly digits: string;
  readonly letter: string;
}

export interface EsNieOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface EsNieData {
  readonly value: string;
  readonly prefix: string;
  readonly digits: string;
  readonly letter: string;
}

export interface EsCifOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface EsCifData {
  readonly value: string;
  readonly digits: string;
}

export interface SePersonnummerOptions extends RequestOptions {
  readonly sex?: Sex;
  readonly olderThan?: number;
  readonly youngerThan?: number;
  readonly atAge?: number;
  readonly bornOn?: string;
  readonly bornBefore?: string;
  readonly bornAfter?: string;
  readonly format?: 'short' | 'long';
  readonly kind?: 'personnummer' | 'samordningsnummer';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface SePersonnummerData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
  readonly sex: Sex;
}

export interface SeOrganisationsnummerOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
  /** Present the value in a hostile-but-recoverable encoding (untrimmed whitespace, invisible/zero-width chars, BOM, or bidi/combining marks); homoglyphs excluded so it stays machine-parseable. */
  readonly extreme?: boolean;
}

export interface SeOrganisationsnummerData {
  readonly value: string;
  readonly digits: string;
}
