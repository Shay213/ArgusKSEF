import * as z from 'zod'
import { isDate1BeforeDate2 } from './utils'

export const KodyKrajowUE = [
  'AT',
  'BE',
  'BG',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'EL',
  'HR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'XI'
] as const

export const KodyKrajow = [
  'AF', // AFGANISTAN
  'AX', // ALAND ISLANDS
  'AL', // ALBANIA
  'DZ', // ALGIERIA
  'AD', // ANDORA
  'AO', // ANGOLA
  'AI', // ANGUILLA
  'AQ', // ANTARKTYDA
  'AG', // ANTIGUA I BARBUDA
  'AN', // ANTYLE HOLENDERSKIE
  'SA', // ARABIA SAUDYJSKA
  'AR', // ARGENTYNA
  'AM', // ARMENIA
  'AW', // ARUBA
  'AU', // AUSTRALIA
  'AT', // AUSTRIA
  'AZ', // AZERBEJDŻAN
  'BS', // BAHAMY
  'BH', // BAHRAJN
  'BD', // BANGLADESZ
  'BB', // BARBADOS
  'BE', // BELGIA
  'BZ', // BELIZE
  'BJ', // BENIN
  'BM', // BERMUDY
  'BT', // BHUTAN
  'BY', // BIAŁORUŚ
  'BO', // BOLIWIA
  'BQ', // BONAIRE, SINT EUSTATIUS I SABA
  'BA', // BOŚNIA I HERCEGOWINA
  'BW', // BOTSWANA
  'BR', // BRAZYLIA
  'BN', // BRUNEI DARUSSALAM
  'IO', // BRYTYJSKIE TERYTORIUM OCEANU INDYJSKIEGO
  'BG', // BUŁGARIA
  'BF', // BURKINA FASO
  'BI', // BURUNDI
  'XC', // CEUTA
  'CL', // CHILE
  'CN', // CHINY
  'HR', // CHORWACJA
  'CW', // CURAÇAO
  'CY', // CYPR
  'TD', // CZAD
  'ME', // CZARNOGÓRA
  'DK', // DANIA
  'DM', // DOMINIKA
  'DO', // DOMINIKANA
  'DJ', // DŻIBUTI
  'EG', // EGIPT
  'EC', // EKWADOR
  'ER', // ERYTREA
  'EE', // ESTONIA
  'ET', // ETIOPIA
  'FK', // FALKLANDY
  'FJ', // FIDŻI REPUBLIKA
  'PH', // FILIPINY
  'FI', // FINLANDIA
  'FR', // FRANCJA
  'TF', // FRANCUSKIE TERYTORIUM POŁUDNIOWE
  'GA', // GABON
  'GM', // GAMBIA
  'GH', // GHANA
  'GI', // GIBRALTAR
  'GR', // GRECJA
  'GD', // GRENADA
  'GL', // GRENLANDIA
  'GE', // GRUZJA
  'GU', // GUAM
  'GG', // GUERNSEY
  'GY', // GUJANA
  'GF', // GUJANA FRANCUSKA
  'GP', // GWADELUPA
  'GT', // GWATEMALA
  'GN', // GWINEA
  'GQ', // GWINEA RÓWNIKOWA
  'GW', // GWINEA-BISSAU
  'HT', // HAITI
  'ES', // HISZPANIA
  'HN', // HONDURAS
  'HK', // HONGKONG
  'IN', // INDIE
  'ID', // INDONEZJA
  'IQ', // IRACK
  'IR', // IRAN
  'IE', // IRLANDIA
  'IS', // ISLANDIA
  'IL', // IZRAEL
  'JM', // JAMAJKA
  'JP', // JAPONIA
  'YE', // JEMEN
  'JE', // JERSEY
  'JO', // JORDANIA
  'KY', // KAJMANY
  'KH', // KAMBODŻA
  'CM', // KAMERUN
  'CA', // KANADA
  'QA', // KATAR
  'KZ', // KAZACHSTAN
  'KE', // KENIA
  'KG', // KIRGISTAN
  'KI', // KIRIBATI
  'CO', // KOLUMBIA
  'KM', // KOMORY
  'CG', // KONGO
  'CD', // KONGO, REPUBLIKA DEMOKRATYCZNA
  'KP', // KOREAŃSKA REPUBLIKA LUDOWO-DEMOKRATYCZNA
  'XK', // KOSOWO
  'CR', // KOSTARYKA
  'CU', // KUBA
  'KW', // KUWEJT
  'LA', // LAOS
  'LS', // LESOTHO
  'LB', // LIBAN
  'LR', // LIBERIA
  'LY', // LIBIA
  'LI', // LIECHTENSTEIN
  'LT', // LITWA
  'LV', // ŁOTWA
  'LU', // LUKSEMBURG
  'MK', // MACEDONIA
  'MG', // MADAGASKAR
  'YT', // MAJOTTA
  'MO', // MAKAU
  'MW', // MALAWI
  'MV', // MALEDIWY
  'MY', // MALEZJA
  'ML', // MALI
  'MT', // MALTA
  'MP', // MARIANY PÓŁNOCNE
  'MA', // MAROKO
  'MQ', // MARTYNIKA
  'MR', // MAURETANIA
  'MU', // MAURITIUS
  'MX', // MEKSYK
  'XL', // MELILLA
  'FM', // MIKRONEZJA
  'UM', // MINOR
  'MD', // MOŁDOWA
  'MC', // MONAKO
  'MN', // MONGOLIA
  'MS', // MONTSERRAT
  'MZ', // MOZAMBIK
  'MM', // MYANMAR (BURMA)
  'NA', // NAMIBIA
  'NR', // NAURU
  'NP', // NEPAL
  'NL', // NIDERLANDY (HOLANDIA)
  'DE', // NIEMCY
  'NE', // NIGER
  'NG', // NIGERIA
  'NI', // NIKARAGUA
  'NU', // NIUE
  'NF', // NORFOLK
  'NO', // NORWEGIA
  'NC', // NOWA KALEDONIA
  'NZ', // NOWA ZELANDIA
  'PS', // OKUPOWANE TERYTORIUM PALESTYNY
  'OM', // OMAN
  'PK', // PAKISTAN
  'PW', // PALAU
  'PA', // PANAMA
  'PG', // PAPUA NOWA GWINEA
  'PY', // PARAGWAJ
  'PE', // PERU
  'PN', // PITCAIRN
  'PF', // POLINEZJA FRANCUSKA
  'PL', // POLSKA
  'GS', // POŁUDNIOWA GEORGIA I POŁUD.WYSPY SANDWICH
  'PT', // PORTUGALIA
  'PR', // PORTORYKO
  'CF', // REP.ŚRODKOWOAFRYKAŃSKA
  'CZ', // REPUBLIKA CZESKA
  'KR', // REPUBLIKA KOREI
  'ZA', // REPUBLIKA POŁUDNIOWEJ AFRYKI
  'RE', // REUNION
  'RU', // ROSJA
  'RO', // RUMUNIA
  'RW', // RWANDA
  'EH', // SAHARA ZACHODNIA
  'BL', // SAINT BARTHELEMY
  'KN', // SAINT KITTS I NEVIS
  'LC', // SAINT LUCIA
  'MF', // SAINT MARTIN
  'VC', // SAINT VINCENT I GRENADYNY
  'SV', // SALWADOR
  'WS', // SAMOA
  'AS', // SAMOA AMERYKAŃSKIE
  'SM', // SAN MARINO
  'SN', // SENEGAL
  'RS', // SERBIA
  'SC', // SESZELE
  'SL', // SIERRA LEONE
  'SG', // SINGAPUR
  'SK', // SŁOWACJA
  'SI', // SŁOWENIA
  'SO', // SOMALIA
  'LK', // SRI LANKA
  'PM', // SAINT PIERRE I MIQUELON
  'US', // STANY ZJEDNOCZONE AMERYKI
  'SZ', // SUAZI
  'SD', // SUDAN
  'SS', // SUDAN POŁUDNIOWY
  'SR', // SURINAM
  'SJ', // SVALBARD I JAN MAYEN
  'SH', // ŚWIĘTA HELENA
  'SY', // SYRIA
  'CH', // SZWAJCARIA
  'SE', // SZWECJA
  'TJ', // TADŻYKISTAN
  'TH', // TAJLANDIA
  'TW', // TAJWAN
  'TZ', // TANZANIA
  'TG', // TOGO
  'TK', // TOKELAU
  'TO', // TONGA
  'TT', // TRYNIDAD I TOBAGO
  'TN', // TUNEZJA
  'TR', // TURCJA
  'TM', // TURKMENISTAN
  'TV', // TUVALU
  'UG', // UGANDA
  'UA', // UKRAINA
  'UY', // URUGWAJ
  'UZ', // UZBEKISTAN
  'VU', // VANUATU
  'WF', // WALLIS I FUTUNA
  'VA', // WATYKAN
  'HU', // WĘGRY
  'VE', // WENEZUELA
  'GB', // WIELKA BRYTANIA
  'VN', // WIETNAM
  'IT', // WŁOCHY
  'TL', // WSCHODNI TIMOR
  'CI', // WYBRZEŻE KOŚCI SŁONIOWEJ
  'BV', // WYSPA BOUVETA
  'CX', // WYSPA BOŻEGO NARODZENIA
  'IM', // WYSPA MAN
  'SX', // WYSPA SINT MAARTEN (CZĘŚĆ HOLENDERSKA WYSPY)
  'CK', // WYSPY COOKA
  'VI', // WYSPY DZIEWICZE-USA
  'VG', // WYSPY DZIEWICZE-W.B.
  'HM', // WYSPY HEARD I MCDONALD
  'CC', // WYSPY KOKOSOWE (KEELINGA)
  'MH', // WYSPY MARSHALLA
  'FO', // WYSPY OWCZE
  'SB', // WYSPY SALOMONA
  'ST', // WYSPY ŚWIĘTEGO TOMASZA I KSIĄŻĘCA
  'TC', // WYSPY TURKS I CAICOS
  'ZM', // ZAMBIA
  'CV', // ZIELONY PRZYLĄDEK
  'ZW', // ZIMBABWE
  'AE', // ZJEDNOCZONE EMIRATY ARABSKIE
  'XI' // ZJEDNOCZONE KRÓLESTWO (IRLANDIA PÓŁNOCNA
] as const

