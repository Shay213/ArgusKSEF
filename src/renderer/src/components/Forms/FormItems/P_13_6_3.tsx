import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const P_13_6_3 = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`P_13_6_3`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="P_13_6_3"
          optional={optional}
          tooltipMessage="Suma wartości sprzedaży objętej stawką 0% w przypadku
          eksportu. W przypadku faktur zaliczkowych, kwota
          zaliczki. W przypadku faktur korygujących, kwota różnicy,
          o której mowa w art. 106j ust. 2 pkt 5 ustawy [pole opcjonalne]"
        />
      )}
    />
  )
}

export default P_13_6_3
