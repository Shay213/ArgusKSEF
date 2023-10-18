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
import defaultPodmiot1Values from '@renderer/data/defaultFormValues/defaultPodmiot1Values'
import saveTemplate from '@renderer/scripts/saveTemplate'
import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import NrEORI from '../FormItems/NrEORI'
import PrefiksPodatnika from '../FormItems/PrefiksPodatnika'
import StatusInfoPodatnika from '../FormItems/StatusInfoPodatnika'
import Adres from '../FormSections/Adres'
import DaneIdentyfikacyjne from '../FormSections/DaneIdentyfikacyjne'
import DaneKontaktowe from '../FormSections/DaneKontaktowe'
import { Form } from '@renderer/components/ui/form'

interface Props {
  template: ITemplate
}

const Podmiot1 = ({ template }: Props): JSX.Element => {
  const [templateS, setTemplateS] = useState(template)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const { toast } = useToast()
  const form = useForm({
    //@ts-ignore template is based on defaultValues so they always have same type
    defaultValues: window.api.merge(defaultPodmiot1Values, template?.Faktura.Podmiot1 ?? {})
  })

  const onSubmit = async (values): Promise<void> => {
    setIsLoading(true)
    const content = { Faktura: { ...templateS.Faktura, Podmiot1: values } }
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
              <CardTitle>Podmiot1</CardTitle>
              <CardDescription>
                Zawiera informacje, które charakteryzują podatnika(sprzedawcę)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <PrefiksPodatnika
                optional
                handleSelect={(value): void =>
                  form.setValue('PrefiksPodatnika', value.toUpperCase())
                } // for some reason receiving values in lowercase
              />
              <NrEORI optional />
              <DaneIdentyfikacyjne />
              <Adres formFieldNamePrefix="Adres." heading="Adres" />
              <Adres formFieldNamePrefix="AdresKoresp." heading="AdresKoresp" optional />
              <DaneKontaktowe optional />
              <StatusInfoPodatnika optional />
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
                onClick={(): void => form.reset(defaultPodmiot1Values)}
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

export default Podmiot1