export const KodWaluty = [
  'AED',
  'AFN',
  'ALL',
  'AMD',
  'ANG',
  'AOA',
  'ARS',
  'AUD',
  'AWG',
  'AZN',
  'BAM',
  'BBD',
  'BDT',
  'BGN',
  'BHD',
  'BIF',
  'BMD',
  'BND',
  'BOB',
  'BOV',
  'BRL',
  'BSD',
  'BTN',
  'BWP',
  'BYN',
  'BZD',
  'CAD',
  'CDF',
  'CHE',
  'CHF',
  'CHW',
  'CLF',
  'CLP',
  'CNY',
  'COP',
  'COU',
  'CRC',
  'CUC',
  'CUP',
  'CVE',
  'CZK',
  'DJF',
  'DKK',
  'DOP',
  'DZD',
  'EGP',
  'ERN',
  'ETB',
  'EUR',
  'FJD',
  'FKP',
  'GBP',
  'GEL',
  'GGP',
  'GHS',
  'GIP',
  'GMD',
  'GNF',
  'GTQ',
  'GYD',
  'HKD',
  'HNL',
  'HRK',
  'HTG',
  'HUF',
  'IDR',
  'ILS',
  'IMP',
  'INR',
  'IQD',
  'IRR',
  'ISK',
  'JEP',
  'JMD',
  'JOD',
  'JPY',
  'KES',
  'KGS',
  'KHR',
  'KMF',
  'KPW',
  'KRW',
  'KWD',
  'KYD',
  'KZT',
  'LAK',
  'LBP',
  'LKR',
  'LRD',
  'LSL',
  'LYD',
  'MAD',
  'MDL',
  'MGA',
  'MKD',
  'MMK',
  'MNT',
  'MOP',
  'MRU',
  'MUR',
  'MVR',
  'MWK',
  'MXN',
  'MXV',
  'MYR',
  'MZN',
  'NAD',
  'NGN',
  'NIO',
  'NOK',
  'NPR',
  'NZD',
  'OMR',
  'PAB',
  'PEN',
  'PGK',
  'PHP',
  'PKR',
  'PLN',
  'PYG',
  'QAR',
  'RON',
  'RSD',
  'RUB',
  'RWF',
  'SAR',
  'SBD',
  'SCR',
  'SDG',
  'SEK',
  'SGD',
  'SHP',
  'SLL',
  'SOS',
  'SRD',
  'SSP',
  'STN',
  'SVC',
  'SYP',
  'SZL',
  'THB',
  'TJS',
  'TMT',
  'TND',
  'TOP',
  'TRY',
  'TTD',
  'TWD',
  'TZS',
  'UAH',
  'UGX',
  'USD',
  'USN',
  'UYI',
  'UYU',
  'UYW',
  'UZS',
  'VES',
  'VND',
  'VUV',
  'WST',
  'XAF',
  'XAG',
  'XAU',
  'XBA',
  'XBB',
  'XBC',
  'XBD',
  'XCD',
  'XDR',
  'XOF',
  'XPD',
  'XPF',
  'XPT',
  'XSU',
  'XUA',
  'XXX',
  'YER',
  'ZAR',
  'ZMW',
  'ZWL'
] as const

