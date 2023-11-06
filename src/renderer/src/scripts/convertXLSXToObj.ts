import { WorkBook, utils } from 'xlsx'
import { filterEmptyValues, polishCountryToCode } from '@renderer/lib/utils'
import format from 'date-fns/format'

const Platnosc = {
  gotowka: '1',
  karta: '2',
  bon: '3',
  czek: '4',
  kredyt: '5',
  przelew: '6',
  'platnosc mobilna': '7'
}

const convertXLSXToObj = (workbook: WorkBook): XLSXObj => {
  const sheets = Object.keys(workbook.Sheets)
  const sheet = workbook.Sheets[sheets[0]]
  const data = utils.sheet_to_json(sheet, {
    blankrows: false,
    header: 1,
    dateNF: 'yyyy-mm--dd'
  }) as (string | number | null)[][]
  const clearedData = filterEmptyValues(data.map((item) => filterEmptyValues(item))) as (
    | string
    | number
  )[][]

  const Tel = clearedData[0][1] as string
  const Email = clearedData[2][1] as string
  const NrFaktury = clearedData[4][0] as string
  const DataWystFaktury = clearedData[5][0] as number
  const Sprzedawca = {
    Nazwa: clearedData[7][0] as string,
    Ulica: clearedData[8][0] as string,
    MiastoIKodPocztowy: clearedData[9][0] as string,
    Kraj: clearedData[10][0] as string,
    NIP: clearedData[11][0] as string
  }
  const Nabywca = {
    Nazwa: clearedData[7][1] as string,
    Ulica: clearedData[8][1] as string,
    MiastoIKodPocztowy: clearedData[9][1] as string,
    Kraj: clearedData[10][1] as string,
    ID: clearedData?.[11]?.[1] as string | undefined | null
  }
  const NrRef = clearedData[12][0] as string
  const OrderNo = clearedData[12][1] as string

  const PierwszyWierszZam = 16
  const OstatniWierszZam = clearedData.findIndex((item) =>
    item.some((item2) => (typeof item2 === 'string' ? /Wartość faktury/i.test(item2) : false))
  )

  const Zamowienie = clearedData.slice(PierwszyWierszZam, OstatniWierszZam)

  const KursEuro = clearedData[OstatniWierszZam + 3][2] as number
  const NrTabeli = clearedData[OstatniWierszZam + 4][0] as string
  const SposobPlatnosci = clearedData[OstatniWierszZam + 6][0] as string
  const KontoBankowe = clearedData[OstatniWierszZam + 7][0] as string
  const DataZaladunku = clearedData[OstatniWierszZam + 8][1] as number
  const TerminDostawy = clearedData[OstatniWierszZam + 8][1] as number
  const TerminZaplaty = clearedData[OstatniWierszZam + 9][1] as number
  const Stopka = [...clearedData[OstatniWierszZam + 13], ...clearedData[OstatniWierszZam + 14]]

  const accountNumberRegex = /PL\s?(\d{2}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4}\s\d{4})/
  const bankNameRegex = /Konto nr: (.+?)(?: PL)/
  const swiftCodeRegex = /BIC CODE \(SWIFT\): ([A-Z0-9]+)/

  // Extract the account number
  const accountNumberMatch = KontoBankowe.match(accountNumberRegex)
  // Extract the bank name
  const bankNameMatch = KontoBankowe.match(bankNameRegex)
  // Extract the SWIFT/BIC code
  const swiftCodeMatch = KontoBankowe.match(swiftCodeRegex)

  // Regular expressions to match Regon, BDO, and KRS numbers
  const krsRegex = /KRS\s*:?[^0-9]*(\d+)/
  const bdoRegex = /BDO[^0-9]*(\d+)/
  const regonRegex = /Regon\s*:?[^0-9]*(\d+)/

  const StopkaText = [Stopka[0], Stopka[1]].join()

  return {
    DaneKontaktowe: {
      Email,
      Telefon: Tel.replace(/\(\+48\)/, '').replace(/\s+/g, '')
    },
    NrFaktury: NrFaktury.replace(/nr/i, '').trim(),
    DataWystFaktury: xlsxNumToDateStr(DataWystFaktury),
    Sprzedawca: {
      ...Sprzedawca,
      Kraj: polishCountryToCode(Sprzedawca.Kraj),
      NIP: Sprzedawca.NIP.split(':')[1].trim()
    },
    Nabywca: {
      ...Nabywca,
      Kraj: polishCountryToCode(Nabywca.Kraj),
      ...processNabywcaID(Nabywca.ID + '')
    },
    NrRef: NrRef.split(':')[1].trim(),
    OrderNo: OrderNo.split(':')[1].trim(),
    Zamowienie: processZamowienie(Zamowienie),
    KursEuro: KursEuro + '',
    NrTabeli: NrTabeli.replace(/Tabela nr/i, '').trim(),
    SposobPlatnosci: Platnosc[SposobPlatnosci.split(':')[1].trim().toLowerCase()],
    RachunekBankowy: {
      NrRB: accountNumberMatch?.[0]?.replace(/\s+/g, '') ?? '',
      SWIFT: swiftCodeMatch?.[1] ?? '',
      NazwaBanku: bankNameMatch?.[1]?.trim() ?? ''
    },
    DataZaladunku: xlsxNumToDateStr(DataZaladunku),
    TerminDostawy: xlsxNumToDateStr(TerminDostawy),
    TerminPlatnosci: {
      Termin: xlsxNumToDateStr(TerminZaplaty)
    },
    Rejestry: {
      PelnaNazwa: Sprzedawca.Nazwa,
      KRS: StopkaText.match(krsRegex)?.[1] ?? '',
      REGON: StopkaText.match(regonRegex)?.[1] ?? '',
      BDO: StopkaText.match(bdoRegex)?.[1] ?? ''
    }
  }
}

function processNabywcaID(id: string | null | undefined): Record<string, string> {
  const NIPRegex = /^\d{10}$/
  //const NrVatUERegex = /(\d|[A-Z]|\+|\*){1,12}/
  if (!id) {
    return { NIP: '' }
  }
  // For now make it just NIP
  return { NIP: NIPRegex.test(id) ? id : '' }
}

function xlsxNumToDateStr(n: number): string {
  return format(new Date((n - 25569) * 86400 * 1000), 'yyyy-MM-dd')
}

function processZamowienie(Zamowienie: (string | number)[][]): XLSXZamowienie[] {
  // lp opis ilosc cena netto vat brutto
  const processValue = (val: string | number): string => {
    if (typeof val === 'string') {
      return val
    }
    return val.toFixed(2) + ''
  }

  return Zamowienie.map(
    (item) =>
      ({
        NrWierszaFa: item[0] + '',
        P_7: item[1],
        P_8A: 'sztuka',
        P_8B: processValue(item[2]),
        P_9A: processValue(item[3]),
        P_11: processValue(item[4]),
        P_12: '23'
      }) as XLSXZamowienie
  )
}

export default convertXLSXToObj
