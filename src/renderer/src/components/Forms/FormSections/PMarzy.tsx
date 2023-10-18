import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import { getUniqueId } from '@renderer/lib/utils'
import FormSection from '../FormItems-base/FormSection'
import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const radioGroupLabels = ['P_PMarzyN', 'P_PMarzy_2', 'P_PMarzy_3_1', 'P_PMarzy_3_2', 'P_PMarzy_3_3']

const PMarzy = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  const form = useFormContext()
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])

  const uniqueId = getUniqueId()

  return (
    <FormSection
      title="PMarzy"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące wystąpienia na
      fakturze procedury VAT marża oraz adnotacje odnoszące
      się do ww. procedury"
    >
      <div className="flex flex-col gap-4">
        <RadioGroup
          defaultValue={selectedItem}
          onChange={(e): void => {
            form.resetField(`${formFieldNamePrefix ?? ''}PMarzy`)
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
          {selectedItem === 'P_PMarzyN' && (
            <FormField
              control={form.control}
              name={`${formFieldNamePrefix ?? ''}PMarzy.P_PMarzyN`}
              render={({ field }): JSX.Element => (
                <SelectFormItem
                  field={field}
                  items={['1']}
                  label="P_PMarzyN"
                  placeholder="Wybierz P_PMarzyN"
                  tooltipMessage="Znacznik braku wystąpienia procedur marży, o których
                mowa w art. 119 lub art. 120 ustawy

                W przypadku faktury, która nie dokumentuje dostawy
                towarów lub świadczenia usług opodatkowanych w
                procedurze marży, o której mowa w art. 119 lub art. 120
                ustawy, należy podać wartość „1”.

                W przypadku wskazania „1” w polu P_PMarzyN
                (znajdującej się w sekwencji typu „wybór”) pola:
                P_PMarzy, P_PMarzy_2, P_PMarzy_3_1, P_PMarzy_3_2,
                P_PMarzy_3_3 pomija się"
                />
              )}
            />
          )}
          {selectedItem === 'P_PMarzy_2' && (
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}PMarzy.P_PMarzy`}
                render={({ field }): JSX.Element => (
                  <SelectFormItem
                    field={field}
                    items={['1']}
                    label="P_PMarzy"
                    placeholder="Wybierz P_PMarzy"
                    tooltipMessage="Znacznik wystąpienia procedur marży, o których mowa w
                  art. 119 lub art. 120 ustawy

                  W przypadku faktury dokumentującej dostawę towarów
                  lub świadczenie usług opodatkowane w procedurze
                  marży, o której mowa w art. 119 lub art. 120 ustawy,
                  należy podać wartość „1”.

                  W przypadku, gdy pole P_PMarzy równa się „1”, należy
                  wypełnić dodatkowo jedno z pól: P_PMarzy_2,
                  P_PMarzy_3_1, P_PMarzy_3_2, P_PMarzy_3_3"
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}PMarzy.P_PMarzy_2`}
                render={({ field }): JSX.Element => (
                  <SelectFormItem
                    field={field}
                    items={['1']}
                    label="P_PMarzy_2"
                    placeholder="Wybierz P_PMarzy_2"
                    tooltipMessage={`Znacznik „procedura marży dla biur podróży”

                  W przypadku świadczenia usług turystyki, dla których
                  podstawę opodatkowania stanowi marża, zgodnie z art.
                  119 ust. 1 ustawy, a faktura dokumentująca świadczenie
                  zawiera wyrazy "procedura marży dla biur podróży",
                  należy podać wartość „1”.

                  W przypadku wskazania „1” w polu P_PMarzy_2
                  (znajdującej się w sekwencji typu „wybór”) pola:
                  P_PMarzy_3_1, P_PMarzy_3_2, P_PMarzy_3_3 pomija
                  się.
                  `}
                  />
                )}
              />
            </div>
          )}
          {selectedItem === 'P_PMarzy_3_1' && (
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}PMarzy.P_PMarzy`}
                render={({ field }): JSX.Element => (
                  <SelectFormItem
                    field={field}
                    items={['1']}
                    label="P_PMarzy"
                    placeholder="Wybierz P_PMarzy"
                    tooltipMessage="Znacznik wystąpienia procedur marży, o których mowa w
                  art. 119 lub art. 120 ustawy

                  W przypadku faktury dokumentującej dostawę towarów
                  lub świadczenie usług opodatkowane w procedurze
                  marży, o której mowa w art. 119 lub art. 120 ustawy,
                  należy podać wartość „1”.

                  W przypadku, gdy pole P_PMarzy równa się „1”, należy
                  wypełnić dodatkowo jedno z pól: P_PMarzy_2,
                  P_PMarzy_3_1, P_PMarzy_3_2, P_PMarzy_3_3"
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}PMarzy.P_PMarzy_3_1`}
                render={({ field }): JSX.Element => (
                  <SelectFormItem
                    field={field}
                    items={['1']}
                    label="P_PMarzy_3_1"
                    placeholder="Wybierz P_PMarzy_3_1"
                    tooltipMessage={`Znacznik „procedura marży - towary używane”

                  W przypadku dostawy towarów używanych, dla których
                  podstawę opodatkowania stanowi marża, zgodnie z art.
                  120 ustawy, a faktura dokumentująca dostawę zawiera
                  wyrazy "procedura marży - towary używane", należy
                  podać wartość „1”.

                  W przypadku wskazania „1” w polu P_PMarzy_3_1
                  (znajdującej się w sekwencji typu „wybór”) pola:
                  P_PMarzy_2, P_PMarzy_3_2, P_PMarzy_3_3 pomija się.
                  `}
                  />
                )}
              />
            </div>
          )}
          {selectedItem === 'P_PMarzy_3_2' && (
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}PMarzy.P_PMarzy`}
                render={({ field }): JSX.Element => (
                  <SelectFormItem
                    field={field}
                    items={['1']}
                    label="P_PMarzy"
                    placeholder="Wybierz P_PMarzy"
                    tooltipMessage="Znacznik wystąpienia procedur marży, o których mowa w
                   art. 119 lub art. 120 ustawy

                   W przypadku faktury dokumentującej dostawę towarów
                   lub świadczenie usług opodatkowane w procedurze
                   marży, o której mowa w art. 119 lub art. 120 ustawy,
                   należy podać wartość „1”.

                   W przypadku, gdy pole P_PMarzy równa się „1”, należy
                   wypełnić dodatkowo jedno z pól: P_PMarzy_2,
                   P_PMarzy_3_1, P_PMarzy_3_2, P_PMarzy_3_3"
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}PMarzy.P_PMarzy_3_2`}
                render={({ field }): JSX.Element => (
                  <SelectFormItem
                    field={field}
                    items={['1']}
                    label="P_PMarzy_3_2"
                    placeholder="Wybierz P_PMarzy_3_2"
                    tooltipMessage={`Znacznik „procedura marży - dzieła sztuki”

                   W przypadku dostawy dzieł sztuki, dla których podstawę
                   opodatkowania stanowi marża, zgodnie z art. 120
                   ustawy, a faktura dokumentująca dostawę zawiera
                   wyrazy "procedura marży - dzieła sztuki", należy podać
                   wartość „1”.

                   W przypadku wskazania „1” w polu P_PMarzy_3_2
                   (znajdującej się w sekwencji typu „wybór”) pola:
                   P_PMarzy_2, P_PMarzy_3_1, P_PMarzy_3_3 pomija się.
                   `}
                  />
                )}
              />
            </div>
          )}
          {selectedItem === 'P_PMarzy_3_3' && (
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}PMarzy.P_PMarzy`}
                render={({ field }): JSX.Element => (
                  <SelectFormItem
                    field={field}
                    items={['1']}
                    label="P_PMarzy"
                    placeholder="Wybierz P_PMarzy"
                    tooltipMessage="Znacznik wystąpienia procedur marży, o których mowa w
                  art. 119 lub art. 120 ustawy

                  W przypadku faktury dokumentującej dostawę towarów
                  lub świadczenie usług opodatkowane w procedurze
                  marży, o której mowa w art. 119 lub art. 120 ustawy,
                  należy podać wartość „1”.

                  W przypadku, gdy pole P_PMarzy równa się „1”, należy
                  wypełnić dodatkowo jedno z pól: P_PMarzy_2,
                  P_PMarzy_3_1, P_PMarzy_3_2, P_PMarzy_3_3"
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}PMarzy.P_PMarzy_3_3`}
                render={({ field }): JSX.Element => (
                  <SelectFormItem
                    field={field}
                    items={['1']}
                    label="P_PMarzy_3_3"
                    placeholder="Wybierz P_PMarzy_3_3"
                    tooltipMessage={`Znacznik „procedura marży - przedmioty kolekcjonerskie
                  i antyki”

                  W przypadku dostawy przedmiotów kolekcjonerskich i
                  antyków, dla których podstawę opodatkowania stanowi
                  marża, zgodnie z art. 120 ustawy, a faktura
                  dokumentująca dostawę zawiera wyrazy "procedura
                  marży - przedmioty kolekcjonerskie i antyki", należy
                  podać wartość „1”.

                  W przypadku wskazania „1” w polu P_PMarzy_3_3
                  (znajdującej się w sekwencji typu „wybór”) pola:
                  P_PMarzy_2, P_PMarzy_3_1, P_PMarzy_3_2 pomija się.
                  `}
                  />
                )}
              />
            </div>
          )}
        </div>
      </div>
    </FormSection>
  )
}

export default PMarzy