export const StatusInfoPodatnika = ['1', '2', '3', '4'] as const

export const Rola = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] as const

export const RolaPU = ['1', '2', '3', ''] as const

export const RodzajFaktury = ['VAT', 'KOR', 'ZAL', 'ROZ', 'UPR', 'KOR_ZAL', 'KOR_ROZ'] as const

export const TypKorekty = ['1', '2', '3', ''] as const

export const StawkaPodatku = ['23', '22', '8', '7', '5', '4', '3', '0', 'zw', 'oo', 'np'] as const

export const GTU = [
  'GTU_01',
  'GTU_02',
  'GTU_03',
  'GTU_04',
  'GTU_05',
  'GTU_06',
  'GTU_07',
  'GTU_08',
  'GTU_09',
  'GTU_10',
  'GTU_11',
  'GTU_12',
  'GTU_13'
] as const

export const OznaczenieProcedury = [
  'WSTO_EE',
  'IED',
  'TT_D',
  'I_42',
  'I_63',
  'B_SPV',
  'B_SPV_DOSTAWA',
  'B_MPV_PROWIZJA'
] as const

export const FormaPlatnosci = ['1', '2', '3', '4', '5', '6', '7'] as const

export const RachunekWlasnyBanku = ['1', '2', '3'] as const

export const RodzajTransportu = ['1', '2', '3', '4', '5', '6', '7', '8'] as const

export const OpisLadunku = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20'
] as const

const Adres = z.object({
  KodKraju: z.enum(KodyKrajow),
  AdresL1: z.string().max(512),
  AdresL2: z.string().max(512).optional(),
  GLN: z.string().min(1).max(13).optional()
})

const DaneKontaktowe = z
  .array(
    z.object({
      Email: z.string().email().optional(),
      Telefon: z.string().min(1).max(16).optional()
    })
  )
  .min(0)
  .max(3)

