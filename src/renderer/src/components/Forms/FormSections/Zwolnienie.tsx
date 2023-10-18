import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import { useState } from 'react'
import { getUniqueId } from '@renderer/lib/utils'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import FormSection from '../FormItems-base/FormSection'
import TextareaFormItem from '../FormItems-base/TextareaFormItem'
import P_19 from '../FormItems/P_19'
import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const radioGroupLabels = ['P_19A', 'P_19B', 'P_19C', 'P_19N']

const Zwolnienie = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  const form = useFormContext()
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])

  const uniqueId = getUniqueId()
  return (
    <FormSection
      title="Zwolnienie"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące wystąpienia lub
      braku wystąpienia na fakturze sprzedaży zwolnionej oraz
      podstawy prawnej zastosowanego zwolnienia od
      podatku"
    >
      <div className="flex flex-col gap-4">
        <RadioGroup
          defaultValue={selectedItem}
          onChange={(e): void => {
            form.resetField(`${formFieldNamePrefix ?? ''}Zwolnienie`)
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
          {selectedItem === 'P_19A' && (
            <>
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}Zwolnienie.P_19`}
                render={({ field }): JSX.Element => <P_19 field={field} />}
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}Zwolnienie.P_19A`}
                render={({ field }): JSX.Element => (
                  <TextareaFormItem
                    field={field}
                    label="P_19A"
                    tooltipMessage={`Jeśli pole P_19 równa się „1" - należy wskazać przepis
                    ustawy albo aktu wydanego na podstawie ustawy, na
                    podstawie którego podatnik stosuje zwolnienie od
                    podatku.

                    Przykład: „Art. 43 ust. 1 pkt 37 ustawy o podatku od
                    towarów i usług (Dz. U. 2023 poz. 1570 ze zm.)”`}
                  />
                )}
              />
            </>
          )}
          {selectedItem === 'P_19B' && (
            <>
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}Zwolnienie.P_19`}
                render={({ field }): JSX.Element => <P_19 field={field} />}
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}Zwolnienie.P_19B`}
                render={({ field }): JSX.Element => (
                  <TextareaFormItem
                    field={field}
                    label="P_19B"
                    tooltipMessage={`Jeśli pole P_19 równa się „1" - należy wskazać przepis
                    dyrektywy 2006/112/WE, który zwalnia od podatku taką
                    dostawę towarów lub takie świadczenie usług.`}
                  />
                )}
              />
            </>
          )}
          {selectedItem === 'P_19C' && (
            <>
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}Zwolnienie.P_19`}
                render={({ field }): JSX.Element => <P_19 field={field} />}
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}Zwolnienie.P_19C`}
                render={({ field }): JSX.Element => (
                  <TextareaFormItem
                    field={field}
                    label="P_19C"
                    tooltipMessage={`Jeśli pole P_19 równa się „1" - należy wskazać inną
                    podstawę prawną wskazującą na to, że dostawa towarów
                    lub świadczenie usług korzysta ze zwolnienia od podatku.`}
                  />
                )}
              />
            </>
          )}
          {selectedItem === 'P_19N' && (
            <FormField
              control={form.control}
              name={`${formFieldNamePrefix ?? ''}Zwolnienie.P_19N`}
              render={({ field }): JSX.Element => (
                <SelectFormItem
                  field={field}
                  items={['1']}
                  label="P_19N"
                  placeholder="Wybierz P_19N"
                  tooltipMessage={`Znacznik braku dostawy towarów lub świadczenia usług
                    zwolnionych od podatku na podstawie art. 43 ust. 1, art.
                    113 ust. 1 i 9 ustawy albo przepisów wydanych na
                    podstawie art. 82 ust. 3 ustawy lub na podstawie innych
                    przepisów

                    W przypadku faktury, która nie dokumentuje dostawy
                    towarów lub świadczenia usług zwolnionych od podatku
                    na podstawie art. 43 ust. 1, art. 113 ust. 1 i 9 ustawy albo
                    przepisów wydanych na podstawie art. 82 ust. 3 ustawy
                    lub na podstawie innych przepisów, należy podać
                    wartość „1”.

                    W przypadku, gdy pole P_19N równa się „1”, pola: P_19,
                    P_19A, P_19B, P_19C pomija się.
                    `}
                />
              )}
            />
          )}
        </div>
      </div>
    </FormSection>
  )
}

export default Zwolnienie
