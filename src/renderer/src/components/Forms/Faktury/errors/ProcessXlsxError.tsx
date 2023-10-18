import ErrorTemplate from '@renderer/components/ErrorTemplate'
import { Button } from '@renderer/components/ui/button'
import { RefreshCcw } from 'lucide-react'

interface Props {
  handleAddAgain: () => void
}

const ProcessXlsxError = ({ handleAddAgain }: Props): JSX.Element => {
  return (
    <ErrorTemplate description="Coś poszło nie tak podczas konwersji pliku xlsx">
      <Button variant="ghost" onClick={handleAddAgain}>
        Dodaj ponownie <RefreshCcw className="w-4 h-4 ml-2" />
      </Button>
    </ErrorTemplate>
  )
}

export default ProcessXlsxError
