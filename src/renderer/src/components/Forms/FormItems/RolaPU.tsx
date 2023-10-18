import { FormField } from '@renderer/components/ui/form'
import { RolaPU as ZRolaPU } from '@renderer/lib/zodSchemas'
import { useFormContext } from 'react-hook-form'
import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  optional?: boolean
}

const RolaPU = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`RolaPU`}
      render={({ field }): JSX.Element => (
        <SelectFormItem
          field={field}
          items={[...ZRolaPU]}
          label="RolaPU"
          optional={optional}
          placeholder="Wybierz RolaPU"
          tooltipMessage={`Rola podmiotu upoważnionego wystawiającego

          Podaje się:
          - „1" - Organ egzekucyjny - w przypadku, o którym
          mowa w art. 106c pkt 1 ustawy,
          - „2" - Komornik sądowy - w przypadku, o którym mowa
          w art. 106c pkt 2 ustawy,
          - „3" - Przedstawiciel podatkowy - w przypadku, gdy na
          fakturze występują dane przedstawiciela podatkowego,
          o którym mowa w przepisach art. 18a – 18d ustawy.`}
        />
      )}
    />
  )
}

export default RolaPU
