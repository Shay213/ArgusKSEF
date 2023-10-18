import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import { useState } from 'react'
import { getUniqueId } from '@renderer/lib/utils'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import FormSection from '../FormItems-base/FormSection'
import SelectFormItem from '../FormItems-base/SelectFormItem'
import NowySrodekTransportu from '../FormItems/NowySrodekTransportu'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const radioGroupLabels = ['P_22N', 'NowySrodekTransportu']

const NoweSrodkiTransportu = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  const form = useFormContext()
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])

  const uniqueId = getUniqueId()

  return (
    <FormSection
      title="NoweSrodkiTransportu"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące wystąpienia lub
      braku wystąpienia na fakturze wewnątrzwspólnotowej
      dostawy nowych środków transportu oraz dane
      szczegółowe charakteryzujące ww. nowe środki
      transportu"
    >
      <div className="flex flex-col gap-4">
        <RadioGroup
          defaultValue={selectedItem}
          onChange={(e): void => {
            form.resetField(`${formFieldNamePrefix ?? ''}NoweSrodkiTransportu`)
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
          {selectedItem === 'P_22N' && (
            <FormField
              control={form.control}
              name={`${formFieldNamePrefix ?? ''}NoweSrodkiTransportu.P_22N`}
              render={({ field }): JSX.Element => (
                <SelectFormItem
                  field={field}
                  label="P_22N"
                  items={['1']}
                  placeholder="Wybierz P_22N"
                  tooltipMessage={`Znacznik braku wewnątrzwspólnotowej dostawy nowych
                środków transportu

                W przypadku faktury, która nie dokumentuje
                wewnątrzwspólnotowej dostawy nowych środków
                transportu, należy podać wartość „1”.

                W przypadku, gdy pole P_22N równa się „1”, pola: P_22,
                P_42_5 oraz NowySrodekTransportu pomija się.
                `}
                />
              )}
            />
          )}
          {selectedItem === 'NowySrodekTransportu' && (
            <>
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}NoweSrodkiTransportu.P_22`}
                render={({ field }): JSX.Element => (
                  <SelectFormItem
                    field={field}
                    label="P_22"
                    items={['1']}
                    placeholder="Wybierz P_22"
                    tooltipMessage={`Znacznik wewnątrzwspólnotowej dostawy nowych
                  środków transportu

                  W przypadku faktury dokumentującej dostawę nowych
                  środków transportu, należy podać wartość „1”
                  `}
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}NoweSrodkiTransportu.P_42_5`}
                render={({ field }): JSX.Element => (
                  <SelectFormItem
                    field={field}
                    label="P_42_5"
                    items={['1', '2']}
                    placeholder="Wybierz P_42_5"
                    tooltipMessage={`Jeśli występuje obowiązek, o którym mowa w art. 42 ust.
                  5 ustawy, należy podać wartość „1", w przeciwnym
                  przypadku należy podać wartość „2".
                  `}
                  />
                )}
              />
              <NowySrodekTransportu
                formFieldNamePrefix={`${formFieldNamePrefix ?? ''}NoweSrodkiTransportu.`}
              />
            </>
          )}
        </div>
      </div>
    </FormSection>
  )
}

export default NoweSrodkiTransportu
