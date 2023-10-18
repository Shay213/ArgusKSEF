import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  field: any
  optional?: boolean
}

const BrakID = ({ field, optional }: Props): JSX.Element => {
  return (
    <SelectFormItem
      field={field}
      items={['1']}
      optional={optional}
      label="BrakID"
      placeholder="Wybierz brak ID"
      tooltipMessage="Podmiot nieposiadający identyfikatora podatkowego lub
      podmiot, którego identyfikator nie występuje na fakturze

      Podaje się „1”w przypadku, gdy nabywca nie posiada
      identyfikatora podatkowego lub gdy identyfikator
      podatkowy nabywcy nie występuje na fakturze.
      W przypadku określonym w art. 106e ust. 5 pkt 2 ustawy
      faktura może nie zawierać identyfikatora podatkowego
      nabywcy. W takiej sytuacji wskazuje się „1” w polu
      BrakID."
    />
  )
}

export default BrakID
