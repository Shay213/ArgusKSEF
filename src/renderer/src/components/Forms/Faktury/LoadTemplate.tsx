import Loading from '@renderer/components/Loading'
import { useCallback, useEffect, useState } from 'react'
import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'
import { useNavigate } from 'react-router-dom'
import getTemplateFile from '@renderer/scripts/getTemplateFile'
import { getRandomInt } from '@renderer/lib/utils'
import FetchTemplateError from './errors/FetchTemplateError'

const LoadTemplate = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [refetchTrigger, setRefetchTrigger] = useState(false)
  const context = useCreateFakturaContext()
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)

    const loadTemplate = async (): Promise<void> => {
      try {
        const template = await getTemplateFile()
        setTimeout(
          () => {
            setIsLoading(false)
            context?.setTemplate(template)
            navigate('/faktura-podstawowa/step2')
          },
          getRandomInt(600, 1200)
        )
      } catch (error) {
        console.log(error)
        setTimeout(
          () => {
            setIsError(true)
            context?.setTemplate(null)
            setIsLoading(false)
          },
          getRandomInt(200, 500)
        )
      }
    }
    loadTemplate()

    return (): void => {
      setIsLoading(false)
      setIsError(false)
    }
  }, [refetchTrigger])

  const refetch = useCallback(() => {
    setRefetchTrigger((prev) => !prev)
  }, [refetchTrigger])

  return (
    <div className="h-full flex justify-center items-center">
      {isLoading ? (
        <Loading text="Ładowanie zawartości…" />
      ) : isError ? (
        <FetchTemplateError refetch={refetch} />
      ) : null}
    </div>
  )
}

export default LoadTemplate
