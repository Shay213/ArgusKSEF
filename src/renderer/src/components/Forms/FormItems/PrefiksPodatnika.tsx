import { KodyKrajowUE } from '@renderer/lib/zodSchemas'
import { useFormContext } from 'react-hook-form'
import { FormField } from '@renderer/components/ui/form'
import PopoverSearchFormItem from '../FormItems-base/PopoverSearchFormItem'

interface Props {
  handleSelect: (value) => void
  formFieldNamePrefix?: string
  optional?: boolean
}

const PrefiksPodatnika = ({ handleSelect, optional, formFieldNamePrefix }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={`${formFieldNamePrefix ?? ''}PrefiksPodatnika`}
      render={({ field }): JSX.Element => (
        <PopoverSearchFormItem
          field={field}
          optional={optional}
          handleSelect={handleSelect}
          label="PrefiksPodatnika"
          items={[...KodyKrajowUE]}
          placeholder="Wybierz prefiks podatnika"
          tooltipMessage="Kod (prefiks) podatnika VAT UE dla przypadków
                          określonych w art. 97 ust. 10 pkt 2 i 3 ustawy oraz w
                          przypadku, o którym mowa w art. 136 ust. 1 pkt 3 ustawy
                          [pole opcjonalne]

                          Należy podać literowy kod kraju „PL” podatnika w
                          przypadku wystawienia faktury dokumentującej:
                          - wewnątrzwspólnotową dostawę towarów,- świadczenie usług,
                          do których stosuje się art. 100 ust. 1
                          pkt 4 ustawy, dla podatników podatku od wartości
                          dodanej lub osób prawnych niebędących takimi
                          podatnikami, zidentyfikowanych na potrzeby podatku od
                          wartości dodanej,
                          - dostawę realizowaną w ramach transakcji trójstronnej
                          uproszczonej, przez drugiego w kolejności podatnika, o
                          którym mowa w art. 135 ust. 1 pkt 4 lit. b i c ustawy
                          "
        />
      )}
    />
  )
}

export default PrefiksPodatnika
