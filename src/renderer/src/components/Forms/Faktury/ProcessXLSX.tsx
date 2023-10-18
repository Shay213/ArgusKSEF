import UploadXLSX from '@renderer/components/UploadXLSX'
import { useNavigate } from 'react-router-dom'
import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'
import convertXLSXToObj from '@renderer/scripts/convertXLSXToObj'
import { useCallback, useState } from 'react'
import { formatDateToYYYYMMDD, getRandomInt } from '@renderer/lib/utils'
import Loading from '@renderer/components/Loading'
import objectMapper from 'object-mapper'
import FakturaMapping from '@renderer/mappings/FakturaMapping'
import ProcessXlsxError from './errors/ProcessXlsxError'

const ProcessXLSX = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  const context = useCreateFakturaContext()

  const runOnError = useCallback(() => {
    setTimeout(
      () => {
        setIsError(true)
        setIsLoading(false)
      },
      getRandomInt(500, 1000)
    )
  }, [])

  const handleClick = (xlsxFile: File | null | undefined): void => {
    context?.setIsCreatingInvoice(true)
    setIsError(false)
    setIsLoading(true)
    if (!xlsxFile) {
      navigate('/faktura-podstawowa/step3')
      return
    }
    const reader = new FileReader()

    reader.onload = (e): void => {
      try {
        const xlsxObj = convertXLSXToObj(e.target?.result)
        //console.log(xlsxObj)
        setTimeout(
          () => {
            setIsLoading(false)
            const today = new Date()
            const DataWytworzeniaFaIso = today.toISOString()
            const DataWytworzeniaFa = formatDateToYYYYMMDD(today)

            const source = { ...xlsxObj, DataWytworzeniaFaIso, DataWytworzeniaFa }
            const destination = context?.template

            // @ts-ignore objectMapper is a function
            const mappedTemplate = objectMapper(source, destination, FakturaMapping)
            context?.setMappedTemplate(mappedTemplate)

            navigate('/faktura-podstawowa/step3')
          },
          getRandomInt(800, 1300)
        )
      } catch (error) {
        console.log(error)
        runOnError()
      }
    }

    reader.onerror = (): void => {
      runOnError()
    }

    reader.readAsArrayBuffer(xlsxFile)
  }

  const handleAddAgain = (): void => {
    setIsLoading(false)
    setIsError(false)
  }

  return (
    <div className="h-full flex justify-center items-center">
      {isLoading ? (
        <Loading text="Przetwarzanie pliku XLSX. Proszę czekać..." />
      ) : isError ? (
        <ProcessXlsxError handleAddAgain={handleAddAgain} />
      ) : (
        <UploadXLSX handleClick={handleClick} />
      )}
    </div>
  )
}

export default ProcessXLSX
