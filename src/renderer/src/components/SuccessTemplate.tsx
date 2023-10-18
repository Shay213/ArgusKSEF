import HomeButton from '@renderer/components/Buttons/HomeButton'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { Button } from './ui/button'

interface Props {
  children?: React.ReactNode
  description?: string
  handleMain?: () => void
  mainText?: string
}

const SuccessTemplate = ({ children, description, handleMain, mainText }: Props): JSX.Element => {
  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle>Sukces</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <h4 className="font-semibold text-lg">Akcje: </h4>
          <div className="flex flex-col items-start gap-3">{children}</div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <HomeButton variant="outline" />
        <Button onClick={handleMain}>{mainText}</Button>
      </CardFooter>
    </Card>
  )
}

export default SuccessTemplate
