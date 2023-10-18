import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const P_13_10 = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`P_13_10`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="P_13_10"
          optional={optional}
          tooltipMessage="Suma wartości sprzedaży w procedurze odwrotnego
          obciążenia, dla której podatnikiem jest nabywca zgodnie
          z art. 17 ust. 1 pkt 7 i 8 ustawy oraz innych przypadków
          odwrotnego obciążenia występujących w obrocie
          krajowym. W przypadku faktur zaliczkowych, kwota
          zaliczki. W przypadku faktur korygujących, kwota różnicy,
          o której mowa w art. 106j ust. 2 pkt 5 ustawy [pole
          opcjonalne]

          Pozostawienie w strukturze, odwołania do uchylonego z
          dniem 1 listopada 2019 r. – art. 17 ust. 1 pkt 7 i 8 ustawy
          jest podyktowane mogącymi pojawić się np. po 1 lipca
          2024 r. tj. w okresie obligatoryjnego KSeF, korektami
          faktur pierwotnych (wówczas co do zasady wszystkie
          faktury korygujące będą wystawiane w KSeF, również te
          w przypadku których, faktura pierwotna była wystawiona
          poza KSeF).

          Przykład:
          W polu P_13_10 ujmuje się m. in. sumę wartości
          sprzedaży w procedurze odwrotnego obciążenia
          występującego w obrocie krajowym na podstawie
          przepisu epizodycznego - art. 145e ust. 1 ustawy."
        />
      )}
    />
  )
}

export default P_13_10
