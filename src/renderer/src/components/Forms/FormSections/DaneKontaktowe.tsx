import FormSection from '../FormItems-base/FormSection'
import TableFormItem from '../FormItems-base/TableFormItem'

interface Props {
  statePostfix?: string
  optional?: boolean
  formFieldNamePrefix?: string
}

const DaneKontaktowe = ({ optional, statePostfix, formFieldNamePrefix }: Props): JSX.Element => {
  return (
    <FormSection title="DaneKontaktowe" size="lg" optional={optional}>
      <TableFormItem
        addButtonLabel="Dodaj Kontakt"
        initialState={{
          [`Email${statePostfix ?? ''}`]: '',
          [`Telefon${statePostfix ?? ''}`]: ''
        }}
        fieldName={`${formFieldNamePrefix ?? ''}DaneKontaktowe`}
        cellInfo={{
          [`Email${statePostfix ?? ''}`]: {
            label: `Email${statePostfix ?? ''}`
          },
          [`Telefon${statePostfix ?? ''}`]: {
            label: `Telefon${statePostfix ?? ''}`,
            inputType: 'number'
          }
        }}
      />
    </FormSection>
  )
}

export default DaneKontaktowe

{
  /*<FormTableItem
        structure={{
          nodes: [
            {
              label: `Email${statePostfix ?? ''}`,
              optional,
            },
            {
              label: `Telefon${statePostfix ?? ''}`,
              optional
            }
          ]
        }}
        fieldName="DaneKontaktowe"
        addButtonLabel="Dodaj Kontakt"
        tableCaption="Lista kontaktów."
        initialState={{
          [`Email${statePostfix ?? ''}`]: '',
          [`Telefon${statePostfix ?? ''}`]: ''
        }}
      />*/
}