const NrEORI = z.string().optional()
const NIP = z.string().refine((value) => /^\d{10}$/.test(value))
const NrVatUE = z.string().refine((value) => /(\d|[A-Z]|\+|\*){1,12}/.test(value))
const NrID = z.string().refine((value) => /[a-zA-Z0-9]{1,50}/.test(value))
const IDNabywcy = z.string().max(32).optional()
const NrKlienta = z.string().max(256).optional()
const IDWew = z
  .string()
  .max(20)
  .refine((value) => /[1-9]((\d[1-9])|([1-9]\d))\d{7}-\d{5/.test(value))
const Date = z.string().refine((value) => /((\d{4})-(\d{2})-(\d{2}))/.test(value))

const TKwotowy = z.string().refine((value) => /-?([1-9]\d{0,15}|0)(\.\d{1,2})?/.test(value))
const TKwotowy2 = z.string().refine((value) => /-?([1-9]\d{0,13}|0)(\.\d{1,8})?/.test(value))
const TIlosci = z.string().refine((value) => /-?([1-9]\d{0,15}|0)(\.\d{1,6})?/.test(value))
const TNumerKSeF = z
  .string()
  .refine((value) =>
    /([1-9]((\d[1-9])|([1-9]\d))\d{7}|M\d{9}|[A-Z]{3}\d{7})-(20[2-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])-([0-9A-F]{6})-?([0-9A-F]{6})-([0-9A-F]{2})/.test(
      value
    )
  )

const TProcentowy = z
  .number()
  .min(0)
  .max(100)
  .refine((value) => {
    const stringValue = String(value)
    const [integerPart, decimalPart] = stringValue.split('.')

    // Check total digits and fraction digits
    if (integerPart.length + decimalPart.length > 9 || decimalPart.length > 6) {
      return false
    }

    // Additional checks can be added here, e.g., whiteSpace

    return true
  })
const TGTU = z.enum(GTU)
const TOznaczenieProcedury = z.enum(OznaczenieProcedury)
const TNrRB = z.string().refine((value) => /[0-9A-Z]{10,32}/.test(value))
const SWIFT_Type = z.string().refine((value) => /[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3}){0,1}/.test(value))
const TNrKRS = z.string().refine((value) => /\d{10}/.test(value))

const DaneIdentyfikacyjne_Podmiot2 = z.union([
  z.object({
    NIP,
    Nazwa: z.string().max(512)
  }),
  z.object({
    KodUE: z.enum(KodyKrajowUE),
    NrVatUE,
    Nazwa: z.string().max(512)
  }),
  z.object({
    KodKraju: z.enum(KodyKrajow).optional(),
    NrID,
    Nazwa: z.string().max(512)
  }),
  z.object({
    BrakID: z.literal('1'),
    Nazwa: z.string().max(512)
  })
])

const Naglowek = z.object({
  KodFormularza: z.object({
    '#text': z.literal('FA'),
    '@_kodSystemowy': z.literal('FA (2)'),
    '@_wersjaSchemy': z.literal('1-0E')
  }),
  WariantFormularza: z.literal('2'),
  DataWytworzeniaFa: z.string().datetime(),
  SystemInfo: z.string().optional()
})

const Podmiot1 = z.object({
  PrefiksPodatnika: z.enum(KodyKrajowUE).optional(),
  NrEORI,
  DaneIdentyfikacyjne: z.object({
    NIP,
    Nazwa: z.string().max(512)
  }),
  Adres,
  AdresKoresp: Adres.optional(),
  DaneKontaktowe: z.array(DaneKontaktowe).min(0).max(3).optional(),
  StatusInfoPodatnika: z.enum(StatusInfoPodatnika).optional()
})

const Podmiot2 = z.object({
  NrEORI,
  DaneIdentyfikacyjne: DaneIdentyfikacyjne_Podmiot2,
  Adres,
  AdresKoresp: Adres.optional(),
  DaneKontaktowe: DaneKontaktowe.optional(),
  NrKlienta,
  IDNabywcy
})

const Podmiot3 = z
  .array(
    z
      .object({
        IDNabywcy,
        NrEORI,
        DaneIdentyfikacyjne: z.union([
          DaneIdentyfikacyjne_Podmiot2,
          z.object({
            IDWew,
            Nazwa: z.string().max(512)
          })
        ]),
        Adres,
        AdresKoresp: Adres.optional(),
        DaneKontaktowe: DaneKontaktowe.optional(),
        Rola: z.enum(Rola).optional(),
        RolaInna: z.literal('1').optional(),
        OpisRoli: z.string().optional(),
        Udzial: z.number().min(0).max(100).optional(),
        NrKlienta
      })
      .refine((data) => {
        if (
          (!data?.Rola && !data?.RolaInna && !data?.OpisRoli) ||
          (!data?.Rola && !data?.RolaInna && data?.OpisRoli) ||
          (!data?.Rola && data?.RolaInna && !data?.OpisRoli) ||
          (data?.Rola && !data?.RolaInna && data?.OpisRoli) ||
          (data?.Rola && data?.RolaInna && !data?.OpisRoli) ||
          (data?.Rola && data?.RolaInna && data?.OpisRoli)
        ) {
          throw new z.ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: `W przypadku wystąpienia na fakturze danych podmiotu
          trzeciego, o roli innej niż jedna z wyżej wymienionych, pole Rola
          pomija się. W tej sytuacji wypełnia się pola: RolaInna oraz
          OpisRoli.
          `,
              path: []
            }
          ])
        }
        return true
      })
  )
  .min(0)
  .max(100)
  .optional()

const PodmiotUpowazniony = z
  .object({
    NrEORI,
    DaneIdentyfikacyjne: z.object({
      NIP,
      Nazwa: z.string().max(512)
    }),
    Adres,
    AdresKoresp: Adres.optional(),
    DaneKontaktowe: z
      .object({
        EmailPU: z.string().email().optional(),
        TelefonPU: z.string().min(1).max(16).optional()
      })
      .optional(),
    RolaPU: z.enum(RolaPU)
  })
  .optional()

