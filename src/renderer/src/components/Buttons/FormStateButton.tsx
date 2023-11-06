import { Check, CircleDashed, Save, XCircle } from 'lucide-react'
import { Button, ButtonProps } from '../ui/button'
import { cn } from '@renderer/lib/utils'

interface Props extends ButtonProps {
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
  loadingText?: string
  successText?: string
  errorText?: string
  text?: string
}

const FormStateButton = ({
  isLoading,
  isSuccess,
  isError,
  loadingText,
  successText,
  errorText,
  text,
  children,
  ...props
}: Props): JSX.Element => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn({
        'bg-green-600 border-green-700 dark:bg-green-800 dark:border-green-900 hover:bg-green-600 dark:hover:bg-green-800':
          isSuccess,
        'bg-red-600 border-red-700 dark:bg-red-800 dar:border-red-900 hover:bg-red-600 dark:hover:bg-red-800':
          isError
      })}
      {...props}
    >
      {isLoading ? (
        <>
          {loadingText ?? 'Zapisuje'} <CircleDashed className="w-4 h-4 ml-2 animate-spin" />
        </>
      ) : isError ? (
        <>
          <span className="text-gray-200">{errorText ?? 'Nie zapisano'}</span>
          <XCircle className="w-4 h-4 ml-2 animate-ping text-gray-200" />
        </>
      ) : isSuccess ? (
        <>
          <span className="text-gray-200">{successText ?? 'Zapisano'}</span>{' '}
          <Check className="w-4 h-4 ml-2 animate-ping text-gray-200" />
        </>
      ) : (
        <>
          {children ? (
            children
          ) : (
            <>
              {text ?? 'Zapisz'} <Save className="w-4 h-4 ml-2" />
            </>
          )}
        </>
      )}
    </Button>
  )
}

export default FormStateButton
