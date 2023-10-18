import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const P_13_8 = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`P_13_8`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="P_13_8"
          optional={optional}
          tooltipMessage="Suma wartości sprzedaży w przypadku dostawy towarów
          oraz świadczenia usług poza terytorium kraju, z
          wyłączeniem kwot wykazanych w polach P_13_5 i
          P_13_9. W przypadku faktur zaliczkowych, kwota zaliczki.
          W przypadku faktur korygujących, kwota różnicy
          wartości sprzedaży [pole opcjonalne]

          Przykład:
          W polu P_13_8 ujmuje się m.in. sumę wartości
          świadczenia usług poza terytorium kraju w przypadku,
          gdy miejsce opodatkowania ustala się na podstawie art.
          28e ustawy i transakcja nie podlega rozliczeniu w ramach
          procedury unijnej OSS."
        />
      )}
    />
  )
}

export default P_13_8
