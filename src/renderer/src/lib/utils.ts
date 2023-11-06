import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isObject, isEmpty, isArray, omitBy } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const isDate1BeforeDate2 = (date1: string, date2: string): boolean => {
  const re = /((\d{4})-(\d{2})-(\d{2}))/
  if (!re.test(date1) || !re.test(date2)) {
    throw new Error('Accepts date in format yyyy-mm-dd')
  }
  return new Date(date1) < new Date(date2)
}

export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Month is 0-based
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const removeLastDot = (str: string): string => {
  return str[str.length - 1] === '.' && str.length > 1 ? str.slice(0, str.length - 1) : str
}

export const filterEmptyValues = (arr: unknown[]): unknown[] => {
  return arr.filter((item) => {
    if (Array.isArray(item)) {
      return item.length > 0
    } else if (typeof item === 'string') {
      return item.trim() !== ''
    } else if (typeof item === 'number') {
      return item !== 0
    } else {
      return item !== null && item !== undefined
    }
  })
}

export const getUniqueId = (): string => uuidv4()

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

export function safeParseFloat(val: string | number): number {
  if (typeof val === 'number') {
    return val
  }
  const parsed = parseFloat(val)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function calculateVAT(nettoAmount: number, vat: string): number {
  const parsedVat = parseInt(vat)

  if (!Number.isNaN(parsedVat)) {
    const vatAmount = (nettoAmount * parsedVat) / 100
    return vatAmount
  } else {
    return 0
  }
}

export function calculateBrutto(nettoAmount: number, vat: string): number {
  const parsedVat = parseInt(vat)

  if (!Number.isNaN(parsedVat)) {
    const vatAmount = calculateVAT(nettoAmount, vat)
    const bruttoAmount = nettoAmount + vatAmount
    return bruttoAmount
  } else {
    return 0
  }
}

export const polishCountryToCode = (countryName: string): string => {
  const countryCodes = {
    Afganistan: 'AF',
    Alandy: 'AX',
    Albania: 'AL',
    Algieria: 'DZ',
    Andora: 'AD',
    Angola: 'AO',
    Anguilla: 'AI',
    Antarktyka: 'AQ',
    'Antigua i Barbuda': 'AG',
    'Antyle Holenderskie': 'AN',
    'Arabia Saudyjska': 'SA',
    Argentyna: 'AR',
    Armenia: 'AM',
    Aruba: 'AW',
    Australia: 'AU',
    Austria: 'AT',
    Azerbejdżan: 'AZ',
    Bahamy: 'BS',
    Bahrajn: 'BH',
    Bangladesz: 'BD',
    Barbados: 'BB',
    Belgia: 'BE',
    Belize: 'BZ',
    Benin: 'BJ',
    Bermudy: 'BM',
    Bhutan: 'BT',
    Białoruś: 'BY',
    Boliwia: 'BO',
    Bonaire: 'BQ',
    'Bośnia i Hercegowina': 'BA',
    Botswana: 'BW',
    Brazylia: 'BR',
    Brunei: 'BN',
    'Brytyjskie Terytorium Oceanu Indyjskiego': 'IO',
    Bułgaria: 'BG',
    'Burkina Faso': 'BF',
    Burundi: 'BI',
    'Ceuta i Melilla': 'XC',
    Chile: 'CL',
    Chiny: 'CN',
    Chorwacja: 'HR',
    Curaçao: 'CW',
    Cypr: 'CY',
    Czad: 'TD',
    Czarnogóra: 'ME',
    Dania: 'DK',
    Dominika: 'DM',
    Dominikana: 'DO',
    Dżibuti: 'DJ',
    Egipt: 'EG',
    Ekwador: 'EC',
    Erytrea: 'ER',
    Estonia: 'EE',
    Eswatini: 'SZ',
    Etiopia: 'ET',
    Falklandy: 'FK',
    Fidżi: 'FJ',
    Filipiny: 'PH',
    Finlandia: 'FI',
    Francja: 'FR',
    'Francuskie Terytoria Południowe i Antarktyczne': 'TF',
    Gabon: 'GA',
    Gambia: 'GM',
    Ghana: 'GH',
    Gibraltar: 'GI',
    Grecja: 'GR',
    Grenada: 'GD',
    Grenlandia: 'GL',
    Gruzja: 'GE',
    Guam: 'GU',
    Guernsey: 'GG',
    Gujana: 'GY',
    'Gujana Francuska': 'GF',
    Gwadelupa: 'GP',
    Gwatemala: 'GT',
    Gwinea: 'GN',
    'Gwinea Bissau': 'GW',
    Haiti: 'HT',
    Hiszpania: 'ES',
    Honduras: 'HN',
    Hongkong: 'HK',
    Indie: 'IN',
    Indonezja: 'ID',
    Irak: 'IQ',
    Iran: 'IR',
    Irlandia: 'IE',
    Islandia: 'IS',
    Izrael: 'IL',
    Jamajka: 'JM',
    Japonia: 'JP',
    Jemen: 'YE',
    Jersey: 'JE',
    Jordania: 'JO',
    Kajmany: 'KY',
    Kambodża: 'KH',
    Kamerun: 'CM',
    Kanada: 'CA',
    Katar: 'QA',
    Kazachstan: 'KZ',
    Kenia: 'KE',
    Kirgistan: 'KG',
    Kiribati: 'KI',
    Kolumbia: 'CO',
    Komory: 'KM',
    Kongo: 'CG',
    'Kongo (Demokratyczna Republika Konga)': 'CD',
    'Korea Północna': 'KP',
    Kosowo: 'XK',
    Kostaryka: 'CR',
    Kuba: 'CU',
    Kuwejt: 'KW',
    Laos: 'LA',
    Lesotho: 'LS',
    Liban: 'LB',
    Liberia: 'LR',
    Libia: 'LY',
    Liechtenstein: 'LI',
    Litwa: 'LT',
    Łotwa: 'LV',
    Luksemburg: 'LU',
    'Macedonia Północna': 'MK',
    Madagaskar: 'MG',
    Majotta: 'YT',
    Makau: 'MO',
    Malawi: 'MW',
    Malediwy: 'MV',
    Malezja: 'MY',
    Mali: 'ML',
    Malta: 'MT',
    'Mariany Północne': 'MP',
    Maroko: 'MA',
    Martynika: 'MQ',
    Mauretania: 'MR',
    Mauritius: 'MU',
    Meksyk: 'MX',
    Mikronezja: 'XL',
    'Wyspy Dziewicze Stanów Zjednoczonych': 'UM',
    Mołdawia: 'MD',
    Monako: 'MC',
    Mongolia: 'MN',
    Montserrat: 'MS',
    Mozambik: 'MZ',
    Mjanma: 'MM',
    Namibia: 'NA',
    Nauru: 'NR',
    Nepal: 'NP',
    Holandia: 'NL',
    Niemcy: 'DE',
    Niger: 'NE',
    Nigeria: 'NG',
    Nikaragua: 'NI',
    Niue: 'NU',
    Norfolk: 'NF',
    Norwegia: 'NO',
    'Nowa Kaledonia': 'NC',
    'Nowa Zelandia': 'NZ',
    'Terytoria Palestyńskie': 'PS',
    Oman: 'OM',
    Pakistan: 'PK',
    Palau: 'PW',
    Panama: 'PA',
    'Papua-Nowa Gwinea': 'PG',
    Paragwaj: 'PY',
    Peru: 'PE',
    Pitcairn: 'PN',
    'Polinezja Francuska': 'PF',
    Polska: 'PL',
    'Półwysep Kanaryjski': 'ES',
    Portugalia: 'PT',
    Portoryko: 'PR',
    'Republika Środkowoafrykańska': 'CF',
    'Republika Czeska': 'CZ',
    'Republika Południowej Afryki': 'ZA',
    Reunion: 'RE',
    Rosja: 'RU',
    Rumunia: 'RO',
    Rwanda: 'RW',
    'Sahara Zachodnia': 'EH',
    'Saint-Barthélemy': 'BL',
    'Saint Kitts i Nevis': 'KN',
    'Saint Lucia': 'LC',
    'Saint Martin (francuska część)': 'MF',
    'Saint Vincent i Grenadyny': 'VC',
    Salwador: 'SV',
    Samoa: 'WS',
    'Samoa Amerykańskie': 'AS',
    'San Marino': 'SM',
    Senegal: 'SN',
    Serbia: 'RS',
    Seszele: 'SC',
    'Sierra Leone': 'SL',
    Singapur: 'SG',
    Słowacja: 'SK',
    Słowenia: 'SI',
    Somalia: 'SO',
    'Sri Lanka': 'LK',
    'Saint Pierre i Miquelon': 'PM',
    'Stany Zjednoczone': 'US',
    Suazi: 'SZ',
    Sudan: 'SD',
    'Sudan Południowy': 'SS',
    Surinam: 'SR',
    'Svalbard i Jan Mayen': 'SJ',
    'Saint Helena': 'SH',
    Syria: 'SY',
    Szwajcaria: 'CH',
    Szwecja: 'SE',
    Tadżykistan: 'TJ',
    Tajlandia: 'TH',
    Tajwan: 'TW',
    Tanzania: 'TZ',
    Togo: 'TG',
    Tokelau: 'TK',
    Tonga: 'TO',
    'Trynidad i Tobago': 'TT',
    Tunezja: 'TN',
    Turcja: 'TR',
    Turkmenistan: 'TM',
    Tuvalu: 'TV',
    Uganda: 'UG',
    Ukraina: 'UA',
    Urugwaj: 'UY',
    Uzbekistan: 'UZ',
    Vanuatu: 'VU',
    'Wallis i Futuna': 'WF',
    Watykan: 'VA',
    Węgry: 'HU',
    Wenezuela: 'VE',
    'Wielka Brytania': 'GB',
    Wietnam: 'VN',
    Włochy: 'IT',
    'Wschodni Timor': 'TL',
    'Wybrzeże Kości Słoniowej': 'CI',
    'Wyspa Bouveta': 'BV',
    'Wyspa Bożego Narodzenia': 'CX',
    'Wyspa Man': 'IM',
    'Sint Maarten': 'SX',
    'Wyspy Cooka': 'CK',
    'Wyspy Dziewicze Wielkiej Brytanii': 'VG',
    'Wyspy Heard i McDonalda': 'HM',
    'Wyspy Kokosowe': 'CC',
    'Wyspy Marshalla': 'MH',
    'Wyspy Owcze': 'FO',
    'Wyspy Salomona': 'SB',
    'Wyspy Świętego Tomasza i Książęca': 'ST',
    'Wyspy Turks i Caicos': 'TC',
    Zambia: 'ZM',
    'Wyspy Zielonego Przylądka': 'CV',
    Zimbabwe: 'ZW',
    'Zjednoczone Emiraty Arabskie': 'AE'
  }

  // Convert the country name to title case and remove any leading/trailing spaces
  const cleanedCountryName = countryName
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.substr(1))

  // Check if the country name exists in the dictionary
  // eslint-disable-next-line no-prototype-builtins
  if (countryCodes.hasOwnProperty(cleanedCountryName)) {
    return countryCodes[cleanedCountryName]
  } else {
    // Return an error or default value if the country name is not found
    return 'Unknown'
  }
}

export const cleanObject = <T>(obj: T): T => {
  if (isObject(obj) && !isArray(obj)) {
    const cleanedObj: Partial<T> = {} as Partial<T>

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cleanedObj[key] = cleanObject(obj[key])
      }
    }

    return omitBy(cleanedObj, (value) => isEmpty(value) && value !== false) as T
  } else if (isArray(obj)) {
    return obj.map((item) => cleanObject(item)) as T
  }
  return obj
}
