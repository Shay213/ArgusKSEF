import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const OkresFaKorygowanej = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name="OkresFaKorygowanej"
      render={({ field }): JSX.Element => (
        <BasicFormItem
          field={field}
          label="OkresFaKorygowanej"
          optional={optional}
          tooltipMessage="Okres, do którego odnosi się udzielany opust lub
          udzielana obniżka, w przypadku, gdy podatnik udziela
          opustu lub obniżki ceny w odniesieniu do dostaw
          towarów lub usług dokonanych lub świadczonych na
          rzecz jednego odbiorcy w danym okresie [pole
          opcjonalne, dotyczące faktury korygującej, o której
          mowa w art. 106j ust. 3 ustawy]"
        />
      )}
    />
  )
}

export default OkresFaKorygowanej
