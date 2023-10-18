import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const P_1M = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`P_1M`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="P_1M"
          optional={optional}
          tooltipMessage="Miejsce wystawienia faktury [pole fakultatywne]"
        />
      )}
    />
  )
}

export default P_1M
