import type { FakeDataProvider } from './fake-data-provider.js';
import type {
  AddressOptions,
  AnyCompanyNameData,
  AnyCompanyNameOptions,
  AnyPersonNameData,
  AnyPersonNameOptions,
  CompanyNameOptions,
  CompanyOptions,
  CountryCode,
  DrivingLicenseOptions,
  EmailData,
  EmailOptions,
  IbanOptions,
  IdCardOptions,
  KrsOptions,
  LandRegisterOptions,
  LocaleCompanyNameData,
  LocaleCompanyNameOptions,
  LoremData,
  LoremOptions,
  NipOptions,
  PassportOptions,
  PersonNameData,
  PersonNameOptions,
  PeselOptions,
  PersonOptions,
  PolishAddressData,
  PolishCompanyData,
  PolishCompanyNameData,
  PolishDrivingLicenseData,
  PolishIbanData,
  PolishIdCardData,
  PolishKrsData,
  PolishLandRegisterData,
  PolishNipData,
  PolishPassportData,
  PolishPeselData,
  PolishPersonData,
  PolishRegonData,
  PolishVehicleRegistrationData,
  RegonOptions,
  RequestOptions,
  VehicleRegistrationOptions,
} from './types.js';

/**
 * Singular + plural method pair every country's `person-name` generator
 * contributes: `dePersonName`/`dePersonNames`, `plPersonName`/`plPersonNames`,
 * and so on for all 27 country codes.
 */
type PersonNameMethods = {
  [Country in CountryCode as `${Country}PersonName`]: (
    options?: PersonNameOptions,
  ) => Promise<PersonNameData>;
} & {
  [Country in CountryCode as `${Country}PersonNames`]: (
    count: number,
    options?: PersonNameOptions,
  ) => Promise<PersonNameData[]>;
};

/**
 * `company-name` method pair for every country *except* Poland — `plCompanyName`
 * is declared explicitly below because it carries the typed Polish `legalForm`.
 */
type LocaleCompanyNameMethods = {
  [Country in Exclude<CountryCode, 'pl'> as `${Country}CompanyName`]: (
    options?: LocaleCompanyNameOptions,
  ) => Promise<LocaleCompanyNameData>;
} & {
  [Country in Exclude<CountryCode, 'pl'> as `${Country}CompanyNames`]: (
    count: number,
    options?: LocaleCompanyNameOptions,
  ) => Promise<LocaleCompanyNameData[]>;
};

/**
 * The typed surface tests use. Each generator exposes a singular method
 * returning one record and a plural returning an array of `count` records.
 *
 * Method names are locale-prefixed (`plPesel`, `dePersonName`, …) so generators
 * for different countries never collide; the locale-agnostic generators
 * (`email`, `lorem`) and the multi-country aggregates (`personName`,
 * `companyName`) carry no prefix. Plurals take `count` as their first positional
 * argument; its bounds are enforced by the API (out-of-range → a
 * {@link RealFakeDataError} 400), so paid tiers can raise the ceiling without
 * a client change.
 *
 * Beyond the Polish national set below, every one of the 27 supported EU
 * countries adds a `<cc>PersonName` and `<cc>CompanyName` pair (see
 * {@link PersonNameMethods} and {@link LocaleCompanyNameMethods}).
 */
