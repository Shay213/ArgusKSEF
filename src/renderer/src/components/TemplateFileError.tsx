import { RefreshCcw, Search, Plus } from 'lucide-react'
import ErrorTemplate from './ErrorTemplate'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useToast } from './ui/use-toast'
import defaultNaglowekValues from '@renderer/data/defaultFormValues/defaultNaglowekValues'
import defaultPodmiot1Values from '@renderer/data/defaultFormValues/defaultPodmiot1Values'
import defaultPodmiot2Values from '@renderer/data/defaultFormValues/defaultPodmiot2Values'
import defaultPodmiotUpowaznionyValues from '@renderer/data/defaultFormValues/defaultPodmiotUpowaznionyValues'
import defaultFaValues from '@renderer/data/defaultFormValues/defaultFaValues'

const TEMPLATE = {
  Faktura: {
    Naglowek: defaultNaglowekValues,
    Podmiot1: defaultPodmiot1Values,
    Podmiot2: defaultPodmiot2Values,
    Podmiot3: [],
    PodmiotUpowazniony: defaultPodmiotUpowaznionyValues,
    Fa: defaultFaValues,
    Stopka: {
      Informacje: [],
      Rejestry: []
    }
  }
}

const TemplateFileError = (): JSX.Element => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleCheckFile = async (): Promise<void> => {
    try {
      await window.api.isFileInDir('template.json', true)
      toast({
        title: 'Plik został znaleziony'
      })
    } catch (error) {
      toast({
        title: 'Plik nie został znaleziony',
        variant: 'destructive'
      })
    }
  }

  const handleCreateTemplate = async (): Promise<void> => {
    try {
      await window.api.saveFile('template.json', JSON.stringify(TEMPLATE), true)
      toast({
        title: 'Plik templatki został stworzony.'
      })
      setTimeout(() => {
        navigate(0)
      }, 200)
    } catch (error) {
      toast({
        title: 'Nie udało się stworzyć pliku templatki.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ErrorTemplate>
        <Button variant="ghost" onClick={(): void => navigate(0)}>
          Spróbuj ponownie <RefreshCcw className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="ghost" onClick={handleCheckFile}>
          Sprawdz czy templatka istnieje <Search className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="ghost" onClick={handleCreateTemplate}>
          Stwórz plik templatki <Plus className="w-4 h-4 ml-2" />
        </Button>
      </ErrorTemplate>
    </div>
  )
}

export default TemplateFileError
