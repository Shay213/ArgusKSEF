import SelectFormItem from '../FormItems-base/SelectFormItem'

interface Props {
  field: any
}

const P_19 = ({ field }: Props): JSX.Element => {
  return (
    <SelectFormItem
      field={field}
      items={['1']}
      label="P_19"
      placeholder="Wybierz P_19"
      tooltipMessage={`Znacznik dostawy towarów lub świadczenia usług
      zwolnionych od podatku na podstawie art. 43 ust. 1, art.
      113 ust. 1 i 9 albo przepisów wydanych na podstawie art.
      82 ust. 3 ustawy lub na podstawie innych przepisów

      W przypadku faktury dokumentującej dostawę towarów
      lub świadczenie usług zwolnionych od podatku na
      podstawie art. 43 ust. 1 ustawy, art. 113 ust. 1 i 9 albo
      przepisów wydanych na podstawie art. 82 ust. 3 ustawy
      lub na podstawie innych przepisów, należy podać
      wartość „1”.

      W przypadku, gdy pole P_19 równa się „1”, należy
      wypełnić dodatkowo jedno z pól: P_19A, P_19B lub
      P_19C.
      `}
    />
  )
}

export default P_19