export type FakeData = PersonNameMethods &
  LocaleCompanyNameMethods & {
    plPesel(options?: PeselOptions): Promise<PolishPeselData>;
    plPesels(count: number, options?: PeselOptions): Promise<PolishPeselData[]>;
    plPerson(options?: PersonOptions): Promise<PolishPersonData>;
    plPeople(count: number, options?: PersonOptions): Promise<PolishPersonData[]>;
    plAddress(options?: AddressOptions): Promise<PolishAddressData>;
    plAddresses(count: number, options?: AddressOptions): Promise<PolishAddressData[]>;
    plNip(options?: NipOptions): Promise<PolishNipData>;
    plNips(count: number, options?: NipOptions): Promise<PolishNipData[]>;
    plIban(options?: IbanOptions): Promise<PolishIbanData>;
    plIbans(count: number, options?: IbanOptions): Promise<PolishIbanData[]>;
    plRegon(options?: RegonOptions): Promise<PolishRegonData>;
    plRegons(count: number, options?: RegonOptions): Promise<PolishRegonData[]>;
    plCompany(options?: CompanyOptions): Promise<PolishCompanyData>;
    plCompanies(count: number, options?: CompanyOptions): Promise<PolishCompanyData[]>;
    plCompanyName(options?: CompanyNameOptions): Promise<PolishCompanyNameData>;
    plCompanyNames(count: number, options?: CompanyNameOptions): Promise<PolishCompanyNameData[]>;
    plVehicleRegistration(
      options?: VehicleRegistrationOptions,
    ): Promise<PolishVehicleRegistrationData>;
    plVehicleRegistrations(
      count: number,
      options?: VehicleRegistrationOptions,
    ): Promise<PolishVehicleRegistrationData[]>;
    plIdCard(options?: IdCardOptions): Promise<PolishIdCardData>;
    plIdCards(count: number, options?: IdCardOptions): Promise<PolishIdCardData[]>;
    plPassport(options?: PassportOptions): Promise<PolishPassportData>;
    plPassports(count: number, options?: PassportOptions): Promise<PolishPassportData[]>;
    plKrs(options?: KrsOptions): Promise<PolishKrsData>;
    plKrsNumbers(count: number, options?: KrsOptions): Promise<PolishKrsData[]>;
    plLandRegister(options?: LandRegisterOptions): Promise<PolishLandRegisterData>;
    plLandRegisters(
      count: number,
      options?: LandRegisterOptions,
    ): Promise<PolishLandRegisterData[]>;
    plDrivingLicense(options?: DrivingLicenseOptions): Promise<PolishDrivingLicenseData>;
    plDrivingLicenses(
      count: number,
      options?: DrivingLicenseOptions,
    ): Promise<PolishDrivingLicenseData[]>;
    /** Multi-country person name: each record is drawn from one of `countries` (default: all 27). */
    personName(options?: AnyPersonNameOptions): Promise<AnyPersonNameData>;
    personNames(count: number, options?: AnyPersonNameOptions): Promise<AnyPersonNameData[]>;
    /** Multi-country company name: each record is drawn from one of `countries` (default: all 27). */
    companyName(options?: AnyCompanyNameOptions): Promise<AnyCompanyNameData>;
    companyNames(count: number, options?: AnyCompanyNameOptions): Promise<AnyCompanyNameData[]>;
    email(options?: EmailOptions): Promise<EmailData>;
    emails(count: number, options?: EmailOptions): Promise<EmailData[]>;
    lorem(options?: LoremOptions): Promise<LoremData>;
    lorems(count: number, options?: LoremOptions): Promise<LoremData[]>;
  };

export interface CreateFakeDataOptions {
  /**
   * Base seed for this instance. When set, the Nth call uses `seed + N`, so a
   * re-run with the same base seed produces identical-but-distinct data.
   * When omitted, the API randomises each call.
   */
  readonly seed?: number;
}

/**
 * The multi-country aggregates take a `countries` array; the wire wants it as a
 * comma-separated string (`?countries=pl,sk,it`), so we join it here.
 */
const toAggregateWire = (
  aggregateOptions: AnyPersonNameOptions | AnyCompanyNameOptions,
): RequestOptions => {
  const { countries, ...rest } = aggregateOptions;
  return {
    ...rest,
    ...(countries === undefined ? {} : { countries: countries.join(',') }),
  };
};

/**
 * Builds a {@link FakeData} facade over any {@link FakeDataProvider}. Owns the
 * per-call seed sequence so that calls are reproducible across runs yet
 * distinct within a run.
 */
