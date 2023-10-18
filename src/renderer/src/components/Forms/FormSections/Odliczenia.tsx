import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const defaultOdliczeniaValues = {
  Kwota: '',
  Powod: ''
}

const Odliczenia = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="Odliczenia"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający informacje w zakresie odliczeń
      [element fakultatywny]

      W przypadku, gdy podatnik zdecyduje się wypełnić
      element fakultatywny Odliczenia, wówczas obligatoryjne
      staje się uzupełnienie obu występujących w nim pól:
      Kwota oraz Powod.

      Maksymalna ilość wystąpień: 100"
    >
      <TableFormItem
        fieldName={`${formFieldNamePrefix ?? ''}Odliczenia`}
        addButtonLabel="Dodaj Odliczenia"
        initialState={defaultOdliczeniaValues}
        cellInfo={{
          Kwota: {
            label: 'Kwota',
            type: 'basic',
            tooltip: `Kwota odliczona od kwoty wykazanej w polu P_15

            Podaje się kwotę odliczenia, o którą pomniejszono kwotę
            należności ogółem, wynikającą z faktury.`
          },
          Powod: {
            label: 'Powod',
            type: 'basic',
            tooltip: `Powód odliczenia
            Podaje się przyczynę odliczenia.`
          }
        }}
      />
    </FormSection>
  )
}

export default Odliczenia
