import defaultZaliczkaCzesciowaValues from '@renderer/data/defaultFormValues/defaultZaliczkaCzesciowaValues'
import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  optional?: boolean
}

const ZaliczkaCzesciowa = ({ optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="ZaliczkaCzesciowa"
      size="lg"
      optional={optional}
      tooltipMessage="Element opcjonalny zawierający dane dla przypadków
      faktur:
      - dokumentujących otrzymanie więcej niż jednej
      płatności, o której mowa w art. 106b ust. 1 pkt 4 ustawy,
      - o których mowa w art. 106e ust. 1a ustawy (w związku
      z art. 106b ust. 1a ustawy.

      W przypadku, gdy faktura, wystawiana po wydaniu
      towaru lub wykonaniu usługi, dokumentuje
      jednocześnie otrzymanie części zapłaty przed
      dokonaniem czynności, różnica kwoty w polu P_15 i sumy
      poszczególnych pól P_15Z stanowi kwotę pozostałą
      ponad płatności otrzymane przed wykonaniem czynności
      udokumentowanej fakturą
      Maksymalna ilość wystąpień: 31"
    >
      <TableFormItem
        fieldName="ZaliczkaCzesciowa"
        addButtonLabel="Dodaj ZaliczkaCzesciowa"
        initialState={defaultZaliczkaCzesciowaValues}
        cellInfo={{
          P_6Z: {
            label: 'P_6Z',
            type: 'calendar',
            tooltip: `Data otrzymania płatności, o której mowa w art. 106b
            ust. 1 pkt 4 ustawy`
          },
          P_15Z: {
            label: 'P_15Z',
            type: 'basic',
            tooltip: `Kwota płatności, o której mowa w art. 106b ust. 1 pkt 4
            ustawy, składająca się na kwotę w polu P_15. W
            przypadku faktur korygujących, korekta kwoty
            wynikającej z faktury korygowanej`
          },
          KursWalutyZW: {
            label: 'KursWalutyZW',
            type: 'basic',
            tooltip: `Kurs waluty dotyczący płatności, o której mowa w art.
            106b ust. 1 pkt 4 ustawy, stosowany do wyliczenia kwoty
            podatku, w przypadkach, o których mowa w Dziale VI
            ustawy [pole fakultatywne]`
          }
        }}
      />
    </FormSection>
  )
}

export default ZaliczkaCzesciowa
