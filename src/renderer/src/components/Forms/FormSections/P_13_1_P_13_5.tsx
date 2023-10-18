import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import { useState } from 'react'
import { getUniqueId } from '@renderer/lib/utils'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Label } from '@renderer/components/ui/label'
import FormSection from '../FormItems-base/FormSection'
import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  optional?: boolean
}

const radioGroupLabels = ['P_13_1', 'P_13_2', 'P_13_3', 'P_13_4', 'P_13_5']

const P_13_1_P_13_5 = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  const [selectedItem, setSelectedItem] = useState(radioGroupLabels[0])

  const uniqueId = getUniqueId()
  return (
    <FormSection title="P_13_1 do P_13_5" size="lg" optional={optional}>
      <div className="flex flex-col gap-4">
        <RadioGroup
          defaultValue={selectedItem}
          onChange={(e): void => {
            form.resetField(`P_13_1`)
            form.resetField(`P_14_1`)
            form.resetField(`P_14_1W`)

            form.resetField(`P_13_2`)
            form.resetField(`P_14_2`)
            form.resetField(`P_14_2W`)

            form.resetField(`P_13_3`)
            form.resetField(`P_14_3`)
            form.resetField(`P_14_3W`)

            form.resetField(`P_13_4`)
            form.resetField(`P_14_4`)
            form.resetField(`P_14_4W`)

            form.resetField(`P_13_5`)
            form.resetField(`P_14_5`)
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
          {selectedItem === 'P_13_1' && (
            <>
              <FormField
                control={form.control}
                name={`P_13_1`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_13_1"
                    tooltipMessage="Suma wartości sprzedaży netto ze stawką podstawową -
                  aktualnie 23% albo 22%. W przypadku faktur
                  zaliczkowych, kwota zaliczki netto. W przypadku faktur
                  korygujących, kwota różnicy, o której mowa w art. 106j
                  ust. 2 pkt 5 ustawy

                  Sekwencję złożoną z pól P_13_1, P_14_1 oraz P_14_1W
                  wypełnia się w przypadku wystąpienia na fakturze
                  sprzedaży objętej stawką podstawową - aktualnie 23%
                  albo 22%. Sekwencja nie dotyczy procedury marży."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`P_14_1`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_14_1"
                    tooltipMessage="Kwota podatku od sumy wartości sprzedaży netto objętej
                  stawką podstawową - aktualnie 23% albo 22%. W
                  przypadku faktur zaliczkowych, kwota podatku wyliczona
                  według wzoru, o którym mowa w art. 106f ust. 1 pkt 3
                  ustawy. W przypadku faktur korygujących, kwota różnicy,
                  o której mowa w art. 106j ust. 2 pkt 5 ustawy

                  Sekwencję złożoną z pól P_13_1, P_14_1 oraz P_14_1W
                  wypełnia się w przypadku wystąpienia na fakturze
                  sprzedaży objętej stawką podstawową - aktualnie 23%
                  albo 22%. Sekwencja nie dotyczy procedury marży."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`P_14_1W`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_14_1W"
                    optional
                    tooltipMessage="W przypadku, gdy faktura jest wystawiona w walucie
                  obcej, kwota podatku od sumy wartości sprzedaży netto
                  objętej stawką podstawową, przeliczona zgodnie z
                  przepisami Działu VI w związku z art. 106e ust. 11 ustawy
                  - aktualnie 23% albo 22%. W przypadku faktur
                  zaliczkowych, kwota podatku wyliczona według wzoru, o
                  którym mowa w art. 106f ust. 1 pkt 3 ustawy. W
                  przypadku faktur korygujących, kwota różnicy, o której
                  mowa w art. 106j ust. 2 pkt 5 ustawy [pole opcjonalne]

                  Sekwencję złożoną z pól P_13_1, P_14_1 oraz P_14_1W
                  wypełnia się w przypadku wystąpienia na fakturze
                  sprzedaży objętej stawką podstawową - aktualnie 23%
                  albo 22%. Sekwencja nie dotyczy procedury marży"
                  />
                )}
              />
            </>
          )}
          {selectedItem === 'P_13_2' && (
            <>
              <FormField
                control={form.control}
                name={`P_13_2`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_13_2"
                    tooltipMessage="Suma wartości sprzedaży netto objętej stawką obniżoną
                  pierwszą - aktualnie 8% albo 7%. W przypadku faktur
                  zaliczkowych, kwota zaliczki netto. W przypadku faktur
                  korygujących, kwota różnicy, o której mowa w art. 106j
                  ust. 2 pkt 5 ustawy


                  Sekwencję złożoną z pól P_13_2, P_14_2 oraz P_14_2W
                  wypełnia się w przypadku wystąpienia na fakturze
                  sprzedaży objętej stawką obniżoną pierwszą - aktualnie
                  8% albo 7%. Sekwencja nie dotyczy procedury marży."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`P_14_2`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_14_2"
                    tooltipMessage="Kwota podatku od sumy wartości sprzedaży netto objętej
                  stawką obniżoną pierwszą - aktualnie 8% albo 7%. W
                  przypadku faktur zaliczkowych, kwota podatku wyliczona
                  według wzoru, o którym mowa w art. 106f ust. 1 pkt 3
                  ustawy. W przypadku faktur korygujących, kwota różnicy,
                  o której mowa w art. 106j ust. 2 pkt 5 ustawy

                  Sekwencję złożoną z pól P_13_2, P_14_2 oraz P_14_2W
                  wypełnia się w przypadku wystąpienia na fakturze
                  sprzedaży objętej stawką obniżoną pierwszą - aktualnie
                  8% albo 7%. Sekwencja nie dotyczy procedury marży."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`P_14_2W`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_14_2W"
                    optional
                    tooltipMessage="W przypadku, gdy faktura jest wystawiona w walucie
                  obcej, kwota podatku od sumy wartości sprzedaży netto
                  objętej stawką obniżoną, przeliczona zgodnie z
                  przepisami Działu VI w związku z art. 106e ust. 11 ustawy
                  - aktualnie 8% albo 7%. W przypadku faktur zaliczkowych,
                  kwota podatku wyliczona według wzoru, o którym mowa
                  w art. 106f ust. 1 pkt 3 ustawy. W przypadku faktur
                  korygujących, kwota różnicy, o której mowa w art. 106j
                  ust. 2 pkt 5 ustawy [pole opcjonalne]

                  Sekwencję złożoną z pól P_13_2, P_14_2 oraz P_14_2W
                  wypełnia się w przypadku wystąpienia na fakturze
                  sprzedaży objętej stawką obniżoną pierwszą - aktualnie
                  8% albo 7%. Sekwencja nie dotyczy procedury marży."
                  />
                )}
              />
            </>
          )}
          {selectedItem === 'P_13_3' && (
            <>
              <FormField
                control={form.control}
                name={`P_13_3`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_13_3"
                    tooltipMessage="Suma wartości sprzedaży netto objętej stawką obniżoną
                  drugą - aktualnie 5%. W przypadku faktur zaliczkowych,
                  kwota zaliczki netto. W przypadku faktur korygujących,
                  kwota różnicy, o której mowa w art. 106j ust. 2 pkt 5
                  ustawy

                  Sekwencję złożoną z pól P_13_3, P_14_3 oraz P_14_3W
                  wypełnia się w przypadku wystąpienia na fakturze
                  sprzedaży objętej stawką obniżoną drugą - aktualnie 5%.
                  Sekwencja nie dotyczy procedury marży."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`P_14_3`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_14_3"
                    tooltipMessage="Kwota podatku od sumy wartości sprzedaży netto objętej
                  stawką obniżoną drugą - aktualnie 5%. W przypadku
                  faktur zaliczkowych, kwota podatku wyliczona według
                  wzoru, o którym mowa w art. 106f ust. 1 pkt 3 ustawy. W
                  przypadku faktur korygujących, kwota różnicy, o której
                  mowa w art. 106j ust. 2 pkt 5 ustawy

                  Sekwencję złożoną z pól P_13_3, P_14_3 oraz P_14_3W
                  wypełnia się w przypadku wystąpienia na fakturze
                  sprzedaży objętej stawką obniżoną drugą - aktualnie 5%.
                  Sekwencja nie dotyczy procedury marży."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`P_14_3W`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_14_3W"
                    optional
                    tooltipMessage="W przypadku, gdy faktura jest wystawiona w walucie
                  obcej, kwota podatku od sumy wartości sprzedaży netto
                  objętej stawką obniżoną drugą, przeliczona zgodnie z
                  przepisami Działu VI w związku z art. 106e ust. 11 ustawy
                  - aktualnie 5%. W przypadku faktur zaliczkowych, kwota
                  podatku wyliczona według wzoru, o którym mowa w art.
                  106f ust. 1 pkt 3 ustawy. W przypadku faktur
                  korygujących, kwota różnicy, o której mowa w art. 106j
                  ust. 2 pkt 5 ustawy [pole opcjonalne]


                  Sekwencję złożoną z pól P_13_3, P_14_3 oraz P_14_3W
                  wypełnia się w przypadku wystąpienia na fakturze
                  sprzedaży objętej stawką obniżoną drugą - aktualnie 5%.
                  Sekwencja nie dotyczy procedury marży."
                  />
                )}
              />
            </>
          )}
          {selectedItem === 'P_13_4' && (
            <>
              <FormField
                control={form.control}
                name={`P_13_4`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_13_4"
                    tooltipMessage="Suma wartości sprzedaży netto objętej ryczałtem dla
                  taksówek osobowych. W przypadku faktur zaliczkowych,
                  kwota zaliczki netto. W przypadku faktur korygujących,
                  kwota różnicy, o której mowa w art. 106j ust. 2 pkt 5
                  ustawy

                  Sekwencję złożoną z pól P_13_4, P_14_4 oraz P_14_4W
                  wypełnia się w przypadku wystąpienia na fakturze
                  sprzedaży objętej stawką obniżoną trzecią – ryczałtem
                  dla taksówek osobowych."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`P_14_4`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_14_4"
                    tooltipMessage="Kwota podatku od sumy wartości sprzedaży netto w
                  przypadku ryczałtu dla taksówek osobowych. W
                  przypadku faktur zaliczkowych, kwota podatku wyliczona
                  według wzoru, o którym mowa w art. 106f ust. 1 pkt 3
                  ustawy. W przypadku faktur korygujących, kwota różnicy,
                  o której mowa w art. 106j ust. 2 pkt 5 ustawy

                  Sekwencję złożoną z pól P_13_4, P_14_4 oraz P_14_4W
                  wypełnia się w przypadku wystąpienia na fakturze
                  sprzedaży objętej stawką obniżoną trzecią – ryczałtem
                  dla taksówek osobowych."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`P_14_4W`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_14_4W"
                    optional
                    tooltipMessage="W przypadku, gdy faktura jest wystawiona w walucie
                  obcej, kwota podatku ryczałtu dla taksówek osobowych,
                  przeliczona zgodnie z przepisami Działu VI w związku z
                  art. 106e ust. 11 ustawy. W przypadku faktur
                  zaliczkowych, kwota podatku wyliczona według wzoru, o
                  którym mowa w art. 106f ust. 1 pkt 3 ustawy. W
                  przypadku faktur korygujących, kwota różnicy, o której
                  mowa w art. 106j ust. 2 pkt 5 ustawy [pole opcjonalne]


                  Sekwencję złożoną z pól P_13_4, P_14_4 oraz P_14_4W
                  wypełnia się w przypadku wystąpienia na fakturze sprzedaży
                  objętej stawką obniżoną trzecią – ryczałtem dla taksówek osobowych."
                  />
                )}
              />
            </>
          )}
          {selectedItem === 'P_13_5' && (
            <>
              <FormField
                control={form.control}
                name={`P_13_5`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_13_5"
                    tooltipMessage="Suma wartości sprzedaży netto w przypadku procedury
                  szczególnej, o której mowa w dziale XII w rozdziale 6a
                  ustawy. W przypadku faktur zaliczkowych, kwota zaliczki
                  netto. W przypadku faktur korygujących, kwota różnicy,
                  o której mowa w art. 106j ust. 2 pkt 5 ustawy

                  Sekwencję złożoną z pól P_13_5 oraz P_14_5 wypełnia
                  się w przypadku wystąpienia na fakturze sprzedaży w
                  procedurze szczególnej, o której mowa w dziale XII w
                  rozdziale 6a ustawy."
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`P_14_5`}
                render={({ field }): JSX.Element => (
                  <BasicFormItem
                    field={field}
                    label="P_14_5"
                    optional
                    tooltipMessage="Kwota podatku od wartości dodanej w przypadku
                  procedury szczególnej, o której mowa w dziale XII w
                  rozdziale 6a ustawy. W przypadku faktur zaliczkowych,
                  kwota podatku wyliczona według wzoru, o którym mowa
                  w art. 106f ust. 1 pkt 3 ustawy. W przypadku faktur
                  korygujących, kwota różnicy, o której mowa w art. 106j
                  ust. 2 pkt 5 ustawy [pole opcjonalne]

                  Sekwencję złożoną z pól P_13_5 oraz P_14_5 wypełnia
                  się w przypadku wystąpienia na fakturze sprzedaży w
                  procedurze szczególnej, o której mowa w dziale XII w
                  rozdziale 6a ustawy."
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

export default P_13_1_P_13_5
