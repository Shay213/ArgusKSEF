import { createContext, useContext, useState } from 'react'

interface Props {
  children: React.ReactNode
}

interface CreateFakturaContextType {
  template: ITemplate | null
  mappedTemplate: ITemplate | null
  ksefXML: string | null
  previewXML: string | null
  isCreatingInvoice: boolean
  setTemplate: React.Dispatch<React.SetStateAction<ITemplate | null>>
  setMappedTemplate: React.Dispatch<React.SetStateAction<ITemplate | null>>
  setKsefXML: React.Dispatch<React.SetStateAction<string | null>>
  setPreviewXML: React.Dispatch<React.SetStateAction<string | null>>
  setIsCreatingInvoice: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateFakturaContext = createContext<CreateFakturaContextType | undefined>(undefined)

export const useCreateFakturaContext = (): CreateFakturaContextType | undefined => {
  return useContext(CreateFakturaContext)
}

const CreateFakturaContextProvider = ({ children }: Props): JSX.Element => {
  const [template, setTemplate] = useState<ITemplate | null>(null)
  const [mappedTemplate, setMappedTemplate] = useState<ITemplate | null>(null)
  const [ksefXML, setKsefXML] = useState<string | null>(null)
  const [previewXML, setPreviewXML] = useState<string | null>(null)
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false)

  const contextValue: CreateFakturaContextType = {
    template,
    mappedTemplate,
    setTemplate,
    setMappedTemplate,
    ksefXML,
    previewXML,
    setKsefXML,
    setPreviewXML,
    setIsCreatingInvoice,
    isCreatingInvoice
  }

  return (
    <CreateFakturaContext.Provider value={contextValue}>{children}</CreateFakturaContext.Provider>
  )
}

export default CreateFakturaContextProvider
