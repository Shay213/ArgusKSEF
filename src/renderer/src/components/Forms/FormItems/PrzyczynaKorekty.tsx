import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const PrzyczynaKorekty = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name="PrzyczynaKorekty"
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="PrzyczynaKorekty"
          optional={optional}
          tooltipMessage="Przyczyna korekty [pole fakultatywne]

          Zgodnie z art. 106j ust. 2a pkt 2 ustawy faktura
          korygująca może zawierać przyczynę wystawienia faktury
          korygującej.

          Fakturę korygującą można wystawić w przypadku
          korygowania obligatoryjnych, opcjonalnych jak i
          fakultatywnych elementów faktury."
        />
      )}
    />
  )
}

export default PrzyczynaKorekty
