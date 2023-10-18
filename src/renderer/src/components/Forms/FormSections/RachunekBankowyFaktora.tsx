import defaultRachunekBankowyValues from '@renderer/data/defaultFormValues/defaultRachunekBankowyValues'
import { RachunekWlasnyBanku } from '@renderer/lib/zodSchemas'
import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const RachunekBankowyFaktora = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="RachunekBankowyFaktora"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane rachunku faktora, na który
      była/będzie dokonana płatność należności wynikająca z
      faktury (m.in. numer rachunku, opis rachunku, nazwa
      banku) [element fakultatywny]
      Maksymalna ilość wystąpień: 20"
    >
      <TableFormItem
        fieldName={`${formFieldNamePrefix ?? ''}RachunekBankowyFaktora`}
        addButtonLabel="Dodaj RachunekBankowyFaktora"
        initialState={defaultRachunekBankowyValues}
        cellInfo={{
          NrRB: {
            label: 'NrRB',
            type: 'basic',
            cellWidth: 300,
            tooltip: `Pełny numer rachunku
            Podaje się pełny numer rachunku (na który była/będzie
            dokonana płatność należności wynikająca z faktury)`
          },
          SWIFT: {
            label: 'SWIFT',
            type: 'basic',
            tooltip: `Kod SWIFT [pole fakultatywne]
            Podaje się identyfikator (cyfrowo - literowy) instytucji
            finansowej prowadzącej zagraniczny rachunek.`
          },
          RachunekWlasnyBanku: {
            label: 'RachunekWlasnyBanku',
            type: 'select',
            items: [...RachunekWlasnyBanku],
            tooltip: `Typy rachunków własnych [pole fakultatywne]

            Podaje się:
            - „1” - w przypadku rachunku banku lub rachunku
            spółdzielczej kasy oszczędnościowo-kredytowej
            służącego do dokonywania rozliczeń z tytułu nabywanych
            przez ten bank lub tę kasę wierzytelności pieniężnych,
            - „2” - w przypadku rachunku banku lub rachunku
            spółdzielczej kasy oszczędnościowo-kredytowej
            wykorzystywanego przez ten bank lub tę kasę do
            pobrania należności od nabywcy towarów lub
            usługobiorcy za dostawę towarów lub świadczenie usług,
            potwierdzone fakturą, i przekazania jej w całości albo
            części dostawcy towarów lub usługodawcy,
            - „3” - w przypadku rachunku banku lub rachunku
            spółdzielczej kasy oszczędnościowo-kredytowej
            prowadzonego przez ten bank lub tę kasę w ramach
            gospodarki własnej, niebędącego rachunkiem
            rozliczeniowym.
            `
          },
          NazwaBanku: {
            label: 'NazwaBanku',
            type: 'basic',
            tooltip: `Nazwa [pole fakultatywne]
            Podaje się nazwę podmiotu, w którym prowadzony jest
            rachunek, na który była/będzie dokonana płatność
            należności wynikająca z faktury.
            `
          },
          OpisRachunku: {
            label: 'OpisRachunku',
            type: 'basic',
            cellWidth: 300,
            tooltip: `Opis rachunku [pole fakultatywne]
            Podaje się dodatkowe informacje opisujące rachunek, na
            który była/będzie dokonana płatność należności
            wynikająca z faktury.`
          }
        }}
      />
    </FormSection>
  )
}

export default RachunekBankowyFaktora
