import { useFormContext } from 'react-hook-form'
import { formatDateToYYYYMMDD, getUniqueId } from '@renderer/lib/utils'
import { FormField } from '@renderer/components/ui/form'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import FormSection from '../FormItems-base/FormSection'
import CalendarFormItem from '../FormItems-base/CalendarFormItem'

interface Props {
  optional?: boolean
}

const radioGroupLabels = ['P_6', 'OkresFa']

const OkresFa_P_6 = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])

  const uniqueId = getUniqueId()
  return (
    <FormSection title="OkresFa / P_6" size="lg" optional={optional}>
      <div className="flex flex-col gap-4">
        <RadioGroup
          defaultValue={selectedItem}
          onChange={(e): void => {
            form.resetField('OkresFa')
            form.resetField('P_6')
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
          {selectedItem === 'P_6' && (
            <FormField
              control={form.control}
              name="P_6"
              render={({ field }): JSX.Element => (
                <CalendarFormItem
                  field={field}
                  label="P_6"
                  handleSelect={(date): void => form.setValue('P_6', formatDateToYYYYMMDD(date))}
                  tooltipMessage="Data dokonania lub zakończenia dostawy towarów lub
                wykonania usługi lub data otrzymania zapłaty, o której mowa w art. 106b ust.
                1 pkt 4 ustawy, o ile taka data jest
                określona i różni się od daty wystawienia faktury

                Pole wypełnia się w przypadku, gdy dla wszystkich pozycji
                faktury data jest wspólna.
                W przypadku, gdy dla poszczególnych pozycji występują
                różne daty sprzedaży – wypełnia się pole P_6A."
                />
              )}
            />
          )}
          {selectedItem === 'OkresFa' && (
            <>
              <FormField
                control={form.control}
                name={`OkresFa.P_6_Od`}
                render={({ field }): JSX.Element => (
                  <CalendarFormItem
                    field={field}
                    label="P_6_Od"
                    handleSelect={(date): void =>
                      form.setValue(`OkresFa.P_6_Od`, formatDateToYYYYMMDD(date))
                    }
                    tooltipMessage="Data początkowa okresu, którego dotyczy faktura"
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`OkresFa.P_6_Do`}
                render={({ field }): JSX.Element => (
                  <CalendarFormItem
                    field={field}
                    label="P_6_Do"
                    handleSelect={(date): void =>
                      form.setValue(`OkresFa.P_6_Do`, formatDateToYYYYMMDD(date))
                    }
                    tooltipMessage="Data końcowa okresu, którego dotyczy faktura - data
                  dokonania lub zakończenia dostawy towarów lub
                  wykonania usługi"
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

export default OkresFa_P_6
