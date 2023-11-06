import getTemplateFile from './getTemplateFile'
import convertXLSXToObj from './convertXLSXToObj'
import {
  calculateBrutto,
  calculateVAT,
  cleanObject,
  formatDateToYYYYMMDD,
  safeParseFloat
} from '@renderer/lib/utils'
import FakturaMapping from '@renderer/mappings/FakturaMapping'
import objectMapper from 'object-mapper'
import convertFakturaToXML from './convertFakturaToXML'

interface CreateXMLReturnType {
  ksefXML: string
  nrFaktury: string
}

const createXML = async (pathToXlsx: string): Promise<CreateXMLReturnType> => {
  const template = await getTemplateFile()
  const workbook = window.api.readXlsx(pathToXlsx)
  const xlsxObj = convertXLSXToObj(workbook)

  const today = new Date()
  const DataWytworzeniaFaIso = today.toISOString()
  const DataWytworzeniaFa = formatDateToYYYYMMDD(today)
  const nrFaktury = xlsxObj.NrFaktury?.split('/')?.[1]
    ? xlsxObj.NrFaktury?.split('/')?.[0]
    : xlsxObj.NrFaktury

  const source = { ...xlsxObj, DataWytworzeniaFaIso, DataWytworzeniaFa }

  const mappedTemplate = objectMapper(source, template, FakturaMapping) as ITemplate
  const mappedTemplateWithTotals = assignTotalValues(mappedTemplate)
  const cleaned = cleanObject(mappedTemplateWithTotals)
  const ksefXML = convertFakturaToXML(cleaned.Faktura)

  return {
    ksefXML,
    nrFaktury
  }
}

function assignTotalValues(mappedTemplate: ITemplate): ITemplate {
  const copyMappedTemplate: ITemplate = { ...mappedTemplate }
  const pozycje = copyMappedTemplate.Faktura.Fa.FaWiersz

  const groupedData = pozycje.reduce((prev, curr) => {
    const groupKey = curr.P_12

    if (!prev[groupKey]) {
      prev[groupKey] = []
    }

    prev[groupKey].push(curr)

    return prev
  }, {})

  const groups = Object.values(groupedData)

  const totals = groups.map((group) =>
    group.reduce(
      (prev, curr) => {
        const parsedP_11 = safeParseFloat(curr.P_11)
        const parsedKwotaNetto = safeParseFloat(prev.KwotaNetto)
        const currNetto = parsedP_11 + parsedKwotaNetto
        return {
          StawkaPodatku: curr.P_12,
          KwotaNetto: currNetto.toFixed(2),
          KwotaPodatku: calculateVAT(currNetto, curr.P_12).toFixed(2),
          KwotaBrutto: calculateBrutto(currNetto, curr.P_12).toFixed(2)
        }
      },
      { StawkaPodatku: '', KwotaNetto: 0, KwotaPodatku: 0, KwotaBrutto: 0 }
    )
  )

  const totalsSum = totals.reduce(
    (prev, curr) => {
      return {
        KwotaNetto: (safeParseFloat(prev.KwotaNetto) + safeParseFloat(curr.KwotaNetto)).toFixed(2),
        KwotaPodatku: (
          safeParseFloat(prev.KwotaPodatku) + safeParseFloat(curr.KwotaPodatku)
        ).toFixed(2),
        KwotaBrutto: (safeParseFloat(prev.KwotaBrutto) + safeParseFloat(curr.KwotaBrutto)).toFixed(
          2
        )
      }
    },
    { KwotaNetto: 0, KwotaPodatku: 0, KwotaBrutto: 0 }
  )

  return {
    ...mappedTemplate,
    Faktura: {
      ...mappedTemplate.Faktura,
      Fa: {
        ...mappedTemplate.Faktura.Fa,
        P_13_1: totalsSum.KwotaNetto,
        P_14_1: totalsSum.KwotaPodatku,
        P_15: totalsSum.KwotaBrutto
      }
    }
  }
}

export default createXML
