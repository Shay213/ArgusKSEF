import { FormControl, FormItem, FormLabel, FormMessage } from '@renderer/components/ui/form'
import FormTooltip from '../Template/FormTooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Button } from '@renderer/components/ui/button'
import { cn } from '@renderer/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@renderer/components/ui/calendar'

interface Props {
  field: any
  label?: string
  handleSelect: (date: Date) => void
  tooltipMessage?: string
  optional?: boolean
}

const CalendarFormItem = ({
  field,
  label,
  tooltipMessage,
  handleSelect,
  optional
}: Props): JSX.Element => {
  return (
    <FormItem className="flex flex-col gap-1">
      {label && (
        <FormLabel className="relative w-max">
          {label}
          {tooltipMessage && <FormTooltip message={tooltipMessage} className="-top-1" />}
          {optional && <span className="text-sm font-normal ml-2">(Opcjonalnie)</span>}
        </FormLabel>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
            >
              {field.value ? field.value : <span>Wybierz date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={new Date(field.value)}
            onSelect={(value): void => {
              if (value) handleSelect(value)
            }}
            disabled={(date): boolean => date < new Date('1980-01-01')}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}

export default CalendarFormItem
