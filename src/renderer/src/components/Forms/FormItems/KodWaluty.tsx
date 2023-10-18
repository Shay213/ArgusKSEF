import { useFormContext } from 'react-hook-form'
import { KodWaluty as ZKodWaluty } from '@renderer/lib/zodSchemas'
import { FormField } from '@renderer/components/ui/form'
import PopoverSearchFormItem from '../FormItems-base/PopoverSearchFormItem'

interface Props {
  optional?: boolean
}

const KodWaluty = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`KodWaluty`}
      render={({ field }): JSX.Element => (
        <PopoverSearchFormItem
          field={field}
          handleSelect={(value): void => form.setValue(`KodWaluty`, value.toUpperCase())}
          items={[...ZKodWaluty]}
          optional={optional}
          label="KodWaluty"
          placeholder="Wybierz kod waluty"
          tooltipMessage="Trzyliterowy kod waluty (ISO 4217)

          Podaje się trzyliterowy kod waluty (ISO 4217).
          W przypadku faktury wystawianej w polskiej walucie
          należy podać trzyliterowy kod waluty: „PLN”"
        />
      )}
    />
  )
}

export default KodWaluty
