import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@renderer/components/ui/tooltip'
import { cn } from '@renderer/lib/utils'
import { Info } from 'lucide-react'

type Props = {
  message: string
  className?: string
}

const FormTooltip = ({ message, className }: Props): JSX.Element => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={cn('absolute top-0 -right-5', className)}>
          <Info className="w-4 h-4" />
        </TooltipTrigger>
        <TooltipContent className="max-w-lg max-h-96 overflow-auto">
          <p className="whitespace-pre-line">{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default FormTooltip
