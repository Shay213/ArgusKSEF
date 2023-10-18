import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const P_15 = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`P_15`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="P_15"
          optional={optional}
          tooltipMessage="Kwota należności ogółem. W przypadku faktur
          zaliczkowych - kwota zapłaty dokumentowana fakturą. W
          przypadku faktur, o których mowa w art. 106f ust. 3
          ustawy - kwota pozostała do zapłaty. W przypadku faktur
          korygujących - korekta kwoty wynikającej z faktury
          korygowanej. W przypadku, o którym mowa w art. 106j
          ust. 3 ustawy - korekta kwot wynikających z faktur
          korygowanych"
        />
      )}
    />
  )
}

export default P_15
