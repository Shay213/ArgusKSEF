import ErrorTemplate from '@renderer/components/ErrorTemplate'
import { Button } from '@renderer/components/ui/button'
import { RefreshCcw } from 'lucide-react'

interface Props {
  refetch: () => void
}

const FetchTemplateError = ({ refetch }: Props): JSX.Element => {
  return (
    <ErrorTemplate description="Coś poszło nie tak podczas konfiguracji lub pobierania plików">
      <Button variant="ghost" onClick={(): void => refetch()}>
        Spróbuj ponownie <RefreshCcw className="w-4 h-4 ml-2" />
      </Button>
    </ErrorTemplate>
  )
}

export default FetchTemplateError