// Fa starts here
const Transport = z.union([
  z
    .object({
      RodzajTransportu: z.enum(RodzajTransportu),
      Przewoznik: z
        .object({
          DaneIdentyfikacyjne: DaneIdentyfikacyjne_Podmiot2,
          AdresPrzewoznika: Adres
        })
        .optional(),
      NrZleceniaTransportu: z.string().max(256).optional(),
      OpisLadunku: z.enum(OpisLadunku).optional(),
      LadunekInny: z.literal('1').optional(),
      OpisInnegoLadunku: z.string().max(50).optional(),
      JednostkaOpakowania: z.string().max(256).optional(),
      DataGodzRozpTransportu: z.string().datetime().optional(),
      DataGodzZakTransportu: z.string().datetime().optional(),
      WysylkaZ: Adres.optional(),
      WysylkaPrzez: z.array(Adres).min(0).max(20),
      WysylkaDo: Adres.optional()
    })
    .refine((data) => {
      if (
        (data.OpisLadunku && data.LadunekInny && data.OpisInnegoLadunku) ||
        (data.OpisLadunku && !data.LadunekInny && data.OpisInnegoLadunku) ||
        (data.OpisLadunku && data.LadunekInny && !data.OpisInnegoLadunku) ||
        (!data.OpisLadunku && !data.LadunekInny && !data.OpisInnegoLadunku) ||
        (!data.OpisLadunku && !data.LadunekInny && data.OpisInnegoLadunku) ||
        (!data.OpisLadunku && data.LadunekInny && !data.OpisInnegoLadunku)
      ) {
        throw new z.ZodError([
          {
            code: z.ZodIssueCode.custom,
            message:
              'Opis innego ladunku podaje się w przypadku gdy nie znajduje się odpowiednia wartość w polu OpisLadunku',
            path: []
          }
        ])
      }
      return true
    }),
  z
    .object({
      TransportInny: z.literal('1'),
      OpisInnegoTransportu: z.string().max(50),
      Przewoznik: z
        .object({
          DaneIdentyfikacyjne: DaneIdentyfikacyjne_Podmiot2,
          AdresPrzewoznika: Adres
        })
        .optional(),
      NrZleceniaTransportu: z.string().max(256).optional(),
      OpisLadunku: z.enum(OpisLadunku).optional(),
      LadunekInny: z.literal('1').optional(),
      OpisInnegoLadunku: z.string().max(50).optional(),
      JednostkaOpakowania: z.string().max(256).optional(),
      DataGodzRozpTransportu: z.string().datetime().optional(),
      DataGodzZakTransportu: z.string().datetime().optional(),
      WysylkaZ: Adres.optional(),
      WysylkaPrzez: z.array(Adres).min(0).max(20),
      WysylkaDo: Adres.optional()
    })
    .refine((data) => {
      if (
        (data.OpisLadunku && data.LadunekInny && data.OpisInnegoLadunku) ||
        (data.OpisLadunku && !data.LadunekInny && data.OpisInnegoLadunku) ||
        (data.OpisLadunku && data.LadunekInny && !data.OpisInnegoLadunku) ||
        (!data.OpisLadunku && !data.LadunekInny && !data.OpisInnegoLadunku) ||
        (!data.OpisLadunku && !data.LadunekInny && data.OpisInnegoLadunku) ||
        (!data.OpisLadunku && data.LadunekInny && !data.OpisInnegoLadunku)
      ) {
        throw new z.ZodError([
          {
            code: z.ZodIssueCode.custom,
            message:
              'Opis innego ladunku podaje się w przypadku gdy nie znajduje się odpowiednia wartość w polu OpisLadunku',
            path: []
          }
        ])
      }
      return true
    })
])

const Zamowienie = z.object({
  WartoscZamowienia: TKwotowy,
  ZamowienieWiersz: z
    .array(
      z.object({
        NrWierszaZam: z.number().positive().int(),
        UU_IDZ: z.string().max(50).optional(),
        P_7Z: z.string().max(256).optional(),
        IndeksZ: z.string().max(50).optional(),
        GTINZ: z.string().max(20).optional(),
        PKWiUZ: z.string().max(50).optional(),
        CNZ: z.string().max(50).optional(),
        PKOBZ: z.string().max(50).optional(),
        P_8AZ: z.string().max(256).optional(),
        P_8BZ: TIlosci.optional(),
        P_9AZ: TKwotowy2.optional(),
        P_11NettoZ: TKwotowy.optional(),
        P_11VatZ: TKwotowy.optional(),
        P_12Z: z.enum(StawkaPodatku).optional(),
        P_12Z_XII: TProcentowy.optional(),
        P_12Z_Zal_15: z.literal('1').optional(),
        GTUZ: TGTU.optional(),
        ProceduraZ: TOznaczenieProcedury.optional(),
        KwotaAkcyzyZ: TKwotowy.optional(),
        StanPrzedZ: z.literal('1').optional()
      })
    )
    .min(1)
    .max(10000)
})

