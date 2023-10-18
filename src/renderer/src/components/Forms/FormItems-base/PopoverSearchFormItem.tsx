import { FormControl, FormItem, FormLabel, FormMessage } from '@renderer/components/ui/form'
import FormTooltip from '../Template/FormTooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Button } from '@renderer/components/ui/button'
import { cn } from '@renderer/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@renderer/components/ui/command'

interface Props {
  field: any
  label?: string
  handleSelect: (value) => void
  items: string[]
  placeholder?: string
  tooltipMessage?: string
  className?: string
  popoverContentClassName?: string
  optional?: boolean
}

const PopoverSearchFormItem = ({
  field,
  label,
  handleSelect,
  items,
  placeholder,
  tooltipMessage,
  className,
  popoverContentClassName,
  optional
}: Props): JSX.Element => {
  return (
    <FormItem className={cn('flex flex-col gap-1', className)}>
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
              role="combobox"
              className={cn('justify-between', !field.value && 'text-muted-foreground')}
            >
              {!field.value ? `Wybierz ${label}` : field.value}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          className={cn('left-0 h-[300px] p-0', popoverContentClassName)}
          sticky="always"
          align="start"
        >
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandEmpty>Nie znaleziono.</CommandEmpty>
            <CommandGroup className="overflow-auto">
              {items
                .filter((item) => item !== '')
                .map((item) => (
                  <CommandItem value={item} key={item} onSelect={handleSelect}>
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        item === field.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {item}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}

export default PopoverSearchFormItem
