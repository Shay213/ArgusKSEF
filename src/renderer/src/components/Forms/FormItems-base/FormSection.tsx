import { ChevronDown } from 'lucide-react'
import FormTooltip from '../Template/FormTooltip'
import Collapsible from 'react-collapsible'
import { Separator } from '@renderer/components/ui/separator'

type HeadingSize = 'sm' | 'default' | 'lg' | 'xs'

interface Props {
  children: React.ReactNode
  title: string
  optional?: boolean
  size?: HeadingSize
  tooltipMessage?: string
  isOpen?: boolean
}

interface HeadingProps {
  children: React.ReactNode
  size?: HeadingSize
}

const FormSection = ({
  title,
  size,
  tooltipMessage,
  children,
  optional,
  isOpen
}: Props): JSX.Element => {
  return (
    <section className="space-y-2">
      <Collapsible
        open={isOpen ?? false}
        transitionTime={200}
        trigger={
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <Heading size={size}>
                {title}
                {tooltipMessage && <FormTooltip message={tooltipMessage} />}
                {optional && <span className="text-sm font-normal ml-2">(Opcjonalnie)</span>}
              </Heading>
              <ChevronDown className="w-4 h-4 transition-all duration-200 collapsible-icon" />
            </div>
            <Separator />
          </div>
        }
      >
        <div className="p-4">{children}</div>
      </Collapsible>
    </section>
  )
}

function Heading({ children, size }: HeadingProps): JSX.Element {
  return (
    <>
      {size === 'lg' && <h2 className="text-xl relative w-max font-semibold">{children}</h2>}
      {(!size || size === 'default') && (
        <h3 className="text-lg relative w-max font-semibold">{children}</h3>
      )}
      {size === 'sm' && <h4 className="text-base relative w-max font-semibold">{children}</h4>}
      {size === 'xs' && <h5 className="text-sm relative w-max font-semibold">{children}</h5>}
    </>
  )
}

export default FormSection