const Fa = z
  .object({
    KodWaluty: z.enum(KodWaluty),
    P_1: Date,
    P_1M: z.string().max(256).optional(),
    P_2: z.string().max(256),
    WZ: z.array(z.string().max(256)).min(0).max(1000).optional(),
    P_6: Date.optional(),
    OkresFa: z
      .object({
        P_6_Od: Date,
        P_6_Do: Date
      })
      .refine(
        (data) =>
          data.P_6_Od !== '' && data.P_6_Do !== '' && isDate1BeforeDate2(data.P_6_Od, data.P_6_Do)
      )
      .optional(),
    P_13_1: TKwotowy.optional(),
    P_14_1: TKwotowy.optional(),
    P_14_1W: TKwotowy.optional(),
    P_13_2: TKwotowy.optional(),
    P_14_2: TKwotowy.optional(),
    P_14_2W: TKwotowy.optional(),
    P_13_3: TKwotowy.optional(),
    P_14_3: TKwotowy.optional(),
    P_14_3W: TKwotowy.optional(),
    P_13_4: TKwotowy.optional(),
    P_14_4: TKwotowy.optional(),
    P_14_4W: TKwotowy.optional(),
    P_13_5: TKwotowy.optional(),
    P_14_5: TKwotowy.optional(),
    P_13_6_1: TKwotowy.optional(),
    P_13_6_2: TKwotowy.optional(),
    P_13_6_3: TKwotowy.optional(),
    P_13_7: TKwotowy.optional(),
    P_13_8: TKwotowy.optional(),
    P_13_9: TKwotowy.optional(),
    P_13_10: TKwotowy.optional(),
    P_13_11: TKwotowy.optional(),
    P_15: TKwotowy,
    KursWalutyZ: TIlosci.optional(),
    Adnotacje: z.object({
      P_16: z.enum(['1', '2']),
      P_17: z.enum(['1', '2']),
      P_18: z.enum(['1', '2']),
      P_18A: z.enum(['1', '2']),
      Zwolnienie: z.union([
        z.object({
          P_19N: z.literal('1')
        }),
        z.object({
          P_19: z.literal('1'),
          P_19A: z.string().max(256)
        }),
        z.object({
          P_19: z.literal('1'),
          P_19B: z.string().max(256)
        }),
        z.object({
          P_19: z.literal('1'),
          P_19C: z.string().max(256)
        })
      ]),
      NoweSrodkiTransportu: z.union([
        z.object({
          P_22N: z.literal('1')
        }),
        z.object({
          P_22: z.literal('1'),
          P_42_5: z.enum(['1', '2']),
          NowySrodekTransportu: z
            .array(
              z.union([
                z
                  .object({
                    P_22A: Date,
                    P_NrWierszaNST: z.number().positive().int(),
                    P_22BMK: z.string().max(256).optional(),
                    P_22BMD: z.string().max(256).optional(),
                    P_22BK: z.string().max(256).optional(),
                    P_22BNR: z.string().max(256).optional(),
                    P_22BRP: z.string().max(256).optional(),
                    P_22B: z.string().max(256),
                    P_22B1: z.string().max(256).optional(),
                    P_22B2: z.string().max(256).optional(),
                    P_22B3: z.string().max(256).optional(),
                    P_22B4: z.string().max(256).optional(),
                    P_22BT: z.string().max(256).optional()
                  })
                  .refine(
                    (data) => {
                      const count = [data.P_22B1, data.P_22B2, data.P_22B3, data.P_22B4].filter(
                        (value) => value !== undefined
                      ).length

                      return count <= 1
                    },
                    {
                      message: 'At most one of P_22B1, P_22B2, P_22B3, or P_22B4 should be present.'
                    }
                  ),
                z.object({
                  P_22A: Date,
                  P_NrWierszaNST: z.number().positive().int(),
                  P_22BMK: z.string().max(256).optional(),
                  P_22BMD: z.string().max(256).optional(),
                  P_22BK: z.string().max(256).optional(),
                  P_22BNR: z.string().max(256).optional(),
                  P_22BRP: z.string().max(256).optional(),
                  P_22C: z.string().max(256),
                  P_22C1: z.string().max(256).optional()
                }),
                z.object({
                  P_22A: Date,
                  P_NrWierszaNST: z.number().positive().int(),
                  P_22BMK: z.string().max(256).optional(),
                  P_22BMD: z.string().max(256).optional(),
                  P_22BK: z.string().max(256).optional(),
                  P_22BNR: z.string().max(256).optional(),
                  P_22BRP: z.string().max(256).optional(),
                  P_22D: z.string().max(256),
                  P_22D1: z.string().max(256).optional()
                })
              ])
            )
            .min(0)
            .max(10000)
        })
      ]),
      P_23: z.enum(['1', '2']),
      PMarzy: z.union([
        z.object({
          P_PMarzyN: z.literal('1')
        }),
        z.union([
          z.object({
            P_PMarzy: z.literal('1'),
            P_PMarzy_2: z.literal('1')
          }),
          z.object({
            P_PMarzy: z.literal('1'),
            P_PMarzy_3_1: z.literal('1')
          }),
          z.object({
            P_PMarzy: z.literal('1'),
            P_PMarzy_3_2: z.literal('1')
          }),
          z.object({
            P_PMarzy: z.literal('1'),
            P_PMarzy_3_3: z.literal('1')
          })
        ])
      ])
    }),
    RodzajFaktury: z.enum(RodzajFaktury),
    PrzyczynaKorekty: z.string().max(256).optional(),
    TypKorekty: z.enum(TypKorekty).optional(),
    DaneFaKorygowanej: z
      .array(
        z.union([
          z.object({
            DataWystFaKorygowanej: Date,
            NrFaKorygowanej: z.string().max(256),
            NrKSeFN: z.literal('1')
          }),
          z.object({
            DataWystFaKorygowanej: Date,
            NrFaKorygowanej: z.string().max(256),
            NrKSeF: z.literal('1'),
            NrKSeFFaKorygowanej: TNumerKSeF
          })
        ])
      )
      .min(0)
      .optional(),
    OkresFaKorygowanej: z.string().max(256).optional(),
    NrFaKorygowany: z.string().max(256).optional(),
    Podmiot1K: z
      .object({
        PrefiksPodatnika: z.enum(KodyKrajowUE).optional(),
        DaneIdentyfikacyjne: z.object({
          NIP,
          Nazwa: z.string().max(512)
        }),
        Adres
      })
      .optional(),
    Podmiot2K: z
      .array(
        z.object({
          DaneIdentyfikacyjne: DaneIdentyfikacyjne_Podmiot2,
          Adres: Adres.optional(),
          IDNabywcy
        })
      )
      .min(0)
      .max(101)
      .optional(),
    P_15ZK: TKwotowy.optional(),
    KursWalutyZK: TIlosci.optional(),
    ZaliczkaCzesciowa: z
      .array(
        z.object({
          P_6Z: Date,
          P_15Z: TKwotowy,
          KursWalutyZW: TIlosci
        })
      )
      .min(0)
      .max(31)
      .optional(),
    FP: z.literal('1').optional(),
    TP: z.literal('1').optional(),
    DodatkowyOpis: z
      .array(
        z.object({
          NrWiersza: z.number().positive().int().optional(),
          Klucz: z.string().max(256),
          Wartosc: z.string().max(256)
        })
      )
      .min(0)
      .max(10000)
      .optional(),
    FakturaZaliczkowa: z
      .array(
        z.union([
          z.object({
            NrKSeFFaZaliczkowej: TNumerKSeF
          }),
          z.object({
            NrKSeFZN: z.literal('1'),
            NrFaZaliczkowej: z.string().max(256)
          })
        ])
      )
      .min(0)
      .max(100)
      .optional(),
    ZwrotAkcyzy: z.literal('1').optional(),
    FaWiersz: z
      .array(
        z.object({
          NrWierszaFa: z.number().positive().int(),
          UU_ID: z.string().max(50).optional(),
          P_6A: Date.optional(),
          P_7: z.string().max(256).optional(),
          Indeks: z.string().max(50).optional(),
          GTIN: z.string().max(20).optional(),
          PKWiU: z.string().max(50).optional(),
          CN: z.string().max(50).optional(),
          PKOB: z.string().max(50).optional(),
          P_8A: z.string().max(256).optional(),
          P_8B: TIlosci.optional(),
          P_9A: TKwotowy2.optional(),
          P_9B: TKwotowy2.optional(),
          P_10: TKwotowy2.optional(),
          P_11: TKwotowy.optional(),
          P_11A: TKwotowy.optional(),
          P_11Vat: TKwotowy.optional(),
          P_12: z.enum(StawkaPodatku).optional(),
          P_12_XII: TProcentowy.optional(),
          P_12_Zal_15: z.literal('1').optional(),
          KwotaAkcyzy: TKwotowy.optional(),
          GTU: TGTU.optional(),
          Procedura: TOznaczenieProcedury.optional(),
          KursWaluty: TIlosci.optional(),
          StanPrzed: z.literal('1').optional()
        })
      )
      .min(0)
      .max(10000),
    Rozliczenie: z
      .union([
        z.object({
          Obciazenia: z
            .array(
              z.object({
                Kwota: TKwotowy,
                Powod: z.string().max(256)
              })
            )
            .min(0)
            .max(100),
          SumaObciazen: TKwotowy.optional(),
          Odliczenia: z
            .array(
              z.object({
                Kwota: TKwotowy,
                Powod: z.string().max(256)
              })
            )
            .min(0)
            .max(100),
          SumaOdliczen: TKwotowy.optional(),
          DoRozliczenia: TKwotowy
        }),
        z.object({
          Obciazenia: z
            .array(
              z.object({
                Kwota: TKwotowy,
                Powod: z.string().max(256)
              })
            )
            .min(0)
            .max(100),
          SumaObciazen: TKwotowy.optional(),
          Odliczenia: z
            .array(
              z.object({
                Kwota: TKwotowy,
                Powod: z.string().max(256)
              })
            )
            .min(0)
            .max(100),
          SumaOdliczen: TKwotowy.optional(),
          DoZaplaty: TKwotowy
        })
      ])
      .optional(),
    Platnosc: z
      .union([
        z.object({
          Zaplacono: z.literal('1'),
          DataZaplaty: Date,
          TerminPlatnosci: z
            .array(
              z.object({
                Termin: Date,
                TerminOpis: z.string().max(256).optional()
              })
            )
            .min(0)
            .max(100)
            .optional(),
          FormaPlatnosci: z.enum(FormaPlatnosci).optional(),
          PlatnoscInna: z.literal('1').optional(),
          OpisPlatnosci: z.string().max(256).optional(),
          RachunekBankowy: z
            .array(
              z.object({
                NrRB: TNrRB,
                SWIFT: SWIFT_Type.optional(),
                RachunekWlasnyBanku: z.enum(RachunekWlasnyBanku).optional(),
                NazwaBanku: z.string().max(256).optional(),
                OpisRachunku: z.string().max(256).optional()
              })
            )
            .min(0)
            .max(100)
            .optional(),
          RachunekBankowyFaktora: z
            .array(
              z.object({
                NrRB: TNrRB,
                SWIFT: SWIFT_Type.optional(),
                RachunekWlasnyBanku: z.enum(['1', '2', '3']).optional(),
                NazwaBanku: z.string().max(256).optional(),
                OpisRachunku: z.string().max(256).optional()
              })
            )
            .min(0)
            .max(20)
            .optional(),
          Skonto: z
            .object({
              WarunkiSkonta: z.string().max(256),
              WysokoscSkonta: z.string().max(256)
            })
            .optional()
        }),
        z.object({
          ZnacznikZaplatyCzesciowej: z.literal('1'),
          ZaplataCzesciowa: z
            .array(
              z.object({
                KwotaZaplatyCzesciowej: TKwotowy,
                DataZaplatyCzesciowej: Date
              })
            )
            .min(1)
            .max(100),
          TerminPlatnosci: z
            .array(
              z.object({
                Termin: Date,
                TerminOpis: z.string().max(256).optional()
              })
            )
            .min(0)
            .max(100)
            .optional(),
          FormaPlatnosci: z.enum(FormaPlatnosci).optional(),
          PlatnoscInna: z.literal('1').optional(),
          OpisPlatnosci: z.string().max(256).optional(),
          RachunekBankowy: z
            .array(
              z.object({
                NrRB: TNrRB,
                SWIFT: SWIFT_Type.optional(),
                RachunekWlasnyBanku: z.enum(RachunekWlasnyBanku).optional(),
                NazwaBanku: z.string().max(256).optional(),
                OpisRachunku: z.string().max(256).optional()
              })
            )
            .min(0)
            .max(100)
            .optional(),
          RachunekBankowyFaktora: z
            .array(
              z.object({
                NrRB: TNrRB,
                SWIFT: SWIFT_Type.optional(),
                RachunekWlasnyBanku: z.enum(['1', '2', '3']).optional(),
                NazwaBanku: z.string().max(256).optional(),
                OpisRachunku: z.string().max(256).optional()
              })
            )
            .min(0)
            .max(20)
            .optional(),
          Skonto: z
            .object({
              WarunkiSkonta: z.string().max(256),
              WysokoscSkonta: z.string().max(256)
            })
            .optional()
        })
      ])
      .optional(),
    WarunkiTransakcji: z
      .union([
        z.object({
          Umowy: z
            .array(
              z.object({
                DataUmowy: Date.optional(),
                NrUmowy: z.string().max(256).optional()
              })
            )
            .min(0)
            .max(100),
          Zamowienia: z
            .array(
              z.object({
                DataZamowienia: Date.optional(),
                NrZamowienia: z.string().max(256).optional()
              })
            )
            .min(0)
            .max(100),
          NrPartiiTowaru: z.array(z.string().max(256)).min(0).max(1000),
          WarunkiDostawy: z.string().max(256).optional(),
          Transport: z.array(Transport).min(0).max(20),
          PodmiotPosredniczacy: z.literal('1').optional()
        }),
        z.object({
          Umowy: z
            .array(
              z.object({
                DataUmowy: Date.optional(),
                NrUmowy: z.string().max(256).optional()
              })
            )
            .min(0)
            .max(100),
          Zamowienia: z
            .array(
              z.object({
                DataZamowienia: Date.optional(),
                NrZamowienia: z.string().max(256).optional()
              })
            )
            .min(0)
            .max(100),
          NrPartiiTowaru: z.array(z.string().max(256)).min(0).max(1000),
          WarunkiDostawy: z.string().max(256).optional(),
          KursUmowny: TIlosci,
          WalutaUmowna: z.enum(KodWaluty),
          Transport: z.array(Transport).min(0).max(20),
          PodmiotPosredniczacy: z.literal('1').optional()
        })
      ])
      .optional(),
    Zamowienie: Zamowienie.optional()
  })
  .refine((data) => {
    // HANDLE P_6 AND OkresFa
    if (!data.P_6 && !data.OkresFa) {
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: 'Either P_6 or OkresFa must exist',
          path: []
        }
      ])
    }
    if (data.P_6 && data.OkresFa) {
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: 'P_6 and OkresFa cannot both exist',
          path: []
        }
      ])
    }
    // HANDLE P_13_1 TO P_14_5
    const sets = [
      ['P_13_1', 'P_14_1', 'P_14_1W'],
      ['P_13_2', 'P_14_2', 'P_14_2W'],
      ['P_13_3', 'P_14_3', 'P_14_3W'],
      ['P_13_4', 'P_14_4', 'P_14_4W'],
      ['P_13_5', 'P_14_5']
    ]

    const filledSetIndexes = sets
      .map((set, index) => {
        return set.some((prop) => !!data[prop]) ? index : -1
      })
      .filter((index) => index !== -1)

    if (filledSetIndexes.length > 1) {
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: 'Only one set of properties should be filled in.',
          path: []
        }
      ])
    }

    if (data.KursWalutyZK && !data.P_15ZK) {
      throw new z.ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: 'Pole KursWalutyZK wypełnia się jeśli pole P_15ZK jest wypełnione',
          path: []
        }
      ])
    }

    return true
  })

// STOPKA
const Stopka = z
  .object({
    Informacje: z
      .array(
        z.object({
          StopkaFaktury: z.string().max(3500).optional()
        })
      )
      .min(0)
      .max(3),
    Rejestry: z
      .array(
        z.object({
          PelnaNazwa: z.string().max(256).optional(),
          KRS: TNrKRS.optional(),
          REGON: z.string().optional(),
          BDO: z.string().max(256).optional()
        })
      )
      .min(0)
      .max(100)
  })
  .optional()

const Faktura = z.object({
  Naglowek,
  Podmiot1,
  Podmiot2,
  Podmiot3,
  PodmiotUpowazniony,
  Fa,
  Stopka
})

export { Naglowek, Podmiot1, Podmiot2, Podmiot3, PodmiotUpowazniony, Fa, Stopka, Faktura }
