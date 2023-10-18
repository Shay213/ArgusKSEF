import { useFieldArray, useFormContext } from 'react-hook-form'
import defaultPodmiot2KValues from '@renderer/data/defaultFormValues/defaultPodmiot2KValues'
import DaneIdentyfikacyjne from './DaneIdentyfikacyjne'
import Adres from './Adres'
import { Button } from '@renderer/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import FormSection from '../FormItems-base/FormSection'
import IDNabywcy from '../FormItems/IDNabywcy'

interface Props {
  optional?: boolean
}

const Podmiot2k = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: 'Podmiot2K',
    control: form.control
  })
  return (
    <FormSection
      title="Podmiot2K"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane nabywcy występującego jako
      Podmiot2 lub Podmiot3 (rola „4”), ujęte na fakturze
      korygowanej [element opcjonalny]

      W przypadku korekty danych nabywcy występującego
      jako Podmiot2 lub dodatkowego nabywcy
      występującego jako Podmiot3, należy podać pełne dane
      tego podmiotu występujące na fakturze korygowanej.
      Korekcie nie podlegają błędne numery identyfikujące
      nabywcę oraz dodatkowego nabywcę. W przypadku
      korygowania pozostałych danych nabywcy lub
      dodatkowego nabywcy wskazany numer identyfikacyjny
      ma być tożsamy z numerem w części Podmiot2,
      względnie Podmiot3 faktury korygującej."
    >
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <FormSection key={field.id} title={`Podmiot2K ${index + 1}`} size="sm">
            <div className="flex flex-col gap-2">
              <DaneIdentyfikacyjne
                type="extended"
                formFieldNamePrefix={`Podmiot2K.${index}.`}
                headingSize="sm"
              />
              <Adres
                formFieldNamePrefix={`Podmiot2K.${index}.Adres.`}
                heading="Adres"
                headingSize="sm"
                optional
              />
              <IDNabywcy formFieldNamePrefix={`Podmiot2K.${index}.`} optional />
            </div>
            <Button
              className="mt-2"
              type="button"
              onClick={(): void => remove(index)}
              variant="destructive"
            >
              Usuń Podmiot2K {index + 1} <Trash2 className="w-4 h-4 ml-2" />
            </Button>
          </FormSection>
        ))}
        <div>
          <Button type="button" onClick={(): void => append(defaultPodmiot2KValues)}>
            Dodaj Podmiot2K <Plus className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </FormSection>
  )
}

export default Podmiot2k
