import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const P_13_11 = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`P_13_11`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="P_13_11"
          optional={optional}
          tooltipMessage="Suma wartości sprzedaży w procedurze marży, o której
          mowa w art. 119 i art. 120 ustawy. W przypadku faktur
          zaliczkowych, kwota zaliczki. W przypadku faktur
          korygujących, kwota różnicy wartości sprzedaży [poleopcjonalne]"
        />
      )}
    />
  )
}

export default P_13_11
