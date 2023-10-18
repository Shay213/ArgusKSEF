import { KodyKrajowUE } from '@renderer/lib/zodSchemas'
import PopoverSearchFormItem from '../FormItems-base/PopoverSearchFormItem'

interface Props {
  field: any
  handleSelect: (value) => void
  optional?: boolean
}

const KodUE = ({ field, handleSelect, optional }: Props): JSX.Element => {
  return (
    <PopoverSearchFormItem
      field={field}
      optional={optional}
      handleSelect={handleSelect}
      label="KodUE"
      items={[...KodyKrajowUE]}
      placeholder="Wybierz kod kraju UE"
    />
  )
}

export default KodUE
