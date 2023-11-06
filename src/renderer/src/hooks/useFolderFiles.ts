import { useXLSXBindingsContext } from '@renderer/context/XLSXBindingsProvider'
import { getRandomInt } from '@renderer/lib/utils'
import { useEffect, useState } from 'react'

interface UseFolderFilesReturnType {
  isLoading: boolean
  error: {
    message: string
  } | null
  files: IFiles[]
  setFiles: React.Dispatch<React.SetStateAction<IFiles[]>>
}

interface Props {
  type: 'xlsx' | 'xml'
}

const useFolderFiles = ({ type }: Props): UseFolderFilesReturnType => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | { message: string }>(null)
  const [files, setFiles] = useState<IFiles[]>([])
  const context = useXLSXBindingsContext()

  const folderPath = type === 'xlsx' ? context?.xlsxFolderPath : context?.xmlFolderPath

  useEffect(() => {
    if (folderPath) {
      ;(async (): Promise<void> => {
        setIsLoading(true)
        if (type === 'xml' && context?.xmlFolderPath) {
          await window.api.createDir(context?.xmlFolderPath)
        }
        try {
          const files = await window.api.getFolderFiles(folderPath)
          setTimeout(
            () => {
              setFiles(files)
              //setNumFiles(files.length)
              setIsLoading(false)
            },
            getRandomInt(500, 1000)
          )
        } catch (error) {
          console.log(error)
          setError({ message: 'Nie udało się załadować plików' })
          setIsLoading(false)
        }
      })()
    }
  }, [folderPath])

  return { isLoading, error, files, setFiles }
}

export default useFolderFiles
