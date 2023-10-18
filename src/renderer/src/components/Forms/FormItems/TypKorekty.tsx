import { useFormContext } from 'react-hook-form'
import { TypKorekty as ZTypKorekty } from '@renderer/lib/zodSchemas'
import { FormField } from '@renderer/components/ui/form'
import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  optional?: boolean
}

const TypKorekty = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name="TypKorekty"
      render={({ field }): JSX.Element => (
        <SelectFormItem
          field={field}
          items={[...ZTypKorekty]}
          optional={optional}
          label="TypKorekty"
          placeholder="Wybierz TypKorekty"
          tooltipMessage="Typ skutku korekty w ewidencji dla podatku od towarów
          i usług [pole fakultatywne]

          Podaje się:
          - „1” – w przypadku korekty skutkującej w dacie ujęcia
          faktury pierwotnej,
          - „2” – korekta skutkująca w dacie wystawienia faktury
          korygującej,
          - „3” - korekta skutkująca w dacie innej, w tym, gdy dla
          różnych pozycji faktury korygującej daty te są różne"
        />
      )}
    />
  )
}

export default TypKorekty
