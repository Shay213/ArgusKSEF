import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const P_13_7 = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`P_13_7`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="P_13_7"
          optional={optional}
          tooltipMessage="Suma wartości sprzedaży zwolnionej od podatku. W
          przypadku faktur zaliczkowych, kwota zaliczki. W
          przypadku faktur korygujących, kwota różnicy wartości
          sprzedaży [pole opcjonalne]"
        />
      )}
    />
  )
}

export default P_13_7