export const createFakeData = (
  provider: FakeDataProvider,
  options: CreateFakeDataOptions = {},
): FakeData => {
  const baseSeed = options.seed;
  let counter = 0;

  const nextSeed = (override: number | undefined): number | undefined => {
    if (override !== undefined) {
      return override;
    }
    if (baseSeed === undefined) {
      return undefined;
    }
    const seed = baseSeed + counter;
    counter += 1;
    return seed;
  };

  const run = async <Data>(path: string, callOptions: RequestOptions): Promise<Data> => {
    const { seed, ...rest } = callOptions;
    // `rest` carries each method's wire params verbatim; the facade only adds
    // the resolved seed before handing them to the transport.
    const response = await provider.generate<Data>(path, {
      ...rest,
      seed: nextSeed(seed),
    });
    return response.data;
  };

  // A plural call is a single request carrying `count`; the API batches the
  // records from one seed, so — like a singular call — it consumes exactly one
  // slot of the per-instance seed sequence.
  const runMany = async <Data>(
    path: string,
    count: number,
    callOptions: RequestOptions,
  ): Promise<Data[]> => {
    const { seed, ...rest } = callOptions;
    const response = await provider.generate<Data[]>(path, {
      ...rest,
      count,
      seed: nextSeed(seed),
    });
    return response.data;
  };

  // The per-country name generators share one wire shape, so a pair of helpers
  // builds the method pair for each country. The assertion narrows the
  // computed-key object literal (which TypeScript infers as a string-indexed
  // record) back to the precise pair of named methods.
  const personNamePair = <Country extends CountryCode>(
    countryCode: Country,
  ): Pick<PersonNameMethods, `${Country}PersonName` | `${Country}PersonNames`> =>
    ({
      [`${countryCode}PersonName`]: async (personNameOptions: PersonNameOptions = {}) =>
        await run<PersonNameData>(`${countryCode}/person-name`, personNameOptions),
      [`${countryCode}PersonNames`]: async (
        count: number,
        personNameOptions: PersonNameOptions = {},
      ) => await runMany<PersonNameData>(`${countryCode}/person-name`, count, personNameOptions),
    }) as Pick<PersonNameMethods, `${Country}PersonName` | `${Country}PersonNames`>;

  const companyNamePair = <Country extends Exclude<CountryCode, 'pl'>>(
    countryCode: Country,
  ): Pick<LocaleCompanyNameMethods, `${Country}CompanyName` | `${Country}CompanyNames`> =>
    ({
      [`${countryCode}CompanyName`]: async (companyNameOptions: LocaleCompanyNameOptions = {}) =>
        await run<LocaleCompanyNameData>(`${countryCode}/company-name`, companyNameOptions),
      [`${countryCode}CompanyNames`]: async (
        count: number,
        companyNameOptions: LocaleCompanyNameOptions = {},
      ) =>
        await runMany<LocaleCompanyNameData>(
          `${countryCode}/company-name`,
          count,
          companyNameOptions,
        ),
    }) as Pick<LocaleCompanyNameMethods, `${Country}CompanyName` | `${Country}CompanyNames`>;

  return {
    plPesel: async (peselOptions = {}) => await run<PolishPeselData>('pl/pesel', peselOptions),
    plPesels: async (count, peselOptions = {}) =>
      await runMany<PolishPeselData>('pl/pesel', count, peselOptions),
    plPerson: async (personOptions = {}) => await run<PolishPersonData>('pl/person', personOptions),
    plPeople: async (count, personOptions = {}) =>
      await runMany<PolishPersonData>('pl/person', count, personOptions),
    plAddress: async (addressOptions = {}) =>
      await run<PolishAddressData>('pl/address', addressOptions),
    plAddresses: async (count, addressOptions = {}) =>
      await runMany<PolishAddressData>('pl/address', count, addressOptions),
    plNip: async (nipOptions = {}) => await run<PolishNipData>('pl/nip', nipOptions),
    plNips: async (count, nipOptions = {}) =>
      await runMany<PolishNipData>('pl/nip', count, nipOptions),
    plIban: async (ibanOptions = {}) => await run<PolishIbanData>('pl/iban', ibanOptions),
    plIbans: async (count, ibanOptions = {}) =>
      await runMany<PolishIbanData>('pl/iban', count, ibanOptions),
    plRegon: async (regonOptions = {}) => await run<PolishRegonData>('pl/regon', regonOptions),
    plRegons: async (count, regonOptions = {}) =>
      await runMany<PolishRegonData>('pl/regon', count, regonOptions),
    plCompany: async (companyOptions = {}) =>
      await run<PolishCompanyData>('pl/company', companyOptions),
    plCompanies: async (count, companyOptions = {}) =>
      await runMany<PolishCompanyData>('pl/company', count, companyOptions),
    plCompanyName: async (companyNameOptions = {}) =>
      await run<PolishCompanyNameData>('pl/company-name', companyNameOptions),
    plCompanyNames: async (count, companyNameOptions = {}) =>
      await runMany<PolishCompanyNameData>('pl/company-name', count, companyNameOptions),
    plVehicleRegistration: async (vehicleOptions = {}) =>
      await run<PolishVehicleRegistrationData>('pl/vehicle-registration', vehicleOptions),
    plVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<PolishVehicleRegistrationData>(
        'pl/vehicle-registration',
        count,
        vehicleOptions,
      ),
    plIdCard: async (idCardOptions = {}) => await run<PolishIdCardData>('pl/id-card', idCardOptions),
    plIdCards: async (count, idCardOptions = {}) =>
      await runMany<PolishIdCardData>('pl/id-card', count, idCardOptions),
    plPassport: async (passportOptions = {}) =>
      await run<PolishPassportData>('pl/passport', passportOptions),
    plPassports: async (count, passportOptions = {}) =>
      await runMany<PolishPassportData>('pl/passport', count, passportOptions),
    plKrs: async (krsOptions = {}) => await run<PolishKrsData>('pl/krs', krsOptions),
    plKrsNumbers: async (count, krsOptions = {}) =>
      await runMany<PolishKrsData>('pl/krs', count, krsOptions),
    plLandRegister: async (landRegisterOptions = {}) =>
      await run<PolishLandRegisterData>('pl/land-register', landRegisterOptions),
    plLandRegisters: async (count, landRegisterOptions = {}) =>
      await runMany<PolishLandRegisterData>('pl/land-register', count, landRegisterOptions),
    plDrivingLicense: async (drivingLicenseOptions = {}) =>
      await run<PolishDrivingLicenseData>('pl/driving-license', drivingLicenseOptions),
    plDrivingLicenses: async (count, drivingLicenseOptions = {}) =>
      await runMany<PolishDrivingLicenseData>('pl/driving-license', count, drivingLicenseOptions),
    personName: async (personNameOptions = {}) =>
      await run<AnyPersonNameData>('person-name', toAggregateWire(personNameOptions)),
    personNames: async (count, personNameOptions = {}) =>
      await runMany<AnyPersonNameData>('person-name', count, toAggregateWire(personNameOptions)),
    companyName: async (companyNameOptions = {}) =>
      await run<AnyCompanyNameData>('company-name', toAggregateWire(companyNameOptions)),
    companyNames: async (count, companyNameOptions = {}) =>
      await runMany<AnyCompanyNameData>('company-name', count, toAggregateWire(companyNameOptions)),
    email: async (emailOptions = {}) => await run<EmailData>('email', emailOptions),
    emails: async (count, emailOptions = {}) =>
      await runMany<EmailData>('email', count, emailOptions),
    lorem: async (loremOptions = {}) => await run<LoremData>('lorem', loremOptions),
    lorems: async (count, loremOptions = {}) =>
      await runMany<LoremData>('lorem', count, loremOptions),
    ...personNamePair('at'),
    ...personNamePair('be'),
    ...personNamePair('bg'),
    ...personNamePair('cy'),
    ...personNamePair('cz'),
    ...personNamePair('de'),
    ...personNamePair('dk'),
    ...personNamePair('ee'),
    ...personNamePair('es'),
    ...personNamePair('fi'),
    ...personNamePair('fr'),
    ...personNamePair('gr'),
    ...personNamePair('hr'),
    ...personNamePair('hu'),
    ...personNamePair('ie'),
    ...personNamePair('it'),
    ...personNamePair('lt'),
    ...personNamePair('lu'),
    ...personNamePair('lv'),
    ...personNamePair('mt'),
    ...personNamePair('nl'),
    ...personNamePair('pl'),
    ...personNamePair('pt'),
    ...personNamePair('ro'),
    ...personNamePair('se'),
    ...personNamePair('si'),
    ...personNamePair('sk'),
    ...companyNamePair('at'),
    ...companyNamePair('be'),
    ...companyNamePair('bg'),
    ...companyNamePair('cy'),
    ...companyNamePair('cz'),
    ...companyNamePair('de'),
    ...companyNamePair('dk'),
    ...companyNamePair('ee'),
    ...companyNamePair('es'),
    ...companyNamePair('fi'),
    ...companyNamePair('fr'),
    ...companyNamePair('gr'),
    ...companyNamePair('hr'),
    ...companyNamePair('hu'),
    ...companyNamePair('ie'),
    ...companyNamePair('it'),
    ...companyNamePair('lt'),
    ...companyNamePair('lu'),
    ...companyNamePair('lv'),
    ...companyNamePair('mt'),
    ...companyNamePair('nl'),
    ...companyNamePair('pt'),
    ...companyNamePair('ro'),
    ...companyNamePair('se'),
    ...companyNamePair('si'),
    ...companyNamePair('sk'),
  };
};
