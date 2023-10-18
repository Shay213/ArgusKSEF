import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const defaultUmowyValues = {
  DataUmowy: '',
  NrUmowy: ''
}

const Umowy = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="Umowy"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące daty i numeru
      umowy, na podstawie której realizowana jest dostawa
      towarów lub świadczenie usług [element fakultatywny]
      Maksymalna ilość wystąpień: 100"
    >
      <TableFormItem
        fieldName={`${formFieldNamePrefix ?? ''}Umowy`}
        addButtonLabel="Dodaj Umowy"
        initialState={defaultUmowyValues}
        cellInfo={{
          DataUmowy: {
            label: 'DataUmowy',
            type: 'calendar',
            tooltip: `Data umowy [pole fakultatywne]

            Podaje się datę zawarcia umowy, na podstawie której
            realizowana jest dostawa towarów lub świadczenie usług
            dokumentowane fakturą.

            Dla faktur zaliczkowych dedykowany jest odrębny,
            dodatkowy element Fa/Zamowienie, zawierający dane
            wymagane art. 106f ust. 1 pkt 4 ustawy.`
          },
          NrUmowy: {
            label: 'NrUmowy',
            type: 'basic',
            tooltip: `Numer umowy [pole fakultatywne]

            Podaje się numer umowy, na podstawie której
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

export default Umowy
