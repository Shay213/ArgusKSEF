import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import { formatDateToYYYYMMDD } from '@renderer/lib/utils'
import CalendarFormItem from '../FormItems-base/CalendarFormItem'

interface Props {
  optional?: boolean
}

const P_1 = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`P_1`}
      render={({ field }): JSX.Element => (
        <CalendarFormItem
          field={field}
          label="P_1"
          handleSelect={(date): void => form.setValue('P_1', formatDateToYYYYMMDD(date))}
          optional={optional}
          tooltipMessage="Data wystawienia faktury, z zastrzeżeniem art. 106na ust.
          1 ustawy

          Podaje się datę wystawienia faktury, o której mowa w
          art. 106e ust. 1 pkt 1 ustawy. W przypadku, gdy data
          wystawienia faktury, wskazana w polu P_1, będzie inna
          niż data przesłania jej do KSeF, za datę wystawienia
          zgodnie z art. 106na ust. 1 ustawy uznaje się datę
          przesłania faktury do KSeF.

          Przykład:
          W polu P_1 podatnik wskazał 2023-09-01, natomiast
          fakturę przesłał do KSeF w dniu 2023-09-02. Fakturze
          został nadany numer KSeF.

          Pomimo wskazania w polu P_1 daty 1 września 2023 r.,
          zgodnie z art. 106na ust. 1 ustawy, uznaje się, że faktura
          została wystawiona w dniu 2 września 2023 r.
          Data wystawienia określona zgodnie z powyższym
          przepisem jest kluczowa dla weryfikacji terminowości
          wystawienia faktury ustrukturyzowanej.

          Na gruncie przepisów obowiązujących od 1 lipca 2024 r.,
          w przypadku faktur, o których mowa w art. 106nf ust. 1
          oraz 106nh ust. 1 ustawy, data wskazana w polu P_1
          będzie uznana za datę wystawienia faktury.
          W pozostałych przypadkach datą wystawienia faktury
          ustrukturyzowanej, zgodnie z art. 106na ust. 1 ustawy,
          nadal będzie data przesłania faktury do KSeF."
        />
      )}
    />
  )
}

export default P_1
