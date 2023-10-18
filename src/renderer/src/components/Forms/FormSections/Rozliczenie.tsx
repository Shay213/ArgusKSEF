import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import Obciazenia from './Obciazenia'
import Odliczenia from './Odliczenia'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import { getUniqueId } from '@renderer/lib/utils'
import FormSection from '../FormItems-base/FormSection'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const radioGroupLabels = ['DoZaplaty', 'DoRozliczenia']

const Rozliczenie = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])

  const uniqueId = getUniqueId()
  return (
    <FormSection
      title="Rozliczenie"
      size="lg"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące dodatkowych
      rozliczeń na fakturze [element fakultatywny]"
    >
      <div className="flex flex-col gap-2">
        <Obciazenia formFieldNamePrefix="Rozliczenie." optional />
        <FormField
          control={form.control}
          name={`Rozliczenie.SumaObciazen`}
          render={({ field }): JSX.Element => (
            <BasicFormItem
              field={field}
              label="SumaObciazen"
              optional
              tooltipMessage="Suma obciążeń [pole fakultatywne]
              Podaje się sumę kwot wskazanych w polu Kwota w
              elementach Obciazenia."
            />
          )}
        />
        <Odliczenia formFieldNamePrefix="Rozliczenie." />
        <FormField
          control={form.control}
          name={`Rozliczenie.SumaOdliczen`}
          render={({ field }): JSX.Element => (
            <BasicFormItem
              field={field}
              label="SumaOdliczen"
              optional
              tooltipMessage="Suma odliczeń [pole fakultatywne]
              Podaje się sumę kwot wskazanych w polu Kwota w
              elementach Odliczenia.
              "
            />
          )}
        />
        <div className="flex flex-col gap-4">
          <RadioGroup
            defaultValue={selectedItem}
            onChange={(e): void => {
              form.resetField(`Rozliczenie.DoRozliczenia`)
              form.resetField(`Rozliczenie.DoZaplaty`)
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
            {selectedItem === 'DoZaplaty' && (
              <FormField
                control={form.control}
                name={`Rozliczenie.DoZaplaty`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="DoZaplaty"
                    tooltipMessage="Kwota należności do zapłaty równa polu P_15
                  powiększonemu o Obciazenia i pomniejszonemu o
                  Odliczenia

                  Podaje się kwotę pozostałą do zapłaty stanowiącą wynik
                  powiększenia kwoty należności ogółem, wynikającej z
                  faktury (P_15), o sumę obciążeń i pomniejszenia jej o
                  sumę odliczeń.

                  Sekwencja składająca się z wyboru pomiędzy dwoma
                  polami DoZaplaty oraz DoRozliczenia ma charakter
                  fakultatywny. Jeżeli jednak podatnik zdecyduje się
                  wypełnić tę sekwencję, wówczas obligatoryjne staje się
                  wypełnienie jednego z ww. pól (w zależności od sytuacji
                  pole DoZaplaty lub DoRozliczenia).
                  "
                  />
                )}
              />
            )}
            {selectedItem === 'DoRozliczenia' && (
              <FormField
                control={form.control}
                name={`Rozliczenie.DoRozliczenia`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="DoRozliczenia"
                    tooltipMessage="Kwota nadpłacona do rozliczenia/zwrotu

                  Podaje się kwotę nadpłaconą do rozliczenia/zwrotu
                  stanowiącą wynik powiększenia kwoty należności
                  ogółem, wynikającej z faktury (P_15) o sumę obciążeń i
                  pomniejszenia jej o sumę odliczeń.

                  Sekwencja składająca się z wyboru pomiędzy dwoma
                  polami DoZaplaty oraz DoRozliczenia ma charakter
                  fakultatywny. Jeżeli jednak podatnik zdecyduje się
                  wypełnić tę sekwencję, wówczas obligatoryjne staje się
                  wypełnienie jednego z ww. pól (w zależności od sytuacji
                  pole DoZaplaty lub DoRozliczenia)."
                  />
                )}
              />
            )}
          </div>
        </div>
      </div>
    </FormSection>
  )
}

export default Rozliczenie
