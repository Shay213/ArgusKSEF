import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import defaultTransportValues from '@renderer/data/defaultFormValues/defaultTransportValues'
import { OpisLadunku, RodzajTransportu } from '@renderer/lib/zodSchemas'
import { useState } from 'react'
import { getUniqueId } from '@renderer/lib/utils'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import Przewoznik from './Przewoznik'
import Adres from './Adres'
import WysylkaPrzez from './WysylkaPrzez'
import { Button } from '@renderer/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import FormSection from '../FormItems-base/FormSection'
import SelectFormItem from '../FormItems-base/SelectFormItem'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const radioGroupLabels = ['RodzajTransportu', 'TransportInny']
const radioGroupLabels2 = ['OpisLadunku', 'LadunekInny']

const Transport = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  const form = useFormContext()
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])
  const [selectedItem2, setSelectedItem2] = useState(radioGroupLabels2[0])
  const { fields, append, remove } = useFieldArray({
    name: `${formFieldNamePrefix ?? ''}Transport`,
    control: form.control
  })

  const uniqueId = getUniqueId()

  return (
    <FormSection
      title="Transport"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące wystąpienia na
      fakturze procedury VAT marża oraz adnotacje odnoszące
      się do ww. procedury"
    >
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <FormSection key={field.id} title={`Transport ${index + 1}`} size="sm">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-4">
                <RadioGroup
                  defaultValue={selectedItem}
                  onChange={(e): void => {
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}Transport.${index}.RodzajTransportu`
                    )
                    form.resetField(`${formFieldNamePrefix ?? ''}Transport.${index}.TransportInny`)
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}Transport.${index}.OpisInnegoTransportu`
                    )
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
                  {selectedItem === 'RodzajTransportu' && (
                    <FormField
                      name={`${formFieldNamePrefix ?? ''}Transport.${index}.RodzajTransportu`}
                      control={form.control}
                      render={({ field }): JSX.Element => (
                        <SelectFormItem
                          field={field}
                          items={[...RodzajTransportu]}
                          label="RodzajTransportu"
                          tooltipMessage="Rodzaj zastosowanego transportu w przypadku
                        dokonanej dostawy towarów

                        Podaje się:
                        - „1” – w przypadku transportu morskiego,
                        - „2” – w przypadku transportu kolejowego,
                        - „3” – w przypadku transportu drogowego,
                        - „4” – w przypadku transportu lotniczego,
                        - „5” – w przypadku przesyłki pocztowej,
                        - „7” – w przypadku stałych instalacji przesyłowych,
                        - „8” – w przypadku żeglugi śródlądowej.

                        Obowiązujące kody rodzaju transportu wynikają z treści
                        Rozporządzenia wykonawczego Komisji (UE) 2015/2447 z
                        dnia 24 listopada 2015 r. ustanawiającego szczegółowe
                        zasady wykonania niektórych przepisów rozporządzenia
                        Parlamentu Europejskiego i Rady (UE) nr 952/2013
                        ustanawiającego unijny kodeks celny (kod „6” został
                        pominięty celowo)."
                        />
                      )}
                    />
                  )}
                  {selectedItem === 'TransportInny' && (
                    <div className="flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name={`${formFieldNamePrefix ?? ''}Transport.${index}.TransportInny`}
                        render={({ field }): JSX.Element => (
                          <SelectFormItem
                            field={field}
                            label="TransportInny"
                            items={['1']}
                            tooltipMessage="Znacznik innego rodzaju transportu

                          W przypadku wystąpienia innego rodzaju transportu niż
                          przewidziane do wyboru w polu RodzajTransportu („1” -
                          „5”, „7”, „8”), podaje się „1” - inny rodzaj transportu."
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`${formFieldNamePrefix ?? ''}Transport.${index}.OpisInnegoTransportu`}
                        render={({ field }): JSX.Element => (
                          <BasicFormItem
                            field={field}
                            label="OpisInnegoTransportu"
                            tooltipMessage="Opis innego rodzaju transportu

                          W przypadku wskazania „1” w polu TransportInny,
                          podaje się opis innego rodzaju transportu"
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              <Przewoznik
                formFieldNamePrefix={`${formFieldNamePrefix ?? ''}Transport.${index}.`}
                optional
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}Transport.${index}.NrZleceniaTransportu`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="NrZleceniaTransportu"
                    optional
                    tooltipMessage="Numer zlecenia transportu [pole fakultatywne]

                    Podaje się numer zlecenia transportu, na podstawie
                    którego realizowany jest transport towarów."
                  />
                )}
              />
              <div className="flex flex-col gap-4">
                <RadioGroup
                  defaultValue={selectedItem2}
                  onChange={(e): void => {
                    form.resetField(`${formFieldNamePrefix ?? ''}Transport.${index}.OpisLadunku`)
                    form.resetField(`${formFieldNamePrefix ?? ''}Transport.${index}.LadunekInny`)
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}Transport.${index}.OpisInnegoLadunku`
                    )
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
                  {selectedItem2 === 'OpisLadunku' && (
                    <FormField
                      name={`${formFieldNamePrefix ?? ''}Transport.${index}.OpisLadunku`}
                      control={form.control}
                      render={({ field }): JSX.Element => (
                        <SelectFormItem
                          field={field}
                          items={[...OpisLadunku]}
                          label="OpisLadunku"
                          tooltipMessage="Rodzaj ładunku (rodzaj opakowania zbiorczego, w którym
                          transportowany jest towar)

                          Podaje się liczbę odpowiadającą danemu rodzajowi
                          opakowania zbiorczego:
                          - „1” - Bańka,
                          - „2” - Beczka,
                          - „3” - Butla,
                          - „4” - Karton,
                          - „5” - Kanister,
                          - „6” - Klatka,
                          - „7” - Kontener,
                          - „8” - Kosz/koszyk,
                          - „9” - Łubianka,
                          - „10” - Opakowanie zbiorcze,
                          - „11” - Paczka,
                          - „12” - Pakiet,
                          - „13” - Paleta,
                          - „14” - Pojemnik,
                          - „15” - Pojemnik do ładunków masowych stałych,
                          - „16” - Pojemnik do ładunków masowych w postaci
                          płynnej,
                          - „17” - Pudełko,
                          - „18” - Puszka,
                          - „19” - Skrzynia,
                          - „20” - Worek."
                        />
                      )}
                    />
                  )}
                  {selectedItem2 === 'LadunekInny' && (
                    <div className="flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name={`${formFieldNamePrefix ?? ''}Transport.${index}.LadunekInny`}
                        render={({ field }): JSX.Element => (
                          <SelectFormItem
                            field={field}
                            label="LadunekInny"
                            items={['1']}
                            tooltipMessage="Znacznik innego ładunku, w tym ładunek mieszany

                          W przypadku wystąpienia innego rodzaju opakowania
                          zbiorczego (niż przewidziany w polu OpisLadunku), w
                          którym transportowany jest towar lub ładunku
                          mieszanego podaje się „1” - inny ładunek."
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`${formFieldNamePrefix ?? ''}Transport.${index}.OpisInnegoLadunku`}
                        render={({ field }): JSX.Element => (
                          <BasicFormItem
                            field={field}
                            label="OpisInnegoLadunku"
                            tooltipMessage="Opis innego ładunku

                          W przypadku wskazania „1” w polu LadunekInny podaje
                          się opis innego ładunku lub opis ładunku mieszanego."
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}Transport.${index}.JednostkaOpakowania`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="JednostkaOpakowania"
                    optional
                    tooltipMessage="Jednostka opakowania [pole fakultatywne]

                    Podaje się dodatkowe informacje opisujące ładunek,
                    dotyczące w szczególności zbiorczego opakowania
                    ładunku, określonego w polach dotyczących opisu
                    ładunku (np. ilość jednostek towaru w przeliczeniu na
                    jedną sztukę opakowania zbiorczego).

                    Przykład:
                    1 karton/ 30 sztuk"
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}Transport.${index}.DataGodzRozpTransportu`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="DataGodzRozpTransportu"
                    type="datetime-local"
                    optional
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`${formFieldNamePrefix ?? ''}Transport.${index}.DataGodzZakTransportu`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="DataGodzZakTransportu"
                    type="datetime-local"
                    optional
                  />
                )}
              />
              <Adres
                heading="WysylkaZ"
                formFieldNamePrefix={`${formFieldNamePrefix ?? ''}Transport.${index}.WysylkaZ.`}
                headingSize="sm"
                optional
              />
              <WysylkaPrzez
                formFieldNamePrefix={`${formFieldNamePrefix ?? ''}Transport.${index}.`}
                optional
              />
              <Adres
                heading="WysylkaDo"
                formFieldNamePrefix={`${formFieldNamePrefix ?? ''}Transport.${index}.WysylkaDo.`}
                headingSize="sm"
                optional
              />
            </div>
            <Button
              className="mt-2"
              type="button"
              onClick={(): void => remove(index)}
              variant="destructive"
            >
              Usuń Transport {index + 1} <Trash2 className="w-4 h-4 ml-2" />
            </Button>
          </FormSection>
        ))}
        <div>
          <Button type="button" onClick={(): void => append(defaultTransportValues)}>
            Dodaj Transport <Plus className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </FormSection>
  )
}

export default Transport
