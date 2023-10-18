import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  optional?: boolean
}

const defaultInformacjeValues = {
  StopkaFaktury: ''
}

const Informacje = ({ optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="Informacje"
      size="lg"
      optional={optional}
      tooltipMessage={`Element zawierający pozostałe dane na fakturze (stopkę faktury)
      Maksymalna ilość wystąpień: 3
      `}
    >
      <TableFormItem
        initialState={defaultInformacjeValues}
        fieldName="Informacje"
        addButtonLabel="Dodaj Informacje"
        cellInfo={{
          StopkaFaktury: {
            label: 'StopkaFaktury',
            type: 'textarea',
            tooltip: `Pole zawierające pozostałe dane na fakturze [pole
              fakultatywne]

              W stopce faktury można zawrzeć np. podziękowanie za
              zakup, zachętę do dalszej współpracy, kod rabatowy do
              wykorzystania przy okazji kolejnych zakupów, godziny
              otwarcia punktu sprzedaży, godziny pracy
              infolinii/punktu obsługi klienta, link (wyłącznie w formie
              tekstowej) do formularza zwrotu towaru, link (wyłącznie
              w formie tekstowej) do formularza reklamacyjnego,
              informacje marketingowe, klauzulę RODO, wartość
              kapitału zakładowego itp.`
          }
        }}
      />
    </FormSection>
  )
}

export default Informacje
