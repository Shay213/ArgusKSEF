import { FormControl, FormItem, FormLabel, FormMessage } from '@renderer/components/ui/form'
import FormTooltip from '../Template/FormTooltip'
import { cn } from '@renderer/lib/utils'
import { Textarea } from '@renderer/components/ui/textarea'

interface Props {
  field: any
  label?: string
  placeholder?: string
  tooltipMessage?: string
  className?: string
  optional?: boolean
}

const TextareaFormItem = ({
  field,
  label,
  placeholder,
  tooltipMessage,
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
      <FormControl>
        <Textarea {...field} placeholder={placeholder ? placeholder : ''} className="resize-none" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default TextareaFormItem
