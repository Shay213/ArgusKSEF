import { cn } from '@renderer/lib/utils'
import { useState } from 'react'
import FormStateButton from './Buttons/FormStateButton'
import { useCreateXMLFromTableContext } from '@renderer/context/CreateXMLFromTableProvider'
import { useXLSXBindingsContext } from '@renderer/context/XLSXBindingsProvider'

interface Props {
  xlsxFileName: string | string[]
  resetSelected?: () => void
}

const CreateXmlFromTable = ({ xlsxFileName, resetSelected }: Props): JSX.Element => {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const context = useCreateXMLFromTableContext()
  const bindingsContext = useXLSXBindingsContext()

  const hasBinding = Array.isArray(xlsxFileName)
    ? false
    : typeof bindingsContext?.xlsxBindings?.[xlsxFileName] === 'string'

  const createXML = async (): Promise<void> => {
    return new Promise<void>((resolve) => {
      context?.setIsDisabled(true)
      if (Array.isArray(xlsxFileName)) {
        xlsxFileName.forEach((file, i) => {
          context?.setEventQueue((prevQueue) => [
            ...prevQueue,
            async (): Promise<void> => {
              await context?.createAndSaveXML(file)
              if (i === xlsxFileName.length - 1) {
                resolve()
              }
            }
          ])
        })
      } else {
        context?.setEventQueue((prevQueue) => [
          ...prevQueue,
          async (): Promise<void> => {
            await context?.createAndSaveXML(xlsxFileName)
            resolve()
          }
        ])
      }
    })
  }

  return (
    <FormStateButton
      className="disabled:opacity-100"
      disabled={hasBinding || context?.isDisabled || isLoading}
      onClick={async (): Promise<void> => {
        setIsLoading(true)
        try {
          await createXML()
          resetSelected?.()
          context?.setIsDisabled(false)
          setIsSuccess(true)
          setIsLoading(false)
          setTimeout(() => {
            setIsSuccess(false)
          }, 1000)
        } catch (error) {
          setIsError(true)
          setIsLoading(false)
          setTimeout(() => {
            setIsError(false)
          }, 1000)
        }
      }}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      variant={hasBinding ? 'ghost' : 'default'}
      size="sm"
      loadingText="Tworzenie"
      errorText="Niepowodzenie"
    >
      <span
        className={cn({
          'text-green-500': hasBinding
        })}
      >
        {hasBinding ? 'Stworzono' : 'Stwórz'}
      </span>
    </FormStateButton>
  )
}

export default CreateXmlFromTable
