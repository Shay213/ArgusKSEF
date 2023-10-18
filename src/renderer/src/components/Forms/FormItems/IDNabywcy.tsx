import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
  formFieldNamePrefix?: string
}

const IDNabywcy = ({ optional, formFieldNamePrefix }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`${formFieldNamePrefix ?? ''}IDNabywcy`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          optional={optional}
          label="IDNabywcy"
          tooltipMessage="Unikalny klucz powiązania danych nabywcy na fakturach
          korygujących, w przypadku gdy dane nabywcy na
          fakturze korygującej zmieniły się w stosunku do danych
          na fakturze korygowanej [pole fakultatywne]"
        />
      )}
    />
  )
}

export default IDNabywcy
