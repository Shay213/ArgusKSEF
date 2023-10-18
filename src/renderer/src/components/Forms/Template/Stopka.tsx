import { useForm } from 'react-hook-form'
import saveTemplate from '@renderer/scripts/saveTemplate'
import FormResetButton from '@renderer/components/Buttons/FormResetButton'
import FormSaveButton from '@renderer/components/Buttons/FormStateButton'
import HomeButton from '@renderer/components/Buttons/HomeButton'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@renderer/components/ui/card'
import { useToast } from '@renderer/components/ui/use-toast'
import { useState } from 'react'
import Informacje from '../FormSections/Informacje'
import Rejestry from '../FormSections/Rejestry'
import { Form } from '@renderer/components/ui/form'

interface Props {
  template: ITemplate
}

const DEFAULT_VALUES_STOPKA = {
  Informacje: [],
  Rejestry: []
}

const Stopka = ({ template }: Props): JSX.Element => {
  const [templateS, setTemplateS] = useState(template)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const { toast } = useToast()
  const form = useForm({
    defaultValues: window.api.merge(
      DEFAULT_VALUES_STOPKA,
      //@ts-ignore template is based on defaultValues so they always have same type
      template?.Faktura.Stopka ?? {}
    )
  })

  const onSubmit = async (values): Promise<void> => {
    setIsLoading(true)
    const content = { Faktura: { ...templateS.Faktura, Stopka: values } }
    const contentJSON = JSON.stringify(content)

    try {
      const newTemplate = await saveTemplate(contentJSON)
      setIsLoading(false)
      setTemplateS(newTemplate)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 1000)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
      setTimeout(() => {
        setIsError(false)
      }, 1000)
      toast({
        title: 'Pojawił się błąd podczas zapisu zmian'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="overflow-auto max-h-[calc(100vh-300px)]">
          <CardHeader>
            <CardTitle>Stopka</CardTitle>
            <CardDescription>
              Zawiera pozostałe informacje na fakturze. m.in. stopkę faktury, numer KRS, REGON
              [element fakultatywny]
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Informacje />
            <Rejestry />
          </CardContent>
          <CardFooter className="flex items-center gap-2">
            <FormSaveButton
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
              disabled={isLoading}
            />
            <HomeButton isAlert disabled={isLoading} />
            <FormResetButton
              onClick={(): void => form.reset(DEFAULT_VALUES_STOPKA)}
              isAlert
              disabled={isLoading}
            />
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default Stopka
