import { FormField } from '@renderer/components/ui/form'
import { StatusInfoPodatnika as ZStatusInfoPodatnika } from '@renderer/lib/zodSchemas'
import { useFormContext } from 'react-hook-form'
import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  optional?: boolean
}

const StatusInfoPodatnika = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`StatusInfoPodatnika`}
      render={({ field }): JSX.Element => (
        <SelectFormItem
          field={field}
          optional={optional}
          label="StatusInfoPodatnika"
          items={[...ZStatusInfoPodatnika]}
          placeholder="Wybierz status info podatnika"
          tooltipMessage="Status podatnika [pole fakultatywne]

            Podaje się:
            - „1” - w przypadku podatnika znajdującego się w stanie
            likwidacji,
            - „2” - w przypadku podatnika, który jest w trakcie
            postępowania restrukturyzacyjnego,
            - „3” - w przypadku podatnika znajdującego się w stanie
            upadłości,
            - „4” - w przypadku przedsiębiorstwa w spadku.

            Kwestia wypełnienia pola należy do decyzji podatnika,
            niezależnie czy podatnik ten posiada jeden z
            wymienionych wyżej statusów."
        />
      )}
    />
  )
}

export default StatusInfoPodatnika
