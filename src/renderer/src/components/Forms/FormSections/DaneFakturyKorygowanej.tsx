import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import { FormField } from '@renderer/components/ui/form'
import { useFieldArray, useFormContext } from 'react-hook-form'
import defaultDaneFakturyKorygowanej from '@renderer/data/defaultFormValues/defaultDaneFakturyKorygowanej'
import FormSection from '../FormItems-base/FormSection'
import { formatDateToYYYYMMDD, getUniqueId } from '@renderer/lib/utils'
import { Button } from '@renderer/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import CalendarFormItem from '../FormItems-base/CalendarFormItem'
import BasicFormItem from '../FormItems-base/BasicFormItem'
import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  optional?: boolean
}

const radioGroupLabels = ['NrKSeFN', 'NrKSeF']

const DaneFakturyKorygowanej = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: 'DaneFaKorygowanej',
    control: form.control
  })
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])

  const uniqueId = getUniqueId()

  return (
    <FormSection
      title="DaneFakturyKorygowanej"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane faktury korygowanej, m. in.
      datę wystawienia faktury korygowanej, numer faktury
      korygowanej, numer KSeF faktury korygowanej
      Element może wystąpić w strukturze nieskończenie wiele
      razy."
    >
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <FormSection key={field.id} title={`DaneFakturyKorygowanej ${index + 1}`} size="sm">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name={`DaneFaKorygowanej.${index}.DataWystFaKorygowanej`}
                  render={({ field }): JSX.Element => (
                    <CalendarFormItem
                      field={field}
                      handleSelect={(date): void =>
                        form.setValue(
                          `DaneFaKorygowanej.${index}.DataWystFaKorygowanej`,
                          formatDateToYYYYMMDD(date)
                        )
                      }
                      label="DataWystFaKorygowanej"
                      tooltipMessage="Data wystawienia faktury korygowanej (pierwotnej)
                    Uwaga!
                    W stanie prawnym obowiązującym od 1 września 2023 r.
                    możliwe jest wystawienie faktury korygującej w KSeF do
                    faktury pierwotnej wystawionej poza KSeF.
                    W przypadku, gdy:
                    - faktura korygowana była wystawiona poza KSeF, podaje
                    się datę wystawienia faktury, o której mowa w art. 106e
                    ust. 1 pkt 1 ustawy,
                    - faktura korygowana była wystawiona w KSeF, za datę
                    wystawienia faktury korygowanej uznaje się, datę jej
                    przesłania do KSeF, zgodnie z art. 106na ust. 1 ustawy.
                    Na gruncie przepisów obowiązujących od 1 lipca 2024 r.,
                    co do zasady wszystkie faktury korygujące będą
                    wystawiane w KSeF, również gdy faktura pierwotna była
                    wystawiona poza KSeF.

                    W przypadku, gdy:
                    - faktura korygowana była wystawiona poza KSeF (np.
                    przed 1 lipca 2024 r.), podaje się datę wystawienia
                    faktury, o której mowa w art. 106e ust. 1 pkt 1 ustawy,
                    - faktura korygowana była wystawiona w KSeF, za datę
                    wystawienia faktury korygowanej uznaje się, datę jej
                    przesłania do KSeF, zgodnie z art. 106na ust. 1 ustawy,
                    - faktura korygowana została wystawiona zgodnie z art.
                    106nf ust. 1 lub 106nh ust. 1 ustawy, datą wystawienia
                    faktury jest data, o której mowa w art. 106e ust. 1 pkt 1
                    ustawy, wskazana w polu P_1 (z tym zastrzeżeniem, iż
                    fakturę korygującą, wystawia się dopiero po
                    przydzieleniu tej fakturze korygowanej numeru
                    identyfikującego w KSeF)."
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`DaneFaKorygowanej.${index}.NrFaKorygowanej`}
                  render={({ field }): JSX.Element => (
                    <BasicFormItem
                      field={field}
                      label="NrFaKorygowanej"
                      tooltipMessage="Numer faktury korygowanej (pierwotnej)

                    Podaje się numer faktury korygowanej, o którym mowa
                    w art. 106e ust. 1 pkt 2 ustawy.

                    Pole wypełnia się niezależnie od tego, czy faktura
                    korygowana była wystawiona w KSeF czy poza KSeF."
                    />
                  )}
                />
              </div>
              <RadioGroup
                defaultValue={selectedItem}
                onChange={(e): void => {
                  form.resetField(`DaneFaKorygowanej.${index}.NrKSeF`)
                  form.resetField(`DaneFaKorygowanej.${index}.NrKSeFFaKorygowanej`)
                  form.resetField(`DaneFaKorygowanej.${index}.NrKSeFN`)
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
                {selectedItem === 'NrKSeFN' && (
                  <FormField
                    control={form.control}
                    name={`DaneFaKorygowanej.${index}.NrKSeFN`}
                    render={({ field }): JSX.Element => (
                      <SelectFormItem
                        field={field}
                        items={['1']}
                        label="NrKSeFN"
                        tooltipMessage="Znacznik faktury korygowanej (pierwotnej) wystawionej
                      poza KSeF

                      W przypadku, gdy faktura korygowana była wystawiona
                      poza KSeF należy wskazać „1”.

                      W przypadku, gdy pole NrKSeFN przyjmuje wartość „1”,
                      pola NrKSeF oraz NrKSeFFaKorygowanej pomija się."
                      />
                    )}
                  />
                )}
                {selectedItem === 'NrKSeF' && (
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name={`DaneFaKorygowanej.${index}.NrKSeF`}
                      render={({ field }): JSX.Element => (
                        <SelectFormItem
                          field={field}
                          items={['1']}
                          label="NrKSeF"
                          tooltipMessage="Znacznik numeru KSeF faktury korygowanej (pierwotnej)

                        W przypadku, gdy faktura korygowana była wystawiona
                        w KSeF, należy wskazać „1”.

                        Jeżeli faktura korygowana była wystawiona w KSeF,
                        wówczas dodatkowo, w polu NrKSeFFaKorygowanej,
                        należy podać numer KSeF faktury korygowanej."
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`DaneFaKorygowanej.${index}.NrKSeFFaKorygowanej`}
                      render={({ field }): JSX.Element => (
                        <BasicFormItem
                          field={field}
                          label="NrKSeFFaKorygowanej"
                          tooltipMessage="Numer identyfikujący fakturę korygowaną (pierwotną) w
                        KSeF

                        Należy wskazać numer KSeF faktury korygowanej
                        (pierwotnej), w przypadku, gdy w polu NrKSeF wskazano
                        wartość „1”."
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button
              className="mt-2"
              type="button"
              onClick={(): void => remove(index)}
              variant="destructive"
            >
              Usuń DaneFakturyKorygowanej {index + 1} <Trash2 className="w-4 h-4 ml-2" />
            </Button>
          </FormSection>
        ))}
        <div>
          <Button type="button" onClick={(): void => append(defaultDaneFakturyKorygowanej)}>
            Dodaj DaneFakturyKorygowanej <Plus className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </FormSection>
  )
}

export default DaneFakturyKorygowanej
