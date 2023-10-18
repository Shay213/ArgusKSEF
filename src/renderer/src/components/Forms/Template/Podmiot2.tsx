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
import defaultPodmiot2Values from '@renderer/data/defaultFormValues/defaultPodmiot2Values'
import saveTemplate from '@renderer/scripts/saveTemplate'
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import IDNabywcy from '../FormItems/IDNabywcy'
import NrEORI from '../FormItems/NrEORI'
import NrKlienta from '../FormItems/NrKlienta'
import Adres from '../FormSections/Adres'
import DaneIdentyfikacyjne from '../FormSections/DaneIdentyfikacyjne'
import DaneKontaktowe from '../FormSections/DaneKontaktowe'
import { Form } from '@renderer/components/ui/form'

interface Props {
  template: ITemplate
}

const Podmiot2 = ({ template }: Props): JSX.Element => {
  const [templateS, setTemplateS] = useState(template)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const { toast } = useToast()
  const form = useForm({
    //@ts-ignore template is based on defaultValues so they always have same type
    defaultValues: window.api.merge(defaultPodmiot2Values, template?.Faktura.Podmiot2 ?? {})
  })

  const onSubmit = async (values): Promise<void> => {
    setIsLoading(true)
    const content = { Faktura: { ...templateS.Faktura, Podmiot2: values } }
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
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="overflow-auto max-h-[calc(100vh-300px)]">
            <CardHeader>
              <CardTitle>Podmiot2</CardTitle>
              <CardDescription>
                Zawiera informacje, które charakteryzują nabywcę towaru lub usługi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <NrEORI optional />
              <DaneIdentyfikacyjne type="extended" />
              <Adres formFieldNamePrefix="Adres." heading="Adres" />
              <Adres formFieldNamePrefix="AdresKoresp." heading="AdresKoresp" optional />
              <DaneKontaktowe optional />
              <NrKlienta optional />
              <IDNabywcy optional />
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
                onClick={(): void => form.reset(defaultPodmiot2Values)}
                isAlert
                disabled={isLoading}
              />
            </CardFooter>
          </Card>
        </form>
      </Form>
    </FormProvider>
  )
}

export default Podmiot2
