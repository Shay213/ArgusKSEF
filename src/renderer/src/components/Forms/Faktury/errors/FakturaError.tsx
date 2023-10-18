import ErrorTemplate from '@renderer/components/ErrorTemplate'
import { FileEdit } from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { useNavigate } from 'react-router-dom'
import PreviewXML from '@renderer/components/Buttons/PreviewXML'
import { useEffect } from 'react'
import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'

const FakturaError = (): JSX.Element => {
  const navigate = useNavigate()
  const context = useCreateFakturaContext()

  useEffect(() => {
    context?.setIsCreatingInvoice(false)
  }, [])

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ErrorTemplate>
        <PreviewXML />
        <Button
          variant="ghost"
          onClick={(): void => {
            navigate('/faktura-podstawowa/step3')
          }}
        >
          Edytuj Fakturę <FileEdit className="w-4 h-4 ml-2" />
        </Button>
      </ErrorTemplate>
      <div>Test</div>
    </div>
  )
}

export default FakturaError
