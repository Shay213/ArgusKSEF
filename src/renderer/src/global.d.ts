export {}
import * as z from 'zod'
import {
  Naglowek,
  Podmiot1,
  Podmiot2,
  PodmiotUpowazniony,
  Fa,
  Stopka,
  Faktura,
  Podmiot3
} from '@renderer/lib/zodSchemas'

declare global {
  type ZNaglowek = z.infer<typeof Naglowek>
  type ZPodmiot1 = z.infer<typeof Podmiot1>
  type ZPodmiot2 = z.infer<typeof Podmiot2>
  type ZPodmiot3 = z.infer<typeof Podmiot3>
  type ZPodmiotUpowazniony = z.infer<typeof PodmiotUpowazniony>
  type ZFa = z.infer<typeof Fa>
  type ZStopka = z.infer<typeof Stopka>
  type ZFaktura = z.infer<typeof Faktura>

  interface ITemplate {
    Faktura: ZFaktura
  }

  interface XLSXZamowienie {
    NrWierszaFa: string
    P_7: string
    P_8A: string
    P_8B: string
    P_9A: string
    P_11: string
    P_12: string
    //VAT: string
    //Brutto: string
  }

  interface XLSXObj {
    DaneKontaktowe: {
      Email: string
      Telefon: string
    }
    NrFaktury: string
    DataWystFaktury: string
    Sprzedawca: {
      Kraj: string
      NIP: string
      Nazwa: string
      Ulica: string
      MiastoIKodPocztowy: string
    }
    Nabywca: {
      Kraj: string
      NIP?: string
      NrVatUE?: string
      NrID?: string
      BrakID?: '1'
      Nazwa: string
      Ulica: string
      MiastoIKodPocztowy: string
    }
    NrRef: string
    OrderNo: string
    Zamowienie: XLSXZamowienie[]
    KursEuro: string
    NrTabeli: string
    SposobPlatnosci: string
    RachunekBankowy: {
      NrRB: string
      SWIFT: string
      NazwaBanku: string
    }
    DataZaladunku: string
    TerminDostawy: string
    TerminPlatnosci: {
      Termin: string
    }
    Rejestry: {
      PelnaNazwa: string
      KRS: string
      REGON: string
      BDO: string
    }
  }

  interface IGetFormValuesRef {
    getFromValues: () => ZFa | ZPodmiot1 | ZPodmiot2 | ZPodmiot3 | ZStopka
  }

  type InputTypes = 'input' | 'textarea' | 'calendar' | 'select' | 'select-search'

  interface FormTableItemNode {
    label: string
    type?: InputTypes
    tooltip?: string
    inputType?: string
    optional?: boolean
    handleSelectValue?: (value: string | Date | number) => string
    items?: string[]
  }

  interface StructureObj {
    nodes: FormTableItemNode[]
  }
}
