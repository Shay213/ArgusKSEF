import { FormField } from '@renderer/components/ui/form'
import { useFormContext } from 'react-hook-form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

type Props = {
  optional?: boolean
  formFieldNamePrefix?: string
}

const NrEORI = ({ optional, formFieldNamePrefix }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`${formFieldNamePrefix ?? ''}NrEORI`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          optional={optional}
          label="NrEORI"
          tooltipMessage="Numer EORI podatnika [pole fakultatywne]

            Numer EORI jest to numer w Unijnym Systemie
            Rejestracji i Identyfikacji Podmiotów Gospodarczych."
        />
      )}
    />
  )
}

export default NrEORI
