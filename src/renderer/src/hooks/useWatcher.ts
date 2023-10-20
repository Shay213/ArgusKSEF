import { useEffect, useState } from "react"

type AcceptedTypesToWatch = 'xlsx' | 'xml'

interface Files {
  filename: string
  creationDate: string
}

interface UseWatcherReturnType {
  files: Files[]
  isLoading: boolean
  error: {message: string} | null
  refetch: () => void
  chooseFolderFromDialog: (handlers?: {
    onError?: () => void;
    onSuccess?: () => void;
}) => void
}

interface Args {
  type: AcceptedTypesToWatch
}

const useWatcher = ({type}: Args): UseWatcherReturnType => {
  const [folderPath, setFolderPath] = useState<string | null>(null)
  const [files, setFiles] = useState<Files[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | {message: string}>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(false)

  useEffect(() => {
    if(folderPath) {
      (async (): Promise<void> => {
        setIsLoading(true)
        try {
          const files = await window.api.getFolderFiles(folderPath)
          console.log(files)
          setFiles(files)
          setIsLoading(false)
        } catch (error) {
          setError({message: 'Nie udało się odczytać plików.'})
          setIsLoading(false)
        }
      })()
    }
  }, [folderPath, refetchTrigger])

  useEffect(() => {
    if (folderPath) {
      (async (): Promise<void> => {
        await window.api.startWatcher(type, folderPath,
          {
            onAdd: (file) => {
              const {creationDate, filename} = file
              if(typeof creationDate === 'string') {
                // file.creationDate did not work, typescript complaing about creationDate is null
                setFiles((prev) => [...prev, {creationDate, filename}])
                return
              }
              setFiles((prev) => [...prev, {creationDate: '', filename}])
            },
            onRemove: (filename) => {
              setFiles((prev) => prev.filter((file) => file.filename !== filename ))
            },
            onError: (err) => {
              console.log(err)
            }
          }
        )
      })()
    }
  }, [folderPath])

  const refetch = (): void => {
    setRefetchTrigger(prev => !prev)
  }

  const chooseFolderFromDialog = (handlers?: {onError?: () => void, onSuccess?: () => void}): void => {
    window.api.getFolderPath()
    window.api.onGetFolderPathResponse((folderPath) => {
      if (folderPath) {
        setFolderPath(folderPath)
        handlers?.onSuccess?.()
        return
      } else {
        handlers?.onError?.()
      }
    })
  }

  return {
    files,
    isLoading,
    error,
    refetch,
    chooseFolderFromDialog
  }
}

export default useWatcher
