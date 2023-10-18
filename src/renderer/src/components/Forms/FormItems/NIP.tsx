import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  field: any
  optional?: boolean
}

const NIP = ({ field, optional }: Props): JSX.Element => {
  return (
    <BasicFormItem
      field={field}
      label="NIP"
      type="number"
      optional={optional}
      tooltipMessage="Identyfikator podatkowy NIP podatnika

            Podaje się numer, za pomocą którego sprzedawca jest
            zidentyfikowany na potrzeby podatku (bez literowego
            kodu kraju)."
    />
  )
}

export default NIP
