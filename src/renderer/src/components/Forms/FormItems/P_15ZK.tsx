import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const P_15ZK = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name="P_15ZK"
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="P_15ZK"
          optional={optional}
          tooltipMessage="W przypadku korekt faktur zaliczkowych, kwota zapłaty
          przed korektą. W przypadku korekt faktur, o których
          mowa w art. 106f ust. 3 ustawy, kwota pozostała do
          zapłaty przed korektą"
        />
      )}
    />
  )
}

export default P_15ZK
