import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  field: any
  optional?: boolean
}

const NrID = ({ field, optional }: Props): JSX.Element => {
  return (
    <BasicFormItem
      field={field}
      label="NrID"
      optional={optional}
      tooltipMessage="Identyfikator podatkowy inny niż NIP oraz

      Przykład:
      Podatnik polski świadczy usługę tłumaczeniową na rzecz
      podatnika mającego siedzibę działalności gospodarczej w
      Szwajcarii. Nabywca posiada identyfikator podatkowy
      nadany na cele podatku o podobnym charakterze w kraju
      swojej siedziby.

      Identyfikator ten można wskazać w strukturze FA(2), w
      polu NrID. Dodatkowo w polu KodKraju można wskazać
      „CH” (tj. kod kraju – Szwajcaria)"
    />
  )
}

export default NrID
