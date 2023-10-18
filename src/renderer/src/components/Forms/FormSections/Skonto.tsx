import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import FormSection from '../FormItems-base/FormSection'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const Skonto = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormSection
      title="Skonto"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane w zakresie skonta (warunki
        oraz wysokość skonta) [element fakultatywny]"
    >
      <div className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name={`${formFieldNamePrefix ?? ''}Skonto.WarunkiSkonta`}
          render={({ field }): JSX.Element => (
            <BasicFormItem
              field={field}
              label="WarunkiSkonta"
              tooltipMessage="Warunki, które nabywca powinien spełnić, aby skorzystać
              ze skonta

              Przykład:
              „płatność w ciągu 7 dni od dnia wystawienia faktury”"
            />
          )}
        />
        <FormField
          control={form.control}
          name={`${formFieldNamePrefix ?? ''}Skonto.WysokoscSkonta`}
          render={({ field }): JSX.Element => (
            <BasicFormItem
              field={field}
              label="WysokoscSkonta"
              tooltipMessage="Wysokość skonta

              Przykład:
              „3% kwoty należności (brutto) wynikającej z faktury”
              "
            />
          )}
        />
      </div>
    </FormSection>
  )
}

export default Skonto
