import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const KursWalutyZ = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`KursWalutyZ`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="KursWalutyZ"
          optional={optional}
          tooltipMessage="Kurs waluty stosowany do wyliczenia kwoty podatku w
          przypadkach, o których mowa w przepisach Działu VI
          ustawy na fakturach, o których mowa w art. 106b ust. 1
          pkt 4 ustawy [pole fakultatywne]"
        />
      )}
    />
  )
}

export default KursWalutyZ
