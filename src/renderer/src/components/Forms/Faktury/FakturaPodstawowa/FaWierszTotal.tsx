import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'
import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'

interface Total {
  KwotaNetto: string
  KwotaPodatku: string
  KwotaBrutto: string
}

const FaWierszTotal = ({
  control,
  setTotal
}: {
  setTotal: (total: Total) => void
}): JSX.Element => {
  const arr = useWatch({
    control: control,
    name: 'FaWiersz'
  })

  const groupedData = arr.reduce((prev, curr) => {
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

  /*
    When I registered inputs and gave them values from totalsSum
    it did not change the value of the input, not sure what the problem is
    as a temp solution I will assign total values when submiting form
  */

  useEffect(() => {
    setTotal(totalsSum)
  }, [totalsSum])

  return (
    <div className="mt-5">
      <h2 className="font-semibold text-lg">Podsumowanie stawek podatku: </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">L.p.</TableHead>
            <TableHead>Stawka podatku</TableHead>
            <TableHead>Kwota netto</TableHead>
            <TableHead>Kwota podatku</TableHead>
            <TableHead>Kwota brutto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totals.map((total, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              {Object.values(total).map((val, j) => (
                <TableCell key={i + j}>{val}</TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-semibold">SUMA:</TableCell>
            <TableCell></TableCell>
            {Object.values(totalsSum).map((val, i) => (
              <TableCell key={i} className="font-semibold">
                {val}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

function safeParseFloat(val: string | number): number {
  if (typeof val === 'number') {
    return val
  }
  const parsed = parseFloat(val)
  return Number.isNaN(parsed) ? 0 : parsed
}

function calculateVAT(nettoAmount: number, vat: string): number {
  const parsedVat = parseInt(vat)

  if (!Number.isNaN(parsedVat)) {
    const vatAmount = (nettoAmount * parsedVat) / 100
    return vatAmount
  } else {
    return 0
  }
}

function calculateBrutto(nettoAmount: number, vat: string): number {
  const parsedVat = parseInt(vat)

  if (!Number.isNaN(parsedVat)) {
    const vatAmount = calculateVAT(nettoAmount, vat)
    const bruttoAmount = nettoAmount + vatAmount
    return bruttoAmount
  } else {
    return 0
  }
}

export default FaWierszTotal
