import { useFormContext } from 'react-hook-form'
import DaneIdentyfikacyjne from './DaneIdentyfikacyjne'
import Adres from './Adres'
import FormSection from '../FormItems-base/FormSection'
import PrefiksPodatnika from '../FormItems/PrefiksPodatnika'

interface Props {
  optional?: boolean
}

const Podmiot1k = ({ optional }: Props): JSX.Element => {
  const form = useFormContext()
  return (
    <FormSection
      title="Podmiot1K"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane Podmiot1 ujęte na fakturze
      korygowanej [element opcjonalny]

      W przypadku korekty danych sprzedawcy, należy podać
      pełne dane sprzedawcy, występujące na fakturze
      korygowanej. Pole nie dotyczy przypadku korekty
      błędnego NIP występującego na fakturze pierwotnej.
      Wówczas wymagana jest korekta faktury do wartości
      zerowych."
    >
      <div className="flex flex-col gap-2">
        <PrefiksPodatnika
          optional
          formFieldNamePrefix="Podmiot1K."
          handleSelect={(value): void =>
            form.setValue('Podmiot1K.PrefiksPodatnika', value.toUpperCase())
          }
        />
        <DaneIdentyfikacyjne formFieldNamePrefix="Podmiot1K." type="basic" headingSize="sm" />
        <Adres formFieldNamePrefix="Podmiot1K.Adres." heading="Adres" headingSize="sm" />
      </div>
    </FormSection>
  )
}

export default Podmiot1k
