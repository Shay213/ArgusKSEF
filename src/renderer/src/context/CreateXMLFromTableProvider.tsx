import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useXLSXBindingsContext } from './XLSXBindingsProvider'
import createXML from '@renderer/scripts/createXML'
import { useToast } from '@renderer/components/ui/use-toast'

interface Props {
  children: React.ReactNode
}

interface CreateXMLContextType {
  setEventQueue: React.Dispatch<React.SetStateAction<(() => Promise<void>)[]>>
  createAndSaveXML: (xlsxFileName: string) => Promise<void>
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
  isDisabled: boolean
}

const CreateXMLFromTAbleContext = createContext<CreateXMLContextType | undefined>(undefined)

export const useCreateXMLFromTableContext = (): CreateXMLContextType | undefined => {
  return useContext(CreateXMLFromTAbleContext)
}

const CreateXMLFromTableProvider = ({ children }: Props): JSX.Element => {
  const [eventQueue, setEventQueue] = useState<(() => Promise<void>)[]>([])
  const [isDisabled, setIsDisabled] = useState(false)
  const { toast } = useToast()
  const count = useRef(0)
  const context = useXLSXBindingsContext()

  // process first event from queue if other events are not processing
  // when processing event is finished, process next event from queue
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

  const createAndSaveXML = async (xlsxFileName: string): Promise<void> => {
    if (!context || !context?.xmlFolderPath || !context.xlsxFolderPath) return
    const { ksefXML, nrFaktury } = await createXML(`${context.xlsxFolderPath}/${xlsxFileName}`)
    const xmlFileName = `${context?.xmlFolderPath}/ARGUS_Fa_${nrFaktury}.xml`

    await window.api.createDir(context?.xmlFolderPath)
    try {
      await window.api.saveFile(xmlFileName, ksefXML, false)
      await context?.saveBinding(xlsxFileName, xmlFileName)
    } catch (error) {
      toast({
        title: 'Nie udało się zapisać pliku.',
        description: 'Sprawdź czy masz uprawnienia do zapisu plików w folderze aplikacji.',
        variant: 'destructive'
      })
    }
  }

  const contextValue: CreateXMLContextType = {
    setEventQueue,
    createAndSaveXML,
    setIsDisabled,
    isDisabled
  }

  return (
    <CreateXMLFromTAbleContext.Provider value={contextValue}>
      {children}
    </CreateXMLFromTAbleContext.Provider>
  )
}

export default CreateXMLFromTableProvider
