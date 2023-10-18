import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const defaultTerminPlatnosciValues = {
  Termin: '',
  TerminOpis: ''
}

const TerminPlatnosci = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="TerminPlatnosci"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące terminu płatności
      należności wynikającej z faktury tj. termin płatności oraz
      opis terminu płatności [element fakultatywny]

      Maksymalna ilość wystąpień: 100"
    >
      <TableFormItem
        fieldName={`${formFieldNamePrefix ?? ''}TerminPlatnosci`}
        addButtonLabel="Dodaj TerminPlatnosci"
        initialState={defaultTerminPlatnosciValues}
        cellInfo={{
          Termin: {
            label: 'Termin',
            type: 'calendar',
            tooltip: `Termin płatności

            Podaje się termin płatności, należności wynikającej z
            faktury, w formacie RRRR-MM-DD (np. 2023-09-21).

            Pole może dotyczyć płatności już dokonanej lub płatności
            przyszłej.`
          },
          TerminOpis: {
            label: 'TerminOpis',
            type: 'basic',
            tooltip: `Opis terminu płatności [pole fakultatywne]

            Podaje się opis terminu płatności, wskazanego w polu
            Termin. Opis może stanowić doprecyzowanie terminu
            płatności (np. 14 dni od wystawienia faktury) lub
            stanowić wskazanie czego dokładnie dotyczy dany termin
            (np. płatności II raty).

            Pole może dotyczyć płatności już dokonanej lub płatności
            przyszłej.`
          }
        }}
      />
    </FormSection>
  )
}

export default TerminPlatnosci
