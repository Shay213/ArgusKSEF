import { MouseEvent } from 'react'
import { buttonVariants } from './ui/button'
import { cn } from '@renderer/lib/utils'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@renderer/components/ui/tooltip'

type Props = {
  content: string
  tooltipMessage: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  variant: 'disabled' | 'default'
}

const TooltipButton = ({ content, onClick, tooltipMessage, variant }: Props): JSX.Element => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={onClick}>
          <div
            className={cn(buttonVariants({ variant: 'default' }), {
              'bg-gray-200 text-gray-500 opacity-75 cursor-default hover:bg-gray-200 hover:text-gray-500 hover:cursor-default':
                variant === 'disabled'
            })}
          >
            {content}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipButton
