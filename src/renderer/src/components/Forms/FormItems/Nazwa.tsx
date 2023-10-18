import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  field: any
  optional?: boolean
}

const Nazwa = ({ field, optional }: Props): JSX.Element => {
  return (
    <BasicFormItem
      field={field}
      label="Nazwa"
      optional={optional}
      tooltipMessage="Imię i nazwisko lub nazwa podatnika
                W polu Nazwa można również wskazać nazwę handlową
                podatnika.

                Przykład wypełnienia:
                Jan Kowalski, Sklep Motoryzacyjny XYZ"
    />
  )
}

export default Nazwa
