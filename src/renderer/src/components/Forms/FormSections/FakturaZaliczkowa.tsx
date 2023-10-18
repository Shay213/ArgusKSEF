import { useFieldArray, useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import { FormField } from '@renderer/components/ui/form'
import defaultFakturaZaliczkowaValues from '@renderer/data/defaultFormValues/defaultFakturaZaliczkowaValues'
import { getUniqueId } from '@renderer/lib/utils'
import { Button } from '@renderer/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import FormSection from '../FormItems-base/FormSection'
import SelectFormItem from '../FormItems-base/SelectFormItem'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const radioGroupLabels = ['NrKSeFZN', 'NrKSeFFaZaliczkowej']

const FakturaZaliczkowa = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: 'FakturaZaliczkowa',
    control: form.control
  })

  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])

  const uniqueId = getUniqueId()

  return (
    <FormSection
      title="FakturaZaliczkowa"
      size="lg"
      optional={optional}
      tooltipMessage="Element zawierający m. in. numery faktur zaliczkowych
      lub ich numery KSeF, jeśli zostały wystawione z użyciem
      KSeF [element opcjonalny]"
    >
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <FormSection key={field.id} title={`FakturaZaliczkowa ${index + 1}`} size="default">
            <div className="flex flex-col gap-4">
              <RadioGroup
                defaultValue={selectedItem}
                onChange={(e): void => {
                  form.resetField(`FakturaZaliczkowa`)
                  const target = e.target as HTMLInputElement
                  if (target.checked) setSelectedItem(target.value)
                }}
                className="h-min"
              >
                {radioGroupLabels.map((label) => (
                  <div className="flex items-center gap-2" key={uniqueId + label}>
                    <RadioGroupItem value={label} id={uniqueId + label} />
                    <Label htmlFor={uniqueId + label}>{label}</Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex flex-col gap-2">
                {selectedItem === 'NrKSeFZN' && (
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name={`FakturaZaliczkowa.${index}.NrKSeFZN`}
                      render={({ field }): JSX.Element => (
                        <SelectFormItem
                          field={field}
                          items={['1']}
                          label="NrKSeFZN"
                          tooltipMessage="Znacznik faktury zaliczkowej wystawionej poza KSeF

                        Podaje się „1” w przypadku, gdy faktura zaliczkowa
                        została wystawiona poza KSeF.

                        W przypadku, gdy w polu NrKSeFZN wskazano wartość
                        „1”, należy wypełnić również pole NrFaZaliczkowej."
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`FakturaZaliczkowa.${index}.NrFaZaliczkowej`}
                      render={({ field }): JSX.Element => (
                        <BasicFormItem
                          field={field}
                          label="NrFaZaliczkowej"
                          tooltipMessage="Numer faktury zaliczkowej wystawionej poza KSeF

                        Pole obowiązkowe dla faktury wystawianej po wydaniu
                        towaru lub wykonaniu usługi, o której mowa w art. 106f
                        ust. 3 ustawy i ostatniej z faktur, o której mowa w art.
                        106f ust. 4 ustawy.

                        Pole NrFaZaliczkowej wypełnia się w przypadku, gdy w
                        polu NrKSeFZN wskazano wartość „1”."
                        />
                      )}
                    />
                  </div>
                )}
                {selectedItem === 'NrKSeFFaZaliczkowej' && (
                  <FormField
                    control={form.control}
                    name={`FakturaZaliczkowa.${index}.NrKSeFFaZaliczkowej`}
                    render={({ field }): JSX.Element => (
                      <BasicFormItem
                        field={field}
                        label="NrKSeFFaZaliczkowej"
                        tooltipMessage="Numer identyfikujący fakturę zaliczkową w KSeF

                      Pole obowiązkowe w przypadku, gdy faktura zaliczkowa
                      była wystawiona za pomocą KSeF.

                      W przypadku, gdy faktura zaliczkowa była wystawiona w
                      KSeF, pola NrKSeFZN oraz NrFaZaliczkowej pomija się."
                      />
                    )}
                  />
                )}
              </div>
            </div>
            <Button
              className="mt-2"
              type="button"
              onClick={(): void => remove(index)}
              variant="destructive"
            >
              Usuń FakturaZaliczkowa {index + 1} <Trash2 className="w-4 h-4 ml-2" />
            </Button>
          </FormSection>
        ))}
        <div>
          <Button type="button" onClick={(): void => append(defaultFakturaZaliczkowaValues)}>
            Dodaj FakturaZaliczkowa <Plus className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </FormSection>
  )
}

export default FakturaZaliczkowa
