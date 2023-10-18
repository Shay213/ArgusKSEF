import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  optional?: boolean
}

const WZ = ({ optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="WZ"
      size="lg"
      optional={optional}
      tooltipMessage="Numer dokumentu magazynowego WZ (wydanie na
        zewnątrz) związanego z fakturą [pole fakultatywne]

        Maksymalna ilość wystąpień: 1000"
    >
      <TableFormItem
        addButtonLabel="Dodaj WZ"
        fieldName="WZ"
        cellInfo={{
          WZ: {
            label: 'WZ'
          }
        }}
      />
    </FormSection>
  )
}

export default WZ
