import { FormControl, FormItem, FormLabel, FormMessage } from '@renderer/components/ui/form'
import FormTooltip from '../Template/FormTooltip'
import { Input } from '@renderer/components/ui/input'
import { cn } from '@renderer/lib/utils'

interface Props {
  field: any
  label?: string
  optional?: boolean
  placeholder?: string
  tooltipMessage?: string
  readOnly?: boolean
  className?: string
  type?: string
}

const BasicFormItem = ({
  field,
  label,
  placeholder,
  readOnly,
  tooltipMessage,
  className,
  type = 'text',
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
      <FormControl>
        <Input
          {...field}
          readOnly={readOnly ? readOnly : false}
          placeholder={placeholder ? placeholder : ''}
          type={type}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default BasicFormItem
