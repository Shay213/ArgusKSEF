import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  field: any
}

const P_23 = ({ field }: Props): JSX.Element => {
  return (
    <SelectFormItem
      field={field}
      items={['1', '2']}
      placeholder="Wybierz P_23"
      label="P_23"
      tooltipMessage={`Adnotacja "VAT: Faktura WE uproszczona na mocy art.
      135-138 ustawy o ptu" lub "VAT: Faktura WE
      uproszczona na mocy artykułu 141 dyrektywy
      2006/112/WE" i stwierdzenie, że podatek z tytułu
      dokonanej dostawy zostanie rozliczony przez ostatniego
      w kolejności podatnika podatku od wartości dodanej

      W przypadku faktury wystawianej w procedurze
      uproszczonej przez drugiego w kolejności podatnika, o
      którym mowa w art. 135 ust. 1 pkt 4 lit. b i c oraz ust. 2,
      zawierającej adnotację, o której mowa w art. 136 ust. 1
      pkt 1 i stwierdzenie, o którym mowa w art. 136 ust. 1 pkt
      2 ustawy, należy podać wartość „1”; w przeciwnym
      przypadku - wartość „2”.`}
    />
  )
}

export default P_23
