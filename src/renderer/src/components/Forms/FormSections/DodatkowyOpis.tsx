import defaultDodatkowyOpisValues from '@renderer/data/defaultFormValues/defaultDodatkowyOpisValues'
import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  optional?: boolean
}

const DodatkowyOpis = ({ optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="DodatkowyOpis"
      size="lg"
      optional={optional}
      tooltipMessage="Element zawierający pola przeznaczone dla wykazywania
      dodatkowych danych na fakturze, w tym wymaganych
      przepisami prawa, dla których nie przewidziano innych
      pól/elementów [element fakultatywny]"
    >
      <TableFormItem
        fieldName="DodatkowyOpis"
        addButtonLabel="Dodaj DodatkowyOpis"
        initialState={defaultDodatkowyOpisValues}
        cellInfo={{
          NrWiersza: {
            label: 'NrWiersza',
            type: 'basic',
            inputType: 'number',
            placeholder: '1',
            tooltip: `Numer wiersza podany w polu NrWierszaFa lub
            NrWierszaZam, jeśli informacja odnosi się wyłącznie do
            danej pozycji faktury [pole fakultatywne]`
          },
          Klucz: {
            label: 'Klucz',
            type: 'basic',
            tooltip: `Klucz dla pola niezdefiniowanego, stanowiącego element
            typu złożonego klucz-wartość
            Podaje się nazwę pola przeznaczonego dla wykazywania
            dodatkowych danych na fakturze, w tym wymaganych
            przepisami prawa, dla których nie przewidziano innych
            pól/elementów. Nazwę wskazuje podatnik.
            Maksymalna ilość znaków: 256`
          },
          Wartosc: {
            label: 'Wartosc',
            type: 'basic',
            tooltip: `Wartość pola, stanowiącego element typu złożonego
            klucz-wartość, dla którego nazwę (klucz) określił podatnik
            Podaje się wartość pola przeznaczonego dla
            wykazywania dodatkowych danych na fakturze, w tym
            wymaganych przepisami prawa, dla których nie
            przewidziano innych pól/elementów.
            Maksymalna ilość znaków: 256`
          }
        }}
      />
    </FormSection>
  )
}

export default DodatkowyOpis
