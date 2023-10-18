import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  optional?: boolean
}

const FP = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name="FP"
      render={({ field }): JSX.Element => (
        <SelectFormItem
          field={field}
          items={['1']}
          label="FP"
          optional={optional}
          placeholder="Wybierz FP"
          tooltipMessage="Faktura, o której mowa w art. 109 ust. 3d ustawy [polefakultatywne]

          Podaje się „1” w celu zawarcia na fakturze informacji, że
          jest to faktura, o której mowa w art. 109 ust. 3d ustawy"
        />
      )}
    />
  )
}

export default FP
