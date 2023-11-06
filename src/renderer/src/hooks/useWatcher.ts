import { useToast } from '@renderer/components/ui/use-toast'
import { useXLSXBindingsContext } from '@renderer/context/XLSXBindingsProvider'
import createXML from '@renderer/scripts/createXML'
import { useEffect, useRef, useState } from 'react'

type AcceptedTypesToWatch = 'xlsx' | 'xml'
interface Args {
  type: AcceptedTypesToWatch
  setFiles: React.Dispatch<React.SetStateAction<IFiles[]>>
  isAutoGenerateXML?: boolean
}

const useWatcher = ({ type, isAutoGenerateXML, setFiles }: Args): void => {
  const [eventQueue, setEventQueue] = useState<(() => Promise<void> | void)[]>([])
  const context = useXLSXBindingsContext()
  const { toast } = useToast()
  const count = useRef(0)

  const folderPath = type === 'xlsx' ? context?.xlsxFolderPath : context?.xmlFolderPath

  useEffect(() => {
    if (folderPath) {
      ;(async (): Promise<void> => {
        await window.api.startWatcher(type, folderPath, {
          onAdd: async (file: IFiles) => {
            setEventQueue((prev) => {
              return [
                ...prev,
                async (): Promise<void> => {
                  if (
                    isAutoGenerateXML &&
                    type === 'xlsx' &&
                    context?.xlsxFolderPath &&
                    context?.xmlFolderPath
                  ) {
                    const { ksefXML, nrFaktury } = await createXML(
                      `${context.xlsxFolderPath}/${file.filename}`
                    )
                    const xmlFileName = `${context?.xmlFolderPath}/ARGUS_Fa_${nrFaktury}.xml`

                    await window.api.createDir(context?.xmlFolderPath)
                    try {
                      await window.api.saveFile(xmlFileName, ksefXML, false)
                      await context?.saveBinding(file.filename, xmlFileName)
                    } catch (error) {
                      toast({
                        title: 'Nie udało się zapisać pliku.',
                        description:
                          'Sprawdź czy masz uprawnienia do zapisu plików w folderze aplikacji.',
                        variant: 'destructive'
                      })
                    }
                  }
                  setFiles((prevFiles) => [...prevFiles, file])
                }
              ]
            })
          },
          onRemove: (filename: string) => {
            setEventQueue((prev) => [
              ...prev,
              async (): Promise<void> => {
                await context?.removeBinding(null, filename)
                setFiles((prevFiles) => prevFiles.filter((file) => file.filename !== filename))
              }
            ])
          },
          onError: (err: Error) => {
            console.log(err)
          }
        })
      })()
    }
  }, [context?.xlsxFolderPath, context?.xmlFolderPath, isAutoGenerateXML, type])
  //console.log(eventQueue)
  useEffect(() => {
    if (eventQueue.length > 0 && count.current === 0) {
      count.current++
      const firstEvent = eventQueue[0]
      const processFirstEvent = async (): Promise<void> => {
        await firstEvent()
        setEventQueue((prevQueue) => prevQueue.slice(1))
        count.current = 0
      }
      processFirstEvent()
    }
    return () => {
      count.current = 0
    }
  }, [eventQueue])
}

export default useWatcher
