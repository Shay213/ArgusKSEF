import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  optional?: boolean
}

const TP = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name="TP"
      render={({ field }): JSX.Element => (
        <SelectFormItem
          field={field}
          items={['1']}
          label="TP"
          optional={optional}
          placeholder="Wybierz TP"
          tooltipMessage="Istniejące powiązania między nabywcą a dokonującym
          dostawy towarów lub usługodawcą, zgodnie z § 10 ust. 4
          pkt 3, z zastrzeżeniem ust. 4b rozporządzenia w sprawie
          JPK_VAT z deklaracją [pole fakultatywne]

          Podaje się „1” w celu zawarcia na fakturze informacji o
          ww. istniejących powiązaniach.

          Oznaczenia „TP” nie stosuje się w przypadku dostaw
          towarów oraz świadczenia usług, gdy powiązania między
          nabywcą a dokonującym dostawy towarów lub
          usługodawcą wynikają wyłącznie z powiązania ze
          Skarbem Państwa lub jednostkami samorządu
          terytorialnego, lub ich związkami."
        />
      )}
    />
  )
}

export default TP
