import { FormField } from '@renderer/components/ui/form'
import FormSection from '../FormItems-base/FormSection'
import defaultNowySrodekTransportuValues from '@renderer/data/defaultFormValues/defaultNowySrodekTransportuValues'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@renderer/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { formatDateToYYYYMMDD, getUniqueId } from '@renderer/lib/utils'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import CalendarFormItem from '../FormItems-base/CalendarFormItem'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
  formFieldNamePrefix?: string
}

const TOOLTIPS = {
  P_22A: `Jeśli pole P_22 równa się „1” - należy podać datę
  dopuszczenia nowego środka transportu do użytku w
  formacie RRRR-MM-DD (np.: 2023-09-22).

  Za moment dopuszczenia do użytku pojazdu lądowego
  uznaje się dzień, w którym został on pierwszy raz
  zarejestrowany w celu dopuszczenia do ruchu
  drogowego lub w którym po raz pierwszy podlegał on
  obowiązkowi rejestracji w celu dopuszczenia do ruchu
  drogowego w zależności od tego, która z tych dat jest
  wcześniejsza; jeżeli nie można ustalić dnia pierwszej
  rejestracji pojazdu lądowego lub dnia, w którym podlegał
  on pierwszej rejestracji, za moment dopuszczenia do
  użytku tego pojazdu uznaje się dzień, w którym został on
  wydany przez producenta pierwszemu nabywcy, lub
  dzień, w którym został po raz pierwszy użyty dla celów
  demonstracyjnych przez producenta.

  Za moment dopuszczenia do użytku jednostki pływającej
  uznaje się dzień, w którym została ona wydana przez
  producenta pierwszemu nabywcy, lub dzień, w którym
  została po raz pierwszy użyta dla celów
  demonstracyjnych przez producenta.

  Za moment dopuszczenia do użytku statku powietrznego
  uznaje się dzień, w którym został on wydany przez
  producenta pierwszemu nabywcy, lub dzień, w którym
  został po raz pierwszy użyty dla celów demonstracyjnych
  przez producenta.`,
  P_NrWierszaNST: `Numer wiersza faktury, w którym wykazano dostawę
  nowego środka transportu`,
  P_22BMK: `Marka nowego środka transportu [pole fakultatywne]
  Jeśli pole P_22 równa się „1”, można podać markę
  nowego środka transportu.`,
  P_22BMD: `Model nowego środka transportu [pole fakultatywne]
  Jeśli pole P_22 równa się „1”, można podać model
  nowego środka transportu.`,
  P_22BK: `Kolor nowego środka transportu [pole fakultatywne]
  Jeśli pole P_22 równa się „1”, można podać kolor nowego
  środka transportu.`,
  P_22BNR: `Numer rejestracyjny nowego środka transportu [polefakultatywne]
  Jeśli pole P_22 równa się „1”, można podać numer
  rejestracyjny nowego środka transportu.`,
  P_22BRP: `Rok produkcji nowego środka transportu [pole
    fakultatywne]
    Jeśli pole P_22 równa się „1”, można podać rok produkcji
    nowego środka transportu.`
}

const radioGroupLabels = ['P_22B', 'P_22C', 'P_22D']
const radioGroupLabels2 = ['P_22B1', 'P_22B2', 'P_22B3', 'P_22B4']

