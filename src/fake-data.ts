import type { FakeDataProvider } from './fake-data-provider.js';
import type {
  AddressOptions,
  AnyCompanyNameData,
  AnyCompanyNameOptions,
  AnyPersonNameData,
  AnyPersonNameOptions,
  AtFirmenbuchnummerData,
  AtFirmenbuchnummerOptions,
  AtSteuernummerData,
  AtSteuernummerOptions,
  AtSvnrData,
  AtSvnrOptions,
  AtUidData,
  AtUidOptions,
  BeOndernemingsnummerData,
  BeOndernemingsnummerOptions,
  BeRijksregisternummerData,
  BeRijksregisternummerOptions,
  BgEgnData,
  BgEgnOptions,
  BgEikData,
  BgEikOptions,
  CompanyNameOptions,
  CompanyOptions,
  LocaleCompanyOptions,
  AtCompanyData,
  BeCompanyData,
  BgCompanyData,
  CyCompanyData,
  CzCompanyData,
  DeCompanyData,
  DkCompanyData,
  EeCompanyData,
  EsCompanyData,
  FiCompanyData,
  FrCompanyData,
  GrCompanyData,
  HrCompanyData,
  HuCompanyData,
  IeCompanyData,
  ItCompanyData,
  LtCompanyData,
  LuCompanyData,
  LvCompanyData,
  MtCompanyData,
  NlCompanyData,
  PtCompanyData,
  RoCompanyData,
  SeCompanyData,
  SiCompanyData,
  SkCompanyData,
  CountryCode,
  CustomRegexData,
  CustomRegexOptions,
  UuidData,
  UuidOptions,
  UlidData,
  UlidOptions,
  NanoIdData,
  NanoIdOptions,
  ObjectIdData,
  ObjectIdOptions,
  SequenceData,
  SequenceOptions,
  CyTicData,
  CyTicOptions,
  CzIcoData,
  CzIcoOptions,
  CzRodneCisloData,
  CzRodneCisloOptions,
  DeHandelsregisternummerData,
  DeHandelsregisternummerOptions,
  DePersonalausweisData,
  DePersonalausweisOptions,
  DeSteuerIdData,
  DeSteuerIdOptions,
  DeUstIdnrData,
  DeUstIdnrOptions,
  DeWirtschaftsIdnrData,
  DeWirtschaftsIdnrOptions,
  DkCprData,
  DkCprOptions,
  DkPersonData,
  DkPersonOptions,
  DkCvrData,
  DkCvrOptions,
  DrivingLicenseOptions,
  EeIsikukoodData,
  EeIsikukoodOptions,
  EeKmkrData,
  EeKmkrOptions,
  EeRegistrikoodData,
  EeRegistrikoodOptions,
  AnyEmailData,
  AnyEmailOptions,
  EmailData,
  EmailOptions,
  AnyOfferingData,
  AnyOfferingOptions,
  OfferingData,
  OfferingOptions,
  EsCifData,
  EsCifOptions,
  EsDniData,
  EsDniOptions,
  EsNieData,
  EsNieOptions,
  FiHenkilotunnusData,
  FiHenkilotunnusOptions,
  FiYTunnusData,
  FiYTunnusOptions,
  FrNirData,
  FrNirOptions,
  FrSirenData,
  FrSirenOptions,
  GrAfmData,
  GrAfmOptions,
  GrAmkaData,
  GrAmkaOptions,
  HrJmbgData,
  HrJmbgOptions,
  HrOibData,
  HrOibOptions,
  HuAdoazonositoJelData,
  HuAdoazonositoJelOptions,
  HuAdoszamData,
  HuAdoszamOptions,
  HuCegjegyzekszamData,
  HuCegjegyzekszamOptions,
  HuSzemelyiAzonositoData,
  HuSzemelyiAzonositoOptions,
  HuTajData,
  HuTajOptions,
  IbanOptions,
  IbanData,
  IdCardOptions,
  IeCroData,
  IeCroOptions,
  IePpsnData,
  IePpsnOptions,
  IeVatData,
  IeVatOptions,
  ItCodiceFiscaleData,
  ItCodiceFiscaleOptions,
  ItPartitaIvaData,
  ItPartitaIvaOptions,
  KrsOptions,
  LandRegisterOptions,
  LocaleCompanyNameData,
  LocaleCompanyNameOptions,
  LoremData,
  LoremOptions,
  LtAsmensKodasData,
  LtAsmensKodasOptions,
  LtImonesKodasData,
  LtImonesKodasOptions,
  LtPvmData,
  LtPvmOptions,
  LuMatriculeData,
  LuMatriculeOptions,
  LuTvaData,
  LuTvaOptions,
  LvPersonasKodsData,
  LvPersonasKodsOptions,
  LvRegistracijasNumursData,
  LvRegistracijasNumursOptions,
  MtIdCardData,
  MtIdCardOptions,
  MtVatData,
  MtVatOptions,
  NipOptions,
  NlBsnData,
  NlBsnOptions,
  NlPersonData,
  NlPersonOptions,
  NlBtwIdData,
  NlBtwIdOptions,
  NlKvkData,
  NlKvkOptions,
  NlRsinData,
  NlRsinOptions,
  PassportOptions,
  PersonNameData,
  PersonNameOptions,
  PersonOptions,
  PeselOptions,
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
  PolishPersonData,
  BePersonData,
  BePersonOptions,
  BgPersonData,
  BgPersonOptions,
  CzPersonData,
  CzPersonOptions,
  EePersonData,
  EePersonOptions,
  FiPersonData,
  FiPersonOptions,
  GrPersonData,
  GrPersonOptions,
  HrPersonData,
  HrPersonOptions,
  HuPersonData,
  HuPersonOptions,
  LtPersonData,
  LtPersonOptions,
  RoPersonData,
  RoPersonOptions,
  SePersonData,
  SePersonOptions,
  SiPersonData,
  SiPersonOptions,
  SkPersonData,
  SkPersonOptions,
  AtPersonData,
  AtPersonOptions,
  LuPersonData,
  LuPersonOptions,
  FrPersonData,
  FrPersonOptions,
  ItPersonData,
  ItPersonOptions,
  CyPersonData,
  CyPersonOptions,
  DePersonData,
  DePersonOptions,
  EsPersonData,
  EsPersonOptions,
  IePersonData,
  IePersonOptions,
  MtPersonData,
  MtPersonOptions,
  PtPersonData,
  PtPersonOptions,
  LvPersonData,
  LvPersonOptions,
  PolishPeselData,
  PolishRegonData,
  PolishVehicleRegistrationData,
  PtCartaoCidadaoData,
  PtCartaoCidadaoOptions,
  PtNifData,
  PtNifOptions,
  RegonOptions,
  RequestOptions,
  RoCnpData,
  RoCnpOptions,
  RoCuiData,
  RoCuiOptions,
  SeOrganisationsnummerData,
  SeOrganisationsnummerOptions,
  SePersonnummerData,
  SePersonnummerOptions,
  SiDavcnaStevilkaData,
  SiDavcnaStevilkaOptions,
  SiEmsoData,
  SiEmsoOptions,
  SkIcDphData,
  SkIcDphOptions,
  SkIcoData,
  SkIcoOptions,
  SkRodneCisloData,
  SkRodneCisloOptions,
  VehicleRegistrationOptions,
  AtVehicleRegistrationData,
  AtVehicleRegistrationOptions,
  BeVehicleRegistrationData,
  BeVehicleRegistrationOptions,
  BgVehicleRegistrationData,
  BgVehicleRegistrationOptions,
  CyVehicleRegistrationData,
  CyVehicleRegistrationOptions,
  CzVehicleRegistrationData,
  CzVehicleRegistrationOptions,
  DeVehicleRegistrationData,
  DeVehicleRegistrationOptions,
  DkVehicleRegistrationData,
  DkVehicleRegistrationOptions,
  EeVehicleRegistrationData,
  EeVehicleRegistrationOptions,
  EsVehicleRegistrationData,
  EsVehicleRegistrationOptions,
  FiVehicleRegistrationData,
  FiVehicleRegistrationOptions,
  FrVehicleRegistrationData,
  FrVehicleRegistrationOptions,
  GrVehicleRegistrationData,
  GrVehicleRegistrationOptions,
  HrVehicleRegistrationData,
  HrVehicleRegistrationOptions,
  HuVehicleRegistrationData,
  HuVehicleRegistrationOptions,
  IeVehicleRegistrationData,
  IeVehicleRegistrationOptions,
  ItVehicleRegistrationData,
  ItVehicleRegistrationOptions,
  LtVehicleRegistrationData,
  LtVehicleRegistrationOptions,
  LuVehicleRegistrationData,
  LuVehicleRegistrationOptions,
  LvVehicleRegistrationData,
  LvVehicleRegistrationOptions,
  MtVehicleRegistrationData,
  MtVehicleRegistrationOptions,
  NlVehicleRegistrationData,
  NlVehicleRegistrationOptions,
  PtVehicleRegistrationData,
  PtVehicleRegistrationOptions,
  RoVehicleRegistrationData,
  RoVehicleRegistrationOptions,
  SeVehicleRegistrationData,
  SeVehicleRegistrationOptions,
  SiVehicleRegistrationData,
  SiVehicleRegistrationOptions,
  SkVehicleRegistrationData,
  SkVehicleRegistrationOptions,
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
 * `email` method pair for every country (`deEmail`, `plEmail`, …). Every
 * country shares the same wire shape — only the name pools and regional /
 * corporate domains differ — so unlike `company-name`, Poland is not special.
 */
type EmailMethods = {
  [Country in CountryCode as `${Country}Email`]: (
    options?: EmailOptions,
  ) => Promise<EmailData>;
} & {
  [Country in CountryCode as `${Country}Emails`]: (
    count: number,
    options?: EmailOptions,
  ) => Promise<EmailData[]>;
};

/**
 * `offering` method pair for every country (`deOffering`, `plOffering`, …).
 * Every country shares the same wire shape — only the resolved language mix
 * differs — so like `email`, Poland is not special.
 */
type OfferingMethods = {
  [Country in CountryCode as `${Country}Offering`]: (
    options?: OfferingOptions,
  ) => Promise<OfferingData>;
} & {
  [Country in CountryCode as `${Country}Offerings`]: (
    count: number,
    options?: OfferingOptions,
  ) => Promise<OfferingData[]>;
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
  LocaleCompanyNameMethods &
  EmailMethods &
  OfferingMethods & {
    plPesel(options?: PeselOptions): Promise<PolishPeselData>;
    plPesels(count: number, options?: PeselOptions): Promise<PolishPeselData[]>;
    plPerson(options?: PersonOptions): Promise<PolishPersonData>;
    bePerson(options?: BePersonOptions): Promise<BePersonData>;
    bePeople(count: number, options?: BePersonOptions): Promise<BePersonData[]>;
    bgPerson(options?: BgPersonOptions): Promise<BgPersonData>;
    bgPeople(count: number, options?: BgPersonOptions): Promise<BgPersonData[]>;
    czPerson(options?: CzPersonOptions): Promise<CzPersonData>;
    czPeople(count: number, options?: CzPersonOptions): Promise<CzPersonData[]>;
    eePerson(options?: EePersonOptions): Promise<EePersonData>;
    eePeople(count: number, options?: EePersonOptions): Promise<EePersonData[]>;
    fiPerson(options?: FiPersonOptions): Promise<FiPersonData>;
    fiPeople(count: number, options?: FiPersonOptions): Promise<FiPersonData[]>;
    grPerson(options?: GrPersonOptions): Promise<GrPersonData>;
    grPeople(count: number, options?: GrPersonOptions): Promise<GrPersonData[]>;
    hrPerson(options?: HrPersonOptions): Promise<HrPersonData>;
    hrPeople(count: number, options?: HrPersonOptions): Promise<HrPersonData[]>;
    huPerson(options?: HuPersonOptions): Promise<HuPersonData>;
    huPeople(count: number, options?: HuPersonOptions): Promise<HuPersonData[]>;
    ltPerson(options?: LtPersonOptions): Promise<LtPersonData>;
    ltPeople(count: number, options?: LtPersonOptions): Promise<LtPersonData[]>;
    roPerson(options?: RoPersonOptions): Promise<RoPersonData>;
    roPeople(count: number, options?: RoPersonOptions): Promise<RoPersonData[]>;
    sePerson(options?: SePersonOptions): Promise<SePersonData>;
    sePeople(count: number, options?: SePersonOptions): Promise<SePersonData[]>;
    siPerson(options?: SiPersonOptions): Promise<SiPersonData>;
    siPeople(count: number, options?: SiPersonOptions): Promise<SiPersonData[]>;
    skPerson(options?: SkPersonOptions): Promise<SkPersonData>;
    skPeople(count: number, options?: SkPersonOptions): Promise<SkPersonData[]>;
    atPerson(options?: AtPersonOptions): Promise<AtPersonData>;
    atPeople(count: number, options?: AtPersonOptions): Promise<AtPersonData[]>;
    luPerson(options?: LuPersonOptions): Promise<LuPersonData>;
    luPeople(count: number, options?: LuPersonOptions): Promise<LuPersonData[]>;
    frPerson(options?: FrPersonOptions): Promise<FrPersonData>;
    frPeople(count: number, options?: FrPersonOptions): Promise<FrPersonData[]>;
    itPerson(options?: ItPersonOptions): Promise<ItPersonData>;
    itPeople(count: number, options?: ItPersonOptions): Promise<ItPersonData[]>;
    cyPerson(options?: CyPersonOptions): Promise<CyPersonData>;
    cyPeople(count: number, options?: CyPersonOptions): Promise<CyPersonData[]>;
    dePerson(options?: DePersonOptions): Promise<DePersonData>;
    dePeople(count: number, options?: DePersonOptions): Promise<DePersonData[]>;
    esPerson(options?: EsPersonOptions): Promise<EsPersonData>;
    esPeople(count: number, options?: EsPersonOptions): Promise<EsPersonData[]>;
    iePerson(options?: IePersonOptions): Promise<IePersonData>;
    iePeople(count: number, options?: IePersonOptions): Promise<IePersonData[]>;
    mtPerson(options?: MtPersonOptions): Promise<MtPersonData>;
    mtPeople(count: number, options?: MtPersonOptions): Promise<MtPersonData[]>;
    ptPerson(options?: PtPersonOptions): Promise<PtPersonData>;
    ptPeople(count: number, options?: PtPersonOptions): Promise<PtPersonData[]>;
    lvPerson(options?: LvPersonOptions): Promise<LvPersonData>;
    lvPeople(count: number, options?: LvPersonOptions): Promise<LvPersonData[]>;
    plPeople(count: number, options?: PersonOptions): Promise<PolishPersonData[]>;
    plAddress(options?: AddressOptions): Promise<PolishAddressData>;
    plAddresses(count: number, options?: AddressOptions): Promise<PolishAddressData[]>;
    plNip(options?: NipOptions): Promise<PolishNipData>;
    plNips(count: number, options?: NipOptions): Promise<PolishNipData[]>;
    plIban(options?: IbanOptions): Promise<PolishIbanData>;
    plIbans(count: number, options?: IbanOptions): Promise<PolishIbanData[]>;
    deIban(options?: IbanOptions): Promise<IbanData>;
    deIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    atIban(options?: IbanOptions): Promise<IbanData>;
    atIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    nlIban(options?: IbanOptions): Promise<IbanData>;
    nlIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    ieIban(options?: IbanOptions): Promise<IbanData>;
    ieIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    luIban(options?: IbanOptions): Promise<IbanData>;
    luIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    dkIban(options?: IbanOptions): Promise<IbanData>;
    dkIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    seIban(options?: IbanOptions): Promise<IbanData>;
    seIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    lvIban(options?: IbanOptions): Promise<IbanData>;
    lvIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    ltIban(options?: IbanOptions): Promise<IbanData>;
    ltIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    grIban(options?: IbanOptions): Promise<IbanData>;
    grIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    cyIban(options?: IbanOptions): Promise<IbanData>;
    cyIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    mtIban(options?: IbanOptions): Promise<IbanData>;
    mtIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    bgIban(options?: IbanOptions): Promise<IbanData>;
    bgIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    roIban(options?: IbanOptions): Promise<IbanData>;
    roIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    beIban(options?: IbanOptions): Promise<IbanData>;
    beIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    esIban(options?: IbanOptions): Promise<IbanData>;
    esIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    frIban(options?: IbanOptions): Promise<IbanData>;
    frIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    itIban(options?: IbanOptions): Promise<IbanData>;
    itIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    ptIban(options?: IbanOptions): Promise<IbanData>;
    ptIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    siIban(options?: IbanOptions): Promise<IbanData>;
    siIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    fiIban(options?: IbanOptions): Promise<IbanData>;
    fiIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    eeIban(options?: IbanOptions): Promise<IbanData>;
    eeIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    huIban(options?: IbanOptions): Promise<IbanData>;
    huIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    hrIban(options?: IbanOptions): Promise<IbanData>;
    hrIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    czIban(options?: IbanOptions): Promise<IbanData>;
    czIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    skIban(options?: IbanOptions): Promise<IbanData>;
    skIbans(count: number, options?: IbanOptions): Promise<IbanData[]>;
    plRegon(options?: RegonOptions): Promise<PolishRegonData>;
    plRegons(count: number, options?: RegonOptions): Promise<PolishRegonData[]>;
    plCompany(options?: CompanyOptions): Promise<PolishCompanyData>;
    plCompanies(count: number, options?: CompanyOptions): Promise<PolishCompanyData[]>;
    atCompany(options?: LocaleCompanyOptions): Promise<AtCompanyData>;
    atCompanies(count: number, options?: LocaleCompanyOptions): Promise<AtCompanyData[]>;
    beCompany(options?: LocaleCompanyOptions): Promise<BeCompanyData>;
    beCompanies(count: number, options?: LocaleCompanyOptions): Promise<BeCompanyData[]>;
    bgCompany(options?: LocaleCompanyOptions): Promise<BgCompanyData>;
    bgCompanies(count: number, options?: LocaleCompanyOptions): Promise<BgCompanyData[]>;
    cyCompany(options?: LocaleCompanyOptions): Promise<CyCompanyData>;
    cyCompanies(count: number, options?: LocaleCompanyOptions): Promise<CyCompanyData[]>;
    czCompany(options?: LocaleCompanyOptions): Promise<CzCompanyData>;
    czCompanies(count: number, options?: LocaleCompanyOptions): Promise<CzCompanyData[]>;
    deCompany(options?: LocaleCompanyOptions): Promise<DeCompanyData>;
    deCompanies(count: number, options?: LocaleCompanyOptions): Promise<DeCompanyData[]>;
    dkCompany(options?: LocaleCompanyOptions): Promise<DkCompanyData>;
    dkCompanies(count: number, options?: LocaleCompanyOptions): Promise<DkCompanyData[]>;
    eeCompany(options?: LocaleCompanyOptions): Promise<EeCompanyData>;
    eeCompanies(count: number, options?: LocaleCompanyOptions): Promise<EeCompanyData[]>;
    esCompany(options?: LocaleCompanyOptions): Promise<EsCompanyData>;
    esCompanies(count: number, options?: LocaleCompanyOptions): Promise<EsCompanyData[]>;
    fiCompany(options?: LocaleCompanyOptions): Promise<FiCompanyData>;
    fiCompanies(count: number, options?: LocaleCompanyOptions): Promise<FiCompanyData[]>;
    frCompany(options?: LocaleCompanyOptions): Promise<FrCompanyData>;
    frCompanies(count: number, options?: LocaleCompanyOptions): Promise<FrCompanyData[]>;
    grCompany(options?: LocaleCompanyOptions): Promise<GrCompanyData>;
    grCompanies(count: number, options?: LocaleCompanyOptions): Promise<GrCompanyData[]>;
    hrCompany(options?: LocaleCompanyOptions): Promise<HrCompanyData>;
    hrCompanies(count: number, options?: LocaleCompanyOptions): Promise<HrCompanyData[]>;
    huCompany(options?: LocaleCompanyOptions): Promise<HuCompanyData>;
    huCompanies(count: number, options?: LocaleCompanyOptions): Promise<HuCompanyData[]>;
    ieCompany(options?: LocaleCompanyOptions): Promise<IeCompanyData>;
    ieCompanies(count: number, options?: LocaleCompanyOptions): Promise<IeCompanyData[]>;
    itCompany(options?: LocaleCompanyOptions): Promise<ItCompanyData>;
    itCompanies(count: number, options?: LocaleCompanyOptions): Promise<ItCompanyData[]>;
    ltCompany(options?: LocaleCompanyOptions): Promise<LtCompanyData>;
    ltCompanies(count: number, options?: LocaleCompanyOptions): Promise<LtCompanyData[]>;
    luCompany(options?: LocaleCompanyOptions): Promise<LuCompanyData>;
    luCompanies(count: number, options?: LocaleCompanyOptions): Promise<LuCompanyData[]>;
    lvCompany(options?: LocaleCompanyOptions): Promise<LvCompanyData>;
    lvCompanies(count: number, options?: LocaleCompanyOptions): Promise<LvCompanyData[]>;
    mtCompany(options?: LocaleCompanyOptions): Promise<MtCompanyData>;
    mtCompanies(count: number, options?: LocaleCompanyOptions): Promise<MtCompanyData[]>;
    nlCompany(options?: LocaleCompanyOptions): Promise<NlCompanyData>;
    nlCompanies(count: number, options?: LocaleCompanyOptions): Promise<NlCompanyData[]>;
    ptCompany(options?: LocaleCompanyOptions): Promise<PtCompanyData>;
    ptCompanies(count: number, options?: LocaleCompanyOptions): Promise<PtCompanyData[]>;
    roCompany(options?: LocaleCompanyOptions): Promise<RoCompanyData>;
    roCompanies(count: number, options?: LocaleCompanyOptions): Promise<RoCompanyData[]>;
    seCompany(options?: LocaleCompanyOptions): Promise<SeCompanyData>;
    seCompanies(count: number, options?: LocaleCompanyOptions): Promise<SeCompanyData[]>;
    siCompany(options?: LocaleCompanyOptions): Promise<SiCompanyData>;
    siCompanies(count: number, options?: LocaleCompanyOptions): Promise<SiCompanyData[]>;
    skCompany(options?: LocaleCompanyOptions): Promise<SkCompanyData>;
    skCompanies(count: number, options?: LocaleCompanyOptions): Promise<SkCompanyData[]>;
    plCompanyName(options?: CompanyNameOptions): Promise<PolishCompanyNameData>;
    plCompanyNames(count: number, options?: CompanyNameOptions): Promise<PolishCompanyNameData[]>;
    plVehicleRegistration(
      options?: VehicleRegistrationOptions,
    ): Promise<PolishVehicleRegistrationData>;
    plVehicleRegistrations(
      count: number,
      options?: VehicleRegistrationOptions,
    ): Promise<PolishVehicleRegistrationData[]>;
    atVehicleRegistration(
      options?: AtVehicleRegistrationOptions,
    ): Promise<AtVehicleRegistrationData>;
    atVehicleRegistrations(
      count: number,
      options?: AtVehicleRegistrationOptions,
    ): Promise<AtVehicleRegistrationData[]>;
    beVehicleRegistration(
      options?: BeVehicleRegistrationOptions,
    ): Promise<BeVehicleRegistrationData>;
    beVehicleRegistrations(
      count: number,
      options?: BeVehicleRegistrationOptions,
    ): Promise<BeVehicleRegistrationData[]>;
    bgVehicleRegistration(
      options?: BgVehicleRegistrationOptions,
    ): Promise<BgVehicleRegistrationData>;
    bgVehicleRegistrations(
      count: number,
      options?: BgVehicleRegistrationOptions,
    ): Promise<BgVehicleRegistrationData[]>;
    cyVehicleRegistration(
      options?: CyVehicleRegistrationOptions,
    ): Promise<CyVehicleRegistrationData>;
    cyVehicleRegistrations(
      count: number,
      options?: CyVehicleRegistrationOptions,
    ): Promise<CyVehicleRegistrationData[]>;
    czVehicleRegistration(
      options?: CzVehicleRegistrationOptions,
    ): Promise<CzVehicleRegistrationData>;
    czVehicleRegistrations(
      count: number,
      options?: CzVehicleRegistrationOptions,
    ): Promise<CzVehicleRegistrationData[]>;
    deVehicleRegistration(
      options?: DeVehicleRegistrationOptions,
    ): Promise<DeVehicleRegistrationData>;
    deVehicleRegistrations(
      count: number,
      options?: DeVehicleRegistrationOptions,
    ): Promise<DeVehicleRegistrationData[]>;
    dkVehicleRegistration(
      options?: DkVehicleRegistrationOptions,
    ): Promise<DkVehicleRegistrationData>;
    dkVehicleRegistrations(
      count: number,
      options?: DkVehicleRegistrationOptions,
    ): Promise<DkVehicleRegistrationData[]>;
    eeVehicleRegistration(
      options?: EeVehicleRegistrationOptions,
    ): Promise<EeVehicleRegistrationData>;
    eeVehicleRegistrations(
      count: number,
      options?: EeVehicleRegistrationOptions,
    ): Promise<EeVehicleRegistrationData[]>;
    esVehicleRegistration(
      options?: EsVehicleRegistrationOptions,
    ): Promise<EsVehicleRegistrationData>;
    esVehicleRegistrations(
      count: number,
      options?: EsVehicleRegistrationOptions,
    ): Promise<EsVehicleRegistrationData[]>;
    fiVehicleRegistration(
      options?: FiVehicleRegistrationOptions,
    ): Promise<FiVehicleRegistrationData>;
    fiVehicleRegistrations(
      count: number,
      options?: FiVehicleRegistrationOptions,
    ): Promise<FiVehicleRegistrationData[]>;
    frVehicleRegistration(
      options?: FrVehicleRegistrationOptions,
    ): Promise<FrVehicleRegistrationData>;
    frVehicleRegistrations(
      count: number,
      options?: FrVehicleRegistrationOptions,
    ): Promise<FrVehicleRegistrationData[]>;
    grVehicleRegistration(
      options?: GrVehicleRegistrationOptions,
    ): Promise<GrVehicleRegistrationData>;
    grVehicleRegistrations(
      count: number,
      options?: GrVehicleRegistrationOptions,
    ): Promise<GrVehicleRegistrationData[]>;
    hrVehicleRegistration(
      options?: HrVehicleRegistrationOptions,
    ): Promise<HrVehicleRegistrationData>;
    hrVehicleRegistrations(
      count: number,
      options?: HrVehicleRegistrationOptions,
    ): Promise<HrVehicleRegistrationData[]>;
    huVehicleRegistration(
      options?: HuVehicleRegistrationOptions,
    ): Promise<HuVehicleRegistrationData>;
    huVehicleRegistrations(
      count: number,
      options?: HuVehicleRegistrationOptions,
    ): Promise<HuVehicleRegistrationData[]>;
    ieVehicleRegistration(
      options?: IeVehicleRegistrationOptions,
    ): Promise<IeVehicleRegistrationData>;
    ieVehicleRegistrations(
      count: number,
      options?: IeVehicleRegistrationOptions,
    ): Promise<IeVehicleRegistrationData[]>;
    itVehicleRegistration(
      options?: ItVehicleRegistrationOptions,
    ): Promise<ItVehicleRegistrationData>;
    itVehicleRegistrations(
      count: number,
      options?: ItVehicleRegistrationOptions,
    ): Promise<ItVehicleRegistrationData[]>;
    ltVehicleRegistration(
      options?: LtVehicleRegistrationOptions,
    ): Promise<LtVehicleRegistrationData>;
    ltVehicleRegistrations(
      count: number,
      options?: LtVehicleRegistrationOptions,
    ): Promise<LtVehicleRegistrationData[]>;
    luVehicleRegistration(
      options?: LuVehicleRegistrationOptions,
    ): Promise<LuVehicleRegistrationData>;
    luVehicleRegistrations(
      count: number,
      options?: LuVehicleRegistrationOptions,
    ): Promise<LuVehicleRegistrationData[]>;
    lvVehicleRegistration(
      options?: LvVehicleRegistrationOptions,
    ): Promise<LvVehicleRegistrationData>;
    lvVehicleRegistrations(
      count: number,
      options?: LvVehicleRegistrationOptions,
    ): Promise<LvVehicleRegistrationData[]>;
    mtVehicleRegistration(
      options?: MtVehicleRegistrationOptions,
    ): Promise<MtVehicleRegistrationData>;
    mtVehicleRegistrations(
      count: number,
      options?: MtVehicleRegistrationOptions,
    ): Promise<MtVehicleRegistrationData[]>;
    nlVehicleRegistration(
      options?: NlVehicleRegistrationOptions,
    ): Promise<NlVehicleRegistrationData>;
    nlVehicleRegistrations(
      count: number,
      options?: NlVehicleRegistrationOptions,
    ): Promise<NlVehicleRegistrationData[]>;
    ptVehicleRegistration(
      options?: PtVehicleRegistrationOptions,
    ): Promise<PtVehicleRegistrationData>;
    ptVehicleRegistrations(
      count: number,
      options?: PtVehicleRegistrationOptions,
    ): Promise<PtVehicleRegistrationData[]>;
    roVehicleRegistration(
      options?: RoVehicleRegistrationOptions,
    ): Promise<RoVehicleRegistrationData>;
    roVehicleRegistrations(
      count: number,
      options?: RoVehicleRegistrationOptions,
    ): Promise<RoVehicleRegistrationData[]>;
    seVehicleRegistration(
      options?: SeVehicleRegistrationOptions,
    ): Promise<SeVehicleRegistrationData>;
    seVehicleRegistrations(
      count: number,
      options?: SeVehicleRegistrationOptions,
    ): Promise<SeVehicleRegistrationData[]>;
    siVehicleRegistration(
      options?: SiVehicleRegistrationOptions,
    ): Promise<SiVehicleRegistrationData>;
    siVehicleRegistrations(
      count: number,
      options?: SiVehicleRegistrationOptions,
    ): Promise<SiVehicleRegistrationData[]>;
    skVehicleRegistration(
      options?: SkVehicleRegistrationOptions,
    ): Promise<SkVehicleRegistrationData>;
    skVehicleRegistrations(
      count: number,
      options?: SkVehicleRegistrationOptions,
    ): Promise<SkVehicleRegistrationData[]>;
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
    email(options?: AnyEmailOptions): Promise<AnyEmailData>;
    emails(count: number, options?: AnyEmailOptions): Promise<AnyEmailData[]>;
    /** Multi-country offering: each record is drawn from one of `countries` (default: all 27). */
    offering(options?: AnyOfferingOptions): Promise<AnyOfferingData>;
    offerings(count: number, options?: AnyOfferingOptions): Promise<AnyOfferingData[]>;
    lorem(options?: LoremOptions): Promise<LoremData>;
    lorems(count: number, options?: LoremOptions): Promise<LoremData[]>;
    /** Random string matching a supplied regex `pattern`. Requires the Pro plan or above. */
    customRegex(options: CustomRegexOptions): Promise<CustomRegexData>;
    customRegexes(count: number, options: CustomRegexOptions): Promise<CustomRegexData[]>;
    /** UUID — `version: '4'` (random, default) or `'7'` (time-ordered). */
    uuid(options?: UuidOptions): Promise<UuidData>;
    uuids(count: number, options?: UuidOptions): Promise<UuidData[]>;
    /** ULID — 26-character Crockford-Base32 identifier. */
    ulid(options?: UlidOptions): Promise<UlidData>;
    ulids(count: number, options?: UlidOptions): Promise<UlidData[]>;
    /** Nano ID — compact URL-safe id; set `size` and a custom `alphabet`. */
    nanoId(options?: NanoIdOptions): Promise<NanoIdData>;
    nanoIds(count: number, options?: NanoIdOptions): Promise<NanoIdData[]>;
    /** MongoDB ObjectId — 24-character hex. */
    objectId(options?: ObjectIdOptions): Promise<ObjectIdData>;
    objectIds(count: number, options?: ObjectIdOptions): Promise<ObjectIdData[]>;
    /** Auto-increment integer — `start` (default 1), `step` (default 1); a batch returns the run. */
    sequence(options?: SequenceOptions): Promise<SequenceData>;
    sequences(count: number, options?: SequenceOptions): Promise<SequenceData[]>;
    /* EU national-identifier generators (see types.ts). One pair per number. */
    frSiren(options?: FrSirenOptions): Promise<FrSirenData>;
    frSirens(count: number, options?: FrSirenOptions): Promise<FrSirenData[]>;
    frNir(options?: FrNirOptions): Promise<FrNirData>;
    frNirs(count: number, options?: FrNirOptions): Promise<FrNirData[]>;
    atSvnr(options?: AtSvnrOptions): Promise<AtSvnrData>;
    atSvnrs(count: number, options?: AtSvnrOptions): Promise<AtSvnrData[]>;
    atUid(options?: AtUidOptions): Promise<AtUidData>;
    atUids(count: number, options?: AtUidOptions): Promise<AtUidData[]>;
    atFirmenbuchnummer(options?: AtFirmenbuchnummerOptions): Promise<AtFirmenbuchnummerData>;
    atFirmenbuchnummers(count: number, options?: AtFirmenbuchnummerOptions): Promise<AtFirmenbuchnummerData[]>;
    atSteuernummer(options?: AtSteuernummerOptions): Promise<AtSteuernummerData>;
    atSteuernummers(count: number, options?: AtSteuernummerOptions): Promise<AtSteuernummerData[]>;
    beRijksregisternummer(options?: BeRijksregisternummerOptions): Promise<BeRijksregisternummerData>;
    beRijksregisternummers(count: number, options?: BeRijksregisternummerOptions): Promise<BeRijksregisternummerData[]>;
    beOndernemingsnummer(options?: BeOndernemingsnummerOptions): Promise<BeOndernemingsnummerData>;
    beOndernemingsnummers(count: number, options?: BeOndernemingsnummerOptions): Promise<BeOndernemingsnummerData[]>;
    bgEgn(options?: BgEgnOptions): Promise<BgEgnData>;
    bgEgns(count: number, options?: BgEgnOptions): Promise<BgEgnData[]>;
    bgEik(options?: BgEikOptions): Promise<BgEikData>;
    bgEiks(count: number, options?: BgEikOptions): Promise<BgEikData[]>;
    hrOib(options?: HrOibOptions): Promise<HrOibData>;
    hrOibs(count: number, options?: HrOibOptions): Promise<HrOibData[]>;
    hrJmbg(options?: HrJmbgOptions): Promise<HrJmbgData>;
    hrJmbgs(count: number, options?: HrJmbgOptions): Promise<HrJmbgData[]>;
    cyTic(options?: CyTicOptions): Promise<CyTicData>;
    cyTics(count: number, options?: CyTicOptions): Promise<CyTicData[]>;
    czRodneCislo(options?: CzRodneCisloOptions): Promise<CzRodneCisloData>;
    czRodneCislos(count: number, options?: CzRodneCisloOptions): Promise<CzRodneCisloData[]>;
    czIco(options?: CzIcoOptions): Promise<CzIcoData>;
    czIcos(count: number, options?: CzIcoOptions): Promise<CzIcoData[]>;
    dkCpr(options?: DkCprOptions): Promise<DkCprData>;
    dkCprs(count: number, options?: DkCprOptions): Promise<DkCprData[]>;
    dkPerson(options?: DkPersonOptions): Promise<DkPersonData>;
    dkPeople(count: number, options?: DkPersonOptions): Promise<DkPersonData[]>;
    dkCvr(options?: DkCvrOptions): Promise<DkCvrData>;
    dkCvrs(count: number, options?: DkCvrOptions): Promise<DkCvrData[]>;
    eeIsikukood(options?: EeIsikukoodOptions): Promise<EeIsikukoodData>;
    eeIsikukoods(count: number, options?: EeIsikukoodOptions): Promise<EeIsikukoodData[]>;
    eeRegistrikood(options?: EeRegistrikoodOptions): Promise<EeRegistrikoodData>;
    eeRegistrikoods(count: number, options?: EeRegistrikoodOptions): Promise<EeRegistrikoodData[]>;
    eeKmkr(options?: EeKmkrOptions): Promise<EeKmkrData>;
    eeKmkrs(count: number, options?: EeKmkrOptions): Promise<EeKmkrData[]>;
    fiHenkilotunnus(options?: FiHenkilotunnusOptions): Promise<FiHenkilotunnusData>;
    fiHenkilotunnuss(count: number, options?: FiHenkilotunnusOptions): Promise<FiHenkilotunnusData[]>;
    fiYTunnus(options?: FiYTunnusOptions): Promise<FiYTunnusData>;
    fiYTunnuss(count: number, options?: FiYTunnusOptions): Promise<FiYTunnusData[]>;
    deSteuerId(options?: DeSteuerIdOptions): Promise<DeSteuerIdData>;
    deSteuerIds(count: number, options?: DeSteuerIdOptions): Promise<DeSteuerIdData[]>;
    deUstIdnr(options?: DeUstIdnrOptions): Promise<DeUstIdnrData>;
    deUstIdnrs(count: number, options?: DeUstIdnrOptions): Promise<DeUstIdnrData[]>;
    deHandelsregisternummer(options?: DeHandelsregisternummerOptions): Promise<DeHandelsregisternummerData>;
    deHandelsregisternummers(count: number, options?: DeHandelsregisternummerOptions): Promise<DeHandelsregisternummerData[]>;
    deWirtschaftsIdnr(options?: DeWirtschaftsIdnrOptions): Promise<DeWirtschaftsIdnrData>;
    deWirtschaftsIdnrs(count: number, options?: DeWirtschaftsIdnrOptions): Promise<DeWirtschaftsIdnrData[]>;
    dePersonalausweis(options?: DePersonalausweisOptions): Promise<DePersonalausweisData>;
    dePersonalausweiss(count: number, options?: DePersonalausweisOptions): Promise<DePersonalausweisData[]>;
    grAmka(options?: GrAmkaOptions): Promise<GrAmkaData>;
    grAmkas(count: number, options?: GrAmkaOptions): Promise<GrAmkaData[]>;
    grAfm(options?: GrAfmOptions): Promise<GrAfmData>;
    grAfms(count: number, options?: GrAfmOptions): Promise<GrAfmData[]>;
    huAdoazonositoJel(options?: HuAdoazonositoJelOptions): Promise<HuAdoazonositoJelData>;
    huAdoazonositoJels(count: number, options?: HuAdoazonositoJelOptions): Promise<HuAdoazonositoJelData[]>;
    huTaj(options?: HuTajOptions): Promise<HuTajData>;
    huTajs(count: number, options?: HuTajOptions): Promise<HuTajData[]>;
    huSzemelyiAzonosito(options?: HuSzemelyiAzonositoOptions): Promise<HuSzemelyiAzonositoData>;
    huSzemelyiAzonositos(count: number, options?: HuSzemelyiAzonositoOptions): Promise<HuSzemelyiAzonositoData[]>;
    huAdoszam(options?: HuAdoszamOptions): Promise<HuAdoszamData>;
    huAdoszams(count: number, options?: HuAdoszamOptions): Promise<HuAdoszamData[]>;
    huCegjegyzekszam(options?: HuCegjegyzekszamOptions): Promise<HuCegjegyzekszamData>;
    huCegjegyzekszams(count: number, options?: HuCegjegyzekszamOptions): Promise<HuCegjegyzekszamData[]>;
    iePpsn(options?: IePpsnOptions): Promise<IePpsnData>;
    iePpsns(count: number, options?: IePpsnOptions): Promise<IePpsnData[]>;
    ieVat(options?: IeVatOptions): Promise<IeVatData>;
    ieVats(count: number, options?: IeVatOptions): Promise<IeVatData[]>;
    ieCro(options?: IeCroOptions): Promise<IeCroData>;
    ieCros(count: number, options?: IeCroOptions): Promise<IeCroData[]>;
    itCodiceFiscale(options?: ItCodiceFiscaleOptions): Promise<ItCodiceFiscaleData>;
    itCodiceFiscales(count: number, options?: ItCodiceFiscaleOptions): Promise<ItCodiceFiscaleData[]>;
    itPartitaIva(options?: ItPartitaIvaOptions): Promise<ItPartitaIvaData>;
    itPartitaIvas(count: number, options?: ItPartitaIvaOptions): Promise<ItPartitaIvaData[]>;
    lvPersonasKods(options?: LvPersonasKodsOptions): Promise<LvPersonasKodsData>;
    lvPersonasKodss(count: number, options?: LvPersonasKodsOptions): Promise<LvPersonasKodsData[]>;
    lvRegistracijasNumurs(options?: LvRegistracijasNumursOptions): Promise<LvRegistracijasNumursData>;
    lvRegistracijasNumurss(count: number, options?: LvRegistracijasNumursOptions): Promise<LvRegistracijasNumursData[]>;
    ltAsmensKodas(options?: LtAsmensKodasOptions): Promise<LtAsmensKodasData>;
    ltAsmensKodass(count: number, options?: LtAsmensKodasOptions): Promise<LtAsmensKodasData[]>;
    ltImonesKodas(options?: LtImonesKodasOptions): Promise<LtImonesKodasData>;
    ltImonesKodass(count: number, options?: LtImonesKodasOptions): Promise<LtImonesKodasData[]>;
    ltPvm(options?: LtPvmOptions): Promise<LtPvmData>;
    ltPvms(count: number, options?: LtPvmOptions): Promise<LtPvmData[]>;
    luMatricule(options?: LuMatriculeOptions): Promise<LuMatriculeData>;
    luMatricules(count: number, options?: LuMatriculeOptions): Promise<LuMatriculeData[]>;
    luTva(options?: LuTvaOptions): Promise<LuTvaData>;
    luTvas(count: number, options?: LuTvaOptions): Promise<LuTvaData[]>;
    mtIdCard(options?: MtIdCardOptions): Promise<MtIdCardData>;
    mtIdCards(count: number, options?: MtIdCardOptions): Promise<MtIdCardData[]>;
    mtVat(options?: MtVatOptions): Promise<MtVatData>;
    mtVats(count: number, options?: MtVatOptions): Promise<MtVatData[]>;
    nlBsn(options?: NlBsnOptions): Promise<NlBsnData>;
    nlBsns(count: number, options?: NlBsnOptions): Promise<NlBsnData[]>;
    nlPerson(options?: NlPersonOptions): Promise<NlPersonData>;
    nlPeople(count: number, options?: NlPersonOptions): Promise<NlPersonData[]>;
    nlRsin(options?: NlRsinOptions): Promise<NlRsinData>;
    nlRsins(count: number, options?: NlRsinOptions): Promise<NlRsinData[]>;
    nlBtwId(options?: NlBtwIdOptions): Promise<NlBtwIdData>;
    nlBtwIds(count: number, options?: NlBtwIdOptions): Promise<NlBtwIdData[]>;
    nlKvk(options?: NlKvkOptions): Promise<NlKvkData>;
    nlKvks(count: number, options?: NlKvkOptions): Promise<NlKvkData[]>;
    ptNif(options?: PtNifOptions): Promise<PtNifData>;
    ptNifs(count: number, options?: PtNifOptions): Promise<PtNifData[]>;
    ptCartaoCidadao(options?: PtCartaoCidadaoOptions): Promise<PtCartaoCidadaoData>;
    ptCartaoCidadaos(count: number, options?: PtCartaoCidadaoOptions): Promise<PtCartaoCidadaoData[]>;
    roCnp(options?: RoCnpOptions): Promise<RoCnpData>;
    roCnps(count: number, options?: RoCnpOptions): Promise<RoCnpData[]>;
    roCui(options?: RoCuiOptions): Promise<RoCuiData>;
    roCuis(count: number, options?: RoCuiOptions): Promise<RoCuiData[]>;
    skRodneCislo(options?: SkRodneCisloOptions): Promise<SkRodneCisloData>;
    skRodneCislos(count: number, options?: SkRodneCisloOptions): Promise<SkRodneCisloData[]>;
    skIco(options?: SkIcoOptions): Promise<SkIcoData>;
    skIcos(count: number, options?: SkIcoOptions): Promise<SkIcoData[]>;
    skIcDph(options?: SkIcDphOptions): Promise<SkIcDphData>;
    skIcDphs(count: number, options?: SkIcDphOptions): Promise<SkIcDphData[]>;
    siEmso(options?: SiEmsoOptions): Promise<SiEmsoData>;
    siEmsos(count: number, options?: SiEmsoOptions): Promise<SiEmsoData[]>;
    siDavcnaStevilka(options?: SiDavcnaStevilkaOptions): Promise<SiDavcnaStevilkaData>;
    siDavcnaStevilkas(count: number, options?: SiDavcnaStevilkaOptions): Promise<SiDavcnaStevilkaData[]>;
    esDni(options?: EsDniOptions): Promise<EsDniData>;
    esDnis(count: number, options?: EsDniOptions): Promise<EsDniData[]>;
    esNie(options?: EsNieOptions): Promise<EsNieData>;
    esNies(count: number, options?: EsNieOptions): Promise<EsNieData[]>;
    esCif(options?: EsCifOptions): Promise<EsCifData>;
    esCifs(count: number, options?: EsCifOptions): Promise<EsCifData[]>;
    sePersonnummer(options?: SePersonnummerOptions): Promise<SePersonnummerData>;
    sePersonnummers(count: number, options?: SePersonnummerOptions): Promise<SePersonnummerData[]>;
    seOrganisationsnummer(options?: SeOrganisationsnummerOptions): Promise<SeOrganisationsnummerData>;
    seOrganisationsnummers(count: number, options?: SeOrganisationsnummerOptions): Promise<SeOrganisationsnummerData[]>;
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
  aggregateOptions: AnyPersonNameOptions | AnyCompanyNameOptions | AnyOfferingOptions,
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

  const emailPair = <Country extends CountryCode>(
    countryCode: Country,
  ): Pick<EmailMethods, `${Country}Email` | `${Country}Emails`> =>
    ({
      [`${countryCode}Email`]: async (emailOptions: EmailOptions = {}) =>
        await run<EmailData>(`${countryCode}/email`, emailOptions),
      [`${countryCode}Emails`]: async (count: number, emailOptions: EmailOptions = {}) =>
        await runMany<EmailData>(`${countryCode}/email`, count, emailOptions),
    }) as Pick<EmailMethods, `${Country}Email` | `${Country}Emails`>;

  const offeringPair = <Country extends CountryCode>(
    countryCode: Country,
  ): Pick<OfferingMethods, `${Country}Offering` | `${Country}Offerings`> =>
    ({
      [`${countryCode}Offering`]: async (offeringOptions: OfferingOptions = {}) =>
        await run<OfferingData>(`${countryCode}/offering`, offeringOptions),
      [`${countryCode}Offerings`]: async (count: number, offeringOptions: OfferingOptions = {}) =>
        await runMany<OfferingData>(`${countryCode}/offering`, count, offeringOptions),
    }) as Pick<OfferingMethods, `${Country}Offering` | `${Country}Offerings`>;

  return {
    plPesel: async (peselOptions = {}) => await run<PolishPeselData>('pl/pesel', peselOptions),
    plPesels: async (count, peselOptions = {}) =>
      await runMany<PolishPeselData>('pl/pesel', count, peselOptions),
    plPerson: async (personOptions = {}) => await run<PolishPersonData>('pl/person', personOptions),
    bePerson: async (personOptions = {}) => await run<BePersonData>('be/person', personOptions),
    bePeople: async (count, personOptions = {}) =>
      await runMany<BePersonData>('be/person', count, personOptions),
    bgPerson: async (personOptions = {}) => await run<BgPersonData>('bg/person', personOptions),
    bgPeople: async (count, personOptions = {}) =>
      await runMany<BgPersonData>('bg/person', count, personOptions),
    czPerson: async (personOptions = {}) => await run<CzPersonData>('cz/person', personOptions),
    czPeople: async (count, personOptions = {}) =>
      await runMany<CzPersonData>('cz/person', count, personOptions),
    eePerson: async (personOptions = {}) => await run<EePersonData>('ee/person', personOptions),
    eePeople: async (count, personOptions = {}) =>
      await runMany<EePersonData>('ee/person', count, personOptions),
    fiPerson: async (personOptions = {}) => await run<FiPersonData>('fi/person', personOptions),
    fiPeople: async (count, personOptions = {}) =>
      await runMany<FiPersonData>('fi/person', count, personOptions),
    grPerson: async (personOptions = {}) => await run<GrPersonData>('gr/person', personOptions),
    grPeople: async (count, personOptions = {}) =>
      await runMany<GrPersonData>('gr/person', count, personOptions),
    hrPerson: async (personOptions = {}) => await run<HrPersonData>('hr/person', personOptions),
    hrPeople: async (count, personOptions = {}) =>
      await runMany<HrPersonData>('hr/person', count, personOptions),
    huPerson: async (personOptions = {}) => await run<HuPersonData>('hu/person', personOptions),
    huPeople: async (count, personOptions = {}) =>
      await runMany<HuPersonData>('hu/person', count, personOptions),
    ltPerson: async (personOptions = {}) => await run<LtPersonData>('lt/person', personOptions),
    ltPeople: async (count, personOptions = {}) =>
      await runMany<LtPersonData>('lt/person', count, personOptions),
    roPerson: async (personOptions = {}) => await run<RoPersonData>('ro/person', personOptions),
    roPeople: async (count, personOptions = {}) =>
      await runMany<RoPersonData>('ro/person', count, personOptions),
    sePerson: async (personOptions = {}) => await run<SePersonData>('se/person', personOptions),
    sePeople: async (count, personOptions = {}) =>
      await runMany<SePersonData>('se/person', count, personOptions),
    siPerson: async (personOptions = {}) => await run<SiPersonData>('si/person', personOptions),
    siPeople: async (count, personOptions = {}) =>
      await runMany<SiPersonData>('si/person', count, personOptions),
    skPerson: async (personOptions = {}) => await run<SkPersonData>('sk/person', personOptions),
    skPeople: async (count, personOptions = {}) =>
      await runMany<SkPersonData>('sk/person', count, personOptions),
    atPerson: async (personOptions = {}) => await run<AtPersonData>('at/person', personOptions),
    atPeople: async (count, personOptions = {}) =>
      await runMany<AtPersonData>('at/person', count, personOptions),
    luPerson: async (personOptions = {}) => await run<LuPersonData>('lu/person', personOptions),
    luPeople: async (count, personOptions = {}) =>
      await runMany<LuPersonData>('lu/person', count, personOptions),
    frPerson: async (personOptions = {}) => await run<FrPersonData>('fr/person', personOptions),
    frPeople: async (count, personOptions = {}) =>
      await runMany<FrPersonData>('fr/person', count, personOptions),
    itPerson: async (personOptions = {}) => await run<ItPersonData>('it/person', personOptions),
    itPeople: async (count, personOptions = {}) =>
      await runMany<ItPersonData>('it/person', count, personOptions),
    cyPerson: async (personOptions = {}) => await run<CyPersonData>('cy/person', personOptions),
    cyPeople: async (count, personOptions = {}) =>
      await runMany<CyPersonData>('cy/person', count, personOptions),
    dePerson: async (personOptions = {}) => await run<DePersonData>('de/person', personOptions),
    dePeople: async (count, personOptions = {}) =>
      await runMany<DePersonData>('de/person', count, personOptions),
    esPerson: async (personOptions = {}) => await run<EsPersonData>('es/person', personOptions),
    esPeople: async (count, personOptions = {}) =>
      await runMany<EsPersonData>('es/person', count, personOptions),
    iePerson: async (personOptions = {}) => await run<IePersonData>('ie/person', personOptions),
    iePeople: async (count, personOptions = {}) =>
      await runMany<IePersonData>('ie/person', count, personOptions),
    mtPerson: async (personOptions = {}) => await run<MtPersonData>('mt/person', personOptions),
    mtPeople: async (count, personOptions = {}) =>
      await runMany<MtPersonData>('mt/person', count, personOptions),
    ptPerson: async (personOptions = {}) => await run<PtPersonData>('pt/person', personOptions),
    ptPeople: async (count, personOptions = {}) =>
      await runMany<PtPersonData>('pt/person', count, personOptions),
    lvPerson: async (personOptions = {}) => await run<LvPersonData>('lv/person', personOptions),
    lvPeople: async (count, personOptions = {}) =>
      await runMany<LvPersonData>('lv/person', count, personOptions),
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
    deIban: async (ibanOptions = {}) => await run<IbanData>('de/iban', ibanOptions),
    deIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('de/iban', count, ibanOptions),
    atIban: async (ibanOptions = {}) => await run<IbanData>('at/iban', ibanOptions),
    atIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('at/iban', count, ibanOptions),
    nlIban: async (ibanOptions = {}) => await run<IbanData>('nl/iban', ibanOptions),
    nlIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('nl/iban', count, ibanOptions),
    ieIban: async (ibanOptions = {}) => await run<IbanData>('ie/iban', ibanOptions),
    ieIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('ie/iban', count, ibanOptions),
    luIban: async (ibanOptions = {}) => await run<IbanData>('lu/iban', ibanOptions),
    luIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('lu/iban', count, ibanOptions),
    dkIban: async (ibanOptions = {}) => await run<IbanData>('dk/iban', ibanOptions),
    dkIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('dk/iban', count, ibanOptions),
    seIban: async (ibanOptions = {}) => await run<IbanData>('se/iban', ibanOptions),
    seIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('se/iban', count, ibanOptions),
    lvIban: async (ibanOptions = {}) => await run<IbanData>('lv/iban', ibanOptions),
    lvIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('lv/iban', count, ibanOptions),
    ltIban: async (ibanOptions = {}) => await run<IbanData>('lt/iban', ibanOptions),
    ltIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('lt/iban', count, ibanOptions),
    grIban: async (ibanOptions = {}) => await run<IbanData>('gr/iban', ibanOptions),
    grIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('gr/iban', count, ibanOptions),
    cyIban: async (ibanOptions = {}) => await run<IbanData>('cy/iban', ibanOptions),
    cyIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('cy/iban', count, ibanOptions),
    mtIban: async (ibanOptions = {}) => await run<IbanData>('mt/iban', ibanOptions),
    mtIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('mt/iban', count, ibanOptions),
    bgIban: async (ibanOptions = {}) => await run<IbanData>('bg/iban', ibanOptions),
    bgIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('bg/iban', count, ibanOptions),
    roIban: async (ibanOptions = {}) => await run<IbanData>('ro/iban', ibanOptions),
    roIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('ro/iban', count, ibanOptions),
    beIban: async (ibanOptions = {}) => await run<IbanData>('be/iban', ibanOptions),
    beIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('be/iban', count, ibanOptions),
    esIban: async (ibanOptions = {}) => await run<IbanData>('es/iban', ibanOptions),
    esIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('es/iban', count, ibanOptions),
    frIban: async (ibanOptions = {}) => await run<IbanData>('fr/iban', ibanOptions),
    frIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('fr/iban', count, ibanOptions),
    itIban: async (ibanOptions = {}) => await run<IbanData>('it/iban', ibanOptions),
    itIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('it/iban', count, ibanOptions),
    ptIban: async (ibanOptions = {}) => await run<IbanData>('pt/iban', ibanOptions),
    ptIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('pt/iban', count, ibanOptions),
    siIban: async (ibanOptions = {}) => await run<IbanData>('si/iban', ibanOptions),
    siIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('si/iban', count, ibanOptions),
    fiIban: async (ibanOptions = {}) => await run<IbanData>('fi/iban', ibanOptions),
    fiIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('fi/iban', count, ibanOptions),
    eeIban: async (ibanOptions = {}) => await run<IbanData>('ee/iban', ibanOptions),
    eeIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('ee/iban', count, ibanOptions),
    huIban: async (ibanOptions = {}) => await run<IbanData>('hu/iban', ibanOptions),
    huIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('hu/iban', count, ibanOptions),
    hrIban: async (ibanOptions = {}) => await run<IbanData>('hr/iban', ibanOptions),
    hrIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('hr/iban', count, ibanOptions),
    czIban: async (ibanOptions = {}) => await run<IbanData>('cz/iban', ibanOptions),
    czIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('cz/iban', count, ibanOptions),
    skIban: async (ibanOptions = {}) => await run<IbanData>('sk/iban', ibanOptions),
    skIbans: async (count, ibanOptions = {}) =>
      await runMany<IbanData>('sk/iban', count, ibanOptions),
    plRegon: async (regonOptions = {}) => await run<PolishRegonData>('pl/regon', regonOptions),
    plRegons: async (count, regonOptions = {}) =>
      await runMany<PolishRegonData>('pl/regon', count, regonOptions),
    plCompany: async (companyOptions = {}) =>
      await run<PolishCompanyData>('pl/company', companyOptions),
    plCompanies: async (count, companyOptions = {}) =>
      await runMany<PolishCompanyData>('pl/company', count, companyOptions),
    atCompany: async (companyOptions = {}) =>
      await run<AtCompanyData>('at/company', companyOptions),
    atCompanies: async (count, companyOptions = {}) =>
      await runMany<AtCompanyData>('at/company', count, companyOptions),
    beCompany: async (companyOptions = {}) =>
      await run<BeCompanyData>('be/company', companyOptions),
    beCompanies: async (count, companyOptions = {}) =>
      await runMany<BeCompanyData>('be/company', count, companyOptions),
    bgCompany: async (companyOptions = {}) =>
      await run<BgCompanyData>('bg/company', companyOptions),
    bgCompanies: async (count, companyOptions = {}) =>
      await runMany<BgCompanyData>('bg/company', count, companyOptions),
    cyCompany: async (companyOptions = {}) =>
      await run<CyCompanyData>('cy/company', companyOptions),
    cyCompanies: async (count, companyOptions = {}) =>
      await runMany<CyCompanyData>('cy/company', count, companyOptions),
    czCompany: async (companyOptions = {}) =>
      await run<CzCompanyData>('cz/company', companyOptions),
    czCompanies: async (count, companyOptions = {}) =>
      await runMany<CzCompanyData>('cz/company', count, companyOptions),
    deCompany: async (companyOptions = {}) =>
      await run<DeCompanyData>('de/company', companyOptions),
    deCompanies: async (count, companyOptions = {}) =>
      await runMany<DeCompanyData>('de/company', count, companyOptions),
    dkCompany: async (companyOptions = {}) =>
      await run<DkCompanyData>('dk/company', companyOptions),
    dkCompanies: async (count, companyOptions = {}) =>
      await runMany<DkCompanyData>('dk/company', count, companyOptions),
    eeCompany: async (companyOptions = {}) =>
      await run<EeCompanyData>('ee/company', companyOptions),
    eeCompanies: async (count, companyOptions = {}) =>
      await runMany<EeCompanyData>('ee/company', count, companyOptions),
    esCompany: async (companyOptions = {}) =>
      await run<EsCompanyData>('es/company', companyOptions),
    esCompanies: async (count, companyOptions = {}) =>
      await runMany<EsCompanyData>('es/company', count, companyOptions),
    fiCompany: async (companyOptions = {}) =>
      await run<FiCompanyData>('fi/company', companyOptions),
    fiCompanies: async (count, companyOptions = {}) =>
      await runMany<FiCompanyData>('fi/company', count, companyOptions),
    frCompany: async (companyOptions = {}) =>
      await run<FrCompanyData>('fr/company', companyOptions),
    frCompanies: async (count, companyOptions = {}) =>
      await runMany<FrCompanyData>('fr/company', count, companyOptions),
    grCompany: async (companyOptions = {}) =>
      await run<GrCompanyData>('gr/company', companyOptions),
    grCompanies: async (count, companyOptions = {}) =>
      await runMany<GrCompanyData>('gr/company', count, companyOptions),
    hrCompany: async (companyOptions = {}) =>
      await run<HrCompanyData>('hr/company', companyOptions),
    hrCompanies: async (count, companyOptions = {}) =>
      await runMany<HrCompanyData>('hr/company', count, companyOptions),
    huCompany: async (companyOptions = {}) =>
      await run<HuCompanyData>('hu/company', companyOptions),
    huCompanies: async (count, companyOptions = {}) =>
      await runMany<HuCompanyData>('hu/company', count, companyOptions),
    ieCompany: async (companyOptions = {}) =>
      await run<IeCompanyData>('ie/company', companyOptions),
    ieCompanies: async (count, companyOptions = {}) =>
      await runMany<IeCompanyData>('ie/company', count, companyOptions),
    itCompany: async (companyOptions = {}) =>
      await run<ItCompanyData>('it/company', companyOptions),
    itCompanies: async (count, companyOptions = {}) =>
      await runMany<ItCompanyData>('it/company', count, companyOptions),
    ltCompany: async (companyOptions = {}) =>
      await run<LtCompanyData>('lt/company', companyOptions),
    ltCompanies: async (count, companyOptions = {}) =>
      await runMany<LtCompanyData>('lt/company', count, companyOptions),
    luCompany: async (companyOptions = {}) =>
      await run<LuCompanyData>('lu/company', companyOptions),
    luCompanies: async (count, companyOptions = {}) =>
      await runMany<LuCompanyData>('lu/company', count, companyOptions),
    lvCompany: async (companyOptions = {}) =>
      await run<LvCompanyData>('lv/company', companyOptions),
    lvCompanies: async (count, companyOptions = {}) =>
      await runMany<LvCompanyData>('lv/company', count, companyOptions),
    mtCompany: async (companyOptions = {}) =>
      await run<MtCompanyData>('mt/company', companyOptions),
    mtCompanies: async (count, companyOptions = {}) =>
      await runMany<MtCompanyData>('mt/company', count, companyOptions),
    nlCompany: async (companyOptions = {}) =>
      await run<NlCompanyData>('nl/company', companyOptions),
    nlCompanies: async (count, companyOptions = {}) =>
      await runMany<NlCompanyData>('nl/company', count, companyOptions),
    ptCompany: async (companyOptions = {}) =>
      await run<PtCompanyData>('pt/company', companyOptions),
    ptCompanies: async (count, companyOptions = {}) =>
      await runMany<PtCompanyData>('pt/company', count, companyOptions),
    roCompany: async (companyOptions = {}) =>
      await run<RoCompanyData>('ro/company', companyOptions),
    roCompanies: async (count, companyOptions = {}) =>
      await runMany<RoCompanyData>('ro/company', count, companyOptions),
    seCompany: async (companyOptions = {}) =>
      await run<SeCompanyData>('se/company', companyOptions),
    seCompanies: async (count, companyOptions = {}) =>
      await runMany<SeCompanyData>('se/company', count, companyOptions),
    siCompany: async (companyOptions = {}) =>
      await run<SiCompanyData>('si/company', companyOptions),
    siCompanies: async (count, companyOptions = {}) =>
      await runMany<SiCompanyData>('si/company', count, companyOptions),
    skCompany: async (companyOptions = {}) =>
      await run<SkCompanyData>('sk/company', companyOptions),
    skCompanies: async (count, companyOptions = {}) =>
      await runMany<SkCompanyData>('sk/company', count, companyOptions),
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
    atVehicleRegistration: async (vehicleOptions = {}) =>
      await run<AtVehicleRegistrationData>('at/vehicle-registration', vehicleOptions),
    atVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<AtVehicleRegistrationData>('at/vehicle-registration', count, vehicleOptions),
    beVehicleRegistration: async (vehicleOptions = {}) =>
      await run<BeVehicleRegistrationData>('be/vehicle-registration', vehicleOptions),
    beVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<BeVehicleRegistrationData>('be/vehicle-registration', count, vehicleOptions),
    bgVehicleRegistration: async (vehicleOptions = {}) =>
      await run<BgVehicleRegistrationData>('bg/vehicle-registration', vehicleOptions),
    bgVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<BgVehicleRegistrationData>('bg/vehicle-registration', count, vehicleOptions),
    cyVehicleRegistration: async (vehicleOptions = {}) =>
      await run<CyVehicleRegistrationData>('cy/vehicle-registration', vehicleOptions),
    cyVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<CyVehicleRegistrationData>('cy/vehicle-registration', count, vehicleOptions),
    czVehicleRegistration: async (vehicleOptions = {}) =>
      await run<CzVehicleRegistrationData>('cz/vehicle-registration', vehicleOptions),
    czVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<CzVehicleRegistrationData>('cz/vehicle-registration', count, vehicleOptions),
    deVehicleRegistration: async (vehicleOptions = {}) =>
      await run<DeVehicleRegistrationData>('de/vehicle-registration', vehicleOptions),
    deVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<DeVehicleRegistrationData>('de/vehicle-registration', count, vehicleOptions),
    dkVehicleRegistration: async (vehicleOptions = {}) =>
      await run<DkVehicleRegistrationData>('dk/vehicle-registration', vehicleOptions),
    dkVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<DkVehicleRegistrationData>('dk/vehicle-registration', count, vehicleOptions),
    eeVehicleRegistration: async (vehicleOptions = {}) =>
      await run<EeVehicleRegistrationData>('ee/vehicle-registration', vehicleOptions),
    eeVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<EeVehicleRegistrationData>('ee/vehicle-registration', count, vehicleOptions),
    esVehicleRegistration: async (vehicleOptions = {}) =>
      await run<EsVehicleRegistrationData>('es/vehicle-registration', vehicleOptions),
    esVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<EsVehicleRegistrationData>('es/vehicle-registration', count, vehicleOptions),
    fiVehicleRegistration: async (vehicleOptions = {}) =>
      await run<FiVehicleRegistrationData>('fi/vehicle-registration', vehicleOptions),
    fiVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<FiVehicleRegistrationData>('fi/vehicle-registration', count, vehicleOptions),
    frVehicleRegistration: async (vehicleOptions = {}) =>
      await run<FrVehicleRegistrationData>('fr/vehicle-registration', vehicleOptions),
    frVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<FrVehicleRegistrationData>('fr/vehicle-registration', count, vehicleOptions),
    grVehicleRegistration: async (vehicleOptions = {}) =>
      await run<GrVehicleRegistrationData>('gr/vehicle-registration', vehicleOptions),
    grVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<GrVehicleRegistrationData>('gr/vehicle-registration', count, vehicleOptions),
    hrVehicleRegistration: async (vehicleOptions = {}) =>
      await run<HrVehicleRegistrationData>('hr/vehicle-registration', vehicleOptions),
    hrVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<HrVehicleRegistrationData>('hr/vehicle-registration', count, vehicleOptions),
    huVehicleRegistration: async (vehicleOptions = {}) =>
      await run<HuVehicleRegistrationData>('hu/vehicle-registration', vehicleOptions),
    huVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<HuVehicleRegistrationData>('hu/vehicle-registration', count, vehicleOptions),
    ieVehicleRegistration: async (vehicleOptions = {}) =>
      await run<IeVehicleRegistrationData>('ie/vehicle-registration', vehicleOptions),
    ieVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<IeVehicleRegistrationData>('ie/vehicle-registration', count, vehicleOptions),
    itVehicleRegistration: async (vehicleOptions = {}) =>
      await run<ItVehicleRegistrationData>('it/vehicle-registration', vehicleOptions),
    itVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<ItVehicleRegistrationData>('it/vehicle-registration', count, vehicleOptions),
    ltVehicleRegistration: async (vehicleOptions = {}) =>
      await run<LtVehicleRegistrationData>('lt/vehicle-registration', vehicleOptions),
    ltVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<LtVehicleRegistrationData>('lt/vehicle-registration', count, vehicleOptions),
    luVehicleRegistration: async (vehicleOptions = {}) =>
      await run<LuVehicleRegistrationData>('lu/vehicle-registration', vehicleOptions),
    luVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<LuVehicleRegistrationData>('lu/vehicle-registration', count, vehicleOptions),
    lvVehicleRegistration: async (vehicleOptions = {}) =>
      await run<LvVehicleRegistrationData>('lv/vehicle-registration', vehicleOptions),
    lvVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<LvVehicleRegistrationData>('lv/vehicle-registration', count, vehicleOptions),
    mtVehicleRegistration: async (vehicleOptions = {}) =>
      await run<MtVehicleRegistrationData>('mt/vehicle-registration', vehicleOptions),
    mtVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<MtVehicleRegistrationData>('mt/vehicle-registration', count, vehicleOptions),
    nlVehicleRegistration: async (vehicleOptions = {}) =>
      await run<NlVehicleRegistrationData>('nl/vehicle-registration', vehicleOptions),
    nlVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<NlVehicleRegistrationData>('nl/vehicle-registration', count, vehicleOptions),
    ptVehicleRegistration: async (vehicleOptions = {}) =>
      await run<PtVehicleRegistrationData>('pt/vehicle-registration', vehicleOptions),
    ptVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<PtVehicleRegistrationData>('pt/vehicle-registration', count, vehicleOptions),
    roVehicleRegistration: async (vehicleOptions = {}) =>
      await run<RoVehicleRegistrationData>('ro/vehicle-registration', vehicleOptions),
    roVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<RoVehicleRegistrationData>('ro/vehicle-registration', count, vehicleOptions),
    seVehicleRegistration: async (vehicleOptions = {}) =>
      await run<SeVehicleRegistrationData>('se/vehicle-registration', vehicleOptions),
    seVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<SeVehicleRegistrationData>('se/vehicle-registration', count, vehicleOptions),
    siVehicleRegistration: async (vehicleOptions = {}) =>
      await run<SiVehicleRegistrationData>('si/vehicle-registration', vehicleOptions),
    siVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<SiVehicleRegistrationData>('si/vehicle-registration', count, vehicleOptions),
    skVehicleRegistration: async (vehicleOptions = {}) =>
      await run<SkVehicleRegistrationData>('sk/vehicle-registration', vehicleOptions),
    skVehicleRegistrations: async (count, vehicleOptions = {}) =>
      await runMany<SkVehicleRegistrationData>('sk/vehicle-registration', count, vehicleOptions),
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
    email: async (emailOptions = {}) => await run<AnyEmailData>('email', emailOptions),
    emails: async (count, emailOptions = {}) =>
      await runMany<AnyEmailData>('email', count, emailOptions),
    offering: async (offeringOptions = {}) =>
      await run<AnyOfferingData>('offering', toAggregateWire(offeringOptions)),
    offerings: async (count, offeringOptions = {}) =>
      await runMany<AnyOfferingData>('offering', count, toAggregateWire(offeringOptions)),
    lorem: async (loremOptions = {}) => await run<LoremData>('lorem', loremOptions),
    lorems: async (count, loremOptions = {}) =>
      await runMany<LoremData>('lorem', count, loremOptions),
    customRegex: async (customRegexOptions) =>
      await run<CustomRegexData>('custom-regex', customRegexOptions),
    customRegexes: async (count, customRegexOptions) =>
      await runMany<CustomRegexData>('custom-regex', count, customRegexOptions),
    uuid: async (uuidOptions = {}) => await run<UuidData>('uuid', uuidOptions),
    uuids: async (count, uuidOptions = {}) => await runMany<UuidData>('uuid', count, uuidOptions),
    ulid: async (ulidOptions = {}) => await run<UlidData>('ulid', ulidOptions),
    ulids: async (count, ulidOptions = {}) => await runMany<UlidData>('ulid', count, ulidOptions),
    nanoId: async (nanoIdOptions = {}) => await run<NanoIdData>('nanoid', nanoIdOptions),
    nanoIds: async (count, nanoIdOptions = {}) =>
      await runMany<NanoIdData>('nanoid', count, nanoIdOptions),
    objectId: async (objectIdOptions = {}) => await run<ObjectIdData>('object-id', objectIdOptions),
    objectIds: async (count, objectIdOptions = {}) =>
      await runMany<ObjectIdData>('object-id', count, objectIdOptions),
    sequence: async (sequenceOptions = {}) => await run<SequenceData>('sequence', sequenceOptions),
    sequences: async (count, sequenceOptions = {}) =>
      await runMany<SequenceData>('sequence', count, sequenceOptions),
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
    ...emailPair('at'),
    ...emailPair('be'),
    ...emailPair('bg'),
    ...emailPair('cy'),
    ...emailPair('cz'),
    ...emailPair('de'),
    ...emailPair('dk'),
    ...emailPair('ee'),
    ...emailPair('es'),
    ...emailPair('fi'),
    ...emailPair('fr'),
    ...emailPair('gr'),
    ...emailPair('hr'),
    ...emailPair('hu'),
    ...emailPair('ie'),
    ...emailPair('it'),
    ...emailPair('lt'),
    ...emailPair('lu'),
    ...emailPair('lv'),
    ...emailPair('mt'),
    ...emailPair('nl'),
    ...emailPair('pl'),
    ...emailPair('pt'),
    ...emailPair('ro'),
    ...emailPair('se'),
    ...emailPair('si'),
    ...emailPair('sk'),
    ...offeringPair('at'),
    ...offeringPair('be'),
    ...offeringPair('bg'),
    ...offeringPair('cy'),
    ...offeringPair('cz'),
    ...offeringPair('de'),
    ...offeringPair('dk'),
    ...offeringPair('ee'),
    ...offeringPair('es'),
    ...offeringPair('fi'),
    ...offeringPair('fr'),
    ...offeringPair('gr'),
    ...offeringPair('hr'),
    ...offeringPair('hu'),
    ...offeringPair('ie'),
    ...offeringPair('it'),
    ...offeringPair('lt'),
    ...offeringPair('lu'),
    ...offeringPair('lv'),
    ...offeringPair('mt'),
    ...offeringPair('nl'),
    ...offeringPair('pl'),
    ...offeringPair('pt'),
    ...offeringPair('ro'),
    ...offeringPair('se'),
    ...offeringPair('si'),
    ...offeringPair('sk'),
    frSiren: async (frSirenOptions = {}) => await run<FrSirenData>('fr/siren', frSirenOptions),
    frSirens: async (count, frSirenOptions = {}) =>
      await runMany<FrSirenData>('fr/siren', count, frSirenOptions),
    frNir: async (frNirOptions = {}) => await run<FrNirData>('fr/nir', frNirOptions),
    frNirs: async (count, frNirOptions = {}) =>
      await runMany<FrNirData>('fr/nir', count, frNirOptions),
    atSvnr: async (atSvnrOptions = {}) => await run<AtSvnrData>('at/svnr', atSvnrOptions),
    atSvnrs: async (count, atSvnrOptions = {}) =>
      await runMany<AtSvnrData>('at/svnr', count, atSvnrOptions),
    atUid: async (atUidOptions = {}) => await run<AtUidData>('at/uid', atUidOptions),
    atUids: async (count, atUidOptions = {}) =>
      await runMany<AtUidData>('at/uid', count, atUidOptions),
    atFirmenbuchnummer: async (atFirmenbuchnummerOptions = {}) => await run<AtFirmenbuchnummerData>('at/firmenbuchnummer', atFirmenbuchnummerOptions),
    atFirmenbuchnummers: async (count, atFirmenbuchnummerOptions = {}) =>
      await runMany<AtFirmenbuchnummerData>('at/firmenbuchnummer', count, atFirmenbuchnummerOptions),
    atSteuernummer: async (atSteuernummerOptions = {}) => await run<AtSteuernummerData>('at/steuernummer', atSteuernummerOptions),
    atSteuernummers: async (count, atSteuernummerOptions = {}) =>
      await runMany<AtSteuernummerData>('at/steuernummer', count, atSteuernummerOptions),
    beRijksregisternummer: async (beRijksregisternummerOptions = {}) => await run<BeRijksregisternummerData>('be/rijksregisternummer', beRijksregisternummerOptions),
    beRijksregisternummers: async (count, beRijksregisternummerOptions = {}) =>
      await runMany<BeRijksregisternummerData>('be/rijksregisternummer', count, beRijksregisternummerOptions),
    beOndernemingsnummer: async (beOndernemingsnummerOptions = {}) => await run<BeOndernemingsnummerData>('be/ondernemingsnummer', beOndernemingsnummerOptions),
    beOndernemingsnummers: async (count, beOndernemingsnummerOptions = {}) =>
      await runMany<BeOndernemingsnummerData>('be/ondernemingsnummer', count, beOndernemingsnummerOptions),
    bgEgn: async (bgEgnOptions = {}) => await run<BgEgnData>('bg/egn', bgEgnOptions),
    bgEgns: async (count, bgEgnOptions = {}) =>
      await runMany<BgEgnData>('bg/egn', count, bgEgnOptions),
    bgEik: async (bgEikOptions = {}) => await run<BgEikData>('bg/eik', bgEikOptions),
    bgEiks: async (count, bgEikOptions = {}) =>
      await runMany<BgEikData>('bg/eik', count, bgEikOptions),
    hrOib: async (hrOibOptions = {}) => await run<HrOibData>('hr/oib', hrOibOptions),
    hrOibs: async (count, hrOibOptions = {}) =>
      await runMany<HrOibData>('hr/oib', count, hrOibOptions),
    hrJmbg: async (hrJmbgOptions = {}) => await run<HrJmbgData>('hr/jmbg', hrJmbgOptions),
    hrJmbgs: async (count, hrJmbgOptions = {}) =>
      await runMany<HrJmbgData>('hr/jmbg', count, hrJmbgOptions),
    cyTic: async (cyTicOptions = {}) => await run<CyTicData>('cy/tic', cyTicOptions),
    cyTics: async (count, cyTicOptions = {}) =>
      await runMany<CyTicData>('cy/tic', count, cyTicOptions),
    czRodneCislo: async (czRodneCisloOptions = {}) => await run<CzRodneCisloData>('cz/rodne-cislo', czRodneCisloOptions),
    czRodneCislos: async (count, czRodneCisloOptions = {}) =>
      await runMany<CzRodneCisloData>('cz/rodne-cislo', count, czRodneCisloOptions),
    czIco: async (czIcoOptions = {}) => await run<CzIcoData>('cz/ico', czIcoOptions),
    czIcos: async (count, czIcoOptions = {}) =>
      await runMany<CzIcoData>('cz/ico', count, czIcoOptions),
    dkCpr: async (dkCprOptions = {}) => await run<DkCprData>('dk/cpr', dkCprOptions),
    dkCprs: async (count, dkCprOptions = {}) =>
      await runMany<DkCprData>('dk/cpr', count, dkCprOptions),
    dkPerson: async (dkPersonOptions = {}) => await run<DkPersonData>('dk/person', dkPersonOptions),
    dkPeople: async (count, dkPersonOptions = {}) =>
      await runMany<DkPersonData>('dk/person', count, dkPersonOptions),
    dkCvr: async (dkCvrOptions = {}) => await run<DkCvrData>('dk/cvr', dkCvrOptions),
    dkCvrs: async (count, dkCvrOptions = {}) =>
      await runMany<DkCvrData>('dk/cvr', count, dkCvrOptions),
    eeIsikukood: async (eeIsikukoodOptions = {}) => await run<EeIsikukoodData>('ee/isikukood', eeIsikukoodOptions),
    eeIsikukoods: async (count, eeIsikukoodOptions = {}) =>
      await runMany<EeIsikukoodData>('ee/isikukood', count, eeIsikukoodOptions),
    eeRegistrikood: async (eeRegistrikoodOptions = {}) => await run<EeRegistrikoodData>('ee/registrikood', eeRegistrikoodOptions),
    eeRegistrikoods: async (count, eeRegistrikoodOptions = {}) =>
      await runMany<EeRegistrikoodData>('ee/registrikood', count, eeRegistrikoodOptions),
    eeKmkr: async (eeKmkrOptions = {}) => await run<EeKmkrData>('ee/kmkr', eeKmkrOptions),
    eeKmkrs: async (count, eeKmkrOptions = {}) =>
      await runMany<EeKmkrData>('ee/kmkr', count, eeKmkrOptions),
    fiHenkilotunnus: async (fiHenkilotunnusOptions = {}) => await run<FiHenkilotunnusData>('fi/henkilotunnus', fiHenkilotunnusOptions),
    fiHenkilotunnuss: async (count, fiHenkilotunnusOptions = {}) =>
      await runMany<FiHenkilotunnusData>('fi/henkilotunnus', count, fiHenkilotunnusOptions),
    fiYTunnus: async (fiYTunnusOptions = {}) => await run<FiYTunnusData>('fi/y-tunnus', fiYTunnusOptions),
    fiYTunnuss: async (count, fiYTunnusOptions = {}) =>
      await runMany<FiYTunnusData>('fi/y-tunnus', count, fiYTunnusOptions),
    deSteuerId: async (deSteuerIdOptions = {}) => await run<DeSteuerIdData>('de/steuer-id', deSteuerIdOptions),
    deSteuerIds: async (count, deSteuerIdOptions = {}) =>
      await runMany<DeSteuerIdData>('de/steuer-id', count, deSteuerIdOptions),
    deUstIdnr: async (deUstIdnrOptions = {}) => await run<DeUstIdnrData>('de/ust-idnr', deUstIdnrOptions),
    deUstIdnrs: async (count, deUstIdnrOptions = {}) =>
      await runMany<DeUstIdnrData>('de/ust-idnr', count, deUstIdnrOptions),
    deHandelsregisternummer: async (deHandelsregisternummerOptions = {}) => await run<DeHandelsregisternummerData>('de/handelsregisternummer', deHandelsregisternummerOptions),
    deHandelsregisternummers: async (count, deHandelsregisternummerOptions = {}) =>
      await runMany<DeHandelsregisternummerData>('de/handelsregisternummer', count, deHandelsregisternummerOptions),
    deWirtschaftsIdnr: async (deWirtschaftsIdnrOptions = {}) => await run<DeWirtschaftsIdnrData>('de/wirtschafts-idnr', deWirtschaftsIdnrOptions),
    deWirtschaftsIdnrs: async (count, deWirtschaftsIdnrOptions = {}) =>
      await runMany<DeWirtschaftsIdnrData>('de/wirtschafts-idnr', count, deWirtschaftsIdnrOptions),
    dePersonalausweis: async (dePersonalausweisOptions = {}) => await run<DePersonalausweisData>('de/personalausweis', dePersonalausweisOptions),
    dePersonalausweiss: async (count, dePersonalausweisOptions = {}) =>
      await runMany<DePersonalausweisData>('de/personalausweis', count, dePersonalausweisOptions),
    grAmka: async (grAmkaOptions = {}) => await run<GrAmkaData>('gr/amka', grAmkaOptions),
    grAmkas: async (count, grAmkaOptions = {}) =>
      await runMany<GrAmkaData>('gr/amka', count, grAmkaOptions),
    grAfm: async (grAfmOptions = {}) => await run<GrAfmData>('gr/afm', grAfmOptions),
    grAfms: async (count, grAfmOptions = {}) =>
      await runMany<GrAfmData>('gr/afm', count, grAfmOptions),
    huAdoazonositoJel: async (huAdoazonositoJelOptions = {}) => await run<HuAdoazonositoJelData>('hu/adoazonosito-jel', huAdoazonositoJelOptions),
    huAdoazonositoJels: async (count, huAdoazonositoJelOptions = {}) =>
      await runMany<HuAdoazonositoJelData>('hu/adoazonosito-jel', count, huAdoazonositoJelOptions),
    huTaj: async (huTajOptions = {}) => await run<HuTajData>('hu/taj', huTajOptions),
    huTajs: async (count, huTajOptions = {}) =>
      await runMany<HuTajData>('hu/taj', count, huTajOptions),
    huSzemelyiAzonosito: async (huSzemelyiAzonositoOptions = {}) => await run<HuSzemelyiAzonositoData>('hu/szemelyi-azonosito', huSzemelyiAzonositoOptions),
    huSzemelyiAzonositos: async (count, huSzemelyiAzonositoOptions = {}) =>
      await runMany<HuSzemelyiAzonositoData>('hu/szemelyi-azonosito', count, huSzemelyiAzonositoOptions),
    huAdoszam: async (huAdoszamOptions = {}) => await run<HuAdoszamData>('hu/adoszam', huAdoszamOptions),
    huAdoszams: async (count, huAdoszamOptions = {}) =>
      await runMany<HuAdoszamData>('hu/adoszam', count, huAdoszamOptions),
    huCegjegyzekszam: async (huCegjegyzekszamOptions = {}) => await run<HuCegjegyzekszamData>('hu/cegjegyzekszam', huCegjegyzekszamOptions),
    huCegjegyzekszams: async (count, huCegjegyzekszamOptions = {}) =>
      await runMany<HuCegjegyzekszamData>('hu/cegjegyzekszam', count, huCegjegyzekszamOptions),
    iePpsn: async (iePpsnOptions = {}) => await run<IePpsnData>('ie/ppsn', iePpsnOptions),
    iePpsns: async (count, iePpsnOptions = {}) =>
      await runMany<IePpsnData>('ie/ppsn', count, iePpsnOptions),
    ieVat: async (ieVatOptions = {}) => await run<IeVatData>('ie/vat', ieVatOptions),
    ieVats: async (count, ieVatOptions = {}) =>
      await runMany<IeVatData>('ie/vat', count, ieVatOptions),
    ieCro: async (ieCroOptions = {}) => await run<IeCroData>('ie/cro', ieCroOptions),
    ieCros: async (count, ieCroOptions = {}) =>
      await runMany<IeCroData>('ie/cro', count, ieCroOptions),
    itCodiceFiscale: async (itCodiceFiscaleOptions = {}) => await run<ItCodiceFiscaleData>('it/codice-fiscale', itCodiceFiscaleOptions),
    itCodiceFiscales: async (count, itCodiceFiscaleOptions = {}) =>
      await runMany<ItCodiceFiscaleData>('it/codice-fiscale', count, itCodiceFiscaleOptions),
    itPartitaIva: async (itPartitaIvaOptions = {}) => await run<ItPartitaIvaData>('it/partita-iva', itPartitaIvaOptions),
    itPartitaIvas: async (count, itPartitaIvaOptions = {}) =>
      await runMany<ItPartitaIvaData>('it/partita-iva', count, itPartitaIvaOptions),
    lvPersonasKods: async (lvPersonasKodsOptions = {}) => await run<LvPersonasKodsData>('lv/personas-kods', lvPersonasKodsOptions),
    lvPersonasKodss: async (count, lvPersonasKodsOptions = {}) =>
      await runMany<LvPersonasKodsData>('lv/personas-kods', count, lvPersonasKodsOptions),
    lvRegistracijasNumurs: async (lvRegistracijasNumursOptions = {}) => await run<LvRegistracijasNumursData>('lv/registracijas-numurs', lvRegistracijasNumursOptions),
    lvRegistracijasNumurss: async (count, lvRegistracijasNumursOptions = {}) =>
      await runMany<LvRegistracijasNumursData>('lv/registracijas-numurs', count, lvRegistracijasNumursOptions),
    ltAsmensKodas: async (ltAsmensKodasOptions = {}) => await run<LtAsmensKodasData>('lt/asmens-kodas', ltAsmensKodasOptions),
    ltAsmensKodass: async (count, ltAsmensKodasOptions = {}) =>
      await runMany<LtAsmensKodasData>('lt/asmens-kodas', count, ltAsmensKodasOptions),
    ltImonesKodas: async (ltImonesKodasOptions = {}) => await run<LtImonesKodasData>('lt/imones-kodas', ltImonesKodasOptions),
    ltImonesKodass: async (count, ltImonesKodasOptions = {}) =>
      await runMany<LtImonesKodasData>('lt/imones-kodas', count, ltImonesKodasOptions),
    ltPvm: async (ltPvmOptions = {}) => await run<LtPvmData>('lt/pvm', ltPvmOptions),
    ltPvms: async (count, ltPvmOptions = {}) =>
      await runMany<LtPvmData>('lt/pvm', count, ltPvmOptions),
    luMatricule: async (luMatriculeOptions = {}) => await run<LuMatriculeData>('lu/matricule', luMatriculeOptions),
    luMatricules: async (count, luMatriculeOptions = {}) =>
      await runMany<LuMatriculeData>('lu/matricule', count, luMatriculeOptions),
    luTva: async (luTvaOptions = {}) => await run<LuTvaData>('lu/tva', luTvaOptions),
    luTvas: async (count, luTvaOptions = {}) =>
      await runMany<LuTvaData>('lu/tva', count, luTvaOptions),
    mtIdCard: async (mtIdCardOptions = {}) => await run<MtIdCardData>('mt/id-card', mtIdCardOptions),
    mtIdCards: async (count, mtIdCardOptions = {}) =>
      await runMany<MtIdCardData>('mt/id-card', count, mtIdCardOptions),
    mtVat: async (mtVatOptions = {}) => await run<MtVatData>('mt/vat', mtVatOptions),
    mtVats: async (count, mtVatOptions = {}) =>
      await runMany<MtVatData>('mt/vat', count, mtVatOptions),
    nlBsn: async (nlBsnOptions = {}) => await run<NlBsnData>('nl/bsn', nlBsnOptions),
    nlBsns: async (count, nlBsnOptions = {}) =>
      await runMany<NlBsnData>('nl/bsn', count, nlBsnOptions),
    nlPerson: async (nlPersonOptions = {}) => await run<NlPersonData>('nl/person', nlPersonOptions),
    nlPeople: async (count, nlPersonOptions = {}) =>
      await runMany<NlPersonData>('nl/person', count, nlPersonOptions),
    nlRsin: async (nlRsinOptions = {}) => await run<NlRsinData>('nl/rsin', nlRsinOptions),
    nlRsins: async (count, nlRsinOptions = {}) =>
      await runMany<NlRsinData>('nl/rsin', count, nlRsinOptions),
    nlBtwId: async (nlBtwIdOptions = {}) => await run<NlBtwIdData>('nl/btw-id', nlBtwIdOptions),
    nlBtwIds: async (count, nlBtwIdOptions = {}) =>
      await runMany<NlBtwIdData>('nl/btw-id', count, nlBtwIdOptions),
    nlKvk: async (nlKvkOptions = {}) => await run<NlKvkData>('nl/kvk', nlKvkOptions),
    nlKvks: async (count, nlKvkOptions = {}) =>
      await runMany<NlKvkData>('nl/kvk', count, nlKvkOptions),
    ptNif: async (ptNifOptions = {}) => await run<PtNifData>('pt/nif', ptNifOptions),
    ptNifs: async (count, ptNifOptions = {}) =>
      await runMany<PtNifData>('pt/nif', count, ptNifOptions),
    ptCartaoCidadao: async (ptCartaoCidadaoOptions = {}) => await run<PtCartaoCidadaoData>('pt/cartao-cidadao', ptCartaoCidadaoOptions),
    ptCartaoCidadaos: async (count, ptCartaoCidadaoOptions = {}) =>
      await runMany<PtCartaoCidadaoData>('pt/cartao-cidadao', count, ptCartaoCidadaoOptions),
    roCnp: async (roCnpOptions = {}) => await run<RoCnpData>('ro/cnp', roCnpOptions),
    roCnps: async (count, roCnpOptions = {}) =>
      await runMany<RoCnpData>('ro/cnp', count, roCnpOptions),
    roCui: async (roCuiOptions = {}) => await run<RoCuiData>('ro/cui', roCuiOptions),
    roCuis: async (count, roCuiOptions = {}) =>
      await runMany<RoCuiData>('ro/cui', count, roCuiOptions),
    skRodneCislo: async (skRodneCisloOptions = {}) => await run<SkRodneCisloData>('sk/rodne-cislo', skRodneCisloOptions),
    skRodneCislos: async (count, skRodneCisloOptions = {}) =>
      await runMany<SkRodneCisloData>('sk/rodne-cislo', count, skRodneCisloOptions),
    skIco: async (skIcoOptions = {}) => await run<SkIcoData>('sk/ico', skIcoOptions),
    skIcos: async (count, skIcoOptions = {}) =>
      await runMany<SkIcoData>('sk/ico', count, skIcoOptions),
    skIcDph: async (skIcDphOptions = {}) => await run<SkIcDphData>('sk/ic-dph', skIcDphOptions),
    skIcDphs: async (count, skIcDphOptions = {}) =>
      await runMany<SkIcDphData>('sk/ic-dph', count, skIcDphOptions),
    siEmso: async (siEmsoOptions = {}) => await run<SiEmsoData>('si/emso', siEmsoOptions),
    siEmsos: async (count, siEmsoOptions = {}) =>
      await runMany<SiEmsoData>('si/emso', count, siEmsoOptions),
    siDavcnaStevilka: async (siDavcnaStevilkaOptions = {}) => await run<SiDavcnaStevilkaData>('si/davcna-stevilka', siDavcnaStevilkaOptions),
    siDavcnaStevilkas: async (count, siDavcnaStevilkaOptions = {}) =>
      await runMany<SiDavcnaStevilkaData>('si/davcna-stevilka', count, siDavcnaStevilkaOptions),
    esDni: async (esDniOptions = {}) => await run<EsDniData>('es/dni', esDniOptions),
    esDnis: async (count, esDniOptions = {}) =>
      await runMany<EsDniData>('es/dni', count, esDniOptions),
    esNie: async (esNieOptions = {}) => await run<EsNieData>('es/nie', esNieOptions),
    esNies: async (count, esNieOptions = {}) =>
      await runMany<EsNieData>('es/nie', count, esNieOptions),
    esCif: async (esCifOptions = {}) => await run<EsCifData>('es/cif', esCifOptions),
    esCifs: async (count, esCifOptions = {}) =>
      await runMany<EsCifData>('es/cif', count, esCifOptions),
    sePersonnummer: async (sePersonnummerOptions = {}) => await run<SePersonnummerData>('se/personnummer', sePersonnummerOptions),
    sePersonnummers: async (count, sePersonnummerOptions = {}) =>
      await runMany<SePersonnummerData>('se/personnummer', count, sePersonnummerOptions),
    seOrganisationsnummer: async (seOrganisationsnummerOptions = {}) => await run<SeOrganisationsnummerData>('se/organisationsnummer', seOrganisationsnummerOptions),
    seOrganisationsnummers: async (count, seOrganisationsnummerOptions = {}) =>
      await runMany<SeOrganisationsnummerData>('se/organisationsnummer', count, seOrganisationsnummerOptions),
  };
};
