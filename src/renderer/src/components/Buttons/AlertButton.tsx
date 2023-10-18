import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@renderer/components/ui/alert-dialog'
import { Button, ButtonProps } from '../ui/button'
import { MouseEvent } from 'react'

interface AlertButtonProps extends ButtonProps {
  dialogTitle?: string
  dialogDescription?: string
  handleContinue?: (e: MouseEvent<HTMLButtonElement>) => void
}

const AlertButton = ({
  dialogTitle,
  dialogDescription,
  handleContinue,
  ...props
}: AlertButtonProps): JSX.Element => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props}>{props.children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>Kontynuuj</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertButton
