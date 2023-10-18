import { FormControl, FormItem, FormLabel, FormMessage } from '@renderer/components/ui/form'
import FormTooltip from '../Template/FormTooltip'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { cn } from '@renderer/lib/utils'

interface Props {
  field: any
  label?: string
  items: string[]
  placeholder?: string
  tooltipMessage?: string
  className?: string
  optional?: boolean
}

const SelectFormItem = ({
  field,
  label,
  placeholder,
  tooltipMessage,
  items,
  className,
  optional
}: Props): JSX.Element => {
  return (
    <FormItem className={cn(className)}>
      {label && (
        <FormLabel className="relative w-max">
          {label}
          {tooltipMessage && <FormTooltip message={tooltipMessage} />}
          {optional && <span className="text-sm font-normal ml-2">(Opcjonalnie)</span>}
        </FormLabel>
      )}
      <Select onValueChange={field.onChange} value={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {items
            .filter((item) => item !== '')
            .map((item) => (
              <SelectItem value={item} key={item}>
                {item}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )
}

export default SelectFormItem
