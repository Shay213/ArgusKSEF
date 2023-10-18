import { FormProvider, useForm } from 'react-hook-form'
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
import defaultPodmiotUpowaznionyValues from '@renderer/data/defaultFormValues/defaultPodmiotUpowaznionyValues'
import { useState } from 'react'
import NrEORI from '../FormItems/NrEORI'
import RolaPU from '../FormItems/RolaPU'
import Adres from '../FormSections/Adres'
import DaneIdentyfikacyjne from '../FormSections/DaneIdentyfikacyjne'
import DaneKontaktowe from '../FormSections/DaneKontaktowe'
import { Form } from '@renderer/components/ui/form'

interface Props {
  template: ITemplate
}

const PodmiotUpowazniony = ({ template }: Props): JSX.Element => {
  const [templateS, setTemplateS] = useState(template)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const { toast } = useToast()
  const form = useForm({
    defaultValues: window.api.merge(
      defaultPodmiotUpowaznionyValues,
      //@ts-ignore template is based on defaultValues so they always have same type
      template?.Faktura.PodmiotUpowazniony ?? {}
    )
  })

  const onSubmit = async (values): Promise<void> => {
    setIsLoading(true)
    const content = { Faktura: { ...templateS.Faktura, PodmiotUpowazniony: values } }
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
              <CardTitle>PodmiotUpowazniony</CardTitle>
              <CardDescription>
                Zawiera informacje, które charakteryzują podmiot upoważniony związany z fakturą
                [element opcjonalny]
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <NrEORI optional />
              <DaneIdentyfikacyjne type="basic" />
              <Adres formFieldNamePrefix="Adres." heading="Adres" />
              <Adres formFieldNamePrefix="AdresKoresp." heading="AdresKoresp" optional />
              <DaneKontaktowe statePostfix="PU" />
              <RolaPU />
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
                onClick={(): void => form.reset(defaultPodmiotUpowaznionyValues)}
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

export default PodmiotUpowazniony
