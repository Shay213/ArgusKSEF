import PreviewXML from '@renderer/components/Buttons/PreviewXML'
import SuccessTemplate from '@renderer/components/SuccessTemplate'
import { Button } from '@renderer/components/ui/button'
import { useToast } from '@renderer/components/ui/use-toast'
import { useCreateFakturaContext } from '@renderer/context/createFakturaContext'
import { FileEdit, FileDown } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const FakturaSuccess = (): JSX.Element => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const context = useCreateFakturaContext()

  useEffect(() => {
    context?.setIsCreatingInvoice(false)
  }, [])

  const handleDownload = (): void => {
    if (context?.ksefXML) {
      window.api.showSaveDialog(context.ksefXML)
      window.api.onSaveDialogResponse(({ error, success }) => {
        if (success) {
          toast({
            title: 'Plik został zapisany pomyślnie.'
          })
          return
        }
        toast({
          title: error,
          variant: 'destructive'
        })
      })
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <SuccessTemplate mainText="Wyślij do ksef">
        <PreviewXML />
        <Button
          variant="ghost"
          onClick={(): void => {
            navigate('/faktura-podstawowa/step3')
          }}
        >
          Edytuj Fakturę <FileEdit className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="ghost" onClick={handleDownload}>
          Pobierz XML <FileDown className="w-4 h-4 ml-2" />
        </Button>
      </SuccessTemplate>
    </div>
  )
}

export default FakturaSuccess

/*
  FIGURE OUT HOW TO DOWNLOAD FILE, FOR NOW I CANNOT SEND TO KSEF

*/
