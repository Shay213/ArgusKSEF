import { KodyKrajow } from '@renderer/lib/zodSchemas'
import PopoverSearchFormItem from '../FormItems-base/PopoverSearchFormItem'

interface Props {
  field: any
  handleSelect: (value) => void
  optional?: boolean
}

const KodKraju = ({ field, handleSelect, optional }: Props): JSX.Element => {
  return (
    <PopoverSearchFormItem
      field={field}
      optional={optional}
      handleSelect={handleSelect}
      label="KodKraju"
      items={[...KodyKrajow]}
      placeholder="Wybierz kod kraju"
    />
  )
}

export default KodKraju
