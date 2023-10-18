import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import { Rola as ZRola } from '@renderer/lib/zodSchemas'
import { useState } from 'react'
import { getUniqueId } from '@renderer/lib/utils'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import FormSection from '../FormItems-base/FormSection'
import SelectFormItem from '../FormItems-base/SelectFormItem'
import TextareaFormItem from '../FormItems-base/TextareaFormItem'

interface Props {
  optional?: boolean
  formFieldNamePrefix?: string
}

const radioGroupLabels = ['Rola', 'RolaInna']

const Rola = ({ optional, formFieldNamePrefix }: Props): JSX.Element => {
  const form = useFormContext()
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])

  const uniqueId = getUniqueId()
  return (
    <FormSection title="Rola" size="lg" optional={optional}>
      <div className="flex flex-col gap-4">
        <RadioGroup
          defaultValue={selectedItem}
          onChange={(e): void => {
            form.resetField(`${formFieldNamePrefix ?? ''}Rola`)
            form.resetField(`${formFieldNamePrefix ?? ''}RolaInna`)
            form.resetField(`${formFieldNamePrefix ?? ''}OpisRoli`)
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
          {selectedItem === 'Rola' && (
            <FormField
              control={form.control}
              name={`${formFieldNamePrefix ?? ''}Rola`}
              render={({ field }): JSX.Element => (
                <SelectFormItem
                  field={field}
                  label="Rola"
                  items={[...ZRola]}
                  placeholder="Wybierz role"
                  tooltipMessage="Rola podmiotu trzeciego:
                    Podaje się:

                    - „1” - Faktor – w przypadku, gdy na fakturze występują dane
                    faktora,
                    - „2” - Odbiorca - w przypadku, gdy na fakturze występują dane
                    jednostek wewnętrznych, oddziałów, wyodrębnionych w ramach
                    nabywcy, które same nie stanowią nabywcy w rozumieniu
                    ustawy
                    - „3” - Podmiot pierwotny - w przypadku, gdy na fakturze
                    występują dane podmiotu będącego w stosunku do podatnika
                    podmiotem przejętym lub przekształconym, który świadczył
                    usługę lub dokonywał dostawy (z wyłączeniem przypadków, o
                    których mowa w art. 106j ust. 2 pkt 3 ustawy, gdy dane te
                    wykazywane są w części Podmiot1K),
                    - „4” - Dodatkowy nabywca - w przypadku, gdy na fakturze
                    występują dane kolejnych (innych niż wymieniony w części
                    Podmiot2) nabywców,
                    - „5” - Wystawca faktury - w przypadku, gdy na fakturze
                    występują dane podmiotu wystawiającego fakturę w imieniu
                    podatnika.
                    - „6” - Dokonujący płatności - w przypadku, gdy na fakturze
                    występują dane podmiotu regulującego zobowiązanie w miejsce
                    nabywcy,
                    - „7” - JST – wystawca,
                    - „8” - JST – odbiorca,
                    - „9” - Członek grupy VAT – wystawca,
                    - „10” - Członek grupy VAT – odbiorca.
                    W przypadku wystąpienia na fakturze danych podmiotu
                    trzeciego, o roli innej niż jedna z wyżej wymienionych, pole Rola
                    pomija się. W tej sytuacji wypełnia się pola: RolaInna oraz
                    OpisRoli.

                    Rola „5” – wystawca faktury nie dotyczy:
                    - przypadku, gdy wystawcą faktury jest nabywca,- sytuacji, gdy fakturę wystawia komornik,
                    organ egzekucyjny lub przedstawiciel podatkowy, którego dane wskazuje się w
                    elemencie PodmiotUpowazniony, a nie w Podmiot3.

                    W przypadku samofakturowania, dane nabywcy należy
                    uwzględnić w elemencie Podmiot2. Dodatkowo na fakturze
                    powinna znaleźć się adnotacja „samofakturowanie” (element
                    Fa/Adnotacje/P_17 – należy wskazać wartość „1”)."
                />
              )}
            />
          )}
          {selectedItem === 'RolaInna' && (
            <>
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}RolaInna`}
                render={({ field }): JSX.Element => (
                  <SelectFormItem
                    field={field}
                    label="RolaInna"
                    items={['1']}
                    placeholder="Wybierz rola inna"
                    tooltipMessage="Znacznik innego podmiotu trzeciego

                W przypadku wystąpienia na fakturze danych podmiotu
                trzeciego, o roli innej niż możliwa do wyboru w polu Rola, podaje
                się wartość „1” - inny podmiot.

                W przypadku wskazania odpowiedniej roli podmiotu trzeciego w
                polu Rola (tj. braku wystąpienia innego podmiotu trzeciego), pole
                RolaInna pomija się."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}OpisRoli`}
                render={({ field }): JSX.Element => (
                  <TextareaFormItem
                    field={field}
                    label="OpisRoli"
                    placeholder="Opis roli..."
                    tooltipMessage="Opis roli innego podmiotu trzeciego

                  W przypadku wystąpienia na fakturze danych podmiotu
                  trzeciego, o roli innej niż możliwa do wyboru w polu Rola, podaje
                  się opis roli podmiotu trzeciego (dotyczy przypadku, gdy w polu
                  RolaInna wskazano „1” - inny podmiot).

                  W przypadku wskazania odpowiedniej roli podmiotu trzeciego w
                  polu Rola (tj. braku wystąpienia innego podmiotu trzeciego), pole
                  OpisRoli pomija się."
                  />
                )}
              />
            </>
          )}
        </div>
      </div>
    </FormSection>
  )
}

export default Rola
