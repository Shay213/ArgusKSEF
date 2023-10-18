import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const NrPartiiTowaru = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="NrPartiiTowaru"
      size="default"
      optional={optional}
      tooltipMessage="Numery partii towaru [pole fakultatywne]

      Podaje się numer partii towarów, z której pochodzą
      towary będące przedmiotem dostawy
      dokumentowanej fakturą.

      Maksymalna ilość wystąpień: 1000

      Zgodnie z art. 12g ust. 2 pkt 7 lit. d ustawy z dnia 11
      września 2015 r. o zdrowiu publicznym12, informacja w
      postaci elektronicznej, składana przez podmioty
      zobowiązane do zapłaty opłaty, o których mowa w art.
      12d ustawy, powinna zawierać m.in. numery partii
      towaru, jeśli nie są zawarte na fakturze."
    >
      <TableFormItem
        fieldName={`${formFieldNamePrefix ?? ''}NrPartiiTowaru`}
        addButtonLabel="Dodaj NrPartiiTowaru"
        cellInfo={{
          NrPartiiTowaru: {
            label: 'NrPartiiTowaru',
            type: 'basic',
            tooltip: `Numery partii towaru [pole fakultatywne]
            Podaje się numer partii towarów, z której pochodzą
            towary będące przedmiotem dostawy
            dokumentowanej fakturą.`
          }
        }}
      />
    </FormSection>
  )
}

export default NrPartiiTowaru
