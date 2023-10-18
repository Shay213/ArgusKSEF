import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  field: any
  optional?: boolean
}

const IDWew = ({ field, optional }: Props): JSX.Element => {
  return (
    <BasicFormItem
      field={field}
      label="IDWew"
      optional={optional}
      tooltipMessage="Identyfikator wewnętrzny z NIP

      Przez unikalny identyfikator zakładu (oddziału) osoby
      prawnej lub innej wyodrębnionej jednostki wewnętrznej
      podatnika, rozumie się identyfikator wytworzony w KSeF,
      zawierający numer identyfikacji podatkowej (NIP)
      podatnika i ciąg znaków numerycznych."
    />
  )
}

export default IDWew
