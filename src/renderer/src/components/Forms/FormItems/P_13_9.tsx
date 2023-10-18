import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const P_13_9 = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`P_13_9`}
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="P_13_9"
          optional={optional}
          tooltipMessage="Suma wartości świadczenia usług, o których mowa w art.
          100 ust. 1 pkt 4 ustawy. W przypadku faktur zaliczkowych, kwota zaliczki.
          W przypadku faktur korygujących, kwota różnicy wartości sprzedaży [poleopcjonalne]"
        />
      )}
    />
  )
}

export default P_13_9
