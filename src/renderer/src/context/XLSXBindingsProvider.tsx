import { useToast } from '@renderer/components/ui/use-toast'
import { createContext, useContext, useEffect, useState } from 'react'

type XLSXBindings = Record<string, string>

interface Props {
  children: React.ReactNode
}

interface XlsxBindingsContextType {
  setXlsxBindings: React.Dispatch<React.SetStateAction<XLSXBindings>>
  xlsxBindings: XLSXBindings
  bindingsFileName: string
  saveBinding: (xlsxFileName: string, xmlFileName: string) => Promise<void>
  setXlsxFolderPath: React.Dispatch<React.SetStateAction<string | null>>
  setXmlFolderPath: React.Dispatch<React.SetStateAction<string | null>>
  xlsxFolderPath: string | null
  xmlFolderPath: string | null
  removeBinding: (xlsxFileName?: string | null, xmlFileName?: string) => Promise<void>
  chooseFolderFromDialog: (type: 'xlsx' | 'xml') => Promise<void>
}

const FILE_NAME = 'xlsxBindings.json'

const XLSXBindingsContext = createContext<XlsxBindingsContextType | undefined>(undefined)

export const useXLSXBindingsContext = (): XlsxBindingsContextType | undefined => {
  return useContext(XLSXBindingsContext)
}

const XLSXBindingsProvider = ({ children }: Props): JSX.Element => {
  const [xlsxBindings, setXlsxBindings] = useState<XLSXBindings>({})
  const [xlsxFolderPath, setXlsxFolderPath] = useState<string | null>(
    localStorage.getItem('xlsxFolderPath') ?? null
  )
  const [xmlFolderPath, setXmlFolderPath] = useState<string | null>(
    localStorage.getItem('xmlFolderPath') ?? null
  )
  const { toast } = useToast()

  useEffect(() => {
    const readXlsxBindings = async (): Promise<void> => {
      try {
        const data = await window.api.readFile(FILE_NAME, true)
        const parsedData = JSON.parse(data)
        setXlsxBindings(parsedData)
      } catch (error) {
        await window.api.saveFile(FILE_NAME, JSON.stringify({}), true)
      }
    }
    readXlsxBindings()
  }, [])

  useEffect(() => {
    const savedXmlFolderPath = localStorage.getItem('xmlFolderPath')
    const savedXlsxFolderPath = localStorage.getItem('xlsxFolderPath')

    if (savedXmlFolderPath !== xmlFolderPath) {
      localStorage.setItem('xmlFolderPath', xmlFolderPath ?? '')
    }
    if (savedXlsxFolderPath !== xlsxFolderPath) {
      localStorage.setItem('xlsxFolderPath', xlsxFolderPath ?? '')
    }
  }, [xmlFolderPath, xlsxFolderPath])

  useEffect(() => {
    if (xmlFolderPath) {
      const currYear = new Date().getFullYear() + ''
      const pathChunks = xmlFolderPath.split('/')
      const isSameYear = currYear === pathChunks[pathChunks.length - 1]
      if (!isSameYear) {
        const updatedPath = pathChunks.slice(0, pathChunks.length - 1).join('/')
        if (updatedPath !== xmlFolderPath) {
          setXmlFolderPath(updatedPath)
          localStorage.setItem('xmlFolderPath', updatedPath)
        }
      }
    }
  }, [xmlFolderPath])

  const saveBinding = async (xlsxFileName: string, xmlFileName: string): Promise<void> => {
    if (!xlsxFileName || xlsxBindings?.[xlsxFileName]) {
      return
    }

    try {
      setXlsxBindings((prevBindings) => {
        const newBindings = { ...prevBindings, [xlsxFileName]: xmlFileName }
        saveBindings(newBindings)
        return newBindings
      })
    } catch (error) {
      toast({
        title: 'Nie udało się zapisać powiązania.',
        description:
          'Plik xlsx nie będzie "pamiętał" wygenerowanego pliku xml. Sprawdź czy masz uprawnienia do zapisu plików w folderze aplikacji.',
        variant: 'destructive'
      })
    }
  }

  const removeBinding = async (
    xlsxFileName?: string | null,
    xmlFileName?: string
  ): Promise<void> => {
    try {
      setXlsxBindings((prevBindings) => {
        const newBindings = { ...prevBindings }
        if (xlsxFileName) {
          delete newBindings[xlsxFileName]
        } else if (xmlFileName) {
          const xlsxFileName = Object.keys(newBindings).find((xlsxFileName) => {
            const folders = newBindings[xlsxFileName].split('/')
            const fileName = folders[folders.length - 1]
            return fileName === xmlFileName
          })
          if (xlsxFileName) {
            delete newBindings[xlsxFileName]
          }
        }
        saveBindings(newBindings)
        return newBindings
      })
    } catch (error) {
      toast({
        title: 'Nie udało się usunąć powiązania.',
        description: `Wystąpił błąd podczas zapisywania pliku ${FILE_NAME}. Sprawdź czy masz uprawnienia do zapisu plików w folderze aplikacji.`,
        variant: 'destructive'
      })
    }
  }

  const saveBindings = async (bindings: Record<string, string>): Promise<void> => {
    await window.api.saveFile(FILE_NAME, JSON.stringify(bindings), true)
  }

  const chooseFolderFromDialog = async (type: 'xlsx' | 'xml'): Promise<void> => {
    window.api.getFolderPath()
    try {
      const folderPath = await window.api.onGetFolderPathResponse()
      if (folderPath) {
        if (type === 'xlsx') {
          setXlsxFolderPath(folderPath.replace(/\\/g, '/'))
        } else if (type === 'xml') {
          await window.api.createDir(
            `${folderPath}/${new Date().getFullYear()}`.replace(/\\/g, '/')
          )
          setXmlFolderPath(`${folderPath}/${new Date().getFullYear()}`.replace(/\\/g, '/'))
        }
      }
    } catch (error) {
      toast({
        title: 'Nie udało się zapisać ścieżki do folderu.',
        variant: 'destructive'
      })
    }
  }

  const contextValue: XlsxBindingsContextType = {
    xlsxBindings,
    bindingsFileName: FILE_NAME,
    setXlsxBindings,
    saveBinding,
    setXlsxFolderPath,
    setXmlFolderPath,
    xlsxFolderPath,
    xmlFolderPath,
    removeBinding,
    chooseFolderFromDialog
  }

  return (
    <XLSXBindingsContext.Provider value={contextValue}>{children}</XLSXBindingsContext.Provider>
  )
}

export default XLSXBindingsProvider
