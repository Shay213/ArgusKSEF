import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const P_2 = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`P_2`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="P_2"
          optional={optional}
          tooltipMessage="Kolejny numer faktury, nadany w ramach jednej lub
          więcej serii, który w sposób jednoznaczny identyfikuje fakturę

          Nie należy utożsamiać kolejnego numeru faktury, o
          którym mowa w polu P_2 z numerem identyfikującym
          fakturę w KSeF. Są to dwa różne numery"
        />
      )}
    />
  )
}

export default P_2
