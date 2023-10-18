import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const NrFaKorygowany = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name="NrFaKorygowany"
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="NrFaKorygowany"
          optional={optional}
          tooltipMessage="Poprawny numer faktury korygowanej w przypadku, gdy
          przyczyną korekty jest błędny numer faktury
          korygowanej [pole opcjonalne]

          Błędny numer faktury należy wskazać w polu
          NrFaKorygowanej."
        />
      )}
    />
  )
}

export default NrFaKorygowany
