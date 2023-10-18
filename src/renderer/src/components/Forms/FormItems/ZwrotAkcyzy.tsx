import { FormField } from '@renderer/components/ui/form'
import { useFormContext } from 'react-hook-form'
import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  optional?: boolean
}

const ZwrotAkcyzy = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name="ZwrotAkcyzy"
      render={({ field }): JSX.Element => (
        <SelectFormItem
          field={field}
          items={['1']}
          label="ZwrotAkcyzy"
          optional={optional}
          placeholder="Wybierz ZwrotAkcyzy"
          tooltipMessage="Informacja dodatkowa niezbędna dla rolników
          ubiegających się o zwrot podatku akcyzowego zawartego
          w cenie oleju napędowego [pole fakultatywne]

          Podaje się „1” w celu zawarcia na fakturze informacji
          dodatkowej dotyczącej zwrotu akcyzy, niezbędnej dla
          rolników ubiegających się o zwrot podatku akcyzowego
          zawartego w cenie oleju napędowego."
        />
      )}
    />
  )
}

export default ZwrotAkcyzy