const NowySrodekTransportu = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  const form = useFormContext()
  const { fields, append, remove } = useFieldArray({
    name: `${formFieldNamePrefix ?? ''}NowySrodekTransportu`,
    control: form.control
  })
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])
  const [selectedItem2, setSelectedItem2] = useState(radioGroupLabels2[0])

  const uniqueId = getUniqueId()

  return (
    <FormSection
      title="NowySrodekTransportu"
      size="sm"
      isOpen
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące nowego środka
      transportu, którego sprzedaż jest dokumentowana
      fakturą"
    >
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <FormSection key={field.id} title={`NowySrodekTransportu ${index + 1}`} size="xs">
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-3 gap-2 items-end">
                <FormField
                  control={form.control}
                  name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22A`}
                  render={({ field }): JSX.Element => (
                    <CalendarFormItem
                      field={field}
                      label="P_22A"
                      handleSelect={(date): void =>
                        form.setValue(
                          `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22A`,
                          formatDateToYYYYMMDD(date)
                        )
                      }
                      tooltipMessage={TOOLTIPS.P_22A}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_NrWierszaNST`}
                  render={({ field }): JSX.Element => (
                    <BasicFormItem
                      field={field}
                      label="P_NrWierszaNST"
                      type="number"
                      placeholder="1"
                      tooltipMessage={TOOLTIPS.P_NrWierszaNST}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22BMK`}
                  render={({ field }): JSX.Element => (
                    <BasicFormItem
                      field={field}
                      label="P_22BMK"
                      optional
                      tooltipMessage={TOOLTIPS.P_22BMK}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22BMD`}
                  render={({ field }): JSX.Element => (
                    <BasicFormItem
                      field={field}
                      label="P_22BMD"
                      optional
                      tooltipMessage={TOOLTIPS.P_22BMD}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22BK`}
                  render={({ field }): JSX.Element => (
                    <BasicFormItem
                      field={field}
                      label="P_22BK"
                      optional
                      tooltipMessage={TOOLTIPS.P_22BK}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22BNR`}
                  render={({ field }): JSX.Element => (
                    <BasicFormItem
                      field={field}
                      label="P_22BNR"
                      optional
                      tooltipMessage={TOOLTIPS.P_22BNR}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22BRP`}
                  render={({ field }): JSX.Element => (
                    <BasicFormItem
                      field={field}
                      label="P_22BRP"
                      optional
                      tooltipMessage={TOOLTIPS.P_22BRP}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-4">
                <RadioGroup
                  defaultValue={selectedItem}
                  onChange={(e): void => {
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22B`
                    )
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22B1`
                    )
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22B2`
                    )
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22B3`
                    )
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22B4`
                    )
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22BT`
                    )
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22C`
                    )
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22C1`
                    )
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22D`
                    )
                    form.resetField(
                      `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22D1`
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
                  {selectedItem === 'P_22B' && (
                    <div className="flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22B`}
                        render={({ field }): JSX.Element => (
                          <BasicFormItem
                            field={field}
                            label="P_22B"
                            type="number"
                            tooltipMessage="Jeśli pole P_22 równa się „1” a dostawa dotyczy
                          pojazdów lądowych, o których mowa w art. 2 pkt 10 lit. a
                          ustawy - należy podać przebieg pojazdu."
                          />
                        )}
                      />
                      <div className="flex flex-col gap-4">
                        <RadioGroup
                          defaultValue={selectedItem2}
                          onChange={(e): void => {
                            form.resetField(
                              `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22B1`
                            )
                            form.resetField(
                              `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22B2`
                            )
                            form.resetField(
                              `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22B3`
                            )
                            form.resetField(
                              `${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22B4`
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
                          {selectedItem2 === 'P_22B1' && (
                            <FormField
                              control={form.control}
                              name={`${
                                formFieldNamePrefix ?? ''
                              }NowySrodekTransportu.${index}.P_22B1`}
                              render={({ field }): JSX.Element => (
                                <BasicFormItem
                                  field={field}
                                  label="P_22B1"
                                  optional
                                  tooltipMessage="Jeśli pole P_22 równa się „1” a dostawa dotyczy
                                pojazdów lądowych, o których mowa w art. 2 pkt 10 lit. a
                                ustawy - można podać numer VIN [pole fakultatywne].

                                Uwaga!
                                Pola P_22B1, P_22B2, P_22B3 oraz P_22B4 wchodzą w
                                skład sekwencji typu „wybór”, co oznacza, że można
                                wypełnić tylko jedno pole spośród ww. pól."
                                />
                              )}
                            />
                          )}
                          {selectedItem2 === 'P_22B2' && (
                            <FormField
                              control={form.control}
                              name={`${
                                formFieldNamePrefix ?? ''
                              }NowySrodekTransportu.${index}.P_22B2`}
                              render={({ field }): JSX.Element => (
                                <BasicFormItem
                                  field={field}
                                  label="P_22B2"
                                  optional
                                  tooltipMessage="Jeśli pole P_22 równa się „1” a dostawa dotyczy
                                pojazdów lądowych, o których mowa w art. 2 pkt 10 lit. a
                                ustawy - można podać numer nadwozia [polefakultatywne].

                                Uwaga!
                                Pola P_22B1, P_22B2, P_22B3 oraz P_22B4 wchodzą w
                                skład sekwencji typu „wybór”, co oznacza, że można
                                wypełnić tylko jedno pole spośród ww. pól."
                                />
                              )}
                            />
                          )}
                          {selectedItem2 === 'P_22B3' && (
                            <FormField
                              control={form.control}
                              name={`${
                                formFieldNamePrefix ?? ''
                              }NowySrodekTransportu.${index}.P_22B3`}
                              render={({ field }): JSX.Element => (
                                <BasicFormItem
                                  field={field}
                                  label="P_22B3"
                                  optional
                                  tooltipMessage="Jeśli pole P_22 równa się „1” a dostawa dotyczy
                                pojazdów lądowych, o których mowa w art. 2 pkt 10 lit. a
                                ustawy - można podać numer podwozia [polefakultatywne].

                                Uwaga!
                                Pola P_22B1, P_22B2, P_22B3 oraz P_22B4 wchodzą w
                                skład sekwencji typu „wybór”, co oznacza, że można
                                wypełnić tylko jedno pole spośród ww. pól."
                                />
                              )}
                            />
                          )}
                          {selectedItem2 === 'P_22B4' && (
                            <FormField
                              control={form.control}
                              name={`${
                                formFieldNamePrefix ?? ''
                              }NowySrodekTransportu.${index}.P_22B4`}
                              render={({ field }): JSX.Element => (
                                <BasicFormItem
                                  field={field}
                                  label="P_22B4"
                                  optional
                                  tooltipMessage="Jeśli pole P_22 równa się „1” a dostawa dotyczy
                                pojazdów lądowych, o których mowa w art. 2 pkt 10 lit. a
                                ustawy - można podać numer ramy [pole fakultatywne].

                                Uwaga!
                                Pola P_22B1, P_22B2, P_22B3 oraz P_22B4 wchodzą w
                                skład sekwencji typu „wybór”, co oznacza, że można
                                wypełnić tylko jedno pole spośród ww. pól."
                                />
                              )}
                            />
                          )}
                        </div>
                      </div>
                      <FormField
                        control={form.control}
                        name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22BT`}
                        render={({ field }): JSX.Element => (
                          <BasicFormItem
                            field={field}
                            label="P_22BT"
                            optional
                            tooltipMessage="Jeśli pole P_22 równa się „1” a dostawa dotyczy
                          pojazdów lądowych, o których mowa w art. 2 pkt 10 lit. a
                          ustawy - można podać typ nowego środka transportu
                          [pole fakultatywne]."
                          />
                        )}
                      />
                    </div>
                  )}
                  {selectedItem === 'P_22C' && (
                    <div className="flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22C`}
                        render={({ field }): JSX.Element => (
                          <BasicFormItem
                            field={field}
                            label="P_22C"
                            type="number"
                            tooltipMessage="Jeśli pole P_22 równa się „1” a dostawa dotyczy
                          jednostek pływających, o których mowa w art. 2 pkt 10
                          lit. b ustawy, należy podać liczbę godzin roboczych
                          używania nowego środka transportu."
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22C1`}
                        render={({ field }): JSX.Element => (
                          <BasicFormItem
                            field={field}
                            label="P_22C1"
                            optional
                            tooltipMessage="Jeśli pole P_22 równa się „1” a dostawa dotyczy
                          jednostek pływających, o których mowa w art. 2 pkt 10
                          lit. b ustawy, można podać numer kadłuba nowego
                          środka transportu [pole fakultatywne]."
                          />
                        )}
                      />
                    </div>
                  )}
                  {selectedItem === 'P_22D' && (
                    <div className="flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22D`}
                        render={({ field }): JSX.Element => (
                          <BasicFormItem
                            field={field}
                            label="P_22D"
                            type="number"
                            tooltipMessage="Jeśli pole P_22 równa się „1” a dostawa dotyczy statków
                          powietrznych, o których mowa w art. 2 pkt 10 lit. c
                          ustawy, należy podać liczbę godzin roboczych używania
                          nowego środka transportu."
                          />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`${formFieldNamePrefix ?? ''}NowySrodekTransportu.${index}.P_22D1`}
                        render={({ field }): JSX.Element => (
                          <BasicFormItem
                            field={field}
                            label="P_22D1"
                            optional
                            tooltipMessage="Jeśli pole P_22 równa się „1” a dostawa dotyczy statków
                          powietrznych, o których mowa w art. 2 pkt 10 lit. c
                          ustawy, można podać numer fabryczny nowego środka
                          transportu [pole fakultatywne]."
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              className="mt-2"
              type="button"
              onClick={(): void => remove(index)}
              variant="destructive"
            >
              Usuń NowySrodekTransportu {index + 1} <Trash2 className="w-4 h-4 ml-2" />
            </Button>
          </FormSection>
        ))}
        <div>
          <Button type="button" onClick={(): void => append(defaultNowySrodekTransportuValues)}>
            Dodaj NowySrodekTransportu <Plus className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </FormSection>
  )
}

export default NowySrodekTransportu
