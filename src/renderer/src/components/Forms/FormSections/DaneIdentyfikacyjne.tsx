import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import { useState } from 'react'
import { getUniqueId } from '@renderer/lib/utils'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import {
  defaultDaneIdentyfikacyjneExtended,
  defaultDaneIdentyfikacyjneExtendedIDWew
} from '@renderer/data/defaultFormValues/defaultDaneIdentyfikacyjneValues'
import FormSection from '../FormItems-base/FormSection'
import NIP from '../FormItems/NIP'
import Nazwa from '../FormItems/Nazwa'
import KodUE from '../FormItems/KodUE'
import NrVatUE from '../FormItems/NrVatUE'
import KodKraju from '../FormItems/KodKraju'
import NrID from '../FormItems/NrID'
import BrakID from '../FormItems/BrakID'
import IDWew from '../FormItems/IDWew'

interface Props {
  type?: 'basic' | 'extended' | 'extended+IDWew'
  formFieldNamePrefix?: string
  headingSize?: 'xs' | 'sm' | 'default' | 'lg'
}

const LABELS_EXTENDED = [
  'NIP i Nazwa',
  'KodUE i NrVatUE i Nazwa',
  'KodKraju i NrID i Nazwa',
  'BrakId i Nazwa'
]

const LABELS_EXTENDED_IDWEW = [...LABELS_EXTENDED, 'IDWew i Nazwa']

const DaneIdentyfikacyjne = ({
  type = 'basic',
  formFieldNamePrefix,
  headingSize
}: Props): JSX.Element => {
  const radioGroupLabels = type === 'extended+IDWew' ? LABELS_EXTENDED_IDWEW : LABELS_EXTENDED

  const form = useFormContext()
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])

  const uniqueId = getUniqueId()

  return (
    <FormSection title="Dane Identyfikacyjne" size={headingSize ?? 'lg'}>
      <div className="flex flex-col gap-3">
        {type === 'basic' && (
          <>
            <FormField
              control={form.control}
              name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.NIP`}
              render={({ field }): JSX.Element => <NIP field={field} />}
            />
            <FormField
              control={form.control}
              name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.Nazwa`}
              render={({ field }): JSX.Element => <Nazwa field={field} />}
            />
          </>
        )}
        {(type === 'extended' || type === 'extended+IDWew') && (
          <div className="flex flex-col gap-4">
            <RadioGroup
              defaultValue={selectedItem}
              onChange={(e): void => {
                if (type === 'extended') {
                  form.setValue(
                    `${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne`,
                    defaultDaneIdentyfikacyjneExtended
                  )
                } else {
                  form.setValue(
                    `${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne`,
                    defaultDaneIdentyfikacyjneExtendedIDWew
                  )
                }
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
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.NIP`}
                    render={({ field }): JSX.Element => <NIP field={field} />}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.Nazwa`}
                    render={({ field }): JSX.Element => <Nazwa field={field} optional />}
                  />
                </div>
              )}
              {selectedItem === 'KodUE i NrVatUE i Nazwa' && (
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.KodUE`}
                    render={({ field }): JSX.Element => (
                      <KodUE
                        field={field}
                        handleSelect={(value): void =>
                          form.setValue(
                            `${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.KodUE`,
                            value.toUpperCase()
                          )
                        }
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.NrVatUE`}
                    render={({ field }): JSX.Element => <NrVatUE field={field} />}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.Nazwa`}
                    render={({ field }): JSX.Element => <Nazwa field={field} optional />}
                  />
                </div>
              )}
              {selectedItem === 'KodKraju i NrID i Nazwa' && (
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.KodKraju`}
                    render={({ field }): JSX.Element => (
                      <KodKraju
                        optional
                        field={field}
                        handleSelect={(value): void =>
                          form.setValue(
                            `${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.KodKraju`,
                            value.toUpperCase()
                          )
                        }
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.NrID`}
                    render={({ field }): JSX.Element => <NrID field={field} />}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.Nazwa`}
                    render={({ field }): JSX.Element => <Nazwa field={field} optional />}
                  />
                </div>
              )}
              {selectedItem === 'BrakId i Nazwa' && (
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.BrakID`}
                    render={({ field }): JSX.Element => <BrakID field={field} />}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.Nazwa`}
                    render={({ field }): JSX.Element => <Nazwa field={field} optional />}
                  />
                </div>
              )}
              {selectedItem === 'IDWew i Nazwa' && (
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.IDWew`}
                    render={({ field }): JSX.Element => <IDWew field={field} />}
                  />
                  <FormField
                    control={form.control}
                    name={`${formFieldNamePrefix ?? ''}DaneIdentyfikacyjne.Nazwa`}
                    render={({ field }): JSX.Element => <Nazwa field={field} optional />}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </FormSection>
  )
}

export default DaneIdentyfikacyjne
