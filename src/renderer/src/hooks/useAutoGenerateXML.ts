import { useEffect, useState } from 'react'

interface UseAutoGenerateXMLReturnType {
  isAutoGenerateXML: boolean
  setIsAutoGenerateXML: (value: boolean) => void
}

const useAutoGenerateXML = (): UseAutoGenerateXMLReturnType => {
  const [isAutoGenerateXML, setIsAutoGenerateXML] = useState<boolean>(
    localStorage.getItem('isAutoGenerateXML') === 'true' ?? true
  )

  useEffect(() => {
    const savedIsAutoGenerateXML = localStorage.getItem('isAutoGenerateXML')
    if (savedIsAutoGenerateXML !== isAutoGenerateXML.toString()) {
      localStorage.setItem('isAutoGenerateXML', isAutoGenerateXML.toString())
    }
  }, [isAutoGenerateXML])

  return {
    isAutoGenerateXML,
    setIsAutoGenerateXML
  }
}

export default useAutoGenerateXML
