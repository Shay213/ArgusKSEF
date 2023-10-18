import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
  formFieldNamePrefix?: string
}

const NrKlienta = ({ optional, formFieldNamePrefix }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`${formFieldNamePrefix ?? ''}NrKlienta`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="NrKlienta"
          optional={optional}
          tooltipMessage="Numer klienta dla przypadków, w których nabywca
          posługuje się nim w umowie lub zamówieniu [polefakultatywne]"
        />
      )}
    />
  )
}

export default NrKlienta
