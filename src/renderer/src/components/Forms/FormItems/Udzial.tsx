import { FormField } from '@renderer/components/ui/form'
import { useFormContext } from 'react-hook-form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
  formFieldNamePrefix?: string
}

const Udzial = ({ optional, formFieldNamePrefix }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`${formFieldNamePrefix ?? ''}Udzial`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="Udzial"
          optional={optional}
          tooltipMessage="Udział dodatkowego nabywcy

          Podaje się procentowy udział dodatkowego nabywcy. Różnica
          pomiędzy wartością 100%, a sumą udziałów dodatkowych
          nabywców jest udziałem nabywcy wymienionego w części
          Podmiot2. W przypadku niewypełnienia pola przyjmuje się, że
          udziały występujących na fakturze nabywców są równe [pole
          fakultatywne].

          Udzial może być wskazany wyłącznie w przypadku, gdy pole Rola
          przyjmuje wartość „4”."
          type="number"
        />
      )}
    />
  )
}

export default Udzial
