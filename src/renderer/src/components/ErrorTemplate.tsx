import HomeButton from '@renderer/components/Buttons/HomeButton'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'

interface Props {
  children?: React.ReactNode
  description?: string
}

const ErrorTemplate = ({ children, description }: Props): JSX.Element => {
  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle>Wystąpił błąd</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <h4 className="font-semibold text-lg">Akcje: </h4>
          <div className="flex flex-col items-start gap-3">{children}</div>
        </div>
      </CardContent>
      <CardFooter>
        <HomeButton className="w-full" />
      </CardFooter>
    </Card>
  )
}

export default ErrorTemplate
