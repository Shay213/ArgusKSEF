import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const defaultObciazeniaValues = {
  Kwota: '',
  Powod: ''
}

const Obciazenia = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="Obciazenia"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający informacje w zakresie obciążeń
      [element fakultatywny]

      W przypadku, gdy podatnik zdecyduje się wypełnić
      element fakultatywny Obciazenia, wówczas
      obligatoryjne staje się uzupełnienie obu występujących w
      nim pól: Kwota oraz Powod.

      Maksymalna ilość wystąpień: 100"
    >
      <TableFormItem
        fieldName={`${formFieldNamePrefix ?? ''}Obciazenia`}
        addButtonLabel="Dodaj Obciazenia"
        initialState={defaultObciazeniaValues}
        cellInfo={{
          Kwota: {
            label: 'Kwota',
            type: 'basic',
            tooltip: `Kwota doliczona do kwoty wykazanej w polu P_15

            Podaje się kwotę obciążenia, doliczoną do kwoty
            należności ogółem, wynikającej z faktury.`
          },
          Powod: {
            label: 'Powod',
            type: 'basic',
            tooltip: `Powód obciążenia
            Podaje się przyczynę obciążenia.`
          }
        }}
      />
    </FormSection>
  )
}

export default Obciazenia
