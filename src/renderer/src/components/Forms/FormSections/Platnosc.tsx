import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import { formatDateToYYYYMMDD, getUniqueId } from '@renderer/lib/utils'
import ZaplataCzesciowa from './ZaplataCzesciowa'
import TerminPlatnosci from './TerminPlatnosci'
import { FormaPlatnosci } from '@renderer/lib/zodSchemas'
import RachunekBankowy from './RachunekBankowy'
import RachunekBankowyFaktora from './RachunekBankowyFaktora'
import Skonto from './Skonto'
import FormSection from '../FormItems-base/FormSection'
import SelectFormItem from '../FormItems-base/SelectFormItem'
import CalendarFormItem from '../FormItems-base/CalendarFormItem'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const radioGroupLabels = ['Zaplacono', 'ZaplataCzesciowa']

const radioGroupLabels2 = ['FormaPlatnosci', 'PlatnoscInna']

const Platnosc = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])
  const [selectedItem2, setSelectedItem2] = useState(radioGroupLabels2[0])

  const uniqueId = getUniqueId()

  return (
    <FormSection
      title="Platnosc"
      size="lg"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące warunków
      płatności [element fakultatywny]"
    >
      <div className="flex flex-col gap-2">
        <FormSection title="Zapłacono / Zapłata Częściowa" size="default" optional>
          <div className="flex flex-col gap-4">
            <RadioGroup
              defaultValue={selectedItem}
              onChange={(e): void => {
                form.resetField(`Platnosc.Zaplacono`)
                form.resetField(`Platnosc.DataZaplaty`)
                form.resetField(`Platnosc.ZnacznikZaplatyCzesciowej`)
                form.resetField(`Platnosc.ZaplataCzesciowa`)
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
              {selectedItem === 'Zaplacono' && (
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name={`Platnosc.Zaplacono`}
                    render={({ field }): JSX.Element => (
                      <SelectFormItem
                        field={field}
                        items={['1']}
                        label="Zaplacono"
                        placeholder="Wybierz Zaplacono"
                        tooltipMessage="Znacznik informujący, że kwota należności wynikająca z
                      faktury została zapłacona w całości

                      Podaje się „1” w przypadku, gdy kwota należności
                      wynikająca z faktury, do momentu jej wystawienia,
                      została zapłacona w całości.

                      W przypadku faktur zaliczkowych, wartość „1” w polu
                      Zaplacono oznacza, że cała kwota zaliczki wynikająca z
                      faktury została zapłacona do momentu wystawienia
                      faktury zaliczkowej."
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`Platnosc.DataZaplaty`}
                    render={({ field }): JSX.Element => (
                      <CalendarFormItem
                        field={field}
                        label="DataZaplaty"
                        handleSelect={(date): void =>
                          form.setValue(`Platnosc.DataZaplaty`, formatDateToYYYYMMDD(date))
                        }
                        tooltipMessage="Data zapłaty, jeśli do wystawienia faktury płatność
                      została dokonana

                      Podaje się datę zapłaty w formacie RRRR-MM-DD (np.
                      2023-09-21) w przypadku, gdy pole Zaplacono przyjęło
                      wartość „1”."
                      />
                    )}
                  />
                </div>
              )}
              {selectedItem === 'ZaplataCzesciowa' && (
                <>
                  <FormField
                    control={form.control}
                    name={`Platnosc.ZnacznikZaplatyCzesciowej`}
                    render={({ field }): JSX.Element => (
                      <SelectFormItem
                        field={field}
                        items={['1']}
                        label="ZnacznikZaplatyCzesciowej"
                        placeholder="Wybierz ZnacznikZaplatyCzesciowej"
                        tooltipMessage="Znacznik informujący, że kwota należności wynikająca z
                      faktury została zapłacona w części
                      Podaje się „1” w przypadku, gdy kwota należności
                      wynikająca z faktury, do momentu jej wystawienia,
                      została zapłacona w części."
                      />
                    )}
                  />
                  <div className="col-span-2">
                    <ZaplataCzesciowa formFieldNamePrefix="Platnosc." />
                  </div>
                </>
              )}
            </div>
          </div>
        </FormSection>
        <TerminPlatnosci formFieldNamePrefix="Platnosc." optional />
        <div className="flex flex-col gap-4">
          <RadioGroup
            defaultValue={selectedItem2}
            onChange={(e): void => {
              form.resetField(`Platnosc.FormaPlatnosci`)
              form.resetField(`Platnosc.PlatnoscInna`)
              form.resetField(`Platnosc.OpisPlatnosci`)
              const target = e.target as HTMLInputElement
              if (target.checked) setSelectedItem2(target.value)
            }}
            className="h-min"
          >
            {radioGroupLabels2.map((label) => (
              <div className="flex items-center gap-2" key={uniqueId + label}>
                <RadioGroupItem value={label} id={uniqueId + label} />
                <Label htmlFor={uniqueId + label}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex flex-col gap-2">
            {selectedItem2 === 'FormaPlatnosci' && (
              <>
                <FormField
                  control={form.control}
                  name={`Platnosc.FormaPlatnosci`}
                  render={({ field }): JSX.Element => (
                    <SelectFormItem
                      field={field}
                      items={[...FormaPlatnosci]}
                      label="FormaPlatnosci"
                      placeholder="Wybierz FormaPlatnosci"
                      tooltipMessage="Forma płatności

                    Podaje się:
                    - „1” - w przypadku płatności gotówką,
                    - „2” - w przypadku płatności kartą,
                    - „3” - w przypadku płatności bonem,
                    - „4” - w przypadku płatności czekiem,
                    - „5” - w przypadku kredytu,
                    - „6” - w przypadku płatności przelewem,
                    - „7” - w przypadku płatności mobilnej.

                    Pole może dotyczyć płatności już dokonanej lub płatności
                    przyszłej.

                    Pole FormaPlatnosci może wystąpić tylko jeden raz. W
                    przypadku, gdy należność z faktury została/będzie
                    zapłacona przy użyciu różnych form płatności zamiast
                    pola FormaPlatnosci wypełnia się pola PlatnoscInna oraz
                    OpisPlatnosci."
                    />
                  )}
                />
              </>
            )}
            {selectedItem2 === 'PlatnoscInna' && (
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name={`Platnosc.PlatnoscInna`}
                  render={({ field }): JSX.Element => (
                    <SelectFormItem
                      field={field}
                      items={['1']}
                      label="PlatnoscInna"
                      placeholder="Wybierz PlatnoscInna"
                      tooltipMessage="Znacznik innej formy płatności

                    Podaje się „1” – inna forma płatności, w przypadku
                    zawarcia na fakturze informacji o płatności w formie innej
                    niż przewidziana do wyboru w polu FormaPlatnosci
                    (opcje „1” – „7”)."
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`Platnosc.OpisPlatnosci`}
                  render={({ field }): JSX.Element => (
                    <BasicFormItem
                      field={field}
                      label="OpisPlatnosci"
                      tooltipMessage="Doprecyzowanie innej formy płatności
                    Podaje się opis innej formy płatności, w przypadku, gdy
                    pole PlatnoscInna przyjmuje wartość „1”"
                    />
                  )}
                />
              </div>
            )}
          </div>
        </div>
        <RachunekBankowy formFieldNamePrefix="Platnosc." optional />
        <RachunekBankowyFaktora formFieldNamePrefix="Platnosc." optional />
        <Skonto formFieldNamePrefix="Platnosc." optional />
      </div>
    </FormSection>
  )
}

export default Platnosc
