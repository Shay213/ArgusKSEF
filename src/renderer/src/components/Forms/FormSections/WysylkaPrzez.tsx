import { Button } from '@renderer/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Adres from './Adres'
import FormSection from '../FormItems-base/FormSection'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const defaultWysylkaPrzez = {
  KodKraju: '',
  AdresL1: '',
  AdresL2: '',
  GLN: ''
}

const WysylkaPrzez = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  const form = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: `${formFieldNamePrefix ?? ''}WysylkaPrzez`,
    control: form.control
  })

  return (
    <FormSection title="WysylkaPrzez" optional={optional} size="sm">
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div className="flex flex-col gap-2" key={field.id}>
            <Adres
              heading={`WysylkaPrzez ${index + 1}`}
              formFieldNamePrefix={`${formFieldNamePrefix ?? ''}WysylkaPrzez.${index}.`}
              headingSize="sm"
              optional={optional}
            >
              <Button
                className="mt-2"
                type="button"
                onClick={(): void => remove(index)}
                variant="destructive"
              >
                Usuń WysylkaPrzez {index + 1} <Trash2 className="w-4 h-4 ml-2" />
              </Button>
            </Adres>
          </div>
        ))}
        <div>
          <Button type="button" onClick={(): void => append(defaultWysylkaPrzez)}>
            Dodaj WysylkaPrzez <Plus className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </FormSection>
  )
}

export default WysylkaPrzez
