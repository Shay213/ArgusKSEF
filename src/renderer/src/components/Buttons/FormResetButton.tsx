import { ListRestart } from 'lucide-react'
import { Button, ButtonProps, buttonVariants } from '../ui/button'
import AlertButton from './AlertButton'

interface Props extends ButtonProps {
  isAlert?: boolean
}

const FormResetButton = ({ isAlert, onClick, ...props }: Props): JSX.Element => {
  return (
    <>
      {isAlert ? (
        <AlertButton
          dialogTitle="Jesteś absolutnie pewien?"
          dialogDescription="To działanie jest nieodwracalne. Wszystkie edytowane pola zostaną utracone."
          handleContinue={(e): void => onClick?.(e)}
          className={buttonVariants({ variant: 'destructive' })}
          {...props}
        >
          Resetuj Pola <ListRestart className="w-4 h-4 ml-2" />
        </AlertButton>
      ) : (
        <Button type="reset" {...props} variant="destructive">
          Resetuj Pola <ListRestart className="w-4 h-4 ml-2" />
        </Button>
      )}
    </>
  )
}

export default FormResetButton
