import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  formFieldNamePrefix?: string
  optional?: boolean
}

const defaultZaplataCzesciowaValues = {
  KwotaZaplatyCzesciowej: '',
  DataZaplatyCzesciowej: ''
}

const ZaplataCzesciowa = ({ formFieldNamePrefix, optional }: Props): JSX.Element => {
  return (
    <FormSection
      title="ZaplataCzesciowa"
      size="default"
      optional={optional}
      tooltipMessage="Element zawierający dane dotyczące zapłat częściowych
      tj. daty i kwoty zapłat częściowych
      Maksymalna ilość wystąpień: 100"
    >
      <TableFormItem
        fieldName={`${formFieldNamePrefix ?? ''}ZaplataCzesciowa`}
        addButtonLabel="Dodaj ZaplataCzesciowa"
        initialState={defaultZaplataCzesciowaValues}
        cellInfo={{
          KwotaZaplatyCzesciowej: {
            label: 'KwotaZaplatyCzesciowej',
            type: 'basic',
            tooltip: `Kwota zapłaty częściowej

            Podaje się kwotę zapłaty częściowej w przypadku, gdy
            pole ZnacznikZaplatyCzesciowej przyjmuje wartość „1”`
          },
          DataZaplatyCzesciowej: {
            label: 'DataZaplatyCzesciowej',
            type: 'calendar',
            tooltip: `Data zapłaty częściowej, jeśli do wystawienia faktury
            płatność częściowa została dokonana

            Podaje się datę zapłaty częściowej w formacie RRRR-MMDD (np. 2023-09-21) w przypadku, gdy pole
            ZnacznikZaplatyCzesciowej przyjmuje wartość „1”.`
          }
        }}
      />
    </FormSection>
  )
}

export default ZaplataCzesciowa
