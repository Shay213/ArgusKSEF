import { useState } from 'react'
import Adres from './Adres'
import { getUniqueId } from '@renderer/lib/utils'
import { useFormContext } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import { FormField } from '@renderer/components/ui/form'
import FormSection from '../FormItems-base/FormSection'
import NIP from '../FormItems/NIP'
import Nazwa from '../FormItems/Nazwa'
import KodUE from '../FormItems/KodUE'
import NrVatUE from '../FormItems/NrVatUE'
import KodKraju from '../FormItems/KodKraju'
import NrID from '../FormItems/NrID'
import BrakID from '../FormItems/BrakID'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const radioGroupLabels = [
  'NIP i Nazwa',
  'KodUE i NrVatUE i Nazwa',
  'KodKraju i NrID i Nazwa',
  'BrakId i Nazwa'
]

const defaultDaneIdentyfikacyjneValues = {
  NIP: '',
  KodUE: '',
  NrVatUE: '',
  KodKraju: '',
  NrID: '',
  BrakID: '',
  Nazwa: ''
}

const Przewoznik = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  const form = useFormContext()
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])

  const uniqueId = getUniqueId()
  return (
    <FormSection
      title="Przewoznik"
      size="sm"
      optional={optional}
      tooltipMessage="Element zawierający dane identyfikacyjne przewoźnika
      oraz jego adres [element fakultatywny]"
    >
      <div className="flex flex-col gap-2">
        <FormSection title="DaneIdentyfikacyjne" size="xs">
          <div className="flex flex-col gap-4">
            <RadioGroup
              defaultValue={selectedItem}
              onChange={(e): void => {
                form.setValue(
                  `${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne`,
                  defaultDaneIdentyfikacyjneValues
                )
                //form.resetField(`${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne`, {defaultValue: defaultDaneIdentyfikacyjneValues})
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
              {selectedItem === 'NIP i Nazwa' && (
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.NIP`}
                    render={({ field }): JSX.Element => <NIP field={field} />}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.Nazwa`}
                    render={({ field }): JSX.Element => <Nazwa field={field} optional />}
                  />
                </div>
              )}
              {selectedItem === 'KodUE i NrVatUE i Nazwa' && (
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.KodUE`}
                    render={({ field }): JSX.Element => (
                      <KodUE
                        field={field}
                        handleSelect={(value): void =>
                          form.setValue(
                            `${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.KodUE`,
                            value.toUpperCase()
                          )
                        }
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.NrVatUE`}
                    render={({ field }): JSX.Element => <NrVatUE field={field} />}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.Nazwa`}
                    render={({ field }): JSX.Element => <Nazwa field={field} optional />}
                  />
                </div>
              )}
              {selectedItem === 'KodKraju i NrID i Nazwa' && (
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.KodKraju`}
                    render={({ field }): JSX.Element => (
                      <KodKraju
                        optional
                        field={field}
                        handleSelect={(value): void =>
                          form.setValue(
                            `${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.KodKraju`,
                            value.toUpperCase()
                          )
                        }
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.NrID`}
                    render={({ field }): JSX.Element => <NrID field={field} />}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.Nazwa`}
                    render={({ field }): JSX.Element => <Nazwa field={field} optional />}
                  />
                </div>
              )}
              {selectedItem === 'BrakId i Nazwa' && (
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.BrakID`}
                    render={({ field }): JSX.Element => <BrakID field={field} />}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}Przewoznik.DaneIdentyfikacyjne.Nazwa`}
                    render={({ field }): JSX.Element => <Nazwa field={field} optional />}
                  />
                </div>
              )}
            </div>
          </div>
        </FormSection>
        <Adres
          formFieldNamePrefix={`${formFieldNamePrefix ?? ''}Przewoznik.AdresPrzewoznika.`}
          heading="Adres"
          headingSize="xs"
        />
      </div>
    </FormSection>
  )
}

export default Przewoznik
