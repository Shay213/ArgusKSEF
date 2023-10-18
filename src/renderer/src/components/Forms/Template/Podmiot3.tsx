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
import defaultPodmiot3Values from '@renderer/data/defaultFormValues/defaultPodmiot3Values'
import saveTemplate from '@renderer/scripts/saveTemplate'
import { Trash2, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import FormSection from '../FormItems-base/FormSection'
import IDNabywcy from '../FormItems/IDNabywcy'
import NrEORI from '../FormItems/NrEORI'
import NrKlienta from '../FormItems/NrKlienta'
import Udzial from '../FormItems/Udzial'
import Adres from '../FormSections/Adres'
import DaneIdentyfikacyjne from '../FormSections/DaneIdentyfikacyjne'
import DaneKontaktowe from '../FormSections/DaneKontaktowe'
import Rola from '../FormSections/Rola'
import { Button } from '@renderer/components/ui/button'
import { Form } from '@renderer/components/ui/form'

interface Props {
  template: ITemplate
}

// PODMIOT3 SHOULD BE AS AN ARRAY MAX NUMBER IS 100
const Podmiot3 = ({ template }: Props): JSX.Element => {
  const [templateS, setTemplateS] = useState(template)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const { toast } = useToast()
  const form = useForm({
    //@ts-ignore template is based on defaultValues so they always have same type
    defaultValues: { Podmiot3: [...(template?.Faktura.Podmiot3 ?? [])] }
  })
  const { fields, append, remove } = useFieldArray({
    name: 'Podmiot3',
    control: form.control
  })

  const onSubmit = async (values): Promise<void> => {
    setIsLoading(true)
    const content = { Faktura: { ...templateS.Faktura, Podmiot3: values.Podmiot3 } }
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
              <CardTitle>Podmiot3</CardTitle>
              <CardDescription>
                Zawiera dane podmiotu/-ów trzeciego/-ich (innego/-ych niż sprzedawca (Podmiot1) i
                nabywca wymieniony w części Podmiot2), związanego/-ych z fakturą [element
                fakultatywny]
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-2">
                {fields.map((field, index) => (
                  <FormSection key={field.id} title={`Podmiot3 ${index + 1}`} size="default">
                    <div className="flex flex-col gap-2">
                      <IDNabywcy optional formFieldNamePrefix={`Podmiot3.${index}.`} />
                      <NrEORI optional formFieldNamePrefix={`Podmiot3.${index}.`} />
                      <DaneIdentyfikacyjne
                        type="extended+IDWew"
                        formFieldNamePrefix={`Podmiot3.${index}.`}
                      />
                      <Adres formFieldNamePrefix={`Podmiot3.${index}.Adres.`} heading="Adres" />
                      <Adres
                        formFieldNamePrefix={`Podmiot3.${index}.AdresKoresp.`}
                        heading="AdresKoresp"
                        optional
                      />
                      <DaneKontaktowe optional formFieldNamePrefix={`Podmiot3.${index}.`} />
                      <Rola formFieldNamePrefix={`Podmiot3.${index}.`} />
                      <Udzial optional formFieldNamePrefix={`Podmiot3.${index}.`} />
                      <NrKlienta optional formFieldNamePrefix={`Podmiot3.${index}.`} />
                    </div>
                    <Button
                      className="mt-2"
                      type="button"
                      onClick={(): void => remove(index)}
                      variant="destructive"
                    >
                      Usuń Podmiot3 {index + 1} <Trash2 className="w-4 h-4 ml-2" />
                    </Button>
                  </FormSection>
                ))}
                <div>
                  <Button type="button" onClick={(): void => append(defaultPodmiot3Values)}>
                    Dodaj Podmiot3 <Plus className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
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
                onClick={(): void => form.setValue('Podmiot3', [])}
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

export default Podmiot3
