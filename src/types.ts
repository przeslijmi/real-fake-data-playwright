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
export type VehicleRegistrationType = 'standard' | 'custom' | 'police' | 'military' | 'historic';

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

export interface CustomRegexData {
  readonly value: string;
  /** The source pattern the value was generated from, echoed back. */
  readonly pattern: string;
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
}

export interface AtUidData {
  readonly value: string;
  readonly digits: string;
}

export interface AtFirmenbuchnummerOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
}

export interface AtFirmenbuchnummerData {
  readonly value: string;
  readonly number: number;
  readonly letter: string;
}

export interface AtSteuernummerOptions extends RequestOptions {
  readonly edge?: boolean;
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
}

export interface BgEikData {
  readonly value: string;
  readonly digits: string;
}

export interface HrOibOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
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
}

export interface EeRegistrikoodData {
  readonly value: string;
  readonly digits: string;
}

export interface EeKmkrOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
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
}

export interface FiYTunnusData {
  readonly value: string;
  readonly digits: string;
}

export interface DeSteuerIdOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
}

export interface DeSteuerIdData {
  readonly value: string;
  readonly digits: string;
}

export interface DeUstIdnrOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
}

export interface DeUstIdnrData {
  readonly value: string;
  readonly digits: string;
}

export interface DeHandelsregisternummerOptions extends RequestOptions {
  readonly division?: 'HRA' | 'HRB';
  readonly edge?: boolean;
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
}

export interface DeWirtschaftsIdnrData {
  readonly value: string;
  readonly digits: string;
  readonly suffix: string;
}

export interface DePersonalausweisOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
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
}

export interface HuAdoazonositoJelData {
  readonly value: string;
  readonly digits: string;
  readonly birthDate: string;
}

export interface HuTajOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
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
}

export interface HuAdoszamData {
  readonly value: string;
  readonly digits: string;
}

export interface HuCegjegyzekszamOptions extends RequestOptions {
  readonly edge?: boolean;
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
}

export interface IeVatData {
  readonly value: string;
  readonly digits: string;
}

export interface IeCroOptions extends RequestOptions {
  readonly edge?: boolean;
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
}

export interface LtImonesKodasData {
  readonly value: string;
  readonly digits: string;
}

export interface LtPvmOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
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
}

export interface LuTvaData {
  readonly value: string;
  readonly digits: string;
}

export interface MtIdCardOptions extends RequestOptions {
  readonly category?: 'M' | 'G' | 'A' | 'P' | 'L' | 'H' | 'B' | 'Z';
  readonly edge?: boolean;
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
}

export interface MtVatData {
  readonly value: string;
  readonly digits: string;
}

export interface NlBsnOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
}

export interface NlBsnData {
  readonly value: string;
  readonly digits: string;
}

export interface NlPersonOptions extends PersonConstraintOptions {
  /** Bias the BSN and name shape toward their rare corners. */
  readonly edge?: boolean;
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
}

export interface NlRsinData {
  readonly value: string;
  readonly digits: string;
}

export interface NlBtwIdOptions extends RequestOptions {
  readonly standard?: 'legacy' | 'modern' | 'both';
  readonly invalid?: boolean;
  readonly edge?: boolean;
}

export interface NlBtwIdData {
  readonly value: string;
  readonly digits: string;
  readonly standard: 'legacy' | 'modern';
}

export interface NlKvkOptions extends RequestOptions {
  readonly edge?: boolean;
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
}

export interface PtNifData {
  readonly value: string;
  readonly digits: string;
  readonly entity: 'person' | 'company';
}

export interface PtCartaoCidadaoOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
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
}

export interface SkIcoData {
  readonly value: string;
  readonly digits: string;
}

export interface SkIcDphOptions extends RequestOptions {
  readonly format?: 'national' | 'vat';
  readonly invalid?: boolean;
  readonly edge?: boolean;
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
}

export interface SiDavcnaStevilkaData {
  readonly value: string;
  readonly digits: string;
}

export interface EsDniOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
}

export interface EsDniData {
  readonly value: string;
  readonly digits: string;
  readonly letter: string;
}

export interface EsNieOptions extends RequestOptions {
  readonly invalid?: boolean;
  readonly edge?: boolean;
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
}

export interface SeOrganisationsnummerData {
  readonly value: string;
  readonly digits: string;
}
