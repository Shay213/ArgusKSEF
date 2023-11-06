import { CornerUpLeft } from 'lucide-react'
import { Button, ButtonProps } from '../ui/button'
import AlertButton from './AlertButton'
import { useNavigate } from 'react-router-dom'

interface Props extends ButtonProps {
  isAlert?: boolean
  dialogTitle?: string
  dialogDescription?: string
}

const HomeButton = ({
  dialogTitle,
  dialogDescription,
  isAlert,
  onClick,
  ...props
}: Props): JSX.Element => {
  const navigate = useNavigate()
  return (
    <>
      {isAlert ? (
        <AlertButton
          dialogTitle={dialogTitle ?? 'Jesteś absolutnie pewien?'}
          dialogDescription={
            dialogDescription ?? 'Upewnij się, że wszystkie edytowane pola zostały zapisane'
          }
          handleContinue={(e): void => {
            onClick?.(e)
            navigate('/')
            window.location.reload()
          }}
          {...props}
        >
          <CornerUpLeft className="mr-2 h-4 w-4" /> Wróć do strony głównej
        </AlertButton>
      ) : (
        <Button
          {...props}
          onClick={(e): void => {
            onClick?.(e)
            navigate('/')
          }}
        >
          <CornerUpLeft className="mr-2 h-4 w-4" /> Wróć do strony głównej
        </Button>
      )}
    </>
  )
}

export default HomeButton
