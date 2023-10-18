import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const defaultZamowieniaValues = {
  DataZamowienia: '',
  NrZamowienia: ''
}

const Zamowienia = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="Zamowienia"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące daty i numeru
      zamówienia, na podstawie którego realizowana jest
      dostawa towarów lub świadczenie usług [element
      fakultatywny]
      Maksymalna ilość wystąpień: 100"
    >
      <TableFormItem
        fieldName={`${formFieldNamePrefix ?? ''}Zamowienia`}
        addButtonLabel="Dodaj Zamowienia"
        initialState={defaultZamowieniaValues}
        cellInfo={{
          DataZamowienia: {
            label: 'DataZamowienia',
            type: 'calendar',
            tooltip: `Data zamówienia [pole fakultatywne]

            Podaje się datę zamówienia, na podstawie którego
            realizowana jest dostawa towarów lub świadczenie usług
            dokumentowane fakturą.

            Dla faktur zaliczkowych dedykowany jest odrębny,
            dodatkowy element Fa/Zamowienie, zawierający dane
            wymagane art. 106f ust. 1 pkt 4 ustawy.`
          },
          NrZamowienia: {
            label: 'NrZamowienia',
            type: 'basic',
            tooltip: `Numer zamówienia [pole fakultatywne]

            Podaje się numer zamówienia, na podstawie którego
            realizowana jest dostawa towarów lub świadczenie usług
            dokumentowane fakturą.

            Dla faktur zaliczkowych dedykowany jest odrębny,
            dodatkowy element Fa/Zamowienie, zawierający dane
            wymagane art. 106f ust. 1 pkt 4 ustawy.`
          }
        }}
      />
    </FormSection>
  )
}

export default Zamowienia
