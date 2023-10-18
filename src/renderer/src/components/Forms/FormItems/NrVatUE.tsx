import BasicFormItem from '../FormItems-base/BasicFormItem'

interface Props {
  field: any
  optional?: boolean
}

const NrVatUE = ({ field, optional }: Props): JSX.Element => {
  return (
    <BasicFormItem
      field={field}
      optional={optional}
      label="NrVatUE"
      tooltipMessage="Numer identyfikacyjny VAT nabywcy (bez literowego
        kodu kraju, który wskazano w polu KodUE) w przypadku
        wystawienia faktury dokumentującej:

        - wewnątrzwspólnotową dostawę towarów,
        - świadczenie usług, do których stosuje się art. 100 ust. 1
        pkt 4 ustawy, dla podatników podatku od wartości
        dodanej lub osób prawnych niebędących takimi
        podatnikami, zidentyfikowanych na potrzeby podatku od
        wartości dodanej.

        W przypadku faktur wystawianych w procedurze
        uproszczonej przez drugiego w kolejności podatnika, o
        którym mowa w art. 135 ust. 1 pkt 4 lit. b i c oraz ust. 2
        ustawy, wskazuje się numer, o którym mowa w art. 136
        ust. 1 pkt 4 ustawy (bez literowego kodu kraju).

        W polach NrVatUE oraz NrID nie należy podawać
        polskiego identyfikatora podatkowego NIP nabywcy, dla
        którego przeznaczone jest pole NIP. Faktura zostanie
        odpowiednio udostępniona nabywcy wyłącznie gdy jego
        NIP wskazano w polu NIP, a nie w polach NrVatUE lub
        NrID."
    />
  )
}

export default NrVatUE
