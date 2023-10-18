import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const KursWalutyZK = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name="KursWalutyZK"
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="KursWalutyZK"
          optional={optional}
          tooltipMessage="Kurs waluty stosowany do wyliczenia kwoty podatku w
          przypadkach, o których mowa w Dziale VI ustawy, przed
          korektą, w przypadku gdy podatnik wystawia fakturę
          korygującą do faktury zaliczkowej [pole fakultatywne]"
        />
      )}
    />
  )
}

export default KursWalutyZK
